import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 更新分类
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = (await req.json()) as { slug?: string; name?: string; sort_order?: number };
  const db = process.env.blog_db as D1Database;

  const existing = await db
    .prepare("SELECT id FROM doc_categories WHERE slug = ?")
    .bind(params.slug)
    .first();

  if (!existing) {
    return NextResponse.json({ error: "分类不存在" }, { status: 404 });
  }

  const newSlug = body.slug?.trim();
  const name = body.name?.trim();
  const sort_order = body.sort_order;

  const fields: string[] = [];
  const values: any[] = [];

  if (newSlug && newSlug !== params.slug) {
    fields.push("slug = ?");
    values.push(newSlug);
    // 同时更新该分类下所有 docs 的 category_slug
    await db.prepare("UPDATE docs SET category_slug = ? WHERE category_slug = ?").bind(newSlug, params.slug).run();
  }
  if (name !== undefined) { fields.push("name = ?"); values.push(name); }
  if (sort_order !== undefined) { fields.push("sort_order = ?"); values.push(sort_order); }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  values.push(params.slug);
  const sql = `UPDATE doc_categories SET ${fields.join(", ")} WHERE slug = ?`;

  try {
    await db.prepare(sql).bind(...values).run();
    return NextResponse.json({ success: true, slug: newSlug || params.slug });
  } catch (e: any) {
    if (e?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "该分类 slug 已存在" }, { status: 409 });
    }
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

// 删除分类（同时删除该分类下所有文档）
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  await db.prepare("DELETE FROM docs WHERE category_slug = ?").bind(params.slug).run();
  await db.prepare("DELETE FROM doc_categories WHERE slug = ?").bind(params.slug).run();
  return NextResponse.json({ success: true });
}
