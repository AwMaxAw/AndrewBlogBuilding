import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取所有留言
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC")
    .all();
  return NextResponse.json(result.results);
}

// 删除留言
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
  await db.prepare("DELETE FROM guestbook WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
