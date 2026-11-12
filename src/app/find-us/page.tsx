import type { Metadata } from "next";
import { site } from "@/data/site";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "Find Unique Tasty in Ibadan, address and pickup",
  description:
    "Pickup at Old Bodija and Akobo Ojurin. Map, hours, phone and WhatsApp.",
  alternates: { canonical: `${site.url}/find-us` },
};

export default function FindUsPage() {
  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-5">
        Find Unique Tasty in Ibadan
      </h1>
      <p className="text-lg text-inkSoft max-w-3xl mb-10">
        We make our drinks in Old Bodija, Ibadan. You can pick up in Old Bodija
        or Akobo Ojurin, or we can deliver to you.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {site.locations.map((l) => (
          <div
            key={l.id}
            className="rounded-3xl border border-ink/10 bg-cream p-6"
          >
            <div className="text-xs uppercase tracking-wider text-red font-bold mb-2">
              {l.label}
            </div>
            <div className="font-display text-xl font-bold mb-2">
              {l.street}
            </div>
            <div className="text-inkSoft text-sm mb-4">
              {l.locality}, {l.region}
            </div>
            {l.hours && <div className="text-sm mb-4">{l.hours}</div>}
            {l.pickup && (
              <div className="inline-block rounded-full bg-green/15 text-green px-3 py-1 text-xs font-semibold mb-4">
                Pickup available
              </div>
            )}
            {l.mapUrl && (
              <a
                href={l.mapUrl}
                target="_blank"
                rel="noopener"
                className="text-sm underline underline-offset-2"
              >
                Open in Maps
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-paper p-8">
        <h2 className="font-display text-2xl font-bold mb-4">Contact</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2"
            >
              WhatsApp {site.whatsappDisplay}
            </a>
          </li>
          {site.phoneDisplay && <li>Phone {site.phoneDisplay}</li>}
        </ul>
        <div className="mt-5">
          <WhatsAppButton message="Hello Unique Tasty, I'd like to arrange a pickup.">
            Arrange a pickup on WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      <p className="text-sm text-inkSoft mt-8">
        Message us on WhatsApp before you come so your order is ready. Bring
        your order number.
      </p>
    </section>
  );
}
