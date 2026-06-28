"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp, useHydrated } from "@/lib/store";
import { COPY } from "@/lib/copy";
import { SAFETY } from "@/lib/safety";
import { Screen } from "@/components/Screen";
import { Button, ButtonLink, Card } from "@/components/ui";

export default function WelcomePage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const onboarded = useApp((s) => s.profile.onboarded);
  const hasData = useApp((s) => s.progress.sessions.length > 0 || s.profile.onboarded);
  const [showHow, setShowHow] = useState(false);

  useEffect(() => {
    if (hydrated && onboarded) router.replace("/vandaag");
  }, [hydrated, onboarded, router]);

  if (!hydrated || onboarded) return null;

  return (
    <Screen className="flex flex-col">
      <div className="flex-1 flex flex-col justify-center text-center py-8">
        <div aria-hidden className="text-6xl mb-4">
          🌿
        </div>
        <h1 className="text-[2rem] font-bold leading-tight">{COPY.welcome.title}</h1>
        <p className="mt-3 text-[1.15rem] text-text-muted">{COPY.welcome.intro}</p>
      </div>

      <div className="space-y-3">
        <ButtonLink href="/veiligheid" full>
          {COPY.welcome.start}
        </ButtonLink>
        <Button variant="secondary" full onClick={() => setShowHow((v) => !v)}>
          {COPY.welcome.how}
        </Button>
        {hasData ? (
          <ButtonLink href="/vandaag" variant="tertiary" full>
            {COPY.welcome.returning}
          </ButtonLink>
        ) : (
          <p className="text-center text-text-muted text-[0.95rem]">
            Nog geen gegevens op dit apparaat. Begin gewoon bovenaan — het kost een paar
            minuten.
          </p>
        )}
      </div>

      {showHow && (
        <Card className="mt-5 vt-rise text-left">
          <h2 className="font-bold text-[1.2rem] mb-2">Zo werkt het</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Je beantwoordt vijf korte vraagjes. Geen medische intake.</li>
            <li>Je krijgt elke dag een paar rustige oefeningen, thuis te doen.</li>
            <li>Je vinkt af wat je gedaan hebt. Een dag overslaan mag altijd.</li>
            <li>Je ziet rustig je vooruitgang. In jouw tempo, zonder druk.</li>
          </ol>
          <p className="mt-3 text-text-muted text-[0.95rem]">{SAFETY.disclaimerShort}</p>
        </Card>
      )}
    </Screen>
  );
}
