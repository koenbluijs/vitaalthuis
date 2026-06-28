<!--
Fase 3 — Appstructuur & UX-flow voor de 60+ beweeg-app (werktitel: Vitaal Thuis)
Opgesteld: 2026-06-28. Gebaseerd op Fase 1 evidence-onderzoek en Fase 2 productconcept.
Methode: 5 deelontwerpen (architectuur, onboarding+niveaus, dagprogramma+bibliotheek,
progressie+gamification, wireframes) samengevoegd en consistent gemaakt na review.
Status: ter goedkeuring (Fase 3). Nog NIET gebouwd.
-->

# Fase 3 — Appstructuur & UX-flow (Vitaal Thuis)

> Bouwdocument. Beschrijft de schermen, de navigatie, de onboarding, het dagprogramma, het 30-dagen programma, de progressie en de wireframes. Bedoeld om mee te bouwen en om de laatste open keuzes voor te leggen.

Dit ontwerp volgt vier leidende ontwerpregels die overal terugkomen. **Eén primaire actie per scherm:** elk scherm heeft precies één grote, gevulde knop die de gebruiker vooruit helpt, zodat er nooit twijfel is over wat te doen. **Groot en rustig:** body-tekst minimaal 18px, knoppen minimaal 48dp hoog (de primaire knop groter), contrast minimaal 4.5:1, veel witruimte, enkel-vinger taps, geen pinch of long-press. **Vergevend:** geen tijdsdruk, geen aftelklokken, geen straf bij een gemiste dag, alles is omkeerbaar en in je eigen tempo. **Niet-medisch:** Vitaal Thuis geeft geen diagnose of behandeladvies, maar routeert bij twijfel of klachten warm naar "overleg uw arts". Deze regels gelden boven alles: als een keuze ze raakt, winnen de regels.

---

## Schermarchitectuur & navigatie

### 1. Schermenlijst

Elk scherm heeft een doel, één primaire actie, eventuele secundaire acties en de persona's waarvoor het vooral telt (Wim en Greet = lage tech-comfort en valangst; Hans = stijfheid en zittend werk; Faridah = rustige, niet-prestatiegerichte toon; Anouk = fit, wil uitdaging en data).

**Welkom / launch**
- Doel: warm onthaal, vertrouwen wekken, direct laten starten zonder drempel of account.
- Primaire actie: "Beginnen".
- Secundaire acties: "Hoe werkt het?" (korte, geruststellende uitleg in 3 beelden); "Ik heb dit al gebruikt" (zie terugkeer-gedrag hieronder).
- Persona: iedereen, met name Wim/Greet (geen e-mail/wachtwoord-hindernis, lage drempel) en Faridah (rustige uitstraling, geen fitness).

**Veiligheidsscherm / disclaimer**
- Doel: niet-medische positionering tonen, rode vlaggen benoemen, warm routeren naar "overleg uw arts". Geen medische intake.
- Primaire actie: "Begrepen, verder".
- Secundaire acties: "Lees meer over veilig bewegen". Bij een routerings-signaal uit de onboarding: een zachte, niet-blokkerende suggestie "Overleg eerst met uw arts" (zie onboarding).
- Persona: Greet/Wim (geruststelling, valangst); veiligheid voor allen.

**Onboarding (5 vragen + afronding)**
- Doel: minimale routering naar passend niveau, passende oefenselectie en passende taal. Geen medische intake.
- Primaire actie: per vraag het kiezen van een antwoord (tikken = volgende), behalve bij de meerkeuzevraag (zie onder).
- Secundaire acties: "Terug"; elke vraag heeft een veilige uitwijk "Weet ik niet / liever niet zeggen" die naar de veiligste standaard leidt.
- Persona: Anouk (snel klaar); Faridah (niet-prestatiegericht geformuleerd); Hans (stijfheid/zittend werk herkennen); Wim/Greet (alleen tikken, geen typen).

**Routerings-melding (inline, geen apart scherm)**
- Doel: bij een combinatie van onzekere antwoorden (bijv. "beweeg bijna niet" + "opstaan is lastig") een vriendelijke, niet-blokkerende suggestie tonen om met de arts te overleggen.
- Primaire actie: "Toch rustig beginnen".
- Secundaire acties: "Lees over veilig bewegen". Verschijnt inline op het veiligheidsscherm/niveauvoorstel, blokkeert nooit de toegang.
- Persona: Wim/Greet (geruststelling zonder uitsluiting).

**Niveauvoorstel & niveaukeuze**
- Doel: één duidelijk niveau-advies tonen op basis van de antwoorden, met de mogelijkheid zelf te kiezen uit 3.
- Primaire actie: "Hiermee beginnen" (bevestigt het voorgestelde niveau).
- Secundaire acties: "Een ander niveau kiezen" (toont de 3 niveaus); belofte "altijd later te wijzigen in Instellingen".
- Persona: Wim/Greet (krijgen Rustig starten voorgesteld, zonder schaamte); Anouk (krijgt Sterker worden voorgesteld, zonder verveling).

**Home / Dagprogramma**
- Doel: hét anker van de app; toont de oefeningen van vandaag, het habit-anker en de vergevende streak.
- Primaire actie: "Start vandaag" (of "Ga verder" bij een halve sessie).
- Secundaire acties: zien wat de dag inhoudt (dagtype, ~minuten, 4-6 oefeningen); navigeren via de bottom-nav.
- Persona: allen. "Iets is beter dan niets"-toon, geen tijdsdruk.

**Oefening-actief (stap voor stap)**
- Doel: de gebruiker veilig en rustig door de oefeningen leiden, één oefening per scherm.
- Primaire actie: "Klaar, volgende".
- Secundaire acties: video pauzeren/herstarten; audio aan/uit; "Makkelijker maken" / "Moeilijker maken"; "Even pauzeren"; "Niet lekker? Stop" (naar veiligheidsinfo); ✕ om veilig te stoppen (voortgang blijft bewaard). Steun-aanwijzing altijd zichtbaar bij balans. De bottom-nav verdwijnt hier (volledige focus).
- Persona: Wim/Greet (grote knoppen, steun, geen timerdruk); Faridah (rustige taal); allen (video + optionele audio).

**Dag-voltooid**
- Doel: een klein succes vieren, self-efficacy versterken, de vergevende streak tonen.
- Primaire actie: "Terug naar huis".
- Secundaire acties: "Mijn voortgang"; optioneel één tik "Hoe ging het?" (prima/zwaar — informeert de toekomstige toon, geen score). Hooguit één badge tegelijk.
- Persona: allen; warme, respectvolle bevestiging, geen ranglijst.

**Oefenbibliotheek — overzicht**
- Doel: rustig overzicht van de 7 vaste categorieën.
- Primaire actie: een categorie kiezen (elke rij klikt direct door).
- Secundaire acties: geen filter of zoekbalk op de hoofdroute (keuze-overload vermijden).
- Persona: Anouk/Hans (verkennen); voor lage tech-comfort niet de hoofdroute (Home blijft leidend).

**Oefenbibliotheek — categorie**
- Doel: de oefeningen binnen één categorie tonen.
- Primaire actie: een oefening kiezen → Oefening-detail.
- Secundaire acties: "Terug naar overzicht".
- Persona: idem.

**Oefening-detail**
- Doel: één oefening uitleggen, los van het dagprogramma (verkennen of herhalen).
- Primaire actie: "Deze oefening doen".
- Secundaire acties: video afspelen; veiligheidstip lezen; terug.
- Persona: Anouk/Hans (zelf verkennen); Greet (vooraf rustig bekijken voor vertrouwen).

**Voortgang / progressie**
- Doel: bemoedigend terugkijken: actieve dagen, vergevende streak, minuten, weken.
- Primaire actie: "Verder met vandaag" (leidt terug naar de kernactie).
- Secundaire acties: badge bekijken; weekstrook lezen.
- Persona: Anouk (wil data); Greet/Wim (geruststellend, geen afbreuk bij gemiste dag).

**Badges (onder Voortgang)**
- Doel: subtiele, volwassen erkenning van mijlpalen.
- Primaire actie: bekijken.
- Secundaire acties: badge-detail (wat + waarom behaald).
- Persona: ondersteunend voor allen; geen kinderachtigheid, geen competitie.

**Instellingen**
- Doel: zelfregie. Niveau, herinnering, toegankelijkheid en veiligheidsinfo opnieuw lezen.
- Primaire actie: n.v.t. (een rustige lijst van keuzes).
- Secundaire acties: niveau wijzigen; habit-anker en herinnering instellen; toegankelijkheid (tekstgrootte, contrast, audio standaard aan); "Lees de veiligheidsinfo opnieuw"; (LATER) account/sync.
- Persona: Hans/Anouk (aanpassen); Wim/Greet (tekst groter, audio aan); veiligheid herhaalbaar.

### 2. Navigatiemodel

**Een bottom-nav met 4 hoofdsecties**, met Home als duidelijk middelpunt:

- **Vandaag** (Home/Dagprogramma) — start hier
- **Oefeningen** (Bibliotheek)
- **Voortgang** (incl. Badges als sub-onderdeel)
- **Instellingen**

Onderbouwing:
- Een bottom-nav is voor 50/60+ herkenbaar en altijd binnen duimbereik (geen edge-swipe of verstopt hamburgermenu).
- Vier secties is het maximum dat overzichtelijk blijft met grote labels + iconen (≥48dp). Meer tabs verkleint de knoppen en verhoogt keuze-overload.
- Instellingen krijgt bewust een eigen tab (niet weggestopt) omdat de hele app belooft dat niveau, tekstgrootte, contrast en herinnering "later aanpasbaar" zijn. Voor lage tech-comfort moet die belofte zichtbaar en vindbaar zijn; een verstopte route maakt de belofte loos.
- Badges hangen onder Voortgang (geen aparte tab) om het tot 4 te beperken; mijlpalen horen logisch bij terugkijken.
- "Eén primaire actie per scherm" blijft intact: de nav wisselt alléén tússen secties; bínnen een sectie is er steeds precies één primaire knop.
- Tijdens **Oefening-actief verdwijnt de bottom-nav** (full-focus modus), zodat de gebruiker niet per ongeluk wegtikt.
- Welkom, Veiligheidsscherm, Onboarding en Niveaukeuze staan **buiten** de nav (lineaire flow, geen tabs): dat dwingt rust en volgorde af bij de eerste keer.

