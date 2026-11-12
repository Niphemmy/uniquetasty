import { site } from "@/data/site";
import { products } from "@/data/catalog";
import { getAllPosts } from "@/lib/blog";
import { formatNaira } from "@/lib/money";
import { faq } from "@/data/faq";
import { resolveTemplates } from "@/lib/utils";
import { findVariant } from "@/data/catalog";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const tpl: Record<string, string> = {
    "site.whatsappDisplay": site.whatsappDisplay,
    "site.nafdacNumber": site.nafdacNumber || "pending",
    "price:ELX-250-1": formatNaira(findVariant("ELX-250-1")!.variant.priceKobo),
    "price:ELX-500-1": formatNaira(findVariant("ELX-500-1")!.variant.priceKobo),
    "price:SHT-1": formatNaira(findVariant("SHT-1")!.variant.priceKobo),
  };

  const parts: string[] = [];

  parts.push(`# ${site.name}`);
  parts.push("");
  parts.push(`${site.tagline}. Drinks made in small batches in Old Bodija, Ibadan.`);
  parts.push(`Founded ${site.foundedDate} by ${site.founder.name}.`);
  parts.push(`WhatsApp: ${site.whatsappDisplay}. Order limit online: ₦${site.orderLimits.onlineMaxNaira.toLocaleString()}.`);
  if (site.nafdacNumber) parts.push(`NAFDAC registration number: ${site.nafdacNumber}`);
  parts.push("");

  for (const p of products) {
    parts.push(`## ${p.name}`);
    parts.push(`Ingredients: ${p.ingredients.join(", ")}.`);
    if (p.taste) parts.push(`Taste: ${p.taste}`);
    for (const v of p.variants) {
      parts.push(
        `- ${v.size} ${v.pack === 1 ? "single" : v.pack + "-pack"}: ${formatNaira(v.priceKobo)}`
      );
    }
    parts.push("");
  }

  parts.push("## FAQ");
  for (const i of faq) {
    parts.push(`### ${i.q}`);
    parts.push(resolveTemplates(i.a, tpl));
    parts.push("");
  }

  for (const post of posts) {
    parts.push(`## ${post.title}`);
    parts.push(post.description);
    parts.push(
      post.body
        .replace(/<[^>]+>/g, "")
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
        .replace(/\{[^}]+\}/g, "")
        .trim()
    );
    parts.push("");
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
