"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { SAFETY } from "@/lib/safety";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";

export default function SafetyPage() {
  const router = useRouter();
  const acknowledgeSafety = useApp((s) => s.acknowledgeSafety);

  function next() {
    acknowledgeSafety();
    router.push("/onboarding");
  }

  return (
    <Screen>
      <h1 className="text-[1.7rem] font-bold leading-tight mb-2">Even dit vooraf</h1>
      <p className="text-text-muted mb-5">{SAFETY.disclaimerShort}</p>

      <div className="space-y-2 mb-5">
        {SAFETY.disclaimerFull.map((line, i) => (
          <p key={i} className="flex gap-2">
            <span aria-hidden className="text-primary-strong">
              •
            </span>
            <span>{line}</span>
          </p>
        ))}
      </div>

      <SafetyAlert variant="stop" title={SAFETY.redFlagsTitle} className="mb-3">
        <ul className="list-disc pl-5 space-y-1">
          {SAFETY.redFlags.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">{SAFETY.emergency}</p>
      </SafetyAlert>

      <SafetyAlert variant="info" title="Rustig en veilig bewegen" className="mb-6">
        <ul className="list-disc pl-5 space-y-1">
          {SAFETY.practice.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </SafetyAlert>

      <Button full onClick={next}>
        {SAFETY.acknowledge}
      </Button>
    </Screen>
  );
}
