import type { MotionType } from "@/lib/types";

// Eenvoudige, vriendelijke schematische illustraties per bewegingspatroon.
// "Basaal oefenbeeld" — geeft in één oogopslag het type beweging weer.
// Kleuren via tokens, zodat ze in light/dark/meer-contrast meebewegen.

const FIG = "var(--color-primary-strong)";
const PROP = "var(--color-border-strong)";
const ARROW = "var(--color-accent-text)";

function Head({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={11} fill={FIG} />;
}

const stroke = {
  stroke: FIG,
  strokeWidth: 6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function Art({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <rect width="200" height="150" rx="14" fill="var(--color-surface-2)" />
      {children}
    </svg>
  );
}

export function MovementArt({ motion, name }: { motion: MotionType; name: string }) {
  const label = `Illustratie van de oefening: ${name}`;
  let art: React.ReactNode;

  switch (motion) {
    case "sit-to-stand":
      art = (
        <>
          {/* stoel */}
          <path d="M120 95 H160 M150 95 V125 M120 95 V70" stroke={PROP} strokeWidth={5} fill="none" strokeLinecap="round" />
          {/* figuur die voorover omhoog komt */}
          <Head cx={92} cy={48} />
          <path d="M92 59 L104 86" {...stroke} />
          <path d="M92 66 L70 72" {...stroke} />
          <path d="M104 86 L96 120 M104 86 L122 104 L120 124" {...stroke} />
          {/* pijl omhoog */}
          <path d="M40 110 V70 M32 82 L40 70 L48 82" stroke={ARROW} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
      break;
    case "seated":
      art = (
        <>
          <path d="M70 80 H150 M140 80 V120 M70 80 V40" stroke={PROP} strokeWidth={5} fill="none" strokeLinecap="round" />
          <Head cx={92} cy={44} />
          <path d="M92 55 V80" {...stroke} />
          <path d="M92 62 L72 76" {...stroke} />
          <path d="M92 80 H120 L120 120" {...stroke} />
        </>
      );
      break;
    case "balance":
      art = (
        <>
          {/* stoel als steun */}
          <path d="M150 70 V120 M150 70 H178 M178 70 V120" stroke={PROP} strokeWidth={5} fill="none" strokeLinecap="round" />
          <Head cx={90} cy={36} />
          <path d="M90 47 V92" {...stroke} />
          <path d="M90 60 L150 78" {...stroke} />
          <path d="M90 60 L66 86" {...stroke} />
          <path d="M90 92 L80 130 M90 92 L108 110" {...stroke} />
        </>
      );
      break;
    case "hinge":
      art = (
        <>
          <Head cx={56} cy={58} />
          {/* platte rug voorover scharnierend vanuit de heupen */}
          <path d="M66 62 L120 84" {...stroke} />
          <path d="M120 84 L150 78" {...stroke} />
          <path d="M120 84 L126 124" {...stroke} />
          <path d="M86 70 L92 104" {...stroke} />
          <path d="M150 120 H180" stroke={PROP} strokeWidth={5} strokeLinecap="round" />
        </>
      );
      break;
    case "arm":
      art = (
        <>
          <Head cx={100} cy={44} />
          <path d="M100 55 V100" {...stroke} />
          <path d="M100 66 L66 44 M100 66 L134 44" {...stroke} />
          <path d="M100 100 L86 134 M100 100 L114 134" {...stroke} />
          <path d="M150 56 A14 14 0 1 1 146 46" stroke={ARROW} strokeWidth={4} fill="none" strokeLinecap="round" />
        </>
      );
      break;
    case "wall":
      art = (
        <>
          {/* muur rechts */}
          <path d="M168 24 V128" stroke={PROP} strokeWidth={6} strokeLinecap="round" />
          <Head cx={70} cy={54} />
          <path d="M70 65 L86 104" {...stroke} />
          <path d="M70 72 L166 60 M82 92 L166 78" {...stroke} />
          <path d="M86 104 L74 134 M86 104 L104 130" {...stroke} />
        </>
      );
      break;
    case "floor":
      art = (
        <>
          {/* vloer */}
          <path d="M24 120 H176" stroke={PROP} strokeWidth={5} strokeLinecap="round" />
          {/* liggend, knieën opgetrokken */}
          <Head cx={52} cy={104} />
          <path d="M63 104 H118" {...stroke} />
          <path d="M118 104 L120 84 L138 92" {...stroke} />
          <path d="M86 104 L84 116" {...stroke} />
        </>
      );
      break;
    case "heel-raise":
      art = (
        <>
          <Head cx={100} cy={40} />
          <path d="M100 51 V96" {...stroke} />
          <path d="M100 62 L80 84 M100 62 L120 84" {...stroke} />
          {/* benen, hielen omhoog (tenenstand) */}
          <path d="M100 96 L90 124 M100 96 L110 124" {...stroke} />
          <path d="M82 126 L94 122 M106 122 L118 126" stroke={FIG} strokeWidth={6} strokeLinecap="round" />
          <path d="M150 116 V78 M142 90 L150 78 L158 90" stroke={ARROW} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
      break;
    case "carry":
      art = (
        <>
          <Head cx={92} cy={40} />
          <path d="M92 51 V100" {...stroke} />
          <path d="M92 62 L70 92 M92 62 L118 92" {...stroke} />
          <path d="M92 100 L82 134 M92 100 L106 134" {...stroke} />
          {/* tas */}
          <rect x="108" y="92" width="26" height="26" rx="4" fill="none" stroke={PROP} strokeWidth={5} />
          <path d="M114 92 A8 6 0 0 1 128 92" fill="none" stroke={PROP} strokeWidth={4} />
        </>
      );
      break;
    case "stand":
    default:
      art = (
        <>
          <Head cx={100} cy={40} />
          <path d="M100 51 V98" {...stroke} />
          <path d="M100 62 L80 92 M100 62 L120 92" {...stroke} />
          <path d="M100 98 L88 134 M100 98 L112 134" {...stroke} />
        </>
      );
      break;
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border aspect-[4/3] bg-surface-2">
      <Art label={label}>{art}</Art>
    </div>
  );
}
