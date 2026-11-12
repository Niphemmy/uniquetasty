import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Callout({
  tone = "info",
  children,
  className,
}: {
  tone?: "info" | "warn" | "success";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    info: "bg-paper text-ink",
    warn: "bg-yellow/20 text-brown",
    success: "bg-green/15 text-green",
  };
  return (
    <div
      className={cn(
        "rounded-2xl px-5 py-4 text-sm leading-relaxed",
        tones[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
