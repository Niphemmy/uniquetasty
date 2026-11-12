import { productBySlug } from "@/data/catalog";

export function IngredientList({ slug }: { slug: "elixir" | "immunity-shot" }) {
  const p = productBySlug(slug);
  if (!p || p.ingredients.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
      {p.ingredients.map((i) => (
        <li
          key={i}
          className="rounded-xl bg-cream px-3 py-2 border border-ink/5 font-semibold text-ink"
        >
          {i}
        </li>
      ))}
    </ul>
  );
}
