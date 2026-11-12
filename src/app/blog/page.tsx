import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog, Unique Tasty Naturals",
  description:
    "Ingredient guides, serving ideas and how we make our drinks.",
  alternates: { canonical: `${site.url}/blog` },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-10">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-inkSoft">
          Our first posts land in week 5 of the campaign.
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="rounded-3xl border border-ink/10 bg-cream p-6"
            >
              <time className="text-xs text-inkSoft">{p.date}</time>
              <h2 className="font-display text-xl font-bold mt-2 mb-2">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="text-sm text-inkSoft">{p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
