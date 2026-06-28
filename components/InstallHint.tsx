"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const DISMISS_KEY = "vt-install-dismissed";

// Dismissible hint om de app op het beginscherm te zetten (PWA).
// iOS kent geen install-prompt → we tonen korte instructies. Android/desktop:
// we gebruiken het beforeinstallprompt-event.
export function InstallHint() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferred, setDeferred] = useState<{ prompt: () => void } | null>(null);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    if (standalone) return;

    const ua = window.navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    setIsIOS(ios);
    if (ios) setShow(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as unknown as { prompt: () => void });
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    const onInstalled = () => {
      void track("app_installed");
      dismiss();
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="mb-4 rounded-xl bg-info-surface text-on-info-surface border-l-4 border-info p-4">
      <div className="flex items-start gap-3">
        <span aria-hidden className="text-xl">
          📲
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Zet Vitaal Thuis op je beginscherm</p>
          {isIOS ? (
            <p className="text-[0.95rem] mt-1">
              Tik onderin op het deel-icoon (het vierkantje met pijltje) en kies{" "}
              <strong>&quot;Zet op beginscherm&quot;</strong>. Dan open je de app voortaan met
              één tik.
            </p>
          ) : (
            <p className="text-[0.95rem] mt-1">
              Dan open je de app voortaan met één tik, net als een gewone app.
            </p>
          )}
          <div className="mt-3 flex gap-3">
            {!isIOS && deferred && (
              <button
                type="button"
                onClick={() => {
                  deferred.prompt();
                  dismiss();
                }}
                className="rounded-xl bg-primary text-on-primary font-semibold min-h-[44px] px-4 focus-visible:outline focus-visible:outline-3"
              >
                Op beginscherm zetten
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="rounded-xl border-2 border-border-strong font-semibold min-h-[44px] px-4 focus-visible:outline focus-visible:outline-3"
            >
              Niet nu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
