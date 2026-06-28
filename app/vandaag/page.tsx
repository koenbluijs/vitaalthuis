"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { getDay, effectiveDayExercises } from "@/lib/data";
import {
  hasFinishedToday,
  wasActiveToday,
  activeInLastDays,
  dateStr,
} from "@/lib/progress";
import { formatMinutes } from "@/lib/levels";
import { track } from "@/lib/analytics";
import { COPY } from "@/lib/copy";
import { SAFETY } from "@/lib/safety";
import { Screen } from "@/components/Screen";
import { Button, ButtonLink, Card, Pill } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";
import { InstallHint } from "@/components/InstallHint";
import { WeekProgress } from "@/components/WeekProgress";
import { cn } from "@/lib/cn";

export default function TodayPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const onboarded = useApp((s) => s.profile.onboarded);
  const level = useApp((s) => s.profile.level);
  const avoid = useApp((s) => s.profile.avoid);
  const anchor = useApp((s) => s.settings.habitAnchor);
  const weeklyGoal = useApp((s) => s.settings.weeklyGoal);
  const progress = useApp((s) => s.progress);
  const startDay = useApp((s) => s.startDay);
  const confirmRest = useApp((s) => s.confirmRest);
  const finishDay = useApp((s) => s.finishDay);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) return null;

  const day = getDay(progress.currentDay);
  if (!day) return null;

  const finishedToday = hasFinishedToday(progress.sessions);
  const activeToday = wasActiveToday(progress.sessions);
  const exercises = effectiveDayExercises(day, avoid);

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

  // Welke oefeningen van vandaag zijn al gedaan (voor de afvink-status in de lijst).
  const todayStr = dateStr();
  const todaySession = progress.sessions.find(
    (s) => s.date === todayStr && s.day === day.day,
  );
  const doneIds = new Set<string>(
    progress.active?.day === day.day
      ? progress.active.doneIds
      : todaySession?.doneIds ?? [],
  );
  const firstUndone = exercises.findIndex((e) => !doneIds.has(e.id));
  const allDone = exercises.length > 0 && firstUndone === -1;

  function trackStart() {
    if (progress.sessions.length === 0) void track("first_session_started", { day: day!.day });
    else void track("session_started", { day: day!.day });
    if (showWelcomeBack) void track("missed_day_returned", { day: day!.day });
  }

  function startSession() {
    trackStart();
    startDay(day!.day);
    router.push("/vandaag/sessie");
  }

  function openExercise(i: number) {
    trackStart();
    startDay(day!.day);
    router.push(`/vandaag/sessie?i=${i}`);
  }

  return (
    <Screen>
      <InstallHint />
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

      {/* Weekdoel + weekstreak, vergevend en zelfgekozen */}
      <div className="mb-4">
        <WeekProgress sessions={progress.sessions} goal={weeklyGoal} />
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
            <Button
              full
              onClick={() => {
                void track("rest_confirmed", { day: day.day });
                confirmRest(day.day);
              }}
            >
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
        <Card className="p-0 overflow-hidden">
          <div className="p-5 pb-3">
            <p className="text-[1.15rem] font-semibold">{day.focus}</p>
            <p className="mt-1 text-text-muted">
              {exercises.length} oefeningen · {formatMinutes(exercises.length, level)} · niveau{" "}
              {level}
            </p>
          </div>

          <h2 className="px-5 text-[1.15rem] font-bold">Vandaag doe je:</h2>
          <ol className="p-5 pt-3 space-y-2.5">
            {exercises.map((e, i) => {
              const done = doneIds.has(e.id);
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => openExercise(i)}
                    className={cn(
                      "w-full text-left flex items-start gap-3 rounded-xl p-3.5 min-h-[64px] border-2 transition-colors focus-visible:outline focus-visible:outline-3",
                      done
                        ? "bg-success-surface border-primary"
                        : "bg-surface-2 border-transparent hover:bg-surface",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "flex-shrink-0 grid place-items-center w-9 h-9 rounded-full font-bold text-[1.1rem]",
                        done
                          ? "bg-primary text-on-primary"
                          : "bg-surface text-primary-strong border-2 border-primary",
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className="min-w-0 pt-0.5 flex-1">
                      <span className="block font-semibold text-[1.1rem] leading-snug">
                        {e.name}
                      </span>
                      <span
                        className={cn(
                          "block text-[0.95rem] leading-snug mt-0.5",
                          done ? "text-primary-strong font-medium" : "text-text-muted",
                        )}
                      >
                        {done ? "✓ Gedaan — tik om te herhalen" : e.short_explanation}
                      </span>
                    </span>
                    <span aria-hidden className="text-text-muted text-2xl leading-none pt-1">
                      ›
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="p-5 pt-0 space-y-2">
            {allDone ? (
              <Button full size="lg" onClick={() => finishDay(day.day)}>
                Dag afronden
              </Button>
            ) : (
              <Button
                full
                size="lg"
                onClick={() => openExercise(firstUndone === -1 ? 0 : firstUndone)}
              >
                {doneIds.size > 0
                  ? "Ga verder met de volgende"
                  : anchor
                    ? COPY.dayStart.startWithAnchor(anchor)
                    : COPY.dayStart.start}
              </Button>
            )}
            {doneIds.size > 0 && !allDone && (
              <p className="text-center text-text-muted text-[0.9rem]">
                {doneIds.size} van {exercises.length} gedaan
              </p>
            )}
          </div>
        </Card>
      )}

      <SafetyAlert variant="info" className="mt-5">
        {SAFETY.sessionReminder}
      </SafetyAlert>
    </Screen>
  );
}
