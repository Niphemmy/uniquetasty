// Site-wide config. Fields marked FROM_CLIENT come from file 08.
// Preflight fails the production build when any required one is missing.

export const site = {
  name: "Unique Tasty Naturals",
  shortName: "Unique Tasty",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uniquetasty.com.ng",
  tagline: "Small-batch drinks from Old Bodija, Ibadan",
  foundedDate: "2026-02-01",
  founder: { name: "Oluwadamilola Ojo" },

  whatsappNumber: "2347085075597",
  whatsappDisplay: "070 8507 5597",
  phoneDisplay: "", // FROM_CLIENT, item 3

  nafdacNumber: "", // FROM_CLIENT, item 1. Preflight blocks production without it.

  freshnessLine:
    "Made in small batches in Old Bodija. Kept chilled. Best within 3 to 4 weeks.",

  locations: [
    {
      id: "old-bodija",
      label: "Production, Old Bodija",
      street: "4A Awolowo Avenue, Old Bodija",
      locality: "Ibadan",
      region: "Oyo State",
      country: "NG",
      mapUrl: "",
      pickup: true,
      hours: "", // FROM_CLIENT, item 2
    },
    {
      id: "akobo-ojurin",
      label: "Akobo Ojurin",
      street: "Akobo Ojurin",
      locality: "Ibadan",
      region: "Oyo State",
      country: "NG",
      mapUrl: "",
      pickup: true,
      hours: "", // FROM_CLIENT, item 2
    },
  ],

  social: {
    instagram: "https://instagram.com/uniquetastynaturals",
    tiktok: "",   // FROM_CLIENT, item 20 (no TikTok in the old repo)
    facebook: "", // FROM_CLIENT, item 20 (no Facebook in the old repo)
  },

  processors: ["Paystack", "Vercel", "Neon", "Resend", "Google", "Meta", "TikTok"],

  orderLimits: {
    onlineMaxNaira: 50_000,
  },
} as const;

export type SiteConfig = typeof site;
