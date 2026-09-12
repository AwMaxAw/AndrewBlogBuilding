"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  BookOpen,
  MessageSquare,
  ClipboardList,
  Type,
} from "lucide-react";

interface StatsData {
  posts: { count: number; words: number };
  docs: { count: number; words: number };
  siteWords: number;
  comments: { count: number; chars: number };
  guestbook: { count: number; chars: number };
}

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  hint?: string;
}

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="glass-card p-5 z-10">
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-muted text-xs mb-2">
          {stat.icon}
          <span>{stat.label}</span>
        </div>
        <div className="font-serif text-3xl font-semibold">{stat.value}</div>
        {stat.hint && <div className="text-xs text-muted mt-1">{stat.hint}</div>}
      </div>
    </div>
  );
}

export default function StatsGrid() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data as StatsData))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const items: StatItem[] = stats
    ? [
        {
          label: "Posts",
          value: stats.posts.count,
          icon: <FileText size={14} />,
          hint: `${stats.posts.words.toLocaleString()} words`,
        },
        {
          label: "Docs",
          value: stats.docs.count,
          icon: <BookOpen size={14} />,
          hint: `${stats.docs.words.toLocaleString()} words`,
        },
        {
          label: "Site Words",
          value: stats.siteWords.toLocaleString(),
          icon: <Type size={14} />,
          hint: "posts + docs",
        },
        {
          label: "Comments",
          value: stats.comments.count,
          icon: <MessageSquare size={14} />,
          hint: `${stats.comments.chars.toLocaleString()} chars`,
        },
        {
          label: "Guestbook",
          value: stats.guestbook.count,
          icon: <ClipboardList size={14} />,
          hint: `${stats.guestbook.chars.toLocaleString()} chars`,
        },
      ]
    : [
        { label: "Posts", value: "—", icon: <FileText size={14} /> },
        { label: "Docs", value: "—", icon: <BookOpen size={14} /> },
        { label: "Site Words", value: "—", icon: <Type size={14} /> },
        { label: "Comments", value: "—", icon: <MessageSquare size={14} /> },
        { label: "Guestbook", value: "—", icon: <ClipboardList size={14} /> },
      ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
      {loading && (
        <div className="col-span-full text-center text-xs text-muted py-2">
          Loading statistics...
        </div>
      )}
    </div>
  );
}
