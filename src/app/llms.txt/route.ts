import { site } from "@/data/site";
import { products } from "@/data/catalog";
import { getAllPosts } from "@/lib/blog";
import { formatNaira } from "@/lib/money";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. Drinks made in small batches in Old Bodija, Ibadan, Nigeria. Order online, pick up or get delivery.`,
    "",
    "## Key facts",
    `- Founded: 1 February 2026 by ${site.founder.name}`,
    `- Make and pickup: Old Bodija, Ibadan, Oyo State, Nigeria`,
    `- Order: ${site.url}/store, or WhatsApp ${site.whatsappDisplay}`,
    `- Payment: Paystack on the website (card, bank transfer), then WhatsApp confirmation`,
    `- Freshness: ${site.freshnessLine}`,
    site.nafdacNumber ? `- NAFDAC registration number: ${site.nafdacNumber}` : "",
    "",
    "## Products and prices (NGN)",
    ...products.flatMap((p) =>
      p.variants.map(
        (v) =>
          `- ${p.name} ${v.size} ${v.pack === 1 ? "single" : v.pack + "-pack"}: ${formatNaira(v.priceKobo)}`
      )
    ),
    "",
    "## Pages",
    `- [Store](${site.url}/store): all products and packs`,
    `- [Unique Elixir](${site.url}/elixir): ingredients and sizes`,
    `- [Immunity Shot](${site.url}/immunity-shot): ingredients and packs`,
    `- [Custom orders](${site.url}/custom-order): offices, events, gifts`,
    `- [Our story](${site.url}/our-story): the founder and how it is made`,
    `- [Find us](${site.url}/find-us): addresses, hours, contact`,
    `- [FAQ](${site.url}/faq)`,
    `- [Delivery](${site.url}/delivery), [Returns](${site.url}/returns), [Privacy](${site.url}/privacy), [Terms](${site.url}/terms)`,
    "",
    "## Blog",
    ...posts.map(
      (p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`
    ),
    "",
    `Full text: ${site.url}/llms-full.txt`,
  ].filter(Boolean);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
