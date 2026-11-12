import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-wrap px-4 py-24 text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
        We could not find that page.
      </h1>
      <p className="text-inkSoft mb-8">
        Try the store, or message us on WhatsApp and we will help.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <ButtonLink href="/store" variant="primary" size="lg">
          Go to the store
        </ButtonLink>
        <WhatsAppButton message="Hello Unique Tasty, I'd like to ask about an order." size="lg">
          Message us
        </WhatsAppButton>
      </div>
    </section>
  );
}
