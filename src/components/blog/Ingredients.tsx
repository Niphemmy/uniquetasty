import { productBySlug } from "@/data/catalog";

export function Ingredients({ product }: { product: "elixir" | "immunity-shot" }) {
  const p = productBySlug(product);
  if (!p || p.ingredients.length === 0) return <em>(ingredient list pending)</em>;
  return <>{p.ingredients.join(", ")}.</>;
}
