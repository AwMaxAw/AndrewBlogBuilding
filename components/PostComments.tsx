"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/lib/utils";
import { Reply, MessageSquare, Edit2, Trash2, Clock, Save, X } from "lucide-react";
import { useAdmin } from "./AdminContext";

interface Comment {
  id: number;
  post_slug: string;
  name: string;
  message: string;
  parent_id: number | null;
  created_at: string;
}

interface TreeNode extends Comment {
  replies: TreeNode[];
}

export default function PostComments({ slug }: { slug: string }) {
  const { isAdmin } = useAdmin();
  const [comments, setComments] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
  // 评论编辑状态
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editCreatedAt, setEditCreatedAt] = useState("");
  const [editShowTime, setEditShowTime] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

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

    const sortRepliesAsc = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        node.replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        sortRepliesAsc(node.replies);
      }
    };
    sortRepliesAsc(roots);

    return roots;
  };

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      const data = (await res.json()) as Comment[];
      setComments(buildTree(data));
    } catch {
      console.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_slug: slug, name: name.trim(), message: message.trim() }),
      });
      if (res.ok) {
        setName("");
        setMessage("");
        loadComments();
      } else {
        const err = (await res.json()) as { error?: string };
        alert(err.error || "评论失败");
      }
    } catch {
      alert("评论失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyName.trim() || !replyMessage.trim()) return;

    setReplySubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_slug: slug,
          name: replyName.trim(),
          message: replyMessage.trim(),
          parent_id: parentId,
        }),
      });
      if (res.ok) {
        setReplyName("");
        setReplyMessage("");
        setReplyTo(null);
        loadComments();
      } else {
        const err = (await res.json()) as { error?: string };
        alert(err.error || "回复失败");
      }
    } catch {
      alert("回复失败，请重试");
    } finally {
      setReplySubmitting(false);
    }
  };

  const startEditComment = (node: TreeNode) => {
    setEditingId(node.id);
    setEditName(node.name);
    setEditMessage(node.message);
    setEditCreatedAt(
      node.created_at ? new Date(node.created_at).toISOString().slice(0, 16) : ""
    );
    setEditShowTime(false);
  };

  const cancelEditComment = () => {
    setEditingId(null);
    setEditName("");
    setEditMessage("");
    setEditCreatedAt("");
    setEditShowTime(false);
  };

  const saveEditComment = async (id: number) => {
    if (!editName.trim() || !editMessage.trim()) return;
    setEditSaving(true);
    try {
      const body: Record<string, unknown> = {
        id,
        name: editName.trim(),
        message: editMessage.trim(),
      };
      if (editShowTime && editCreatedAt) {
        body.created_at = new Date(editCreatedAt).toISOString();
      }
      const res = await fetch("/api/admin/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        cancelEditComment();
        loadComments();
      } else {
        const err = (await res.json()) as { error?: string };
        alert(err.error || "保存失败");
      }
    } catch {
      alert("保存失败");
    } finally {
      setEditSaving(false);
    }
  };

  const deleteComment = async (id: number) => {
    if (!confirm("确定删除该评论？所有回复也会一并删除。")) return;
    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadComments();
      } else {
        alert("删除失败");
      }
    } catch {
      alert("删除失败");
    }
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

  const renderNode = (node: TreeNode, depth: number) => {
    const isReplying = replyTo === node.id;
    const isEditing = editingId === node.id;
    const targetName = findReplyTargetName(comments, node.parent_id || 0);
    const isRoot = depth === 0;

    // admin 编辑面板（共用）
    const editPanel = isEditing && (
      <div className="mt-3 p-4 bg-background/40 rounded-lg space-y-3">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Your name"
          maxLength={50}
          className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
        />
        <textarea
          value={editMessage}
          onChange={(e) => setEditMessage(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 resize-none"
        />
        <button
          type="button"
          onClick={() => setEditShowTime(!editShowTime)}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          <Clock size={12} />
          {editShowTime ? "收起时间编辑" : "编辑时间"}
        </button>
        {editShowTime && (
          <div>
            <label className="text-xs text-muted block mb-1">
              原时间：{formatDateTime(node.created_at)}
            </label>
            <input
              type="datetime-local"
              value={editCreatedAt}
              onChange={(e) => setEditCreatedAt(e.target.value)}
              className="px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
            <p className="text-xs text-muted mt-1">不修改则保留原时间</p>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => saveEditComment(node.id)}
            disabled={editSaving}
            className="inline-flex items-center gap-1 px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={12} />
            {editSaving ? "保存中..." : "保存"}
          </button>
          <button
            type="button"
            onClick={cancelEditComment}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    );

    // admin 操作按钮（编辑/删除）
    const adminButtons = isAdmin && !isEditing && (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={() => startEditComment(node)}
          title="编辑"
          className="p-1 text-muted hover:text-accent transition-colors"
        >
          <Edit2 size={12} />
        </button>
        <button
          onClick={() => deleteComment(node.id)}
          title="删除"
          className="p-1 text-muted hover:text-red-500 transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </span>
    );

    // 回复内容（简洁样式，→ @被回复者）
    const replyBody = (
      <div className="py-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-accent">{node.name}</span>
          {targetName && (
            <span className="text-xs text-muted">→ @{targetName}</span>
          )}
          <time className="text-xs text-muted font-mono">
            {formatDateTime(node.created_at)}
          </time>
          {adminButtons}
        </div>
        <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
          {node.message}
        </p>
        {editPanel}
        <button
          onClick={() => {
            setReplyTo(isReplying ? null : node.id);
            setReplyName("");
            setReplyMessage("");
          }}
          className="mt-1 inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          <Reply size={12} />
          Reply
        </button>

        {isReplying && (
          <form
            onSubmit={(e) => handleReply(node.id, e)}
            className="mt-3 p-3 bg-background/40 rounded-lg space-y-2"
          >
            <input
              type="text"
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              autoFocus
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`Reply to ${node.name}...`}
              maxLength={500}
              rows={2}
              className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={replySubmitting || !replyName.trim() || !replyMessage.trim()}
                className="px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {replySubmitting ? "Sending..." : "Reply"}
              </button>
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    );

    if (isRoot) {
      // 根评论：glass-card 包裹，回复也在同一个板块内
      return (
        <div key={node.id} className="my-3">
          <div className="glass-card p-5 z-10">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{node.name}</span>
                <div className="flex items-center gap-2">
                  <time className="text-xs text-muted font-mono">
                    {formatDateTime(node.created_at)}
                  </time>
                  {adminButtons}
                </div>
              </div>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
                {node.message}
              </p>
              {editPanel}
              <button
                onClick={() => {
                  setReplyTo(isReplying ? null : node.id);
                  setReplyName("");
                  setReplyMessage("");
                }}
                className="mt-3 inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
              >
                <Reply size={12} />
                Reply
              </button>

              {isReplying && (
                <form
                  onSubmit={(e) => handleReply(node.id, e)}
                  className="mt-4 p-4 bg-background/40 rounded-lg space-y-3"
                >
                  <input
                    type="text"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    placeholder="Your name"
                    maxLength={50}
                    autoFocus
                    className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={`Reply to ${node.name}...`}
                    maxLength={500}
                    rows={2}
                    className="w-full px-3 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={replySubmitting || !replyName.trim() || !replyMessage.trim()}
                      className="px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {replySubmitting ? "Sending..." : "Reply"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      className="text-xs text-muted hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* 回复嵌套在同一个 glass-card 内 */}
              {node.replies.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/40 space-y-3">
                  {node.replies.map((child) => renderNode(child, depth + 1))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 回复：左侧竖线缩进
    return (
      <div key={node.id} className="ml-4 border-l-2 border-border/60 pl-4">
        {replyBody}
        {node.replies.length > 0 && (
          <div className="mt-2 space-y-3">
            {node.replies.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="mt-16 pt-8 border-t border-border/60">
      <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-2">
        <MessageSquare size={22} />
        评论 {countAll(comments) > 0 && <span className="text-muted text-base">({countAll(comments)})</span>}
      </h2>

      {/* 评论表单 */}
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
              placeholder="Write a comment..."
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
            {submitting ? "Sending..." : "Comment"}
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-0">
        {loading ? (
          <p className="text-muted text-center py-8">Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted text-center py-8">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => renderNode(comment, 0))
        )}
      </div>
    </section>
  );
}
