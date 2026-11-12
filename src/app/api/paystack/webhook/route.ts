import { NextResponse } from "next/server";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { isValidSignature } from "@/lib/paystack";
import { alertOwner, buyerReceipt } from "@/lib/notify";
import { site } from "@/data/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const raw = await req.text();
  if (!isValidSignature(raw, req.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const event = JSON.parse(raw) as {
    event: string;
    data: {
      status: string;
      reference: string;
      amount: number;
      currency: string;
      channel: string;
      id: number;
      paid_at: string | null;
    };
  };

  if (event.event !== "charge.success") return NextResponse.json({ ok: true });

  const d = event.data;
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.reference, d.reference))
    .limit(1);

  if (!order) return NextResponse.json({ ok: true });

  if (
    d.status !== "success" ||
    d.currency !== "NGN" ||
    d.amount !== order.totalKobo
  ) {
    await db
      .update(orders)
      .set({ status: "failed" })
      .where(and(eq(orders.id, order.id), ne(orders.status, "paid")));
    return NextResponse.json({ ok: true });
  }

  const updated = await db
    .update(orders)
    .set({
      status: "paid",
      paidAt: new Date(d.paid_at ?? Date.now()),
      paystackTransactionId: String(d.id),
      channel: d.channel,
    })
    .where(and(eq(orders.id, order.id), ne(orders.status, "paid")))
    .returning();

  if (updated.length) {
    const o = updated[0];
    await alertOwner({
      reference: o.reference,
      customerName: o.customerName,
      phone: o.phone,
      lines: o.lines as { name: string; qty: number; unitKobo: number }[],
      totalKobo: o.totalKobo,
      deliveryFeePending: o.deliveryFeePending,
      fulfilment: o.fulfilment,
      address: o.address,
      notes: o.notes,
    });
    if (o.email) {
      await buyerReceipt({
        reference: o.reference,
        customerName: o.customerName,
        email: o.email,
        totalKobo: o.totalKobo,
        lines: o.lines as { name: string; qty: number }[],
        whatsappDisplay: site.whatsappDisplay,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
