"use client";

import { getSupabase } from "./supabase";
import type { Profile, Settings, Progress } from "./store";

// Local-first sync: we bewaren de hele app-state als één snapshot per gebruiker
// (tabel app_state). Last-write-wins op basis van updated_at. Simpel en robuust
// voor een persoonlijke, lokale app met optionele cloud-back-up.
export interface Snapshot {
  profile: Profile;
  settings: Settings;
  progress: Progress;
}

export async function pullState(
  userId: string,
): Promise<{ snapshot: Snapshot; updatedAt: number } | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("app_state")
    .select("state, updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data || !data.state) return null;
  return {
    snapshot: data.state as Snapshot,
    updatedAt: new Date(data.updated_at as string).getTime(),
  };
}

export async function pushState(
  userId: string,
  snapshot: Snapshot,
  updatedAtMs: number,
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from("app_state").upsert(
    {
      user_id: userId,
      state: snapshot,
      updated_at: new Date(updatedAtMs).toISOString(),
    },
    { onConflict: "user_id" },
  );
  return !error;
}

/** Koppel een e-mail aan de (anonieme) gebruiker zodat de voortgang bewaard blijft. */
export async function saveWithEmail(
  email: string,
  redirectTo: string,
): Promise<{ ok: boolean; message: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: "Sync is niet geconfigureerd." };
  const { data } = await sb.auth.getUser();
  const isAnon = data.user?.is_anonymous;
  if (isAnon) {
    // Anonieme gebruiker omzetten naar permanent met e-mailbevestiging.
    const { error } = await sb.auth.updateUser({ email }, { emailRedirectTo: redirectTo });
    if (error) return { ok: false, message: error.message };
    return {
      ok: true,
      message: "Check je e-mail en bevestig de link. Daarna is je voortgang bewaard.",
    };
  }
  // Al permanent: stuur een inloglink (magic link).
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "We hebben je een inloglink gemaild." };
}

/** Inloggen op een ander apparaat met een e-mail-inloglink. */
export async function signInWithEmail(
  email: string,
  redirectTo: string,
): Promise<{ ok: boolean; message: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: "Sync is niet geconfigureerd." };
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "We hebben je een inloglink gemaild." };
}

export async function signOut(): Promise<void> {
  const sb = getSupabase();
  if (sb) await sb.auth.signOut();
}
