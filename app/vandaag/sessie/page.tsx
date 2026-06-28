"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { getDay, effectiveDayExercises } from "@/lib/data";
import { COPY, pick } from "@/lib/copy";
import { SAFETY } from "@/lib/safety";
import { LEVELS } from "@/lib/levels";
import { track } from "@/lib/analytics";
import { Screen } from "@/components/Screen";
import { Button, ButtonLink } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";
import { ExerciseCard } from "@/components/ExerciseCard";
import type { Level } from "@/lib/types";

export default function SessionPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const onboarded = useApp((s) => s.profile.onboarded);
  const level = useApp((s) => s.profile.level);
  const avoid = useApp((s) => s.profile.avoid);
  const active = useApp((s) => s.progress.active);
  const toggleExercise = useApp((s) => s.toggleExercise);
  const finishDay = useApp((s) => s.finishDay);

  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [finalCount, setFinalCount] = useState(0);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/");
    else if (hydrated && !active && !done) router.replace("/vandaag");
  }, [hydrated, onboarded, active, done, router]);

  // Start bij de oefening die vanaf het overzicht is aangetikt (?i=).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("i");
    const n = p ? parseInt(p, 10) : NaN;
    if (!Number.isNaN(n) && n > 0) setIdx(n);
  }, []);

  // Bij elke nieuwe oefening terug naar de bovenkant (fix: bleef halverwege staan).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [idx]);

  if (!hydrated || !onboarded) return null;
  if (!active && !done) return null;

  const day = active ? getDay(active.day) : null;
  const exercises = day ? effectiveDayExercises(day, avoid) : [];

  function finish() {
    if (!active) return;
    setFinalCount(active.doneIds.length);
    void track("session_completed", {
      day: active.day,
      done: active.doneIds.length,
      total: exercises.length,
    });
    void track("day_completed", { day: active.day });
    finishDay(active.day);
    setDone(true);
  }

  if (done) {
    const allDone = day ? finalCount >= exercises.length : false;
    return (
      <Screen className="flex flex-col">
        <div className="flex-1 flex flex-col justify-center text-center py-8 vt-rise">
          <div aria-hidden className="text-6xl mb-3">🌿</div>
          <h1 className="text-[1.9rem] font-bold leading-tight">{COPY.dayDone.title}</h1>
          <p className="mt-3 text-[1.15rem]">
            {allDone ? COPY.dayDone.body : COPY.dayDone.bodyPartial}
          </p>
          {finalCount > 0 && (
            <p className="mt-3 text-text-muted">{COPY.dayDone.usedMuscles(finalCount)}</p>
          )}
        </div>

        <SessionFeedback />

        <div className="space-y-3 mt-6">
          <ButtonLink href="/voortgang" full>
            {COPY.dayDone.toProgress}
          </ButtonLink>
          <ButtonLink href="/vandaag" variant="secondary" full>
            {COPY.dayDone.back}
          </ButtonLink>
        </div>
      </Screen>
    );
  }

  if (!day || !active) return null;

  const safeIdx = Math.min(Math.max(0, idx), Math.max(0, exercises.length - 1));
  const ex = exercises[safeIdx];
  if (!ex) return null;
  const isLast = safeIdx >= exercises.length - 1;
  const doneThis = active.doneIds.includes(ex.id);

  return (
    <Screen>
      <div className="flex items-center justify-between mb-3">
        <ButtonLink href="/vandaag" variant="tertiary" size="md">
          ← Terug naar overzicht
        </ButtonLink>
      </div>

      <ExerciseCard
        key={ex.id}
        exercise={ex}
        level={level}
        done={doneThis}
        onToggleDone={() => {
          if (!doneThis) void track("exercise_completed", { id: ex.id, motion: ex.motion });
          toggleExercise(day.day, ex.id);
        }}
        index={safeIdx + 1}
        total={exercises.length}
      />

      {doneThis && (
        <p className="text-center text-on-success-surface bg-success-surface rounded-xl p-2 mt-3">
          {pick(COPY.exerciseDone, safeIdx)}
        </p>
      )}

      <div className="flex gap-3 mt-4">
        {safeIdx > 0 && (
          <Button
            variant="secondary"
            onClick={() => setIdx(safeIdx - 1)}
            className="flex-1"
          >
            ← Vorige
          </Button>
        )}
        {isLast ? (
          <Button onClick={finish} className="flex-1">
            Dag afronden
          </Button>
        ) : (
          <Button onClick={() => setIdx(safeIdx + 1)} className="flex-1">
            {COPY.exercise.next} →
          </Button>
        )}
      </div>

      <p className="mt-3 text-center">
        <ButtonLink href="/vandaag" variant="tertiary" size="md">
          {COPY.exercise.notWell}
        </ButtonLink>
      </p>

      <SafetyAlert variant="info" className="mt-4">
        {SAFETY.sessionReminder}
      </SafetyAlert>
    </Screen>
  );
}

