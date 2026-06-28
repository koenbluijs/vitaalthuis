"use client";

import { cn } from "@/lib/cn";

type Variant = "info" | "caution" | "stop";

const styles: Record<Variant, { box: string; icon: string; iconColor: string }> = {
  info: {
    box: "bg-info-surface text-on-info-surface border-info",
    icon: "ℹ️",
    iconColor: "text-info",
  },
  caution: {
    box: "bg-caution-surface text-on-caution-surface border-caution",
    icon: "⚠️",
    iconColor: "text-caution",
  },
  stop: {
    box: "bg-stop-surface text-on-stop-surface border-stop",
    icon: "✋",
    iconColor: "text-stop",
  },
};

export function SafetyAlert({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <div
      role="note"
      className={cn("rounded-xl border-l-4 border p-4 flex gap-3", s.box, className)}
    >
      <span aria-hidden className="text-xl leading-tight">
        {s.icon}
      </span>
      <div className="min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-[1rem] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
