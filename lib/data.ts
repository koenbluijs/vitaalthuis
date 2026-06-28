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
