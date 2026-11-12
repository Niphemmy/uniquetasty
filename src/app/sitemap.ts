import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uniquetasty.com.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = [
    "",
    "/store",
    "/elixir",
    "/immunity-shot",
    "/custom-order",
    "/our-story",
    "/find-us",
    "/faq",
    "/delivery",
    "/returns",
    "/privacy",
    "/terms",
    "/blog",
  ];
  const posts = await getAllPosts();
  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
