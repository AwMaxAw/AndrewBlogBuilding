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
  const [posts, categories, memos] = await Promise.allSettled([
    getAllPosts(),
    getDocsCategories(),
    getAllMemos(),
  ]).then((results) =>
    results.map((r) => (r.status === "fulfilled" ? r.value : []))
  );

  const docs = (categories as any[]).flatMap((cat) =>
    cat.sections.flatMap((s: any) =>
      s.pages.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        category: cat.label,
      }))
    )
  );

  return (
    <PublicCalendar
      posts={(posts as any[]).map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        tags: p.tags,
      }))}
      docs={docs}
      memos={(memos as any[]).map((m) => ({
        id: m.id,
        date: m.date,
        content: m.content,
      }))}
    />
  );
}
