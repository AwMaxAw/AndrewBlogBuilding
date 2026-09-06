import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { decodeSlug } from "./utils";

export interface ChangelogMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Changelog extends ChangelogMeta {
  content: string;
}

const CHANGELOG_DIR = path.join(process.cwd(), "content", "changelog");

function resolveChangelogFile(slug: string): string | null {
  // 解码 URL 编码的 slug，确保中文等非 ASCII slug 能正确匹配文件
  const decodedSlug = decodeSlug(slug);
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(CHANGELOG_DIR, `${decodedSlug}${ext}`);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

export function getChangelogSlugs(): string[] {
  if (!fs.existsSync(CHANGELOG_DIR)) return [];
  return fs
    .readdirSync(CHANGELOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getChangelogBySlug(slug: string): Changelog | null {
  const filePath = resolveChangelogFile(slug);
  if (!filePath) return null;

  // 返回解码后的 slug，与数据库中的原始 slug 保持一致
  const decodedSlug = decodeSlug(slug);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  return {
    slug: decodedSlug,
    title: data.title ?? decodedSlug,
    date: data.date ?? new Date().toISOString(),
    description: data.description ?? "",
    tags: data.tags ?? [],
    content,
  };
}

export function getAllChangelogs(): ChangelogMeta[] {
  return getChangelogSlugs()
    .map((slug) => getChangelogBySlug(slug))
    .filter((item): item is Changelog => item !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map(({ content, ...meta }) => meta);
}
