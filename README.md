# Vitaal Thuis 🌿

Een eenvoudige dagelijkse beweeg-app voor 50/60-plussers. Blijf thuis sterk, soepel en
in balans in 5 tot 10 minuten per dag — geen sportschool, geen apparaten, geen
prestatiedruk. **Niet-medisch:** de app geeft geen diagnose of behandeladvies.

Mobile-first PWA, **local-first** (werkt zonder account; je gegevens blijven op je
apparaat), gebouwd met Next.js + TypeScript + Tailwind.

## Snel starten

```bash
npm install
npm run dev      # http://localhost:3000
```

Andere scripts:

```bash
npm run build            # productie-build
npm start                # productie-server (na build)
npm run typecheck        # TypeScript controleren
npm run check:contrast   # WCAG-contrast van het kleurensysteem verifiëren (Python)
```

## Wat zit erin (MVP)

- Warm **welkomscherm** en niet-medisch **veiligheidsscherm** (rode vlaggen + disclaimer)
- **Onboarding** in 5 korte vragen (geen medische intake) → passend startniveau
- 3 **niveaus**: Rustig starten · Actief blijven · Sterker worden
- **Dagprogramma** (30 dagen) met oefeningen stap voor stap en afvinken
- **Oefenbibliotheek**: 36 oefeningen over 7 categorieën, elk met dosering per niveau,
  veiligheidstip, makkelijker/moeilijker en contra-indicaties
- **Vergevende streak**, **badges** en een rustig **voortgangsscherm**
- **Instellingen**: niveau, tekstgrootte, meer contrast, licht/donker, habit-anker +
  (lokaal voorbereide) herinnering
- **PWA**: installeerbaar, werkt offline (service worker + manifest)
- Toegankelijk: grote knoppen (≥48px), body ≥18px, WCAG AA-contrast (geverifieerd),
  één primaire actie per scherm, "je"-vorm in eenvoudig Nederlands

## Projectstructuur

```
app/                 Next.js App Router (schermen)
  page.tsx           Welkom
  veiligheid/        Disclaimer + rode vlaggen
  onboarding/        5 vragen + niveauvoorstel
  vandaag/           Dagprogramma + /sessie (oefenflow)
  oefeningen/        Bibliotheek + [id] detail
  voortgang/         Streak, cijfers, badges
  instellingen/      Niveau, weergave, herinnering
components/          UI-componenten (Button, ExerciseCard, SafetyAlert, ...)
lib/                 Domeinlogica (store, progress/streak, badges, copy, safety)
content/             Seed-data: exercises.json (36) + program.json (30 dagen)
scripts/             build-program.py, check-contrast.py
supabase/schema.sql  Supabase-ready schema (voor latere sync/login)
docs/                Fase 1 t/m 6: onderzoek, concept, structuur, stijlgids, oefeningen
```

## Data & opslag

De MVP slaat alles **lokaal** op (Zustand + `localStorage`, key `vitaal-thuis-v1`).
Oefeningen en het 30-dagen programma zijn los van elkaar opgeslagen, zodat content
aanpasbaar is zonder de programmaruggengraat te raken. Pas content aan via de JSON in
`content/` (en draai `python3 scripts/build-program.py` als je het programma opnieuw
wilt opbouwen).

## Cloud-sync (Supabase, optioneel)

De app blijft **altijd local-first**. Als de Supabase-keys aanwezig zijn, komt er een
optionele cloud-laag bij: de gebruiker wordt **anoniem** ingelogd zodat de voortgang
automatisch in de cloud wordt bewaard, en kan later een **e-mail koppelen** (magic link,
geen wachtwoord) om op een ander apparaat verder te gaan. De hele app-state wordt als één
JSON-snapshot per gebruiker gesynct (last-write-wins) naar de tabel `app_state`.

Aanzetten (op Vercel):

1. **SQL draaien** — voer `supabase/schema.sql` uit in de Supabase SQL Editor, plus
   `supabase/app_state.sql` (de tabel die de sync gebruikt) en `supabase/events.sql`
   (lichte, privacyvriendelijke analytics). Beide met RLS.
2. **Anonieme login aanzetten** — Supabase Dashboard → Authentication → Sign In / Providers →
   *Allow anonymous sign-ins* inschakelen. (E-mail staat standaard aan.)
3. **Redirect-URL** — zet je Vercel-domein bij Authentication → URL Configuration
   (Site URL + Redirect URLs), zodat de e-mail-inloglinks werken.
4. **Env vars** — zorg dat `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   in je Vercel-project staan (zie `.env.example`). Zonder deze waarden draait de app
   gewoon zonder cloud-sync.

Zonder keys (bv. lokaal) is alles uitgeschakeld en toont Instellingen "niet ingesteld" —
de app werkt dan volledig lokaal verder.

## Testen

Zie `docs/fase-5-techniek.md` voor handmatige testinstructies en bekende verbeterpunten.

## Achtergrond / onderbouwing

De volledige onderbouwing staat in `docs/`: evidence-onderzoek (Fase 1), productconcept
(Fase 2), appstructuur (Fase 3), stijlgids (Fase 4) en de oefenbibliotheek (Fase 6).
