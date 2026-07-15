import type { Metadata } from "next";
import ChangelogList from "@/components/ChangelogList";
import { getAllChangelogs } from "@/lib/changelogs";

export const metadata: Metadata = {
  title: "日志",
  description: "网站更新日志",
};

export default function ChangelogPage() {
  const items = getAllChangelogs();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          更新日志
        </h1>
        <p className="text-muted text-lg">
          共 {items.length} 条记录
        </p>
      </header>
      <ChangelogList items={items} />
    </div>
  );
}
