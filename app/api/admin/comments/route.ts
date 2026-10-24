import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { decodeSlug } from "@/lib/utils";

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

// 获取所有评论
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  try {
    await ensureTable(db);
    // 尝试两种 slug 形式匹配文章：原始 slug 与解码后 slug
    const result = await db
      .prepare(
        `SELECT c.id, c.post_slug, c.name, c.message, c.parent_id, c.created_at,
                p.title AS post_title
         FROM comments c
         LEFT JOIN posts p ON c.post_slug = p.slug
         ORDER BY c.created_at DESC`
      )
      .all<{ post_title?: string; post_slug: string }>();

    const rows = result.results.map((r) => {
      // JOIN 失败（历史数据 slug 编码不一致）时，用解码后 slug 兜底查询标题
      if (!r.post_title || r.post_title === r.post_slug) {
        const decoded = decodeSlug(r.post_slug);
        r.post_title = decoded !== r.post_slug ? decoded : r.post_slug;
      }
      return r;
    });
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([]);
  }
}

// 编辑评论
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

  try {
    const existing = await db
      .prepare("SELECT id FROM comments WHERE id = ?")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json({ error: "评论不存在" }, { status: 404 });
    }

    const fields: string[] = [];
    const values: (string | number)[] = [];

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

    values.push(id);
    const sql = `UPDATE comments SET ${fields.join(", ")} WHERE id = ?`;
    await db.prepare(sql).bind(...values).run();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

// 删除评论（递归删除其所有回复）
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

  try {
    // 递归收集所有后代 id
    const toDelete = new Set<number>([parseInt(id)]);
    let changed = true;
    while (changed) {
      changed = false;
      const children = await db
        .prepare(
          "SELECT id FROM comments WHERE parent_id IN (SELECT value FROM json_each(?))"
        )
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
      .prepare(`DELETE FROM comments WHERE id IN (${placeholders})`)
      .bind(...Array.from(toDelete))
      .run();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
