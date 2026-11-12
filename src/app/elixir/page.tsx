import type { Metadata } from "next";
import Image from "next/image";
import { productBySlug } from "@/data/catalog";
import { site } from "@/data/site";
import { Freshness } from "@/components/product/Freshness";
import { IngredientList } from "@/components/product/IngredientList";
import { AddToCartButton } from "@/components/cart/CartSummary";
import { formatNaira, perBottle } from "@/lib/money";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { productAskMessage } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/JsonLd";
import { productLd, faqLd } from "@/lib/schema-org";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/data/faq";
import { resolveTemplates } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unique Elixir, beetroot and hibiscus drink, from ₦950",
  description:
    "Eight ingredients, made in small batches in Old Bodija, Ibadan. 250ml and 500ml, in singles, 6-packs and 12-packs. See the full ingredient list.",
  alternates: { canonical: `${site.url}/elixir` },
};

export default function ElixirPage() {
  const product = productBySlug("elixir")!;
  const tpl: Record<string, string> = {
    "site.nafdacNumber": site.nafdacNumber || "pending",
  };
  const items = faq
    .filter((f) => f.tags.includes("elixir") || f.tags.includes("all"))
    .slice(0, 6)
    .map((i) => ({ q: i.q, a: resolveTemplates(i.a, tpl) }));

  return (
    <article className="mx-auto max-w-wrap px-4 py-10">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Store", path: "/store" },
          { name: "Unique Elixir", path: "/elixir" },
        ]}
      />
      <JsonLd data={productLd(product)} />
      <JsonLd data={faqLd(items)} />

      <div className="grid md:grid-cols-2 gap-10 mt-5">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-paper">
          <Image
            src={product.variants[0].image}
            alt="A bottle of Unique Elixir 250ml"
            fill
            sizes="(min-width: 768px) 32rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-inkSoft mb-4">
            Unique Elixir is a drink made in small batches in Old Bodija,
            Ibadan, from {product.ingredients.join(", ").toLowerCase()}. A
            250ml bottle is {formatNaira(product.variants[0].priceKobo)}. A
            500ml bottle is {formatNaira(product.variants[3].priceKobo)}.
          </p>
          <Freshness className="mb-6" />
          <h2 className="font-display text-xl font-bold mb-3">
            What is in the bottle
          </h2>
          <IngredientList slug="elixir" />
          <p className="text-xs text-inkSoft mt-3">
            This list is copied from the label. If the label changes, this
            page changes.
          </p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold mb-6">Pick your pack</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="text-inkSoft">
                <th className="py-2">Size</th>
                <th className="py-2">Pack</th>
                <th className="py-2">Price</th>
                <th className="py-2">Per bottle</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((v) => (
                <tr key={v.sku} className="border-t border-ink/10">
                  <td className="py-3">{v.size}</td>
                  <td className="py-3">
                    {v.pack === 1 ? "Single" : `${v.pack}-pack`}
                  </td>
                  <td className="py-3 font-semibold">
                    {formatNaira(v.priceKobo)}
                  </td>
                  <td className="py-3 text-inkSoft">
                    {perBottle(v.priceKobo, v.pack)}
                  </td>
                  <td className="py-3">
                    <AddToCartButton sku={v.sku} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">
            How to enjoy it
          </h2>
          <p className="text-inkSoft">
            Keep it cold. Shake the bottle before you pour. Drink it on its own,
            over ice, or beside a meal. Share a 6-pack with the house or put a
            12-pack in the office fridge.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">
            Keeping it fresh
          </h2>
          <p className="text-inkSoft">
            {site.freshnessLine} Keep the bottle in the fridge. Once opened,
            drink it within a day or two.
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-paper p-8 flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-cream shrink-0">
          <Image
            src="/images/founder/portrait.jpg"
            alt={site.founder.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">
            Made by {site.founder.name} in Old Bodija.
          </p>
          <a href="/our-story" className="text-sm underline underline-offset-2">
            Read her story
          </a>
        </div>
      </section>

      {site.nafdacNumber && (
        <p className="mt-10 text-sm text-inkSoft">
          NAFDAC registration number: {site.nafdacNumber}
        </p>
      )}

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold mb-5">Questions</h2>
        <Accordion items={items} />
      </section>

      <section className="mt-10 text-center">
        <WhatsAppButton message={productAskMessage(product.name)} size="lg">
          Ask us anything on WhatsApp
        </WhatsAppButton>
      </section>
    </article>
  );
}
