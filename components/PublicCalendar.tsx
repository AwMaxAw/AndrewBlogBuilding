"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";

type ViewMode = "posts" | "docs";

interface PostItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface DocItem {
  slug: string;
  title: string;
  date: string;
  category: string;
}

interface Props {
  posts: PostItem[];
  docs: DocItem[];
}

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

export default function PublicCalendar({ posts, docs }: Props) {
  const [view, setView] = useState<ViewMode>("posts");
  const [current, setCurrent] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const postsByDate = useMemo(() => {
    const map: Record<string, PostItem[]> = {};
    for (const p of posts) {
      const key = p.date.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(p);
    }
    return map;
  }, [posts]);

  const docsByDate = useMemo(() => {
    const map: Record<string, DocItem[]> = {};
    for (const d of docs) {
      const key = d.date.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(d);
    }
    return map;
  }, [docs]);

  const days = useMemo(() => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const cells: { date: Date; inMonth: boolean }[] = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month, -i), inMonth: false });
    }
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ date: new Date(year, month, i), inMonth: true });
    }
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      cells.push({
        date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
        inMonth: false,
      });
    }
    return cells;
  }, [current]);

  const dateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const goPrev = () =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const goNext = () =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  const goToday = () => {
    const now = new Date();
    setCurrent(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const isToday = (d: Date) => {
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const monthLabel = `${current.getFullYear()}年${current.getMonth() + 1}月`;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Calendar
        </h1>
        <p className="text-muted text-lg">按日期浏览文章与文档</p>
      </header>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="p-2 rounded-lg hover:bg-secondary/60 transition-colors text-muted hover:text-foreground"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-serif text-lg font-semibold min-w-[120px] text-center">
            {monthLabel}
          </h2>
          <button
            onClick={goNext}
            className="p-2 rounded-lg hover:bg-secondary/60 transition-colors text-muted hover:text-foreground"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={goToday}
            className="ml-2 px-3 py-1.5 text-xs border border-border rounded-lg text-muted hover:text-foreground hover:bg-secondary/40 transition-colors"
          >
            今天
          </button>
        </div>

        <div className="flex items-center gap-1 bg-secondary/30 rounded-lg p-1">
          <button
            onClick={() => setView("posts")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              view === "posts"
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            <FileText size={14} />
            Posts
          </button>
          <button
            onClick={() => setView("docs")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              view === "docs"
                ? "bg-emerald-500 text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            <BookOpen size={14} />
            Docs
          </button>
        </div>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden bg-white/30 dark:bg-black/20">
        <div className="grid grid-cols-7 border-b border-border/50 bg-secondary/20">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="py-2 text-center text-xs font-medium text-muted"
            >
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((cell, i) => {
            const key = dateKey(cell.date);
            const isTodayCell = isToday(cell.date);
            const dimmed = !cell.inMonth;

            return (
              <div
                key={i}
                className={`relative h-28 md:h-32 border-b border-r border-border/30 p-1.5 flex flex-col ${
                  dimmed ? "bg-secondary/10" : ""
                } ${i % 7 === 6 ? "border-r-0" : ""} ${
                  i >= 35 ? "border-b-0" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-mono w-5 h-5 flex items-center justify-center rounded-full ${
                      isTodayCell
                        ? "bg-accent text-white"
                        : dimmed
                        ? "text-muted/30"
                        : "text-muted"
                    }`}
                  >
                    {cell.date.getDate()}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 min-h-0 scrollbar-thin">
                  {view === "posts" &&
                    postsByDate[key]?.map((p) => (
                      <a
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="group block border border-accent/30 bg-accent/5 hover:bg-accent/15 rounded px-1.5 py-1 text-[11px] leading-tight transition-colors"
                      >
                        <div className="truncate text-foreground/90 group-hover:text-accent">
                          {p.title}
                        </div>
                        {p.tags.length > 0 && (
                          <div className="flex flex-wrap gap-0.5 mt-0.5">
                            {p.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[9px] px-1 rounded bg-accent/20 text-accent/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </a>
                    ))}

                  {view === "docs" &&
                    docsByDate[key]?.map((d) => (
                      <a
                        key={d.slug}
                        href={`/docs/${d.slug}`}
                        className="group block border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 rounded px-1.5 py-1 text-[11px] leading-tight transition-colors"
                      >
                        <div className="truncate text-foreground/90 group-hover:text-emerald-600">
                          {d.title}
                        </div>
                        <span className="text-[9px] text-muted/60">
                          {d.category}
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
