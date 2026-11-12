import { products, bundles } from "@/data/catalog";
import { zones, pickup } from "@/data/delivery";
import { site } from "@/data/site";

export type CartInput = { sku: string; qty: number }[];

export type PricedLine = {
  sku: string;
  name: string;
  qty: number;
  unitKobo: number;
};

export type Priced = {
  lines: PricedLine[];
  productsKobo: number;
  deliveryKobo: number;
  deliveryFeePending: boolean;
  totalKobo: number;
  overOnlineLimit: boolean;
};

export function priceCart(
  cart: CartInput,
  fulfilment: "pickup" | "delivery",
  zoneId?: string
): Priced {
  const lines: PricedLine[] = [];

  for (const { sku, qty } of cart) {
    if (!Number.isInteger(qty) || qty < 1 || qty > 50) throw new Error("Bad quantity");

    let name = "";
    let unitKobo = 0;

    const variantHit = products
      .flatMap((p) =>
        p.status === "live" ? p.variants.map((v) => ({ p, v })) : []
      )
      .find((x) => x.v.sku === sku);

    if (variantHit) {
      const packText =
        variantHit.v.pack === 1 ? "single" : `${variantHit.v.pack}-pack`;
      name = `${variantHit.p.name} ${variantHit.v.size} ${packText}`;
      unitKobo = variantHit.v.priceKobo;
    } else {
      const b = bundles.find((x) => x.status === "live" && x.slug === sku);
      if (!b) throw new Error("Unknown item");
      name = b.name;
      unitKobo = b.offerPriceKobo;
    }

    lines.push({ sku, name, qty, unitKobo });
  }

  if (!lines.length) throw new Error("Empty cart");

  const productsKobo = lines.reduce((s, l) => s + l.unitKobo * l.qty, 0);

  let deliveryKobo = 0;
  let deliveryFeePending = false;

  if (fulfilment === "delivery") {
    const z = zones.find((x) => x.id === zoneId);
    if (!z) throw new Error("Choose a delivery area");
    if (z.feeKobo === null) deliveryFeePending = true;
    else deliveryKobo = z.feeKobo;
  } else {
    deliveryKobo = pickup.feeKobo;
  }

  const totalKobo = productsKobo + deliveryKobo;

  return {
    lines,
    productsKobo,
    deliveryKobo,
    deliveryFeePending,
    totalKobo,
    overOnlineLimit: totalKobo > site.orderLimits.onlineMaxNaira * 100,
  };
}
