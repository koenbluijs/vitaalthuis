import type { Level, Dosage } from "./types";

export const LEVELS: {
  id: Level;
  tagline: string;
  description: string;
  forWho: string;
}[] = [
  {
    id: "Rustig starten",
    tagline: "Rustig en met steun beginnen",
    description:
      "Korte oefeningen met steun van een stoel of het aanrecht. Eén rondje per oefening. Perfect als je net begint of weer instapt.",
    forWho: "Je begint net, of je wilt het rustig en zeker opbouwen.",
  },
  {
    id: "Actief blijven",
    tagline: "Je conditie en balans onderhouden",
    description:
      "Iets meer herhalingen en wat minder steun. Eén tot twee rondjes per oefening. Voor wie al wat beweegt.",
    forWho: "Je beweegt al regelmatig en wilt het op peil houden.",
  },
  {
    id: "Sterker worden",
    tagline: "Een stapje verder, in jouw tempo",
    description:
      "Meer herhalingen en uitdagendere varianten, twee tot drie rondjes. Nog steeds rustig en veilig, nooit tot het uiterste.",
    forWho: "Je voelt je stevig en wilt rustig sterker worden.",
  },
];

export function dosageKey(level: Level): keyof Dosage {
  if (level === "Rustig starten") return "rustig_starten";
  if (level === "Actief blijven") return "actief_blijven";
  return "sterker_worden";
}

export function dosageFor(
  dosage: Dosage,
  level: Level,
): string {
  return dosage[dosageKey(level)];
}

// Eerlijke tijdsinschatting: per oefening reken je instructie lezen + uitvoeren +
// korte rust. Hoger niveau = meer sets = meer tijd. We tonen een kleine marge,
// want het tempo verschilt per persoon (geen tijdsdruk).
const MIN_PER_EXERCISE: Record<Level, number> = {
  "Rustig starten": 1.4,
  "Actief blijven": 1.9,
  "Sterker worden": 2.4,
};

export function estimateMinutes(count: number, level: Level): { low: number; high: number } {
  const mid = count * MIN_PER_EXERCISE[level];
  const low = Math.max(3, Math.round(mid * 0.85));
  const high = Math.max(low + 1, Math.round(mid * 1.2));
  return { low, high };
}

export function formatMinutes(count: number, level: Level): string {
  const { low, high } = estimateMinutes(count, level);
  return `ongeveer ${low}–${high} minuten`;
}
