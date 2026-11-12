import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { WhatsAppFloat } from "@/components/layout/WhatsAppButton";
import { Pixels } from "@/components/analytics/Pixels";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd, websiteLd, localBusinessLd } from "@/lib/schema-org";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Unique Tasty Naturals, small-batch drinks in Ibadan",
    template: "%s | Unique Tasty Naturals",
  },
  description:
    "Beetroot, hibiscus, pineapple and ginger drinks made in small batches in Old Bodija, Ibadan. 250ml from ₦950. Pay online, pick up or get it delivered.",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION ?? "",
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG">
      <body className="min-h-dvh flex flex-col">
        <JsonLd data={websiteLd()} />
        <JsonLd data={organizationLd()} />
        {localBusinessLd().map((lb, i) => (
          <JsonLd key={i} data={lb} />
        ))}
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat message="Hello Unique Tasty, I'd like to ask about an order." />
          <ConsentBanner />
          <Pixels />
        </CartProvider>
      </body>
    </html>
  );
}
