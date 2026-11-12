import type { Metadata } from "next";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { findVariant } from "@/data/catalog";
import { formatNaira } from "@/lib/money";
import { resolveTemplates } from "@/lib/utils";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "Questions about Unique Tasty drinks",
  description:
    "Shelf life, storage, ingredients, delivery, payment and bulk orders, answered in plain words.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  const tpl: Record<string, string> = {
    "site.whatsappDisplay": site.whatsappDisplay,
    "site.nafdacNumber": site.nafdacNumber || "pending",
    "price:ELX-250-1": formatNaira(findVariant("ELX-250-1")!.variant.priceKobo),
    "price:ELX-500-1": formatNaira(findVariant("ELX-500-1")!.variant.priceKobo),
    "price:SHT-1": formatNaira(findVariant("SHT-1")!.variant.priceKobo),
  };
  const items = faq.map((i) => ({ q: i.q, a: resolveTemplates(i.a, tpl) }));

  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <JsonLd data={faqLd(items)} />
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-10">
        Frequently asked
      </h1>
      <Accordion items={items} />
    </section>
  );
}