### 3. Primaire happy-path: eerste keer openen → eerste sessie voltooid

1. App opent op **Welkom**; gebruiker tikt "Beginnen" (start direct anoniem en lokaal, geen account).
2. **Veiligheidsscherm/disclaimer**: niet-medisch, rode vlaggen kort benoemd; gebruiker tikt "Begrepen, verder".
3. **Onboarding vraag 1-5**, elk op een eigen scherm met één vraag; daarna de korte **afronding** (habit-anker + herinnering). Bij een routerings-signaal verschijnt inline een zachte "overleg uw arts"-suggestie die nooit blokkeert.
4. **Niveauvoorstel**: de app stelt op basis van de antwoorden een niveau voor (bijv. "Rustig starten") en de gebruiker bevestigt of kiest een ander van de 3.
5. **Home/Dagprogramma** verschijnt met de oefeningen van vandaag, het gekozen habit-anker ("Doe dit na uw koffie") en de ene knop "Start vandaag".
6. Gebruiker tikt "Start vandaag" → **Oefening-actief**: oefening 1 met video, optionele audio, steun-aanwijzing en de grote knop "Klaar, volgende".
7. Gebruiker werkt de 4-6 oefeningen één voor één af; mag elke oefening makkelijker/moeilijker maken, overslaan of stoppen zonder straf.
8. Na de laatste oefening: **Dag-voltooid** met een warme bevestiging, de begonnen vergevende streak en eventueel één subtiele badge.
9. Gebruiker tikt "Terug naar huis" → **Home**, dat nu "Vandaag gedaan — fijn gedaan" toont. De herinnering voor het gekozen moment is voorbereid.

### 4. Terugkerende-gebruiker dagflow: openen → sessie → klaar

1. App opent direct op **Home/Vandaag** (geen Welkom/onboarding meer); toont de oefeningen van vandaag, het habit-anker en de vergevende streak.
2. Gebruiker tikt "Start vandaag" (of "Ga verder" bij een gepauzeerde dag).
3. **Oefening-actief**: oefeningen één voor één, video + optionele audio, steun bij balans, afvinken met "Klaar, volgende"; makkelijker/moeilijker, overslaan en stoppen blijven mogelijk zonder straf.
4. Na de laatste oefening: **Dag-voltooid** — korte viering, bijgewerkte streak, soms een badge; optioneel één tik "Hoe ging het?".
5. Gebruiker tikt "Terug naar huis" → **Home**, dat de dag als voltooid markeert. Daarbuiten kan de gebruiker vrij naar Oefeningen, Voortgang of Instellingen via de bottom-nav.

**Terugkeer via "Ik heb dit al gebruikt" (randgeval):** als er lokale data bestaat, gaat deze link direct naar Home. Bestaat er nog geen data (bijv. nieuw toestel), dan toont de app een rustige lege staat: "We vinden nog geen eerdere gegevens op dit toestel. Wilt u opnieuw rustig beginnen?" met de knop "Beginnen". Zo ontstaat er geen verwarring of doodlopend scherm.

Toegankelijkheid loopt door de hele architectuur: één primaire actie per scherm, knoppen ≥48dp (primair groter), body ≥18px, contrast ≥4.5:1, B1-taal zonder jargon, geen timers/tijdsdruk, enkel-vinger taps, en de bottom-nav verdwijnt tijdens een actieve sessie.

---

## Onboarding & niveaus

### 1. Onboarding

**Principe.** Maximaal 5 routerings-vragen plus een korte afronding, geen medische intake. Eén vraag per scherm, één groep grote keuzeknoppen, een rustige voortgangsteller ("Vraag 2 van 5"). Het veiligheidsscherm telt niet mee in die teller en staat los ervoor. Alles is in onder de 2 minuten te doen, ook voor Wim: geen typen, alleen tikken. Elke vraag heeft een veilige uitwijk "Weet ik niet / liever niet zeggen", die altijd naar de veiligste standaard leidt (er is dus geen losse "Sla over" — dit ene mechanisme dekt het af).

**Toon vooraf (op Welkom/start):** "Welkom. We stellen een paar korte vragen, zodat we het programma op u afstemmen. Er zijn geen foute antwoorden, en u kunt alles later aanpassen."

---

**Vraag 1 — Huidige activiteit** *(belangrijkste factor voor het niveau)*

> "Hoeveel beweegt u op dit moment op een gewone week?"

- Bijna niet — ik zit veel
- Af en toe — een stukje lopen of klusjes
- Regelmatig — ik beweeg meerdere keren per week
- Veel — ik sport of beweeg bijna dagelijks

*Wat het beïnvloedt:* de hoofdfactor voor de niveau-suggestie. "Bijna niet" → Rustig starten; "Af en toe / Regelmatig" → Actief blijven; "Veel" → Sterker worden (bevestigd door vraag 3). Bepaalt ook het startaantal sets en herhalingen.

---

**Vraag 2 — Zelfstandig opstaan** *(eenvoudige functionele check, geen medische test)*

> "Kunt u zonder hulp van uw handen opstaan uit een gewone stoel?"

- Ja, dat lukt makkelijk
- Ja, maar met mijn handen erbij
- Dat is lastig voor mij
- Weet ik niet

*Wat het beïnvloedt:* "makkelijk" bevestigt een hoger niveau; "met handen erbij" / "lastig" / "weet ik niet" verlaagt de suggestie naar Rustig starten en zet standaard méér steun aan (stoel/muur bij balans, opstaan vanaf een hogere zithoogte of met armleuning). Stuurt direct de oefenvarianten.

---

**Vraag 3 — Focus**

> "Waar wilt u graag aan werken?"

- Sterker worden (kracht)
- Stabieler staan en lopen (balans)
- Soepeler bewegen (soepelheid)
- Gewoon fit en vitaal blijven (algemeen)

*Wat het beïnvloedt:* de samenstelling en volgorde van de dagprogramma's. "Kracht" geeft meer oefeningen uit *Benen & opstaan* en *Dagelijkse kracht*; "Balans" meer uit *Balans* en *Core/stabiliteit*; "Soepelheid" meer uit *Mobiliteit* en *Heupen & onderrug*; "Algemeen" geeft de gebalanceerde standaardmix. **Let op:** balans en functionele kracht blijven áltijd aanwezig (de evidence-kern uit Fase 1); de focus verschuift accenten, hij schakelt geen categorie helemaal uit.

---

**Vraag 4 — Bewegingen die u liever vermijdt** *(meerkeuze)*

> "Zijn er bewegingen die u liever overslaat? (U mag er meerdere kiezen)"

- Diep door de knieën (knielen/hurken)
- Op de grond komen en weer omhoog
- Hoofd ver achterover of snel draaien
- Boven schouderhoogte reiken
- Niets daarvan — alles is prima

*Wat het beïnvloedt:* directe vervanging van oefeningen. Voor elke gekozen beweging kiest de app automatisch een gelijkwaardig alternatief (bijv. geen vloeroefeningen → staande of zittende variant). Zo blijft het dagprogramma compleet zonder een oefening die niet prettig voelt.

*Interactie-uitzondering:* omdat dit meerkeuze is, doorbreekt deze vraag bewust het patroon "tikken = direct volgende". Hier kan de gebruiker meerdere knoppen aan/uit zetten (groot, duidelijk vinkje) en bevestigt daarna met één primaire knop "Volgende". Dit is de enige onboarding-vraag met een aparte Volgende-knop; dat wordt op het scherm rustig duidelijk gemaakt ("Kies er gerust meerdere en tik daarna op Volgende").

---

**Vraag 5 — Leeftijdscategorie** *(licht meewegend signaal)*

> "In welke leeftijdsgroep zit u?"

- 50-59 jaar
- 60-69 jaar
- 70-79 jaar
- 80 jaar of ouder

*Wat het beïnvloedt:* een lichte bijsturing van de niveau-suggestie en de standaard mate van steun (vanaf 70+ standaard gesteunde balans). Leeftijd alleen bepaalt nooit het niveau — het is één signaal naast vraag 1 en 2.

---

**Afronding — habit-anker & herinnering** *(geen routerings-vragen; vandaar buiten de teller "5 vragen")*

Direct na vraag 5, vóór het niveauvoorstel, twee korte, optionele instelvragen die de gedragskern uit Fase 1 en de gamification (zie verder) voeden:

> "Wanneer komt het u het beste uit om even te bewegen?"
> - Na de koffie · Na het ontbijt · Na het nieuws · Terwijl de thee trekt · Voor het avondeten · Een eigen moment

> "Wilt u af en toe een vriendelijke herinnering op dat moment?"
> - Ja graag · Nee, liever niet

Het gekozen anker kleurt de taal in de hele app ("Klaar voor uw momentje na de koffie?") en bepaalt het tijdstip van de (lokale) herinnering. De herinnering is dus **gekoppeld aan het gekozen moment, nooit aan een vast dagdeel** — voor Wim is dat "na het nieuws van zes uur", voor Faridah "terwijl de thee trekt".

---

**Veiligheidsacknowledge in de flow.** Het veiligheidsscherm (zie wireframe 2) staat vóór de vragen, met de rode vlaggen en de niet-medische positionering. Het is verplicht maar niet-intimiderend: bevestigend, niet afschrikkend. De rode-vlaggen-lijst keert terug als altijd-bereikbare link op het dagscherm en tijdens een actieve sessie ("Niet lekker? Stop").

