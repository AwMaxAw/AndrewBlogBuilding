"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  reading_time: string;
}

interface PostForm {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string;
  content: string;
}

const emptyForm: PostForm = {
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  tags: "",
  content: "",
};

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = (await res.json()) as Post[];
        setPosts(data.map((p) => ({ ...p, tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const startNew = () => {
    setForm(emptyForm);
    setOriginalSlug(null);
    setEditing(true);
  };

  const startEdit = (post: Post) => {
    setForm({
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      tags: post.tags.join(", "),
      content: post.content,
    });
    setOriginalSlug(post.slug);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setForm(emptyForm);
    setOriginalSlug(null);
  };

  const handleSave = async () => {
    if (!form.slug.trim() || !form.title.trim() || !form.content.trim()) {
      alert("slug、标题、内容不能为空");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        date: form.date,
        description: form.description,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        content: form.content,
      };

      const url = originalSlug ? `/api/admin/posts/${originalSlug}` : "/api/admin/posts";
      const method = originalSlug ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        cancelEdit();
        loadPosts();
      } else {
        const data = (await res.json()) as { error?: string };
        alert(data.error || "保存失败");
      }
    } catch {
      alert("网络错误");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`确定删除文章 "${slug}" 吗？此操作不可撤销。`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
      if (res.ok) loadPosts();
      else alert("删除失败");
    } catch {
      alert("网络错误");
    }
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">
            {originalSlug ? "编辑文章" : "新建文章"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "保存中..." : "保存"}
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary/50"
            >
              <X size={16} />
              取消
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
              placeholder="hello-world"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">日期</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">标题</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            placeholder="文章标题"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">描述</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            placeholder="文章描述"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">标签（用逗号分隔）</label>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">内容（MDX）</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={20}
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm font-mono focus:outline-none focus:border-accent/60 resize-y"
            placeholder="## 标题&#10;&#10;正文内容..."
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted text-sm">{posts.length} 篇文章</p>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90"
        >
          <Plus size={16} />
          新建文章
        </button>
      </div>

      {loading ? (
        <p className="text-muted text-center py-8">加载中...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted text-center py-8">暂无文章</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 glass-card z-10"
            >
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-sm truncate">{post.title}</h3>
                  <span className="text-xs text-muted font-mono">/{post.slug}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span>{formatDate(post.date, true)}</span>
                  {post.tags.length > 0 && (
                    <span>{post.tags.join(", ")}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(post)}
                  className="p-2 text-muted hover:text-accent transition-colors"
                  title="编辑"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="p-2 text-muted hover:text-red-500 transition-colors"
                  title="删除"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
