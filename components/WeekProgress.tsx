"use client";

import type { SessionRecord } from "@/lib/types";
import { activeDaysThisWeek, weeklyStreak, wasActiveToday } from "@/lib/progress";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/cn";

// Weekdoel + weekstreak: vergevend en zelfgekozen. Een paar keer per week telt al.
export function WeekProgress({
  sessions,
  goal,
}: {
  sessions: SessionRecord[];
  goal: number;
}) {
  const days = activeDaysThisWeek(sessions);
  const streak = weeklyStreak(sessions, goal);
  const reached = days >= goal;
  const today = wasActiveToday(sessions);
  const filled = Math.min(days, goal);
  const extra = Math.max(0, days - goal);

  return (
    <div>
      <div className="flex items-center gap-2 text-[1.05rem]">
        <span aria-hidden className="text-2xl">
          🌿
        </span>
        <span className="font-semibold">
          {reached ? COPY.week.reached : COPY.week.label(days, goal)}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2" aria-hidden>
        {Array.from({ length: goal }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-5 h-5 rounded-full border-2",
              i < filled ? "bg-primary border-primary" : "border-border-strong",
            )}
          />
        ))}
        {extra > 0 && (
          <span className="text-text-muted text-[0.95rem] font-medium">+{extra}</span>
        )}
      </div>

      {streak > 0 && (
        <p className="mt-2 text-text-muted text-[0.95rem]">{COPY.week.streak(streak)}</p>
      )}
      {today && !reached && (
        <p className="mt-1 text-text-muted text-[0.95rem]">{COPY.week.todayActive}</p>
      )}
    </div>
  );
}
