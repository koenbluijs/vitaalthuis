#!/usr/bin/env python3
"""
WCAG 2.x contrast verification for the Vitaal Thuis colour system (Fase 4).
Run: python3 scripts/check-contrast.py
Exits non-zero if any text/UI pairing falls below its required minimum
(4.5:1 normal text, 3:1 large text / icons / borders that are the only cue).
Keep this in sync with docs/fase-4-designrichting-stijlgids.md when hexes change.
"""
import sys

PAIRS = [
    {
        "name": "body-tekst op achtergrond",
        "mode": "light",
        "fg_hex": "#2B2A26",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 4.5
    },
    {
        "name": "body-tekst op surface/kaart",
        "mode": "light",
        "fg_hex": "#2B2A26",
        "bg_hex": "#FFFFFF",
        "min_required_ratio": 4.5
    },
    {
        "name": "gedempte tekst op achtergrond",
        "mode": "light",
        "fg_hex": "#5C594F",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 4.5
    },
    {
        "name": "gedempte tekst op surface",
        "mode": "light",
        "fg_hex": "#5C594F",
        "bg_hex": "#FFFFFF",
        "min_required_ratio": 4.5
    },
    {
        "name": "tekst op primaire knop",
        "mode": "light",
        "fg_hex": "#FFFFFF",
        "bg_hex": "#3E6B52",
        "min_required_ratio": 4.5
    },
    {
        "name": "primair als tekst/icoon op achtergrond",
        "mode": "light",
        "fg_hex": "#2F5A43",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 4.5
    },
    {
        "name": "primair als tekst/icoon op surface",
        "mode": "light",
        "fg_hex": "#2F5A43",
        "bg_hex": "#FFFFFF",
        "min_required_ratio": 4.5
    },
    {
        "name": "soft border op achtergrond (decoratief, niet enige cue)",
        "mode": "light",
        "fg_hex": "#D9D2C4",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 1
    },
    {
        "name": "border-strong op achtergrond (invoerveld, enige cue)",
        "mode": "light",
        "fg_hex": "#8C8678",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "border-strong op surface (invoerveld, enige cue)",
        "mode": "light",
        "fg_hex": "#8C8678",
        "bg_hex": "#FFFFFF",
        "min_required_ratio": 3
    },
    {
        "name": "focus-ring op achtergrond",
        "mode": "light",
        "fg_hex": "#2F5A43",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "accent als tekst/icoon op achtergrond",
        "mode": "light",
        "fg_hex": "#9A4A2A",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 4.5
    },
    {
        "name": "tekst op accent-knop",
        "mode": "light",
        "fg_hex": "#FFFFFF",
        "bg_hex": "#B25A33",
        "min_required_ratio": 4.5
    },
    {
        "name": "info-tekst op info-vlak",
        "mode": "light",
        "fg_hex": "#1F4E5F",
        "bg_hex": "#E3EEF1",
        "min_required_ratio": 4.5
    },
    {
        "name": "info icoon/rand op achtergrond",
        "mode": "light",
        "fg_hex": "#2E6B80",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "caution-tekst op caution-vlak",
        "mode": "light",
        "fg_hex": "#6E4A12",
        "bg_hex": "#FBEFD6",
        "min_required_ratio": 4.5
    },
    {
        "name": "caution icoon/rand op achtergrond",
        "mode": "light",
        "fg_hex": "#8A5A12",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "stop-alert tekst op stop-vlak",
        "mode": "light",
        "fg_hex": "#8A2620",
        "bg_hex": "#FBE3E0",
        "min_required_ratio": 4.5
    },
    {
        "name": "tekst op stop-knop",
        "mode": "light",
        "fg_hex": "#FFFFFF",
        "bg_hex": "#A6342B",
        "min_required_ratio": 4.5
    },
    {
        "name": "stop icoon/rand op achtergrond",
        "mode": "light",
        "fg_hex": "#A6342B",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "success-tekst op success-vlak",
        "mode": "light",
        "fg_hex": "#2A5A33",
        "bg_hex": "#E2F0E4",
        "min_required_ratio": 4.5
    },
    {
        "name": "success icoon/rand op achtergrond",
        "mode": "light",
        "fg_hex": "#2F6B3D",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "streak-blaadje (primair) op achtergrond",
        "mode": "light",
        "fg_hex": "#2F5A43",
        "bg_hex": "#FAF6EF",
        "min_required_ratio": 3
    },
    {
        "name": "body-tekst op achtergrond",
        "mode": "dark",
        "fg_hex": "#ECE7DD",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 4.5
    },
    {
        "name": "body-tekst op surface/kaart",
        "mode": "dark",
        "fg_hex": "#ECE7DD",
        "bg_hex": "#26241F",
        "min_required_ratio": 4.5
    },
    {
        "name": "gedempte tekst op achtergrond",
        "mode": "dark",
        "fg_hex": "#B0A99C",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 4.5
    },
    {
        "name": "gedempte tekst op surface",
        "mode": "dark",
        "fg_hex": "#B0A99C",
        "bg_hex": "#26241F",
        "min_required_ratio": 4.5
    },
    {
        "name": "tekst op primaire knop",
        "mode": "dark",
        "fg_hex": "#10241A",
        "bg_hex": "#8FC2A4",
        "min_required_ratio": 4.5
    },
    {
        "name": "primair als tekst/icoon op achtergrond",
        "mode": "dark",
        "fg_hex": "#8FC2A4",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 4.5
    },
    {
        "name": "primair als tekst/icoon op surface",
        "mode": "dark",
        "fg_hex": "#8FC2A4",
        "bg_hex": "#26241F",
        "min_required_ratio": 4.5
    },
    {
        "name": "soft border op achtergrond (decoratief, niet enige cue)",
        "mode": "dark",
        "fg_hex": "#3A372F",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 1
    },
    {
        "name": "border-strong op achtergrond (invoerveld, enige cue)",
        "mode": "dark",
        "fg_hex": "#736E63",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    },
    {
        "name": "border-strong op surface (invoerveld, enige cue)",
        "mode": "dark",
        "fg_hex": "#736E63",
        "bg_hex": "#26241F",
        "min_required_ratio": 3
    },
    {
        "name": "focus-ring op achtergrond",
        "mode": "dark",
        "fg_hex": "#8FC2A4",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    },
    {
        "name": "accent als tekst/icoon op achtergrond",
        "mode": "dark",
        "fg_hex": "#E0996B",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 4.5
    },
    {
        "name": "tekst op accent-knop",
        "mode": "dark",
        "fg_hex": "#2A1408",
        "bg_hex": "#E0996B",
        "min_required_ratio": 4.5
    },
    {
        "name": "info-tekst op info-vlak",
        "mode": "dark",
        "fg_hex": "#A9D6E4",
        "bg_hex": "#15323B",
        "min_required_ratio": 4.5
    },
    {
        "name": "info icoon/rand op achtergrond",
        "mode": "dark",
        "fg_hex": "#7FC0D2",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    },
    {
        "name": "caution-tekst op caution-vlak",
        "mode": "dark",
        "fg_hex": "#F0CF8E",
        "bg_hex": "#3A2C0E",
        "min_required_ratio": 4.5
    },
    {
        "name": "caution icoon/rand op achtergrond",
        "mode": "dark",
        "fg_hex": "#E6B85A",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    },
    {
        "name": "stop-alert tekst op stop-vlak",
        "mode": "dark",
        "fg_hex": "#F2B3AB",
        "bg_hex": "#3A1512",
        "min_required_ratio": 4.5
    },
    {
        "name": "tekst op stop-knop",
        "mode": "dark",
        "fg_hex": "#2A0907",
        "bg_hex": "#E89189",
        "min_required_ratio": 4.5
    },
    {
        "name": "stop icoon/rand op achtergrond",
        "mode": "dark",
        "fg_hex": "#E89189",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    },
    {
        "name": "success-tekst op success-vlak",
        "mode": "dark",
        "fg_hex": "#A8D9B0",
        "bg_hex": "#13301A",
        "min_required_ratio": 4.5
    },
    {
        "name": "success icoon/rand op achtergrond",
        "mode": "dark",
        "fg_hex": "#7FC58C",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    },
    {
        "name": "streak-blaadje (primair) op achtergrond",
        "mode": "dark",
        "fg_hex": "#8FC2A4",
        "bg_hex": "#1B1A17",
        "min_required_ratio": 3
    }
]

def _lin(ch):
    ch = ch / 255.0
    return ch / 12.92 if ch <= 0.03928 else ((ch + 0.055) / 1.055) ** 2.4

def luminance(hexv):
    h = hexv.lstrip("#")
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)

def ratio(fg, bg):
    l1, l2 = luminance(fg), luminance(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)

def main():
    fails = 0
    print(f"{'mode':5} {'pair':44} {'fg':9} {'bg':9} {'req':>4} {'got':>6}  ok")
    print("-" * 92)
    for p in PAIRS:
        got = ratio(p["fg_hex"], p["bg_hex"])
        ok = got >= p["min_required_ratio"]
        if not ok:
            fails += 1
        print(f"{p['mode']:5} {p['name'][:44]:44} {p['fg_hex']:9} {p['bg_hex']:9} "
              f"{p['min_required_ratio']:>4} {got:>6.2f}  {'OK' if ok else 'FAIL'}")
    print("-" * 92)
    print(f"{len(PAIRS)} paren gecontroleerd, {fails} failures.")
    return 1 if fails else 0

if __name__ == "__main__":
    sys.exit(main())
