"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, readUtm } from "@/components/cart/CartProvider";
import { findBundle, findVariant } from "@/data/catalog";
import { zones } from "@/data/delivery";
import { formatNaira } from "@/lib/money";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { quoteMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const phoneRe = /^(\+234|234|0)[789][01]\d{8}$/;

export function CheckoutForm() {
  const router = useRouter();
  const { state } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    fulfilment: "pickup" as "pickup" | "delivery",
    zoneId: "ibadan-central",
    address: "",
    notes: "",
  });

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
        if (b) return { sku, qty, name: b.name, unitKobo: b.offerPriceKobo };
        return null;
      })
      .filter((l): l is NonNullable<typeof l> => Boolean(l));
  }, [state]);

  const productsKobo = lines.reduce((s, l) => s + l.unitKobo * l.qty, 0);
  const selectedZone = zones.find((z) => z.id === form.zoneId);
  const deliveryPending =
    form.fulfilment === "delivery" && selectedZone?.feeKobo === null;
  const deliveryKobo =
    form.fulfilment === "delivery" && selectedZone?.feeKobo
      ? selectedZone.feeKobo
      : 0;
  const totalKobo = productsKobo + deliveryKobo;
  const overLimit = totalKobo > site.orderLimits.onlineMaxNaira * 100;

  const summary = lines.map((l) => `${l.qty} x ${l.name}`).join(", ");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!phoneRe.test(form.phone.trim())) {
      setError("Enter a Nigerian phone number.");
      return;
    }
    if (form.fulfilment === "delivery" && form.address.trim().length < 8) {
      setError("Add your full delivery address.");
      return;
    }

    setSubmitting(true);
    try {
      track("begin_checkout", {
        value: totalKobo / 100,
        items: lines.map((l) => ({
          sku: l.sku,
          name: l.name,
          price: l.unitKobo / 100,
          qty: l.qty,
        })),
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: Object.entries(state).map(([sku, qty]) => ({ sku, qty })),
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          fulfilment: form.fulfilment,
          zoneId: form.fulfilment === "delivery" ? form.zoneId : undefined,
          address: form.fulfilment === "delivery" ? form.address.trim() : undefined,
          notes: form.notes.trim() || undefined,
          utm: readUtm(),
        }),
      });

      if (res.status === 422) {
        setError("This order is above ₦50,000. Message us for a quote.");
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setError("We could not start your payment. Please try again, or order on WhatsApp.");
        setSubmitting(false);
        return;
      }

      const data = (await res.json()) as { authorizationUrl: string };
      router.push(data.authorizationUrl);
    } catch {
      setError("We could not start your payment. Please try again, or order on WhatsApp.");
      setSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-4">
        <Field id="customerName" label="Your name">
          <Input
            id="customerName"
            required
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
        </Field>

        <Field id="phone" label="Phone number" hint="0803 000 0000">
          <Input
            id="phone"
            required
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>

        <Field id="email" label="Email (optional)" hint="For a payment receipt.">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>

        <Field id="fulfilment" label="Pickup or delivery">
          <Select
            id="fulfilment"
            value={form.fulfilment}
            onChange={(e) =>
              setForm({ ...form, fulfilment: e.target.value as "pickup" | "delivery" })
            }
          >
            <option value="pickup">Pickup (free)</option>
            <option value="delivery">Delivery</option>
          </Select>
        </Field>

        {form.fulfilment === "delivery" && (
          <>
            <Field id="zoneId" label="Delivery area">
              <Select
                id="zoneId"
                value={form.zoneId}
                onChange={(e) => setForm({ ...form, zoneId: e.target.value })}
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              id="address"
              label="Delivery address"
              hint="House number, street and area."
            >
              <Input
                id="address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Field>
          </>
        )}

        <Field id="notes" label="Notes (optional)" hint="Anything we should know.">
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </Field>
      </div>

      <aside className="rounded-3xl border border-ink/10 bg-paper p-6 h-max sticky top-20 space-y-4">
        <div className="space-y-2 text-sm">
          {lines.map((l) => (
            <div key={l.sku} className="flex justify-between">
              <span>
                {l.qty} x {l.name}
              </span>
              <span>{formatNaira(l.unitKobo * l.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-ink/10 pt-3">
            <span className="text-inkSoft">Products</span>
            <span>{formatNaira(productsKobo)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-inkSoft">Delivery</span>
            <span>
              {form.fulfilment === "pickup"
                ? "Pickup, free"
                : deliveryPending
                ? "Confirmed on WhatsApp"
                : formatNaira(deliveryKobo)}
            </span>
          </div>
          <div className="flex justify-between text-base pt-3 border-t border-ink/10">
            <span className="font-semibold">Total (now)</span>
            <span className="font-bold">
              {formatNaira(productsKobo + deliveryKobo)}
            </span>
          </div>
        </div>

        {deliveryPending && (
          <p className="text-xs text-brown">
            We confirm your delivery fee on WhatsApp. You pay for the drinks now.
          </p>
        )}

        {overLimit ? (
          <WhatsAppButton message={quoteMessage(summary)} size="lg">
            Get a quote on WhatsApp
          </WhatsAppButton>
        ) : (
          <Button type="submit" disabled={submitting} size="lg" className="w-full">
            {submitting ? "Taking you to Paystack" : "Pay with Paystack"}
          </Button>
        )}

        {error && <p className="text-sm text-red">{error}</p>}

        <p className="text-xs text-inkSoft text-center">
          Your card details go to Paystack. We never see them.
        </p>

        <div className="text-center">
          <WhatsAppButton message={quoteMessage(summary)} size="md">
            Prefer to order on WhatsApp?
          </WhatsAppButton>
        </div>
      </aside>
    </form>
  );
}
