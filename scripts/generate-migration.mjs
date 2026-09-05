// 生成 D1 迁移 SQL 文件：将现有 MDX 文章和 docs 内容转为 SQL INSERT 语句
// 运行: node scripts/generate-migration.mjs
// 然后: npx wrangler d1 execute blog-db --remote --file=db/migrate-content.sql

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(__dirname, "..");

// 转义 SQL 字符串中的单引号
function escapeSql(str) {
  return String(str ?? "").replace(/'/g, "''");
}

// 生成单条 INSERT
function insert(table, obj) {
  const cols = Object.keys(obj);
  const vals = cols.map((c) => `'${escapeSql(obj[c])}'`);
  return `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${vals.join(", ")});`;
}

// ---------- Posts ----------
const postsDir = path.join(root, "content", "blog");
const postFiles = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

const postsSql = [];
for (const file of postFiles) {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  // gray-matter 会把 YAML date 解析为 Date 对象，需要格式化
  let dateStr = data.date;
  if (dateStr instanceof Date) {
    dateStr = dateStr.toISOString().slice(0, 10);
  } else if (typeof dateStr === "string") {
    dateStr = new Date(dateStr).toISOString().slice(0, 10);
  } else {
    dateStr = new Date().toISOString().slice(0, 10);
  }

  const row = {
    slug,
    title: data.title ?? slug,
    date: dateStr,
    description: data.description ?? "",
    tags: JSON.stringify(data.tags ?? []),
    content,
    reading_time: stats.text,
  };
  postsSql.push(insert("posts", row));
}

// ---------- Doc Categories ----------
// 从 lib/docs.ts 提取的分类
const categories = [
  { slug: "site-building", name: "Site Building", sort_order: 1 },
  { slug: "random-thoughts", name: "Random Thoughts", sort_order: 2 },
];
const categoriesSql = categories.map((c) => insert("doc_categories", c));

// ---------- Docs ----------
// 动态读取 lib/docs.ts 中的 allDocs 内容
// 由于 docs.ts 是 TS，我们直接用 SQL 中定义好的内容
// 这里通过 import 方式加载（需要先编译或用 esbuild）
// 为简单起见，我们直接用 regex 解析 docs.ts 文件

const docsTsPath = path.join(root, "lib", "docs.ts");
const docsTs = fs.readFileSync(docsTsPath, "utf8");

// 提取每个 doc 对象: slug, title, categoryId, content
const docEntries = [];
// 匹配形如: key: { slug: "xxx", title: "xxx", categoryId: "xxx", headings: [...], content: `...` }
// key 可能是引号包裹的（含连字符）或普通标识符
const docRegex = /(?:(\w[\w-]*)|"([\w-]+)"):\s*\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*categoryId:\s*"([^"]+)",\s*headings:\s*\[[\s\S]*?\],\s*content:\s*`([\s\S]*?)`/g;

let match;
while ((match = docRegex.exec(docsTs)) !== null) {
  const [, , , slug, title, categoryId, content] = match;
  docEntries.push({ slug, title, categoryId, content: content.trim() });
}

// 计算每个分类下 doc 的 sort_order
const categoryCount = {};
const docsSql = docEntries.map((d) => {
  categoryCount[d.categoryId] = (categoryCount[d.categoryId] || 0) + 1;
  return insert("docs", {
    slug: d.slug,
    category_slug: d.categoryId,
    title: d.title,
    description: "",
    content: d.content,
    sort_order: categoryCount[d.categoryId],
  });
});

// ---------- 输出 SQL ----------
const output = `-- 内容迁移：posts + doc_categories + docs
-- 生成时间: ${new Date().toISOString()}

BEGIN TRANSACTION;

-- 清空现有数据（如果有）
DELETE FROM posts;
DELETE FROM docs;
DELETE FROM doc_categories;

-- ===== 文章 =====
${postsSql.join("\n")}

-- ===== 文档分类 =====
${categoriesSql.join("\n")}

-- ===== 文档 =====
${docsSql.join("\n")}

COMMIT;
`;

const outPath = path.join(root, "db", "migrate-content.sql");
fs.writeFileSync(outPath, output, "utf8");
console.log(`✅ 迁移 SQL 已生成: ${outPath}`);
console.log(`   - ${postsSql.length} 篇文章`);
console.log(`   - ${categoriesSql.length} 个文档分类`);
console.log(`   - ${docsSql.length} 篇文档`);
console.log(`\n运行以下命令导入到远程 D1:`);
console.log(`  npx wrangler d1 execute blog-db --remote --file=db/migrate-content.sql`);
