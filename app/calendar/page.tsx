import type { Metadata } from "next";
import PublicCalendar from "@/components/PublicCalendar";
import { getAllPosts } from "@/lib/posts";
import { getDocsCategories } from "@/lib/docs";
import { getAllMemos } from "@/lib/memos";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Calendar",
  description: "按日期浏览文章、文档与备忘",
};

export default async function CalendarPage() {
  const [posts, categories, memos] = await Promise.all([
    getAllPosts(),
    getDocsCategories(),
    getAllMemos(),
  ]);

  const docs = categories.flatMap((cat) =>
    cat.sections.flatMap((s) =>
      s.pages.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        category: cat.label,
      }))
    )
  );

  return (
    <PublicCalendar
      posts={posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        tags: p.tags,
      }))}
      docs={docs}
      memos={memos.map((m) => ({
        id: m.id,
        date: m.date,
        content: m.content,
      }))}
    />
  );
}
