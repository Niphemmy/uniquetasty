import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-cream">
      <div className="mx-auto max-w-wrap px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold mb-3">
            Unique Tasty Naturals
          </div>
          <p className="text-sm text-cream/80">
            Made in small batches in Old Bodija, Ibadan.
          </p>
          {site.nafdacNumber && (
            <p className="text-xs text-cream/60 mt-3">
              NAFDAC registration number: {site.nafdacNumber}
            </p>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-cream/60 mb-3">
            Shop
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/store">Store</Link></li>
            <li><Link href="/elixir">Unique Elixir</Link></li>
            <li><Link href="/immunity-shot">Immunity Shot</Link></li>
            <li><Link href="/custom-order">Custom order</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-cream/60 mb-3">
            Learn
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/our-story">Our story</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
          <div className="text-xs uppercase tracking-wider text-cream/60 mt-6 mb-3">
            Help
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/delivery">Delivery</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/find-us">Find us</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-cream/60 mb-3">
            Talk to us
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener">
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            {site.phoneDisplay && <li>Phone {site.phoneDisplay}</li>}
            {site.locations.map((l) => (
              <li key={l.id}>
                <span className="font-semibold">{l.label}:</span><br />
                {l.street}, {l.locality}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-4">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-yellow">
                Instagram
              </a>
            )}
            {site.social.tiktok && (
              <a href={site.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="hover:text-yellow">
                TikTok
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-yellow">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-wrap px-4 py-5 text-xs text-cream/60 flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Unique Tasty Naturals.</div>
          <div>Website by Northern Star Business Consult.</div>
        </div>
      </div>
    </footer>
  );
}