**Routeren in plaats van screenen.** Koos iemand bij vraag 1 "bijna niet" én bij vraag 2 "lastig" of "weet ik niet", dan toont de app een vriendelijke, niet-blokkerende melding (inline, niet als blokkerend scherm): "Fijn dat u start. Als u onzeker bent of bewegen voor u veilig is, overleg het dan even met uw arts. U kunt gewoon rustig beginnen." Dit blokkeert nooit de toegang; het routeert alleen.

**Niveau voorstellen, altijd te wijzigen.** Eén afsluitend scherm met één duidelijk advies (geen keuze-overload):

> "Wij raden u aan om te beginnen met: **Rustig starten**"
> "Korte sessies van 5 minuten, in een rustig tempo en met steun. Iets is altijd beter dan niets — u bouwt rustig op."

- Primair (groot): "Hiermee beginnen".
- Secundair: "Een ander niveau kiezen" → toont de 3 niveaus met "Voor wie" en sessieduur, zodat iemand zelf kan kiezen.

Het voorgestelde niveau is **dynamisch** en volgt uit de antwoorden: Wim/Greet zien "Rustig starten" voorgesteld, Anouk ziet "Sterker worden". Nooit standaard het middenniveau aan iedereen. Belofte op dit scherm: "U kunt het niveau altijd later wijzigen in de Instellingen" — en die route is ook echt aanwezig (eigen tab + wireframe 11).

### 2. Niveaus

De drie niveaus zijn opbouwend en draaien om de **minimale effectieve dosis** uit Fase 1: kort, dagelijks, haalbaar. We sturen op **inspanning** (hoe het voelt: licht → flink), niet op gewicht of prestatie. Balans wordt **uitdagend maar veilig** gehouden: de uitdaging zit in mínder steun en een smallere stand, nooit in risico. Iedere dag bevat balans én functionele kracht; door het dagelijkse ritme wordt de WHO-richtlijn (multicomponent 3+ dagen/week, kracht 2+ dagen/week) ruim gehaald.

---

**Niveau 1 — Rustig starten**

- *Voor wie:* mensen die nu bijna niet bewegen, valangst hebben, of onzeker zijn over opstaan (Wim, Greet). Ook de veilige standaard bij twijfel of bij 80+.
- *Sessieduur:* 5 minuten.
- *Aantal oefeningen:* 4 per dag.
- *Sets:* 1 set per oefening.
- *Herhalingsbereik:* 5-8 herhalingen (of 10-20 seconden bij balans/houdingen).
- *Mate van steun:* standaard **gesteund** — hand aan stoel, muur of aanrecht bij elke balansoefening; zit-sta met armleuning of vanaf hogere zithoogte.
- *Progressie-aanpak:* eerst de gewoonte opbouwen (frequentie boven duur). Na consistente dagen stelt de app voorzichtig één extra herhaling of een paar seconden langer voor — nooit automatisch zwaarder.
- *Veilig op-/afschalen:* opschalen naar Actief blijven wordt pas voorgesteld na een week comfortabel meedoen ("Ging dit makkelijk? U kunt het iets actiever maken."). Afschalen kan altijd met één tik: minder herhalingen, meer steun, of een dag overslaan zonder gevolgen.

---

**Niveau 2 — Actief blijven**

- *Voor wie:* mensen die al af en toe of regelmatig bewegen en stabiel opstaan (Hans, Faridah, veel 60-plussers). De brede middenmoot.
- *Sessieduur:* 7-8 minuten.
- *Aantal oefeningen:* 5 per dag.
- *Sets:* 1-2 sets per oefening.
- *Herhalingsbereik:* 8-12 herhalingen (of 20-30 seconden bij balans/houdingen).
- *Mate van steun:* **gesteund waar nodig, vrij waar het kan** — balans begint met lichte steun (één vinger aan de rugleuning) en bouwt op naar zonder steun in een veilige opstelling (steun binnen handbereik).
- *Progressie-aanpak:* sturen op inspanning. De app vraagt af en toe "Hoe voelde dit?" (te licht / goed / pittig) en past herhalingen of de tweede set aan. Balans wordt moeilijker door minder steun of smallere voetstand, niet door risico.
- *Veilig op-/afschalen:* opschalen naar Sterker worden bij meerdere "te licht"-antwoorden. Afschalen naar Rustig starten gebeurt zacht en zonder oordeel als sessies "pittig" voelen of na een onderbreking. Eén tik volstaat.

---

**Niveau 3 — Sterker worden**

- *Voor wie:* mensen die al bijna dagelijks bewegen of sporten en zonder moeite opstaan (Anouk). Wil meer uitdaging, blijft binnen 5-10 min.
- *Sessieduur:* 9-10 minuten.
- *Aantal oefeningen:* 6 per dag.
- *Sets:* 2-3 sets per oefening.
- *Herhalingsbereik:* 10-15 herhalingen (of 30-45 seconden bij balans/houdingen).
- *Mate van steun:* overwegend **vrij** (zonder steun), met steun altijd binnen handbereik als veiligheidsnet. Balans in de uitdagende, veilige varianten (smalle stand, ogen volgen beweging, tandemstand).
- *Progressie-aanpak:* sturen op inspanning richting "flink maar comfortabel" — nooit tot uitputting, nooit adem inhouden. Progressie via meer herhalingen, een extra set of een uitdagendere variant; geen gewichten/getallen als doel.
- *Veilig op-/afschalen:* per oefening een makkelijkere of moeilijkere variant kiesbaar. Afschalen naar Actief blijven bij te zware of te lange sessies, of na ziekte/onderbreking — herstel gaat altijd vóór doorzetten.

---

**Rode draad door alle niveaus (evidence-borging):**
- *Minimale effectieve dosis:* zelfs niveau 3 blijft binnen 10 minuten; "iets is beter dan niets" geldt overal — een halve sessie telt mee.
- *Inspanning, niet gewicht:* nergens kilo's of scores; feedback gaat altijd over hoe het voelt.
- *Balans uitdagend maar veilig:* uitdaging uit mínder steun en een smallere/instabielere stand, met steun altijd binnen handbereik; nooit uit hoogte, snelheid of risico.
- *Vergevend en omkeerbaar:* elk niveau is met één tik te wijzigen, een gemiste dag straft nooit, en opschalen gebeurt alleen op uitnodiging als het comfortabel voelt.

---

## Dagprogramma, oefenbibliotheek & 30-dagen programma

### 1. Dagprogramma

#### Het dagscherm

Het dagscherm is het hart van de app: rustig, met één duidelijke richting — vandaag bewegen.

**Bovenaan (de kop):**
- "Vandaag: Dag 7 van 30" — groot en vriendelijk.
- Dagtype + thema in eenvoudige taal, bijv.: "Balans basis — rustig staan en stevig opstaan."
- Totale tijd: "Ongeveer 8 minuten" (een schatting, geen aftelklok).
- Vergevende streak, klein en positief: "U bent al 5 dagen lekker bezig." Bij een gemiste dag wordt dit nooit straf, maar aanmoediging: "Fijn dat u er weer bent."

**Midden (de oefeningen):**
- Een korte lijst van de 4-6 oefeningen van vandaag als kaarten onder elkaar. Elke kaart toont naam, een klein plaatje en duur/herhalingen. Gedane oefeningen krijgen een vriendelijk vinkje.

**Onderaan (de primaire actie):**
- Eén grote knop: "Start vandaag" (of "Ga verder" als er al oefeningen gedaan zijn). De enige primaire actie.

**Veiligheidsstrook:** een klein, altijd zichtbaar zinnetje met een tikbare link: "Voelt u zich niet lekker? Lees hier wanneer u beter even stopt." → naar het veiligheidsscherm (rode vlaggen).

#### De oefening-kaart (tijdens het oefenen)

Op "Start vandaag" komt de gebruiker in een lineaire flow: één oefening per scherm, groot in beeld.

| Veld | Wat het toont | Voorbeeld |
|---|---|---|
| **Naam** | Korte, herkenbare naam | "Opstaan uit de stoel" |
| **Video + audio** | Korte demonstratievideo (loopt vanzelf), geluid optioneel aan/uit | rustige beweging, 10-15 sec |
| **Waarom nuttig** | Eén zin: het dagelijkse nut | "Zo blijft u makkelijk zelf opstaan van een stoel of bank." |
| **Herhalingen / seconden** | Concreet, passend bij het niveau | "8 keer" of "20 seconden vasthouden" |
| **Simpele instructie** | 1-3 korte stappen in B1-taal | "Zit voor op de stoel. Sta rustig op. Ga langzaam weer zitten." |
| **Veiligheidstip** | Altijd zichtbaar, kort | "Houd u vast aan de leuning als dat fijner voelt. Houd uw adem niet in." |
| **"Makkelijker maken"** | Tikbare knop, geen verplichting | toont een lichtere variant |
| **"Moeilijker maken"** | Tikbare knop, voor de fittere gebruiker | toont een zwaardere variant |
| **"Klaar, volgende"** | Grote primaire knop onderaan | vinkt de oefening af en gaat naar de volgende |

**Stap voor stap door 4-6 oefeningen:**
- Eén oefening per scherm. Onderaan altijd één primaire knop: "Klaar, volgende".
- Rustige voortgangsindicatie bovenaan: "Stap 2 van 5" (puntjes of een dun balkje — geen aftellende klok).
- Na "Klaar" schuift de gebruiker automatisch naar de volgende oefening. Terug kan via een rustige "Vorige", nooit alleen via een swipe — alles met een gewone tik.
- Halverwege stoppen mag altijd (✕ linksboven). Gedane oefeningen blijven afgevinkt. Geen straf.

**Afvinken:**
- Afvinken gebeurt door op "Klaar, volgende" te tikken. De gebruiker hoeft niets in te vullen of te beoordelen.
- Op het dagscherm zie je daarna welke oefeningen een vinkje hebben.
- Zijn alle oefeningen gedaan, dan komt er een warm, kort afsluitscherm (Dag-voltooid): "Mooi gedaan vandaag." Met een subtiele streak-update en hooguit één badge — ondersteunend, niet de motor. Geen confetti-overdaad.

