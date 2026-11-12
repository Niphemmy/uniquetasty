// Product catalog, single source of truth for prices and label copy.
// Prices in kobo to avoid float errors. ₦ amounts come from js/cart.js in
// the legacy repo, verified 2026-11-12.

export type PackSize = 1 | 6 | 12;

export type Variant = {
  sku: string;
  size: "250ml" | "500ml";
  pack: PackSize;
  priceKobo: number;
  image: string;
};

export type Product = {
  slug: "elixir" | "immunity-shot";
  name: string;
  status: "live" | "proposed";
  ingredients: string[];
  taste: string;
  variants: Variant[];
};

const naira = (n: number) => n * 100;

export const products: Product[] = [
  {
    slug: "elixir",
    name: "Unique Elixir",
    status: "live",
    // Ingredient row from the legacy home page (eight items). The stat tile
    // on the old site said "9" because of a stale data-count. Confirm against
    // the printed label (file 08 item 5) and update here.
    ingredients: [
      "Beetroot",
      "Hibiscus",
      "Pineapple",
      "Cucumber",
      "Lemon",
      "Ginger",
      "Cinnamon",
      "Cloves",
    ],
    taste: "", // FROM_CLIENT, item 6. Draft is in src/content/elixir.ts.
    variants: [
      { sku: "ELX-250-1",  size: "250ml", pack: 1,  priceKobo: naira(950),   image: "/images/products/ELX-250-1.jpg" },
      { sku: "ELX-250-6",  size: "250ml", pack: 6,  priceKobo: naira(5200),  image: "/images/products/ELX-250-6.jpg" },
      { sku: "ELX-250-12", size: "250ml", pack: 12, priceKobo: naira(10000), image: "/images/products/ELX-250-12.jpg" },
      { sku: "ELX-500-1",  size: "500ml", pack: 1,  priceKobo: naira(1850),  image: "/images/products/ELX-500-1.jpg" },
      { sku: "ELX-500-6",  size: "500ml", pack: 6,  priceKobo: naira(10500), image: "/images/products/ELX-500-6.jpg" },
      { sku: "ELX-500-12", size: "500ml", pack: 12, priceKobo: naira(20000), image: "/images/products/ELX-500-12.jpg" },
    ],
  },
  {
    slug: "immunity-shot",
    name: "Immunity Shot",
    status: "live",
    // Confirmed from the legacy home page ingredient row. Still awaiting the
    // label photo so order and spelling match the bottle (file 08 item 4).
    ingredients: [
      "Ginger",
      "Turmeric",
      "Lemon",
      "Black Pepper",
      "Honey",
    ],
    taste: "", // FROM_CLIENT, item 4
    variants: [
      // Bottle size is not on the legacy site. Assumed 250ml, FROM_CLIENT to confirm.
      { sku: "SHT-1",  size: "250ml", pack: 1,  priceKobo: naira(1000),  image: "/images/products/SHT-1.jpg" },
      { sku: "SHT-6",  size: "250ml", pack: 6,  priceKobo: naira(5400),  image: "/images/products/SHT-6.jpg" },
      { sku: "SHT-12", size: "250ml", pack: 12, priceKobo: naira(10500), image: "/images/products/SHT-12.jpg" },
    ],
  },
];

export type Bundle = {
  slug: string;
  name: string;
  status: "live" | "proposed";
  items: { sku: string; qty: number }[];
  listPriceKobo: number;
  offerPriceKobo: number;
  note?: string;
};

export const bundles: Bundle[] = [
  {
    slug: "morning-pair",
    name: "Morning Pair",
    status: "proposed",
    items: [{ sku: "ELX-250-1", qty: 1 }, { sku: "SHT-1", qty: 1 }],
    listPriceKobo: naira(1950),
    offerPriceKobo: naira(1800),
  },
  {
    slug: "mixed-six",
    name: "Mixed Six",
    status: "proposed",
    items: [{ sku: "ELX-250-1", qty: 3 }, { sku: "SHT-1", qty: 3 }],
    listPriceKobo: naira(5850),
    offerPriceKobo: naira(5300),
  },
  {
    slug: "office-fridge",
    name: "Office Fridge",
    status: "proposed",
    items: [{ sku: "ELX-500-1", qty: 12 }, { sku: "SHT-1", qty: 12 }],
    listPriceKobo: naira(30500),
    offerPriceKobo: naira(29000),
    note: "Above the online limit with delivery. Route to WhatsApp if the cart exceeds the limit.",
  },
  {
    slug: "december-hamper",
    name: "December Hamper",
    status: "proposed",
    items: [{ sku: "ELX-500-1", qty: 6 }, { sku: "SHT-1", qty: 6 }],
    listPriceKobo: naira(15900),
    offerPriceKobo: naira(17500),
    note: "Offer price includes a gift box assumed at ₦1,600.",
  },
];

export function findVariant(sku: string) {
  for (const p of products) {
    if (p.status !== "live") continue;
    const v = p.variants.find((x) => x.sku === sku);
    if (v) return { product: p, variant: v };
  }
  return null;
}

export function findBundle(slug: string) {
  return bundles.find((b) => b.status === "live" && b.slug === slug) ?? null;
}

export function productBySlug(slug: Product["slug"]) {
  return products.find((p) => p.slug === slug);
}
