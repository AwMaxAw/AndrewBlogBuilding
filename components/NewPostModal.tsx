"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Save } from "lucide-react";
import { useAdmin } from "./AdminContext";
import { MarkdownEditor } from "./InlineEditor";

export function NewPostButton() {
  const { isAdmin } = useAdmin();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!isAdmin) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-btn z-10"
        title="新建文章"
      >
        <span className="relative z-10 inline-flex items-center gap-2 text-sm text-foreground">
          <Plus size={14} />
          New
        </span>
      </button>

      {open && (
        <NewPostModal
          onClose={() => setOpen(false)}
          onCreated={(slug) => {
            setOpen(false);
            router.push(`/blog/${slug}`);
          }}
        />
      )}
    </>
  );
}

function NewPostModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (slug: string) => void;
}) {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!slug.trim() || !title.trim() || !content.trim()) {
      setError("slug、标题、内容不能为空");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim(),
          title: title.trim(),
          description,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          content,
          date,
          published: published ? 1 : 0,
        }),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        setError(err.error || "创建失败");
        return;
      }

      const data = (await res.json()) as { slug: string };
      onCreated(data.slug);
    } catch {
      setError("创建失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="glass-card p-6 z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">New Post</h2>
            <button
              onClick={onClose}
              className="p-1 text-muted hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted block mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-new-post"
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
              placeholder="Post title"
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted block mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2"
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted block mb-1">Content (Markdown)</label>
            <MarkdownEditor value={content} onChange={setContent} rows={12} />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            <span>立即发布（不勾选则保存为草稿）</span>
          </label>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? "保存中..." : "保存"}
            </button>
            <button
              onClick={onClose}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
