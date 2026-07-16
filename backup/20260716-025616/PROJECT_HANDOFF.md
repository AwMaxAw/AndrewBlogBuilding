# 项目交接文档 - Andrew Blog

> 交接时间：2026-07-14
> 交接原因：用户切换登录账号（手机号 → 邮箱）
> 仓库地址：https://github.com/AwMaxAw/AndrewBlogBuilding
> 部署地址：https://andrew-blog-building.vercel.app

---

## 一、项目架构

| 技术栈 | 版本/说明 |
|--------|-----------|
| Next.js | 14.2.5 (App Router) |
| React | 18.3.1 |
| TypeScript | 5.5.4 |
| Tailwind CSS | 3.4.7 |
| MDX | next-mdx-remote@^6.0.0 |
| 代码高亮 | shiki@^1.12.1 + rehype-pretty-code@^0.13.2 |
| 字体 | Playfair Display (衬线标题) + Inter (无衬线正文) |
| 图标 | lucide-react@^0.424.0 |
| 部署 | Vercel (自动关联GitHub main分支) |

### 目录结构

```
/workspace/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局（字体、Navbar、Footer、SVG滤镜）
│   ├── globals.css              # 全局样式 + 液态玻璃CSS
│   ├── page.tsx                 # 首页
│   ├── blog/
│   │   ├── page.tsx             # 文章列表页
│   │   └── [slug]/
│   │       └── page.tsx         # 文章详情页（MDX渲染）
│   └── about/
│       └── page.tsx             # 关于页
├── components/                   # React组件
│   ├── Navbar.tsx               # 顶部导航栏 ⭐核心
│   ├── Footer.tsx               # 页脚
│   ├── Hero.tsx                 # 首页大标题区域
│   ├── PostList.tsx             # 文章列表
│   ├── PostCard.tsx             # 文章卡片
│   ├── MDXComponents.tsx        # MDX自定义组件
│   └── LiquidGlassFilter.tsx    # SVG折射滤镜定义 ⭐核心
├── lib/                          # 工具函数
│   ├── posts.ts                 # 文章数据读取
│   └── utils.ts                 # 工具函数（cn、formatDate）
├── content/blog/                 # MDX博客文章存放目录
│   ├── hello-world.mdx
│   ├── about-design-and-minimalism.mdx
│   └── 2024-mid-year-review.mdx
├── backup/                       # 项目备份（按时间戳命名）
│   ├── 20260714-085100/         # 初始备份
│   └── 20260714-091022/         # 液态玻璃效果完成后备份
├── tailwind.config.ts           # Tailwind配置
├── next.config.mjs              # Next.js配置
├── postcss.config.js            # PostCSS配置
└── package.json                 # 依赖管理
```

---

## 二、已完成事项

