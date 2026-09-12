import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 获取所有备忘录
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, date, content, created_at FROM memos ORDER BY date DESC, id DESC")
    .all();
  return NextResponse.json(result.results);
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
    const result = await db
      .prepare("INSERT INTO memos (date, content) VALUES (?, ?)")
      .bind(date.trim(), content.trim())
      .run();
    return NextResponse.json({ success: true, id: result.meta.last_row_id });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
