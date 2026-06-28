import type { SessionRecord, Aggregates } from "./types";
import { getExercise } from "./data";

// Lokale datum als YYYY-MM-DD (geen UTC-verschuiving).
export function dateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

function activeDateSet(sessions: SessionRecord[]): Set<string> {
  const s = new Set<string>();
  for (const r of sessions) {
    if (r.isRest || r.doneIds.length > 0) s.add(r.date);
  }
  return s;
}

/**
 * Vergevende streak (Fase 3): telt actieve dagen terug vanaf vandaag.
 * Eén gemiste dag wordt overbrugd (stille buffer); pas bij twee of meer
 * achtereen gemiste dagen stopt de telling. Geen straf, geen reset bij één misser.
 */
export function computeStreak(sessions: SessionRecord[], today = dateStr()): number {
  const active = activeDateSet(sessions);
  if (active.size === 0) return 0;

  let streak = 0;
  let started = false;
  let missedRun = 0;
  const cursor = new Date(today + "T00:00:00");

  for (let i = 0; i < 400; i++) {
    const ds = dateStr(cursor);
    if (active.has(ds)) {
      streak += 1;
      started = true;
      missedRun = 0;
    } else if (started) {
      missedRun += 1;
      if (missedRun >= 2) break;
    }
    // Vandaag nog niet gedaan telt niet als gemist zolang we nog niet gestart zijn.
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function activeInLastDays(
  sessions: SessionRecord[],
  n: number,
  today = dateStr(),
): number {
  const active = activeDateSet(sessions);
  let count = 0;
  const cursor = new Date(today + "T00:00:00");
  for (let i = 0; i < n; i++) {
    if (active.has(dateStr(cursor))) count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export function computeAggregates(
  sessions: SessionRecord[],
  today = dateStr(),
): Aggregates {
  const categoryCounts: Record<string, number> = {};
  let totalExercises = 0;
  let totalMinutes = 0;
  let chairCount = 0;
  const mobilityDates = new Set<string>();

  for (const r of sessions) {
    totalMinutes += r.minutes || 0;
    for (const id of r.doneIds) {
      totalExercises += 1;
      const ex = getExercise(id);
      if (ex) {
        categoryCounts[ex.category] = (categoryCounts[ex.category] || 0) + 1;
        if (ex.category === "Mobiliteit") mobilityDates.add(r.date);
        if (/opstaan|sit-to-stand|zitten/.test(id)) chairCount += 1;
      }
    }
  }

  // Terugkeer na een gat van >= 2 dagen tussen twee actieve dagen.
  const activeDatesSorted = Array.from(activeDateSet(sessions)).sort();
  let returnedAfterGap = false;
  for (let i = 1; i < activeDatesSorted.length; i++) {
    if (daysBetween(activeDatesSorted[i - 1], activeDatesSorted[i]) >= 3) {
      returnedAfterGap = true;
      break;
    }
  }

  const finishedDay7 = sessions.some((s) => s.finished && s.day === 7);
  const finishedDay30 = sessions.some((s) => s.finished && s.day === 30);
  const last7 = activeInLastDays(sessions, 7, today);

  return {
    sessionsCount: sessions.length,
    totalExercises,
    totalMinutes,
    activeDaysTotal: activeDatesSorted.length,
    last7Active: last7,
    threeInWeek: last7 >= 3,
    categoryCounts,
    chairCount,
    mobilityDates: mobilityDates.size,
    finishedDay7,
    finishedDay30,
    returnedAfterGap,
  };
}

export function hasFinishedToday(sessions: SessionRecord[], today = dateStr()): boolean {
  return sessions.some((s) => s.date === today && s.finished);
}

export function wasActiveToday(sessions: SessionRecord[], today = dateStr()): boolean {
  return sessions.some(
    (s) => s.date === today && (s.isRest || s.doneIds.length > 0),
  );
}

/** Actieve dagen deze maand (kalendermaand), voor het maandoverzicht. */
export function activeDaysThisMonth(sessions: SessionRecord[], ref = new Date()): number {
  const prefix = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, "0")}`;
  const set = new Set<string>();
  for (const r of sessions) {
    if ((r.isRest || r.doneIds.length > 0) && r.date.startsWith(prefix)) set.add(r.date);
  }
  return set.size;
}
