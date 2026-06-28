"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { COPY } from "@/lib/copy";

const ITEMS = [
  { href: "/vandaag", label: COPY.nav.today, icon: "☀️" },
  { href: "/oefeningen", label: COPY.nav.exercises, icon: "🤸" },
  { href: "/voortgang", label: COPY.nav.progress, icon: "🌿" },
  { href: "/instellingen", label: COPY.nav.settings, icon: "⚙️" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Hoofdmenu"
      className="fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border"
    >
      <ul className="mx-auto max-w-app flex">
        {ITEMS.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 min-h-[64px] py-2 text-[0.85rem] font-medium focus-visible:outline focus-visible:outline-3",
                  active ? "text-primary-strong" : "text-text-muted",
                )}
              >
                <span aria-hidden className="text-2xl leading-none">
                  {it.icon}
                </span>
                <span
                  className={cn(
                    "leading-none",
                    active && "underline underline-offset-4",
                  )}
                >
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
