import { site } from "@/data/site";
import { formatNaira } from "@/lib/money";

export function waLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function orderMessage(o: {
  reference: string;
  customerName: string;
  fulfilment: string;
  address?: string | null;
  lines: { name: string; qty: number; unitKobo: number }[];
  totalKobo: number;
  deliveryFeePending: boolean;
  paid: boolean;
}) {
  const items = o.lines
    .map((l) => `${l.qty} x ${l.name} (${formatNaira(l.unitKobo * l.qty)})`)
    .join("\n");

  return [
    `Hello Unique Tasty, my order ${o.reference} is ${o.paid ? "paid" : "placed"}.`,
    "",
    items,
    "",
    `Total: ${formatNaira(o.totalKobo)}${o.deliveryFeePending ? " (delivery fee to confirm)" : ""}`,
    o.fulfilment === "delivery" ? `Delivery to: ${o.address ?? ""}` : "I will pick up.",
    `Name: ${o.customerName}`,
  ].join("\n");
}

export const quoteMessage = (summary: string) =>
  `Hello Unique Tasty, I would like a quote for a larger order:\n${summary}`;

export const productAskMessage = (productName: string) =>
  `Hello Unique Tasty, I want to ask about ${productName}.`;
