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
import { productLd } from "@/lib/schema-org";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Immunity Shot by Unique Tasty Naturals, from ₦1,000",
  description:
    "A small bottle from Old Bodija, Ibadan. Ingredients, taste and pack prices. NAFDAC registered.",
  alternates: { canonical: `${site.url}/immunity-shot` },
};

export default function ImmunityShotPage() {
  const product = productBySlug("immunity-shot")!;
  return (
    <article className="mx-auto max-w-wrap px-4 py-10">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Store", path: "/store" },
          { name: "Immunity Shot", path: "/immunity-shot" },
        ]}
      />
      <JsonLd data={productLd(product)} />

      <div className="grid md:grid-cols-2 gap-10 mt-5">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-paper">
          <Image
            src={product.variants[0].image}
            alt="A single Immunity Shot bottle"
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
            A small drink made in Old Bodija, Ibadan by Unique Tasty Naturals.
            A single bottle is {formatNaira(product.variants[0].priceKobo)}. A
            6-pack is {formatNaira(product.variants[1].priceKobo)} and a 12-pack
            is {formatNaira(product.variants[2].priceKobo)}.
          </p>
          <Freshness className="mb-6" />

          {product.ingredients.length > 0 && (
            <>
              <h2 className="font-display text-xl font-bold mb-3">
                What is in the bottle
              </h2>
              <IngredientList slug="immunity-shot" />
            </>
          )}
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold mb-6">Pick your pack</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="text-inkSoft">
                <th className="py-2">Pack</th>
                <th className="py-2">Price</th>
                <th className="py-2">Per bottle</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((v) => (
                <tr key={v.sku} className="border-t border-ink/10">
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
            Serve it cold. Drink it on its own, in small sips or in one go,
            the way you like.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">
            Keeping it fresh
          </h2>
          <p className="text-inkSoft">{site.freshnessLine}</p>
        </div>
      </section>

      {site.nafdacNumber && (
        <p className="mt-10 text-sm text-inkSoft">
          NAFDAC registration number: {site.nafdacNumber}
        </p>
      )}

      <section className="mt-10 text-center">
        <WhatsAppButton message={productAskMessage(product.name)} size="lg">
          Ask us anything on WhatsApp
        </WhatsAppButton>
      </section>
    </article>
  );
}
