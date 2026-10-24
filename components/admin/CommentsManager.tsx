"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Save, X, MessageSquare, ExternalLink, FileText } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

interface Comment {
  id: number;
  post_slug: string;
  name: string;
  message: string;
  parent_id: number | null;
  created_at: string;
  post_title?: string;
}

interface TreeNode extends Comment {
  replies: TreeNode[];
}

interface PostGroup {
  slug: string;
  title: string;
  roots: TreeNode[];
  total: number;
}

export default function CommentsManager() {
  const [comments, setComments] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [filterSlug, setFilterSlug] = useState("");
  const [collapsedPosts, setCollapsedPosts] = useState<Set<string>>(new Set());

  const buildTree = (flat: Comment[]): TreeNode[] => {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    for (const entry of flat) {
      map.set(entry.id, { ...entry, replies: [] });
    }

    for (const entry of flat) {
      const node = map.get(entry.id)!;
      if (entry.parent_id === null) {
        roots.push(node);
      } else {
        const parent = map.get(entry.parent_id);
        if (parent) {
          parent.replies.push(node);
        } else {
          roots.push(node);
        }
      }
    }

    roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const sortReplies = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        node.replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        sortReplies(node.replies);
      }
    };
    sortReplies(roots);

    return roots;
  };

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/comments");
      if (res.ok) {
        const data = (await res.json()) as Comment[];
        setComments(buildTree(data));
      }
    } catch {
      console.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此评论吗？其所有回复也会被删除！")) return;
    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      if (res.ok) loadComments();
      else alert("删除失败");
    } catch {
      alert("网络错误");
    }
  };

  const startEdit = (node: TreeNode) => {
    setEditingId(node.id);
    setEditName(node.name);
    setEditMessage(node.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditMessage("");
  };

  const handleSave = async (id: number) => {
    if (!editMessage.trim()) {
      alert("内容不能为空");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editName.trim(), message: editMessage.trim() }),
      });
      if (res.ok) {
        cancelEdit();
        loadComments();
      } else {
        const err = (await res.json()) as { error?: string };
        alert(err.error || "保存失败");
      }
    } catch {
      alert("网络错误");
    } finally {
      setSaving(false);
    }
  };

  const toggleCollapse = (slug: string) => {
    setCollapsedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const findReplyTargetName = (nodes: TreeNode[], id: number): string => {
    for (const node of nodes) {
      if (node.id === id) return node.name;
      const found = findReplyTargetName(node.replies, id);
      if (found) return found;
    }
    return "";
  };

  const countAll = (nodes: TreeNode[]): number => {
    let count = 0;
    for (const node of nodes) {
      count += 1 + countAll(node.replies);
    }
    return count;
  };

  // 按文章分组
  const groups: PostGroup[] = [];
  const groupMap = new Map<string, PostGroup>();

  for (const node of comments) {
    const slug = node.post_slug;
    let group = groupMap.get(slug);
    if (!group) {
      group = {
        slug,
        title: node.post_title || slug,
        roots: [],
        total: 0,
      };
      groupMap.set(slug, group);
      groups.push(group);
    }
    group.roots.push(node);
    group.total += countAll([node]);
  }

  // 按最新评论时间排序
  groups.sort((a, b) => {
    const aTime = a.roots[0] ? new Date(a.roots[0].created_at).getTime() : 0;
    const bTime = b.roots[0] ? new Date(b.roots[0].created_at).getTime() : 0;
    return bTime - aTime;
  });

  const visibleGroups = filterSlug ? groups.filter((g) => g.slug === filterSlug) : groups;
  const totalComments = countAll(comments);

  const renderNode = (node: TreeNode, depth: number, groupSlug: string) => {
    const isEditing = editingId === node.id;
    const targetName = node.parent_id !== null ? findReplyTargetName(comments, node.parent_id) : "";

    return (
      <div key={node.id} className={depth > 0 ? "ml-5 border-l-2 border-border/60 pl-4" : ""}>
        <div className="glass-card p-4 z-10 my-3">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-3 flex-wrap min-w-0">
                {node.parent_id !== null && (
                  <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded shrink-0">
                    回复 @{targetName || "?"}
                  </span>
                )}
                {isEditing ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    maxLength={50}
                    className="px-2 py-1 bg-white/50 dark:bg-black/30 border border-border/50 rounded text-sm font-medium w-40"
                  />
                ) : (
                  <span className="font-medium text-sm">{node.name}</span>
                )}
                <time className="text-xs text-muted font-mono shrink-0">
                  {formatDateTime(node.created_at)}
                </time>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(node.id)}
                      disabled={saving}
                      className="p-1.5 text-muted hover:text-accent transition-colors"
                      title="保存"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1.5 text-muted hover:text-foreground transition-colors"
                      title="取消"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(node)}
                      className="p-1.5 text-muted hover:text-accent transition-colors"
                      title="编辑"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(node.id)}
                      className="p-1.5 text-muted hover:text-red-500 transition-colors"
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                maxLength={500}
                rows={3}
                className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
              />
            ) : (
              <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
                {node.message}
              </p>
            )}
          </div>
        </div>

        {node.replies.length > 0 && (
          <div>
            {node.replies.map((child) => renderNode(child, depth + 1, groupSlug))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* 顶部统计 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <p className="text-muted text-sm">
            共 <span className="text-foreground font-medium">{totalComments}</span> 条评论
          </p>
          <span className="text-muted text-xs">·</span>
          <p className="text-muted text-sm">
            <span className="text-foreground font-medium">{groups.length}</span> 篇文章
          </p>
        </div>
        {filterSlug && (
          <button
            onClick={() => setFilterSlug("")}
            className="glass-btn text-xs text-accent z-10"
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              <X size={12} />
              查看全部
            </span>
          </button>
        )}
      </div>

      {/* 快速筛选：仅在不筛选时显示 */}
      {!filterSlug && groups.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {groups.map((group) => (
            <button
              key={group.slug}
              onClick={() => setFilterSlug(group.slug)}
              className="glass-tag text-xs text-foreground/70 z-10 max-w-[200px] truncate"
              title={group.title}
            >
              <span className="relative z-10 inline-flex items-center gap-1">
                <span className="truncate">{group.title}</span>
                <span className="text-muted">({group.total})</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-muted text-center py-8">加载中...</p>
      ) : visibleGroups.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare size={32} className="mx-auto text-muted mb-3" />
          <p className="text-muted">暂无评论</p>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleGroups.map((group) => {
            const isCollapsed = collapsedPosts.has(group.slug);
            return (
              <section
                key={group.slug}
                className="glass-card p-5 z-10"
              >
                <div className="relative z-10">
                  {/* 文章区块头部 */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-2 border-b border-border/40">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText size={18} className="text-accent shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg font-medium truncate" title={group.title}>
                          {group.title}
                        </h3>
                        <p className="text-xs text-muted font-mono truncate">
                          /blog/{group.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="glass-tag text-xs text-accent/80 z-10">
                        <span className="relative z-10">{group.total} 条</span>
                      </span>
                      <Link
                        href={`/blog/${group.slug}`}
                        target="_blank"
                        className="p-1.5 text-muted hover:text-accent transition-colors"
                        title="查看文章"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button
                        onClick={() => toggleCollapse(group.slug)}
                        className="text-xs text-muted hover:text-foreground transition-colors px-2"
                        title={isCollapsed ? "展开" : "收起"}
                      >
                        {isCollapsed ? "展开" : "收起"}
                      </button>
                    </div>
                  </div>

                  {/* 评论列表 */}
                  {!isCollapsed && (
                    <div>
                      {group.roots.map((node) => renderNode(node, 0, group.slug))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
