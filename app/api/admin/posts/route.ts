import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取所有文章
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, slug, title, date, description, tags, content, reading_time, created_at FROM posts ORDER BY date DESC, id DESC")
    .all();
  return NextResponse.json(result.results);
}

// 新建文章
export async function POST(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = (await req.json()) as {
    slug?: string;
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    content?: string;
    published?: number;
  };

  const { slug, title, date, description, tags, content, published } = body;

  if (!slug?.trim() || !title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "slug、标题、内容不能为空" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  const tagsJson = JSON.stringify(tags || []);
  const postDate = date || new Date().toISOString().slice(0, 10);
  const publishedFlag = published ?? 0;

  // 计算阅读时间
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = `${Math.ceil(words / wordsPerMinute)} min read`;

  try {
    await db
      .prepare(
        "INSERT INTO posts (slug, title, date, description, tags, content, reading_time, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(slug.trim(), title.trim(), postDate, description || "", tagsJson, content, readingTime, publishedFlag)
      .run();
    return NextResponse.json({ success: true, slug });
  } catch (e: any) {
    if (e?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "该 slug 已存在" }, { status: 409 });
    }
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
