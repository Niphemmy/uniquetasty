import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Freshness } from "@/components/product/Freshness";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/data/site";
import { products, findVariant } from "@/data/catalog";
import { formatNaira, perBottle } from "@/lib/money";
import { testimonials } from "@/data/testimonials";
import { faq } from "@/data/faq";
import { resolveTemplates } from "@/lib/utils";

export default function HomePage() {
  const elx250_1 = findVariant("ELX-250-1")!.variant.priceKobo;
  const elx250_6 = findVariant("ELX-250-6")!.variant.priceKobo;
  const elx250_12 = findVariant("ELX-250-12")!.variant.priceKobo;
  const sht_1 = findVariant("SHT-1")!.variant.priceKobo;

  const tplValues: Record<string, string> = {
    "price:ELX-250-1": formatNaira(elx250_1),
    "price:ELX-500-1": formatNaira(findVariant("ELX-500-1")!.variant.priceKobo),
    "price:SHT-1": formatNaira(sht_1),
    "site.whatsappDisplay": site.whatsappDisplay,
    "site.nafdacNumber": site.nafdacNumber || "pending",
  };

  const fiveFaq = faq
    .filter((i) => i.tags.includes("all"))
    .slice(0, 5)
    .map((i) => ({
      q: i.q,
      a: resolveTemplates(i.a, tplValues),
    }));

  const consented = testimonials.filter((t) => t.consented);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-wrap px-4 pt-10 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs uppercase tracking-wider text-red font-bold mb-3">
            Old Bodija, Ibadan
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
            Small-batch drinks from Old Bodija, Ibadan
          </h1>
          <p className="text-lg text-inkSoft mb-6">
            Beetroot, hibiscus, pineapple, ginger and more. Made by{" "}
            {site.founder.name}. 250ml from {formatNaira(elx250_1)}. Pay online, then
            pick up or get it delivered.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/store" variant="primary" size="lg">
              Shop the drinks
            </ButtonLink>
            <WhatsAppButton
              message="Hello Unique Tasty, I'd like to place an order."
              size="lg"
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>
          <div className="mt-4">
            <Freshness />
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl bg-paper overflow-hidden">
          <Image
            src="/images/founder/portrait.jpg"
            alt={`${site.founder.name} holding a bottle at the Old Bodija kitchen`}
            fill
            sizes="(min-width: 768px) 30rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Quick facts (definition list for crawlers) */}
      <section className="mx-auto max-w-wrap px-4 py-10">
        <div className="rounded-3xl bg-paper p-6 md:p-10">
          <h2 className="font-display text-2xl font-bold mb-5">Quick facts</h2>
          <dl className="grid md:grid-cols-2 gap-4 text-sm">
            <Pair t="Business" v="Unique Tasty Naturals" />
            <Pair t="Founder" v={site.founder.name} />
            <Pair t="Started" v="1 February 2026" />
            <Pair t="Made in" v="Old Bodija, Ibadan, Oyo State" />
            <Pair
              t="Pickup"
              v="Old Bodija and Akobo Ojurin (hours in Find us)"
            />
            <Pair
              t="Prices"
              v={`Elixir 250ml from ${formatNaira(elx250_1)}, Immunity Shot from ${formatNaira(sht_1)}`}
            />
            <Pair
              t="Payment"
              v="Card or bank transfer on Paystack, then confirm on WhatsApp"
            />
            <Pair t="Delivery" v="Ibadan, Lagos and Ogun State" />
            {site.nafdacNumber && <Pair t="NAFDAC" v={site.nafdacNumber} />}
          </dl>
        </div>
      </section>

      {/* Two drinks */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <h2 className="font-display text-3xl font-bold text-center mb-10">
          Two drinks. Pick your bottle.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => {
            const starting = p.variants[0].priceKobo;
            const blurb =
              p.slug === "elixir"
                ? "Beetroot, hibiscus, pineapple, cucumber, lemon, ginger, cinnamon and cloves."
                : "A small bottle from our Old Bodija kitchen. See the full ingredient list.";
            return (
              <div
                key={p.slug}
                className="rounded-3xl border border-ink/10 bg-cream p-6 flex flex-col"
              >
                <h3 className="font-display text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-inkSoft mb-5">{blurb}</p>
                <div className="text-xl font-bold mb-5">
                  From {formatNaira(starting)}
                </div>
                <ButtonLink href={`/${p.slug}`} className="self-start">
                  See the {p.slug === "elixir" ? "Elixir" : "Shot"}
                </ButtonLink>
              </div>
            );
          })}
        </div>
      </section>

      {/* How buying works */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <h2 className="font-display text-3xl font-bold text-center mb-10">
          Order in three steps
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Choose your bottles. Singles, 6-packs or 12-packs.",
            "Pay on the site. Card or bank transfer, through Paystack.",
            "Message us on WhatsApp. Your order is already written out. We confirm and arrange pickup or delivery.",
          ].map((t, i) => (
            <div key={i} className="rounded-3xl bg-paper p-6">
              <div className="w-10 h-10 rounded-full bg-red text-white font-bold inline-flex items-center justify-center mb-4">
                {i + 1}
              </div>
              <p>{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packs */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-4">
              Buy a pack. Pay less per bottle.
            </h2>
            <p className="text-inkSoft mb-6">
              A 6-pack of Elixir 250ml is {formatNaira(elx250_6)},{" "}
              {perBottle(elx250_6, 6)} a bottle. A 12-pack is{" "}
              {formatNaira(elx250_12)}, {perBottle(elx250_12, 12)} a bottle.
            </p>
            <ButtonLink href="/store">See all packs</ButtonLink>
          </div>
          <div className="rounded-3xl bg-paper aspect-[4/3] relative overflow-hidden">
            <Image
              src="/images/products/elixir-6pack.jpg"
              alt="A 6-pack of Unique Elixir 250ml bottles"
              fill
              sizes="(min-width: 768px) 30rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Maker */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square rounded-3xl bg-paper overflow-hidden order-2 md:order-1">
            <Image
              src="/images/founder/portrait.jpg"
              alt={`${site.founder.name}, founder`}
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl font-bold mb-4">
              Meet the person who makes it
            </h2>
            <p className="text-inkSoft mb-6">
              {site.founder.name} started Unique Tasty on 1 February 2026 in
              Old Bodija. She makes every batch. When you message us, you
              reach her team.
            </p>
            <ButtonLink href="/our-story" variant="secondary">
              Read her story
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {consented.length > 0 && (
        <section className="mx-auto max-w-wrap px-4 py-14">
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            What buyers say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {consented.map((t) => (
              <figure
                key={t.name}
                className="rounded-3xl border border-ink/10 bg-cream p-6"
              >
                <blockquote className="text-ink">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm text-inkSoft">
                  {t.name}, {t.area}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Offices, events, gifts */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="rounded-3xl bg-brown text-cream p-8 md:p-12 flex flex-wrap items-center gap-8 justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold mb-3">
              Drinks for your office, event or gift
            </h2>
            <p className="max-w-xl">
              12-packs, hampers and monthly supply. Tell us what you need on
              WhatsApp and we reply with a quote within 1 working day.
            </p>
          </div>
          <ButtonLink href="/custom-order" variant="primary" size="lg">
            Ask for a quote
          </ButtonLink>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <h2 className="font-display text-3xl font-bold text-center mb-10">
          Questions
        </h2>
        <Accordion items={fiveFaq} />
        <div className="text-center mt-6">
          <Link href="/faq" className="underline underline-offset-2 text-sm">
            See all questions
          </Link>
        </div>
      </section>

      {/* Closing band */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="rounded-3xl bg-ink text-cream p-10 text-center">
          <h2 className="font-display text-3xl font-bold mb-5">
            Taste it this week.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <ButtonLink href="/store" variant="primary" size="lg">
              Shop the drinks
            </ButtonLink>
            <WhatsAppButton
              message="Hello Unique Tasty, I'd like to place an order."
              size="lg"
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}

function Pair({ t, v }: { t: string; v: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs uppercase tracking-wider text-inkSoft">{t}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}
