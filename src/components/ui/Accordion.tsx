import { type ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { q: string; a: ReactNode; open?: boolean }[];
}) {
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
      {items.map((it, i) => (
        <details key={i} open={it.open} className="group">
          <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-ink flex items-center justify-between gap-4">
            <span>{it.q}</span>
            <span className="text-inkSoft transition group-open:rotate-45 text-xl leading-none">
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-sm text-inkSoft">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
