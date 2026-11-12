// Shared FAQ. The same list feeds /faq, the product pages, and the FAQ
// schema. Template variables {{price:sku}} and {{site.nafdacNumber}} are
// resolved at render time.

export type FaqItem = {
  tags: ("all" | "elixir" | "immunity-shot")[];
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    tags: ["all"],
    q: "What is Unique Tasty Naturals?",
    a: "Unique Tasty Naturals makes small-batch drinks in Old Bodija, Ibadan. Our founder is Oluwadamilola Ojo. We started on 1 February 2026. We sell Unique Elixir and Immunity Shot online and through partner outlets.",
  },
  {
    tags: ["elixir"],
    q: "What is in Unique Elixir?",
    a: "Unique Elixir is made from beetroot, hibiscus, pineapple, cucumber, lemon, ginger, cinnamon and cloves. The list on the bottle label is the one to trust, and this page copies it.",
  },
  {
    tags: ["all"],
    q: "How long do the drinks keep?",
    a: "Best within 3 to 4 weeks. Keep the bottles chilled in the fridge. Check the date on your bottle label.",
  },
  {
    tags: ["all"],
    q: "How should I store them?",
    a: "Keep them in the fridge from the moment they reach you. Shake the bottle before you pour. Once opened, drink within a day or two.", // CONFIRM item 9
  },
  {
    tags: ["all"],
    q: "Are your drinks NAFDAC registered?",
    a: "Yes. Our NAFDAC registration number is {{site.nafdacNumber}}.",
  },
  {
    tags: ["all"],
    q: "How much does it cost?",
    a: "Unique Elixir 250ml is {{price:ELX-250-1}} and 500ml is {{price:ELX-500-1}}. Immunity Shot is {{price:SHT-1}}. 6-packs and 12-packs cost less per bottle. See the store for every price.",
  },
  {
    tags: ["all"],
    q: "How do I pay?",
    a: "Pay on the site with Paystack, by card or bank transfer. After payment, tap the button to send your order on WhatsApp. We confirm it there.",
  },
  {
    tags: ["all"],
    q: "Can I order on WhatsApp instead?",
    a: "Yes. Message us on {{site.whatsappDisplay}} and tell us what you want. We reply and arrange payment and delivery.",
  },
  {
    tags: ["all"],
    q: "Can I pick up my order?",
    a: "Yes, for free, at Old Bodija or Akobo Ojurin. Message us before you come so your order is ready.",
  },
  {
    tags: ["all"],
    q: "Do you deliver outside Ibadan?",
    a: "Yes, to Lagos and Ogun State. We confirm the delivery fee and time on WhatsApp. Ask us about other places.",
  },
  {
    tags: ["all"],
    q: "What is the biggest order I can pay for online?",
    a: "Online checkout takes orders up to ₦50,000. For bigger orders, message us on WhatsApp and we send a quote that includes delivery.",
  },
  {
    tags: ["all"],
    q: "Do you supply offices and events?",
    a: "Yes. We supply 12-packs, hampers and monthly office orders. Tell us what you need on the Custom order page and we reply within 1 working day.",
  },
  {
    tags: ["all"],
    q: "Can my shop stock Unique Tasty?",
    a: "Yes. Message us on WhatsApp and ask for the trade price sheet. We supply a sign for shops that stock us.",
  },
  {
    tags: ["all"],
    q: "What if my order arrives damaged?",
    a: "Message us on WhatsApp within 24 hours with your order number and a photo. See Returns and refunds for what happens next.",
  },
  {
    tags: ["all"],
    q: "Do I need an account to order?",
    a: "No. Give your name and phone number at checkout.",
  },
];
