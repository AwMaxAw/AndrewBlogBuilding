"use client";

import { useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  Image,
} from "lucide-react";

interface MarkdownToolbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface ToolAction {
  icon: React.ReactNode;
  title: string;
  prefix: string;
  suffix: string;
  block?: boolean; // 块级：在行首添加，不包裹选中文本
  placeholder?: string;
}

const tools: ToolAction[] = [
  { icon: <Heading1 size={15} />, title: "一级标题", prefix: "# ", suffix: "", block: true, placeholder: "一级标题" },
  { icon: <Heading2 size={15} />, title: "二级标题", prefix: "## ", suffix: "", block: true, placeholder: "二级标题" },
  { icon: <Heading3 size={15} />, title: "三级标题", prefix: "### ", suffix: "", block: true, placeholder: "三级标题" },
  { icon: <Bold size={15} />, title: "加粗", prefix: "**", suffix: "**", placeholder: "加粗文字" },
  { icon: <Italic size={15} />, title: "斜体", prefix: "*", suffix: "*", placeholder: "斜体文字" },
  { icon: <Strikethrough size={15} />, title: "删除线", prefix: "~~", suffix: "~~", placeholder: "删除线文字" },
  { icon: <Code size={15} />, title: "行内代码", prefix: "`", suffix: "`", placeholder: "code" },
  { icon: <Link size={15} />, title: "链接", prefix: "[", suffix: "](url)", placeholder: "链接文字" },
  { icon: <List size={15} />, title: "无序列表", prefix: "- ", suffix: "", block: true, placeholder: "列表项" },
  { icon: <ListOrdered size={15} />, title: "有序列表", prefix: "1. ", suffix: "", block: true, placeholder: "列表项" },
  { icon: <Quote size={15} />, title: "引用", prefix: "> ", suffix: "", block: true, placeholder: "引用内容" },
  { icon: <Image size={15} />, title: "图片", prefix: "![alt](", suffix: ")", placeholder: "图片描述" },
  { icon: <Minus size={15} />, title: "分割线", prefix: "\n---\n", suffix: "", block: true, placeholder: "" },
];

export default function MarkdownToolbar({
  value,
  onChange,
  placeholder,
  rows = 20,
}: MarkdownToolbarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyTool = (tool: ToolAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const textToWrap = selected || tool.placeholder || "";

    let newText: string;
    let cursorStart: number;
    let cursorEnd: number;

    if (tool.block) {
      // 块级：在当前行首添加前缀
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = value.indexOf("\n", end);
      const adjustedEnd = lineEnd === -1 ? value.length : lineEnd;
      const lineContent = value.slice(lineStart, adjustedEnd);
      const before = value.slice(0, lineStart);
      const after = value.slice(adjustedEnd);

      if (lineContent.trim() === "") {
        // 空行：插入前缀 + placeholder
        newText = before + tool.prefix + (tool.placeholder || "") + after;
        cursorStart = lineStart + tool.prefix.length;
        cursorEnd = cursorStart + (tool.placeholder?.length || 0);
      } else {
        // 已有内容：在行首加前缀
        newText = before + tool.prefix + lineContent + after;
        cursorStart = lineStart + tool.prefix.length;
        cursorEnd = cursorStart + lineContent.length;
      }
    } else {
      // 行内：包裹选中文字
      const before = value.slice(0, start);
      const after = value.slice(end);
      newText = before + tool.prefix + textToWrap + tool.suffix + after;
      cursorStart = start + tool.prefix.length;
      cursorEnd = cursorStart + textToWrap.length;
    }

    onChange(newText);

    // 恢复焦点和选区
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden bg-white/50 dark:bg-black/30">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-border/50 bg-secondary/30">
        {tools.map((tool, i) => (
          <button
            key={i}
            type="button"
            onClick={() => applyTool(tool)}
            title={tool.title}
            className="p-1.5 rounded text-muted hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            {tool.icon}
          </button>
        ))}
        <div className="ml-auto text-xs text-muted/60 font-mono hidden sm:block">
          Markdown
        </div>
      </div>
      {/* 文本框 */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm font-mono focus:outline-none resize-y bg-transparent"
      />
    </div>
  );
}
