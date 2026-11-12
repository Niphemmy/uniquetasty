// Testimonials. Ported verbatim from the legacy site after a claims-check
// filter: two of the three legacy testimonials contain banned health claims
// and are held until Oluwadamilola collects replacements with buyer consent
// (file 08 item 13).

export type Testimonial = {
  name: string;
  area: string;
  quote: string;
  photo?: string;
  consented: boolean; // only renders when true
};

export const testimonials: Testimonial[] = [
  {
    name: "Funke O.",
    area: "Lagos",
    quote:
      "The Elixir replaced soft drinks in my house. My husband doesn't even ask for malt anymore, he reaches for this. The beetroot taste grew on us.",
    consented: false, // FROM_CLIENT, item 13
  },
  // Adaora N. (Ibadan) and Tunde A. (Abuja) are held. Both carry health
  // claims the claims check forbids. Replace with new, consented quotes.
];
