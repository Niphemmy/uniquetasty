"use client";

import { useEffect, useState } from "react";

const COOKIE = "ut_consent";

function set(value: "granted" | "denied") {
  const days = 180;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!document.cookie.includes(`${COOKIE}=`)) setShow(true);
    } catch {}
  }, []);

  useEffect(() => {
    const open = () => setShow(true);
    document.addEventListener("ut:open-consent", open);
    return () => document.removeEventListener("ut:open-consent", open);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl bg-ink text-cream p-4 shadow-xl text-sm">
      <p>
        We use cookies to measure which ads work and to improve the site. You
        can say no.{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy
        </a>
        .
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          onClick={() => {
            set("denied");
            setShow(false);
          }}
          className="rounded-full px-4 py-2 bg-cream/10 hover:bg-cream/20"
        >
          No thanks
        </button>
        <button
          onClick={() => {
            set("granted");
            setShow(false);
            window.location.reload();
          }}
          className="rounded-full px-4 py-2 bg-green text-white hover:bg-[#2c4f20]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
