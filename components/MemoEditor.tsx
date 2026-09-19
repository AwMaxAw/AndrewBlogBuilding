"use client";

import { useState, useEffect } from "react";
import { X, Save, Clock } from "lucide-react";
import MarkdownToolbar from "./admin/MarkdownToolbar";
import { useAdmin } from "./AdminContext";

export interface MemoEditData {
  id?: number;
  date: string; // YYYY-MM-DD
  content: string;
  created_at?: string;
}

export function MemoEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: MemoEditData | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { isAdmin } = useAdmin();
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [showTimeEdit, setShowTimeEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setDate(initial.date);
      setContent(initial.content);
      setCreatedAt(initial.created_at || "");
      setShowTimeEdit(false);
      setError("");
    }
  }, [initial]);

  if (!isAdmin || !initial) return null;

  const isEdit = initial.id !== undefined;

  const handleSave = async () => {
    if (!date.trim() || !content.trim()) {
      setError("日期和内容不能为空");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const body: Record<string, string | number> = {
        date: date.trim(),
        content: content.trim(),
      };
      if (showTimeEdit && createdAt) {
        body.created_at = createdAt;
      }
      const url = isEdit
        ? `/api/admin/memos/${initial.id}`
        : `/api/admin/memos`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let errMsg = "保存失败";
        try {
          const data: any = await res.json();
          if (data && typeof data.error === "string") errMsg = data.error;
        } catch {}
        throw new Error(errMsg);
      }
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message || "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white/90 dark:bg-black/90 border border-black/10 dark:border-white/10 rounded-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted">
            {isEdit ? "编辑备忘" : "新建备忘"}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-muted mb-1">日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-white/80 dark:bg-black/40 border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">内容</label>
            <MarkdownToolbar
              value={content}
              onChange={setContent}
              placeholder="在此输入 markdown..."
              rows={6}
            />
          </div>

          {isEdit && (
            <div className="border-t border-border/40 pt-3">
              <button
                onClick={() => setShowTimeEdit(!showTimeEdit)}
                type="button"
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
              >
                <Clock size={12} />
                {showTimeEdit ? "收起时间编辑" : "编辑时间"}
              </button>
              {showTimeEdit && (
                <input
                  type="datetime-local"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  className="mt-2 w-full px-3 py-2 bg-white/80 dark:bg-black/40 border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:border-accent/60"
                />
              )}
            </div>
          )}

          {error && (
            <div className="text-xs text-red-500">{error}</div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1 px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save size={12} />
              {saving ? "保存中..." : "保存"}
            </button>
            <button
              onClick={onClose}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 删除按钮
export function MemoDeleteButton({
  memoId,
  onDeleted,
}: {
  memoId: number;
  onDeleted: () => void;
}) {
  const { isAdmin } = useAdmin();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  if (!isAdmin) return null;

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1 shrink-0">
        <button
          onClick={async () => {
            setDeleting(true);
            try {
              const res = await fetch(`/api/admin/memos/${memoId}`, {
                method: "DELETE",
              });
              if (res.ok) {
                onDeleted();
              }
            } finally {
              setDeleting(false);
              setConfirming(false);
            }
          }}
          disabled={deleting}
          className="text-[10px] px-1.5 py-0.5 rounded bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {deleting ? "..." : "删"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted hover:text-foreground transition-colors"
        >
          取
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title="删除"
      className="shrink-0 p-0.5 rounded text-muted hover:text-red-500 transition-colors"
    >
      <X size={10} />
    </button>
  );
}
