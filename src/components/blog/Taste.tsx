import { productBySlug } from "@/data/catalog";

export function Taste({ product }: { product: "elixir" | "immunity-shot" }) {
  const p = productBySlug(product);
  if (!p?.taste) return <em>(taste notes pending)</em>;
  return <>{p.taste}</>;
}
