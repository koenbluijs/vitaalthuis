// Microcopy (Fase 7) — rustige, positieve coach, aanspreekvorm "je", B1-Nederlands.
// Nooit: "no pain no gain", "push jezelf", "gefaald", "verbrand calorieën", "word jonger".

export const COPY = {
  appName: "Vitaal Thuis",
  tagline: "Elke dag een paar minuten sterk, soepel en in balans blijven.",

  welcome: {
    title: "Welkom bij Vitaal Thuis",
    intro:
      "Een paar rustige oefeningen per dag, gewoon thuis. Geen sportschool, geen apparaten. In je eigen tempo.",
    start: "Beginnen",
    how: "Hoe werkt het?",
    returning: "Ik heb dit al gebruikt",
  },

  dayStart: {
    greeting: "Fijn dat je er bent",
    todayPrefix: "Vandaag",
    start: "Start je oefeningen",
    startWithAnchor: (anchor: string) => `Klaar voor je momentje ${anchor}?`,
    minutes: (m: number) => `Ongeveer ${m} minuten`,
    alreadyDone: "Je hebt vandaag al bewogen. Mooi 🌿",
    extra: "Nog een rustige sessie doen",
    restToday: "Vandaag is een rustdag. Die hoort er net zo goed bij.",
  },

  exercise: {
    why: "Waarom dit helpt",
    how: "Zo doe je het",
    howMuch: "Hoeveel",
    safety: "Let op",
    easier: "Makkelijker maken",
    harder: "Een stapje verder",
    done: "Gedaan",
    doneAgain: "Toch nog niet",
    next: "Volgende",
    notWell: "Niet lekker? Stop gerust",
    progress: (i: number, total: number) => `Oefening ${i} van ${total}`,
  },

  exerciseDone: [
    "Mooi, rustig en gecontroleerd.",
    "Goed gedaan. Zo bouw je het op.",
    "Lekker bezig.",
    "Dat telt. Door naar de volgende, in je eigen tempo.",
  ],

  dayDone: {
    title: "Klaar voor vandaag",
    body: "Mooi, je hebt je lichaam vandaag gebruikt. Daar gaat het om.",
    bodyPartial:
      "Goed bezig. Ook een paar oefeningen tellen mee — je bent er weer.",
    toProgress: "Bekijk je voortgang",
    back: "Terug naar vandaag",
    usedMuscles: (n: number) =>
      `Je hebt vandaag ${n} ${n === 1 ? "keer" : "keer"} bewust je spieren gebruikt.`,
  },

  streak: {
    label: (n: number) =>
      n <= 1 ? "Je bent goed begonnen" : `Je bent al ${n} dagen goed bezig`,
    rest: "Vandaag rust, dat hoort erbij.",
    zero: "Een kleine sessie telt ook. Begin gerust rustig.",
  },

  missedDay: {
    title: "Fijn dat je er weer bent",
    body: "Geen probleem dat je een dag oversloeg. Vandaag pak je het weer rustig op.",
    gentleRestart: "Rustig opnieuw beginnen",
  },

  rest: {
    title: "Rustdag",
    body: "Vandaag draait om herstel. Even niets hoeft ook, of een lichte oefening als je zin hebt.",
    confirm: "Vandaag rust ik bewust",
    lightOption: "Toch even licht bewegen",
    checkin: "Hoe ging deze week?",
    checkinEasier: "Iets rustiger",
    checkinSame: "Zo is het goed",
    checkinHarder: "Iets actiever",
  },

  level: {
    changeTitle: "Niveau aanpassen",
    changeBody:
      "Je kunt altijd wisselen. Rustiger of juist een stapje verder, helemaal aan jou.",
    suggested: (l: string) => `We stellen voor: ${l}`,
    keep: "Dit niveau gebruiken",
  },

  nav: {
    today: "Vandaag",
    exercises: "Oefeningen",
    progress: "Voortgang",
    settings: "Instellingen",
  },

  badgeUnlock: {
    title: "Nieuw behaald",
    nice: "Mooi!",
  },

  generic: {
    next: "Verder",
    back: "Terug",
    save: "Opslaan",
    close: "Sluiten",
    yes: "Ja",
    no: "Nee",
    notSure: "Weet ik niet",
  },
};

/** Deterministische keuze uit een lijst (geen Math.random — veilig voor SSR). */
export function pick<T>(list: T[], seed: number): T {
  return list[((seed % list.length) + list.length) % list.length];
}
