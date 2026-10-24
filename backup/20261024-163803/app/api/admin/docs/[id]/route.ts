import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取单个文档
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, slug, category_slug, title, description, content, sort_order, created_at FROM docs WHERE id = ?")
    .bind(params.id)
    .first();

  if (!result) {
    return NextResponse.json({ error: "文档不存在" }, { status: 404 });
  }

  return NextResponse.json(result);
}

// 更新文档
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    created_at?: string;
  };

  const db = process.env.blog_db as D1Database;
  const existing = await db
    .prepare("SELECT id FROM docs WHERE id = ?")
    .bind(params.id)
    .first();

  if (!existing) {
    return NextResponse.json({ error: "文档不存在" }, { status: 404 });
  }

  const fields: string[] = [];
  const values: any[] = [];

  if (body.slug !== undefined) { fields.push("slug = ?"); values.push(body.slug.trim()); }
  if (body.category_slug !== undefined) { fields.push("category_slug = ?"); values.push(body.category_slug.trim()); }
  if (body.title !== undefined) { fields.push("title = ?"); values.push(body.title.trim()); }
  if (body.description !== undefined) { fields.push("description = ?"); values.push(body.description); }
  if (body.content !== undefined) { fields.push("content = ?"); values.push(body.content); }
  if (body.sort_order !== undefined) { fields.push("sort_order = ?"); values.push(body.sort_order); }
  // 只有显式传了 created_at 才更新
  if (body.created_at !== undefined) { fields.push("created_at = ?"); values.push(body.created_at); }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  values.push(params.id);
  const sql = `UPDATE docs SET ${fields.join(", ")} WHERE id = ?`;

  try {
    await db.prepare(sql).bind(...values).run();
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "该分类下已存在相同 slug 的文档" }, { status: 409 });
    }
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

// 删除文档
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  await db.prepare("DELETE FROM docs WHERE id = ?").bind(params.id).run();
  return NextResponse.json({ success: true });
}
