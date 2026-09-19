"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Clock, Save, X } from "lucide-react";
import { useAdmin } from "./AdminContext";
import { InlineEditPanel, MarkdownEditor } from "./InlineEditor";
import { formatDateTime } from "@/lib/utils";

interface DocData {
  id: number;
  slug: string;
  category_slug: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
}

export function DocAdminControls({ doc }: { doc: DocData }) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showTimeEdit, setShowTimeEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [title, setTitle] = useState(doc.title);
  const [description, setDescription] = useState(doc.description);
  const [content, setContent] = useState(doc.content);
  const [createdAt, setCreatedAt] = useState(
    doc.createdAt ? new Date(doc.createdAt).toISOString().slice(0, 16) : ""
  );

  if (!isAdmin) return null;

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const body: Record<string, unknown> = {
      title: title.trim(),
      description,
      content,
    };

    if (showTimeEdit && createdAt) {
      body.created_at = new Date(createdAt).toISOString();
    }

    try {
      const res = await fetch(`/api/admin/docs/${doc.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        setError(err.error || "保存失败");
        return;
      }

      setEditing(false);
      router.refresh();
    } catch {
      setError("保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`确定删除 "${doc.title}"？此操作不可恢复。`)) return;
    try {
      const res = await fetch(`/api/admin/docs/${doc.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/docs");
        router.refresh();
      } else {
        alert("删除失败");
      }
    } catch {
      alert("删除失败");
    }
  };

  if (editing) {
    return (
      <InlineEditPanel
        title="编辑文档"
        saving={saving}
        onSave={handleSave}
        onCancel={() => setEditing(false)}
        onToggleTimeEdit={() => setShowTimeEdit(!showTimeEdit)}
        showTimeEdit={showTimeEdit}
        timeEditNode={
          <div>
            <label className="text-xs text-muted block mb-1">
              创建时间（原：{doc.createdAt ? formatDateTime(doc.createdAt) : "无"}）
            </label>
            <input
              type="datetime-local"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className="px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
            <p className="text-xs text-muted mt-1">不修改则保留原时间</p>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted block mb-1">Content (Markdown)</label>
            <MarkdownEditor value={content} onChange={setContent} rows={14} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </InlineEditPanel>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setEditing(true)}
        title="编辑"
        className="inline-flex items-center gap-1 p-1.5 rounded-full text-muted hover:text-accent hover:bg-accent/10 transition-all"
      >
        <Edit2 size={14} />
      </button>
      <button
        onClick={handleDelete}
        title="删除"
        className="inline-flex items-center gap-1 p-1.5 rounded-full text-muted hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
