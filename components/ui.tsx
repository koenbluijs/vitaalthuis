"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "stop";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-3 disabled:opacity-60 disabled:cursor-not-allowed text-center";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary:
    "bg-surface text-text border-2 border-border-strong hover:bg-surface-2",
  tertiary: "bg-transparent text-primary-strong underline underline-offset-2",
  stop: "bg-stop text-on-stop hover:opacity-90",
};

// Grote tap-targets: primair 56px, overig minimaal 48px.
const sizes = {
  lg: "min-h-[56px] px-6 text-[1.125rem]",
  md: "min-h-[48px] px-5 text-[1.0625rem]",
};

export function Button({
  variant = "primary",
  size = "lg",
  full,
  className,
  ...props
}: {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  full?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], full && "w-full", className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  full,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  full?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], full && "w-full", className)}
    >
      {children}
    </Link>
  );
}

/** Grote, volle-breedte keuzeknop voor onboarding/niveaukeuze. */
export function OptionButton({
  selected,
  label,
  hint,
  onClick,
}: {
  selected?: boolean;
  label: string;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full text-left rounded-xl border-2 px-5 py-4 min-h-[64px] transition-colors",
        "focus-visible:outline focus-visible:outline-3",
        selected
          ? "border-primary bg-success-surface"
          : "border-border-strong bg-surface hover:bg-surface-2",
      )}
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "flex-shrink-0 grid place-items-center rounded-full border-2 w-7 h-7",
            selected ? "border-primary bg-primary text-on-primary" : "border-border-strong",
          )}
        >
          {selected ? "✓" : ""}
        </span>
        <span>
          <span className="block font-semibold text-[1.0625rem]">{label}</span>
          {hint && <span className="block text-text-muted text-[0.95rem]">{hint}</span>}
        </span>
      </span>
    </button>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface border border-border shadow-card p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-surface-2 text-text-muted text-[0.9rem] font-medium px-3 py-1">
      {children}
    </span>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / Math.max(1, max)) * 100)));
  return (
    <div
      className="h-3 w-full rounded-full bg-surface-2 overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-5">
      <h1 className="text-[1.7rem] font-bold leading-tight">{title}</h1>
      {subtitle && <p className="text-text-muted mt-1">{subtitle}</p>}
    </header>
  );
}
