"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { computeAggregates, activeDaysThisMonth } from "@/lib/progress";
import { getDay } from "@/lib/data";
import { BADGES } from "@/lib/badges";
import { COPY } from "@/lib/copy";
import { Screen } from "@/components/Screen";
import { Card, PageHeader, ProgressBar } from "@/components/ui";
import { CalendarStrip } from "@/components/CalendarStrip";
import { WeekProgress } from "@/components/WeekProgress";
import { cn } from "@/lib/cn";

export default function ProgressPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const onboarded = useApp((s) => s.profile.onboarded);
  const progress = useApp((s) => s.progress);
  const weeklyGoal = useApp((s) => s.settings.weeklyGoal);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) return null;

  const sessions = progress.sessions;
  const agg = computeAggregates(sessions);
  const monthActive = activeDaysThisMonth(sessions);

  const monthPrefix = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  })();
  const monthExercises = sessions
    .filter((s) => s.date.startsWith(monthPrefix))
    .reduce((sum, s) => sum + s.doneIds.length, 0);

  const day = getDay(progress.currentDay);
  const unlocked = new Set(progress.unlockedBadges);

  return (
    <Screen>
      <PageHeader title="Mijn voortgang" />

      <Card>
        <WeekProgress sessions={sessions} goal={weeklyGoal} />
      </Card>

      <Card className="mt-4 text-center">
        <p className="text-[1.15rem] font-semibold">
          {COPY.dayDone.usedMuscles(monthExercises)} deze maand.
        </p>
        <p className="text-text-muted mt-1">Mooi bezig, rustig aan zo.</p>
      </Card>

      <Card className="mt-4">
        <h2 className="font-bold text-[1.15rem] mb-3">Deze maand</h2>
        <ul className="space-y-1">
          <li>• {monthActive} dagen even bewogen</li>
          <li>• {agg.totalMinutes} minuten bewogen (totaal)</li>
          <li>• {agg.totalExercises} oefeningen gedaan (totaal)</li>
        </ul>
        <div className="mt-4">
          <CalendarStrip sessions={sessions} />
          <p className="text-text-muted text-[0.85rem] mt-2">
            Laatste twee weken · groen = bewogen, zacht = rustdag.
          </p>
        </div>
      </Card>

      {day && (
        <Card className="mt-4">
          <h2 className="font-bold text-[1.15rem] mb-1">Jouw programma</h2>
          <p className="text-text-muted mb-2">
            Dag {day.day} van 30 · Week {day.week} — {day.week_theme}
          </p>
          <ProgressBar value={day.day} max={30} />
        </Card>
      )}

      <h2 className="font-bold text-[1.25rem] mt-6 mb-3">Behaalde momenten</h2>
      <div className="grid grid-cols-1 gap-3">
        {BADGES.map((b) => {
          const earned = unlocked.has(b.id);
          return (
            <div
              key={b.id}
              className={cn(
                "rounded-xl border p-4 flex items-start gap-3",
                earned
                  ? "bg-surface border-primary"
                  : "bg-surface-2 border-border opacity-80",
              )}
            >
              <span aria-hidden className="text-3xl">
                {earned ? "🏅" : "🔒"}
              </span>
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-text-muted text-[0.95rem]">
                  {earned ? b.unlockCopy : b.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}
