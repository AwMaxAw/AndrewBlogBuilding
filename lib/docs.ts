export interface DocPage {
  slug: string;
  title: string;
  href: string;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export interface DocCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  sections: DocSection[];
}

export interface DocContent {
  slug: string;
  title: string;
  content: string;
  headings: DocHeading[];
  categoryId: string;
}

export interface DocHeading {
  id: string;
  text: string;
  level: number;
}

interface CategoryRow {
  slug: string;
  name: string;
  sort_order: number;
}

interface DocRow {
  slug: string;
  category_slug: string;
  title: string;
  description: string;
  content: string;
  sort_order: number;
}

function getDb(): D1Database | null {
  return (process.env.blog_db as D1Database) || null;
}

// 请求级别的缓存（通过 AsyncLocalStorage 或简单的 module 变量）
// 注意：edge runtime 中 module 变量会跨请求共享，因此不使用持久缓存
// 每次请求都从 D1 重新获取，确保管理后台的修改能立即生效
let requestCache: { categories: DocCategory[]; docs: Map<string, DocContent> } | null = null;
let requestCachePromise: Promise<void> | null = null;

function extractHeadingsFromHtml(html: string): DocHeading[] {
  const headings: DocHeading[] = [];
  const regex = /<h([2-3])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h[2-3]>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // 提取纯文本（去掉标签）
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    headings.push({ id, text, level });
  }
  return headings;
}

async function loadData() {
  const db = getDb();
  if (!db) {
    requestCache = { categories: [], docs: new Map() };
    return;
  }

  const [catResult, docResult] = await Promise.all([
    db.prepare("SELECT slug, name, sort_order FROM doc_categories ORDER BY sort_order ASC").all<CategoryRow>(),
    db.prepare("SELECT slug, category_slug, title, description, content, sort_order FROM docs ORDER BY category_slug, sort_order ASC").all<DocRow>(),
  ]);

  // 构建分类
  const categories: DocCategory[] = catResult.results.map((c) => ({
    id: c.slug,
    label: c.name,
    description: "",
    icon: c.slug === "site-building" ? "Hammer" : "Sparkles",
    sections: [{ title: "Pages", pages: [] }],
  }));

  // 构建文档
  const docs = new Map<string, DocContent>();
  for (const row of docResult.results) {
    docs.set(row.slug, {
      slug: row.slug,
      title: row.title,
      content: row.content,
      headings: extractHeadingsFromHtml(row.content),
      categoryId: row.category_slug,
    });

    // 把页面加入对应分类的 section
    const cat = categories.find((c) => c.id === row.category_slug);
    if (cat) {
      cat.sections[0].pages.push({
        slug: row.slug,
        title: row.title,
        href: `/docs/${row.slug}`,
      });
    }
  }

  requestCache = { categories, docs };
}

async function ensureLoaded() {
  // 每次请求都重新从 D1 获取数据，不使用持久缓存
  // 这样管理后台的修改能立即在前台生效
  if (!requestCachePromise) {
    requestCache = null;
    requestCachePromise = loadData().finally(() => {
      requestCachePromise = null;
    });
  }
  await requestCachePromise;
}

export async function getDocsCategories(): Promise<DocCategory[]> {
  await ensureLoaded();
  return requestCache?.categories || [];
}

export async function getDocCategoryBySlug(slug: string): Promise<DocCategory | null> {
  await ensureLoaded();
  for (const cat of requestCache?.categories || []) {
    if (cat.sections.some((s) => s.pages.find((p) => p.slug === slug))) {
      return cat;
    }
  }
  return null;
}

export async function getDocCategoryById(id: string): Promise<DocCategory | null> {
  await ensureLoaded();
  return requestCache?.categories.find((cat) => cat.id === id) || null;
}

export async function getDocBySlug(slug: string): Promise<DocContent | null> {
  await ensureLoaded();
  return requestCache?.docs.get(slug) || null;
}

export async function getFirstDocSlug(categoryId?: string): Promise<string> {
  await ensureLoaded();
  if (categoryId) {
    const cat = requestCache?.categories.find((c) => c.id === categoryId);
    return cat?.sections[0]?.pages[0]?.slug || "";
  }
  return requestCache?.categories[0]?.sections[0]?.pages[0]?.slug || "";
}

export async function getDocTitle(slug: string): Promise<string> {
  await ensureLoaded();
  return requestCache?.docs.get(slug)?.title || "";
}

export async function getDocSection(slug: string): Promise<DocSection | null> {
  await ensureLoaded();
  const cat = await getDocCategoryBySlug(slug);
  if (!cat) return null;
  return cat.sections[0] || null;
}

export async function getAdjacentDocs(slug: string): Promise<{ prev: DocPage | null; next: DocPage | null }> {
  await ensureLoaded();
  const category = await getDocCategoryBySlug(slug);
  if (!category) return { prev: null, next: null };

  const allPages = category.sections.flatMap((s) => s.pages);
  const index = allPages.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? allPages[index - 1] : null,
    next: index < allPages.length - 1 ? allPages[index + 1] : null,
  };
}

// 兼容旧版同步 API 的别名（部分组件可能引用）
export const DOCS_CATEGORIES: DocCategory[] = [];
