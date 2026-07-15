import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function resolvePostFile(slug: string): string | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(POSTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = resolvePostFile(slug);
  if (!filePath) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    description: data.description ?? "",
    tags: data.tags ?? [],
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map(({ content, ...meta }) => meta);
}

export function getNextPost(slug: string): PostMeta | null {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  if (currentIndex === -1 || currentIndex >= allPosts.length - 1) {
    return null;
  }
  return allPosts[currentIndex + 1];
}
