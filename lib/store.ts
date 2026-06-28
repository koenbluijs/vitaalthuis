"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { Level, Focus, SessionRecord } from "./types";
import { getDay } from "./data";
import { computeAggregates, dateStr } from "./progress";
import { evaluateBadges } from "./badges";

export interface Profile {
  onboarded: boolean;
  safetyAck: boolean;
  ageBand?: string;
  activity?: string;
  focus?: Focus;
  canStandUp?: string;
  avoid: string[];
  level: Level;
}

export interface Settings {
  textScale: "normaal" | "groot" | "extra-groot";
  highContrast: boolean;
  theme: "licht" | "donker" | "systeem";
  reminderEnabled: boolean;
  reminderTime: string;
  habitAnchor: string;
  weeklyGoal: number;
}

export interface Progress {
  currentDay: number;
  cycle: number;
  sessions: SessionRecord[];
  active: { day: number; doneIds: string[] } | null;
  unlockedBadges: string[];
  justUnlocked: string[];
}

interface AppState {
  profile: Profile;
  settings: Settings;
  progress: Progress;

  acknowledgeSafety: () => void;
  completeOnboarding: (p: Partial<Profile>) => void;
  setLevel: (level: Level) => void;
  updateSettings: (s: Partial<Settings>) => void;

  startDay: (day: number) => void;
  toggleExercise: (day: number, id: string) => void;
  finishDay: (day: number) => void;
  confirmRest: (day: number) => void;
  clearJustUnlocked: () => void;
  resetAll: () => void;
  replaceState: (snap: { profile: Profile; settings: Settings; progress: Progress }) => void;
}

const initialProfile: Profile = {
  onboarded: false,
  safetyAck: false,
  avoid: [],
  level: "Rustig starten",
};

const initialSettings: Settings = {
  textScale: "normaal",
  highContrast: false,
  theme: "systeem",
  reminderEnabled: false,
  reminderTime: "08:30",
  habitAnchor: "",
  weeklyGoal: 3,
};

const initialProgress: Progress = {
  currentDay: 1,
  cycle: 1,
  sessions: [],
  active: null,
  unlockedBadges: [],
  justUnlocked: [],
};

function minutesFor(day: number, doneCount: number): number {
  const d = getDay(day);
  if (!d) return 0;
  const planned = Math.max(1, d.exercise_ids.length);
  return Math.round(d.estimated_minutes * Math.min(1, doneCount / planned));
}

function upsertTodaySession(
  sessions: SessionRecord[],
  rec: SessionRecord,
): SessionRecord[] {
  const i = sessions.findIndex((s) => s.date === rec.date && s.day === rec.day);
  if (i === -1) return [...sessions, rec];
  const copy = sessions.slice();
  copy[i] = { ...copy[i], ...rec };
  return copy;
}

function nextDay(day: number, cycle: number): { currentDay: number; cycle: number } {
  return day >= 30 ? { currentDay: 1, cycle: cycle + 1 } : { currentDay: day + 1, cycle };
}

