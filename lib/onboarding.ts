import type { Level, Focus } from "./types";

// Geen medische intake — alleen simpele personalisatie en routering.

export interface OnboardingAnswers {
  activity?: "bijna-niet" | "af-en-toe" | "regelmatig";
  canStandUp?: "ja" | "met-steun" | "nee" | "onbekend";
  focus?: Focus;
  avoid: string[];
  ageBand?: "50-60" | "60-70" | "70-plus" | "onbekend";
}

export interface OnboardingOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

export const ACTIVITY_OPTIONS: OnboardingOption<NonNullable<OnboardingAnswers["activity"]>>[] = [
  { value: "bijna-niet", label: "Bijna niet", hint: "Ik beweeg op dit moment weinig." },
  { value: "af-en-toe", label: "Af en toe", hint: "Af en toe een wandeling of klusje." },
  { value: "regelmatig", label: "Regelmatig", hint: "Ik beweeg meerdere keren per week." },
];

export const STAND_OPTIONS: OnboardingOption<NonNullable<OnboardingAnswers["canStandUp"]>>[] = [
  { value: "ja", label: "Ja, zonder steun" },
  { value: "met-steun", label: "Ja, met steun van een leuning" },
  { value: "nee", label: "Dat gaat moeilijk" },
  { value: "onbekend", label: "Weet ik niet zeker" },
];

export const FOCUS_OPTIONS: OnboardingOption<Focus>[] = [
  { value: "Kracht", label: "Kracht", hint: "Sterker worden voor dagelijkse dingen." },
  { value: "Balans", label: "Balans", hint: "Zekerder op je benen staan." },
  { value: "Soepelheid", label: "Soepelheid", hint: "Losser en soepeler bewegen." },
  { value: "Algemeen vitaal", label: "Gewoon vitaal blijven", hint: "Een beetje van alles." },
];

export const AVOID_OPTIONS: OnboardingOption<string>[] = [
  { value: "grond-liggen", label: "Op de grond liggen" },
  { value: "diep-bukken", label: "Diep bukken naar de grond" },
  { value: "een-been", label: "Op één been staan" },
  { value: "knielen", label: "Knielen" },
  { value: "geen", label: "Niets, alles mag" },
];

export const AGE_OPTIONS: OnboardingOption<NonNullable<OnboardingAnswers["ageBand"]>>[] = [
  { value: "50-60", label: "50 – 60" },
  { value: "60-70", label: "60 – 70" },
  { value: "70-plus", label: "70 of ouder" },
  { value: "onbekend", label: "Liever niet zeggen" },
];

export const HABIT_ANCHORS: string[] = [
  "na de koffie",
  "na het ontbijt",
  "na het nieuws",
  "terwijl de thee trekt",
  "voor het avondeten",
  "een eigen moment",
];

/** Stelt een passend, veilig startniveau voor op basis van de antwoorden. */
export function suggestLevel(a: OnboardingAnswers): Level {
  // Veiligste route eerst: moeite met opstaan -> rustig starten.
  if (a.canStandUp === "nee" || a.canStandUp === "met-steun") return "Rustig starten";
  if (a.canStandUp === "onbekend") return "Rustig starten";

  if (a.activity === "bijna-niet") return "Rustig starten";
  if (a.activity === "regelmatig") {
    // 70+ houden we standaard op het middenniveau, tenzij men juist rustig wil.
    return a.ageBand === "70-plus" ? "Actief blijven" : "Sterker worden";
  }
  // af en toe, of onbekend
  return "Actief blijven";
}

/**
 * Niet-blokkerende veiligheidsroutering: als iemand aangeeft dat opstaan moeilijk
 * gaat of het niet zeker weet, tonen we een zachte "overleg met je arts"-suggestie.
 */
export function shouldSuggestDoctor(a: OnboardingAnswers): boolean {
  return a.canStandUp === "nee";
}
