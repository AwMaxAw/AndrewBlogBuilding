import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

export interface MarkdownHeading {
  id: string;
  text: string;
  level: number;
}

// 配置 marked
marked.setOptions({
  gfm: true,
  breaks: false,
});

marked.use(gfmHeadingId());

export function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}

/**
 * 从渲染后的 HTML 中提取 h2/h3 标题，用于 TOC
 * 与 marked-gfm-heading-id 生成的 ID 保持一致
 */
export function extractHeadingsFromHtml(html: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const regex = /<h([2-3])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h[2-3]>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    headings.push({ id, text, level });
  }
  return headings;
}

/**
 * 渲染 markdown 并同时提取标题
 */
export function renderMarkdownWithHeadings(
  content: string
): { html: string; headings: MarkdownHeading[] } {
  const html = renderMarkdown(content);
  const headings = extractHeadingsFromHtml(html);
  return { html, headings };
}
