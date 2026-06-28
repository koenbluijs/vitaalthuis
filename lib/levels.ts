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
