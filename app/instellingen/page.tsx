"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { LEVELS } from "@/lib/levels";
import { HABIT_ANCHORS } from "@/lib/onboarding";
import { COPY } from "@/lib/copy";
import { SAFETY } from "@/lib/safety";
import { Screen } from "@/components/Screen";
import { Button, Card, PageHeader } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";
import { cn } from "@/lib/cn";
import type { Level } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useSyncStore } from "@/lib/syncStore";
import { saveWithEmail, signInWithEmail, signOut } from "@/lib/sync";
import { track } from "@/lib/analytics";

export default function SettingsPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const onboarded = useApp((s) => s.profile.onboarded);
  const level = useApp((s) => s.profile.level);
  const settings = useApp((s) => s.settings);
  const setLevel = useApp((s) => s.setLevel);
  const updateSettings = useApp((s) => s.updateSettings);
  const resetAll = useApp((s) => s.resetAll);

  const [confirmReset, setConfirmReset] = useState(false);

  function setReminder(on: boolean) {
    updateSettings({ reminderEnabled: on });
    if (on) {
      void track("reminder_set", {
        time: settings.reminderTime,
        anchor: settings.habitAnchor,
      });
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    }
  }

  function addToCalendar() {
    const pad = (n: number) => String(n).padStart(2, "0");
    const [hh, mm] = (settings.reminderTime || "08:30").split(":");
    const d = new Date();
    const dt = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(Number(hh))}${pad(Number(mm))}00`;
    const anchor = settings.habitAnchor ? ` (${settings.habitAnchor})` : "";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Vitaal Thuis//NL",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:vitaalthuis-${dt}@vitaalthuis`,
      `DTSTART:${dt}`,
      "RRULE:FREQ=DAILY",
      `SUMMARY:Vitaal Thuis - je momentje${anchor}`,
      "DESCRIPTION:Tijd voor een paar rustige oefeningen. Rustig aan.",
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Vitaal Thuis",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "vitaal-thuis-herinnering.ics";
    a.click();
    URL.revokeObjectURL(url);
    void track("calendar_added", { time: settings.reminderTime });
  }

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) return null;

  return (
    <Screen>
      <PageHeader title={COPY.nav.settings} />

      <Section title="Jouw niveau">
        <p className="text-text-muted mb-3">{COPY.level.changeBody}</p>
        <div className="space-y-2">
          {LEVELS.map((l) => (
            <Choice
              key={l.id}
              selected={level === l.id}
              title={l.id}
              sub={l.tagline}
              onClick={() => setLevel(l.id as Level)}
            />
          ))}
        </div>
      </Section>

      <Section title="Tekstgrootte">
        <div className="grid grid-cols-3 gap-2">
          {(["normaal", "groot", "extra-groot"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateSettings({ textScale: t })}
              aria-pressed={settings.textScale === t}
              className={cn(
                "rounded-xl border-2 min-h-[56px] px-2 font-semibold focus-visible:outline focus-visible:outline-3",
                settings.textScale === t
                  ? "border-primary bg-success-surface"
                  : "border-border-strong bg-surface",
              )}
            >
              {t === "normaal" ? "Aa" : t === "groot" ? "Aa+" : "Aa++"}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Weergave">
        <ToggleRow
          label="Meer contrast"
          hint="Donkerdere tekst en sterkere randen."
          checked={settings.highContrast}
          onChange={(v) => updateSettings({ highContrast: v })}
        />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(["licht", "donker", "systeem"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateSettings({ theme: t })}
              aria-pressed={settings.theme === t}
              className={cn(
                "rounded-xl border-2 min-h-[52px] px-2 font-semibold capitalize focus-visible:outline focus-visible:outline-3",
                settings.theme === t
                  ? "border-primary bg-success-surface"
                  : "border-border-strong bg-surface",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Jouw momentje & herinnering">
        <label className="block mb-2 font-medium">Wanneer past het je het beste?</label>
        <select
          value={settings.habitAnchor}
          onChange={(e) => updateSettings({ habitAnchor: e.target.value })}
          className="w-full rounded-xl border-2 border-border-strong bg-surface min-h-[56px] px-4 text-[1.05rem] focus-visible:outline focus-visible:outline-3"
        >
          <option value="">Geen vast moment</option>
          {HABIT_ANCHORS.filter((h) => h !== "een eigen moment").map((h) => (
            <option key={h} value={h}>
              {h.charAt(0).toUpperCase() + h.slice(1)}
            </option>
          ))}
        </select>

        <div className="mt-3">
          <ToggleRow
            label="Rustige herinnering"
            hint="Eén vriendelijke tik op je gekozen moment."
            checked={settings.reminderEnabled}
            onChange={setReminder}
          />
          {settings.reminderEnabled && (
            <div className="mt-3">
              <label className="block mb-1 font-medium">Hoe laat?</label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => updateSettings({ reminderTime: e.target.value })}
                className="rounded-xl border-2 border-border-strong bg-surface min-h-[52px] px-4 text-[1.05rem] focus-visible:outline focus-visible:outline-3"
              />
              <Button variant="secondary" full className="mt-3" onClick={addToCalendar}>
                Zet dagelijkse herinnering in mijn agenda
              </Button>
              <p className="text-text-muted text-[0.9rem] mt-2">
                De agenda-herinnering werkt op elke telefoon. Heb je de app op je beginscherm
                gezet en meldingen toegestaan, dan kan de app je ook in de app herinneren.
              </p>
            </div>
          )}
        </div>
      </Section>

      <SyncSection />

      <Section title="Veiligheid">
        <SafetyAlert variant="info">{SAFETY.disclaimerShort}</SafetyAlert>
        <Button
          variant="secondary"
          full
          className="mt-3"
          onClick={() => router.push("/veiligheid")}
        >
          {SAFETY.readMore}
        </Button>
      </Section>

      <Section title="Opnieuw beginnen">
        <p className="text-text-muted mb-3">
          Dit wist je gegevens op dit apparaat en start de onboarding opnieuw.
        </p>
        {confirmReset ? (
          <div className="space-y-2">
            <Button
              variant="stop"
              full
              onClick={() => {
                resetAll();
                router.replace("/");
              }}
            >
              Ja, wis mijn gegevens
            </Button>
            <Button variant="tertiary" full onClick={() => setConfirmReset(false)}>
              Nee, laat maar
            </Button>
          </div>
        ) : (
          <Button variant="secondary" full onClick={() => setConfirmReset(true)}>
            Opnieuw beginnen
          </Button>
        )}
      </Section>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="font-bold text-[1.2rem] mb-2">{title}</h2>
      {children}
    </section>
  );
}

function Choice({
  selected,
  title,
  sub,
  onClick,
}: {
  selected: boolean;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full text-left rounded-xl border-2 p-4 min-h-[64px] focus-visible:outline focus-visible:outline-3",
        selected ? "border-primary bg-success-surface" : "border-border-strong bg-surface",
      )}
    >
      <span className="block font-semibold">{title}</span>
      <span className="block text-text-muted text-[0.95rem]">{sub}</span>
    </button>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 p-4 rounded-xl border-2 border-border-strong bg-surface min-h-[56px] cursor-pointer">
      <span>
        <span className="block font-semibold">{label}</span>
        {hint && <span className="block text-text-muted text-[0.9rem]">{hint}</span>}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-7 h-7 accent-[var(--color-primary)]"
      />
    </label>
  );
}

function SyncSection() {
  const status = useSyncStore((s) => s.status);
  const email = useSyncStore((s) => s.email);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const configured = isSupabaseConfigured();

  async function save() {
    if (!input.includes("@")) {
      setMessage("Vul een geldig e-mailadres in.");
      return;
    }
    setBusy(true);
    const res = await saveWithEmail(input.trim(), window.location.origin);
    setBusy(false);
    setMessage(res.message);
  }

  async function login() {
    if (!input.includes("@")) {
      setMessage("Vul een geldig e-mailadres in.");
      return;
    }
    setBusy(true);
    const res = await signInWithEmail(input.trim(), window.location.origin);
    setBusy(false);
    setMessage(res.message);
  }

  return (
    <Section title="Je voortgang bewaren">
      {!configured ? (
        <p className="text-text-muted">
          Cloud-back-up is in deze omgeving niet ingesteld. Je voortgang blijft gewoon op
          dit apparaat bewaard.
        </p>
      ) : status === "gekoppeld" ? (
        <div className="space-y-3">
          <SafetyAlert variant="info">
            Je voortgang is gekoppeld aan <strong>{email}</strong> en wordt automatisch
            bewaard. Je kunt op een ander apparaat met deze e-mail verder.
          </SafetyAlert>
          <Button variant="secondary" full onClick={() => void signOut()}>
            Uitloggen op dit apparaat
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-text-muted">
            Je voortgang wordt automatisch in de cloud bewaard. Koppel een e-mail als je
            op een ander apparaat verder wilt — er is geen wachtwoord nodig.
          </p>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jouw@email.nl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl border-2 border-border-strong bg-surface min-h-[56px] px-4 text-[1.05rem] focus-visible:outline focus-visible:outline-3"
          />
          <Button full disabled={busy} onClick={save}>
            Bewaar mijn voortgang
          </Button>
          <Button variant="tertiary" full disabled={busy} onClick={login}>
            Ik heb dit al → stuur me een inloglink
          </Button>
          {message && (
            <p className="rounded-xl bg-success-surface text-on-success-surface p-3">
              {message}
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
