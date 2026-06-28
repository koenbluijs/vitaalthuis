#!/usr/bin/env python3
"""Verrijkt content/exercises.json met handmatig gecureerde velden:
 - motion: bewegingspatroon voor de oefenillustratie (10 patronen)
 - tags:   voor het filteren op vermeden bewegingen (sluit aan op onboarding-opties)
Idempotent: overschrijft beide velden steeds opnieuw."""
import json

seed = json.load(open("content/exercises.json"))

MOTION = {
    "kuiten-heffen": "heel-raise",
    "sit-to-stand-met-pauze": "sit-to-stand",
    "opstaan-uit-stoel": "sit-to-stand",
    "step-up-traptrede": "balance",
    "gecontroleerd-zakken-uit-stand": "sit-to-stand",
    "zittend-knie-strekken": "seated",
    "balans-met-stoelsteun-staan": "balance",
    "eenbeenstand-met-steun": "balance",
    "hak-teen-lopen-tandem": "balance",
    "marcheren-op-de-plek": "balance",
    "zijwaarts-stappen": "balance",
    "bekkenkanteling": "floor",
    "bilspanning-glute-squeeze": "stand",
    "heupscharnier-hip-hinge": "hinge",
    "staande-heup-abductie": "balance",
    "staande-milde-rugextensie": "stand",
    "arm-cirkels": "arm",
    "borst-openen-tegen-muur": "wall",
    "deurpost-borststretch": "wall",
    "handdoek-row": "arm",
    "muur-opdrukken": "wall",
    "wall-angels-aangepast": "wall",
    "zijwaartse-armheffing": "arm",
    "ademhaling-houding-reset": "stand",
    "bird-dog-aangepast": "floor",
    "tafel-plank": "wall",
    "zittende-march": "seated",
    "boodschappentas-carry": "carry",
    "functioneel-bukken-en-reiken": "hinge",
    "iets-op-schap-hoogte-wegzetten": "arm",
    "iets-veilig-van-de-grond-tillen": "sit-to-stand",
    "enkels-losdraaien-en-pompen": "seated",
    "knie-heffen-hoog": "balance",
    "nek-rustig-draaien": "stand",
    "schouderrollen": "arm",
    "zittende-rompdraai": "seated",
}

# tags sluiten aan op onboarding AVOID_OPTIONS: grond-liggen / diep-bukken / een-been / knielen
TAGS = {
    "bekkenkanteling": ["grond-liggen"],
    "bird-dog-aangepast": ["grond-liggen"],
    "heupscharnier-hip-hinge": ["diep-bukken"],
    "functioneel-bukken-en-reiken": ["diep-bukken"],
    "iets-veilig-van-de-grond-tillen": ["diep-bukken"],
    "eenbeenstand-met-steun": ["een-been"],
    "staande-heup-abductie": ["een-been"],
}

ids = {e["id"] for e in seed["exercises"]}
missing = set(MOTION) - ids
assert not missing, f"onbekende ids in MOTION: {missing}"
for e in seed["exercises"]:
    assert e["id"] in MOTION, f"geen motion voor {e['id']}"
    e["motion"] = MOTION[e["id"]]
    e["tags"] = TAGS.get(e["id"], [])

json.dump(seed, open("content/exercises.json", "w"), ensure_ascii=False, indent=2)
from collections import Counter
print("MOTION-verdeling:", dict(Counter(e["motion"] for e in seed["exercises"])))
print("Getagd:", {e["id"]: e["tags"] for e in seed["exercises"] if e["tags"]})
