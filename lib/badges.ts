import type { Aggregates } from "./types";

export interface BadgeDef {
  id: string;
  name: string;
  /** Microcopy die verschijnt zodra je de badge verdient (Fase 3/7). */
  unlockCopy: string;
  /** Korte uitleg van de voorwaarde, voor het badge-overzicht. */
  hint: string;
  earned: (a: Aggregates, ctx: { habitAnchorSet: boolean }) => boolean;
}

// Voorwaarden volgen bewust de vergevende vensterlogica (geen harde keten).
export const BADGES: BadgeDef[] = [
  {
    id: "eerste-stap",
    name: "Eerste stap",
    unlockCopy: "Je eerste stap is gezet. Daar draait alles om — je bent begonnen.",
    hint: "Je eerste oefening voltooid.",
    earned: (a) => a.totalExercises >= 1,
  },
  {
    id: "drie-actieve-dagen",
    name: "Drie actieve dagen",
    unlockCopy: "Drie dagen in beweging deze week. Zo wordt het langzaam een gewoonte.",
    hint: "3 actieve dagen binnen een week.",
    earned: (a) => a.threeInWeek,
  },
  {
    id: "een-week-trouw",
    name: "Een week trouw",
    unlockCopy: "Een week lang trouw aan jezelf. Knap volgehouden.",
    hint: "5 van de 7 dagen iets gedaan.",
    earned: (a) => a.last7Active >= 5,
  },
  {
    id: "balansbouwer",
    name: "Balansbouwer",
    unlockCopy: "Je balans wordt steeds zekerder. Elke keer sta je iets steviger.",
    hint: "10 balansoefeningen gedaan.",
    earned: (a) => (a.categoryCounts["Balans"] || 0) >= 10,
  },
  {
    id: "stoel-squat-held",
    name: "Stoel-squat held",
    unlockCopy: "Twintig keer uit de stoel omhoog. Dat merk je in je dagelijks leven.",
    hint: "20 keer opstaan-uit-de-stoel gedaan.",
    earned: (a) => a.chairCount >= 20,
  },
  {
    id: "sterke-start",
    name: "Sterke start",
    unlockCopy: "De eerste week zit erop. Het lastigste — beginnen — heb je gehad.",
    hint: "Week 1 van het programma afgerond.",
    earned: (a) => a.finishedDay7,
  },
  {
    id: "maand-volbracht",
    name: "Maand volbracht",
    unlockCopy: "Een hele maand bewust bewogen. Wat een mooie prestatie, helemaal in jouw tempo.",
    hint: "Het 30-dagen programma uitgelopen.",
    earned: (a) => a.finishedDay30,
  },
  {
    id: "terug-van-weggeweest",
    name: "Terug van weggeweest",
    unlockCopy: "Fijn dat je er weer bent. Opnieuw beginnen is ook moedig.",
    hint: "Weer actief na een paar dagen pauze.",
    earned: (a) => a.returnedAfterGap,
  },
  {
    id: "trouw-aan-je-moment",
    name: "Trouw aan je moment",
    unlockCopy: "Je hebt je momentje echt een vaste plek gegeven. Zo blijft het hangen.",
    hint: "10 keer geoefend met je vaste moment ingesteld.",
    earned: (a, ctx) => ctx.habitAnchorSet && a.sessionsCount >= 10,
  },
  {
    id: "soepele-start",
    name: "Soepele start",
    unlockCopy: "Even losmaken hoort er net zo goed bij. Je lichaam dankt je ervoor.",
    hint: "5 dagen met een mobiliteitsoefening.",
    earned: (a) => a.mobilityDates >= 5,
  },
  {
    id: "rustig-volgehouden",
    name: "Rustig volgehouden",
    unlockCopy: "Dertig keer de tijd genomen voor jezelf. Dat telt.",
    hint: "30 actieve dagen in totaal.",
    earned: (a) => a.activeDaysTotal >= 30,
  },
];

export function badgeById(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}

export function evaluateBadges(
  agg: Aggregates,
  ctx: { habitAnchorSet: boolean },
): string[] {
  return BADGES.filter((b) => b.earned(agg, ctx)).map((b) => b.id);
}
