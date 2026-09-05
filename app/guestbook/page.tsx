"use client";

import { useState, useEffect, useRef } from "react";
import { formatDateTime } from "@/lib/utils";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guestbook");
      const data = (await res.json()) as GuestbookEntry[];
      setEntries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (res.ok) {
        setName("");
        setMessage("");
        loadEntries();
      } else {
        const err = (await res.json()) as { error?: string };
        alert(err.error || "提交失败");
      }
    } catch (e) {
      alert("提交失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Guestbook
        </h1>
        <p className="text-muted text-lg">Leave a message below</p>
      </header>

      {/* 留言表单 */}
      <form onSubmit={handleSubmit} className="glass-card p-6 mb-10 z-10">
        <div className="relative z-10 space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              maxLength={500}
              rows={4}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
            />
            <p className="text-xs text-muted mt-1 text-right">{message.length}/500</p>
          </div>
          <button
            type="submit"
            disabled={submitting || !name.trim() || !message.trim()}
            className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Leave a message"}
          </button>
        </div>
      </form>

      {/* 留言列表 */}
      <div ref={listRef} className="space-y-4">
        {loading ? (
          <p className="text-muted text-center py-8">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-muted text-center py-8">No messages yet. Be the first!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="glass-card p-5 z-10">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{entry.name}</span>
                  <time className="text-xs text-muted font-mono">
                    {formatDateTime(entry.created_at)}
                  </time>
                </div>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
                  {entry.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
