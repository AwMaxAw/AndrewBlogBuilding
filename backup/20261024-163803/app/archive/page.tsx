import type { Metadata } from "next";
import { getAllChangelogs } from "@/lib/changelogs";
import ChangelogList from "@/components/ChangelogList";
import StatsGrid from "@/components/StatsGrid";
import { BarChart3, Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "Archive",
  description: "Site archive — content statistics and changelog",
};

export default function ArchivePage() {
  const changelogs = getAllChangelogs();

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

      {/* 统计卡片（客户端获取，兼容 Edge Runtime） */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-accent" />
          <h2 className="font-serif text-2xl font-semibold">Statistics</h2>
        </div>
        <StatsGrid />
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

