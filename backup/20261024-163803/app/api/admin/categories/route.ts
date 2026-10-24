import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取所有分类
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, slug, name, sort_order FROM doc_categories ORDER BY sort_order ASC")
    .all();
  return NextResponse.json(result.results);
}

// 新建分类
export async function POST(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = (await req.json()) as { slug?: string; name?: string; sort_order?: number };
  const { slug, name, sort_order } = body;

  if (!slug?.trim() || !name?.trim()) {
    return NextResponse.json({ error: "slug 和名称不能为空" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  const order = sort_order ?? 0;

  try {
    await db
      .prepare("INSERT INTO doc_categories (slug, name, sort_order) VALUES (?, ?, ?)")
      .bind(slug.trim(), name.trim(), order)
      .run();
    return NextResponse.json({ success: true, slug });
  } catch (e: any) {
    if (e?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "该分类 slug 已存在" }, { status: 409 });
    }
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
