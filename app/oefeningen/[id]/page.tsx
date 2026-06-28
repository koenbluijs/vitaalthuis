import Link from "next/link";
import { notFound } from "next/navigation";
import { EXERCISES, getExercise } from "@/lib/data";
import { Screen } from "@/components/Screen";
import { Pill } from "@/components/ui";
import { SafetyAlert } from "@/components/SafetyAlert";
import { MediaPlaceholder } from "@/components/ExerciseCard";

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ id: e.id }));
}

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ex = getExercise(id);
  if (!ex) notFound();

  return (
    <Screen>
      <Link
        href="/oefeningen"
        className="inline-block text-primary-strong underline underline-offset-2 min-h-[44px] mb-2"
      >
        ← Alle oefeningen
      </Link>

      <h1 className="text-[1.7rem] font-bold leading-tight">{ex.name}</h1>
      <div className="mt-2 mb-4 flex flex-wrap gap-2">
        <Pill>{ex.category}</Pill>
        {ex.suitable_levels.map((l) => (
          <Pill key={l}>{l}</Pill>
        ))}
      </div>

      <div className="mb-4">
        <MediaPlaceholder text={ex.media_placeholder} />
      </div>

      <p className="text-[1.05rem]">{ex.short_explanation}</p>

      <Section title="Waarom dit helpt">
        <p>{ex.why_useful}</p>
        <p className="text-text-muted mt-1">In het echt: {ex.adl}</p>
      </Section>

      <Section title="Zo doe je het">
        <ol className="list-decimal pl-5 space-y-1">
          {ex.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </Section>

      <Section title="Hoeveel per niveau">
        <dl className="space-y-2">
          <Dose label="Rustig starten" value={ex.dosage.rustig_starten} />
          <Dose label="Actief blijven" value={ex.dosage.actief_blijven} />
          <Dose label="Sterker worden" value={ex.dosage.sterker_worden} />
        </dl>
      </Section>

      <Section title="Varianten">
        <p className="rounded-xl bg-success-surface text-on-success-surface p-3">
          🟢 Makkelijker: {ex.easier}
        </p>
        <p className="rounded-xl bg-info-surface text-on-info-surface p-3 mt-2">
          🔵 Een stapje verder: {ex.harder}
        </p>
      </Section>

      <div className="mt-4">
        <SafetyAlert variant="caution" title="Let op">
          {ex.safety_tip}
          <span className="block mt-1">{ex.cautions}</span>
        </SafetyAlert>
      </div>

      <Section title="Praktisch">
        <p className="text-text-muted">
          Nodig: {ex.equipment} · Steun: {ex.support_needed}
        </p>
        <p className="text-text-muted mt-1">
          Doelspieren: {ex.target_muscles.join(", ")}
        </p>
      </Section>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="font-bold text-[1.15rem] mb-1">{title}</h2>
      {children}
    </section>
  );
}

function Dose({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2 p-3">
      <dt className="font-semibold">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
