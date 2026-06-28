"use client";

import { create } from "zustand";

export type SyncStatus = "uit" | "verbinden" | "anoniem" | "gekoppeld" | "fout";

interface SyncState {
  status: SyncStatus;
  email: string | null; // e-mail als de gebruiker gekoppeld is
  lastSyncedAt: number | null;
  set: (patch: Partial<Omit<SyncState, "set">>) => void;
}

// Niet-gepersisteerde status puur voor de UI (Instellingen).
export const useSyncStore = create<SyncState>((set) => ({
  status: "uit",
  email: null,
  lastSyncedAt: null,
  set: (patch) => set(patch),
}));
