"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { getDay, dayExercises } from "@/lib/data";
import {
  computeStreak,
  hasFinishedToday,
  wasActiveToday,
  activeInLastDays,
  dateStr,
} from "@/lib/progress";
import { COPY } from "@/lib/copy";
import { SAFETY } from "@/lib/safety";
import { Screen } from "@/components/Screen";
import { Button, ButtonLink, Card, Pill } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";

export default function TodayPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const onboarded = useApp((s) => s.profile.onboarded);
  const level = useApp((s) => s.profile.level);
  const anchor = useApp((s) => s.settings.habitAnchor);
  const progress = useApp((s) => s.progress);
  const startDay = useApp((s) => s.startDay);
  const confirmRest = useApp((s) => s.confirmRest);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) return null;

  const day = getDay(progress.currentDay);
  if (!day) return null;

  const streak = computeStreak(progress.sessions);
  const finishedToday = hasFinishedToday(progress.sessions);
  const activeToday = wasActiveToday(progress.sessions);
  const exercises = dayExercises(day);

  // Vergevende "welkom terug" als er een gat zit (niet actief gisteren of vandaag).
  const last7 = activeInLastDays(progress.sessions, 7);
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return dateStr(d);
  })();
  const activeYesterday = progress.sessions.some(
    (s) => s.date === yesterday && (s.isRest || s.doneIds.length > 0),
  );
  const showWelcomeBack =
    progress.sessions.length > 0 && !activeToday && !activeYesterday && last7 === 0;

  function startSession() {
    startDay(day!.day);
    router.push("/vandaag/sessie");
  }

  return (
    <Screen>
      <header className="mb-5">
        <p className="text-text-muted">{COPY.dayStart.greeting}</p>
        <h1 className="text-[1.8rem] font-bold leading-tight">
          {COPY.dayStart.todayPrefix}: dag {day.day} van 30
        </h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <Pill>Week {day.week} · {day.week_theme}</Pill>
          <Pill>{day.type}</Pill>
        </div>
      </header>

      {/* Streak, rustig en zelf-referentieel */}
      <div className="mb-4 flex items-center gap-2 text-[1.05rem]">
        <span aria-hidden className="text-2xl">🌿</span>
        <span className="font-semibold">
          {streak === 0 ? COPY.streak.zero : COPY.streak.label(streak)}
        </span>
      </div>

      {showWelcomeBack && (
        <SafetyAlert variant="info" title={COPY.missedDay.title} className="mb-4">
          {COPY.missedDay.body}
        </SafetyAlert>
      )}

      {finishedToday ? (
        <Card className="text-center">
          <div aria-hidden className="text-4xl mb-2">🌿</div>
          <p className="text-[1.2rem] font-semibold">{COPY.dayStart.alreadyDone}</p>
          <p className="text-text-muted mt-1">
            Morgen staat dag {day.day} weer voor je klaar. Rustig aan.
          </p>
          <div className="mt-4 space-y-3">
            <ButtonLink href="/voortgang" variant="secondary" full>
              {COPY.dayDone.toProgress}
            </ButtonLink>
            <Button variant="tertiary" full onClick={startSession}>
              {COPY.dayStart.extra}
            </Button>
          </div>
        </Card>
      ) : day.is_rest ? (
        <Card>
          <h2 className="text-[1.3rem] font-bold mb-1">{COPY.rest.title}</h2>
          <p className="text-text-muted mb-4">{COPY.rest.body}</p>
          <div className="space-y-3">
            <Button full onClick={() => confirmRest(day.day)}>
              {COPY.rest.confirm}
            </Button>
            {exercises.length > 0 && (
              <Button variant="secondary" full onClick={startSession}>
                {COPY.rest.lightOption}
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Card>
          <p className="text-text-muted">{day.focus}</p>
          <p className="mt-2 text-[1.1rem]">
            <span className="font-semibold">{exercises.length} oefeningen</span> ·{" "}
            {COPY.dayStart.minutes(day.estimated_minutes)}
          </p>
          <ul className="mt-3 space-y-1 text-text-muted">
            {exercises.map((e) => (
              <li key={e.id} className="flex gap-2">
                <span aria-hidden>•</span>
                <span>{e.name}</span>
              </li>
            ))}
          </ul>
          <Button full className="mt-5" onClick={startSession}>
            {anchor ? COPY.dayStart.startWithAnchor(anchor) : COPY.dayStart.start}
          </Button>
          <p className="mt-2 text-center text-text-muted text-[0.9rem]">
            Niveau: {level}
          </p>
        </Card>
      )}

      <SafetyAlert variant="info" className="mt-5">
        {SAFETY.sessionReminder}
      </SafetyAlert>
    </Screen>
  );
}
