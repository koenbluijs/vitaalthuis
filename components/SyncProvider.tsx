"use client";

import { useEffect, useRef } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { pullState, pushState, type Snapshot } from "@/lib/sync";
import { useApp } from "@/lib/store";
import { useSyncStore } from "@/lib/syncStore";

const STAMP_KEY = "vt-sync-stamp-v2";

function snapshot(): Snapshot {
  const s = useApp.getState();
  return { profile: s.profile, settings: s.settings, progress: s.progress };
}

function hasLocalData(): boolean {
  const s = useApp.getState();
  return s.profile.onboarded || s.profile.safetyAck || s.progress.sessions.length > 0;
}

async function waitForHydration(): Promise<void> {
  if (useApp.persist.hasHydrated()) return;
  await new Promise<void>((resolve) => {
    const unsub = useApp.persist.onFinishHydration(() => {
      unsub();
      resolve();
    });
  });
}

// Onzichtbaar: regelt anonieme login + cloud-sync. No-op zonder Supabase-keys.
export function SyncProvider() {
  const userIdRef = useRef<string | null>(null);
  const unsubStoreRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      useSyncStore.getState().set({ status: "uit" });
      return;
    }
    const sb = getSupabase();
    if (!sb) return;

    let disposed = false;
    let pushTimer: ReturnType<typeof setTimeout> | undefined;
    useSyncStore.getState().set({ status: "verbinden" });

    const doPush = async (ts: number) => {
      const id = userIdRef.current;
      if (!id) return;
      const ok = await pushState(id, snapshot(), ts).catch(() => false);
      if (ok) {
        localStorage.setItem(STAMP_KEY, String(ts));
        useSyncStore.getState().set({ lastSyncedAt: ts });
      }
    };

    const reconcileAndSubscribe = async (userId: string) => {
      await waitForHydration();
      if (disposed) return;

      const remote = await pullState(userId).catch(() => null);
      const localStamp = Number(localStorage.getItem(STAMP_KEY) || "0");

      if (remote) {
        if (remote.updatedAt > localStamp) {
          useApp.getState().replaceState(remote.snapshot);
          localStorage.setItem(STAMP_KEY, String(remote.updatedAt));
          useSyncStore.getState().set({ lastSyncedAt: remote.updatedAt });
        } else if (localStamp > remote.updatedAt || (localStamp === 0 && hasLocalData())) {
          await doPush(Date.now());
        } else {
          useSyncStore.getState().set({ lastSyncedAt: remote.updatedAt });
        }
      } else if (hasLocalData()) {
        await doPush(Date.now());
      }

      // Lokale wijzigingen voortaan (gedebounced) naar de cloud pushen.
      unsubStoreRef.current();
      unsubStoreRef.current = useApp.subscribe(() => {
        clearTimeout(pushTimer);
        pushTimer = setTimeout(() => doPush(Date.now()), 1200);
      });
    };

    const { data: authSub } = sb.auth.onAuthStateChange((_event, session) => {
      if (disposed) return;
      const u = session?.user;
      if (!u) {
        useSyncStore.getState().set({ status: "uit", email: null });
        return;
      }
      useSyncStore.getState().set({
        status: u.is_anonymous ? "anoniem" : "gekoppeld",
        email: u.email ?? null,
      });
      if (userIdRef.current !== u.id) {
        userIdRef.current = u.id;
        void reconcileAndSubscribe(u.id);
      }
    });

    // Geen sessie? Anoniem inloggen zodat sync direct werkt (zonder drempel).
    void (async () => {
      const { data } = await sb.auth.getSession();
      if (!data.session && !disposed) {
        const { error } = await sb.auth.signInAnonymously();
        if (error) useSyncStore.getState().set({ status: "fout" });
      }
    })();

    return () => {
      disposed = true;
      clearTimeout(pushTimer);
      unsubStoreRef.current();
      authSub.subscription.unsubscribe();
    };
  }, []);

  return null;
}
