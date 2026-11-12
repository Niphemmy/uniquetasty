import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { founder } from "@/data/founder";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our story, Unique Tasty Naturals",
  description: `${founder.name} started Unique Tasty in Old Bodija, Ibadan on 1 February 2026. Read why, and how each bottle is made.`,
  alternates: { canonical: `${site.url}/our-story` },
};

export default function OurStoryPage() {
  return (
    <article className="mx-auto max-w-wrap px-4 py-14">
      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our story</h1>
        <p className="text-lg text-inkSoft">
          Unique Tasty Naturals began on 1 February 2026 in Old Bodija, Ibadan.
          {" "}{founder.name} started it with one aim: put drinks she is proud of on
          Ibadan shelves and in Ibadan fridges.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-10 mb-14">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-paper">
          <Image
            src={founder.portrait}
            alt={founder.name}
            fill
            sizes="(min-width: 768px) 28rem, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold mb-4">
            From the market to the bottle
          </h2>
          <ol className="space-y-3 text-inkSoft list-decimal pl-5">
            <li>We buy ingredients and check them.</li>
            <li>We wash and prepare them.</li>
            <li>We make each batch in small amounts.</li>
            <li>We bottle and label by hand.</li>
            <li>We keep the bottles chilled until they reach you.</li>
          </ol>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-3xl font-bold mb-4">What we hold to</h2>
        <ul className="grid md:grid-cols-3 gap-5">
          {[
            "We list every ingredient.",
            "We tell you how long a bottle keeps.",
            "We answer your messages.",
          ].map((t) => (
            <li
              key={t}
              className="rounded-2xl border border-ink/10 bg-cream p-5 font-semibold"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section id="founder" className="mb-14">
        <h2 className="font-display text-3xl font-bold mb-4">
          {founder.name}, founder
        </h2>
        <p className="text-inkSoft mb-6">
          {founder.name} founded Unique Tasty Naturals on 1 February 2026 and
          makes it in Old Bodija, Ibadan.
        </p>

        {founder.inHerWords.length === 0 ? (
          <p className="rounded-2xl bg-paper p-5 text-sm text-brown">
            The "In her words" section is published after the kickoff interview
            and shoot. The build fails in production until it is filled.
          </p>
        ) : (
          <div className="space-y-6">
            {founder.inHerWords.map((it, i) => (
              <div key={i}>
                <h3 className="font-display text-xl font-bold">{it.question}</h3>
                <p className="text-inkSoft mt-2 whitespace-pre-line">{it.answer}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl bg-paper p-8 flex items-center justify-between flex-wrap gap-5">
        <div>
          <h2 className="font-display text-2xl font-bold">Where to find us</h2>
          <p className="text-inkSoft">Pickup in Old Bodija and Akobo Ojurin, or delivery across Ibadan, Lagos and Ogun State.</p>
        </div>
        <div className="flex gap-3">
          <ButtonLink href="/find-us">Find us</ButtonLink>
          <ButtonLink href="/store" variant="secondary">Taste it</ButtonLink>
        </div>
      </section>
    </article>
  );
}
