"use client";

import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-wrap px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold mb-4">
        Something went wrong on our side.
      </h1>
      <p className="text-inkSoft mb-8">
        Please try again, or order on WhatsApp.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="rounded-full bg-red text-white px-5 py-2.5 text-sm font-semibold"
        >
          Try again
        </button>
        <WhatsAppButton message="Hello Unique Tasty, I'd like to place an order.">
          Order on WhatsApp
        </WhatsAppButton>
        <ButtonLink href="/store" variant="secondary">
          Go to the store
        </ButtonLink>
      </div>
    </section>
  );
}
