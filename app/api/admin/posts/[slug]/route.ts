import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { decodeSlug } from "@/lib/utils";

export const runtime = "edge";

// 获取单篇文章
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const slug = decodeSlug(params.slug);
  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, slug, title, date, description, tags, content, reading_time, created_at, published FROM posts WHERE slug = ?")
    .bind(slug)
    .first();

  if (!result) {
    return NextResponse.json({ error: "文章不存在" }, { status: 404 });
  }

  // 解析 tags
  let tags: string[] = [];
  try {
    tags = JSON.parse((result as any).tags || "[]");
  } catch {
    tags = [];
  }

  return NextResponse.json({ ...result, tags });
}

// 更新文章
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const slug = decodeSlug(params.slug);
  const body = (await req.json()) as {
    slug?: string;
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    content?: string;
    created_at?: string;
    published?: number;
  };

  const db = process.env.blog_db as D1Database;
  const existing = await db
    .prepare("SELECT id FROM posts WHERE slug = ?")
    .bind(slug)
    .first();

  if (!existing) {
    return NextResponse.json({ error: "文章不存在" }, { status: 404 });
  }

  const newSlug = body.slug?.trim() || slug;
  const title = body.title?.trim();
  const date = body.date;
  const description = body.description ?? "";
  const tags = body.tags ? JSON.stringify(body.tags) : undefined;
  const content = body.content;
  const createdAt = body.created_at;
  const published = body.published;

  // 计算阅读时间
  let readingTime: string | undefined;
  if (content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    readingTime = `${Math.ceil(words / wordsPerMinute)} min read`;
  }

  const fields: string[] = [];
  const values: any[] = [];

  if (newSlug !== slug) { fields.push("slug = ?"); values.push(newSlug); }
  if (title !== undefined) { fields.push("title = ?"); values.push(title); }
  if (date !== undefined) { fields.push("date = ?"); values.push(date); }
  if (description !== undefined) { fields.push("description = ?"); values.push(description); }
  if (tags !== undefined) { fields.push("tags = ?"); values.push(tags); }
  if (content !== undefined) { fields.push("content = ?"); values.push(content); }
  if (readingTime !== undefined) { fields.push("reading_time = ?"); values.push(readingTime); }
  // 只有显式传了 created_at 才更新（保留原始时间）
  if (createdAt !== undefined) { fields.push("created_at = ?"); values.push(createdAt); }
  if (published !== undefined) { fields.push("published = ?"); values.push(published); }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  values.push(slug);
  const sql = `UPDATE posts SET ${fields.join(", ")} WHERE slug = ?`;

  try {
    await db.prepare(sql).bind(...values).run();
    return NextResponse.json({ success: true, slug: newSlug });
  } catch (e: any) {
    if (e?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "该 slug 已存在" }, { status: 409 });
    }
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

// 删除文章
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const slug = decodeSlug(params.slug);
  const db = process.env.blog_db as D1Database;
  await db.prepare("DELETE FROM posts WHERE slug = ?").bind(slug).run();
  return NextResponse.json({ success: true });
}
