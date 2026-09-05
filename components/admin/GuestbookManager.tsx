"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface Entry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookManager() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/guestbook");
      if (res.ok) {
        setEntries(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此留言吗？")) return;
    try {
      const res = await fetch(`/api/admin/guestbook?id=${id}`, { method: "DELETE" });
      if (res.ok) loadEntries();
      else alert("删除失败");
    } catch {
      alert("网络错误");
    }
  };

  return (
    <div>
      <p className="text-muted text-sm mb-4">{entries.length} 条留言</p>

      {loading ? (
        <p className="text-muted text-center py-8">加载中...</p>
      ) : entries.length === 0 ? (
        <p className="text-muted text-center py-8">暂无留言</p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="glass-card p-4 z-10">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{entry.name}</span>
                    <time className="text-xs text-muted font-mono">
                      {formatDateTime(entry.created_at)}
                    </time>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 text-muted hover:text-red-500 transition-colors"
                    title="删除留言"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
                  {entry.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