function SessionFeedback() {
  const level = useApp((s) => s.profile.level);
  const setLevel = useApp((s) => s.setLevel);
  const [choice, setChoice] = useState<null | "makkelijk" | "goed" | "zwaar" | "pijn">(null);
  const [applied, setApplied] = useState<Level | null>(null);

  const order = LEVELS.map((l) => l.id);
  const idx = order.indexOf(level);
  const up = idx < order.length - 1 ? order[idx + 1] : null;
  const down = idx > 0 ? order[idx - 1] : null;

  function choose(v: "makkelijk" | "goed" | "zwaar" | "pijn") {
    setChoice(v);
    void track("session_feedback", { value: v, level });
    if (v === "pijn") void track("safety_stop_clicked", { from: "session_feedback" });
  }

  function applyLevel(next: Level) {
    setLevel(next);
    setApplied(next);
    void track("level_selected", { level: next, via: "feedback" });
  }

  if (applied) {
    return (
      <div className="mt-6 rounded-xl bg-success-surface text-on-success-surface p-4 text-center">
        Top — vanaf nu staat je niveau op <strong>{applied}</strong>. Je kunt dit altijd in
        Instellingen wijzigen.
      </div>
    );
  }

  if (choice === null) {
    return (
      <div className="mt-6">
        <h2 className="text-center font-bold text-[1.1rem] mb-3">Hoe ging het vandaag?</h2>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["goed", "Goed"],
              ["makkelijk", "Te makkelijk"],
              ["zwaar", "Te zwaar"],
              ["pijn", "Ik had pijn"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => choose(v)}
              className="rounded-xl border-2 border-border-strong bg-surface min-h-[64px] px-3 font-semibold focus-visible:outline focus-visible:outline-3 hover:bg-surface-2"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (choice === "pijn") {
    return (
      <div className="mt-6">
        <SafetyAlert variant="stop" title="Luister naar je lichaam">
          Stop met oefeningen die pijn doen. Overleg bij aanhoudende of hevige pijn — en bij
          pijn op de borst, duizeligheid of kortademigheid — met je (huis)arts. {SAFETY.emergency}
        </SafetyAlert>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl bg-success-surface text-on-success-surface p-4 text-center">
      {choice === "goed" && <p>Fijn dat het goed ging. Zo houden we het, rustig en vast.</p>}
      {choice === "makkelijk" &&
        (up ? (
          <>
            <p className="mb-3">Mooi dat het lekker ging!</p>
            <Button onClick={() => applyLevel(up)}>Probeer volgende keer: {up}</Button>
          </>
        ) : (
          <p>Je zit al op het hoogste niveau. Gebruik gerust de &quot;moeilijker&quot;-varianten.</p>
        ))}
      {choice === "zwaar" &&
        (down ? (
          <>
            <p className="mb-3">Geen probleem, we mogen het rustiger doen.</p>
            <Button onClick={() => applyLevel(down)}>Volgende keer rustiger: {down}</Button>
          </>
        ) : (
          <p>Je zit al op het rustigste niveau. Gebruik gerust de &quot;makkelijker&quot;-varianten.</p>
        ))}
    </div>
  );
}
