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

// 使用 import.meta.glob 在构建时内联读取 changelog 文件，
// 避免运行时依赖 fs/path，兼容 Edge Runtime 与 Node.js Runtime
const changelogModules = import.meta.glob(
  "../content/changelog/*.{md,mdx}",
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

// 缓存解析后的 changelog 列表
let parsedCache: Changelog[] | null = null;

function parseAllChangelogs(): Changelog[] {
  if (parsedCache) return parsedCache;

  const items: Changelog[] = Object.entries(changelogModules).map(([filePath, raw]) => {
    // 从路径中提取 slug（去掉目录和扩展名）
    const fileName = filePath.split("/").pop() || "";
    const slug = fileName.replace(/\.mdx?$/, "");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      description: data.description ?? "",
      tags: data.tags ?? [],
      content,
    };
  });

  items.sort((a, b) => (a.date > b.date ? -1 : 1));
  parsedCache = items;
  return items;
}

export function getChangelogSlugs(): string[] {
  return parseAllChangelogs().map((item) => item.slug);
}

export function getChangelogBySlug(slug: string): Changelog | null {
  // 解码 URL 编码的 slug，匹配文件名
  const decodedSlug = decodeSlug(slug);
  return parseAllChangelogs().find((item) => item.slug === decodedSlug) ?? null;
}

export function getAllChangelogs(): ChangelogMeta[] {
  return parseAllChangelogs().map(({ content, ...meta }) => meta);
}
