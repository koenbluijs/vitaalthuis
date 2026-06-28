import Link from "next/link";
import { CATEGORIES, exercisesByCategory } from "@/lib/data";
import { Screen } from "@/components/Screen";
import { PageHeader, Pill } from "@/components/ui";
import { COPY } from "@/lib/copy";

export default function LibraryPage() {
  return (
    <Screen>
      <PageHeader
        title={COPY.nav.exercises}
        subtitle="Bekijk alle oefeningen rustig, gegroepeerd per onderdeel."
      />
      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const items = exercisesByCategory(cat);
          return (
            <section key={cat}>
              <h2 className="text-[1.2rem] font-bold mb-2">
                {cat}{" "}
                <span className="text-text-muted font-normal text-[1rem]">
                  ({items.length})
                </span>
              </h2>
              <ul className="space-y-2">
                {items.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/oefeningen/${e.id}`}
                      className="block rounded-xl bg-surface border border-border p-4 min-h-[64px] focus-visible:outline focus-visible:outline-3 hover:bg-surface-2"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>
                          <span className="block font-semibold text-[1.05rem]">
                            {e.name}
                          </span>
                          <span className="block text-text-muted text-[0.95rem]">
                            {e.short_explanation}
                          </span>
                        </span>
                        <span aria-hidden className="text-text-muted text-2xl">
                          ›
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Screen>
  );
}
