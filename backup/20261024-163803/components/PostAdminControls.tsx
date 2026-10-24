"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import { useAdmin } from "./AdminContext";
import { InlineEditPanel, MarkdownEditor } from "./InlineEditor";
import { formatDateTime } from "@/lib/utils";

interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  createdAt: string;
}

export function PostAdminControls({ post }: { post: PostData }) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showTimeEdit, setShowTimeEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 编辑表单
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [date, setDate] = useState(post.date);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [content, setContent] = useState(post.content);
  const [createdAt, setCreatedAt] = useState(
    post.createdAt ? new Date(post.createdAt).toISOString().slice(0, 16) : ""
  );
  const router = useRouter();

  if (!isAdmin) return null;

  const handleDelete = async () => {
    if (!confirm(`确定删除 "${post.title}"？此操作不可恢复。`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(post.slug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/blog");
        router.refresh();
      } else {
        alert("删除失败");
      }
    } catch {
      alert("删除失败");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const body: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      date,
      description,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      content,
    };

    // 只有显式展开时间编辑并填了值才传 created_at
    if (showTimeEdit && createdAt) {
      body.created_at = new Date(createdAt).toISOString();
    }

    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(post.slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        setError(err.error || "保存失败");
        return;
      }

      const data = (await res.json()) as { slug?: string };
      setEditing(false);
      if (data.slug && data.slug !== post.slug) {
        router.push(`/blog/${data.slug}`);
      } else {
        router.refresh();
      }
    } catch {
      setError("保存失败");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <InlineEditPanel
        title="编辑文章"
        saving={saving}
        onSave={handleSave}
        onCancel={() => setEditing(false)}
        onToggleTimeEdit={() => setShowTimeEdit(!showTimeEdit)}
        showTimeEdit={showTimeEdit}
        timeEditNode={
          <div>
            <label className="text-xs text-muted block mb-1">
              发布时间（原：{post.createdAt ? formatDateTime(post.createdAt) : "无"}）
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted block mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
              />
            </div>
          </div>

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
            <label className="text-xs text-muted block mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
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
