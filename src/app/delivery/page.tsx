import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Delivery and pickup",
  description:
    "Where we deliver, how payment works and what to expect.",
  alternates: { canonical: `${site.url}/delivery` },
};

export default function DeliveryPage() {
  return (
    <article className="mx-auto max-w-wrap px-4 py-14 prose max-w-3xl">
      <h1>Delivery and pickup</h1>

      <h2>Where we deliver</h2>
      <p>
        We deliver in Ibadan, Lagos and Ogun State. Delivery to other places on
        request through WhatsApp.
      </p>

      <h2>Pickup</h2>
      <p>
        Pick up free at Old Bodija or Akobo Ojurin. Message us on WhatsApp
        before you come so your order is ready. Addresses and hours are on the
        Find us page.
      </p>

      <h2>Delivery fees</h2>
      <p>
        The fee depends on your area. We confirm it on WhatsApp after you
        place your order. If a fee is set for your area, checkout shows it and
        you pay it with your order.
      </p>

      <h2>When we deliver</h2>
      <p>
        Delivery days, order cut-off time and usual wait: CONFIRM (file 08
        item 10). The team adds a line for each of Ibadan, Lagos and Ogun
        State.
      </p>

      <h2>How payment works</h2>
      <p>
        You pay for your drinks on the site with Paystack, by card or bank
        transfer. After payment you tap one button and your order opens in
        WhatsApp. We confirm your order there and agree the delivery time.
      </p>

      <h2>Orders above ₦50,000</h2>
      <p>
        Message us on WhatsApp. We send a quote that includes delivery.
      </p>

      <h2>Your bottles</h2>
      <p>
        {site.freshnessLine} Put them in the fridge as soon as they reach you.
        See the FAQ for how long they keep.
      </p>

      <h2>If something goes wrong</h2>
      <p>
        Message us on WhatsApp the same day. See{" "}
        <a href="/returns">Returns and refunds</a>.
      </p>
    </article>
  );
}
