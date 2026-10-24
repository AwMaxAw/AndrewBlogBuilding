import { NextResponse } from "next/server";
import { getAllPostsFull } from "@/lib/posts";
import { getDocsCategories } from "@/lib/docs";

export const runtime = "edge";

function countWords(text: string): number {
  const stripped = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let count = 0;
  const englishWords = stripped.match(/[a-zA-Z]+/g);
  if (englishWords) count += englishWords.length;
  const chineseChars = stripped.match(/[\u4e00-\u9fa5]/g);
  if (chineseChars) count += chineseChars.length;
  return count;
}

export async function GET() {
  const db = process.env.blog_db as D1Database | undefined;

  const [posts, docsCats] = await Promise.all([
    getAllPostsFull(),
    getDocsCategories(),
  ]);

  const postsWords = posts.reduce((sum, p) => sum + countWords(p.content), 0);

  let docsWords = 0;
  if (db) {
    try {
      const docsResult = await db
        .prepare("SELECT content FROM docs")
        .all<{ content: string }>();
      docsWords = docsResult.results.reduce(
        (sum, r) => sum + countWords(r.content || ""),
        0
      );
    } catch {
      docsWords = 0;
    }
  }

  const docsCount = docsCats.reduce(
    (sum, c) => sum + c.sections.reduce((s, sec) => s + sec.pages.length, 0),
    0
  );

  let commentCount = 0;
  let commentChars = 0;
  let guestbookCount = 0;
  let guestbookChars = 0;
  let guestbookMessages = 0;
  let totalVisits = 0;

  if (db) {
    try {
      const c = await db
        .prepare(
          "SELECT COUNT(*) as count, COALESCE(SUM(LENGTH(message)), 0) as total_chars FROM comments"
        )
        .first<{ count: number; total_chars: number }>();
      commentCount = c?.count ?? 0;
      commentChars = c?.total_chars ?? 0;
    } catch {
      /* ignore */
    }
    try {
      const g = await db
        .prepare(
          "SELECT COUNT(*) as count, COALESCE(SUM(LENGTH(message)), 0) as total_chars FROM guestbook"
        )
        .first<{ count: number; total_chars: number }>();
      guestbookCount = g?.count ?? 0;
      guestbookChars = g?.total_chars ?? 0;

      // 根留言数量（不含回复）
      const gm = await db
        .prepare("SELECT COUNT(*) as count FROM guestbook WHERE parent_id IS NULL")
        .first<{ count: number }>();
      guestbookMessages = gm?.count ?? 0;
    } catch {
      /* ignore */
    }
    try {
      const v = await db
        .prepare("SELECT COALESCE(SUM(count), 0) as total FROM visits")
        .first<{ total: number }>();
      totalVisits = v?.total ?? 0;
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json({
    posts: { count: posts.length, words: postsWords },
    docs: { count: docsCount, words: docsWords },
    siteWords: postsWords + docsWords,
    comments: { count: commentCount, chars: commentChars },
    guestbook: { count: guestbookCount, chars: guestbookChars, messages: guestbookMessages },
    visits: totalVisits,
  });
}