### 1. 基础架构搭建
- [x] Next.js 14 App Router 项目初始化
- [x] Tailwind CSS 配置 + 自定义主题色
- [x] TypeScript 类型定义
- [x] 字体加载 (Playfair Display + Inter via next/font/google)
- [x] 全局样式 ([globals.css](file:///workspace/app/globals.css))

### 2. 页面结构
- [x] **首页** (`/`) - 大标题 + 简介 + 最新文章列表
- [x] **文章列表页** (`/blog`) - 所有博客文章列表
- [x] **文章详情页** (`/blog/[slug]`) - MDX渲染
  - 已有3篇示例文章：
    - `hello-world`
    - `about-design-and-minimalism`
    - `2024-mid-year-review`
- [x] **关于页** (`/about`) - 个人介绍

### 3. 组件开发
- [x] [Navbar.tsx](file:///workspace/components/Navbar.tsx) - 顶部导航栏
- [x] [Footer.tsx](file:///workspace/components/Footer.tsx) - 页脚
- [x] [Hero.tsx](file:///workspace/components/Hero.tsx) - 首页大标题区域
- [x] [PostList.tsx](file:///workspace/components/PostList.tsx) - 文章列表
- [x] [PostCard.tsx](file:///workspace/components/PostCard.tsx) - 文章卡片（使用 glass-card）
- [x] [MDXComponents.tsx](file:///workspace/components/MDXComponents.tsx) - MDX自定义组件
- [x] [LiquidGlassFilter.tsx](file:///workspace/components/LiquidGlassFilter.tsx) - SVG滤镜定义

### 4. 文章数据系统
- [x] [lib/posts.ts](file:///workspace/lib/posts.ts) - 基于文件系统的文章管理
  - `getPostSlugs()` - 获取所有文章slug
  - `getPostBySlug(slug)` - 获取单篇文章（含内容）
  - `getAllPosts()` - 获取所有文章元数据（按日期倒序）
- [x] Frontmatter解析（gray-matter）
- [x] 阅读时间计算（reading-time）
- [x] 支持 `.mdx` 和 `.md` 文件

### 5. 液态玻璃效果 (Liquid Glass / 液态玻璃) ⭐核心特色

这是项目的核心视觉风格，参考了 Apple iOS 26 的液态玻璃设计。

**已实现位置：**
- [x] 导航栏滚动时玻璃效果 (`.liquid-glass-nav`)
- [x] 文章卡片玻璃效果 (`.glass-card`)
- [x] 按钮玻璃效果 (`.glass-btn`)
- [x] 标签玻璃效果 (`.glass-tag`)
- [x] 页脚玻璃效果 (`.glass-footer`)

**实现技术详解：**

| 技术 | 作用 | 应用位置 |
|------|------|---------|
| `backdrop-filter: blur()` | 毛玻璃模糊 | 所有玻璃元素 |
| `backdrop-filter: saturate()` | 饱和度增强 | 所有玻璃元素 |
| SVG `feDisplacementMap` | 光线折射/扭曲 | 导航栏（Chrome/Edge） |
| SVG `feTurbulence` | 噪声纹理生成 | 导航栏滤镜 |
| `box-shadow: inset` | 内阴影高光 | 所有玻璃元素 |
| `::before` 伪元素 | 高光反射层 | 卡片、按钮、标签 |
| `::after` 伪元素 | 底部折射光带 | 卡片、按钮 |

**颜色方案：**
- 背景色：`#F7F5F0`（温暖的米白色）
- 前景色：`#1A1A1A`（深灰色）
- 强调色：`#D97706`（琥珀色）
- 辅助色：`#6B7280`（灰色）
- 边框色：`#E5E2DB`（浅灰色）

**相关文件：**
- [globals.css](file:///workspace/app/globals.css#L170-L428) - 所有玻璃样式定义
- [LiquidGlassFilter.tsx](file:///workspace/components/LiquidGlassFilter.tsx) - SVG滤镜组件
- [tailwind.config.ts](file:///workspace/tailwind.config.ts) - 主题色配置

### 6. 导航栏交互
- [x] 固定在顶部 (position: fixed)
- [x] 滚动时从透明变为玻璃效果（滚动超过20px触发）
- [x] 桌面端：水平导航链接（首页、文章、关于）
- [x] 移动端：汉堡菜单 → 同一行水平滑出
  - **注意**："首页"已从移动端菜单移除（点击Logo可返回首页）
- [x] 当前页面高亮指示（下划线动画）
- [x] 路由切换时自动关闭移动端菜单

### 7. 首页设计
- [x] 大标题区域（Hero）
  - "记录思考，分享生活。"
  - 副标题说明
  - 两个玻璃按钮："浏览文章"、"关于我"
  - 淡入动画（fadeInUp）
- [x] 最新文章列表

### 8. 文章详情页
- [x] MDX内容渲染（next-mdx-remote）
- [x] 代码高亮（shiki）
- [x] GitHub Flavored Markdown（remark-gfm）
- [x] 标题锚点（rehype-slug）
- [x] 文章元信息：日期、阅读时间、标签
- [x] 返回按钮（玻璃按钮样式）
- [x] 首字下沉效果（first-letter）
- [x] 自定义 prose 样式（prose-custom）

### 9. 部署与CI/CD
- [x] Vercel 自动部署（关联 GitHub main 分支）
- [x] 每次 push 自动触发构建
- [x] 静态站点生成（SSG）

### 10. 备份机制
- [x] `/backup/` 文件夹
- [x] 按时间戳命名子文件夹：`YYYYMMDD-HHMMSS`
- [x] 存放完整项目备份
- [x] 已有两次备份：
  - `20260714-085100/` - 初始备份
  - `20260714-091022/` - 液态玻璃效果完成后备份

### 11. Bug修复记录
- [x] next-mdx-remote 5.0.0 安全漏洞 → 升级到 6.0.0
- [x] 导航栏固定定位问题（多次修复，最终方案见下方"踩过的坑"）

---

## 三、未完成 / 待办事项

### 高优先级
- [ ] **导航栏液态玻璃效果优化** ⚠️
  - 当前简化为直接在容器上应用 backdrop-filter
  - SVG 折射效果 (`url(#liquid-glass-nav)`) 在 Chrome 中可能需要进一步调试
  - 问题：`backdrop-filter: blur() url(#filter)` 配合 `position: fixed` 在 Chrome 中有已知兼容性问题
  - 当前 workaround：直接在 `.liquid-glass-nav` 类上应用所有效果
  - 建议：可以尝试用 `transform: translateZ(0)` 强制GPU合成

### 中优先级
- [ ] **更多博客文章** - 目前只有3篇示例文章
- [ ] **文章分类/标签系统** - 目前只有标签显示，无分类页面
- [ ] **SEO优化** - meta标签、Open Graph、结构化数据、sitemap.xml
- [ ] **RSS订阅** - `/feed.xml` 或 `/rss.xml`（Footer已有链接但无实际页面）
- [ ] **深色模式** - 目前只有浅色主题
- [ ] **文章封面图** - 目前文章卡片无封面图

### 低优先级
- [ ] **搜索功能** - 文章搜索
- [ ] **评论系统** - 如 Giscus (GitHub Discussions)
- [ ] **文章目录 (TOC)** - 长文章侧边目录
- [ ] **图片懒加载优化**
- [ ] **PWA支持**
- [ ] **访问统计** - Vercel Analytics 或 Google Analytics
- [ ] **404页面美化**

### 技术债务
- [ ] `LiquidGlassFilter.tsx` 中的 SVG filter 目前只在 Chrome/Edge 中显示折射效果，Firefox/Safari 自动降级为普通毛玻璃
- [ ] 可考虑用 `@supports` 查询做更优雅的功能检测
- [ ] 代码高亮主题可自定义

---

## 四、踩过的坑（重要！）

### 坑1：导航栏 fixed 定位失效
**现象**：导航栏无法固定在顶部，随页面滚动。

**原因分析**：
1. `.glass-nav` CSS 类中有 `position: relative`，覆盖 Tailwind 的 `fixed`
2. `overflow: hidden` 会创建新的包含块，破坏 `position: fixed`
3. `isolation: isolate` 配合 `backdrop-filter` 可能干扰合成层
4. `backdrop-filter: url(#filter)` 在 Chrome 中与 `position: fixed` 有已知兼容性问题

**最终解决方案**：
```css
.liquid-glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(247, 245, 240, 0.55);
  backdrop-filter: blur(20px) saturate(180%) url(#liquid-glass-nav) brightness(1.03);
  -webkit-backdrop-filter: blur(20px) saturate(180%) url(#liquid-glass-nav) brightness(1.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), ...;
}
```
**要点**：直接在 CSS 类中定义 `position: fixed`，不依赖 Tailwind 的 `fixed` 类。

### 坑2：next-mdx-remote 安全漏洞
**现象**：Vercel 部署时报安全错误。
**解决**：升级到 `next-mdx-remote@^6.0.0`。

### 坑3：液态玻璃效果不明显
**现象**：只有模糊效果，缺乏玻璃质感。
**解决**：
- 加强 `box-shadow` 的 inset 高光层次
- 添加 `::before` / `::after` 伪元素做高光反射
- 使用 `backdrop-filter: saturate(180%)` 增强饱和度
- 降低背景透明度让底层内容透出

---

## 五、关键文件详解

### [app/layout.tsx](file:///workspace/app/layout.tsx)
根布局文件，包含：
- Google Fonts 加载（Playfair Display + Inter）
- LiquidGlassFilter SVG 滤镜组件（必须在 body 内）
- Navbar、Footer 全局引入
- main 区域的上边距 `pt-16`（为固定导航栏留空）

### [app/globals.css](file:///workspace/app/globals.css)
全局样式，包含：
- CSS 变量（background、foreground）
- Tailwind directives
- 自定义 prose 样式（prose-custom）
- 动画定义（fadeInUp）
- **液态玻璃样式**（最重要部分）

### [lib/posts.ts](file:///workspace/lib/posts.ts)
文章数据管理：
```typescript
// 获取所有文章元数据（按日期倒序）
const posts = getAllPosts();

// 获取单篇文章（含MDX内容）
const post = getPostBySlug("hello-world");

// 获取所有slug（用于generateStaticParams）
const slugs = getPostSlugs();
```

### [components/Navbar.tsx](file:///workspace/components/Navbar.tsx)
导航栏组件：
- 使用 `useState` 管理滚动状态和移动端菜单状态
- 滚动超过 20px 时切换为玻璃效果
- 移动端菜单在同一行水平滑出

### [components/LiquidGlassFilter.tsx](file:///workspace/components/LiquidGlassFilter.tsx)
SVG 滤镜定义：
- `liquid-glass-nav`：导航栏专用滤镜
- `liquid-glass`：通用滤镜
- `liquid-glass-btn`：按钮专用滤镜
- 原理：`feTurbulence` 生成噪声 → `feGaussianBlur` 模糊 → `feDisplacementMap` 位移

---

## 六、MDX 文章格式规范

```mdx
---
title: 文章标题
date: 2024-07-01
description: 文章描述，用于列表页展示
tags:
  - 标签1
  - 标签2
---

## 标题

正文内容...

### 子标题

- 列表项
- 列表项

```typescript
// 代码块
function hello() {
  return "world";
}
```

> 引用块
```

**Frontmatter 字段说明：**
| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 文章标题 |
| date | 是 | 发布日期（ISO格式） |
| description | 否 | 文章描述（列表页展示） |
| tags | 否 | 标签数组 |

---

## 七、颜色方案

```css
:root {
  --background: #F7F5F0;  /* 温暖米白 */
  --foreground: #1A1A1A;  /* 深灰 */
}
```

| 用途 | 颜色 | Tailwind类 |
|------|------|-----------|
| 页面背景 | #F7F5F0 | bg-background |
| 主要文字 | #1A1A1A | text-foreground |
| 强调色 | #D97706 | text-accent / bg-accent |
| 次要文字 | #6B7280 | text-muted |
| 边框 | #E5E2DB | border-border |
| 选中高亮 | rgba(217, 119, 6, 0.25) | ::selection |

---

## 八、部署说明

```bash
# 本地开发
npm run dev
# 访问 http://localhost:3000

# 构建
npm run build

# 部署（Vercel自动）
git add .
git commit -m "your message"
git push origin main
```

**Vercel 配置：**
- 自动关联 GitHub main 分支
- 每次 push 自动构建部署
- 无需手动配置

---

## 九、浏览器兼容性

| 功能 | Chrome/Edge | Firefox | Safari |
|------|------------|---------|--------|
| 毛玻璃效果 | ✅ | ✅ | ✅ |
| SVG 折射效果 | ✅ | ❌（降级为毛玻璃） | ❌（降级为毛玻璃） |
| backdrop-filter | ✅ | ✅ | ✅ |

---

## 十、用户特殊要求（重要！）

1. **开始执行任务前必须询问用户许可** - 不要自动执行，先给方案让用户确认
2. **代码必须简洁易维护** - 避免过度工程化，不要堆屎山
3. **液态玻璃效果** - 这是核心视觉风格，参考 Apple iOS 26 设计
4. **备份习惯** - 重大修改前先备份到 `/backup/YYYYMMDD-HHMMSS/`
5. **移动端导航** - "首页"已从移动端菜单移除（Logo可返回首页），菜单在同一行水平滑出
6. **顶栏必须固定** - 滚动时导航栏必须始终固定在顶部

---

## 十一、下一步建议

如果用户继续开发，建议按以下顺序：

1. **完善导航栏玻璃效果** - 调试 SVG 折射，或接受当前简化方案
2. **添加更多文章** - 替换示例文章为真实内容
3. **RSS订阅** - 实现 `/rss.xml` 路由
4. **SEO优化** - 添加 sitemap、Open Graph
5. **深色模式** - 添加 dark mode 切换

---

## 十二、最后提交记录

```
commit e1bd099 - docs: 添加项目交接文档
```

---

## 十三、参考资源

- **液态玻璃参考文件**：`/workspace/纯CSS液态玻璃/css/styles.css`（用户提供的参考案例）
- **Apple Liquid Glass Skill**：https://zettersten.github.io/skills/
- **液态玻璃原理**：SVG displacement maps + CSS backdrop-filter 模拟真实光线折射

---

*祝顺利！如有疑问，欢迎查看源码或参考上述文件。*
