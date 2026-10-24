import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取所有留言（含 parent_id，用于展示回复层级）
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, name, message, parent_id, created_at FROM guestbook ORDER BY created_at DESC")
    .all();
  return NextResponse.json(result.results);
}

// 编辑留言内容（不修改创建时间）
export async function PUT(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = (await req.json()) as { id?: number; name?: string; message?: string; created_at?: string };
  const { id, name, message, created_at } = body;

  if (!id) {
    return NextResponse.json({ error: "缺少 id" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  const existing = await db
    .prepare("SELECT id FROM guestbook WHERE id = ?")
    .bind(id)
    .first();

  if (!existing) {
    return NextResponse.json({ error: "留言不存在" }, { status: 404 });
  }

  const fields: string[] = [];
  const values: any[] = [];

  if (name !== undefined && name.trim()) {
    fields.push("name = ?");
    values.push(name.trim());
  }
  if (message !== undefined) {
    if (!message.trim()) {
      return NextResponse.json({ error: "内容不能为空" }, { status: 400 });
    }
    fields.push("message = ?");
    values.push(message.trim());
  }
  // 只有显式传了 created_at 才更新
  if (created_at !== undefined) {
    fields.push("created_at = ?");
    values.push(created_at);
  }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  // 注意：不更新 created_at，保持原始发布时间
  values.push(id);
  const sql = `UPDATE guestbook SET ${fields.join(", ")} WHERE id = ?`;
  await db.prepare(sql).bind(...values).run();

  return NextResponse.json({ success: true });
}

// 删除留言（同时删除其所有回复）
export async function DELETE(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "缺少 id 参数" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  // 递归删除：先收集所有后代 id，再批量删除
  const toDelete = new Set<number>([parseInt(id)]);
  let changed = true;
  while (changed) {
    changed = false;
    const children = await db
      .prepare("SELECT id FROM guestbook WHERE parent_id IN (SELECT value FROM json_each(?))")
      .bind(JSON.stringify(Array.from(toDelete)))
      .all<{ id: number }>();
    for (const c of children.results) {
      if (!toDelete.has(c.id)) {
        toDelete.add(c.id);
        changed = true;
      }
    }
  }

  const placeholders = Array.from(toDelete).map(() => "?").join(", ");
  await db
    .prepare(`DELETE FROM guestbook WHERE id IN (${placeholders})`)
    .bind(...Array.from(toDelete))
    .run();

  return NextResponse.json({ success: true });
}
