"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { Screen } from "@/components/Screen";
import { Button, OptionButton } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";
import { COPY } from "@/lib/copy";
import {
  ACTIVITY_OPTIONS,
  STAND_OPTIONS,
  FOCUS_OPTIONS,
  AVOID_OPTIONS,
  AGE_OPTIONS,
  HABIT_ANCHORS,
  suggestLevel,
  shouldSuggestDoctor,
  type OnboardingAnswers,
} from "@/lib/onboarding";
import { LEVELS } from "@/lib/levels";
import { track } from "@/lib/analytics";
import type { Level } from "@/lib/types";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useApp((s) => s.completeOnboarding);
  const setLevel = useApp((s) => s.setLevel);
  const updateSettings = useApp((s) => s.updateSettings);

  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState("");
  const [a, setA] = useState<OnboardingAnswers>({ avoid: [] });
  const [anchor, setAnchor] = useState<string>("");
  const [chosenLevel, setChosenLevel] = useState<Level | null>(null);

  const next = () => setStep((s) => Math.min(7, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  function toggleAvoid(value: string) {
    setA((prev) => {
      if (value === "geen") return { ...prev, avoid: ["geen"] };
      const withoutGeen = prev.avoid.filter((x) => x !== "geen");
      const has = withoutGeen.includes(value);
      return {
        ...prev,
        avoid: has ? withoutGeen.filter((x) => x !== value) : [...withoutGeen, value],
      };
    });
  }

  function finish(level: Level) {
    completeOnboarding({
      name: name.trim(),
      ageBand: a.ageBand,
      activity: a.activity,
      focus: a.focus,
      canStandUp: a.canStandUp,
      avoid: a.avoid,
    });
    setLevel(level);
    updateSettings({
      habitAnchor: anchor && anchor !== "een eigen moment" ? anchor : "",
    });
    void track("level_selected", { level });
    void track("onboarding_completed", { level, ageBand: a.ageBand, focus: a.focus });
    router.replace("/vandaag");
  }

  const suggested = suggestLevel(a);

  const counter =
    step === 0
      ? "Even kennismaken"
      : step <= 5
        ? `Vraag ${step} van 5`
        : step === 6
          ? "Bijna klaar"
          : "Je startpunt";

  return (
    <Screen>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-text-muted font-medium">{counter}</p>
        {step > 0 && step < 7 && (
          <button
            type="button"
            onClick={back}
            className="text-primary-strong underline underline-offset-2 min-h-[44px] px-2"
          >
            {COPY.generic.back}
          </button>
        )}
      </div>

      {step === 0 && (
        <div className="vt-rise">
          <h1 className="text-[1.6rem] font-bold leading-tight mb-1">
            Welkom! Hoe mag ik je noemen?
          </h1>
          <p className="text-text-muted mb-4">
            Je voornaam is genoeg. Zo maken we het wat persoonlijker. Mag ook leeg.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Je voornaam"
            autoComplete="given-name"
            className="w-full rounded-xl border-2 border-border-strong bg-surface min-h-[60px] px-4 text-[1.15rem] focus-visible:outline focus-visible:outline-3"
          />
          <Button full className="mt-5" onClick={next}>
            {COPY.generic.next}
          </Button>
        </div>
      )}

      {step === 1 && (
        <Question title="Hoeveel beweeg je op dit moment?">
          {ACTIVITY_OPTIONS.map((o) => (
            <OptionButton
              key={o.value}
              label={o.label}
              hint={o.hint}
              selected={a.activity === o.value}
              onClick={() => {
                setA((p) => ({ ...p, activity: o.value }));
                next();
              }}
            />
          ))}
        </Question>
      )}

      {step === 2 && (
        <Question title="Kun je zelfstandig opstaan uit een stoel?">
          {STAND_OPTIONS.map((o) => (
            <OptionButton
              key={o.value}
              label={o.label}
              selected={a.canStandUp === o.value}
              onClick={() => {
                setA((p) => ({ ...p, canStandUp: o.value }));
                next();
              }}
            />
          ))}
        </Question>
      )}

      {step === 3 && (
        <Question title="Waar wil je vooral aan werken?">
          {FOCUS_OPTIONS.map((o) => (
            <OptionButton
              key={o.value}
              label={o.label}
              hint={o.hint}
              selected={a.focus === o.value}
              onClick={() => {
                setA((p) => ({ ...p, focus: o.value }));
                next();
              }}
            />
          ))}
        </Question>
      )}

      {step === 4 && (
        <Question
          title="Zijn er bewegingen die je liever vermijdt?"
          subtitle="Je mag er meerdere kiezen. We houden er rekening mee."
        >
          {AVOID_OPTIONS.map((o) => (
            <OptionButton
              key={o.value}
              label={o.label}
              selected={a.avoid.includes(o.value)}
              onClick={() => toggleAvoid(o.value)}
            />
          ))}
          <Button full className="mt-2" onClick={next}>
            {COPY.generic.next}
          </Button>
        </Question>
      )}

      {step === 5 && (
        <Question title="In welke leeftijdsgroep zit je?">
          {AGE_OPTIONS.map((o) => (
            <OptionButton
              key={o.value}
              label={o.label}
              selected={a.ageBand === o.value}
              onClick={() => {
                setA((p) => ({ ...p, ageBand: o.value }));
                next();
              }}
            />
          ))}
        </Question>
      )}

      {step === 6 && (
        <Question
          title="Wanneer past jouw momentje het beste?"
          subtitle="Koppel het aan iets wat je tóch al doet. Dan onthoud je het makkelijker — en de app spreekt je dan zo aan. Mag je overslaan."
        >
          {HABIT_ANCHORS.map((h) => (
            <OptionButton
              key={h}
              label={h.charAt(0).toUpperCase() + h.slice(1)}
              selected={anchor === h}
              onClick={() => setAnchor(h)}
            />
          ))}
          <p className="text-text-muted text-[0.95rem] mt-1">
            Een herinnering instellen kan straks in Instellingen.
          </p>
          <Button full className="mt-3" onClick={next}>
            {COPY.generic.next}
          </Button>
        </Question>
      )}

      {step === 7 && (
        <div className="vt-rise">
          <h1 className="text-[1.6rem] font-bold leading-tight mb-1">
            {COPY.level.suggested(suggested)}
          </h1>
          <p className="text-text-muted mb-4">
            Je kunt dit altijd aanpassen. Kies wat goed voelt.
          </p>

          {shouldSuggestDoctor(a) && (
            <SafetyAlert variant="info" className="mb-4">
              Je gaf aan dat opstaan uit een stoel moeilijk gaat. Overleg even met je
              (huis)arts of fysiotherapeut voordat je begint. Je kunt de oefeningen rustig
              zittend of met stevige steun doen.
            </SafetyAlert>
          )}

          <div className="space-y-3">
            {LEVELS.map((l) => {
              const isSel = (chosenLevel ?? suggested) === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setChosenLevel(l.id)}
                  aria-pressed={isSel}
                  className={
                    "w-full text-left rounded-2xl border-2 p-5 focus-visible:outline focus-visible:outline-3 " +
                    (isSel
                      ? "border-primary bg-success-surface"
                      : "border-border-strong bg-surface")
                  }
                >
                  <span className="block font-bold text-[1.15rem]">{l.id}</span>
                  <span className="block text-text-muted">{l.tagline}</span>
                  <span className="block mt-1 text-[0.98rem]">{l.description}</span>
                </button>
              );
            })}
          </div>

          <Button full className="mt-5" onClick={() => finish(chosenLevel ?? suggested)}>
            Beginnen met {chosenLevel ?? suggested}
          </Button>
        </div>
      )}
    </Screen>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="vt-rise">
      <h1 className="text-[1.5rem] font-bold leading-tight mb-1">{title}</h1>
      {subtitle && <p className="text-text-muted mb-4">{subtitle}</p>}
      <div className={subtitle ? "space-y-3" : "space-y-3 mt-4"}>{children}</div>
    </div>
  );
}
