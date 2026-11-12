import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  status: "published" | "draft";
};

export type Post = PostMeta & { body: string };

async function readAll(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }
  const posts: Post[] = [];
  for (const f of files) {
    if (!f.endsWith(".mdx") && !f.endsWith(".md")) continue;
    const raw = await fs.readFile(path.join(BLOG_DIR, f), "utf8");
    const { data, content } = matter(raw);
    posts.push({
      title: String(data.title ?? ""),
      slug: String(data.slug ?? f.replace(/\.mdx?$/, "")),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      updated: data.updated ? String(data.updated) : undefined,
      status: (data.status as "published" | "draft") ?? "draft",
      body: content,
    });
  }
  return posts;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await readAll();
  return posts
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await readAll();
  return posts.find((p) => p.slug === slug && p.status === "published") ?? null;
}