**Makkelijker / moeilijker:**
- **Makkelijker:** instructie, herhalingen en video wisselen naar een lichtere variant (opstaan met handen op de leuning, minder herhalingen, meer steun). Zo blijft het altijd haalbaar — self-efficacy via kleine successen.
- **Moeilijker:** wisselt naar een zwaardere variant (meer herhalingen, langere houdtijd, minder steun, of een extra element). Zo verveelt de fittere gebruiker zich niet.
- De gekozen variant wordt **onthouden** voor die oefening (weinig keuzes, geen herhaald kiezen). Altijd terug te draaien. Geen oordeel: "makkelijker" is even normaal en goed als "moeilijker".

### 2. Oefenbibliotheek-structuur

#### Datamodel van een oefening

Elke oefening heeft dezelfde vaste velden. Dit is de structuur; de inhoud zelf (de 30 oefeningen) komt in een latere fase.

| Veld | Type / inhoud | Toelichting |
|---|---|---|
| **id** | unieke code | voor verwijzing in dagprogramma |
| **naam** | korte tekst | herkenbaar, B1, bijv. "Opstaan uit de stoel" |
| **doel** | één zin | wat traint deze oefening (balans / functionele kracht / mobiliteit) |
| **functionele waarde / ADL** | korte tekst | dagelijks nut: "makkelijker opstaan", "veiliger traplopen", "boodschappentas tillen" |
| **spiergroepen** | lijst | in begrijpelijke taal (bovenbenen, billen, romp) |
| **stappen** | geordende lijst (1-3 stappen) | de uitvoering, kort en concreet |
| **herhalingen per niveau** | object | Rustig starten / Actief blijven / Sterker worden → herhalingen, seconden, sets (1-3) |
| **veiligheidsinstructies** | lijst | "houd u vast", "houd uw adem niet in", "stop bij pijn" |
| **steun standaard** | ja/nee + soort | bij balans standaard stoel/muur aan |
| **makkelijker** | variant-beschrijving | lichtere uitvoering (meer steun, minder herhalingen) |
| **moeilijker** | variant-beschrijving | zwaardere uitvoering (minder steun, meer herhalingen/houdtijd) |
| **contra-indicaties / voorzichtigheid** | lijst | wanneer beter overslaan (niet-medisch, routeert naar "overleg uw arts") |
| **rode-vlag-koppeling** | verwijzing | link naar veiligheidsscherm bij klachten |
| **geschikte niveaus** | lijst | voor welke van de 3 niveaus beschikbaar |
| **categorie** | één van de 7 vaste categorieën | zie hieronder |
| **dagtypes** | lijst | bij welke dagtypes deze oefening past |
| **media** | object | videobestand, optionele audio-instructie, statisch plaatje/thumbnail, alt-tekst |
| **geschatte duur** | seconden | voor de tijdsoptelling op het dagscherm |

#### Bibliotheek-navigatie

Een plek om rustig rond te kijken, los van het dagprogramma. Drie eenvoudige, lineaire lagen:

1. **Categorie-overzicht** — een rustige lijst met de **7 vaste categorieën**, elk met een herkenbaar icoon en grote tikvlakken:
   - Benen & opstaan
   - Balans
   - Heupen & onderrug
   - Schouders & armen
   - Core / stabiliteit
   - Dagelijkse kracht
   - Mobiliteit
2. **Lijst (binnen een categorie)** — de oefeningen als kaarten met naam, plaatje en korte regel ("waarom nuttig"). Standaard alles tonen (keuze-overload vermijden).
3. **Detail (één oefening)** — hetzelfde overzichtelijke beeld als de oefening-kaart: video + audio, waarom nuttig, stappen, herhalingen per niveau, veiligheidstip, makkelijker/moeilijker. Hier is geen "Klaar"-knop (dit is verkennen), wél "Deze oefening doen" en "Terug naar overzicht".

### 3. 30-dagen programma

#### Structuur (4 weken + 2 afrondingsdagen = 30 dagen)

Het programma is opgebouwd uit **4 themaweken van 7 dagen (= 28 dagen)**, gevolgd door **2 lichte, bekrachtigende afrondingsdagen (dag 29-30)**. Zo klopt de 4-wekenruggengraat exact (4 × 7 = 28) én komen we netjes op 30 dagen uit, zonder de weekstructuur op te rekken. De afrondingsdagen horen bij "de maand afsluiten", niet bij een vijfde halve week.

| Week | Thema | Wat staat centraal |
|---|---|---|
| **Week 1** | Wennen & vertrouwen | Kennismaken met de oefeningen, rustig tempo, veel steun, "ik kan dit". |
| **Week 2** | Consistentie & controle | Dagelijks ritme opbouwen, beweging netjes en gecontroleerd uitvoeren. |
| **Week 3** | Iets meer kracht/balans | Een stapje verder: iets meer herhalingen of iets minder steun, nog steeds veilig. |
| **Week 4** | Combineren & zelfvertrouwen | Oefeningen combineren, merken hoeveel makkelijker dagelijkse dingen gaan. |

**Vaste weekvorm:** elke week bevat **5 actieve dagen + 1 lichte mobiliteitsdag + 1 herstel/check-in dag**. Een "actieve dag" is Kracht basis, Balans basis, Dagelijkse bewegingen of Combinatie. De dagtypes zijn uniform gelabeld (geen mengvormen zoals "Core via Combinatie"); core/stabiliteit zit als oefeninhoud binnen Combinatie- en Balans basis-dagen, niet als apart dagtype.

#### Dagtype-toewijzing per week

**Week 1 — Wennen & vertrouwen** *(5 actief + 1 mobiliteit + 1 herstel)*

| Dag | Dagtype | Korte focus |
|---|---|---|
| 1 | Kracht basis | Stevig opstaan en zitten — de bouwsteen van zelfstandigheid. |
| 2 | Balans basis | Rustig staan met steun, vertrouwen in uw evenwicht. |
| 3 | Mobiliteit (licht) | Soepel maken van heupen, schouders en nek. |
| 4 | Dagelijkse bewegingen | Reiken, draaien, bukken zoals in het echte leven. |
| 5 | Kracht basis | Benen en billen rustig versterken. |
| 6 | Combinatie | Beetje balans, beetje kracht — alles even proeven. |
| 7 | Herstel / check-in | Rustdag: korte terugblik en hoe het ging. |

*Telling week 1: actief = dag 1, 2, 4, 5, 6 (5); mobiliteit = dag 3 (1); herstel = dag 7 (1). Klopt.*

**Week 2 — Consistentie & controle** *(5 actief + 1 mobiliteit + 1 herstel)*

| Dag | Dagtype | Korte focus |
|---|---|---|
| 8 | Kracht basis | Opstaan met iets meer herhalingen, netjes uitgevoerd. |
| 9 | Balans basis | Evenwicht met iets minder steun, gecontroleerd. |
| 10 | Dagelijkse bewegingen | Tillen en dragen zoals een boodschappentas. |
| 11 | Mobiliteit (licht) | Onderrug en heupen losmaken. |
| 12 | Kracht basis | Beenkracht en romp stabiel houden. |
| 13 | Combinatie | Kracht en balans samen, rustig tempo. |
| 14 | Herstel / check-in | Rustdag: voel uw vooruitgang, vier de tweede week. |

*Telling week 2: actief = dag 8, 9, 10, 12, 13 (5); mobiliteit = dag 11 (1); herstel = dag 14 (1). Klopt.*

**Week 3 — Iets meer kracht/balans** *(5 actief + 1 mobiliteit + 1 herstel)*

| Dag | Dagtype | Korte focus |
|---|---|---|
| 15 | Kracht basis | Iets zwaardere beenoefeningen, meer herhalingen. |
| 16 | Balans basis | Langer staan, minder vasthouden (steun blijft binnen handbereik). |
| 17 | Combinatie | Romp en houding versterken (core-oefeningen binnen de combinatie). |
| 18 | Mobiliteit (licht) | Soepel blijven na de zwaardere dagen. |
| 19 | Kracht basis | Opstaan en stappen, functionele kracht. |
| 20 | Combinatie | Balans + kracht uitdagender combineren. |
| 21 | Herstel / check-in | Rustdag: terugblik en bijstellen van niveau indien gewenst. |

*Telling week 3: actief = dag 15, 16, 17, 19, 20 (5); mobiliteit = dag 18 (1); herstel = dag 21 (1). Klopt.*

**Week 4 — Combineren & zelfvertrouwen** *(5 actief + 1 mobiliteit + 1 herstel)*

| Dag | Dagtype | Korte focus |
|---|---|---|
| 22 | Combinatie | Kracht en balans vloeiend achter elkaar. |
| 23 | Balans basis | Vertrouwen in evenwicht, ook bij draaien. |
| 24 | Dagelijkse bewegingen | Alledaagse handelingen vlot en veilig. |
| 25 | Kracht basis | Sterke benen voor traplopen en opstaan. |
| 26 | Mobiliteit (licht) | Soepel en ontspannen bewegen. |
| 27 | Combinatie | Alles samen — merk hoeveel u kunt. |
| 28 | Herstel / check-in | Rustdag: terugblik op de hele maand. |

*Telling week 4: actief = dag 22, 23, 24, 25, 27 (5); mobiliteit = dag 26 (1); herstel = dag 28 (1). Klopt.*

**Afronding (dag 29-30):** twee lichte, bekrachtigende dagen die de maand netjes afsluiten (buiten de vaste weekvorm).

| Dag | Dagtype | Korte focus |
|---|---|---|
| 29 | Combinatie (licht) | Uw favoriete oefeningen nog eens, op uw eigen niveau. |
| 30 | Herstel / check-in | Vieren: u hebt 30 dagen volgehouden. Vooruitblik naar de volgende ronde. |

#### Wat is een herstel/check-in dag?

