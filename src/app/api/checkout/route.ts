import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { priceCart } from "@/lib/pricing";
import { initializeTransaction } from "@/lib/paystack";
import { site } from "@/data/site";

export const runtime = "nodejs";

const phoneRe = /^(\+234|234|0)[789][01]\d{8}$/;
const normalisePhone = (p: string) => "234" + p.replace(/^(\+234|234|0)/, "");

const Body = z.object({
  cart: z
    .array(
      z.object({ sku: z.string().min(1), qty: z.number().int().min(1).max(50) })
    )
    .min(1)
    .max(20),
  customerName: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(phoneRe, "Enter a Nigerian phone number"),
  email: z.string().trim().email().optional().or(z.literal("")),
  fulfilment: z.enum(["pickup", "delivery"]),
  zoneId: z.string().optional(),
  address: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(300).optional(),
  utm: z.record(z.string()).optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const b = parsed.data;

  if (b.fulfilment === "delivery" && (!b.address || b.address.length < 8)) {
    return NextResponse.json(
      { error: "Add your delivery address" },
      { status: 400 }
    );
  }

  let priced;
  try {
    priced = priceCart(b.cart, b.fulfilment, b.zoneId);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }

  if (priced.overOnlineLimit) {
    return NextResponse.json(
      {
        error: "over_limit",
        message: "Orders this size go to WhatsApp for a quote.",
      },
      { status: 422 }
    );
  }

  const reference =
    "UTN-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    crypto.randomBytes(3).toString("hex").toUpperCase();

  const phone = normalisePhone(b.phone);
  const email = b.email || `${phone}@orders.uniquetasty.com.ng`;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";
  const ua = req.headers.get("user-agent") ?? "";
  const trackingConsent = /ut_consent=granted/.test(req.headers.get("cookie") ?? "");

  await db.insert(orders).values({
    reference,
    status: "pending",
    customerName: b.customerName,
    phone,
    email: b.email || null,
    fulfilment: b.fulfilment,
    zoneId: b.zoneId ?? null,
    address: b.address ?? null,
    notes: b.notes ?? null,
    lines: priced.lines,
    productsKobo: priced.productsKobo,
    deliveryKobo: priced.deliveryKobo,
    deliveryFeePending: priced.deliveryFeePending,
    totalKobo: priced.totalKobo,
    utm: b.utm ?? null,
    ip,
    userAgent: ua,
    trackingConsent,
  });

  try {
    const init = await initializeTransaction({
      email,
      amountKobo: priced.totalKobo,
      reference,
      callbackUrl: `${site.url}/order/${reference}`,
      metadata: {
        reference,
        customerName: b.customerName,
        phone,
        fulfilment: b.fulfilment,
      },
    });
    return NextResponse.json({
      authorizationUrl: init.authorization_url,
      reference,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Payment could not start. Please try again or order on WhatsApp.",
      },
      { status: 502 }
    );
  }
}
