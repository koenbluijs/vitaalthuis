import exercisesJson from "@/content/exercises.json";
import programJson from "@/content/program.json";
import type { Exercise, ProgramDay, Category } from "./types";

export const EXERCISES = (exercisesJson as { exercises: Exercise[] }).exercises;
export const PROGRAM = (programJson as { days: ProgramDay[] }).days;
export const CATEGORIES = (exercisesJson as { categories: Category[] }).categories;

const byId = new Map<string, Exercise>(EXERCISES.map((e) => [e.id, e]));

export function getExercise(id: string): Exercise | undefined {
  return byId.get(id);
}

export function getDay(day: number): ProgramDay | undefined {
  return PROGRAM.find((d) => d.day === day);
}

export function dayExercises(day: ProgramDay): Exercise[] {
  return day.exercise_ids
    .map((id) => byId.get(id))
    .filter((e): e is Exercise => Boolean(e));
}

export function exercisesByCategory(category: Category): Exercise[] {
  return EXERCISES.filter((e) => e.category === category);
}

export function isAvoided(ex: Exercise, avoid: string[]): boolean {
  if (!avoid || avoid.length === 0 || avoid.includes("geen")) return false;
  return ex.tags.some((t) => avoid.includes(t));
}

/**
 * De oefeningen van een dag, met de door de gebruiker vermeden bewegingen eruit
 * gefilterd. Wordt de dag te kort, dan vullen we veilig aan met andere niet-vermeden
 * oefeningen (bij voorkeur uit dezelfde categorieën), zodat een dag bruikbaar blijft.
 */
export function effectiveDayExercises(day: ProgramDay, avoid: string[]): Exercise[] {
  const all = dayExercises(day);
  if (!avoid || avoid.length === 0 || avoid.includes("geen")) return all;

  const list = all.filter((e) => !isAvoided(e, avoid));
  if (list.length >= 4) return list;

  const have = new Set(list.map((e) => e.id));
  const dayCats = new Set(all.map((e) => e.category));
  const candidates = EXERCISES.filter(
    (e) => !have.has(e.id) && !isAvoided(e, avoid),
  ).sort((a, b) => Number(dayCats.has(b.category)) - Number(dayCats.has(a.category)));

  for (const e of candidates) {
    if (list.length >= 4) break;
    list.push(e);
  }
  return list;
}
