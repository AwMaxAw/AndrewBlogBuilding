import { decodeSlug } from "./utils";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  createdAt: string;
}

export interface Post extends PostMeta {
  content: string;
}

interface PostRow {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string;
  content: string;
  reading_time: string;
  created_at: string;
}

function getDb(): D1Database | null {
  return (process.env.blog_db as D1Database) || null;
}

function parsePostRow(row: PostRow): Post {
  let tags: string[] = [];
  try {
    tags = JSON.parse(row.tags || "[]");
  } catch {
    tags = [];
  }
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    description: row.description || "",
    tags,
    readingTime: row.reading_time || "",
    createdAt: row.created_at || "",
    content: row.content,
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const db = getDb();
  if (!db) return [];
  const result = await db.prepare("SELECT slug FROM posts ORDER BY date DESC, id DESC").all<{ slug: string }>();
  return result.results.map((r) => r.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = getDb();
  if (!db) return null;
  const decodedSlug = decodeSlug(slug);
  const result = await db
    .prepare("SELECT slug, title, date, description, tags, content, reading_time, created_at FROM posts WHERE slug = ?")
    .bind(decodedSlug)
    .first<PostRow>();
  if (!result) return null;
  return parsePostRow(result);
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const db = getDb();
  if (!db) return [];
  const result = await db
    .prepare("SELECT id, slug, title, date, description, tags, reading_time, created_at FROM posts ORDER BY date DESC, id DESC")
    .all<PostRow>();
  return result.results.map((r) => {
    const { content, ...meta } = parsePostRow(r);
    return meta;
  });
}

export async function getAllPostsFull(): Promise<Post[]> {
  const db = getDb();
  if (!db) return [];
  const result = await db
    .prepare("SELECT id, slug, title, date, description, tags, content, reading_time, created_at FROM posts ORDER BY date DESC, id DESC")
    .all<PostRow>();
  return result.results.map(parsePostRow);
}

export async function getNextPost(slug: string): Promise<PostMeta | null> {
  const db = getDb();
  if (!db) return null;
  const decodedSlug = decodeSlug(slug);
  const current = await db.prepare("SELECT date, id FROM posts WHERE slug = ?").bind(decodedSlug).first<{ date: string; id: number }>();
  if (!current) return null;
  // 使用 (date, id) 复合键定位：同日期内按 id 排序，确保能找到相邻文章
  const result = await db
    .prepare(
      "SELECT id, slug, title, date, description, tags, reading_time, created_at FROM posts WHERE (date > ?) OR (date = ? AND id > ?) ORDER BY date ASC, id ASC LIMIT 1"
    )
    .bind(current.date, current.date, current.id)
    .first<PostRow>();
  if (!result) return null;
  const { content, ...meta } = parsePostRow(result);
  return meta;
}

export async function getPreviousPost(slug: string): Promise<PostMeta | null> {
  const db = getDb();
  if (!db) return null;
  const decodedSlug = decodeSlug(slug);
  const current = await db.prepare("SELECT date, id FROM posts WHERE slug = ?").bind(decodedSlug).first<{ date: string; id: number }>();
  if (!current) return null;
  // 使用 (date, id) 复合键定位：同日期内按 id 排序，确保能找到相邻文章
  const result = await db
    .prepare(
      "SELECT id, slug, title, date, description, tags, reading_time, created_at FROM posts WHERE (date < ?) OR (date = ? AND id < ?) ORDER BY date DESC, id DESC LIMIT 1"
    )
    .bind(current.date, current.date, current.id)
    .first<PostRow>();
  if (!result) return null;
  const { content, ...meta } = parsePostRow(result);
  return meta;
}
