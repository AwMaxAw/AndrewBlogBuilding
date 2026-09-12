import type { Metadata } from "next";
import { getAllPostsFull } from "@/lib/posts";
import { getDocsCategories } from "@/lib/docs";
import { getAllChangelogs } from "@/lib/changelogs";
import ChangelogList from "@/components/ChangelogList";
import { FileText, BookOpen, MessageSquare, ClipboardList, Type, Hash, BarChart3 } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archive",
  description: "Site archive — content statistics and changelog",
};

interface StatsRow {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  hint?: string;
}

function countWords(text: string): number {
  // 中英混排：英文按空格分词，中文按字符计数
  // 去除 markdown 标记后统计
  const stripped = text
    .replace(/```[\s\S]*?```/g, "") // 代码块
    .replace(/`[^`]*`/g, "") // 行内代码
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // 图片
    .replace(/\[[^\]]*\]\([^)]*\)/g, "$1") // 链接保留文字
    .replace(/[#>*_~-]/g, " ") // markdown 标记
    .replace(/\s+/g, " ")
    .trim();

  let count = 0;
  // 英文单词
  const englishWords = stripped.match(/[a-zA-Z]+/g);
  if (englishWords) count += englishWords.length;
  // 中文字符（逐字计数）
  const chineseChars = stripped.match(/[\u4e00-\u9fa5]/g);
  if (chineseChars) count += chineseChars.length;
  return count;
}

async function getCommentStats(): Promise<{ count: number; totalChars: number }> {
  const db = process.env.blog_db as D1Database | undefined;
  if (!db) return { count: 0, totalChars: 0 };
  try {
    const result = await db
      .prepare("SELECT COUNT(*) as count, COALESCE(SUM(LENGTH(message)), 0) as total_chars FROM comments")
      .first<{ count: number; total_chars: number }>();
    return {
      count: result?.count ?? 0,
      totalChars: result?.total_chars ?? 0,
    };
  } catch {
    return { count: 0, totalChars: 0 };
  }
}

async function getGuestbookStats(): Promise<{ count: number; totalChars: number }> {
  const db = process.env.blog_db as D1Database | undefined;
  if (!db) return { count: 0, totalChars: 0 };
  try {
    const result = await db
      .prepare("SELECT COUNT(*) as count, COALESCE(SUM(LENGTH(message)), 0) as total_chars FROM guestbook")
      .first<{ count: number; total_chars: number }>();
    return {
      count: result?.count ?? 0,
      totalChars: result?.total_chars ?? 0,
    };
  } catch {
    return { count: 0, totalChars: 0 };
  }
}

function StatCard({ stat }: { stat: StatsRow }) {
  return (
    <div className="glass-card p-5 z-10">
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-muted text-xs mb-2">
          {stat.icon}
          <span>{stat.label}</span>
        </div>
        <div className="font-serif text-3xl font-semibold">
          {stat.value}
        </div>
        {stat.hint && (
          <div className="text-xs text-muted mt-1">{stat.hint}</div>
        )}
      </div>
    </div>
  );
}

export default async function ArchivePage() {
  const [posts, docsCats, changelogs] = await Promise.all([
    getAllPostsFull(),
    getDocsCategories(),
    getAllChangelogs(),
  ]);

  const [commentStats, guestbookStats] = await Promise.all([
    getCommentStats(),
    getGuestbookStats(),
  ]);

  // 文章字数
  const postsWords = posts.reduce((sum, p) => sum + countWords(p.content), 0);
  const docsList = docsCats.flatMap((c) => c.sections.flatMap((s) => s.pages));
  // docs 字数需要从 D1 重新读取 content（getDocsCategories 只返回了标题）
  // 这里用 docs 列表已加载的内容来估算
  const db = process.env.blog_db as D1Database | undefined;
  let docsWords = 0;
  if (db) {
    try {
      const docsResult = await db
        .prepare("SELECT content FROM docs")
        .all<{ content: string }>();
      docsWords = docsResult.results.reduce((sum, r) => sum + countWords(r.content || ""), 0);
    } catch {
      docsWords = 0;
    }
  }

  const totalSiteWords = postsWords + docsWords;

  const stats: StatsRow[] = [
    {
      label: "Posts",
      value: posts.length,
      icon: <FileText size={14} />,
      hint: `${postsWords.toLocaleString()} words`,
    },
    {
      label: "Docs",
      value: docsList.length,
      icon: <BookOpen size={14} />,
      hint: `${docsWords.toLocaleString()} words`,
    },
    {
      label: "Site Words",
      value: totalSiteWords.toLocaleString(),
      icon: <Type size={14} />,
      hint: "posts + docs",
    },
    {
      label: "Comments",
      value: commentStats.count,
      icon: <MessageSquare size={14} />,
      hint: `${commentStats.totalChars.toLocaleString()} chars`,
    },
    {
      label: "Guestbook",
      value: guestbookStats.count,
      icon: <ClipboardList size={14} />,
      hint: `${guestbookStats.totalChars.toLocaleString()} chars`,
    },
    {
      label: "Changelog",
      value: changelogs.length,
      icon: <Hash size={14} />,
      hint: changelogs.length === 1 ? "1 entry" : `${changelogs.length} entries`,
    },
  ];

  return (
    <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Archive
        </h1>
        <p className="text-muted text-lg">
          Content statistics and full changelog
        </p>
      </header>

      {/* 统计卡片 */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-accent" />
          <h2 className="font-serif text-2xl font-semibold">Statistics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Hash size={18} className="text-accent" />
          <h2 className="font-serif text-2xl font-semibold">Changelog</h2>
        </div>
        <ChangelogList items={changelogs} />
      </section>
    </div>
  );
}
