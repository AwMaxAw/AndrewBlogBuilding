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
  };

  const { date, content } = body;

  if (!date?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "日期和内容不能为空" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;

  try {
    await ensureTable(db);
    await db
      .prepare("UPDATE memos SET date = ?, content = ? WHERE id = ?")
      .bind(date.trim(), content.trim(), id)
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