Bewust geen lege dag, maar ook geen prestatie. Hij bevat:
- Een **warme terugblik**: "U bent deze week 5 keer in beweging geweest. Mooi." (vergevend — gemiste dagen worden niet afgestraft).
- Een optionele, hele lichte **mobiliteits- of ademoefening** voor wie zin heeft — nooit verplicht.
- Een **rustige check-in vraag**: "Hoe ging het deze week? Wilt u het de volgende week iets rustiger of juist iets actiever?" Hiermee kan de gebruiker zijn niveau aanpassen.
- Een korte herinnering aan het **habit-anker** ("na de koffie / het nieuws / de thee"), zodat het dagelijks ritme blijft hangen.

#### Herhaalbaar en opbouwbaar

- **Herhaalbaar:** na dag 30 kan de gebruiker de maand opnieuw starten. De dagtype-structuur blijft hetzelfde, maar de oefeningen en/of het gekozen niveau kunnen veranderen, zodat het fris blijft.
- **Opbouwbaar via niveau:** de drie niveaus (Rustig starten → Actief blijven → Sterker worden) geven progressie zonder de structuur te veranderen. Ronde 1 op "Rustig starten" → ronde 2 op "Actief blijven".
- **Opbouwbaar via varianten:** binnen elke oefening blijven "makkelijker" en "moeilijker" beschikbaar.
- **Vergevend door de hele maand:** een gemiste dag schuift het programma niet stuk — de gebruiker pakt de draad weer op bij de dag waar hij was. "Iets is beter dan niets" en "u bent er weer" voeren de boventoon.
- **Aanpasbare oefendata:** omdat dagtypes en oefeningen los van elkaar in het datamodel staan, kan de inhoud per dag later eenvoudig worden aangepast of vernieuwd zonder de 30-dagen-ruggengraat te wijzigen.

---

## Progressie & gamification

> Uitgangspunt uit Fase 1: gamification werkt voor 50/60+ alleen bescheiden en als ondersteuning, nooit als motor. Positieve, zelf-referentiële feedback motiveert; tastbare beloningen, competitie en ranglijsten ontmoedigen juist. Streaks helpen, maar een harde streak die reset bij een gemiste dag veroorzaakt het "ach-laat-ook-maar"-effect. Daarom: vergevend, warm, rustig en zelf-referentieel. Voortgang laat de gebruiker zichzelf zien dat het lukt (self-efficacy), niet om te scoren.

### 1. Progressie: wat de gebruiker ziet

**Eén rustig overzichtsscherm ("Mijn voortgang").** Alles past op één scherm. Geen grafiekenmuur, geen percentages-met-decimalen, geen dashboard-drukte. Wim en Greet moeten het in één oogopslag begrijpen; Anouk mag het kloppend vinden zonder zich te vervelen.

| Wat | Hoe het er staat | Waarom |
|---|---|---|
| **Vergevende streak** | "U bent al **5 dagen** goed bezig" met een rustig blaadje-icoon (🌿). Bij rustdag: "Vandaag rust, dat hoort erbij." | Self-efficacy, ritme zichtbaar. Geen rood, geen alarm bij 0. |
| **Voltooide dagen deze maand** | "**12 van de 30** dagen even bewogen", of een kalenderstrip met gevulde bolletjes (actief), zachte bolletjes (rust/mobiliteit) en open bolletjes (overgeslagen, neutraal grijs, niet rood). | Maandritme in één blik, zonder oordeel over gaten. |
| **Minuten bewogen** | "Deze maand **78 minuten** bewogen" — afgerond, warm, geen seconden. | Concreet, voelt als winst. |
| **Bewegingen gedaan** | "**46 oefeningen** gedaan deze maand." | Tastbaar bewijs van "ik dóé het echt". |
| **Maandvoortgang (30-dagen)** | "Week 2 — **Consistentie & controle**" met een rustige balk over de 4 weken. | Geeft richting. |
| **Samenvattende zin** | Eén warme zin bovenaan: "U hebt deze maand **23 keer** bewust uw spieren gebruikt." | De menselijke vertaling van alle cijfers. Daarom bovenaan. |

**Voorbeeld van het overzicht (compact, één scherm):**

```
U hebt deze maand 23 keer bewust uw spieren gebruikt.
Mooi bezig, rustig aan zo.

🌿 U bent al 5 dagen goed bezig

Deze maand
• 12 van de 30 dagen even bewogen
• 78 minuten bewogen
• 46 oefeningen gedaan

[kalenderstrip met gevulde / zachte / open bolletjes]

Uw programma: Week 2 — Consistentie & controle
[rustige balk over 4 weken]
```

**Toonregels voor de cijfers:**
- **Altijd optellend, nooit aftrekkend.** We tonen wat u deed, nooit wat u miste.
- **Zelf-referentieel, nooit vergelijkend.** Geen andere gebruikers, geen gemiddelden van leeftijdsgenoten.
- **Geen doelen-die-knipperen.** Geen rode badges, geen "nog 3 te gaan!"-druk, geen aftelklokken.
- **Persoonlijke winst-zinnen mogen, mild en eerlijk:** "Veel mensen merken na een paar weken dat opstaan makkelijker gaat." Nooit een harde claim dat het bij ú zo is (niet-medisch).
- **Een rustdag is een prestatie, geen gat.** Herstel hoort bij het programma en telt mee als "goed bezig".

### 2. Gamification: volwassen, subtiel, ondersteunend

#### 2.1 De vergevende streak — precieze werking

**Definitie.** De streak telt het ritme waarin u iets met de app deed, waarbij "iets" ruim is: een dagprogramma (deels of helemaal), een lichte mobiliteitsdag, of een geplande herstel-/check-in dag die u bevestigt. Frequentie boven duur: één oefening telt al als "ik was er vandaag".

**Wat telt mee:**
- Een actieve dag (1 of meer oefeningen gedaan) → telt.
- Een lichte mobiliteitsdag → telt.
- Een herstel-/check-in dag, bevestigd met één tik ("Vandaag rust ik bewust") → telt, breekt de streak niet.

**Gemiste-dag-gedrag — het hart van de vergeving:**
- **Geen reset, geen straf, geen verlies-melding.** Een gemiste dag zet u niet terug naar nul en geeft geen rode waarschuwing, geen pop-up, geen schuldgevoel.
- **"X-van-7"-ritme als zachte ruggengraat.** De streak voelt als "5 van de laatste 7 dagen even bewogen", niet als een breekbare ketting die bij één misser knapt. Zolang u de meeste dagen van de week iets doet, blijft uw voortgang positief staan.
- **Stille buffer.** Een enkele gemiste dag wordt zacht overbrugd: de streak gaat niet stuk, hij "pauzeert" en loopt door zodra u terug bent. We benoemen dit niet als spelmechaniek of als schaars tegoed — het werkt gewoon vergevend, onzichtbaar.
- **Pas bij langere afwezigheid** (bijvoorbeeld een week of meer) begint de zichtbare teller netjes opnieuw — zonder negatieve framing. Geen "uw streak is verbroken", maar een warme terugkeer.

**Warme terugkeer (na een of meer gemiste dagen):**
- De toon is uitnodigend en verwijtloos: "Fijn dat u er weer bent. Zullen we rustig opnieuw beginnen?" of "Welkom terug — vandaag een lichte om er weer in te komen?"
- Bij langere afwezigheid bieden we optioneel een zachtere herstart aan (een lichtere dag of een eerdere week), nooit verplicht. Geen inhaalschuld, geen "u moet bijspijkeren".

Deze opzet volgt direct het Fase 1-bewijs: streaks motiveren, maar zonder ingebouwde slack (X-van-7, rustdagen meetellen, buffer, herstel) veroorzaakt één misser afhaken.

#### 2.2 Badges

Badges markeren kleine, betekenisvolle successen — zelf-referentieel, eenmalig te verdienen, nooit te verliezen. Rustig en volwassen vormgegeven (geen glitter, geen confetti-explosie, geen kinderachtige medailles). Ze verschijnen kort en zacht, en zijn daarna terug te vinden in een rustig overzicht. Ondersteunend, niet de motor. **De badge-voorwaarden volgen bewust de vergevende streak-logica** (een venster van dagen, geen harde ononderbroken keten), zodat ze de vergevende opzet niet tegenspreken.

| Badge | Unlock-voorwaarde | Unlock-microcopy |
|---|---|---|
| **Eerste stap** | Eerste oefening ooit voltooid. | "Uw eerste stap is gezet. Daar draait alles om — u bent begonnen." |
| **Drie actieve dagen** | 3 actieve dagen binnen één week (rustdagen tellen mee, geen ononderbroken keten vereist). | "Drie dagen in beweging deze week. Zo wordt het langzaam een gewoonte." |
| **Een week trouw** | In een week 5 van de 7 dagen iets gedaan (de X-van-7-logica van de streak). | "Een week lang trouw aan uzelf. Knap volgehouden." |
| **Balansbouwer** | 10 balansoefeningen gedaan (categorie Balans), verspreid over meerdere dagen. | "Uw balans wordt steeds zekerder. Elke keer staat u iets steviger." |
| **Stoel-squat held** | 20 keer een stoel-squat / opstaan-uit-de-stoel gedaan (Benen & opstaan). | "Twintig keer uit de stoel omhoog. Dat merkt u in uw dagelijks leven." |
| **Sterke start** | Week 1 van het 30-dagen programma afgerond. | "De eerste week zit erop. Het lastigste — beginnen — hebt u gehad." |
| **Maand volbracht** | Het 30-dagen programma uitgelopen (alle vier de weken + afronding doorlopen). | "Een hele maand bewust bewogen. Wat een mooie prestatie, helemaal in uw tempo." |

**Extra badges (zelfde geest, optioneel uit te breiden):**

