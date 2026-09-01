import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  description?: string;
  tags: readonly string[];
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  content: string; // Cuerpo MDX crudo
};

function readingMinutes(text: string): number {
  // 220 palabras por minuto, mínimo 1.
  const words = text.trim().split(/\s+/u).length;
  return Math.max(1, Math.round(words / 220));
}

function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/u, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    description: data.description ? String(data.description) : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingMinutes: readingMinutes(content),
    content,
  };
}

export function getAllPosts(): readonly BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/u.test(f))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMetas(): readonly BlogPostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
