"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Eye, ExternalLink } from "lucide-react";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { renderMarkdown } from "@/lib/markdown";
import MarkdownToolbar from "./MarkdownToolbar";
import PostTimeline from "@/components/PostTimeline";

interface Post {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  reading_time: string;
  created_at: string;
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
  const [previewPost, setPreviewPost] = useState<Post | null>(null);

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
          <label className="block text-sm text-muted mb-1">内容（Markdown）</label>
          <MarkdownToolbar
            value={form.content}
            onChange={(v) => setForm({ ...form, content: v })}
            placeholder="## 标题&#10;&#10;正文内容..."
          />
        </div>
      </div>
    );
  }

  // 按月份分组
  const groups: { id: string; label: string; count: number }[] = [];
  const groupMap: Record<string, Post[]> = {};
  for (const post of posts) {
    const d = new Date(post.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = `${d.getFullYear()}年${d.getMonth() + 1}月`;
    if (!groupMap[key]) {
      groupMap[key] = [];
      groups.push({ id: `admin-${key}`, label, count: 0 });
    }
    groupMap[key].push(post);
    groups[groups.length - 1].count++;
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
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 min-w-0">
            {groups.map((group) => (
              <section key={group.id} id={group.id} className="mb-8 scroll-mt-24">
                <h2 className="font-serif text-base font-medium text-muted mb-4 flex items-center gap-4">
                  {group.label}
                  <span className="flex-1 h-px bg-border/60" />
                  <span className="text-xs text-muted/60">{group.count}</span>
                </h2>
                <div className="space-y-2">
                  {groupMap[group.id.replace("admin-", "")].map((post) => (
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
                          {post.created_at && (
                            <span className="font-mono text-muted/60">
                              {formatTime(post.created_at)}
                            </span>
                          )}
                          {post.tags.length > 0 && (
                            <span>{post.tags.join(", ")}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setPreviewPost(post)}
                          className="p-2 text-muted hover:text-accent transition-colors"
                          title="预览"
                        >
                          <Eye size={16} />
                        </button>
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
              </section>
            ))}
          </div>
          <PostTimeline groups={groups} />
        </div>
      )}

      {/* 文章预览弹窗 */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-background border border-border/60 shadow-2xl">
            {/* 弹窗头部 */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-border/60 bg-background/95 px-6 py-4 backdrop-blur">
              <h2 className="font-serif text-lg font-semibold">预览文章</h2>
              <div className="flex items-center gap-2">
                <a
                  href={`/blog/${previewPost.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-accent hover:opacity-80"
                >
                  <ExternalLink size={14} />
                  新窗口打开
                </a>
                <button
                  onClick={() => setPreviewPost(null)}
                  className="p-1.5 text-muted hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 预览内容 */}
            <div className="px-6 py-8">
              <header className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl font-semibold leading-tight mb-4">
                  {previewPost.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted pb-6 border-b border-border/60">
                  <span>{formatDate(previewPost.date)}</span>
                  <span>{previewPost.reading_time}</span>
                  {previewPost.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      {previewPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass-tag text-xs text-accent/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(previewPost.content) }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