| Badge | Unlock-voorwaarde | Unlock-microcopy |
|---|---|---|
| **Terug van weggeweest** | Weer een dag actief na een onderbreking van enkele dagen. | "Fijn dat u er weer bent. Opnieuw beginnen is ook moedig." |
| **Trouw aan uw moment** | 10 keer geoefend op het gekozen habit-anker. | "U hebt uw momentje echt een vaste plek gegeven. Zo blijft het hangen." |
| **Soepele start** | 5 mobiliteitsdagen gedaan. | "Even losmaken hoort er net zo goed bij. Uw lichaam dankt u ervoor." |
| **Rustig volgehouden** | 30 actieve dagen in totaal (mag verspreid). | "Dertig keer de tijd genomen voor uzelf. Dat telt." |

**Wat badges nooit zijn:** verplicht, vergelijkend, verliesbaar, of een voorwaarde om verder te kunnen. Het hele programma is te doen zonder ooit naar de badges te kijken.

#### 2.3 Week- en maandvoltooiing

- **Week voltooid:** aan het eind van een programmaweek een rustige, warme bevestiging die de week samenvat en de volgende introduceert: "Week 1 zit erop — wennen & vertrouwen. Volgende week bouwen we rustig aan consistentie." Eén tik om door te gaan, geen verplichte viering.
- **Maand voltooid:** een waardige afsluiting met de badge **Maand volbracht**, een korte persoonlijke terugblik ("U bewoog deze maand 23 keer bewust") en een zachte, optionele vraag: "Nog een ronde, in hetzelfde of een iets actiever tempo?" Nooit pushend. Stoppen of pauzeren mag zonder dat het als falen voelt.

#### 2.4 Optionele maandelijkse challenge (opt-in)

- **Strikt opt-in en altijd uitzetbaar.** Standaard uit. Niemand wordt ongevraagd in een challenge geduwd.
- **Zelf-referentieel en mild, nooit competitief.** Een persoonlijk, zacht doel: "Deze maand 15 dagen even bewegen" of "Deze maand mijn balansmomentje vaker doen." Tegen uw eigen ritme, nooit tegen anderen.
- **Vergevend van opzet.** Dezelfde regels als de streak: missen mag, u raakt niets kwijt, en aan het eind tonen we wat u wél deed ("U haalde 12 van de 15 dagen — mooi gedaan"), nooit wat u niet haalde.
- **Geen druk, geen aftellen.** Geen knipperende teller, geen "nog 2 dagen om het te halen!"-meldingen.

#### 2.5 Het persoonlijke ritueel (habit-anker)

Dit is de gedragskern (implementation intention / habit-anchoring) en tegelijk de subtielste vorm van gamification: u koppelt het beweegmoment aan iets wat u tóch al doet.

- **Optioneel ingesteld tijdens de onboarding-afronding, later altijd aanpasbaar** in Instellingen. Eén keuze uit een korte lijst vaste ankers (keuze-overload vermijden): na de koffie · na het ontbijt · na het nieuws · terwijl de thee trekt · voor het avondeten · een eigen moment.
- **Het ritueel kleurt de taal door de hele app.** De dagstart heet dan "Klaar voor uw momentje na de koffie?" in plaats van een neutrale knop. Zo herkennen Greet ("na het ontbijt, bij het aanrecht"), Wim ("na het nieuws van zes uur"), Faridah ("terwijl de thee trekt") en Anouk ("na mijn koffie, voor ik de deur uit") het.
- **Terugkomst in de herinnering.** De lokale herinnering gebruikt exact dat anker en exact dat moment — dus géén vast dagdeel: "Na het nieuws even uw momentje?" als dat het gekozen anker is. De herinnering is een vriendelijke tik op de schouder, geen wekker, en volledig uitzetbaar.

#### 2.6 Wat we expliciet níét doen

- **Geen agressieve notificaties.** Hooguit één rustige, vriendelijke lokale herinnering per dag, gekoppeld aan het gekozen anker, volledig uitzetbaar. Geen "u bent ons vergeten!"-pushberichten, geen avond-spam, geen schuld-meldingen. (Push komt sowieso pas later; de MVP bereidt alleen lokale herinneringen voor.)
- **Geen schaamte bij missen.** Geen rood, geen "verbroken streak", geen "u hebt 5 dagen overgeslagen", geen droevige icoontjes. Een gemiste dag is neutraal; terugkomen is altijd welkom.
- **Geen harde leaderboards of competitie.** Geen ranglijsten, geen vergelijking met andere gebruikers. Het bewijs is duidelijk: voor 50/60+ confronteert competitie met achteruitgang en doet mensen terugtrekken.
- **Geen tastbare/contingente beloningen** (geen punten-shop, geen prijzen) die de intrinsieke motivatie ondermijnen. Onze "beloning" is zelf-referentieel: zien dat het lukt en uw dagelijks leven merkbaar makkelijker voelen.
- **Sociale features: pas LATER, en dan opt-in en privacyvriendelijk.** Als ze er ooit komen, dan coöperatief en zelfgekozen (samen met een familielid rustig aanmoedigen), nooit als verplichte of vergelijkende ranglijst. In de MVP zijn er geen sociale functies.

---

## Wireframe-beschrijvingen

Alle wireframes zijn mobiel (smal, ~360px breed), groot en rustig. Per scherm domineert **één primaire actie** (grote, gevulde knop onderaan binnen duimbereik). Body-tekst ≥18px, knoppen ≥48dp hoog (primaire knop groter), contrast ≥4.5:1. Geen tijdsdruk, geen pinch/long-press, enkel-vinger taps. De bottom-nav heeft 4 items (Vandaag · Oefeningen · Voortgang · Instellingen) met iconen én tekstlabels; iconen zijn decoratief, de tekst is leidend en altijd aanwezig (voor screenreaders en wisselende icoon-rendering). De streak gebruikt overal hetzelfde rustige blaadje-icoon (🌿), nooit een vlam (om de "het gaat uit als je stopt"-associatie te vermijden).

### 1. Welkomscherm

```
┌─────────────────────────────┐
│                             │
│        Vitaal Thuis         │
│                             │
│      [  illustratie:        │
│        rustige warme        │
│      figuur die staat ]     │
│                             │
│   Elke dag een beetje       │
│   bewegen. In uw eigen      │
│   tempo, thuis.             │
│                             │
│   Korte oefeningen van      │
│   5 tot 10 minuten.         │
│                             │
│  ┌───────────────────────┐  │
│  │      Beginnen         │  │  ◄ primaire actie
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     Hoe werkt het?    │  │  ◄ secundaire knop
│  └───────────────────────┘  │
│                             │
│   Ik heb dit al gebruikt    │  ◄ tekst-link (terugkeren)
│                             │
└─────────────────────────────┘
```

**Toelichting.** Drie duidelijke acties in een heldere hiërarchie: de gevulde primaire knop "Beginnen", de rustige secundaire knop "Hoe werkt het?" (korte uitleg in 3 beelden, neemt twijfel weg bij lage tech-comfort), en de ondergeschikte tekst-link "Ik heb dit al gebruikt". Tikt iemand die link zonder bestaande lokale data, dan volgt een rustige lege staat met "Beginnen" (zie terugkeer-randgeval). Warme illustratie van een staande figuur stelt gerust en is leeftijdsvriendelijk. Korte, geruststellende belofte in B1-taal, geen prestatiedruk. Hoog contrast.

### 2. Veiligheidsscherm / disclaimer

```
┌─────────────────────────────┐
│  ←                          │
│                             │
│   Even kort: veilig         │
│   bewegen                   │
│                             │
│   Vitaal Thuis is geen      │
│   dokter. We helpen u       │
│   bewegen, maar geven       │
│   geen medisch advies.      │
│                             │
│   Stop en bel uw arts als   │
│   u tijdens het bewegen:    │
│                             │
│    • pijn op de borst krijgt│
│    • duizelig wordt         │
│    • erg kortademig bent    │
│    • plots slap aanvoelt    │
│    • valt                   │
│                             │
│   Houd bij balans altijd    │
│   een stoel of muur vast.   │
│   Houd nooit uw adem in.    │
│                             │
│  ┌───────────────────────┐  │
│  │  Begrepen, verder     │  │  ◄ primaire actie
│  └───────────────────────┘  │
│                             │
│   Lees meer over veilig     │  ◄ secundaire link
│   bewegen                   │
└─────────────────────────────┘
```

**Toelichting.** Eén primaire knop "Begrepen, verder"; geen tweede gelijkwaardige knop. De rode vlaggen staan als korte, scanbare lijst met veel witruimte. Taal is niet-klinisch en bondig (B1) en routeert naar "bel uw arts" zonder medische intake. De veiligheidsbasisregels (steun bij balans, adem niet inhouden) staan direct in beeld. Terugknop linksboven is een enkel-vinger tap. Bij een routerings-signaal uit de onboarding verschijnt hier (of op het niveauvoorstel) inline de zachte, niet-blokkerende "overleg uw arts"-melding.

### 3. Onboarding-vraag (voorbeeld: vraag 1)

```
┌─────────────────────────────┐
│  ←                 1 van 5  │  ◄ rustige voortgang
│                             │
│   Hoeveel beweegt u nu      │
│   op een gewone week?       │
│                             │
│   Kies wat het beste past.  │
│                             │
│  ┌───────────────────────┐  │
│  │ Bijna niet — ik zit   │  │
│  │ veel                  │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Af en toe — een       │  │
│  │ stukje lopen          │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Regelmatig — meerdere │  │
│  │ keren per week        │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Veel — bijna dagelijks│  │
│  └───────────────────────┘  │
│                             │
│   Weet ik niet /            │  ◄ veilige uitwijk
│   liever niet zeggen        │
│                             │
│   Er is geen fout antwoord. │
└─────────────────────────────┘
```

**Toelichting.** Eén vraag per scherm in een lineaire flow (teller "1 van 5"; het veiligheidsscherm telt hier niet in mee en kwam ervoor). De antwoorden zijn grote, goed uit elkaar staande keuzeknoppen (elk ≥56dp, met ruimte ertussen tegen mistaps). Tikken op een antwoord brengt direct naar de volgende vraag, dus geen aparte "Volgende"-knop — behálve bij de meerkeuzevraag (vraag 4), die wél een "Volgende"-knop heeft (zie sectie Onboarding). De veilige uitwijk "Weet ik niet / liever niet zeggen" leidt naar de veiligste standaard. De afsluiter "Er is geen fout antwoord" verlaagt de drempel.

