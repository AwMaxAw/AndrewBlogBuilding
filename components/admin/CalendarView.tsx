"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  X,
  Save,
  FileText,
  BookOpen,
  StickyNote,
} from "lucide-react";

type ViewMode = "posts" | "docs" | "memos";

interface PostItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface DocItem {
  id: number;
  slug: string;
  category_slug: string;
  title: string;
  created_at: string;
}

interface MemoItem {
  id: number;
  date: string;
  content: string;
  created_at: string;
}

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

export default function CalendarView() {
  const [view, setView] = useState<ViewMode>("posts");
  const [current, setCurrent] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 备忘编辑弹窗
  const [editingMemo, setEditingMemo] = useState<MemoItem | null>(null);
  const [memoDate, setMemoDate] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [savingMemo, setSavingMemo] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, dRes, mRes] = await Promise.all([
        fetch("/api/admin/posts"),
        fetch("/api/admin/docs"),
        fetch("/api/admin/memos"),
      ]);
      if (pRes.ok) {
        const data = (await pRes.json()) as any[];
        setPosts(
          data.map((p) => ({
            ...p,
            tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags,
          }))
        );
      }
      if (dRes.ok) setDocs(await dRes.json());
      if (mRes.ok) setMemos(await mRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 按日期分组
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
      const key = d.created_at.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(d);
    }
    return map;
  }, [docs]);

  const memosByDate = useMemo(() => {
    const map: Record<string, MemoItem[]> = {};
    for (const m of memos) {
      const key = m.date.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(m);
    }
    return map;
  }, [memos]);

  // 计算日历格子
  const days = useMemo(() => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    // 周一开始：0=周日 -> 转换为周一=0
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const cells: { date: Date; inMonth: boolean }[] = [];
    // 上月填充
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      cells.push({ date: d, inMonth: false });
    }
    // 本月
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ date: new Date(year, month, i), inMonth: true });
    }
    // 下月填充至 42 格（6 行）
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      const d = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
      cells.push({ date: d, inMonth: false });
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

  // 备忘操作
  const openNewMemo = (dateStr: string) => {
    setEditingMemo(null);
    setMemoDate(dateStr);
    setMemoContent("");
  };

  const openEditMemo = (memo: MemoItem) => {
    setEditingMemo(memo);
    setMemoDate(memo.date.slice(0, 10));
    setMemoContent(memo.content);
  };

  const closeMemo = () => {
    setEditingMemo(null);
    setMemoContent("");
  };

  const saveMemo = async () => {
    if (!memoDate || !memoContent.trim()) {
      alert("日期和内容不能为空");
      return;
    }
    setSavingMemo(true);
    try {
      const url = editingMemo
        ? `/api/admin/memos/${editingMemo.id}`
        : "/api/admin/memos";
      const method = editingMemo ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: memoDate, content: memoContent }),
      });
      if (res.ok) {
        closeMemo();
        loadData();
      } else {
        const data = (await res.json()) as { error?: string };
        alert(data.error || "保存失败");
      }
    } catch {
      alert("网络错误");
    } finally {
      setSavingMemo(false);
    }
  };

  const deleteMemo = async (id: number) => {
    if (!confirm("确定删除此备忘吗？")) return;
    try {
      const res = await fetch(`/api/admin/memos/${id}`, { method: "DELETE" });
      if (res.ok) loadData();
      else alert("删除失败");
    } catch {
      alert("网络错误");
    }
  };

  const monthLabel = `${current.getFullYear()}年${current.getMonth() + 1}月`;

  const viewTabs: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "posts", label: "Posts", icon: <FileText size={14} /> },
    { id: "docs", label: "Docs", icon: <BookOpen size={14} /> },
    { id: "memos", label: "备忘", icon: <StickyNote size={14} /> },
  ];

  if (loading) {
    return <p className="text-muted text-center py-8">加载中...</p>;
  }

  return (
    <div>
      {/* 顶部控制栏 */}
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

        {/* 视图切换 */}
        <div className="flex items-center gap-1 bg-secondary/30 rounded-lg p-1">
          {viewTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                view === t.id
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 日历网格 */}
      <div className="border border-border/50 rounded-xl overflow-hidden bg-white/30 dark:bg-black/20">
        {/* 星期表头 */}
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

        {/* 日期格子 */}
        <div className="grid grid-cols-7">
          {days.map((cell, i) => {
            const key = dateKey(cell.date);
            const isTodayCell = isToday(cell.date);
            const dimmed = !cell.inMonth;

            return (
              <div
                key={i}
                className={`relative min-h-[110px] border-b border-r border-border/30 p-1.5 flex flex-col ${
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
                  {view === "memos" && cell.inMonth && (
                    <button
                      onClick={() => openNewMemo(key)}
                      className="p-0.5 text-muted/40 hover:text-accent transition-colors"
                      title="添加备忘"
                    >
                      <Plus size={12} />
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 min-h-0 -mr-1 pr-1">
                  {/* Posts 模式 */}
                  {view === "posts" &&
                    postsByDate[key]?.map((p) => (
                      <a
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-accent/10 hover:bg-accent/20 rounded px-1.5 py-1 text-[11px] leading-tight transition-colors"
                      >
                        <div className="flex items-start gap-1">
                          <span className="flex-1 truncate text-foreground/90 group-hover:text-accent">
                            {p.title}
                          </span>
                          <Edit2
                            size={10}
                            className="shrink-0 text-muted/50 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              // 跳转到后台编辑 - 通过 hash 触发（由 dashboard 处理）
                              window.location.href = `/admin?edit=post&slug=${p.slug}`;
                            }}
                          />
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

                  {/* Docs 模式 */}
                  {view === "docs" &&
                    docsByDate[key]?.map((d) => (
                      <a
                        key={d.id}
                        href={`/docs/${d.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-emerald-500/10 hover:bg-emerald-500/20 rounded px-1.5 py-1 text-[11px] leading-tight transition-colors"
                      >
                        <div className="flex items-start gap-1">
                          <span className="flex-1 truncate text-foreground/90 group-hover:text-emerald-600">
                            {d.title}
                          </span>
                          <Edit2
                            size={10}
                            className="shrink-0 text-muted/50 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/admin?edit=doc&id=${d.id}`;
                            }}
                          />
                        </div>
                        <span className="text-[9px] text-muted/60">
                          {d.category_slug}
                        </span>
                      </a>
                    ))}

                  {/* Memos 模式 */}
                  {view === "memos" &&
                    memosByDate[key]?.map((m) => (
                      <div
                        key={m.id}
                        className="group bg-amber-500/10 hover:bg-amber-500/20 rounded px-1.5 py-1 text-[11px] leading-tight cursor-pointer transition-colors"
                        onClick={() => openEditMemo(m)}
                      >
                        <div className="flex items-start gap-1">
                          <span className="flex-1 line-clamp-2 text-foreground/90">
                            {m.content}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMemo(m.id);
                            }}
                            className="shrink-0 text-muted/50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 备忘编辑弹窗 */}
      {(editingMemo || memoDate) && view === "memos" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-background border border-border/60 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
              <h3 className="font-serif text-lg font-semibold">
                {editingMemo ? "编辑备忘" : "新建备忘"}
              </h3>
              <button
                onClick={closeMemo}
                className="p-1.5 text-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <label className="block text-sm text-muted mb-1">日期</label>
                <input
                  type="date"
                  value={memoDate}
                  onChange={(e) => setMemoDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">内容</label>
                <textarea
                  value={memoContent}
                  onChange={(e) => setMemoContent(e.target.value)}
                  rows={6}
                  autoFocus
                  placeholder="写下今天的备忘..."
                  className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 resize-y"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border/60 px-6 py-4">
              <button
                onClick={closeMemo}
                className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary/50"
              >
                取消
              </button>
              <button
                onClick={saveMemo}
                disabled={savingMemo}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50"
              >
                <Save size={16} />
                {savingMemo ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
