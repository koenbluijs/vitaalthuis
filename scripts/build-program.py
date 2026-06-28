#!/usr/bin/env python3
"""Genereert content/program.json (30-dagen programma) uit content/exercises.json.
Dag -> dagtype komt uit Fase 3; oefeningen worden deterministisch per dagtype
gekozen met een round-robin cursor per categorie, zodat dagen varieren en de
hele bibliotheek aan bod komt. Niveau bepaalt de dosering (in de app), niet de
selectie. Pas dit script aan, niet program.json handmatig."""
import json
from collections import defaultdict

seed = json.load(open("content/exercises.json"))
exs = seed["exercises"]
by_cat = defaultdict(list)
for e in exs:
    by_cat[e["category"]].append(e["id"])

SCHEDULE = {
 1:'Kracht basis',2:'Balans basis',3:'Mobiliteit',4:'Dagelijkse bewegingen',5:'Kracht basis',6:'Combinatie',7:'Herstel',
 8:'Kracht basis',9:'Balans basis',10:'Dagelijkse bewegingen',11:'Mobiliteit',12:'Kracht basis',13:'Combinatie',14:'Herstel',
 15:'Kracht basis',16:'Balans basis',17:'Combinatie',18:'Mobiliteit',19:'Kracht basis',20:'Combinatie',21:'Herstel',
 22:'Combinatie',23:'Balans basis',24:'Dagelijkse bewegingen',25:'Kracht basis',26:'Mobiliteit',27:'Combinatie',28:'Herstel',
 29:'Combinatie (licht)',30:'Herstel',
}
FOCUS = {
 1:"Stevig opstaan en zitten — de bouwsteen van zelfstandigheid.",2:"Rustig staan met steun, vertrouwen in je evenwicht.",
 3:"Soepel maken van heupen, schouders en nek.",4:"Reiken, draaien, bukken zoals in het echte leven.",
 5:"Benen en billen rustig versterken.",6:"Beetje balans, beetje kracht — alles even proeven.",
 7:"Rustdag: korte terugblik en hoe het ging.",8:"Opstaan met iets meer herhalingen, netjes uitgevoerd.",
 9:"Evenwicht met iets minder steun, gecontroleerd.",10:"Tillen en dragen zoals een boodschappentas.",
 11:"Onderrug en heupen losmaken.",12:"Beenkracht en romp stabiel houden.",13:"Kracht en balans samen, rustig tempo.",
 14:"Rustdag: voel je vooruitgang, vier de tweede week.",15:"Iets zwaardere beenoefeningen, meer herhalingen.",
 16:"Langer staan, minder vasthouden (steun binnen handbereik).",17:"Romp en houding versterken.",
 18:"Soepel blijven na de zwaardere dagen.",19:"Opstaan en stappen, functionele kracht.",
 20:"Balans en kracht uitdagender combineren.",21:"Rustdag: terugblik en bijstellen van je niveau indien gewenst.",
 22:"Kracht en balans vloeiend achter elkaar.",23:"Vertrouwen in je evenwicht, ook bij draaien.",
 24:"Alledaagse handelingen vlot en veilig.",25:"Sterke benen voor traplopen en opstaan.",
 26:"Soepel en ontspannen bewegen.",27:"Alles samen — merk hoeveel je kunt.",
 28:"Rustdag: terugblik op de hele maand.",29:"Je favoriete oefeningen nog eens, op je eigen niveau.",
 30:"Vieren: je hebt 30 dagen volgehouden. Vooruitblik naar de volgende ronde.",
}
def week_theme(day):
    if day <= 7:  return 1, "Wennen & vertrouwen"
    if day <= 14: return 2, "Consistentie & controle"
    if day <= 21: return 3, "Iets meer kracht/balans"
    if day <= 28: return 4, "Combineren & zelfvertrouwen"
    return 5, "Afronding"

# gewenste categorievolgorde per dagtype
DESIRED = {
 'Kracht basis':        ['Benen & opstaan','Dagelijkse kracht','Heupen & onderrug','Schouders & armen','Benen & opstaan'],
 'Balans basis':        ['Balans','Balans','Balans','Benen & opstaan','Core/stabiliteit'],
 'Mobiliteit':          ['Mobiliteit','Mobiliteit','Heupen & onderrug','Schouders & armen','Core/stabiliteit'],
 'Dagelijkse bewegingen':['Dagelijkse kracht','Dagelijkse kracht','Heupen & onderrug','Benen & opstaan','Schouders & armen'],
 'Combinatie':          ['Balans','Benen & opstaan','Schouders & armen','Heupen & onderrug','Core/stabiliteit','Dagelijkse kracht'],
 'Combinatie (licht)':  ['Balans','Benen & opstaan','Mobiliteit','Core/stabiliteit'],
 'Herstel':             ['Core/stabiliteit','Mobiliteit','Mobiliteit'],
}
cursor = defaultdict(int)
def pick(cat, used):
    pool = by_cat[cat]
    for _ in range(len(pool)):
        cid = pool[cursor[cat] % len(pool)]
        cursor[cat] += 1
        if cid not in used:
            return cid
    return None

days = []
for d in range(1, 31):
    dtype = SCHEDULE[d]
    wk, theme = week_theme(d)
    is_rest = dtype.startswith("Herstel")
    used = []
    for cat in DESIRED[dtype]:
        cid = pick(cat, used)
        if cid: used.append(cid)
    n = len(used)
    est = 4 if is_rest else max(5, min(10, round(n * 1.5)))
    days.append({
        "day": d, "week": wk, "week_theme": theme, "type": dtype,
        "focus": FOCUS[d], "is_rest": is_rest,
        "estimated_minutes": est, "exercise_ids": used,
    })

prog = {"version": 1, "generated": "2026-06-28", "total_days": 30, "days": days}
json.dump(prog, open("content/program.json", "w"), ensure_ascii=False, indent=2)

# korte sanity-rapportage
print("dagen:", len(days))
for d in days:
    assert all(any(x["id"]==i for x in exs) for i in d["exercise_ids"]), f"bad id day {d['day']}"
    if not d["is_rest"]:
        assert len(d["exercise_ids"]) >= 4, f"day {d['day']} <4 ex"
covered = set(i for d in days for i in d["exercise_ids"])
print("oefeningen gebruikt:", len(covered), "/", len(exs))
print("ongebruikt:", sorted(set(e['id'] for e in exs) - covered))
