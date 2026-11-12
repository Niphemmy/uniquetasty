import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/schema-org";

export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <nav
        aria-label="Breadcrumb"
        className="text-xs text-inkSoft flex items-center gap-1 flex-wrap"
      >
        {trail.map((t, i) => (
          <span key={t.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>›</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page">{t.name}</span>
            ) : (
              <Link href={t.path} className="underline underline-offset-2">
                {t.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
