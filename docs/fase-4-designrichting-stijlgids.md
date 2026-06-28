# Fase 4 — Designrichting & stijlgids (Vitaal Thuis)

Vitaal Thuis voelt aan als een rustige, betrouwbare metgezel die naast je staat — niet als een trainer die je opjaagt of een arts die je beoordeelt. De sfeer is warm, geruststellend, helder, volwassen en respectvol: zacht daglicht, natuurlijke kleuren, veel witruimte en ronde, vriendelijke vormen. Eén ding tegelijk, geen haast, geen ruis. We mikken op mensen van 50/60+, dus alles is bewust groot, kalm en goed leesbaar.

Dit document is het bouwdocument voor de hele app. De drie pijlers zijn:

- **Eén kleurpalet, geverifieerd.** Alle kleuren leven als CSS-variabelen met het prefix `--color-*`. De light-waarden staan op `:root`, de dark-waarden op `.dark`. Tailwind gebruikt dezelfde tokens via `theme.extend`. Er zijn geen losse hex-waarden in componenten — alles verwijst naar tokens, zodat light, dark en "meer contrast" automatisch doorwerken.
- **Toegankelijkheid is geen extra, maar de basis.** Body-tekst zit ruim boven WCAG AA (12,5–14,4:1). Tap-targets zijn minimaal 48px (primaire knop groter). Kleur is nooit het enige signaal: elke status, selectie of melding heeft altijd ook tekst of een icoon. Focus is overal zichtbaar.
- **Rust en waardigheid boven dichtheid en druk.** Eén primaire actie per scherm. Geen confetti, geen flits, geen aftelklok, geen ranglijst. Het reeks-icoon is een blaadje, nooit een vlam. Een gemiste dag breekt niets.

**Leidende regels (gelden overal):**

1. Eén primaire actie per scherm, met één grote knop.
2. Minimaal 18px body-tekst, instelbaar groter; nooit thin/light gewichten.
3. Tap-targets ≥48px (primair 56px, grote keuze ≥64px), minimaal 8px ruimte ertussen, streef 12px.
4. Kleur is nooit het enige signaal — altijd tekst en/of icoon erbij.
5. `:focus-visible` toont altijd een zichtbare focus-ring; nooit `outline: none` zonder vervanging.
6. Alle interactie werkt met één vinger (tap). Geen functie achter pinch, long-press of edge-swipe.
7. Beweging is rustig en kort, en respecteert `prefers-reduced-motion`.
8. Vergevend gedrag: je kunt geen fout maken, een gemiste dag straft niet.
9. Aanspreekvorm: **"je"** (definitief vastgelegd voor de hele app; Fase 1–3 hanteerden "u" — vanaf Fase 4 is "je" leidend).

---

## Designrichting & principes

### Mood

Concrete bijvoeglijke naamwoorden die we nastreven: *warm, kalm, helder, vriendelijk, betrouwbaar, volwassen, uitnodigend, geruststellend, opgeruimd, menselijk.*

