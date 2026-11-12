import { site } from "@/data/site";

export function Freshness({ className = "" }: { className?: string }) {
  return <p className={`text-sm text-inkSoft ${className}`}>{site.freshnessLine}</p>;
}
