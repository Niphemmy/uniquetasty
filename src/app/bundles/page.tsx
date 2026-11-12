import type { Metadata } from "next";
import { bundles } from "@/data/catalog";
import { formatNaira } from "@/lib/money";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bundles",
  description: "Pre-set combinations for homes, offices and gifts.",
};

export default function BundlesPage() {
  const live = bundles.filter((b) => b.status === "live");
  if (live.length === 0) {
    return (
      <section className="mx-auto max-w-wrap px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Bundles</h1>
        <p className="text-inkSoft mb-6">
          Our bundles are being finalised with the founder. Meanwhile, shop
          every pack on the store page.
        </p>
        <ButtonLink href="/store">Go to the store</ButtonLink>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl font-bold mb-10">Bundles</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {live.map((b) => (
          <div
            key={b.slug}
            className="rounded-3xl border border-ink/10 bg-cream p-6"
          >
            <h3 className="font-display text-xl font-bold mb-2">{b.name}</h3>
            <div className="text-xl font-bold">
              {formatNaira(b.offerPriceKobo)}
            </div>
            <div className="text-xs text-inkSoft">
              You save {formatNaira(b.listPriceKobo - b.offerPriceKobo)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
