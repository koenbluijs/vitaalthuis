"use client";

import { useState } from "react";
import type { Exercise, Level } from "@/lib/types";
import { dosageFor } from "@/lib/levels";
import { COPY } from "@/lib/copy";
import { Button } from "./ui";
import { SafetyAlert } from "./SafetyAlert";
import { cn } from "@/lib/cn";

export function MediaPlaceholder({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-surface-2 border border-border aspect-video grid place-items-center text-center p-4">
      <div>
        <div aria-hidden className="text-3xl mb-1">
          🎬
        </div>
        <p className="text-text-muted text-[0.95rem]">{text}</p>
      </div>
    </div>
  );
}

export function ExerciseCard({
  exercise,
  level,
  done,
  onToggleDone,
  index,
  total,
}: {
  exercise: Exercise;
  level: Level;
  done: boolean;
  onToggleDone: () => void;
  index: number;
  total: number;
}) {
  const [showEasier, setShowEasier] = useState(false);
  const [showHarder, setShowHarder] = useState(false);

  return (
    <article className="rounded-2xl bg-surface border border-border shadow-card overflow-hidden">
      <div className="p-5 space-y-4">
        <p className="text-text-muted text-[0.95rem] font-medium">
          {COPY.exercise.progress(index, total)} · {exercise.category}
        </p>
        <h2 className="text-[1.5rem] font-bold leading-tight">{exercise.name}</h2>

        <MediaPlaceholder text={exercise.media_placeholder} />

        <p className="text-[1.05rem]">{exercise.short_explanation}</p>

        <div>
          <h3 className="font-semibold text-text-muted text-[0.95rem] uppercase tracking-wide">
            {COPY.exercise.howMuch}
          </h3>
          <p className="text-[1.1rem] font-semibold">{dosageFor(exercise.dosage, level)}</p>
        </div>

        <div>
          <h3 className="font-semibold text-text-muted text-[0.95rem] uppercase tracking-wide mb-1">
            {COPY.exercise.how}
          </h3>
          <ol className="list-decimal pl-5 space-y-1">
            {exercise.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-text-muted text-[0.95rem] uppercase tracking-wide mb-1">
            {COPY.exercise.why}
          </h3>
          <p>{exercise.why_useful}</p>
          <p className="text-text-muted mt-1 text-[0.95rem]">In het echt: {exercise.adl}</p>
        </div>

        <SafetyAlert variant="caution" title={COPY.exercise.safety}>
          {exercise.safety_tip}
          {exercise.cautions ? <span className="block mt-1">{exercise.cautions}</span> : null}
        </SafetyAlert>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowEasier((v) => !v)}
            aria-expanded={showEasier}
            className="flex-1 rounded-xl border-2 border-border-strong bg-surface min-h-[48px] px-3 font-semibold focus-visible:outline focus-visible:outline-3"
          >
            🟢 {COPY.exercise.easier}
          </button>
          <button
            type="button"
            onClick={() => setShowHarder((v) => !v)}
            aria-expanded={showHarder}
            className="flex-1 rounded-xl border-2 border-border-strong bg-surface min-h-[48px] px-3 font-semibold focus-visible:outline focus-visible:outline-3"
          >
            🔵 {COPY.exercise.harder}
          </button>
        </div>
        {showEasier && (
          <p className="rounded-xl bg-success-surface text-on-success-surface p-3">
            {exercise.easier}
          </p>
        )}
        {showHarder && (
          <p className="rounded-xl bg-info-surface text-on-info-surface p-3">
            {exercise.harder}
          </p>
        )}
      </div>

      <div className="p-5 border-t border-border bg-surface-2">
        <Button
          full
          variant={done ? "secondary" : "primary"}
          onClick={onToggleDone}
          className={cn(done && "border-primary")}
        >
          {done ? `✓ ${COPY.exercise.doneAgain}` : COPY.exercise.done}
        </Button>
      </div>
    </article>
  );
}
