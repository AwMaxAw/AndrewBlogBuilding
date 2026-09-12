import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

async function ensureTable(db: D1Database) {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))"
    )
    .run();
  await db
    .prepare("CREATE INDEX IF NOT EXISTS idx_memos_date ON memos(date)")
    .run();
}

// 获取所有备忘录
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  try {
    await ensureTable(db);
    const result = await db
      .prepare("SELECT id, date, content, created_at FROM memos ORDER BY date DESC, id DESC")
      .all();
    return NextResponse.json(result.results);
  } catch {
    return NextResponse.json([]);
  }
}

// 新建备忘录
export async function POST(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
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
    const result = await db
      .prepare("INSERT INTO memos (date, content) VALUES (?, ?)")
      .bind(date.trim(), content.trim())
      .run();
    return NextResponse.json({ success: true, id: result.meta.last_row_id });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
