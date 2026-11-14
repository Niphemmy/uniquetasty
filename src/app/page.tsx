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
  const elx500_1 = findVariant("ELX-500-1")!.variant.priceKobo;
  const sht_1 = findVariant("SHT-1")!.variant.priceKobo;

  const elixir = products.find((p) => p.slug === "elixir")!;
  const shot = products.find((p) => p.slug === "immunity-shot")!;

  const tplValues: Record<string, string> = {
    "price:ELX-250-1": formatNaira(elx250_1),
    "price:ELX-500-1": formatNaira(elx500_1),
    "price:SHT-1": formatNaira(sht_1),
    "site.whatsappDisplay": site.whatsappDisplay,
    "site.nafdacNumber": site.nafdacNumber || "pending",
  };

  const sixFaq = faq
    .filter((i) => i.tags.includes("all"))
    .slice(0, 6)
    .map((i) => ({
      q: i.q,
      a: resolveTemplates(i.a, tplValues),
    }));

  const consented = testimonials.filter((t) => t.consented);

  const perBottle6 = perBottle(elx250_6, 6);
  const perBottle12 = perBottle(elx250_12, 12);

  return (
    <>
      {/* 1. Hero */}
      <section className="mx-auto max-w-wrap px-4 pt-10 md:pt-14 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs uppercase tracking-wider text-red font-bold mb-3">
            Pressed fresh in Old Bodija, Ibadan
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5">
            The drink your friends will keep asking you about.
          </h1>
          <p className="text-lg md:text-xl text-inkSoft mb-6">
            Beetroot, hibiscus, pineapple, ginger, and five more real
            ingredients. Pressed in small batches by {site.founder.name}.
            One sip and you understand why people order by the 12-pack.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/store" variant="primary" size="lg">
              Shop from {formatNaira(elx250_1)}
            </ButtonLink>
            <WhatsAppButton
              message="Hello Unique Tasty, I'd like to place an order."
              size="lg"
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-inkSoft">
            <span>Pay on Paystack</span>
            <span aria-hidden>•</span>
            <span>Pickup or delivery</span>
            <span aria-hidden>•</span>
            <span>Kept chilled, 3 to 4 weeks fresh</span>
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

      {/* 2. Trust strip */}
      <section className="bg-paper border-y border-ink/5">
        <div className="mx-auto max-w-wrap px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <Trust label="Made in" value="Old Bodija, Ibadan" />
          <Trust label="Pay with" value="Card or transfer, Paystack" />
          <Trust label="Delivered to" value="Ibadan, Lagos, Ogun" />
          <Trust label="Batch size" value="Small. Made weekly." />
        </div>
      </section>

      {/* 3. Problem */}
      <section className="mx-auto max-w-wrap px-4 py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
            Most Nigerian drinks are either sugar water or taste like medicine.
          </h2>
          <p className="text-lg text-inkSoft">
            You want something that is actually refreshing. Something with
            ingredients you can read out loud. Something you can hand to your
            kids, your mother in law, your boss and your best friend, and all
            of them say the same thing. "What is this?"
          </p>
          <p className="text-lg font-semibold mt-5">
            That is the drink we make.
          </p>
        </div>
      </section>

      {/* 4. Product showcase */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Two bottles. Both made this week.
          </h2>
          <p className="text-inkSoft max-w-xl mx-auto">
            Pick one or grab both. The Elixir is the everyday drink. The
            Immunity Shot is a small bottle you take in one go.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <ProductCard
            name={elixir.name}
            blurb="Beetroot, hibiscus, pineapple, cucumber, lemon, ginger, cinnamon and cloves. Deep red, lightly sweet, finishes clean. Our best seller."
            ingredients={elixir.ingredients}
            priceFrom={formatNaira(elixir.variants[0].priceKobo)}
            image="/images/products/elixir-250.jpg"
            imageAlt="A 250ml bottle of Unique Elixir"
            href="/elixir"
            cta="See the Elixir"
          />
          <ProductCard
            name={shot.name}
            blurb="Ginger, turmeric, lemon, black pepper and honey. One small bottle. Sharp on the tongue, warm on the throat."
            ingredients={shot.ingredients}
            priceFrom={formatNaira(shot.variants[0].priceKobo)}
            image="/images/products/shot.jpg"
            imageAlt="A bottle of Immunity Shot"
            href="/immunity-shot"
            cta="See the Shot"
          />
        </div>
      </section>

      {/* 5. Why it's different (value stack) */}
      <section className="mx-auto max-w-wrap px-4 py-14 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Why one bottle turns into a 12-pack.
          </h2>
          <p className="text-inkSoft max-w-xl mx-auto">
            Four things we do differently, and why you can taste all four
            on the first sip.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Reason
            n="01"
            title="Real roots and real fruit, blended fresh."
            body="Beetroot we scrub ourselves. Ginger we peel the morning we press. Hibiscus from the market, pineapple cut on the counter. Nothing comes out of a sachet."
          />
          <Reason
            n="02"
            title="Small batches, made every week."
            body="Factories make a year of drink in a day. We make one week of drink in one morning. That is why the flavour is still bright when you open the bottle."
          />
          <Reason
            n="03"
            title="No preservatives, no artificial colour."
            body="The deep red colour is beetroot and hibiscus, not dye. The sweetness is pineapple and a touch of honey, not syrup. If it is not in the ingredient list, it is not in the bottle."
          />
          <Reason
            n="04"
            title="Kept cold, from kitchen to your door."
            body="Every bottle leaves our Old Bodija kitchen chilled and goes straight to pickup, dispatch or your fridge. 3 to 4 weeks fresh when you keep it cold."
          />
        </div>
      </section>

      {/* 6. Packs / price value */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="rounded-3xl bg-paper p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-red font-bold mb-3">
              The maths
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Buy a pack. Pay less per bottle.
            </h2>
            <ul className="space-y-3 text-inkSoft mb-6">
              <li>
                <span className="font-semibold text-ink">1 bottle</span>, 250ml:{" "}
                {formatNaira(elx250_1)}.
              </li>
              <li>
                <span className="font-semibold text-ink">6-pack</span>:{" "}
                {formatNaira(elx250_6)}, {perBottle6} a bottle. Enough for a week.
              </li>
              <li>
                <span className="font-semibold text-ink">12-pack</span>:{" "}
                {formatNaira(elx250_12)}, {perBottle12} a bottle. Our best value.
              </li>
              <li>
                <span className="font-semibold text-ink">500ml</span> for people
                who finish the small one too fast: from{" "}
                {formatNaira(elx500_1)}.
              </li>
            </ul>
            <ButtonLink href="/store" variant="primary" size="lg">
              Pick your pack
            </ButtonLink>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="/images/products/elixir-6pack.jpg"
              alt="A 6-pack of Unique Elixir 250ml bottles"
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7. Occasions */}
      <section className="mx-auto max-w-wrap px-4 py-14 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Who orders Unique Tasty?
          </h2>
          <p className="text-inkSoft max-w-xl mx-auto">
            People who care what they put in their mouth, and the people
            they feed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Occasion
            title="Your morning"
            body="A chilled 250ml before breakfast, instead of the second cup of coffee you did not need."
          />
          <Occasion
            title="Your office"
            body="Order a 12-pack for the team on Monday. Your Friday meetings will not be the same."
          />
          <Occasion
            title="Your guests"
            body="Pour it into tumblers with ice. Nobody at your hangout will ask for malt again."
          />
          <Occasion
            title="Your gift"
            body="A box of 6 or 12 with a ribbon. For the friend who already has everything else."
          />
        </div>
        <div className="text-center mt-10">
          <ButtonLink href="/custom-order" variant="secondary">
            Ordering for an office or event
          </ButtonLink>
        </div>
      </section>

      {/* 8. How it works (risk reversal) */}
      <section className="mx-auto max-w-wrap px-4 py-14 bg-cream">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Ordering takes three minutes.
          </h2>
          <p className="text-inkSoft max-w-xl mx-auto">
            You stay on this website the whole time. No new app, no account to
            create.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Step
            n={1}
            title="Pick your bottles."
            body="Singles, 6-packs or 12-packs. Add to cart and choose pickup or delivery."
          />
          <Step
            n={2}
            title="Pay on Paystack."
            body="Card or bank transfer. You get a receipt in your inbox before you close the tab."
          />
          <Step
            n={3}
            title="We message you on WhatsApp."
            body={`Your order is already written out. We confirm time and place, and you pick up or we deliver. Our line is ${site.whatsappDisplay}.`}
          />
        </div>
      </section>

      {/* 9. Scarcity / freshness */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <div className="rounded-3xl bg-red text-cream p-8 md:p-12 text-center">
          <div className="text-xs uppercase tracking-wider text-cream/70 font-bold mb-3">
            Why the "out of stock" sticker exists
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            We make one batch a week.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-cream/90 mb-6">
            When a flavour sells out on a Wednesday, we restock the next
            Monday. The people who order 12-packs do it because they know.
            Order early in the week if you want the full choice.
          </p>
          <ButtonLink href="/store" variant="primary" size="lg">
            See what is in stock
          </ButtonLink>
        </div>
        <div className="mt-5 flex justify-center">
          <Freshness />
        </div>
      </section>

      {/* 10. Founder */}
      <section className="mx-auto max-w-wrap px-4 py-14 md:py-20">
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
            <div className="text-xs uppercase tracking-wider text-red font-bold mb-3">
              The person who makes it
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {site.founder.name} is in the kitchen before you wake up.
            </h2>
            <p className="text-inkSoft mb-4">
              She started Unique Tasty on 1 February 2026 in Old Bodija. She
              still presses every bottle herself, with a small team she trained.
              When you message us on WhatsApp, you reach her or someone she
              sits across from.
            </p>
            <p className="text-inkSoft mb-6">
              This is not a brand that outsourced production to someone else.
              The person who made the drink also answers your questions.
            </p>
            <ButtonLink href="/our-story" variant="secondary">
              Read her story
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 11. Testimonials (only if consented) */}
      {consented.length > 0 && (
        <section className="mx-auto max-w-wrap px-4 py-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
            Real buyers, real words.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {consented.map((t) => (
              <figure
                key={t.name}
                className="rounded-3xl border border-ink/10 bg-cream p-6"
              >
                <blockquote className="text-ink text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-inkSoft">
                  {t.name}, {t.area}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 12. FAQ */}
      <section className="mx-auto max-w-wrap px-4 py-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
          Before you order, you probably want to know
        </h2>
        <p className="text-center text-inkSoft mb-10 max-w-xl mx-auto">
          The six questions we hear most. If yours is not here, message us.
        </p>
        <Accordion items={sixFaq} />
        <div className="text-center mt-6">
          <Link href="/faq" className="underline underline-offset-2 text-sm">
            See every question we have been asked
          </Link>
        </div>
      </section>

      {/* 13. Closing */}
      <section className="mx-auto max-w-wrap px-4 py-14 md:py-20">
        <div className="rounded-3xl bg-ink text-cream p-10 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            Open one bottle this week.
          </h2>
          <p className="text-cream/80 text-lg max-w-xl mx-auto mb-8">
            The hard part is not drinking it. The hard part is giving the
            last one away.
          </p>
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
          <p className="text-cream/60 text-xs mt-6">
            Pay on Paystack. Pickup in Old Bodija or Akobo Ojurin, or
            delivery across Ibadan, Lagos and Ogun State.
          </p>
        </div>
      </section>
    </>
  );
}

function Trust({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-inkSoft mb-1">
        {label}
      </div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function ProductCard({
  name,
  blurb,
  ingredients,
  priceFrom,
  image,
  imageAlt,
  href,
  cta,
}: {
  name: string;
  blurb: string;
  ingredients: string[];
  priceFrom: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-cream p-6 md:p-8 flex flex-col">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-paper">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 28rem, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
        {name}
      </h3>
      <p className="text-inkSoft mb-5">{blurb}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {ingredients.slice(0, 8).map((ing) => (
          <span
            key={ing}
            className="text-xs font-medium bg-paper rounded-full px-3 py-1 border border-ink/10"
          >
            {ing}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="text-xl font-bold">From {priceFrom}</div>
        <ButtonLink href={href}>{cta}</ButtonLink>
      </div>
    </div>
  );
}

function Reason({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl bg-paper p-6 md:p-8">
      <div className="text-red font-bold text-sm tracking-wider mb-3">{n}</div>
      <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
        {title}
      </h3>
      <p className="text-inkSoft">{body}</p>
    </div>
  );
}

function Occasion({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-ink/10 p-6 bg-cream">
      <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-inkSoft">{body}</p>
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl bg-paper p-6">
      <div className="w-10 h-10 rounded-full bg-red text-white font-bold inline-flex items-center justify-center mb-4">
        {n}
      </div>
      <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-inkSoft">{body}</p>
    </div>
  );
}
