"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "./CartProvider";
import { findBundle, findVariant } from "@/data/catalog";
import { formatNaira } from "@/lib/money";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { quoteMessage } from "@/lib/whatsapp";

export function CartSummary() {
  const { state, set, remove } = useCart();

  const lines = useMemo(() => {
    return Object.entries(state)
      .map(([sku, qty]) => {
        const v = findVariant(sku);
        if (v) {
          return {
            sku,
            qty,
            name: `${v.product.name} ${v.variant.size} ${
              v.variant.pack === 1 ? "single" : v.variant.pack + "-pack"
            }`,
            unitKobo: v.variant.priceKobo,
          };
        }
        const b = findBundle(sku);
        if (b) {
          return { sku, qty, name: b.name, unitKobo: b.offerPriceKobo };
        }
        return null;
      })
      .filter((l): l is NonNullable<typeof l> => Boolean(l));
  }, [state]);

  const productsKobo = lines.reduce((s, l) => s + l.unitKobo * l.qty, 0);
  const overLimit = productsKobo > site.orderLimits.onlineMaxNaira * 100;

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-cream p-10 text-center">
        <p className="text-lg font-semibold mb-5">Your cart is empty.</p>
        <ButtonLink href="/store" variant="primary" size="lg">
          Shop the drinks
        </ButtonLink>
      </div>
    );
  }

  const summary = lines
    .map((l) => `${l.qty} x ${l.name}`)
    .join(", ");

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-3">
        {lines.map((l) => (
          <div
            key={l.sku}
            className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream p-4"
          >
            <div className="flex-1">
              <div className="font-semibold text-ink">{l.name}</div>
              <div className="text-xs text-inkSoft">
                {formatNaira(l.unitKobo)} each
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <button
                  onClick={() => set(l.sku, l.qty - 1)}
                  aria-label="Decrease"
                  className="w-7 h-7 rounded-full bg-ink/10 text-ink"
                >
                  −
                </button>
                <span className="w-5 text-center">{l.qty}</span>
                <button
                  onClick={() => set(l.sku, l.qty + 1)}
                  aria-label="Increase"
                  className="w-7 h-7 rounded-full bg-ink/10 text-ink"
                >
                  +
                </button>
                <button
                  onClick={() => remove(l.sku)}
                  className="ml-2 text-xs text-red underline underline-offset-2"
                >
                  remove
                </button>
              </div>
            </div>
            <div className="font-semibold text-ink">
              {formatNaira(l.unitKobo * l.qty)}
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-3xl border border-ink/10 bg-paper p-6 h-max sticky top-20">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-inkSoft">Products</span>
            <span className="font-semibold">{formatNaira(productsKobo)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-inkSoft">Delivery</span>
            <span className="text-inkSoft">Chosen at checkout</span>
          </div>
          <div className="border-t border-ink/10 pt-3 mt-3 flex justify-between text-base">
            <span className="font-semibold">Total (products)</span>
            <span className="font-bold">{formatNaira(productsKobo)}</span>
          </div>
        </div>

        {overLimit ? (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-brown">
              This order is above ₦50,000. Message us for a quote and a
              delivery price.
            </p>
            <WhatsAppButton message={quoteMessage(summary)} size="lg">
              Get a quote on WhatsApp
            </WhatsAppButton>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <ButtonLink href="/checkout" variant="primary" size="lg" className="w-full">
              Go to checkout
            </ButtonLink>
            <p className="text-xs text-inkSoft text-center">
              You pay on Paystack. We confirm on WhatsApp.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

export function AddToCartButton({ sku, label = "Add to cart" }: { sku: string; label?: string }) {
  const { add } = useCart();
  return (
    <Button onClick={() => add(sku, 1)} variant="primary">
      {label}
    </Button>
  );
}
