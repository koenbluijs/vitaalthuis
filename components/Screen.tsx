import { cn } from "@/lib/cn";

export function Screen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto max-w-app px-5 py-6 min-h-screen", className)}>
      {children}
    </main>
  );
}
