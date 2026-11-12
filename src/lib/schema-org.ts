import { site } from "@/data/site";
import { products, type Product } from "@/data/catalog";

const url = site.url;
const abs = (p: string) => (p.startsWith("http") ? p : `${url}${p}`);

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${url}/#organization`,
  name: site.name,
  url,
  logo: abs("/images/brand/logo.png"),
  foundingDate: site.foundedDate,
  founder: { "@type": "Person", name: site.founder.name },
  sameAs: Object.values(site.social).filter(Boolean),
  identifier: site.nafdacNumber
    ? {
        "@type": "PropertyValue",
        name: "NAFDAC registration number",
        value: site.nafdacNumber,
      }
    : undefined,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${site.whatsappNumber}`,
      availableLanguage: ["English", "Yoruba"],
    },
  ],
});

export const localBusinessLd = () =>
  site.locations.map((l) => ({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${url}/#${l.id}`,
    name: `${site.name}, ${l.label}`,
    parentOrganization: { "@id": `${url}/#organization` },
    url,
    telephone: `+${site.whatsappNumber}`,
    image: abs("/images/brand/og-default.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: l.street,
      addressLocality: "Ibadan",
      addressRegion: "Oyo",
      addressCountry: "NG",
    },
    openingHours: l.hours || undefined,
    servesCuisine: "Fresh drinks",
    priceRange: "₦₦",
    areaServed: ["Ibadan", "Lagos", "Ogun State"],
  }));

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${url}/${p.slug}#product`,
  name: p.name,
  brand: { "@type": "Brand", name: site.name },
  description: p.taste,
  image: p.variants.map((v) => abs(v.image)),
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Ingredients",
      value: p.ingredients.join(", "),
    },
    ...(site.nafdacNumber
      ? [
          {
            "@type": "PropertyValue",
            name: "NAFDAC registration number",
            value: site.nafdacNumber,
          },
        ]
      : []),
  ],
  offers: p.variants.map((v) => ({
    "@type": "Offer",
    sku: v.sku,
    name: `${p.name} ${v.size} ${v.pack === 1 ? "single" : v.pack + "-pack"}`,
    url: abs(`/${p.slug}`),
    priceCurrency: "NGN",
    price: (v.priceKobo / 100).toFixed(2),
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${url}/#organization` },
  })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export const articleLd = (a: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  dateModified: a.updated ?? a.date,
  image: a.image ? abs(a.image) : abs("/images/brand/og-default.jpg"),
  author: { "@type": "Person", name: site.founder.name },
  publisher: { "@id": `${url}/#organization` },
  mainEntityOfPage: abs(`/blog/${a.slug}`),
});

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${url}/#website`,
  url,
  name: site.name,
  publisher: { "@id": `${url}/#organization` },
});
