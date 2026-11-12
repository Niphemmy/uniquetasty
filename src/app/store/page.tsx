import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { products, bundles } from "@/data/catalog";
import { site } from "@/data/site";
import { Freshness } from "@/components/product/Freshness";
import { ButtonLink } from "@/components/ui/Button";
import { formatNaira } from "@/lib/money";

export const metadata: Metadata = {
  title: "Buy Unique Elixir and Immunity Shot online, Ibadan",
  description:
    "Singles, 6-packs and 12-packs. Pay with Paystack, then confirm on WhatsApp. Pickup in Old Bodija or delivery in Ibadan, Lagos and Ogun State.",
  alternates: { canonical: `${site.url}/store` },
};

export default function StorePage() {
  const live = bundles.filter((b) => b.status === "live");

  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
        Shop Unique Tasty drinks
      </h1>
      <p className="text-lg text-inkSoft max-w-2xl mb-3">
        Pick a drink, pick a size, pick how many. Pay on the site. We confirm on
        WhatsApp.
      </p>
      <Freshness className="mb-10" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {live.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold mb-6">Bundles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {live.map((b) => (
              <div
                key={b.slug}
                className="rounded-3xl border border-ink/10 bg-cream p-6"
              >
                <h3 className="font-display text-xl font-bold mb-2">
                  {b.name}
                </h3>
                <ul className="text-sm text-inkSoft space-y-1 mb-4">
                  {b.items.map((it) => (
                    <li key={it.sku}>
                      {it.qty} x {it.sku}
                    </li>
                  ))}
                </ul>
                <div className="text-xl font-bold">
                  {formatNaira(b.offerPriceKobo)}
                </div>
                <div className="text-xs text-inkSoft">
                  You save {formatNaira(b.listPriceKobo - b.offerPriceKobo)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 rounded-3xl bg-paper p-8 flex flex-wrap items-center justify-between gap-5">
        <div>
          <h2 className="font-display text-2xl font-bold mb-2">
            Need more than ₦50,000 of drinks?
          </h2>
          <p className="text-inkSoft">
            Message us for a quote that includes delivery.
          </p>
        </div>
        <ButtonLink href="/custom-order">Ask for a quote</ButtonLink>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-4 text-sm text-inkSoft">
        <div className="rounded-xl bg-cream border border-ink/10 p-4">
          Pay with Paystack
        </div>
        {site.nafdacNumber && (
          <div className="rounded-xl bg-cream border border-ink/10 p-4">
            NAFDAC {site.nafdacNumber}
          </div>
        )}
        <div className="rounded-xl bg-cream border border-ink/10 p-4">
          Pickup or delivery
        </div>
        <div className="rounded-xl bg-cream border border-ink/10 p-4">
          Reply within 1 working day
        </div>
      </div>
    </section>
  );
}