function recomputeBadges(state: AppState): {
  unlockedBadges: string[];
  justUnlocked: string[];
} {
  const agg = computeAggregates(state.progress.sessions);
  const earned = evaluateBadges(agg, {
    habitAnchorSet: Boolean(state.settings.habitAnchor),
  });
  const prev = new Set(state.progress.unlockedBadges);
  const newly = earned.filter((id) => !prev.has(id));
  return {
    unlockedBadges: Array.from(new Set([...state.progress.unlockedBadges, ...earned])),
    justUnlocked: newly.length ? newly : state.progress.justUnlocked,
  };
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      profile: initialProfile,
      settings: initialSettings,
      progress: initialProgress,

      acknowledgeSafety: () =>
        set((s) => ({ profile: { ...s.profile, safetyAck: true } })),

      completeOnboarding: (p) =>
        set((s) => ({ profile: { ...s.profile, ...p, onboarded: true } })),

      setLevel: (level) => set((s) => ({ profile: { ...s.profile, level } })),

      updateSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),

      startDay: (day) =>
        set((s) => {
          const today = dateStr();
          const existing = s.progress.sessions.find(
            (x) => x.date === today && x.day === day && !x.finished,
          );
          return {
            progress: {
              ...s.progress,
              active: { day, doneIds: existing ? existing.doneIds : [] },
            },
          };
        }),

      toggleExercise: (day, id) =>
        set((s) => {
          const today = dateStr();
          const active = s.progress.active ?? { day, doneIds: [] };
          const has = active.doneIds.includes(id);
          const doneIds = has
            ? active.doneIds.filter((x) => x !== id)
            : [...active.doneIds, id];
          const d = getDay(day);
          const rec: SessionRecord = {
            date: today,
            day,
            type: d?.type ?? "",
            isRest: false,
            doneIds,
            minutes: minutesFor(day, doneIds.length),
            finished: false,
          };
          const sessions = upsertTodaySession(s.progress.sessions, rec);
          const next: AppState = {
            ...s,
            progress: { ...s.progress, active: { day, doneIds }, sessions },
          };
          const badges = recomputeBadges(next);
          return { progress: { ...next.progress, ...badges } };
        }),

      finishDay: (day) =>
        set((s) => {
          const today = dateStr();
          const d = getDay(day);
          const active = s.progress.active;
          const doneIds = active && active.day === day ? active.doneIds : [];
          const rec: SessionRecord = {
            date: today,
            day,
            type: d?.type ?? "",
            isRest: false,
            doneIds,
            minutes: minutesFor(day, doneIds.length),
            finished: true,
          };
          // Self-paced: max 1 programmadag per kalenderdag. Extra sessies tellen
          // wel mee voor de streak, maar slaan geen dagen over.
          const alreadyFinishedToday = s.progress.sessions.some(
            (x) => x.date === today && x.finished,
          );
          const sessions = upsertTodaySession(s.progress.sessions, rec);
          const adv = alreadyFinishedToday
            ? { currentDay: s.progress.currentDay, cycle: s.progress.cycle }
            : nextDay(day, s.progress.cycle);
          const next: AppState = {
            ...s,
            progress: {
              ...s.progress,
              sessions,
              active: null,
              currentDay: adv.currentDay,
              cycle: adv.cycle,
            },
          };
          const badges = recomputeBadges(next);
          return { progress: { ...next.progress, ...badges } };
        }),

      confirmRest: (day) =>
        set((s) => {
          const today = dateStr();
          const alreadyFinishedToday = s.progress.sessions.some(
            (x) => x.date === today && x.finished,
          );
          const rec: SessionRecord = {
            date: today,
            day,
            type: "Herstel",
            isRest: true,
            doneIds: [],
            minutes: 0,
            finished: true,
          };
          const sessions = upsertTodaySession(s.progress.sessions, rec);
          const adv = alreadyFinishedToday
            ? { currentDay: s.progress.currentDay, cycle: s.progress.cycle }
            : nextDay(day, s.progress.cycle);
          const next: AppState = {
            ...s,
            progress: {
              ...s.progress,
              sessions,
              active: null,
              currentDay: adv.currentDay,
              cycle: adv.cycle,
            },
          };
          const badges = recomputeBadges(next);
          return { progress: { ...next.progress, ...badges } };
        }),

      clearJustUnlocked: () =>
        set((s) => ({ progress: { ...s.progress, justUnlocked: [] } })),

      resetAll: () =>
        set(() => ({
          profile: initialProfile,
          settings: initialSettings,
          progress: initialProgress,
        })),

      replaceState: (snap) =>
        set(() => ({
          profile: { ...initialProfile, ...snap.profile },
          settings: { ...initialSettings, ...snap.settings },
          progress: { ...initialProgress, ...snap.progress },
        })),
    }),
    {
      name: "vitaal-thuis-v1",
      partialize: (s) => ({
        profile: s.profile,
        settings: s.settings,
        progress: s.progress,
      }),
    },
  ),
);

/** Wacht tot de persisted state geladen is (voorkomt SSR/hydration-mismatch). */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (useApp.persist.hasHydrated()) setHydrated(true);
    const unsub = useApp.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);
  return hydrated;
}
