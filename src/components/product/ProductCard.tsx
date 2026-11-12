"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { type Product } from "@/data/catalog";
import { formatNaira, perBottle } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function ProductCard({ product }: { product: Product }) {
  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const [size, setSize] = useState<Product["variants"][number]["size"]>(sizes[0]);
  const packs = product.variants.filter((v) => v.size === size);
  const [sku, setSku] = useState(packs[0].sku);
  const variant = packs.find((p) => p.sku === sku) ?? packs[0];
  const { add } = useCart();

  const onSize = (s: Product["variants"][number]["size"]) => {
    setSize(s);
    const first = product.variants.find((v) => v.size === s);
    if (first) setSku(first.sku);
  };

  return (
    <article className="rounded-3xl border border-ink/10 bg-cream overflow-hidden flex flex-col">
      <div className="relative aspect-[4/5] bg-paper">
        <Image
          src={variant.image}
          alt={`${product.name} ${variant.size} ${variant.pack === 1 ? "single" : variant.pack + "-pack"}`}
          fill
          sizes="(min-width: 768px) 24rem, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display text-xl font-bold">{product.name}</h3>

        {sizes.length > 1 && (
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => onSize(s)}
                className={
                  "rounded-full px-3 py-1 text-xs font-semibold " +
                  (s === size
                    ? "bg-ink text-cream"
                    : "bg-ink/5 text-ink hover:bg-ink/10")
                }
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {packs.map((v) => (
            <button
              key={v.sku}
              onClick={() => setSku(v.sku)}
              className={
                "rounded-full px-3 py-1 text-xs font-semibold " +
                (v.sku === sku
                  ? "bg-red text-white"
                  : "bg-ink/5 text-ink hover:bg-ink/10")
              }
            >
              {v.pack === 1 ? "Single" : `${v.pack}-pack`}
            </button>
          ))}
        </div>

        <div className="mt-1">
          <div className="text-2xl font-bold text-ink">
            {formatNaira(variant.priceKobo)}
          </div>
          {variant.pack > 1 && (
            <div className="text-xs text-inkSoft">
              {perBottle(variant.priceKobo, variant.pack)} per bottle
            </div>
          )}
        </div>

        <Button
          onClick={() => {
            add(variant.sku, 1);
            track("add_to_cart", {
              value: variant.priceKobo / 100,
              items: [
                {
                  sku: variant.sku,
                  name: `${product.name} ${variant.size} ${variant.pack}-pack`,
                  price: variant.priceKobo / 100,
                  qty: 1,
                },
              ],
            });
          }}
          className="mt-auto"
        >
          Add to cart
        </Button>
      </div>
    </article>
  );
}