### 4. Niveauvoorstel & niveaukeuze

```
┌─────────────────────────────┐
│  ←                          │
│                             │
│   Wij raden u aan om te     │
│   beginnen met:             │
│                             │
│  ┌───────────────────────┐  │
│  │ Rustig starten     ✓  │  │  ◄ dynamisch
│  │ 5 min · 4 oefeningen  │  │     voorgesteld
│  │ Kalm en met steun     │  │     (hier: Wim/Greet)
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Actief blijven        │  │
│  │ 7 min · 5 oefeningen  │  │
│  │ Iets meer beweging    │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Sterker worden        │  │
│  │ 10 min · 6 oefeningen │  │
│  │ Stevig en uitdagend   │  │
│  └───────────────────────┘  │
│                             │
│   U kunt dit later altijd   │
│   aanpassen.                │
│  ┌───────────────────────┐  │
│  │   Hiermee beginnen    │  │  ◄ primaire actie
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Toelichting.** Drie keuzekaarten met dezelfde structuur (naam, duur + aantal oefeningen, één korte zin), zodat vergelijken makkelijk is. Het vinkje staat op het **dynamisch** voorgestelde niveau dat volgt uit de onboarding — hier "Rustig starten" voor Wim/Greet; Anouk zou hier "Sterker worden" voorgevinkt zien. Nooit standaard het middenniveau aan iedereen. De gebruiker hoeft alleen te bevestigen ("Hiermee beginnen") of een andere kaart te kiezen. De geruststelling "U kunt dit later altijd aanpassen" verwijst naar Instellingen (eigen tab, wireframe 11). Geselecteerde kaart heeft een duidelijke rand én vinkje (niet alleen kleur, voor toegankelijkheid).

### 5. Home / Dagprogramma

```
┌─────────────────────────────┐
│  Fijn dat u er bent 👋      │  ◄ moment-neutrale
│  Zondag 28 juni             │     begroeting
│                             │
│  ┌───────────────────────┐  │
│  │  🌿 Dag 6             │  │  ◄ vergevende streak
│  │  U bent lekker bezig. │  │     (blaadje, warm)
│  └───────────────────────┘  │
│                             │
│   Vandaag: Balans basis     │
│   Ongeveer 7 minuten        │
│                             │
│  ┌───────────────────────┐  │
│  │  [ video-thumbnail ]  │  │
│  │   5 oefeningen        │  │
│  │   met steun           │  │
│  └───────────────────────┘  │
│                             │
│   Tip: doe dit na uw        │  ◄ habit-anker
│   nieuws van zes uur.       │     (gekozen moment)
│                             │
│  ┌───────────────────────┐  │
│  │   Start vandaag       │  │  ◄ primaire actie
│  └───────────────────────┘  │
│ ─────────────────────────── │
│ 🏠      📚      📈      ⚙    │  ◄ 4 nav-items
│Vandaag Oefen. Voortg. Instel│
└─────────────────────────────┘
```

**Toelichting.** Het hele scherm leidt naar één ding: "Start vandaag" — de enige gevulde primaire knop, groot en binnen duimbereik. De begroeting is **moment-neutraal** ("Fijn dat u er bent"), niet "Goedemorgen", zodat er geen impliciete ochtend-druk ontstaat — het habit-anker mag immers avond zijn (hier: "na uw nieuws van zes uur", Wim's moment). De datum kan dynamisch zijn. De streakkaart gebruikt het rustige blaadje-icoon en is vergevend geformuleerd, nooit bestraffend. De dag toont type, duur en aantal oefeningen vooraf (gevoel van controle). Onderaan de **4-item** bottom-nav met grote iconen én labels, inclusief Instellingen.

### 6. Oefening-actief (stap voor stap)

```
┌─────────────────────────────┐
│  ✕                Stap 2/5  │  ◄ stoppen + voortgang
│                             │
│  ┌───────────────────────┐  │
│  │     [ VIDEO van       │  │
│  │     oefening, groot ] │  │
│  │        ▶  🔊          │  │  ◄ video + audio optie
│  └───────────────────────┘  │
│                             │
│   Opstaan uit de stoel      │
│                             │
│   Ga rustig staan en weer   │
│   zitten. Houd de leuning   │
│   vast als dat fijn is.     │
│                             │
│   8 keer · in uw eigen tempo│
│                             │
│   ⚠ Houd uw adem niet in.   │
│                             │
│  [Makkelijker] [Moeilijker] │  ◄ variant-knoppen
│                             │
│  ┌───────────────────────┐  │
│  │     Klaar, volgende   │  │  ◄ primaire actie
│  └───────────────────────┘  │
│                             │
│  Even pauzeren · Niet       │  ◄ secundaire links
│  lekker? Stop               │     (Stop → veiligheid)
└─────────────────────────────┘
```

**Toelichting.** Eén oefening per scherm in een lineaire stap-voor-stap-flow (indicator "Stap 2/5"). De grote video domineert met optionele audio (knoppen ≥48dp), zodat lezen niet verplicht is. Eronder een korte, concrete instructie in B1-taal met steun-suggestie en de veiligheidsherinnering "Houd uw adem niet in". Bewust geen aftellende timer: "in uw eigen tempo". "Makkelijker" / "Moeilijker" passen de variant aan (en worden onthouden). De primaire actie "Klaar, volgende" is de enige gevulde knop. Onderaan twee rustige links: "Even pauzeren" en **"Niet lekker? Stop"** — die laatste opent de veiligheidsinfo/rode vlaggen, zodat de stop-en-arts-route ook tijdens een actieve sessie altijd bereikbaar is. De ✕ linksboven laat altijd veilig stoppen; voortgang gaat niet verloren en stoppen wordt niet bestraft. De bottom-nav is hier bewust verborgen (full-focus).

### 7. Dag-voltooid

```
┌─────────────────────────────┐
│                             │
│           ✓                 │
│      [ groot, warm          │
│        vinkje ]             │
│                             │
│   Mooi gedaan!              │
│   U heeft vandaag           │
│   bewogen.                  │
│                             │
│  ┌───────────────────────┐  │
│  │  🌿 Dag 7             │  │  ◄ streak (blaadje)
│  │  Nieuw: badge         │  │  ◄ hooguit één badge
│  │  "Sterke start"  🏅   │  │     tegelijk
│  └───────────────────────┘  │
│                             │
│   Iets is beter dan niets.  │
│   Tot morgen, na het nieuws?│  ◄ habit-anker
│                             │
│  ┌───────────────────────┐  │
│  │    Terug naar huis    │  │  ◄ primaire actie
│  └───────────────────────┘  │
│                             │
│        Mijn voortgang       │  ◄ secundaire link
└─────────────────────────────┘
```

**Toelichting.** Een rustig, positief beloningsscherm met één duidelijke boodschap: "Mooi gedaan!". De gamification is volwassen en subtiel — een warme streakmelding met het blaadje-icoon en **hooguit één badge tegelijk** (nooit meerdere tegelijk laten poppen; verdere badges verschijnen op een latere dag of zijn rustig terug te vinden onder Voortgang). De zin "Iets is beter dan niets" versterkt self-efficacy. De afsluiter ankert de volgende sessie op het gekozen moment ("Tot morgen, na het nieuws?"). Eén gevulde primaire knop "Terug naar huis"; "Mijn voortgang" is een ondergeschikte link. Geen confetti-overdaad of overweldigend geluid.

### 8. Oefenbibliotheek-overzicht

```
┌─────────────────────────────┐
│   Oefeningen                │
│                             │
│   Kies een onderdeel om     │
│   te oefenen.               │
│                             │
│  ┌───────────────────────┐  │
│  │ 🦵 Benen & opstaan    │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ⚖ Balans              │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ 🔄 Heupen & onderrug  │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ 💪 Schouders & armen  │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ 🧍 Core / stabiliteit │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ 🛒 Dagelijkse kracht  │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ 🤸 Mobiliteit         │ ›│
│  └───────────────────────┘  │
│ ─────────────────────────── │
│ 🏠      📚      📈      ⚙    │
│Vandaag Oefen. Voortg. Instel│
└─────────────────────────────┘
```

**Toelichting.** Een eenvoudige, lineaire lijst van de zeven vaste categorieën als grote, volle-breedte rijen (elk ≥56dp, met chevron "›" als "ga verder"-aanwijzing). Geen filters, zoekbalk of tabbladen — dat zou keuze-overload geven; de structuur is plat en voorspelbaar. **Het tekstlabel is leidend; de iconen zijn decoratief.** Bij de bouw worden de getoonde emoji vervangen door echte, consistente iconen (betere controle over contrast en rendering; emoji worden door screenreaders onvoorspelbaar voorgelezen). Elke rij klikt direct door, dus geen aparte primaire knop nodig. Voldoende verticale ruimte tegen mistaps. De 4-item bottom-nav blijft consistent.

### 9. Oefening-detail

```
┌─────────────────────────────┐
│  ←                          │
│  ┌───────────────────────┐  │
│  │     [ VIDEO van       │  │
│  │     oefening, groot ] │  │
│  │        ▶  🔊          │  │
│  └───────────────────────┘  │
│                             │
│   Opstaan uit de stoel      │
│   Benen & opstaan           │
│                             │
│   Zo doet u het:            │
│   1. Ga op het puntje van   │
│      de stoel zitten.       │
│   2. Sta rustig op.         │
│   3. Ga gecontroleerd weer  │
│      zitten.                │
│                             │
│   Houd de leuning vast      │
│   voor steun.               │
│   Houd nooit uw adem in.    │
│                             │
│   Voor wie: prima om mee    │
│   te beginnen.              │
│                             │
│  ┌───────────────────────┐  │
│  │   Deze oefening doen  │  │  ◄ primaire actie
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Toelichting.** Bovenaan de grote demonstratievideo met optionele audio, zodat begrijpen mogelijk is zonder te lezen. Daaronder een korte genummerde stappenlijst in B1-taal, de standaard veiligheidsregels (steun, adem niet inhouden) en een geruststellende "voor wie"-zin. Eén gevulde primaire knop "Deze oefening doen" onderaan; terugknop linksboven voor de lineaire flow. Geen overdaad aan sets/reps op dit scherm — alleen wat nodig is om vertrouwd te raken. Ruime regelafstand, body ≥18px, hoog contrast.

