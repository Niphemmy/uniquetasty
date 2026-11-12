import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleLd, breadcrumbLd } from "@/lib/schema-org";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { mdxComponents } from "@/components/blog/mdx-components";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <article className="mx-auto max-w-wrap px-4 py-14 max-w-3xl">
      <Breadcrumbs trail={trail} />
      <JsonLd
        data={articleLd({
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          updated: post.updated,
        })}
      />
      <header className="mt-6 mb-10">
        <time className="text-xs text-inkSoft">{post.date}</time>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">
          {post.title}
        </h1>
        <p className="text-lg text-inkSoft mt-3">{post.description}</p>
      </header>
      <div className="prose max-w-none">
        <MDXRemote source={post.body} components={mdxComponents} />
      </div>
    </article>
  );
}
