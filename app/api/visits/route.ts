import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const db = process.env.blog_db as D1Database | undefined;
  if (!db) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let path = "/";
  try {
    const body = (await req.json().catch(() => ({}))) as { path?: string };
    if (body.path && typeof body.path === "string") {
      path = body.path;
    }
  } catch {
    path = "/";
  }

  try {
    await db
      .prepare(
        `INSERT INTO visits (path, date, count)
         VALUES (?, date('now'), 1)
         ON CONFLICT(path, date) DO UPDATE SET count = count + 1`
      )
      .bind(path)
      .run();
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