### 10. Voortgang / progressie

```
┌─────────────────────────────┐
│   Mijn voortgang            │
│                             │
│  ┌───────────────────────┐  │
│  │  🌿 7 dagen goed bezig│  │  ◄ vergevende streak
│  │  Fijn dat u doorgaat. │  │     (blaadje)
│  └───────────────────────┘  │
│                             │
│   Deze week                 │
│   M  D  W  D  V  Z  Z       │
│   ●  ●  ●  ○  ●  ●  ●       │  ◄ gemiste dag = open
│                             │     bolletje, geen rood
│   U bewoog 6 van de 7       │
│   dagen. Knap!              │
│                             │
│   Uw badges                 │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │ 🏅  │ │ 🏅  │ │ 🔒  │    │
│  │Strk │ │Vroeg│ │ ... │    │
│  │start│ │opst.│ │     │    │
│  └─────┘ └─────┘ └─────┘    │
│                             │
│  ┌───────────────────────┐  │
│  │   Verder met vandaag  │  │  ◄ primaire actie
│  └───────────────────────┘  │
│ ─────────────────────────── │
│ 🏠      📚      📈      ⚙    │
│Vandaag Oefen. Voortg. Instel│
└─────────────────────────────┘
```

**Toelichting.** De voortgang is bemoedigend, niet beoordelend. De weekstrook toont gedane dagen met een gevuld bolletje (●) en een gemiste dag met een neutraal open bolletje (○) — nooit rood of een kruis; de streak (blaadje-icoon) wordt niet gereset of bestraft. De tekst "6 van de 7 dagen. Knap!" benadrukt wat goed ging. Badges staan als rustige, volwassen rij; vergrendelde badges (🔒) prikkelen subtiel zonder druk of ranglijst. Eén gevulde primaire knop "Verder met vandaag" leidt terug naar de kernactie. Cijfers en labels groot en hoog contrast; iconen worden altijd met tekst ondersteund. De 4-item bottom-nav blijft consistent.

### 11. Instellingen

```
┌─────────────────────────────┐
│   Instellingen              │
│                             │
│   Uw programma              │
│  ┌───────────────────────┐  │
│  │ Niveau                │ ›│
│  │ Nu: Rustig starten    │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Mijn moment           │ ›│
│  │ Nu: na het nieuws     │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Herinnering           │ ›│
│  │ Nu: aan               │  │
│  └───────────────────────┘  │
│                             │
│   Weergave                  │
│  ┌───────────────────────┐  │
│  │ Tekstgrootte          │ ›│
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Meer contrast         │ ○ │  ◄ aan/uit
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Geluid standaard aan  │ ● │  ◄ aan/uit
│  └───────────────────────┘  │
│                             │
│   Veiligheid                │
│  ┌───────────────────────┐  │
│  │ Lees de veiligheids-  │ ›│
│  │ info opnieuw          │  │
│  └───────────────────────┘  │
│ ─────────────────────────── │
│ 🏠      📚      📈      ⚙    │
│Vandaag Oefen. Voortg. Instel│
└─────────────────────────────┘
```

**Toelichting.** Instellingen geeft zelfregie en maakt de door de hele app herhaalde belofte "later aanpasbaar" waar — daarom een eigen, vindbare tab (geen verstopt menu). Drie rustige groepen: **Uw programma** (niveau wijzigen, habit-anker, herinnering — elk toont de huidige stand zodat het meteen duidelijk is), **Weergave** (tekstgrootte, meer contrast, geluid standaard aan, met grote aan/uit-schakelaars die niet alleen op kleur leunen) en **Veiligheid** ("Lees de veiligheidsinfo opnieuw" → terug naar het veiligheidsscherm). Account/sync komt hier LATER bij. Geen primaire knop nodig: dit is een lijst van keuzes; elke rij klikt door of schakelt. Grote tikvlakken, body ≥18px, hoog contrast. De 4-item bottom-nav blijft consistent, met Instellingen (⚙) als actieve tab.

---

## Open punten & beslissingen voor Fase 4/5

### Wat nog open staat (binnen dit ontwerp)

- **Drie niveaus vs. fijnere variant-sturing.** De niveaus zetten de basisdosis; daarnaast onthoudt elke oefening een "makkelijker/moeilijker"-keuze. Te toetsen in gebruikerstest of dit tweesporenbeleid (niveau + per-oefening-variant) niet te veel keuze geeft, of juist precies genoeg.
- **Slimme progressie-logica.** "De app stelt voorzichtig één extra herhaling voor" en "vraagt af en toe hoe het voelde" vragen een concrete regelset (na hoeveel comfortabele dagen, hoeveel "te licht"-antwoorden, enz.). Dit is bewust nog niet dichtgetimmerd en hoort bij Fase 5 (gedrag/techniek).
- **"X-van-7" exacte drempels.** De vergevende streak en de badges "Drie actieve dagen" / "Een week trouw" gebruiken een venster-logica. De precieze drempels (5 van 7? buffer van hoeveel dagen?) zijn een ontwerp/datakeuze die in Fase 5 wordt vastgelegd.
- **Echte iconen i.p.v. emoji.** De wireframes gebruiken emoji als plaatshouder. De definitieve iconenset (categorieën, nav, streak-blaadje) hoort bij de stijlgids in Fase 4; tekst blijft altijd leidend.
- **"Hoe ging het?"-feedback.** De optionele één-tik (prima/zwaar) na een sessie is bedoeld om de toon en progressie te informeren. Hoe dat signaal precies doorwerkt, is nog te bepalen.

### Wat een keuze van de opdrachtgever vraagt (uit de review)

- **Definitieve productnaam.** Dit document gebruikt de werktitel "Vitaal Thuis". Fase 2 adviseert "Stevig op de Been" of "Goed Op Eigen Benen" als sterkere kandidaten. De naam raakt het welkomscherm, de toon en de stijlgids — een knoop doorhakken vóór Fase 4 is wenselijk.
- **Reminders / notificaties in de MVP.** Het ontwerp kiest voor maximaal één rustige, lokale, uitzetbare herinnering op het gekozen habit-anker, en stelt push uit tot later. Bevestiging gevraagd dat push inderdaad buiten de MVP-scope valt.
- **Account & sync: bewust LATER.** De app start anoniem en lokaal. Of, en wanneer, account/sync nodig is (bijv. nieuw toestel, gegevens veiligstellen) is een opdrachtgever-/privacykeuze. Het randgeval "Ik heb dit al gebruikt zonder lokale data" is nu opgevangen met een lege staat, maar zonder sync blijft data toestel-gebonden.
- **Optionele maandelijkse challenge en (latere) sociale features.** Beide zijn opt-in en uit ontworpen in de MVP. De opdrachtgever beslist of de challenge al in de MVP zichtbaar (opt-in) mag zijn of pas later komt, en of sociale features ooit gewenst zijn (en dan strikt coöperatief, niet vergelijkend).
- **Routerings-grens veiligheid.** Het ontwerp routeert (niet-blokkerend) naar "overleg uw arts" bij onzekere antwoorden, maar blokkeert nooit. Bevestiging gevraagd dat een niet-blokkerende, niet-medische aanpak de gewenste juridische/zorgpositie is.

### Brug naar Fase 4 (designrichting / stijlgids)

Fase 4 vertaalt deze structuur naar een visuele taal. Concrete haakjes uit dit document:
- **Toegankelijkheids-tokens:** body ≥18px (met instelbare tekstgrootte), knoppen ≥48dp / primair groter, contrast ≥4.5:1, een "meer contrast"-modus.
- **Iconenset:** rustige, volwassen iconen voor de 7 categorieën en de 4 nav-items; het streak-icoon is een blaadje/plant (rustig, niet-bestraffend), nooit een vlam.
- **Toon en microcopy:** warm, B1, "u"-vorm, niet-prestatiegericht, vergevend; de habit-anker-frasering kleurt de teksten ("uw momentje na de koffie/het nieuws").
- **Illustratiestijl:** leeftijdsvriendelijk, geen jonge fitnessmodellen, warme staande/zittende figuren.
- **Geen confetti/competitie:** beloningsmomenten (Dag-voltooid, badges) zijn rustig en waardig vormgegeven, hooguit één badge tegelijk.

### Brug naar Fase 5 (techniek)

Fase 5 maakt het bouwbaar. Concrete haakjes:
- **Datamodel oefening** (sectie Dagprogramma) is de basis voor de oefenbibliotheek-implementatie; dagtypes en oefeningen staan los, zodat oefendata aanpasbaar is zonder de 30-dagen-ruggengraat te raken.
- **30-dagen-ruggengraat** (4 weken × 7 dagen + 2 afrondingsdagen) is een vaste structuur met losse oefeninvulling.
- **Lokale, anonieme opslag** als uitgangspunt (geen account in de MVP); voorbereiding voor lokale herinneringen op het gekozen anker.
- **Vergevende streak-engine:** venster-logica (X-van-7 + stille buffer + meetellende rust/mobiliteitsdagen), geen harde reset bij één gemiste dag.
- **Progressie-regels:** de "voorzichtig opschalen"- en "Hoe voelde dit?"-logica wordt hier tot concrete regels gemaakt.
- **Geen push in de MVP:** alleen lokale herinneringen voorbereiden; push is later en buiten scope.
