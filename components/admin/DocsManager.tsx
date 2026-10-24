"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, FolderPlus, Eye, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { renderMarkdown } from "@/lib/markdown";
import { formatDateTime } from "@/lib/utils";
import MarkdownToolbar from "./MarkdownToolbar";

interface Category {
  id: number;
  slug: string;
  name: string;
  sort_order: number;
}

interface Doc {
  id: number;
  slug: string;
  category_slug: string;
  title: string;
  description: string;
  content: string;
  sort_order: number;
  created_at: string;
}

interface DocForm {
  slug: string;
  category_slug: string;
  title: string;
  description: string;
  content: string;
  sort_order: number;
}

interface CatForm {
  slug: string;
  name: string;
  sort_order: number;
}

const emptyDocForm: DocForm = {
  slug: "",
  category_slug: "",
  title: "",
  description: "",
  content: "",
  sort_order: 0,
};

const emptyCatForm: CatForm = { slug: "", name: "", sort_order: 0 };

export default function DocsManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDoc, setEditingDoc] = useState(false);
  const [editingCat, setEditingCat] = useState(false);
  const [docForm, setDocForm] = useState<DocForm>(emptyDocForm);
  const [catForm, setCatForm] = useState<CatForm>(emptyCatForm);
  const [originalDocId, setOriginalDocId] = useState<number | null>(null);
  const [originalCatSlug, setOriginalCatSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<Doc | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [catRes, docRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/docs"),
      ]);
      if (catRes.ok) {
        const cats = (await catRes.json()) as Category[];
        setCategories(cats);
        if (!activeCategory && cats.length > 0) {
          setActiveCategory(cats[0].slug);
        }
      }
      if (docRes.ok) {
        setDocs(await docRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDocs = docs.filter((d) => d.category_slug === activeCategory);

  // ===== 分类操作 =====
  const startNewCat = () => {
    setCatForm(emptyCatForm);
    setOriginalCatSlug(null);
    setEditingCat(true);
  };

  const startEditCat = (cat: Category) => {
    setCatForm({ slug: cat.slug, name: cat.name, sort_order: cat.sort_order });
    setOriginalCatSlug(cat.slug);
    setEditingCat(true);
  };

  const cancelEditCat = () => {
    setEditingCat(false);
    setCatForm(emptyCatForm);
    setOriginalCatSlug(null);
  };

  const handleSaveCat = async () => {
    if (!catForm.slug.trim() || !catForm.name.trim()) {
      alert("slug 和名称不能为空");
      return;
    }
    setSaving(true);
    try {
      const url = originalCatSlug
        ? `/api/admin/categories/${originalCatSlug}`
        : "/api/admin/categories";
      const method = originalCatSlug ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(catForm),
      });
      if (res.ok) {
        cancelEditCat();
        loadData();
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

  const handleDeleteCat = async (slug: string) => {
    if (!confirm(`确定删除分类 "${slug}" 吗？该分类下所有文档也会被删除！`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${slug}`, { method: "DELETE" });
      if (res.ok) {
        if (activeCategory === slug) setActiveCategory("");
        loadData();
      } else alert("删除失败");
    } catch {
      alert("网络错误");
    }
  };

  // 调整分类排序：与相邻分类交换 sort_order
  const moveCategory = async (cat: Category, direction: "up" | "down") => {
    const sorted = [...categories].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((c) => c.slug === cat.slug);
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;

    const target = sorted[targetIdx];
    const tmpSort = cat.sort_order;
    try {
      // 先把当前分类设为一个临时值，避免唯一冲突
      await fetch(`/api/admin/categories/${cat.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: -99999 }),
      });
      await fetch(`/api/admin/categories/${target.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: tmpSort }),
      });
      await fetch(`/api/admin/categories/${cat.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: target.sort_order }),
      });
      loadData();
    } catch {
      alert("排序更新失败");
    }
  };

  // ===== 文档操作 =====
  const startNewDoc = () => {
    if (!activeCategory) {
      alert("请先选择或创建一个分类");
      return;
    }
    setDocForm({ ...emptyDocForm, category_slug: activeCategory });
    setOriginalDocId(null);
    setEditingDoc(true);
  };

  const startEditDoc = (doc: Doc) => {
    setDocForm({
      slug: doc.slug,
      category_slug: doc.category_slug,
      title: doc.title,
      description: doc.description,
      content: doc.content,
      sort_order: doc.sort_order,
    });
    setOriginalDocId(doc.id);
    setEditingDoc(true);
  };

  const cancelEditDoc = () => {
    setEditingDoc(false);
    setDocForm(emptyDocForm);
    setOriginalDocId(null);
  };

  const handleSaveDoc = async () => {
    if (!docForm.slug.trim() || !docForm.title.trim() || !docForm.content.trim()) {
      alert("slug、标题、内容不能为空");
      return;
    }
    setSaving(true);
    try {
      const url = originalDocId ? `/api/admin/docs/${originalDocId}` : "/api/admin/docs";
      const method = originalDocId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docForm),
      });
      if (res.ok) {
        cancelEditDoc();
        loadData();
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

  const handleDeleteDoc = async (id: number) => {
    if (!confirm("确定删除此文档吗？")) return;
    try {
      const res = await fetch(`/api/admin/docs/${id}`, { method: "DELETE" });
      if (res.ok) loadData();
      else alert("删除失败");
    } catch {
      alert("网络错误");
    }
  };

  // ===== 分类编辑表单 =====
  if (editingCat) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">
            {originalCatSlug ? "编辑分类" : "新建分类"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleSaveCat}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "保存中..." : "保存"}
            </button>
            <button
              onClick={cancelEditCat}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary/50"
            >
              <X size={16} />
              取消
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1">Slug</label>
            <input
              value={catForm.slug}
              onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
              placeholder="site-building"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">名称</label>
            <input
              value={catForm.name}
              onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
              placeholder="Site Building"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">排序（数字越小越靠前）</label>
            <input
              type="number"
              value={catForm.sort_order}
              onChange={(e) => setCatForm({ ...catForm, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>
        </div>
      </div>
    );
  }

  // ===== 文档编辑表单 =====
  if (editingDoc) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">
            {originalDocId ? "编辑文档" : "新建文档"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleSaveDoc}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "保存中..." : "保存"}
            </button>
            <button
              onClick={cancelEditDoc}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary/50"
            >
              <X size={16} />
              取消
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1">分类</label>
            <select
              value={docForm.category_slug}
              onChange={(e) => setDocForm({ ...docForm, category_slug: e.target.value })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Slug</label>
            <input
              value={docForm.slug}
              onChange={(e) => setDocForm({ ...docForm, slug: e.target.value })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
              placeholder="introduction"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">排序</label>
            <input
              type="number"
              value={docForm.sort_order}
              onChange={(e) => setDocForm({ ...docForm, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">标题</label>
          <input
            value={docForm.title}
            onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            placeholder="文档标题"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">描述</label>
          <input
            value={docForm.description}
            onChange={(e) => setDocForm({ ...docForm, description: e.target.value })}
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            placeholder="文档描述"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">内容（Markdown）</label>
          <MarkdownToolbar
            value={docForm.content}
            onChange={(v) => setDocForm({ ...docForm, content: v })}
            placeholder="## 标题&#10;&#10;正文内容..."
          />
        </div>
      </div>
    );
  }

  // ===== 主视图 =====
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm text-muted">分类</h3>
        <button
          onClick={startNewCat}
          className="flex items-center gap-1 text-sm text-accent hover:opacity-80"
        >
          <FolderPlus size={14} />
          新建分类
        </button>
      </div>

      {loading ? (
        <p className="text-muted text-center py-8">加载中...</p>
      ) : categories.length === 0 ? (
        <p className="text-muted text-center py-8">暂无分类</p>
      ) : (
        <div className="flex gap-2 mb-6 flex-wrap items-center">
          {categories.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-1 bg-secondary/30 rounded-lg p-1">
              <button
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-secondary/80"
                }`}
              >
                {cat.name}
              </button>
              <div className="flex flex-col">
                <button
                  onClick={() => moveCategory(cat, "up")}
                  className="p-0.5 text-muted hover:text-accent"
                  title="上移"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={() => moveCategory(cat, "down")}
                  className="p-0.5 text-muted hover:text-accent"
                  title="下移"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
              <button
                onClick={() => startEditCat(cat)}
                className="p-1 text-muted hover:text-accent"
                title="编辑分类"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDeleteCat(cat.slug)}
                className="p-1 text-muted hover:text-red-500"
                title="删除分类"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeCategory && (
        <>
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted text-sm">
              {filteredDocs.length} 篇文档
            </p>
            <button
              onClick={startNewDoc}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90"
            >
              <Plus size={16} />
              新建文档
            </button>
          </div>

          {filteredDocs.length === 0 ? (
            <p className="text-muted text-center py-8">该分类下暂无文档</p>
          ) : (
            <div className="space-y-2">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 glass-card z-10"
                >
                  <div className="relative z-10 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-sm truncate">{doc.title}</h3>
                      <span className="text-xs text-muted font-mono">/{doc.slug}</span>
                    </div>
                    {doc.description && (
                      <p className="text-xs text-muted mt-1 truncate">{doc.description}</p>
                    )}
                    {doc.created_at && (
                      <p className="text-xs text-muted/60 font-mono mt-1">{formatDateTime(doc.created_at)}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                      title="预览"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => startEditDoc(doc)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                      title="编辑"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
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
        </>
      )}

      {/* 文档预览弹窗 */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-background border border-border/60 shadow-2xl">
            {/* 弹窗头部 */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-border/60 bg-background/95 px-6 py-4 backdrop-blur">
              <h2 className="font-serif text-lg font-semibold">预览文档</h2>
              <div className="flex items-center gap-2">
                <a
                  href={`/docs/${previewDoc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-accent hover:opacity-80"
                >
                  <ExternalLink size={14} />
                  新窗口打开
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 text-muted hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 预览内容 */}
            <div className="px-6 py-8">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold leading-tight mb-6">
                {previewDoc.title}
              </h1>
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(previewDoc.content) }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
