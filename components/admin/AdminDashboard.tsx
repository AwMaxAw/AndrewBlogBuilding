"use client";

import { useState } from "react";
import PostsManager from "./PostsManager";
import DocsManager from "./DocsManager";
import GuestbookManager from "./GuestbookManager";
import CalendarView from "./CalendarView";
import { LogOut, CalendarDays } from "lucide-react";

type Tab = "posts" | "docs" | "calendar" | "guestbook";

interface Props {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("posts");

  const handleLogout = async () => {
    // 清除 cookie
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";
    onLogout();
  };

  const tabs: { id: Tab; label: string; icon?: React.ReactNode }[] = [
    { id: "posts", label: "文章 Posts" },
    { id: "docs", label: "文档 Docs" },
    { id: "calendar", label: "日历 Calendar", icon: <CalendarDays size={14} /> },
    { id: "guestbook", label: "留言 Guestbook" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold">管理后台</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          退出
        </button>
      </header>

      {/* Tab 导航 */}
      <div className="flex gap-2 mb-8 border-b border-border/60">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* 内容区 */}
      <div>
        {tab === "posts" && <PostsManager />}
        {tab === "docs" && <DocsManager />}
        {tab === "calendar" && <CalendarView />}
        {tab === "guestbook" && <GuestbookManager />}
      </div>
    </div>
  );
}
