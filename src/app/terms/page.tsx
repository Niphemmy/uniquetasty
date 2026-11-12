import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of sale",
  description: "The terms for orders from uniquetasty.com.ng.",
  alternates: { canonical: `${site.url}/terms` },
};

const updated = "2026-11-12";

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-wrap px-4 py-14 prose max-w-3xl">
      <h1>Terms of sale</h1>
      <p>Last updated: {updated}</p>

      <ol>
        <li>
          <strong>Who we are.</strong> These terms cover orders from
          uniquetasty.com.ng with Unique Tasty Naturals, Old Bodija, Ibadan.
        </li>
        <li>
          <strong>Prices.</strong> Prices are in Nigerian naira and shown on
          each product. We may change prices. The price you pay is the price
          on the site when you pay.
        </li>
        <li>
          <strong>Orders.</strong> An order is placed when your payment
          succeeds on Paystack. We confirm it with you on WhatsApp. We may
          cancel an order if an item is unavailable or a price is shown in
          error, and we refund you in full.
        </li>
        <li>
          <strong>Large orders.</strong> Orders above ₦50,000 are quoted on
          WhatsApp and agreed there.
        </li>
        <li>
          <strong>Payment.</strong> Payment is by card or bank transfer
          through Paystack. Paystack's terms apply to the payment.
        </li>
        <li>
          <strong>Delivery and pickup.</strong> See Delivery and pickup.
          Delivery times are estimates.
        </li>
        <li>
          <strong>Perishable goods.</strong> Our drinks are perishable. Keep
          them chilled and use them by the date on the label. We guide you on
          shelf life on the product pages and in the FAQ.
        </li>
        <li>
          <strong>Returns and refunds.</strong> See Returns and refunds.
        </li>
        <li>
          <strong>Product information.</strong> We list ingredients as
          printed on the label. If you have an allergy or a dietary need, read
          the label and ask us before you order. These drinks are food
          products. We make no health claims. We do not offer medical advice.
        </li>
        <li>
          <strong>Our responsibility.</strong> We take care to make our drinks
          safely and to deliver them as described. We are responsible for
          losses that are a direct result of our fault, as the law requires.
          We are not responsible for delays or losses outside our control.
          Nothing in these terms limits your rights under Nigerian consumer
          protection law.
        </li>
        <li>
          <strong>Website use.</strong> The photos, text and brand on this
          site belong to Unique Tasty Naturals. Please do not copy them
          without asking.
        </li>
        <li>
          <strong>Changes.</strong> We may update these terms. The version on
          the site when you order applies to your order.
        </li>
        <li>
          <strong>Law.</strong> These terms are governed by the laws of the
          Federal Republic of Nigeria.
        </li>
        <li>
          <strong>Contact.</strong> WhatsApp {site.whatsappDisplay}.
        </li>
      </ol>
    </article>
  );
}
