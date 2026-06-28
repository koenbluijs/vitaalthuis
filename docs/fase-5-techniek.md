<!--
Fase 5 — Technische MVP voor Vitaal Thuis
Opgesteld: 2026-06-28. Local-first PWA (Next.js + TypeScript + Tailwind).
Bevat ook Stap 7: testinstructies en verbeterpunten. Status: gebouwd en geverifieerd.
-->

# Fase 5 — Technische MVP (Vitaal Thuis)

> Werkende, local-first PWA. Build slaagt, end-to-end flow handmatig en geautomatiseerd
> doorlopen. Aanspreekvorm "je". Niet-medisch.

## Architectuur

- **Next.js 14 (App Router) + TypeScript + Tailwind CSS.** Mobile-first, max. ~480px
  container, één primaire actie per scherm.
- **Local-first state** met Zustand + `persist` naar `localStorage` (`lib/store.ts`,
  key `vitaal-thuis-v1`). Geen account nodig; alles blijft op het apparaat. Een
  `useHydrated()`-hook voorkomt SSR/hydration-mismatch.
- **Design tokens** als CSS-variabelen (`app/globals.css`, `:root` + `.dark` +
  `.contrast-more`), gemapt in `tailwind.config.ts`. Tekstgrootte en thema worden op
  `<html>` toegepast door `components/Providers.tsx`.
- **PWA**: `public/manifest.webmanifest` + `public/sw.js` (network-first met
  cache-fallback, registratie in `Providers`).
- **Content** als seed-JSON in `content/` (los van code), gegenereerd/gevalideerd via
  `scripts/`.

## Datamodel

Domeintypes in `lib/types.ts`. Lokale opslag bevat drie blokken:

- `profile` — onboarding-antwoorden, gekozen niveau, veiligheids-acknowledge.
- `settings` — tekstgrootte, contrast, thema, habit-anker, herinnering.
- `progress` — `currentDay`, `cycle`, `sessions[]` (per dag/datum), `active` sessie,
  `unlockedBadges`, `justUnlocked`.

De **vergevende streak** (`lib/progress.ts`) telt actieve dagen terug vanaf vandaag en
overbrugt één gemiste dag (stille buffer); pas bij twee of meer dagen op rij stopt de
telling — geen reset of straf bij één misser. Een rustdag die je bevestigt telt mee.

**Badges** (`lib/badges.ts`) worden afgeleid uit geaggregeerde sessiedata en volgen de
vergevende vensterlogica (geen harde ononderbroken keten).

De Supabase-tegenhanger staat in `supabase/schema.sql` (tabellen: `profiles`, `settings`,
`exercise_library`, `programs`, `program_days`, `day_exercises`, `completions`, `streaks`,
`badges`, `user_badges`) met RLS-aanzet. De lokale structuur mapt hier 1-op-1 op, zodat
sync/login later toegevoegd kan worden zonder het model te herzien.

## Toegankelijkheid (gebouwd)

- Body ≥18px, instelbaar (normaal/groot/extra-groot via root font-size → de hele schaal
  schaalt mee). Inter, nooit lichter dan 400.
- Tap-targets ≥48px (primaire knop 56px), zichtbare focus-ring, één-vinger interacties.
- WCAG AA-contrast, deterministisch geverifieerd: `npm run check:contrast` (46 paren, 0
  failures, body 12,5–14,4:1).
- "Meer contrast"-modus en dark mode via token-override.

## Stap 7 — Testinstructies

**Geautomatiseerd (build + types):**

```bash
npm run typecheck     # geen typefouten
npm run build         # productie-build slaagt, alle pagina's gegenereerd
npm run check:contrast # WCAG AA: 46/46 paren halen het minimum
```

**Handmatig (in de browser, `npm run dev`):**

1. **Onboarding** — Welkom → "Beginnen" → veiligheidsscherm → "Begrepen, verder" →
   beantwoord de 5 vragen → kies een momentje → controleer dat een **passend niveau**
   wordt voorgesteld → "Beginnen met …".
2. **Routering veiligheid** — kies bij "opstaan uit een stoel" de optie *"Dat gaat
   moeilijk"* en controleer dat een niet-blokkerende "overleg met je arts"-melding
   verschijnt (de app blokkeert nooit).
3. **Dagprogramma** — op "Vandaag" zie je *dag 1 van 30*, het weekthema, ±minuten en de
   oefeningenlijst. Start de sessie (knoptekst bevat je gekozen moment).
4. **Sessie** — loop met "Volgende" door de oefeningen, vink "Gedaan" aan, open
   "Makkelijker"/"Een stapje verder", rond af met "Dag afronden" → "Klaar voor vandaag".
5. **Badge** — na je eerste "Gedaan" verschijnt onderaan rustig de badge *Eerste stap*
   (niet-blokkerend, weg te klikken met "Mooi!").
6. **Voortgang** — controleer streak (🌿), maandcijfers, kalenderstrip en het
   badge-overzicht (behaald vs. vergrendeld).
7. **Bibliotheek** — `Oefeningen` → categorie → een oefening → controleer dosering per
   niveau, veiligheidstip en contra-indicaties.
8. **Instellingen** — wissel niveau, zet tekstgrootte op Aa++, zet dark mode en "meer
   contrast" aan; controleer dat de hele app meebeweegt. Test "Opnieuw beginnen".
9. **Vergevende streak** — sla een dag over (of wis data en bouw historie) en controleer
   dat er geen straf/rode reset is, maar een warme "fijn dat je er weer bent".
10. **PWA/offline** — installeer de app; zet daarna het netwerk uit en herlaad: de app
    opent nog steeds (service-worker-cache).

## Verbeterpunten / volgende stappen

- **Echte media**: oefeningen tonen nu een placeholder; voeg rustige illustraties/video
  met optionele audio toe (zie stijlgids Fase 4). Eventueel gesproken instructies.
- **Echte iconen**: vervang de emoji-placeholders (nav, categorieën, streak-blaadje) door
  de outline-iconenset uit de stijlgids; tekst blijft leidend.
- **Slimme progressie**: regelset voor "voorzichtig opschalen" en de optionele "Hoe
  voelde dit?"-feedback na een sessie (nu nog niet geïmplementeerd).
- **Lokale herinneringen**: de voorkeur staat klaar; voeg daadwerkelijke (lokale)
  notificaties toe. Push blijft bewust buiten de MVP.
- **Account & sync (optioneel, later)**: activeer `supabase/schema.sql`, voeg login en
  sync toe zodat data niet apparaat-gebonden is. Local-first blijft de standaard.
- **`avoid`-personalisatie**: de vermeden-bewegingen worden opgeslagen maar nog niet
  gebruikt om oefeningen te filteren/vervangen — een logische volgende verfijning.
- **Challenge & laagdrempelig sociaal**: optionele maandchallenge en privacyvriendelijke,
  coöperatieve sociale features (opt-in), conform Fase 1/3.
- **Gebruikerstest met échte 50/60-plussers** vóór een bredere lancering — de bekendste
  faalmodus is ongetoetste aannames.
- **Tooling**: een vaste e2e-test (bijv. Playwright) en linting in CI toevoegen.
