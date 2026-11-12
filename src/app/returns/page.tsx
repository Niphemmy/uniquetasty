import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Returns and refunds",
  description: "What we do if a bottle arrives damaged or wrong.",
  alternates: { canonical: `${site.url}/returns` },
};

export default function ReturnsPage() {
  return (
    <article className="mx-auto max-w-wrap px-4 py-14 prose max-w-3xl">
      <h1>Returns and refunds</h1>
      <p>
        Drinks made in small batches and kept chilled cannot be restocked
        once they leave us. This is how we handle problems.
      </p>

      <h2>Damaged, leaking or wrong items</h2>
      <p>
        If your order arrives damaged, leaking or not what you ordered,
        message us on WhatsApp within 24 hours of delivery with your order
        number and a photo. We replace the item or refund it. CONFIRM (file 08
        item 11): replacement or refund, who chooses.
      </p>

      <h2>A bottle that tastes wrong</h2>
      <p>
        If a sealed bottle tastes or smells wrong, message us within 24 hours
        of opening it, keep the bottle and send a photo. We look into it and
        make it right. CONFIRM the window with the client.
      </p>

      <h2>Change of mind</h2>
      <p>
        We cannot take back opened bottles. For unopened bottles: CONFIRM yes
        or no, and the window.
      </p>

      <h2>Wrong address or missed delivery</h2>
      <p>
        If you gave a wrong address or were not there to receive the order, we
        can redeliver. CONFIRM who pays the second delivery fee.
      </p>

      <h2>How refunds are paid</h2>
      <p>
        Refunds go back to the way you paid, through Paystack, or by bank
        transfer for payments made by transfer. CONFIRM the time we say.
      </p>

      <h2>Cancelling an order</h2>
      <p>
        Message us on WhatsApp before we dispatch it and we cancel and refund.
        CONFIRM cutoff.
      </p>

      <p>
        Questions? WhatsApp {site.whatsappDisplay}.
      </p>
    </article>
  );
}
