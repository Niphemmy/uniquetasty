import { findVariant } from "@/data/catalog";
import { formatNaira } from "@/lib/money";

export function Price({ sku }: { sku: string }) {
  const v = findVariant(sku);
  if (!v) return <span>—</span>;
  return <span>{formatNaira(v.variant.priceKobo)}</span>;
}
