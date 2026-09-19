import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

async function ensureTable(db: D1Database) {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))"
    )
    .run();
}

// 更新备忘录
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "无效的 ID" }, { status: 400 });
  }

  const body = (await req.json()) as {
    date?: string;
    content?: string;
    created_at?: string;
  };

  const { date, content, created_at } = body;

  if (date !== undefined && !date.trim()) {
    return NextResponse.json({ error: "日期不能为空" }, { status: 400 });
  }
  if (content !== undefined && !content.trim()) {
    return NextResponse.json({ error: "内容不能为空" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;

  try {
    await ensureTable(db);
    const fields: string[] = [];
    const values: (string | number)[] = [];
    if (date !== undefined) {
      fields.push("date = ?");
      values.push(date.trim());
    }
    if (content !== undefined) {
      fields.push("content = ?");
      values.push(content.trim());
    }
    if (created_at !== undefined) {
      fields.push("created_at = ?");
      values.push(created_at);
    }
    if (fields.length === 0) {
      return NextResponse.json({ error: "没有要更新的字段" }, { status: 400 });
    }
    values.push(id);
    await db
      .prepare(`UPDATE memos SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

// 删除备忘录
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "无效的 ID" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;

  try {
    await ensureTable(db);
    await db
      .prepare("DELETE FROM memos WHERE id = ?")
      .bind(id)
      .run();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
