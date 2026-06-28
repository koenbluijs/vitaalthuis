"use client";

import { useEffect } from "react";
import { useApp, useHydrated } from "@/lib/store";
import { badgeById } from "@/lib/badges";
import { track } from "@/lib/analytics";
import { COPY } from "@/lib/copy";

// Rustige, NIET-blokkerende melding onderaan: onderbreekt de sessie niet.
// Toont hooguit één nieuw behaalde badge tegelijk.
export function BadgeToast() {
  const hydrated = useHydrated();
  const justUnlocked = useApp((s) => s.progress.justUnlocked);
  const clear = useApp((s) => s.clearJustUnlocked);

  const badge0 = justUnlocked[0];
  useEffect(() => {
    if (badge0) void track("badge_unlocked", { id: badge0 });
  }, [badge0]);

  if (!hydrated || justUnlocked.length === 0) return null;
  const badge = badgeById(justUnlocked[0]);
  if (!badge) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pointer-events-none">
      <div
        role="status"
        aria-live="polite"
        className="vt-rise pointer-events-auto w-full max-w-app rounded-2xl bg-surface border-2 border-primary shadow-lift p-4 flex items-center gap-3"
      >
        <span aria-hidden className="text-4xl flex-shrink-0">
          🏅
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-text-muted text-[0.85rem] font-medium">
            {COPY.badgeUnlock.title}: {badge.name}
          </p>
          <p className="leading-snug">{badge.unlockCopy}</p>
        </div>
        <button
          type="button"
          onClick={clear}
          aria-label="Sluiten"
          className="flex-shrink-0 min-h-[44px] px-4 rounded-xl bg-primary text-on-primary font-semibold focus-visible:outline focus-visible:outline-3"
        >
          {COPY.badgeUnlock.nice}
        </button>
      </div>
    </div>
  );
}
