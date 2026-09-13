"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/lib/utils";
import { Reply, MessageSquare } from "lucide-react";

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
  const [comments, setComments] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);

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
    const targetName = findReplyTargetName(comments, node.parent_id || 0);
    const isRoot = depth === 0;

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
        </div>
        <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
          {node.message}
        </p>
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
                <time className="text-xs text-muted font-mono">
                  {formatDateTime(node.created_at)}
                </time>
              </div>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
                {node.message}
              </p>
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
                <div className="mt-4 pt-4 border-t border-border/40 space-y-1">
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
          <div>
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
