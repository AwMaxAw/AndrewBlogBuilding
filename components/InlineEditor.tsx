"use client";

import { Edit2, Trash2, Plus, X, Clock, Save } from "lucide-react";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import MarkdownToolbar from "./admin/MarkdownToolbar";
import { useAdmin } from "./AdminContext";

// 铅笔按钮 — 用于编辑现有内容
export function EditButton({
  onClick,
  label = "Edit",
  className,
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-full text-muted hover:text-accent hover:bg-accent/10 transition-all",
        className
      )}
    >
      <Edit2 size={14} />
    </button>
  );
}

// 删除按钮
export function DeleteButton({
  onConfirm,
  className,
}: {
  onConfirm: () => void;
  className?: string;
}) {
  const { isAdmin } = useAdmin();
  const [confirming, setConfirming] = useState(false);
  if (!isAdmin) return null;

  if (confirming) {
    return (
      <span className={cn("inline-flex items-center gap-1", className)}>
        <button
          onClick={() => {
            onConfirm();
            setConfirming(false);
          }}
          className="text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          确认删除
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2 py-1 rounded bg-secondary text-muted hover:text-foreground transition-colors"
        >
          取消
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title="删除"
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-full text-muted hover:text-red-500 hover:bg-red-500/10 transition-all",
        className
      )}
    >
      <Trash2 size={14} />
    </button>
  );
}

// New 按钮
export function NewButton({
  onClick,
  label = "New",
}: {
  onClick: () => void;
  label?: string;
}) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;
  return (
    <button
      onClick={onClick}
      className="glass-btn z-10"
      title="新建"
    >
      <span className="relative z-10 inline-flex items-center gap-2 text-sm text-foreground">
        <Plus size={14} />
        {label}
      </span>
    </button>
  );
}

// 编辑面板容器（含保存/取消/编辑时间）
export function InlineEditPanel({
  title,
  onSave,
  onCancel,
  saving,
  children,
  onToggleTimeEdit,
  showTimeEdit,
  timeEditNode,
}: {
  title?: string;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  children: ReactNode;
  onToggleTimeEdit?: () => void;
  showTimeEdit?: boolean;
  timeEditNode?: ReactNode;
}) {
  return (
    <div className="glass-card p-5 my-3 z-20">
      <div className="relative z-10 space-y-3">
        {title && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">{title}</span>
            <button
              onClick={onCancel}
              className="p-1 text-muted hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}
        {children}
        {onToggleTimeEdit && (
          <div className="border-t border-border/40 pt-3">
            <button
              onClick={onToggleTimeEdit}
              type="button"
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
            >
              <Clock size={12} />
              {showTimeEdit ? "收起时间编辑" : "编辑时间"}
            </button>
            {showTimeEdit && timeEditNode && (
              <div className="mt-2">{timeEditNode}</div>
            )}
          </div>
        )}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-1 px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={12} />
            {saving ? "保存中..." : "保存"}
          </button>
          <button
            onClick={onCancel}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

// 通用 markdown 编辑器
export function MarkdownEditor({
  value,
  onChange,
  rows = 8,
  placeholder = "在此输入 markdown...",
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <MarkdownToolbar value={value} onChange={onChange} placeholder={placeholder} rows={rows} />
  );
}
