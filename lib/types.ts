// Domeintypes voor Vitaal Thuis. Niet-medisch; zie docs/fase-1 t/m fase-8.

export type Level = "Rustig starten" | "Actief blijven" | "Sterker worden";

export type Focus = "Kracht" | "Balans" | "Soepelheid" | "Algemeen vitaal";

export type Category =
  | "Benen & opstaan"
  | "Balans"
  | "Heupen & onderrug"
  | "Schouders & armen"
  | "Core/stabiliteit"
  | "Dagelijkse kracht"
  | "Mobiliteit";

export interface Dosage {
  rustig_starten: string;
  actief_blijven: string;
  sterker_worden: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: Category;
  short_explanation: string;
  why_useful: string;
  target_muscles: string[];
  adl: string;
  steps: string[];
  dosage: Dosage;
  safety_tip: string;
  easier: string;
  harder: string;
  cautions: string;
  suitable_levels: Level[];
  support_needed: string;
  equipment: string;
  media_placeholder: string;
  motion: MotionType;
  tags: string[];
}

export type MotionType =
  | "stand"
  | "sit-to-stand"
  | "seated"
  | "balance"
  | "hinge"
  | "arm"
  | "wall"
  | "floor"
  | "heel-raise"
  | "carry";

export interface ProgramDay {
  day: number;
  week: number;
  week_theme: string;
  type: string;
  focus: string;
  is_rest: boolean;
  estimated_minutes: number;
  exercise_ids: string[];
}

export interface SessionRecord {
  date: string; // YYYY-MM-DD (lokale datum)
  day: number; // welke programmadag
  type: string;
  isRest: boolean;
  doneIds: string[];
  minutes: number;
  finished: boolean;
}

export interface Aggregates {
  sessionsCount: number;
  totalExercises: number;
  totalMinutes: number;
  activeDaysTotal: number;
  last7Active: number;
  threeInWeek: boolean;
  categoryCounts: Record<string, number>;
  chairCount: number;
  mobilityDates: number;
  finishedDay7: boolean;
  finishedDay30: boolean;
  returnedAfterGap: boolean;
}
