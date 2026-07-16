export interface DocPage {
  slug: string;
  title: string;
  href: string;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export interface DocContent {
  slug: string;
  title: string;
  content: string;
  headings: DocHeading[];
}

export interface DocHeading {
  id: string;
  text: string;
  level: number;
}

export const DOCS_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    pages: [
      { slug: "introduction", title: "Introduction", href: "/docs/introduction" },
      { slug: "installation", title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Core Concepts",
    pages: [
      { slug: "architecture", title: "Architecture", href: "/docs/architecture" },
      { slug: "routing", title: "Routing", href: "/docs/routing" },
    ],
  },
];

function getAllDocSlugs(): string[] {
  return DOCS_SECTIONS.flatMap((section) =>
    section.pages.map((page) => page.slug)
  );
}

export function getDocBySlug(slug: string): DocContent | null {
  const allDocs: Record<string, DocContent> = {
    introduction: {
      slug: "introduction",
      title: "Introduction",
      headings: [
        { id: "overview", text: "Overview", level: 2 },
        { id: "features", text: "Features", level: 2 },
        { id: "quick-start", text: "Quick Start", level: 2 },
      ],
      content: `
<h2 id="overview">Overview</h2>
<p>Welcome to the documentation. This is a personal blog built with Next.js 14, MDX, and Tailwind CSS.</p>
<p>The project follows modern web development best practices, including static site generation, server-side rendering, and a component-based architecture.</p>

<h2 id="features">Features</h2>
<ul>
<li><strong>Static Site Generation</strong> - Pre-rendered pages for optimal performance</li>
<li><strong>MDX Support</strong> - Write content with JSX components</li>
<li><strong>Dark Mode</strong> - Automatic theme switching</li>
<li><strong>Search</strong> - Full-text search across all content</li>
<li><strong>Responsive Design</strong> - Mobile-first approach</li>
</ul>

<h2 id="quick-start">Quick Start</h2>
<p>To get started with the project, clone the repository and install dependencies:</p>
<pre><code>git clone https://github.com/AwMaxAw/andrew-blog.git
cd andrew-blog
npm install
npm run dev</code></pre>
<p>Then open <code>http://localhost:3000</code> in your browser.</p>
      `.trim(),
    },
    installation: {
      slug: "installation",
      title: "Installation",
      headings: [
        { id: "requirements", text: "System Requirements", level: 2 },
        { id: "setup", text: "Project Setup", level: 2 },
        { id: "configuration", text: "Configuration", level: 2 },
      ],
      content: `
<h2 id="requirements">System Requirements</h2>
<ul>
<li>Node.js 18.17 or later</li>
<li>npm, yarn, or pnpm</li>
<li>Git</li>
</ul>

<h2 id="setup">Project Setup</h2>
<p>Clone the repository and navigate to the project directory:</p>
<pre><code>git clone https://github.com/AwMaxAw/andrew-blog.git
cd andrew-blog</code></pre>
<p>Install dependencies:</p>
<pre><code>npm install</code></pre>

<h2 id="configuration">Configuration</h2>
<p>The project uses environment variables for configuration. Create a <code>.env.local</code> file:</p>
<pre><code>NEXT_PUBLIC_SITE_URL=https://your-domain.com</code></pre>
      `.trim(),
    },
    architecture: {
      slug: "architecture",
      title: "Architecture",
      headings: [
        { id: "app-router", text: "App Router", level: 2 },
        { id: "data-flow", text: "Data Flow", level: 2 },
      ],
      content: `
<h2 id="app-router">App Router</h2>
<p>The project uses Next.js 14 App Router for routing and page rendering. The <code>app/</code> directory contains all routes:</p>
<ul>
<li><code>page.tsx</code> - Home page</li>
<li><code>blog/</code> - Blog posts listing and detail pages</li>
<li><code>docs/</code> - Documentation pages</li>
<li><code>about/</code> - About page</li>
</ul>

<h2 id="data-flow">Data Flow</h2>
<p>Content is stored in MDX files under <code>content/</code> directory. At build time, these files are parsed and rendered as static HTML.</p>
      `.trim(),
    },
    routing: {
      slug: "routing",
      title: "Routing",
      headings: [
        { id: "dynamic-routes", text: "Dynamic Routes", level: 2 },
        { id: "navigation", text: "Navigation", level: 2 },
      ],
      content: `
<h2 id="dynamic-routes">Dynamic Routes</h2>
<p>The project uses dynamic routes for blog posts and documentation pages:</p>
<ul>
<li><code>/blog/[slug]</code> - Individual blog posts</li>
<li><code>/docs/[...slug]</code> - Documentation pages</li>
</ul>

<h2 id="navigation">Navigation</h2>
<p>The navigation bar is a client component that uses Next.js <code>usePathname</code> hook to highlight the active route.</p>
      `.trim(),
    },
  };

  return allDocs[slug] || null;
}

export function getFirstDocSlug(): string {
  return DOCS_SECTIONS[0]?.pages[0]?.slug || "";
}

export function getDocTitle(slug: string): string {
  for (const section of DOCS_SECTIONS) {
    const page = section.pages.find((p) => p.slug === slug);
    if (page) return page.title;
  }
  return "";
}

export function getAdjacentDocs(slug: string): { prev: DocPage | null; next: DocPage | null } {
  const allPages = DOCS_SECTIONS.flatMap((s) => s.pages);
  const index = allPages.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? allPages[index - 1] : null,
    next: index < allPages.length - 1 ? allPages[index + 1] : null,
  };
}
