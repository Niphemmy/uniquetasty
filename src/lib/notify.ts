import { formatNaira } from "@/lib/money";

export async function alertOwner(o: {
  reference: string;
  customerName: string;
  phone: string;
  lines: { name: string; qty: number; unitKobo: number }[];
  totalKobo: number;
  deliveryFeePending: boolean;
  fulfilment: string;
  address?: string | null;
  notes?: string | null;
}) {
  const items = o.lines.map((l) => `${l.qty} x ${l.name}`).join(", ");
  const body = [
    `New paid order ${o.reference}`,
    `${o.customerName}, ${o.phone}`,
    items,
    `Total ${formatNaira(o.totalKobo)}${o.deliveryFeePending ? " (delivery fee to quote)" : ""}`,
    o.fulfilment === "delivery" ? `Deliver to: ${o.address}` : "Pickup",
    o.notes ? `Notes: ${o.notes}` : "",
    `Message buyer: https://wa.me/${o.phone}?text=${encodeURIComponent(
      `Hello ${o.customerName}, this is Unique Tasty. We received your order ${o.reference}.`
    )}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!process.env.RESEND_API_KEY || !process.env.OWNER_ALERT_EMAIL) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "orders@uniquetasty.com.ng",
      to: [process.env.OWNER_ALERT_EMAIL],
      subject: `Paid order ${o.reference}, ${formatNaira(o.totalKobo)}`,
      text: body,
    }),
  }).catch(() => {});
}

export async function buyerReceipt(o: {
  reference: string;
  customerName: string;
  email: string;
  totalKobo: number;
  lines: { name: string; qty: number }[];
  whatsappDisplay: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  const items = o.lines.map((l) => `${l.qty} x ${l.name}`).join(", ");
  const text = `Hello ${o.customerName}, we received your payment of ${formatNaira(o.totalKobo)} for order ${o.reference}. ${items}. We will confirm pickup or delivery with you on WhatsApp. Questions? Reply to this email or message us on WhatsApp ${o.whatsappDisplay}. Thank you for choosing Unique Tasty.`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "orders@uniquetasty.com.ng",
      to: [o.email],
      subject: `Your Unique Tasty order ${o.reference}`,
      text,
    }),
  }).catch(() => {});
}
