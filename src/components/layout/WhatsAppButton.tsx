"use client";

import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  message,
  children,
  size = "md",
}: {
  message: string;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <ButtonLink
      href={waLink(message)}
      variant="whatsapp"
      size={size}
      target="_blank"
      rel="noopener"
      onClick={() => track("whatsapp_click", { method: "whatsapp" })}
    >
      {children}
    </ButtonLink>
  );
}

export function WhatsAppFloat({ message }: { message: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-lg hover:bg-[#2c4f20]"
      onClick={() => {
        // consent-aware tracker
        if (typeof window !== "undefined") {
          try {
            track("whatsapp_click", { method: "float" });
          } catch {}
        }
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.4-1.48-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.5-.5-.68-.5-.18 0-.38 0-.58 0-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.13 3.27 5.18 4.57.72.3 1.28.5 1.72.65.72.23 1.38.2 1.9.12.58-.08 1.8-.73 2.05-1.45.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35zM12 2C6.48 2 2 6.48 2 12c0 1.78.47 3.46 1.28 4.92L2 22l5.2-1.26A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 0 1-4.08-1.12l-.3-.18-3.06.74.74-2.98-.2-.32A7.97 7.97 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" />
      </svg>
    </a>
  );
}
