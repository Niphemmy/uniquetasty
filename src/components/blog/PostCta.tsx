import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function PostCta() {
  return (
    <div className="mt-10 rounded-3xl border border-ink/10 bg-paper p-6 flex flex-wrap gap-3 items-center justify-between">
      <div>
        <div className="text-xl font-display font-bold">Taste it.</div>
        <div className="text-sm text-inkSoft">Shop the drinks.</div>
      </div>
      <div className="flex gap-3">
        <ButtonLink href="/store" variant="primary">
          Shop the drinks
        </ButtonLink>
        <WhatsAppButton message="Hello Unique Tasty, I'd like to place an order.">
          Order on WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
