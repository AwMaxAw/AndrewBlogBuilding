import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// 自动迁移：为已存在的 guestbook 表添加 parent_id 列
async function ensureSchema(db: D1Database) {
  try {
    await db.exec("ALTER TABLE guestbook ADD COLUMN parent_id INTEGER");
  } catch {
    // 列已存在，忽略
  }
  try {
    await db.exec("CREATE INDEX IF NOT EXISTS idx_guestbook_parent_id ON guestbook(parent_id)");
  } catch {
    // 索引已存在，忽略
  }
}

export async function GET() {
  const db = process.env.blog_db as D1Database;
  await ensureSchema(db);

  const result = await db
    .prepare(
      "SELECT id, name, message, parent_id, created_at FROM guestbook ORDER BY created_at DESC"
    )
    .all<{ id: number; name: string; message: string; parent_id: number | null; created_at: string }>();

  return NextResponse.json(result.results);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { name?: string; message?: string; parent_id?: number };
  const { name, message, parent_id } = body;

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
  }

  if (name.length > 50) {
    return NextResponse.json({ error: "Name too long" }, { status: 400 });
  }

  if (message.length > 500) {
    return NextResponse.json({ error: "Message too long (max 500 chars)" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  await ensureSchema(db);

  // 如果是回复，验证父留言存在
  let replyTo: { id: number; name: string } | null = null;
  if (parent_id) {
    const parent = await db
      .prepare("SELECT id, name FROM guestbook WHERE id = ?")
      .bind(parent_id)
      .first<{ id: number; name: string }>();
    if (!parent) {
      return NextResponse.json({ error: "回复的留言不存在" }, { status: 400 });
    }
    replyTo = parent;
  }

  await db
    .prepare("INSERT INTO guestbook (name, message, parent_id) VALUES (?, ?, ?)")
    .bind(name.trim(), message.trim(), parent_id || null)
    .run();

  return NextResponse.json({ success: true, replyTo });
}