Wat we bewust **vermijden**: klinisch/medisch (wit-blauw, kruisjes, grafieken), te jong/hip (felle neon, drukke gradients, slang), kinderachtig (cartooneske mascottes, ballonletters), sportschoolachtig (zwart-rood, zweet, "no pain no gain", spierfoto's), en alles wat druk of competitief is (ranglijsten, aftelklokken, confetti, dashboards vol cijfers).

### De negen principes

1. **Eén primaire actie per scherm.** Elk scherm heeft één duidelijke, grote knop die zegt wat je nu kunt doen ("Start je oefening"). Secundaire dingen zijn rustig en ondergeschikt. Nooit twee even belangrijke keuzes naast elkaar.
2. **Zo min mogelijk tekst, maar genoeg uitleg.** Korte, warme zinnen in B1-Nederlands. Geen jargon. We laten niets weg dat je nodig hebt om je veilig en zeker te voelen, maar vullen het scherm niet met overbodige woorden.
3. **Duidelijke voortgang.** Je ziet altijd in één oogopslag waar je staat: hoeveel oefeningen vandaag nog, welke dag je hebt voltooid, hoe je reeks (blaadje) groeit. Voortgang is rustig en feitelijk, nooit een wedstrijd.
4. **Positieve, waardige feedback.** Afmaken voelt goed maar nooit overdreven. Een rustige bevestiging, een zacht groen vinkje, hooguit één badge tegelijk. Geen confetti, geen flits, geen geluidstrommels.
5. **Grote touch targets.** Alles wat je kunt aanraken is minstens 48px hoog (primaire knop 56px, grote keuzeknop ≥64px), met minimaal 8px ruimte ertussen (streef 12px). Werkt met één vinger, ook met een minder vaste hand.
6. **Toegankelijk contrast.** Tekst en knoppen halen ruim WCAG AA (normale tekst ≥4.5:1, grote tekst en iconen/randen ≥3:1) en mikken hoger waar het kan. Kleur is nooit het enige signaal.
7. **Rust boven dichtheid.** Liever een scherm meer dan een vol scherm. Royale witruimte, grote tekst (≥18px, instelbaar groter), kalme kleuren. We tonen niet alles tegelijk.
8. **Vergevend.** Je kunt geen fout maken. Een gemiste dag breekt niets; je reeks pauzeert vriendelijk en je stapt zo weer in. Geen straf, geen schuldgevoel, geen "je bent je streak kwijt".
9. **Niet-medisch, wel zorgvuldig.** We geven beweegsuggesties, geen diagnoses of behandelingen. Veiligheidsmeldingen zijn duidelijk maar nooit alarmerend, en bij twijfel verwijzen we rustig naar je huisarts.

### Iconografie

**Stijl.** Eén consistente set: outline (lijn-)iconen met afgeronde uiteinden en hoeken, lijndikte **2px** op 24px-formaat (schaalt mee: ~2,5px op 32px). Geen haarlijnen, geen scherpe punten. Vriendelijk en open, niet technisch. Standaard outline; alleen de actieve nav-tab en het voltooide-vinkje mogen **gevuld** zijn als extra (niet-kleur) "aan/klaar"-signaal. Iconen halen minimaal 3:1 contrast met hun achtergrond.

**De 7 oefencategorieën** (telkens één rustig, herkenbaar idee):

- **Benen & opstaan** — een eenvoudige stoel met een opwaartse pijl/figuurtje dat opstaat.
- **Balans** — een figuurtje of voet op één punt, met een zachte horizontale "evenwichtslijn" eronder.
- **Heupen & onderrug** — een gebogen ruglijn/bekkenvorm met een zachte draaipijl.
- **Schouders & armen** — twee armen omhoog/zijwaarts vanuit een schouderboog.
- **Core/stabiliteit** — een romp met een rustige cirkel of "anker" in het midden.
- **Dagelijkse kracht** — twee handen die een boodschappentas of pot optillen (geen halter).
- **Mobiliteit** — een gewricht met zachte ronddraaiende pijl; soepel bewegen.

**De 4 nav-items** (onderin, altijd zichtbaar): **Vandaag** (zonnetje of gevuld blad-in-cirkel), **Oefeningen** (rooster van vier zachte vakjes of een lijstje), **Voortgang** (het blaadje of een kalme, oplopende heuvellijn — nooit een steile beursgrafiek), **Instellingen** (rustig tandwiel met afgeronde tanden).

**Het streak-/reeks-icoon.** Een blaadje of klein plantje dat rustig "groeit" naarmate je reeks langer wordt (klein blad → takje → plantje). Zacht groen (`--color-success` of `--color-primary`), ronde vormen. **Nooit een vlam, nooit vuur.** Geen aftellende of uitdovende animatie; bij een gemiste dag blijft het plantje gewoon staan.

**Regel: icoon altijd met tekstlabel.** Geen enkel icoon staat ooit alleen als enige uitleg. Nav-items, categorieën, knoppen en statussen hebben altijd een leesbaar tekstlabel (≥18px) ernaast of eronder.

> **Bouwnoot over emoji.** In dit document staan soms emoji (blaadje, waarschuwing, slot) als visuele placeholder in voorbeeldcopy. In de bouw worden die **altijd** vervangen door de echte outline-lijniconen uit de set hierboven — emoji-rendering is niet contrast- of stijl-stuurbaar.

### Illustratie & beeld

**Figuren.** Warme, vriendelijke, leeftijdsvriendelijke en diverse illustraties van mensen rond de 50/60+ en ouder: verschillende huidskleuren, lichaamsvormen, grijs/wit haar, bril, gewone kleding (geen strakke sportoutfits). Ontspannen en zelfverzekerd, niet hijgend of verkrampt. Zachte, ronde vormen, palet uit de tokens, weinig detail. Geen jonge fitnessmodellen, geen sportschool, geen medische sfeer.

**Oefen-demonstraties.** Rustige illustraties of korte, kalme video. De **steun is altijd zichtbaar en normaal** — een hand aan de stoelleuning, steun aan het aanrecht, een stevige stoel. Bewegingen in een paar duidelijke stappen, in een gewone huiskamer. Geen snelle montage, geen pompende muziek, geen opjagende stem. Video's starten op tik (niet automatisch met geluid) en hebben grote, eenvoudige bediening.

**Fotografie — do's:** echte mensen 55+ in een lichte thuisomgeving; natuurlijk daglicht; ontspannen houdingen; diversiteit in leeftijd, afkomst en lichaam; alledaagse kleding; steun gewoon in beeld.

**Fotografie — don'ts:** stockfoto's van jonge sporters of bodybuilders; sportscholen, halters, hometrainers; medische beelden of zorgverleners in uniform; geforceerd-blije "senioren-stockfoto's"; koude/klinische belichting; close-ups van zweet; beelden die kwetsbaarheid of hulpeloosheid benadrukken.

### Do / Don't (samenvatting)

**DO**

- Eén duidelijke primaire actie per scherm, met een grote knop.
- Veel witruimte, grote tekst (≥18px), kalme warme kleuren.
- Outline-iconen met afgeronde uiteinden, altijd met tekstlabel.
- Rustige, waardige beloningen; hooguit één badge tegelijk.
- Diverse, ontspannen figuren 55+ met zichtbare, normale steun.
- Contrast ruim boven WCAG AA; kleur altijd met tekst/icoon erbij.
- Vergevend gedrag: een gemiste dag breekt niets.

**DON'T**

- Geen vlam voor de reeks — gebruik het blaadje/plantje.
- Geen drukke dashboards, grafieken of veel cijfers tegelijk.
- Geen confetti, flitsen, aftelklokken of tijdsdruk.
- Geen ranglijsten, scores of competitie.
- Geen sportschool-, fitnessmodel- of medische beelden.
- Geen dunne/light fonts, geen kleine tap-targets (<48px).
- Geen pinch/long-press/edge-swipe als enige manier; alles met één vinger.
- Geen kil wit-blauw of hard neon; geen kinderachtige cartoons.

---

## Kleuren

Het palet is warm, gedempt en betrouwbaar — geen klinische, geen sportschool-uitstraling. De primaire kleur is een warm, gedempt mos-/olijfgroen (vitaliteit en natuur, niet fel, niet kil-blauw). De achtergrond is warm crème/zand in plaats van puur wit: dat geeft rust en is minder hard voor oudere ogen. Het accent is een warme terracotta/amber, spaarzaam ingezet voor het ene beloningsmoment of een enkel optioneel hoogtepunt — nooit voor de hoofdactie, die blijft groen.

Safety-kleuren zijn semantisch en gedempt: info = rustig teal-blauw, let-op = warme amber, stop/rode-vlag = een duidelijke maar warme baksteen-rood (geen schreeuwerig neonrood), success = zacht groen. Body-tekst is bewust ver boven AA gemikt voor de doelgroep. Dark mode gebruikt warme antraciet-tinten in plaats van puur zwart, met **dezelfde tokennamen**, zodat alles 1-op-1 mapbaar is.

Alle componenten verwijzen uitsluitend naar deze tokennamen. Er zijn geen losse hex-waarden in componentspecs.

### Light-tokens

| Token | Hex | Rol |
|---|---|---|
| `--color-bg` | `#FAF6EF` | App-achtergrond: warm crème/zand, rustig en niet-hard (geen puur wit). |
| `--color-surface` | `#FFFFFF` | Kaart/paneel-oppervlak dat boven de achtergrond ligt. |
| `--color-surface-2` | `#F2ECE0` | Subtiel verdiept oppervlak: ingevulde velden, secties, rustige scheiding. |
| `--color-text` | `#2B2A26` | Body- en kop-tekst: warm bijna-zwart (13,3:1 op bg). |
| `--color-text-muted` | `#5C594F` | Gedempte tekst: bijschriften, hints (6,5:1 op bg, blijft ≥4.5). |
| `--color-border` | `#D9D2C4` | Zachte decoratieve rand/scheiding; nooit de enige cue (laag contrast). |
| `--color-border-strong` | `#8C8678` | Sterke rand waar de rand de enige cue is (invoervelden, toggles) (≥3:1). |
| `--color-focus` | `#2F5A43` | Focus-ring kleur voor toetsenbord-/screenreader-navigatie (≥3:1). |
| `--color-primary` | `#3E6B52` | Primaire knop-vlak: warm gedempt mosgroen. Tekst hierop wit. |
| `--color-primary-strong` | `#2F5A43` | Primair als tekst/icoon op licht oppervlak; hover/pressed van de primaire knop (7,3:1). |
| `--color-on-primary` | `#FFFFFF` | Tekst/icoon op de primaire knop (6,1:1). |
| `--color-accent` | `#B25A33` | Warm terracotta accent-vlak, spaarzaam (beloning/optioneel hoogtepunt), nooit hoofdactie. |
| `--color-accent-text` | `#9A4A2A` | Accent als tekst/icoon op licht oppervlak (5,8:1). |
| `--color-on-accent` | `#FFFFFF` | Tekst/icoon op een accent-vlak (4,8:1). |
| `--color-info` | `#2E6B80` | Info icoon/rand op achtergrond, rustig teal-blauw (5,5:1, ≥3:1). |
| `--color-info-surface` | `#E3EEF1` | Achtergrondvlak van een rustige info-melding. |
| `--color-on-info-surface` | `#1F4E5F` | Tekst op het info-vlak (7,7:1). |
| `--color-caution` | `#8A5A12` | Let-op icoon/rand op achtergrond, warm amber (5,5:1, ≥3:1). |
| `--color-caution-surface` | `#FBEFD6` | Achtergrondvlak van een let-op-melding (gradatie 2). |
| `--color-on-caution-surface` | `#6E4A12` | Tekst op het caution-vlak (7,0:1). |
| `--color-stop` | `#A6342B` | Stop/rode-vlag: duidelijke maar warme baksteen-rood. Ook knop-vlak (tekst wit, 6,7:1). |
| `--color-stop-surface` | `#FBE3E0` | Achtergrondvlak van een stop-en-raadpleeg-arts-melding (gradatie 3). |
| `--color-on-stop-surface` | `#8A2620` | Tekst op het stop-vlak (7,2:1). |
| `--color-on-stop` | `#FFFFFF` | Tekst/icoon op een gevuld stop-vlak/knop (6,7:1). |
| `--color-success` | `#2F6B3D` | Success icoon/rand (zacht groen); ook streak-blaadje (5,9:1, ≥3:1). |
| `--color-success-surface` | `#E2F0E4` | Achtergrondvlak van een rustig 'dag voltooid'/success-moment. |
| `--color-on-success-surface` | `#2A5A33` | Tekst op het success-vlak (6,8:1). |

### Dark-tokens

| Token | Hex | Rol |
|---|---|---|
| `--color-bg` | `#1B1A17` | App-achtergrond: warme antraciet (geen puur zwart), rustig voor de ogen. |
| `--color-surface` | `#26241F` | Kaart/paneel-oppervlak boven de donkere achtergrond. |
| `--color-surface-2` | `#302D27` | Subtiel verdiept oppervlak: velden, secties, rustige scheiding. |
| `--color-text` | `#ECE7DD` | Body- en kop-tekst: warm gebroken wit (14,1:1 op bg). |
| `--color-text-muted` | `#B0A99C` | Gedempte tekst: bijschriften, hints (7,5:1 op bg). |
| `--color-border` | `#3A372F` | Zachte decoratieve rand/scheiding; nooit de enige cue. |
| `--color-border-strong` | `#736E63` | Sterke rand waar de rand de enige cue is (invoervelden, toggles) (≥3:1). |
| `--color-focus` | `#8FC2A4` | Focus-ring kleur voor toetsenbord-/screenreader-navigatie (8,6:1). |
| `--color-primary` | `#8FC2A4` | Primaire knop-vlak in dark: lichter mosgroen voor leesbaarheid. Tekst hierop donker. |
| `--color-primary-strong` | `#A6D2B6` | Hover/pressed van de primaire knop in dark; extra licht primair accent. |
| `--color-on-primary` | `#10241A` | Donkere tekst/icoon op het lichte primaire vlak (8,1:1). |
| `--color-accent` | `#E0996B` | Warm terracotta/amber accent-vlak, spaarzaam; ook accent als tekst/icoon op bg (7,4:1). |
| `--color-accent-text` | `#E0996B` | Accent als tekst/icoon op donker oppervlak (7,4:1). |
| `--color-on-accent` | `#2A1408` | Donkere tekst/icoon op een accent-vlak (7,4:1). |
| `--color-info` | `#7FC0D2` | Info icoon/rand op achtergrond, rustig teal (8,6:1). |
| `--color-info-surface` | `#15323B` | Achtergrondvlak van een rustige info-melding (donker). |
| `--color-on-info-surface` | `#A9D6E4` | Tekst op het info-vlak (8,7:1). |
| `--color-caution` | `#E6B85A` | Let-op icoon/rand op achtergrond, warm amber (9,4:1). |
| `--color-caution-surface` | `#3A2C0E` | Achtergrondvlak van een let-op-melding (donker, gradatie 2). |
| `--color-on-caution-surface` | `#F0CF8E` | Tekst op het caution-vlak (9,1:1). |
| `--color-stop` | `#E89189` | Stop/rode-vlag icoon/rand op achtergrond én gevuld stop-knopvlak: warm, duidelijk maar niet schreeuwerig (7,3:1 op bg). |
| `--color-stop-surface` | `#3A1512` | Achtergrondvlak van een stop-en-raadpleeg-arts-melding (donker, gradatie 3). |
| `--color-on-stop-surface` | `#F2B3AB` | Tekst op het stop-vlak (9,1:1). |
| `--color-on-stop` | `#2A0907` | Donkere tekst/icoon op een gevuld stop-knopvlak (`--color-stop` #E89189) (7,8:1). |
| `--color-success` | `#7FC58C` | Success icoon/rand (zacht groen); ook streak-blaadje (8,5:1). |
| `--color-success-surface` | `#13301A` | Achtergrondvlak van een rustig 'dag voltooid'/success-moment (donker). |
| `--color-on-success-surface` | `#A8D9B0` | Tekst op het success-vlak (9,0:1). |

> **Opgelost t.o.v. review.** Dark `--color-on-stop` verwees eerder naar een niet-bestaande kleur `#E08379`. De gevulde stop-knop in dark gebruikt het bestaande token `--color-stop` (#E89189); donkere tekst `#2A0907` daarop haalt 7,8:1.

### Contrast

De onderstaande paren zijn de belangrijkste voorgrond/achtergrond-combinaties met hun **vereiste minimum**. Normale tekst vereist ≥4.5:1, iconen/randen/focus die de enige cue zijn ≥3:1, en zuiver decoratieve randen hebben geen drempel. Body-tekst is bewust hoger gemikt (12,5–14,4:1).

> **✓ Geverifieerd (2026-06-28).** Alle **46** voorgrond/achtergrond-paren (light + dark) zijn deterministisch nagerekend met de WCAG-contrastformule via `scripts/check-contrast.py`: **0 failures** — elk paar haalt zijn vereiste minimum, body-tekst zit op 12,5–14,4:1. Wijzigt een hex, draai dan `python3 scripts/check-contrast.py` opnieuw voordat de waarde definitief is.

**Light:**

| Paar | Voorgrond | Achtergrond | Vereist min. |
|---|---|---|---|
| Body-tekst op achtergrond | `#2B2A26` | `#FAF6EF` | 4.5:1 |
| Body-tekst op surface/kaart | `#2B2A26` | `#FFFFFF` | 4.5:1 |
| Gedempte tekst op achtergrond | `#5C594F` | `#FAF6EF` | 4.5:1 |
| Gedempte tekst op surface | `#5C594F` | `#FFFFFF` | 4.5:1 |
| Tekst op primaire knop | `#FFFFFF` | `#3E6B52` | 4.5:1 |
| Primair als tekst/icoon op achtergrond | `#2F5A43` | `#FAF6EF` | 4.5:1 |
| Primair als tekst/icoon op surface | `#2F5A43` | `#FFFFFF` | 4.5:1 |
| Soft border op achtergrond (decoratief) | `#D9D2C4` | `#FAF6EF` | geen (decoratief) |
| Border-strong op achtergrond (enige cue) | `#8C8678` | `#FAF6EF` | 3:1 |
| Border-strong op surface (enige cue) | `#8C8678` | `#FFFFFF` | 3:1 |
| Focus-ring op achtergrond | `#2F5A43` | `#FAF6EF` | 3:1 |
| Accent als tekst/icoon op achtergrond | `#9A4A2A` | `#FAF6EF` | 4.5:1 |
| Tekst op accent-knop | `#FFFFFF` | `#B25A33` | 4.5:1 |
| Info-tekst op info-vlak | `#1F4E5F` | `#E3EEF1` | 4.5:1 |
| Info icoon/rand op achtergrond | `#2E6B80` | `#FAF6EF` | 3:1 |
| Caution-tekst op caution-vlak | `#6E4A12` | `#FBEFD6` | 4.5:1 |
| Caution icoon/rand op achtergrond | `#8A5A12` | `#FAF6EF` | 3:1 |
| Stop-tekst op stop-vlak | `#8A2620` | `#FBE3E0` | 4.5:1 |
| Tekst op stop-knop | `#FFFFFF` | `#A6342B` | 4.5:1 |
| Stop icoon/rand op achtergrond | `#A6342B` | `#FAF6EF` | 3:1 |
| Success-tekst op success-vlak | `#2A5A33` | `#E2F0E4` | 4.5:1 |
| Success icoon/rand op achtergrond | `#2F6B3D` | `#FAF6EF` | 3:1 |
| Streak-blaadje (primair) op achtergrond | `#2F5A43` | `#FAF6EF` | 3:1 |

**Dark:**

| Paar | Voorgrond | Achtergrond | Vereist min. |
|---|---|---|---|
| Body-tekst op achtergrond | `#ECE7DD` | `#1B1A17` | 4.5:1 |
| Body-tekst op surface/kaart | `#ECE7DD` | `#26241F` | 4.5:1 |
| Gedempte tekst op achtergrond | `#B0A99C` | `#1B1A17` | 4.5:1 |
| Gedempte tekst op surface | `#B0A99C` | `#26241F` | 4.5:1 |
| Tekst op primaire knop | `#10241A` | `#8FC2A4` | 4.5:1 |
| Primair als tekst/icoon op achtergrond | `#8FC2A4` | `#1B1A17` | 4.5:1 |
| Primair als tekst/icoon op surface | `#8FC2A4` | `#26241F` | 4.5:1 |
| Soft border op achtergrond (decoratief) | `#3A372F` | `#1B1A17` | geen (decoratief) |
| Border-strong op achtergrond (enige cue) | `#736E63` | `#1B1A17` | 3:1 |
| Border-strong op surface (enige cue) | `#736E63` | `#26241F` | 3:1 |
| Focus-ring op achtergrond | `#8FC2A4` | `#1B1A17` | 3:1 |
| Accent als tekst/icoon op achtergrond | `#E0996B` | `#1B1A17` | 4.5:1 |
| Tekst op accent-knop | `#2A1408` | `#E0996B` | 4.5:1 |
| Info-tekst op info-vlak | `#A9D6E4` | `#15323B` | 4.5:1 |
| Info icoon/rand op achtergrond | `#7FC0D2` | `#1B1A17` | 3:1 |
| Caution-tekst op caution-vlak | `#F0CF8E` | `#3A2C0E` | 4.5:1 |
| Caution icoon/rand op achtergrond | `#E6B85A` | `#1B1A17` | 3:1 |
| Stop-tekst op stop-vlak | `#F2B3AB` | `#3A1512` | 4.5:1 |
| Tekst op stop-knop | `#2A0907` | `#E89189` | 4.5:1 |
| Stop icoon/rand op achtergrond | `#E89189` | `#1B1A17` | 3:1 |
| Success-tekst op success-vlak | `#A8D9B0` | `#13301A` | 4.5:1 |
| Success icoon/rand op achtergrond | `#7FC58C` | `#1B1A17` | 3:1 |
| Streak-blaadje (primair) op achtergrond | `#8FC2A4` | `#1B1A17` | 3:1 |

### Usage-notes

- **Kleur is nooit het enige signaal.** Elke safety-melding heeft altijd een icoon én tekst: info (rustig, bv. een 'i' of tip-icoon), let-op (waarschuwingsdriehoek), stop/rode-vlag (hand- of stop-icoon plus de woorden "Stop en overleg met je arts"). De drie gradaties verschillen ook in toon van de tekst, niet alleen in kleur.
- **De primaire actie is altijd groen** (`--color-primary`). Het warme accent (terracotta/amber) wordt spaarzaam ingezet: hooguit voor het ene rustige beloningsmoment (dag voltooid, badge) of een enkel optioneel hoogtepunt. Gebruik accent nooit voor de hoofdknop, zodat er per scherm precies één duidelijke primaire actie is.
- **Mik body-tekst bewust ver boven AA:** de gekozen tekstkleuren halen 12,5–14,4:1 op de achtergrond. Houd dit hoog ook als de gebruiker de tekstgrootte vergroot. Gebruik nooit thin/light gewichten; minimaal regular (400), liever medium (500) voor knoplabels.
- **De "meer contrast"-modus** kan dezelfde tokennamen overschrijven met nog donkerder tekst (bv. `#000000` op `#FFFFFF` surface), een sterkere rand (gebruik overal `--color-border-strong` in plaats van `--color-border`) en een zichtbaardere focus-ring (2–3px). Omdat alles via tokens loopt, hoeft alleen de `:root`/`.dark`-override aangepast te worden.
- **Twee soorten randen.** `--color-border` is zacht en decoratief (scheidingslijntjes tussen kaarten) en hoeft geen 3:1 te halen, omdat vorm en witruimte de component al herkenbaar maken. `--color-border-strong` (≥3:1) is verplicht waar de rand de **enige** manier is om een component te herkennen, zoals de omlijning van een invoerveld, keuzevak of toggle.
- **Het streak-icoon** is een blaadje/plant in `--color-success` of `--color-primary`, nooit een vlam. Beloningsmomenten blijven rustig en waardig: zachte success-vlakken, geen confetti, geen flits, geen ranglijst of competitie-kleuren.
- **Tap-targets** minimaal 48px hoog met 8–12px ruimte ertussen; de primaire knop groter. Knopkleur alleen volstaat niet als statusindicatie: gebruik bij in-/uitgeschakeld ook tekst of een icoon, en verlaag bij "uitgeschakeld" niet zo ver dat het contrast onder 4.5:1 (tekst) of 3:1 (rand) zakt zolang de knop nog betekenis draagt.
- **Focus is altijd zichtbaar** met `--color-focus` (geen `outline: none`). De focus-ring haalt ≥3:1 tegen de achtergrond in beide modes, zodat toetsenbord- en schakelaargebruikers de plek op het scherm zien.
- **Dark mode** gebruikt warme antraciet in plaats van puur zwart en lichtere groen-/amber-tinten voor tekst en iconen; vermijd grote felle vlakken. Houd grote gevulde knoppen in dark mode op de lichtere primary-kleur met donkere tekst (`--color-on-primary`).
- **Map de tokens 1-op-1 naar `tailwind.config`** (`theme.extend.colors`), bv. `colors.bg: 'var(--color-bg)'`, `colors.primary: 'var(--color-primary)'`. Definieer de light-waarden op `:root` en de dark-waarden op `.dark` (of `@media (prefers-color-scheme: dark)`), met dezelfde tokennamen.

---

## Typografie, ruimte & motion

### Lettertype

**Primaire keuze: Inter** (variable font, via `next/font/google`). Inter is een open-aperture humanistische sans-serif: ruime letteropeningen, hoge x-hoogte en duidelijk onderscheidbare tekens ("I", "l" en "1" verschillen). Prettig leesbaar voor ogen die wat minder scherp zijn — precies waar we voor 50/60+ op mikken. Gratis, breed beschikbaar en als variable font efficiënt te laden. **Nooit Thin/Light:** minimumgewicht is Regular (400). Goede alternatieven met hetzelfde karakter: **Source Sans 3** of **IBM Plex Sans**.

```ts
// app/fonts.ts
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"], // nooit lichter dan 400
});
// in <html className={inter.variable}>
```

```css
--font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;
```

Daarnaast `font-optical-sizing: auto;` en `text-rendering: optimizeLegibility;` op `body`.

### Type-schaal

Basis is **18px** body. De schaal is rustig (verhouding ~1.2) zodat hiërarchie duidelijk is zonder druk te worden. Alle waarden in rem t.o.v. een root van 16px, zodat de instelbare tekstgrootte de hele schaal meeneemt.

| Rol | Token | rem | px (root 16) | line-height | weight | Gebruik |
|---|---|---|---|---|---|---|
| Display / schermtitel | `text-display` | 2.0rem | 32px | 1.2 (38px) | 700 | Grote groet/dagtitel bovenaan |
| Sectiekop | `text-section` | 1.5rem | 24px | 1.25 (30px) | 700 | Kop boven een groep |
| Kaarttitel | `text-card` | 1.25rem | 20px | 1.3 (26px) | 600 | Titel binnen een kaart |
| **Body (basis)** | `text-body` | **1.125rem** | **18px** | 1.55 (28px) | 400 | Standaard leestekst |
| Body-groot | `text-body-lg` | 1.25rem | 20px | 1.55 (31px) | 400 | Belangrijke uitleg, intro |
| Label / knoptekst | `text-label` | 1.125rem | 18px | 1.2 (22px) | 600 | Knoppen, labels, nav |
| Bijschrift / muted | `text-caption` | 1.0rem | 16px | 1.4 (22px) | 500 | Meta, hints (weight 500, nooit 400 op klein) |

Het bijschrift is bewust nog 16px (niet kleiner) — absolute ondergrens, alleen voor echt secundaire info. Body en alles daarboven blijft ≥18px. Knoptekst is 18px/600 zodat die ook bij de "grote tekst"-drempel comfortabel valt.

**Letter-spacing:** schermtitel `-0.01em`, body `0`. Geen caps voor labels/knoppen — normale casing.

```js
// tailwind.config.js → theme.extend.fontSize
fontSize: {
  display:   ["2rem",     { lineHeight: "1.2",  fontWeight: "700", letterSpacing: "-0.01em" }],
  section:   ["1.5rem",   { lineHeight: "1.25", fontWeight: "700" }],
  card:      ["1.25rem",  { lineHeight: "1.3",  fontWeight: "600" }],
  body:      ["1.125rem", { lineHeight: "1.55", fontWeight: "400" }],
  "body-lg": ["1.25rem",  { lineHeight: "1.55", fontWeight: "400" }],
  label:     ["1.125rem", { lineHeight: "1.2",  fontWeight: "600" }],
  caption:   ["1rem",     { lineHeight: "1.4",  fontWeight: "500" }],
}
```

#### Instelbare tekstgrootte

We schalen via de **root `font-size`** (alle waarden staan in rem, dus de hele app schaalt mee — tekst én rem-spacing). Drie modi, instelbaar in Instellingen, via een `data-text-size`-attribuut op `<html>`:

| Modus | root font-size | Body wordt |
|---|---|---|
| Normaal | 100% (16px) | 18px |
| Groot | 112.5% (18px) | ~20px |
| Extra groot | 125% (20px) | ~22px |

```css
:root { font-size: 100%; }
:root[data-text-size="large"]  { font-size: 112.5%; }
:root[data-text-size="xlarge"] { font-size: 125%; }
```

Voordeel: één instelling, geen component-overrides, en het respecteert ook de browser-/OS-instelling (we overschrijven niet met een vaste px). Zet daarom de viewport-meta zonder `maximum-scale`/`user-scalable=no`, zodat pinch-zoom in de browser als vangnet blijft werken (de app zelf vraagt nooit om pinch).

### Spacing-schaal

Strikt **4/8-grid**. Tailwind's default `spacing` past hier al op (1 = 4px); dit zijn de tokens die we actief gebruiken:

| Token | px | Gebruik |
|---|---|---|
| `space-1` | 4px | Haarfijne scheiding (icoon ↔ tekst) |
| `space-2` | 8px | Minimale ruimte tussen tap-targets |
| `space-3` | 12px | Streefruimte tussen tap-targets |
| `space-4` | 16px | Schermmarge (zijkanten), padding binnen kaart |
| `space-5` | 20px | Padding in grotere kaarten |
| `space-6` | 24px | Ruimte tussen kaarten/blokken |
| `space-8` | 32px | Ruimte tussen secties |
| `space-10` | 40px | Grote witruimte boven primaire actie |
| `space-12` | 48px | Sectie-einde / luchtige scheiding |

Vuistregel: **minimaal 8px** tussen aanraakbare elementen, **streef 12px**; kaarten krijgen ruim binnenpadding (16–20px).

### Radii

Warm-zacht, niet hoekig en niet bubble-achtig:

```js
// theme.extend.borderRadius
borderRadius: {
  sm:   "8px",    // kleine chips, inputs
  md:   "12px",   // standaard knoppen
  lg:   "16px",   // kaarten
  xl:   "20px",   // grote kaarten / sheets
  pill: "9999px", // ronde knoppen, streak-badge
}
```

Knoppen: 12px (of `pill` voor de ronde primaire knop). Kaarten: 16px. Grote kaarten/sheets: 20px.

### Elevation / schaduw

Subtiel en zacht — schaduw geeft alleen lichte "tilstand", nooit harde slagschaduw. In dark mode minder/geen schaduw; daar doet de lichtere oppervlaktekleur (`--color-surface`) het werk.

```js
// theme.extend.boxShadow
boxShadow: {
  card:  "0 1px 2px rgba(20, 30, 25, 0.06), 0 2px 8px rgba(20, 30, 25, 0.06)",
  lift:  "0 2px 4px rgba(20, 30, 25, 0.08), 0 6px 16px rgba(20, 30, 25, 0.08)",
}
```

```css
/* dark mode: schaduw vrijwel uit, surface doet het werk */
.dark { --shadow-card: 0 1px 2px rgba(0,0,0,0.4); }
```

### Borders

Dun maar functioneel, gekoppeld aan de kleur-tokens (geen aparte border-hexes — dat loste een contrastfout op uit de review; zie kleursectie):

```js
// theme.extend.borderWidth
borderWidth: { DEFAULT: "1px", thick: "2px", focus: "3px" }
```

- `--color-border` (decoratief, zacht) voor scheidingslijntjes tussen kaarten — geen 3:1 nodig.
- `--color-border-strong` (≥3:1) waar de rand de enige cue is: invoervelden, keuzevakken, toggles.

In de **"meer contrast"-modus** worden borders 2px en gebruik je overal `--color-border-strong`, zodat randen duidelijker afsteken (kleur is nooit het enige signaal — vorm + tekst dragen de betekenis mee).

### Focus-ring

Eén afgesproken recept, opgebouwd uit `--color-focus` (kleur-token) — overal gelijk, altijd zichtbaar bij `:focus-visible`:

```css
:root { --ring: 0 0 0 3px var(--color-bg), 0 0 0 6px var(--color-focus); }
/* 3px offset in de achtergrondkleur + 3px ring in de focuskleur, ≥3:1 contrast */
.focusable:focus-visible { box-shadow: var(--ring); outline: none; }
```

In "meer contrast" mag de ring 3→4px. Nooit `outline: none` zonder dit recept als vervanging.

### Layout

- **Containerbreedte:** mobile-first, max **480px** gecentreerd; daarboven blijft de app in die kolom staan (geen brede desktop-layout — rust en duimbereik blijven leidend).
- **Schermmarges:** 16px links/rechts (`space-4`).
- **Verticaal ritme:** blokken/kaarten 24px uit elkaar (`space-6`), secties 32px (`space-8`). Eén kaart = één gedachte.
- **Eén primaire actie onderaan, binnen duimbereik:** de primaire knop (bv. "Start je oefening") staat onderaan, full-width binnen de container, net boven de bottom-nav of als natuurlijke laatste actie in de scroll. Hoogte 56px, radius `pill` of `md`, tekst 18px/600.
- **Tap-targets:** alles aanraakbaars minimaal 48px hoog (`min-h-12`). Secundaire icoonknoppen 48×48px. Tussen targets 8–12px.
- **Bottom-nav:** hoogte 64px plus safe-area. Reserveer onderaan ruimte zodat content niet onder de nav valt:

```css
.app-bottom { padding-bottom: calc(64px + env(safe-area-inset-bottom)); }
```

```js
// theme.extend
maxWidth: { app: "480px" },
spacing:  { nav: "64px", btn: "56px" }, // → h-nav, min-h-btn
```

```html
<div class="mx-auto w-full max-w-app px-4 min-h-dvh pb-[calc(64px+env(safe-area-inset-bottom))]">
```

### Motion

Rustig, kort, functioneel. Geen confetti, geen flits, geen schudden. Beweging ondersteunt begrip (iets verschijnt, iets bevestigt) — meer niet.

```js
// theme.extend.transitionDuration / transitionTimingFunction
transitionDuration: {
  fast: "120ms",   // hover/press feedback
  base: "200ms",   // standaard UI-overgang
  slow: "320ms",   // verschijnen van kaart/sheet/badge
},
transitionTimingFunction: {
  soft:  "cubic-bezier(0.4, 0, 0.2, 1)",   // standaard ease
  enter: "cubic-bezier(0.16, 1, 0.3, 1)",  // zacht uitveren bij verschijnen
},
```

- **Knop-druk:** schaal `0.98`, 120ms, `soft`. Subtiel, geen stuiter.
- **Verschijnen (kaart/sheet):** fade 0→1 + 8px omhoog schuiven, 320ms, `enter`.
- **Geen** auto-afspelende loops, geen knipperen, geen aftelklokken.

**Dag-voltooid & badge — rustig en waardig.** Het blaadje en een Dag-voltooid-badge verschijnen met een zachte fade + lichte schaal van 0.96→1.0 over 320ms (`enter`), eventueel één keer een heel subtiele zachte gloed (geen herhaling). Hooguit één badge tegelijk, gecentreerd, met begeleidende tekst ("Mooi, je dag zit erop"). Nooit deeltjes/confetti, nooit geluid-by-default, nooit een flits.

```css
@keyframes badge-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
.badge-enter { animation: badge-in 320ms cubic-bezier(0.16,1,0.3,1) both; }
```

**prefers-reduced-motion (verplicht respecteren):** beweging valt terug op een directe fade of helemaal niets — geen schuif/schaal.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .badge-enter { animation: none; opacity: 1; transform: none; }
}
```

Tailwind: `transition-* duration-base ease-soft` voor de meeste interacties; `motion-reduce:transition-none motion-reduce:transform-none` als extra vangnet op animerende elementen.

---

## Componenten

Alle componenten verwijzen uitsluitend naar de tokennamen uit de kleur- en typografiesectie (`--color-*`, `text-*`, `space-*`, radii, `--ring`). Geen losse hex-waarden. Daardoor werken light, dark, "meer contrast" en de instelbare tekstgrootte automatisch zonder per-component-aanpassingen. Voorbeeldcopy is in de "je"-vorm.

**Gedeelde regels (gelden voor élk interactief component):**

- Minimale tap-target 48×48px; primaire knop 56px; grote keuzeknop ≥64px. Minimaal 8px ruimte tussen targets, streef 12px (`gap: var(--space-3)`).
- Enkel-vinger tap. Geen functie achter pinch, long-press of edge-swipe.
- `:focus-visible` toont altijd de focus-ring (`--ring`); nooit `outline: none` zonder vervanging.
- Kleur is nooit het enige signaal: status/selectie/fout krijgt altijd óók tekst of icoon.
- Micro-animaties ≤320ms, rustig (opacity/transform), en respecteren `prefers-reduced-motion`. Geen confetti, flits of aftelklok.

### 1. Button — primair / secundair / tertiair-tekst

**Doel.** De manier om een actie uit te voeren. Per scherm precies één primaire knop; secundair en tertiair zijn ondergeschikt.

**Anatomie.** Volle-breedte rechthoek met radius `pill` of `md`, gecentreerd label, optioneel een leidend icoon (decoratief). Tekst altijd zichtbaar — een knop is nooit alleen een icoon.

| Variant | Hoogte | Padding (h) | Tekst | Gewicht | Breedte |
|---|---|---|---|---|---|
| Primair | 56px (`min-height`) | 24px | `text-body-lg` (20px) | 600 | 100% |
| Secundair | 48px | 20px | `text-body` (18px) | 600 | 100% of inhoud |
| Tertiair-tekst | 48px tikvlak | 12px | `text-body` (18px) | 500 | inhoud |

- Iconen in de knop: 24px, kleur = labelkleur. Radius: primair/secundair `pill`; binnen lijsten mag `md`.

**Stijl per variant (default):**

- Primair: vlak `--color-primary`, tekst `--color-on-primary` (6,1:1 — ruim AA). Wil je echt ≥7:1, gebruik dan `--color-primary-strong` als knopvlak (wit haalt daar 7,9:1).
- Secundair: vulling `--color-surface`, rand 2px `--color-primary`, tekst `--color-primary-strong` (≥4.5:1 op bg).
- Tertiair-tekst: geen vlak, geen rand; tekst `--color-primary-strong` met onderstreping bij hover/focus, zodat het ook zonder kleur als link leesbaar is.

**States:**

- **hover** (alleen pointer): primair → `--color-primary-strong`; secundair → vulling `--color-surface-2`; tertiair → onderstreept.
- **active/pressed:** 1px omlaag (`translateY(1px)`), iets donkerder; geen langdurige ripple.
- **focus-visible:** `--ring` rondom; geldt voor alle varianten.
- **disabled:** vulling/rand/tekst gedempt, maar de tekst houdt **≥4.5:1** zolang de knop nog betekenis draagt (gebruik `--color-text-muted`, niet een verlaagde opacity die onder 4.5:1 zakt). Altijd óók `aria-disabled="true"` + zichtbare uitleg waarom (kleur alleen is niet genoeg). Cursor `not-allowed`. Liever vermijden: schermen hebben zelden een disabled primaire knop.
- **loading:** label blijft staan, ervoor een 20px spinner (1 omwenteling/0.9s), `aria-busy="true"`, knop niet opnieuw klikbaar. Tekst wordt "Even geduld…".

> **Opgelost t.o.v. review.** De eerdere "disabled op 45% opacity" (gaf 2,07:1) en de onjuiste "on-primary ≥7:1"-claim zijn gecorrigeerd: disabled houdt ≥4.5:1; primaire knop is 6,1:1 (of gebruik `--color-primary-strong` voor 7,9:1).

**Toegankelijkheid:** `<button type="button">` (of `<a role="button">` bij navigatie). Tap-target ≥48px (primair 56px); ruimte tussen gestapelde knoppen ≥`space-3` (12px). Focus-ring ≥3:1; tekstcontrast ≥4.5:1. Status (loading/disabled) altijd via tekst + aria.

**Microcopy:** Primair "Start vandaag", "Klaar, volgende", "Hiermee beginnen". Secundair "Hoe werkt het?". Tertiair "Ik heb dit al gebruikt", "Mijn voortgang".

### 2. Grote keuze-/optieknop (onboarding-antwoord, niveaukeuze)

**Doel.** Een groot, volle-breedte antwoord dat je met één tik kiest. Gebruikt bij onboarding-antwoorden (tik = direct volgende) en niveaukeuze (kaart-stijl met sub-info). Vervangt typen volledig.

**Anatomie.** Volle-breedte vlak met radius `lg`, links-uitgelijnd label (mag 2 regels), optioneel een tweede regel sub-tekst (bv. "5 min · 4 oefeningen · Kalm en met steun"), rechts een affordance: chevron "›" (gaat door) óf een vinkje "✓" (gekozen).

**Maten:** Hoogte ≥64px (groeit mee bij twee tekstregels). Padding 16–20px (`space-4`). Label `text-body-lg` (20px), weight 600. Sub-tekst `text-body` (18px), `--color-text-muted`. Verticale ruimte tussen knoppen ≥`space-3` (12px). Affordance-icoon 24px.

**States:**

- **default:** `--color-surface`, rand 1px `--color-border`.
- **hover:** rand `--color-primary`, lichte `--color-surface-2`.
- **active:** kort `translateY(1px)`.
- **focus-visible:** `--ring`.
- **selected** (niveaukeuze / meerkeuze): rand 2px `--color-primary` + vlak `--color-info-surface`-licht + zichtbaar vinkje "✓" + `aria-checked="true"`. Nooit alléén kleur — het vinkje en de dikkere rand dragen de selectie ook zonder kleur.
- **disabled:** zoals Button.

**Toegankelijkheid:**

- Onboarding enkelvoudige keuze: groep `role="radiogroup"` met `aria-labelledby` = de vraag; elke knop `role="radio"` + `aria-checked`. Tik selecteert én navigeert.
- Meerkeuze (bv. "bewegingen die je liever overslaat"): elke knop `role="checkbox"` + `aria-checked`; bevestigen met aparte primaire knop "Volgende".
- Tap-target ≥64px; ruimte ≥12px ertussen. Selectie altijd via tekst/icoon naast kleur.

**Microcopy:** Onboarding "Bijna niet — ik zit veel", "Af en toe — een stukje lopen" + onderaan de tertiaire uitwijk "Weet ik niet / liever niet zeggen". Niveaukeuze (kaart): "Rustig starten" / sub "5 min · 4 oefeningen · Kalm en met steun" / ✓ voorgevinkt.

### 3. Card (basis) + Exercise Card (oefenkaart)

#### 3a. Card (basis)

**Doel.** Rustige container die bij elkaar horende info groepeert (streak-kaart, dag-kaart, badge-vak).

**Anatomie.** `--color-surface`, radius `lg`, `shadow-card`, padding `space-4`/`space-6`, optionele 1px `--color-border` (in "meer contrast"-modus altijd zichtbaar). Volle breedte minus 16px schermmarge; interne `gap` `space-3`.

**States.** Een puur informatieve card is niet interactief (geen hover/focus). Is de hele card tikbaar (bv. dag-kaart → start), dan gelden de Button-states en wordt het een `<button>`/`<a>` met duidelijke actietekst.

**Toegankelijkheid.** Informatieve card = `<section>`/`<article>` met een kop. Tikbare card = één tap-target ≥48px hoog met een toegankelijke naam ("Start de oefeningen van vandaag"). Schaduw/kleur is nooit het enige onderscheid; structuur komt van koppen en witruimte.

**Microcopy:** streak-kaart "🌿 (blaadje-icoon) Dag 6 — Je bent lekker bezig."

#### 3b. Exercise Card (oefenkaart)

**Doel.** Eén oefening volledig en rustig presenteren tijdens een sessie: wat, waarom, hoeveel, hoe, veilig, makkelijker/moeilijker, en afvinken. Eén oefening per scherm.

**Anatomie (vaste volgorde van boven naar onder):**

1. **Media-plek** — video die vanzelf loopt (10–15s, geluidloos default), met grote knoppen ▶ pauze/herstart en audio aan/uit (elk ≥48px). 16:9, radius `md`. Verplicht: poster-afbeelding + `alt`/`aria-label`; bij ontbrekende video een statisch plaatje. Geen autoplay-geluid.
2. **Naam** — `text-display` (32px), weight 700. Bv. "Opstaan uit de stoel".
3. **Waarom nuttig** — één zin, `text-body`, `--color-text-muted`. "Zo blijf je makkelijk zelf opstaan van een stoel of bank."
4. **Herhalingen / seconden** — concreet, `text-body-lg`, weight 600. "8 keer · in je eigen tempo" of "20 seconden vasthouden". Nooit een aftelklok.
5. **Instructie** — 1–3 korte genummerde stappen, `text-body`, ruime regelafstand.
6. **Veiligheidstip** — altijd zichtbaar, als Safety Alert variant "let-op" (zie 4), bij rode vlaggen variant "stop". "Houd je vast aan de leuning als dat fijner voelt. Houd je adem niet in."
7. **Variant-rij** — twee secundaire knoppen naast elkaar: "Makkelijker" en "Moeilijker" (elk ≥48px, ≥12px ertussen). Gekozen variant wordt onthouden en gemarkeerd met tekst + vinkje, niet alleen kleur. Beide gelijkwaardig vormgegeven, geen oordeel.
8. **"Gedaan"-knop** — primaire knop onderaan, label "Klaar, volgende" (56px, volle breedte).
9. Boven het geheel: rustige stap-indicator "Stap 2 van 5" (zie 5c, geen klok) en een ✕ linksboven om veilig te stoppen.

**Maten.** Volle breedte; verticale `gap` `space-4`. Media min. 200px hoog op 360px-scherm.

**States.** Variant-knoppen: Button-secundair states; gekozen = 2px `--color-primary` + vinkje + `aria-pressed="true"`. Media: speelt/pauzeert; pauzestand toont ▶ groot in het midden. "Klaar, volgende": Button-primair states (incl. loading). Na afvinken een korte rustige bevestiging (vinkje verschijnt), geen flits.

**Toegankelijkheid.** Eén oefening = één `<section aria-labelledby="oefening-naam">`. Video heeft een gelijkwaardig tekstalternatief (begrijpen kan zónder geluid en zónder video). Audioknop is optioneel, niet vereist om door te kunnen. Stap-indicator als tekst ("Stap 2 van 5"), niet alleen puntjes. Variant-keuze via tekst + vinkje; veiligheidstip via icoon + tekst. Alle knoppen ≥48px; de ✕ is een echt ≥48px tikvlak met label "Stoppen".

### 4. Safety Alert — 3 varianten (info / let-op / stop-rode-vlag)

**Doel.** Veiligheids- en steuninformatie duidelijk maar niet alarmerend tonen, in drie gradaties. Goed leesbaar, kalm, nooit knipperend of schreeuwerig.

**Anatomie (alle drie gelijk).** Een blok met links een **icoon** (24px), daarnaast een korte **titel** + **tekst** (B1), op een zachte achtergrond met 1px rand en een 4px gekleurde accentlijn links. De drie verschillen in icoon, woordkeuze én kleur — kleur is dus nooit het enige verschil.

| Variant | Token-paar (surface / tekst / accent) | Icoon (lijn-icoon, geen emoji) | Toon | Voorbeeld-microcopy |
|---|---|---|---|---|
| **Info** (rustig) | `--color-info-surface` / `--color-on-info-surface` / `--color-info` | informatie-cirkel | neutraal, behulpzaam | "Tip: zet het geluid aan als je de uitleg liever hoort." |
| **Let-op** (voorzichtigheid) | `--color-caution-surface` / `--color-on-caution-surface` / `--color-caution` | driehoek met uitroepteken | vriendelijk attenderend | "Houd je vast aan een stoel of het aanrecht. Houd je adem niet in." |
| **Stop** (rode vlag) | `--color-stop-surface` / `--color-on-stop-surface` / `--color-stop` | hand-stop of kruis-cirkel | duidelijk, kalm, niet paniekerig | "Stop en bel je huisarts als je pijn op de borst krijgt, duizelig wordt of erg kortademig bent." |

**Maten.** Padding `space-4`; icoon 24px met 12px ruimte tot de tekst; titel `text-body`/weight 600, tekst `text-body`; radius `md`; accentlijn 4px links.

**Contrast.** Tekst op de zachte achtergrond ≥4.5:1; icoon en accentlijn ≥3:1. De "stop"-variant gebruikt een ingehouden, warme baksteen-rood (`--color-stop`) — duidelijk maar niet fel/neon; geen vol-rood vlak, geen witte tekst op fel rood.

**States.** Statisch (informatief). Bevat de alert een link ("Lees meer over veilig bewegen"), dan krijgt die link Button-tertiair-states incl. focus-visible. Geen sluit-/dismiss-flits.

**Toegankelijkheid.** Info/let-op: `role="note"` of gewone tekst met kop. Stop/rode vlag: `role="alert"` of `aria-live="assertive"` alléén wanneer hij dynamisch verschijnt na een gebruikersactie; statisch op het veiligheidsscherm gewoon als kop + lijst. Iconen hebben een tekst-equivalent ("Let op", "Stop") zodat de gradatie niet van kleur of vorm alleen afhangt. Geen geluid, geen knipperen, geen rode rand om het hele scherm.

### 5. Progress — streak (blaadje), maand-kalenderstrip, voortgangsbalk

#### 5a. Vergevende streak-indicator (blaadje)

**Doel.** Ritme tonen op een warme, vergevende manier. Icoon = blaadje/plant (`--color-success` of `--color-primary`), **nooit een vlam**.

**Anatomie.** Klein blaadje-icoon 24px + tekst. Op Home als kaart, op Voortgang als regel. Bij een gemiste dag: nooit rood, nooit "verbroken".

**Maten/stijl.** Icoon 24px; tekst `text-body`/weight 600. Bij 0/rustdag een neutrale, warme variant (geen grijs-droevig icoon).

**States.** default ("Dag 6"); rustdag ("Vandaag rust, dat hoort erbij"); warme terugkeer na afwezigheid ("Fijn dat je er weer bent"). Geen reset-melding, geen alarm.

**Toegankelijkheid.** Blaadje is decoratief (`aria-hidden`), de tekst draagt de betekenis. Geen kleur-alleen.

**Microcopy:** "Dag 6 — Je bent lekker bezig." · "Vandaag rust, dat hoort erbij." · "Fijn dat je er weer bent."

#### 5b. Maand-kalenderstrip

**Doel.** Het maand-/weekritme in één blik, zonder oordeel over gaten.

**Anatomie.** Rij bolletjes met dag-labels (M D W D V Z Z). Drie statussen, elk met **vorm + tekst-uitleg**, niet alleen kleur:

- **Gevuld ●** = actieve dag (`--color-primary`).
- **Zacht ◐/halfvol** = rust- of mobiliteitsdag (`--color-surface-2` met rand) — telt mee, hoort erbij.
- **Open ○** = overgeslagen dag, neutraal (`--color-border`), **nooit rood, geen kruis**.

**Maten.** Bolletjes 20–24px, ruimte ≥12px; label `text-body` eronder. Standaard niet-tikbaar; is een dag tikbaar voor detail, dan tap-target ≥48px.

**States.** Statusweergave; vandaag krijgt een dunne `--color-primary`-ring als extra markering (plus het woord "Vandaag").

**Toegankelijkheid.** Elke dag heeft een tekstlabel ("Maandag: bewogen", "Donderdag: overgeslagen", "Zondag: rustdag"). Onder de strip een korte legenda die de drie vormen verklaart. Status nooit alleen via kleur (vorm + tekst).

**Microcopy:** "Je bewoog 6 van de 7 dagen. Knap!" (altijd optellend, nooit "je miste 1").

#### 5c. Rustige voortgangsbalk

**Doel.** Richting geven binnen een sessie ("Stap 2 van 5") of binnen de maand ("Week 2 van 4"). Geen aftelklok, geen tijd.

**Anatomie.** Dunne afgeronde balk (radius `pill`), gevuld deel `--color-primary` op `--color-surface-2`, met een tekstlabel ernaast/erboven.

**Maten.** Hoogte 8px; volle breedte; label `text-body`.

**States.** Vult rustig bij (≤200ms transition, geen show). Geen "bijna klaar!"-druk.

**Toegankelijkheid.** `role="progressbar"` met `aria-valuenow`/`aria-valuemin`/`aria-valuemax` én een tekstlabel ("Stap 2 van 5"). Contrast gevuld vs. rest ≥3:1. De tekst draagt de stand, niet de kleur.

**Microcopy:** "Stap 2 van 5" · "Je programma: Week 2 — Consistentie & controle".

### 6. Badge (rustig, waardig)

**Doel.** Kleine mijlpalen erkennen — zelf-referentieel, eenmalig te verdienen, nooit te verliezen. Volwassen, geen glitter/confetti, geen competitie of ranglijst. Ondersteunend, niet de motor.

**Anatomie.** Rond/zacht-vierkant medaillon (radius `lg`) met een rustig lijn-/vlak-icoon, daaronder de naam, optioneel een korte regel. Twee toestanden: verdiend vs vergrendeld.

**Maten.** Medaillon 64px in het overzicht (rij van 3), naam `text-body`/weight 600 eronder. In de unlock-presentatie groter (96px), gecentreerd in een Card.

**States:**

- **verdiend:** vol icoon in `--color-primary`/`--color-success`-sfeer op `--color-surface`, naam in `--color-text`.
- **vergrendeld:** gedempt medaillon + slot-icoon én het woord "Nog te verdienen" (kleur niet als enig signaal); naam mag zichtbaar zijn als zachte prikkel zonder druk.
- **unlock-presentatie:** verschijnt rustig (fade/zachte schaal ≤320ms), op Dag-voltooid, hooguit één badge tegelijk. Verdere badges komen later of staan rustig onder Voortgang. Geen geluid-explosie, geen confetti, geen flits.
- **focus-visible** (als de badge tikbaar is voor detail): `--ring`.

**Toegankelijkheid.** Badge-detail tikvlak ≥48px; toegankelijke naam "Badge: Sterke start, verdiend" / "Badge: Maand volbracht, nog te verdienen". Verdiend/vergrendeld onderscheid via icoon + tekst, niet alleen kleur/dimming. Unlock kondigt zich beschaafd aan via `aria-live="polite"` (niet assertive — geen onderbreking).

**Microcopy:** unlock op Dag-voltooid: "Nieuw: badge 'Sterke start' — De eerste week zit erop. Het lastigste, beginnen, heb je gehad." Overzicht onder Voortgang: rij van 3, laatste vergrendeld met "(slot) Nog te verdienen".

### 7. Bottom navigation (4 items)

**Doel.** Vaste, herkenbare navigatie tussen de vier hoofdsecties, altijd binnen duimbereik. **Verdwijnt tijdens een actieve oefensessie** (full-focus). Staat niet in de lineaire eerste-keer-flow (Welkom/onboarding/niveaukeuze).

**Anatomie.** Balk onderaan, `--color-surface` met 1px `--color-border` bovenrand, 4 gelijke items. Elk item = icoon (24px) bóven een tekstlabel — label altijd zichtbaar en leidend (iconen decoratief; emoji worden in de bouw vervangen door echte iconen). Items: **Vandaag · Oefeningen · Voortgang · Instellingen**.

**Maten.** Balkhoogte ≥64px (plus safe-area inset onderaan). Elk item-tikvlak ≥48×48px, samen volle breedte. Reken: 480px container − 2× 16px marge = 448px / 4 ≈ 112px per item; op een 360px-scherm ≈ 82px per item — ruim boven 48px. Label `text-body` (18px) weight 500; icoon 24px.

**States:**

- **default:** icoon + label `--color-text-muted`.
- **active/current:** icoon + label `--color-primary`, label weight 600, plus een 3px indicator-streep of gevuld icoon (niet alleen kleur).
- **hover** (pointer): lichte `--color-surface-2`.
- **active/pressed:** subtiele indruk.
- **focus-visible:** `--ring` om het item.

**Toegankelijkheid.** `<nav aria-label="Hoofdmenu">` met een lijst van links; het huidige item `aria-current="page"`. Labels altijd aanwezig. Active-status via tekstgewicht + indicator + kleur (nooit kleur alleen). Geen edge-swipe-navigatie; alle wissels via gewone tap.

### 8. Form-elementen in de MVP

#### 8a. Toggle / switch (instellingen)

**Doel.** Eén instelling aan/uit zetten ("Meer contrast", "Geluid standaard aan", "Herinnering").

**Anatomie.** Lijstrij: label links (`text-body`), switch rechts. De switch is een pill met een ronde knop.

**Maten.** Tikvlak van de héle rij ≥56px hoog (label + switch beide tikbaar); switch zelf ±52×32px met 28px knop; ruimte tussen rijen ≥`space-2`.

**States:**

- **uit:** knop links, baan `--color-surface-2` met 1px `--color-border-strong`; tekst "Uit" naast de switch.
- **aan:** knop rechts, baan `--color-primary`; tekst "Aan" naast de switch.
- **focus-visible:** `--ring` om de switch.
- **disabled:** gedempt + `aria-disabled`.
- Knop schuift rustig (≤150ms), geen stuiter.

**Toegankelijkheid.** `role="switch"` + `aria-checked`; label gekoppeld via `aria-labelledby`. Aan/uit blijkt uit positie + tekst "Aan"/"Uit", niet alleen kleur. Tikvlak fors. Contrast baan-aan vs. achtergrond ≥3:1.

**Microcopy:** "Meer contrast — Aan" · "Geluid standaard aan — Aan" · "Herinnering — Uit".

#### 8b. Radio-achtige grote keuze

**Doel.** Eén optie uit een korte lijst kiezen waar de keuze blijft staan (bv. "Mijn moment": na de koffie / na het nieuws; of tekstgrootte: Normaal / Groot / Extra groot).

**Anatomie.** Volle-breedte grote keuzeknoppen (component 2), maar met een blijvende selectie-markering: gevuld radio-rondje "◉" + vinkje + 2px `--color-primary`-rand op de gekozen optie.

**Maten.** Hoogte ≥56px; ruimte ≥12px; label `text-body-lg`.

**States.** default / hover / active / focus-visible / **selected** (rondje gevuld + vinkje + dikkere rand) — als component 2, plus de blijvende selectie.

**Toegankelijkheid.** `role="radiogroup"` + `role="radio"` met `aria-checked`; pijltjestoetsen wisselen binnen de groep (toetsenbord-optie). Selectie via rondje + vinkje + rand, nooit kleur alleen.

**Microcopy:** "Wanneer komt het je het beste uit?" → "Na het nieuws" (gekozen, ◉ ✓).

#### 8c. Segmented niveau-keuze

**Doel.** Compacte keuze tussen de 3 niveaus waar weinig ruimte is (bv. Instellingen → "Niveau"). De uitgebreide keuze gebruikt de kaarten uit component 2; dit segmented control is de compacte variant.

**Anatomie.** Drie segmenten in één pill-container (radius `pill`, `--color-surface-2`): "Rustig starten" · "Actief blijven" · "Sterker worden". Het actieve segment krijgt een verhoogd vlak.

**Maten.** Hoogte ≥48px; elk segment min. 33% breed met label `text-body`/weight 600. Bij smalle schermen of grote tekstinstelling **valt het control terug op gestapelde grote keuzeknoppen (8b)** — labels mogen nooit afgekapt worden.

**States:**

- **default segment:** tekst `--color-text-muted`, transparant.
- **active segment:** vlak `--color-surface` met `shadow-card`, tekst `--color-primary`, weight 600, plus een vinkje of onderstreep zodat het niet alleen aan kleur te herkennen is.
- **hover/active/focus-visible:** zoals Button; focus-ring om het hele control of het gefocuste segment.
- **disabled:** gedempt.

**Toegankelijkheid.** `role="radiogroup"` met drie `role="radio"`-segmenten; `aria-checked` op het actieve. Boven het control een label "Niveau". Actief blijkt uit vlak + gewicht + markering, niet alleen kleur. Tikvlak ≥48px per segment. Bij twijfel over ruimte: terugval naar 8b (toegankelijkheid wint van compactheid).

**Microcopy:** "Niveau — nu: Rustig starten. Je kunt dit altijd later aanpassen."

---

## Implementatie-haakjes (Tailwind / CSS-variabelen)

De tokens landen als CSS-variabelen: light op `:root`, dark op `.dark`. Dezelfde tokennamen in beide modes, zodat schakelen één class is. De "meer contrast"-modus is een extra override (bv. `:root[data-contrast="high"]`) die alleen een handvol tokens aanscherpt. Tailwind verwijst via `theme.extend` naar die variabelen, zodat alle utilities (`bg-primary`, `text-text`, `border-border-strong`) automatisch meeschalen met de actieve modus.

**CSS-variabelen (illustratief, niet uitputtend):**

```css
:root {
  /* kleur — light (zie kleursectie voor de volledige set) */
  --color-bg: #FAF6EF;
  --color-surface: #FFFFFF;
  --color-surface-2: #F2ECE0;
  --color-text: #2B2A26;
  --color-text-muted: #5C594F;
  --color-border: #D9D2C4;
  --color-border-strong: #8C8678;
  --color-focus: #2F5A43;
  --color-primary: #3E6B52;
  --color-primary-strong: #2F5A43;
  --color-on-primary: #FFFFFF;
  --color-accent: #B25A33;
  --color-stop: #A6342B;
  /* … overige safety- en surface-tokens … */

  /* focus-ring recept, opgebouwd uit --color-focus */
  --ring: 0 0 0 3px var(--color-bg), 0 0 0 6px var(--color-focus);

  /* tekstgrootte-schaal via root font-size */
  font-size: 100%;
}
:root[data-text-size="large"]  { font-size: 112.5%; }
:root[data-text-size="xlarge"] { font-size: 125%; }

.dark {
  --color-bg: #1B1A17;
  --color-surface: #26241F;
  --color-surface-2: #302D27;
  --color-text: #ECE7DD;
  --color-text-muted: #B0A99C;
  --color-border: #3A372F;
  --color-border-strong: #736E63;
  --color-focus: #8FC2A4;
  --color-primary: #8FC2A4;
  --color-primary-strong: #A6D2B6;
  --color-on-primary: #10241A;
  --color-accent: #E0996B;
  --color-stop: #E89189;
  /* … overige tokens, zie dark-tabel … */
}

/* meer contrast: scherpt alleen aan, behoudt de warme look */
:root[data-contrast="high"] {
  --color-text: #000000;
  --color-border: var(--color-border-strong);
  --ring: 0 0 0 3px var(--color-bg), 0 0 0 7px var(--color-focus);
}
```

**Tailwind (`theme.extend`):**

```js
// tailwind.config.js
module.exports = {
  darkMode: "class", // .dark op <html>
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        focus: "var(--color-focus)",
        primary: "var(--color-primary)",
        "primary-strong": "var(--color-primary-strong)",
        "on-primary": "var(--color-on-primary)",
        accent: "var(--color-accent)",
        // safety
        info: "var(--color-info)",
        "info-surface": "var(--color-info-surface)",
        caution: "var(--color-caution)",
        "caution-surface": "var(--color-caution-surface)",
        stop: "var(--color-stop)",
        "stop-surface": "var(--color-stop-surface)",
        success: "var(--color-success)",
        "success-surface": "var(--color-success-surface)",
      },
      fontFamily: { sans: "var(--font-sans)" },
      maxWidth: { app: "480px" },
      spacing: { nav: "64px", btn: "56px" },
      // fontSize / borderRadius / boxShadow / transition: zie typografiesectie
    },
  },
};
```

Gebruik in markup: `class="bg-surface text-text border border-border-strong rounded-lg"`. Schakel dark via `.dark` op `<html>`, tekstgrootte via `data-text-size`, en "meer contrast" via `data-contrast="high"` — geen enkele component hoeft daarvoor aangepast te worden.

---

## Open punten voor Fase 5

1. **Deterministische contrastverificatie als build-stap.** De ratio's in dit document zijn berekend; leg een geautomatiseerd script of test (CI) vast dat élk gedefinieerd voorgrond/achtergrond-paar tegen zijn vereiste minimum controleert, zodat een tokenwijziging nooit ongemerkt onder de drempel zakt.
2. **Definitieve iconenset.** De 7 categorie-iconen, 4 nav-iconen, het groeiende blaadje en de safety-iconen moeten als echte outline-set (2px, afgeronde uiteinden) worden ontworpen/gekozen en op 3:1 contrast gecontroleerd. De emoji in dit document zijn placeholders.
3. **Microcopy-bibliotheek in "je"-vorm.** Alle schermteksten, lege-staten, foutmeldingen, safety-teksten en beloningscopy uitschrijven en toetsen op B1-niveau. Fase 1–3 in "u" moeten consistent omgezet worden.
4. **Oefenvideo's / -illustraties.** Productie van rustige demonstraties met zichtbare steun, poster-afbeeldingen en gelijkwaardige tekstalternatieven; bevestigen dat begrijpen kan zónder geluid en video.
5. **"Meer contrast"-modus volledig uitwerken.** Exacte override-waarden voor alle tokens (niet alleen tekst/border/ring) plus controle dat de hele set in zowel light als dark de hogere drempels haalt.
6. **Disabled- en loading-tokens.** Een expliciet disabled-tekst/vlak-token vastleggen dat aantoonbaar ≥4.5:1 houdt, plus het loading-spinner-component.
7. **Componenten in Figma + code (design system).** Deze specs omzetten naar herbruikbare Figma-componenten en React/Tailwind-componenten met Code Connect, zodat ontwerp en code één bron delen.
8. **Toetsenbord- en screenreader-doorloop.** Volledige tab-volgorde, focus-management bij sheets/modals, en een test met VoiceOver/TalkBack over de kernflows (onboarding, oefensessie, voortgang).
9. **Reduced-motion en pinch-zoom in de praktijk.** Bevestigen dat alle animaties netjes terugvallen en dat browser-pinch-zoom werkt naast de ingebouwde tekstgrootte-instelling.
10. **Performance van fonts en media.** Variable font subsetten/preloaden, video-formaten en lazy-loading, zodat de app ook op oudere/tragere toestellen rustig en snel blijft.
