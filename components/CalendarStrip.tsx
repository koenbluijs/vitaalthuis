"use client";

import type { SessionRecord } from "@/lib/types";
import { dateStr } from "@/lib/progress";
import { cn } from "@/lib/cn";

// Laatste 14 dagen als rustige bolletjes: gevuld (actief), zacht (rust), open (niets).
export function CalendarStrip({ sessions }: { sessions: SessionRecord[] }) {
  const byDate = new Map<string, SessionRecord>();
  for (const s of sessions) byDate.set(s.date, s);

  const days: { ds: string; state: "active" | "rest" | "none"; label: string }[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - 13);
  for (let i = 0; i < 14; i++) {
    const ds = dateStr(cursor);
    const rec = byDate.get(ds);
    let state: "active" | "rest" | "none" = "none";
    if (rec) {
      if (rec.doneIds.length > 0) state = "active";
      else if (rec.isRest) state = "rest";
    }
    days.push({ ds, state, label: ds });
    cursor.setDate(cursor.getDate() + 1);
  }

  return (
    <div className="flex flex-wrap gap-2" aria-label="Laatste twee weken">
      {days.map((d) => (
        <span
          key={d.ds}
          title={d.label}
          aria-label={`${d.label}: ${
            d.state === "active" ? "bewogen" : d.state === "rest" ? "rustdag" : "geen activiteit"
          }`}
          className={cn(
            "w-5 h-5 rounded-full border",
            d.state === "active" && "bg-primary border-primary",
            d.state === "rest" && "bg-surface-2 border-border-strong",
            d.state === "none" && "bg-transparent border-border",
          )}
        />
      ))}
    </div>
  );
}
