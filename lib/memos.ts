export interface Memo {
  id: number;
  date: string;
  content: string;
  created_at: string;
}

function getDb(): D1Database | null {
  return (process.env.blog_db as D1Database) || null;
}

export async function getAllMemos(): Promise<Memo[]> {
  const db = getDb();
  if (!db) return [];
  const result = await db
    .prepare("SELECT id, date, content, created_at FROM memos ORDER BY date DESC, id DESC")
    .all<Memo>();
  return result.results;
}
