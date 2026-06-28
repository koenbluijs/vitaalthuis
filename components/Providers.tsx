"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import { BottomNav } from "./BottomNav";
import { BadgeToast } from "./BadgeToast";
import { SyncProvider } from "./SyncProvider";

const APP_ROUTES = ["/vandaag", "/oefeningen", "/voortgang", "/instellingen"];

const TEXT_SCALE: Record<string, string> = {
  normaal: "16px",
  groot: "18px",
  "extra-groot": "20px",
};

export function Providers({ children }: { children: React.ReactNode }) {
  const settings = useApp((s) => s.settings);
  const pathname = usePathname();

  // Tekstgrootte + "meer contrast" toepassen op <html>.
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = TEXT_SCALE[settings.textScale] ?? "16px";
    root.classList.toggle("contrast-more", settings.highContrast);
  }, [settings.textScale, settings.highContrast]);

  // Thema toepassen (licht/donker/systeem).
  useEffect(() => {
    const root = document.documentElement;
    const apply = (dark: boolean) => root.classList.toggle("dark", dark);
    if (settings.theme === "donker") apply(true);
    else if (settings.theme === "licht") apply(false);
    else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches);
      const onChange = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, [settings.theme]);

  // Service worker registreren (PWA, offline app-shell).
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* stil falen; app werkt ook zonder */
      });
    }
  }, []);

  const showNav = APP_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );

  return (
    <>
      <div className={showNav ? "pb-28" : ""}>{children}</div>
      {showNav && <BottomNav />}
      <BadgeToast />
      <SyncProvider />
    </>
  );
}
