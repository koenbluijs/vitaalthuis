"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { getDay, effectiveDayExercises } from "@/lib/data";
import { COPY, pick } from "@/lib/copy";
import { SAFETY } from "@/lib/safety";
import { Screen } from "@/components/Screen";
import { Button, ButtonLink } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";
import { ExerciseCard } from "@/components/ExerciseCard";

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
        <div className="space-y-3">
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
        onToggleDone={() => toggleExercise(day.day, ex.id)}
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
