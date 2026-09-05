import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const db = process.env.blog_db as D1Database;
  const result = await db
    .prepare("SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC")
    .all<{ id: number; name: string; message: string; created_at: string }>();
  return NextResponse.json(result.results);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { name?: string; message?: string };
  const { name, message } = body;

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
  await db
    .prepare("INSERT INTO guestbook (name, message) VALUES (?, ?)")
    .bind(name.trim(), message.trim())
    .run();

  return NextResponse.json({ success: true });
}
