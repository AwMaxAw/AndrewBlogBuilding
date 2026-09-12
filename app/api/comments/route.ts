import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

async function ensureTable(db: D1Database) {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_slug TEXT NOT NULL, name TEXT NOT NULL, message TEXT NOT NULL, parent_id INTEGER, created_at TEXT NOT NULL DEFAULT (datetime('now')))"
    )
    .run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id)").run();
}

// 获取某篇文章的评论
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const post_slug = searchParams.get("slug");

  if (!post_slug) {
    return NextResponse.json({ error: "缺少 slug 参数" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;
  try {
    await ensureTable(db);
    const result = await db
      .prepare(
        "SELECT id, post_slug, name, message, parent_id, created_at FROM comments WHERE post_slug = ? ORDER BY created_at DESC"
      )
      .bind(post_slug)
      .all<{
        id: number;
        post_slug: string;
        name: string;
        message: string;
        parent_id: number | null;
        created_at: string;
      }>();

    return NextResponse.json(result.results);
  } catch {
    return NextResponse.json([]);
  }
}

// 新建评论
export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    post_slug?: string;
    name?: string;
    message?: string;
    parent_id?: number;
  };

  const { post_slug, name, message, parent_id } = body;

  if (!post_slug?.trim()) {
    return NextResponse.json({ error: "缺少文章标识" }, { status: 400 });
  }
  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "昵称和内容不能为空" }, { status: 400 });
  }
  if (name.length > 50) {
    return NextResponse.json({ error: "昵称过长" }, { status: 400 });
  }
  if (message.length > 500) {
    return NextResponse.json({ error: "评论过长（最多 500 字）" }, { status: 400 });
  }

  const db = process.env.blog_db as D1Database;

  try {
    await ensureTable(db);

    // 如果是回复，验证父评论存在且属于同一篇文章
    let replyTo: { id: number; name: string } | null = null;
    if (parent_id) {
      const parent = await db
        .prepare("SELECT id, name, post_slug FROM comments WHERE id = ?")
        .bind(parent_id)
        .first<{ id: number; name: string; post_slug: string }>();
      if (!parent) {
        return NextResponse.json({ error: "回复的评论不存在" }, { status: 400 });
      }
      if (parent.post_slug !== post_slug) {
        return NextResponse.json({ error: "不能跨文章回复" }, { status: 400 });
      }
      replyTo = { id: parent.id, name: parent.name };
    }

    await db
      .prepare("INSERT INTO comments (post_slug, name, message, parent_id) VALUES (?, ?, ?, ?)")
      .bind(post_slug.trim(), name.trim(), message.trim(), parent_id || null)
      .run();

    return NextResponse.json({ success: true, replyTo });
  } catch {
    return NextResponse.json({ error: "评论失败" }, { status: 500 });
  }
}
