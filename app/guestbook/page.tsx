"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/lib/utils";
import { Reply, Edit2, Trash2, Clock, Save, Play } from "lucide-react";
import { useAdmin } from "@/components/AdminContext";
import Danmaku from "@/components/Danmaku";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  parent_id: number | null;
  created_at: string;
}

interface TreeNode extends GuestbookEntry {
  replies: TreeNode[];
}

export default function GuestbookPage() {
  const { isAdmin } = useAdmin();
  const [entries, setEntries] = useState<TreeNode[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
  // 编辑状态
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editCreatedAt, setEditCreatedAt] = useState("");
  const [editShowTime, setEditShowTime] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  const buildTree = (flat: GuestbookEntry[]): TreeNode[] => {
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
          // 父节点不存在（可能已删除），作为根节点显示
          roots.push(node);
        }
      }
    }

    // 根节点按时间倒序（最新在前）
    roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // 所有层级的回复按时间正序
    const sortRepliesAsc = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        node.replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        sortRepliesAsc(node.replies);
      }
    };
    sortRepliesAsc(roots);

    return roots;
  };

  // 扁平化所有留言（根+回复）供弹幕使用
  const flattenAll = (nodes: TreeNode[]): { name: string; message: string }[] => {
    const result: { name: string; message: string }[] = [];
    const walk = (list: TreeNode[]) => {
      for (const n of list) {
        result.push({ name: n.name, message: n.message });
        walk(n.replies);
      }
    };
    walk(nodes);
    return result;
  };

  const loadEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guestbook");
      const data = (await res.json()) as GuestbookEntry[];
      setEntries(buildTree(data));
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
    } catch {
      alert("提交失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyName.trim() || !replyMessage.trim()) return;

    setReplySubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: replyName.trim(),
          message: replyMessage.trim(),
          parent_id: parentId,
        }),
      });
      if (res.ok) {
        setReplyName("");
        setReplyMessage("");
        setReplyTo(null);
        loadEntries();
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

  const startEdit = (node: TreeNode) => {
    setEditingId(node.id);
    setEditName(node.name);
    setEditMessage(node.message);
    setEditCreatedAt(
      node.created_at ? new Date(node.created_at).toISOString().slice(0, 16) : ""
    );
    setEditShowTime(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditMessage("");
    setEditCreatedAt("");
    setEditShowTime(false);
  };

  const saveEdit = async (id: number) => {
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
      const res = await fetch("/api/admin/guestbook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        cancelEdit();
        loadEntries();
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

  const deleteEntry = async (id: number) => {
    if (!confirm("确定删除该留言？所有回复也会一并删除。")) return;
    try {
      const res = await fetch(`/api/admin/guestbook?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadEntries();
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

  // 递归渲染节点
  const renderNode = (node: TreeNode, depth: number) => {
    const isReplying = replyTo === node.id;
    const isEditing = editingId === node.id;
    const targetName = findReplyTargetName(entries, node.parent_id || 0);
    const isRoot = depth === 0;

    // admin 编辑面板
    const editPanel = isEditing && (
      <div className="mt-3 p-4 bg-background/40 rounded-lg space-y-3">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Your name"
          maxLength={50}
          className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
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
              className="px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60"
            />
            <p className="text-xs text-muted mt-1">不修改则保留原时间</p>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => saveEdit(node.id)}
            disabled={editSaving}
            className="inline-flex items-center gap-1 px-4 py-2 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={12} />
            {editSaving ? "保存中..." : "保存"}
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    );

    // admin 操作按钮
    const adminButtons = isAdmin && !isEditing && (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={() => startEdit(node)}
          title="编辑"
          className="p-1 text-muted hover:text-accent transition-colors"
        >
          <Edit2 size={12} />
        </button>
        <button
          onClick={() => deleteEntry(node.id)}
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
            <span className="text-xs text-muted">
              → @{targetName}
            </span>
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
              className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`Reply to ${node.name}...`}
              maxLength={500}
              rows={2}
              className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={replySubmitting || !replyName.trim() || !replyMessage.trim()}
                className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
      // 根留言：glass-card 包裹，回复也在同一个板块内
      return (
        <div key={node.id}>
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
                    className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={`Reply to ${node.name}...`}
                    maxLength={500}
                    rows={2}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={replySubmitting || !replyName.trim() || !replyMessage.trim()}
                      className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-[1fr_16rem] gap-8 md:gap-10">
      {/* 主内容列 */}
      <div className="min-w-0">
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
                className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                maxLength={500}
                rows={4}
                className="w-full px-4 py-2 bg-white/50 dark:bg-black/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
              />
              <p className="text-xs text-muted mt-1 text-right">{message.length}/500</p>
            </div>
            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Leave a message"}
            </button>
          </div>
        </form>

        {/* 留言列表 */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-muted text-center py-8">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-muted text-center py-8">No messages yet. Be the first!</p>
          ) : (
            entries.map((entry) => renderNode(entry, 0))
          )}
        </div>
      </div>

      {/* 右侧弹幕侧边栏：sticky 跟随滚动 */}
      <aside className="hidden md:block">
        <div className="sticky top-24">
          <div className="glass-card p-4 z-10">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Play size={16} className="text-accent" />
                <p className="text-sm font-medium text-foreground">Bullet Comments</p>
              </div>
              <p className="text-xs text-muted mb-3">
                Launch all messages flying across the screen — like bullet comments.
              </p>
              <Danmaku messages={flattenAll(entries)} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
