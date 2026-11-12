import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What we collect when you order and how we use it.",
  alternates: { canonical: `${site.url}/privacy` },
};

const updated = "2026-11-12";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-wrap px-4 py-14 prose max-w-3xl">
      <h1>Privacy</h1>
      <p>Last updated: {updated}</p>

      <h2>Who we are</h2>
      <p>
        Unique Tasty Naturals, Old Bodija, Ibadan, Oyo State, Nigeria. Contact:
        WhatsApp {site.whatsappDisplay}.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          When you order: your name, phone number, delivery address, order
          notes, and your email if you give it.
        </li>
        <li>
          When you pay: Paystack handles your card or bank details. We never
          see or store them. We receive a payment reference and the amount.
        </li>
        <li>
          When you browse, and only if you accept cookies: pages visited,
          devices, the ad that brought you, and what you add to your cart.
        </li>
        <li>
          When you message us on WhatsApp: whatever you send. WhatsApp's own
          privacy terms apply to that chat.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <p>
        To take and deliver your order, to confirm it with you, to answer your
        questions, to keep records, to measure which ads and pages work, and
        to improve the site.
      </p>

      <h2>Who handles it for us</h2>
      <p>
        {site.processors.join(", ")}.
      </p>

      <h2>Cookies</h2>
      <p>
        We use necessary cookies and local storage to keep your cart and your
        cookie choice. We use measurement and advertising cookies only if you
        accept. You can change your choice by clearing cookies for this site.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Order records for as long as we need them for accounts and legal
        records. Marketing data for up to 24 months. CONFIRM with the client.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the Nigeria Data Protection Act 2023 you can ask to see your
        data, correct it, delete it where we are not required to keep it, or
        object to how we use it. Message us on WhatsApp or email to ask. We
        reply within 30 days. If you are unhappy with our reply, you can
        complain to the Nigeria Data Protection Commission.
      </p>

      <h2>Selling data</h2>
      <p>We do not sell your data.</p>

      <h2>Changes</h2>
      <p>
        We update this page when our practice changes and show the date at the
        top.
      </p>
    </article>
  );
}
