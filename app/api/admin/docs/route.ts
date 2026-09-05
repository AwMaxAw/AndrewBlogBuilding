import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取所有文档（可按分类筛选）
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const db = process.env.blog_db as D1Database;
  let result;

  if (category) {
    result = await db
      .prepare("SELECT id, slug, category_slug, title, description, sort_order FROM docs WHERE category_slug = ? ORDER BY sort_order ASC")
      .bind(category)
      .all();
  } else {
    result = await db
      .prepare("SELECT id, slug, category_slug, title, description, sort_order FROM docs ORDER BY category_slug, sort_order ASC")
      .all();
  }

  return NextResponse.json(result.results);
}

// 新建文档
export async function POST(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = (await req.json()) as {
    slug?: string;
    category_slug?: string;
    title?: string;
    description?: string;
    content?: string;
    sort_order?: number;
  };

  const { slug, category_slug, title, description, content, sort_order } = body;

  if (!slug?.trim() || !category_slug?.trim() || !title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "slug、分类、标题、内容不能为空" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  const order = sort_order ?? 0;

  try {
    await db
      .prepare(
        "INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(slug.trim(), category_slug.trim(), title.trim(), description || "", content, order)
      .run();
    return NextResponse.json({ success: true, slug });
  } catch (e: any) {
    if (e?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "该分类下已存在相同 slug 的文档" }, { status: 409 });
    }
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
