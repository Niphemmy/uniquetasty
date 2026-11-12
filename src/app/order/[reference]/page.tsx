import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { verifyTransaction } from "@/lib/paystack";
import { orderMessage, waLink } from "@/lib/whatsapp";
import { formatNaira } from "@/lib/money";
import { ButtonLink } from "@/components/ui/Button";
import { PurchaseEvent } from "@/components/analytics/PurchaseEvent";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: { index: false },
  title: "Your order",
};

type Params = { reference: string };

export default async function OrderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { reference } = await params;

  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.reference, reference))
    .limit(1);
  let order = rows[0];

  if (!order) {
    return (
      <section className="mx-auto max-w-wrap px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-5">
          We could not find that order.
        </h1>
        <p className="text-inkSoft">Message us on WhatsApp and we will help.</p>
      </section>
    );
  }

  if (order.status === "pending") {
    try {
      const v = await verifyTransaction(reference);
      if (
        v.status === "success" &&
        v.currency === "NGN" &&
        v.amount === order.totalKobo
      ) {
        const updated = await db
          .update(orders)
          .set({
            status: "paid",
            paidAt: new Date(v.paid_at ?? Date.now()),
            paystackTransactionId: String(v.id),
            channel: v.channel,
          })
          .where(eq(orders.id, order.id))
          .returning();
        if (updated[0]) order = updated[0];
      }
    } catch {}
  }

  const paid = order.status === "paid";
  const text = orderMessage({
    reference: order.reference,
    customerName: order.customerName,
    fulfilment: order.fulfilment,
    address: order.address,
    lines: order.lines as {
      name: string;
      qty: number;
      unitKobo: number;
    }[],
    totalKobo: order.totalKobo,
    deliveryFeePending: order.deliveryFeePending,
    paid,
  });

  const items = (order.lines as { name: string; qty: number; unitKobo: number; sku?: string }[])
    .map((l) => ({
      sku: l.sku ?? l.name,
      name: l.name,
      price: l.unitKobo / 100,
      qty: l.qty,
    }));

  return (
    <section className="mx-auto max-w-wrap px-4 py-14 max-w-2xl">
      {paid && (
        <PurchaseEvent
          reference={order.reference}
          valueNaira={order.totalKobo / 100}
          items={items}
        />
      )}
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
        {paid
          ? "Payment received. Thank you."
          : "We are still confirming your payment"}
      </h1>
      <p className="text-inkSoft mb-6">
        Order {order.reference}. Total {formatNaira(order.totalKobo)}.
      </p>

      <ButtonLink href={waLink(text)} variant="whatsapp" size="lg">
        Send your order on WhatsApp
      </ButtonLink>

      <p className="text-sm text-inkSoft mt-6">
        {paid
          ? `Tap the button so we can confirm your order and arrange ${
              order.fulfilment === "delivery" ? "delivery" : "pickup"
            }.`
          : "If you paid, tap the button and we will check it with you."}
      </p>

      <div className="mt-8">
        <ButtonLink href="/store" variant="secondary">
          Back to the store
        </ButtonLink>
      </div>
    </section>
  );
}
