import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Cloudflare Edge Runtime 默认时区为 UTC，必须显式指定 Asia/Shanghai
// 否则 toLocaleString 会按 UTC 渲染，导致时间差 8 小时
const TZ = "Asia/Shanghai";

export function formatDate(date: string, short = false): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    timeZone: TZ,
    year: "numeric",
    month: short ? "short" : "long",
    day: "numeric",
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("zh-CN", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString("zh-CN", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * 安全地解码 URL 中的 slug 参数。
 * 在 Cloudflare Pages edge runtime 中，params.slug 可能是 URL 编码后的字符串，
 * 而数据库存储的是原始字符，需要解码后才能匹配。
 * 如果解码失败（例如 slug 包含 % 字符），则返回原始字符串。
 */
export function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function extractHeadings(content: string): HeadingItem[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const items: HeadingItem[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");

    items.push({ id, text, level });
  }

  return items;
}
