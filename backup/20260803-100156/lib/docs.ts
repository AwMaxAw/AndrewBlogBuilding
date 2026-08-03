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

export const DOCS_CATEGORIES: DocCategory[] = [
  {
    id: "site-building",
    label: "Site Building",
    description: "Build your own blog",
    icon: "Hammer",
    sections: [
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
    ],
  },
  {
    id: "random-thoughts",
    label: "Random Thoughts",
    description: "Whatever comes to mind",
    icon: "Sparkles",
    sections: [
      {
        title: "Life",
        pages: [
          { slug: "stay-up-late", title: "Staying Up Late", href: "/docs/stay-up-late" },
          { slug: "monday-blues", title: "Monday Blues", href: "/docs/monday-blues" },
          { slug: "coffee-and-code", title: "Coffee & Code", href: "/docs/coffee-and-code" },
        ],
      },
      {
        title: "Tech Rants",
        pages: [
          { slug: "css-meditation", title: "CSS Meditation", href: "/docs/css-meditation" },
          { slug: "if-it-works", title: "If It Works, Don't Touch", href: "/docs/if-it-works" },
        ],
      },
    ],
  },
];

function getAllDocSlugs(): string[] {
  return DOCS_CATEGORIES.flatMap((cat) =>
    cat.sections.flatMap((section) => section.pages.map((page) => page.slug))
  );
}

export function getDocCategoryBySlug(slug: string): DocCategory | null {
  for (const cat of DOCS_CATEGORIES) {
    for (const section of cat.sections) {
      if (section.pages.find((p) => p.slug === slug)) {
        return cat;
      }
    }
  }
  return null;
}

export function getDocCategoryById(id: string): DocCategory | null {
  return DOCS_CATEGORIES.find((cat) => cat.id === id) || null;
}

export function getDocBySlug(slug: string): DocContent | null {
  const category = getDocCategoryBySlug(slug);
  const categoryId = category?.id || "site-building";

  const allDocs: Record<string, DocContent> = {
    // Site Building
    introduction: {
      slug: "introduction",
      title: "Introduction",
      categoryId: "site-building",
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
      categoryId: "site-building",
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
      categoryId: "site-building",
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
      categoryId: "site-building",
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
    // Random Thoughts - Life
    "stay-up-late": {
      slug: "stay-up-late",
      title: "Staying Up Late",
      categoryId: "random-thoughts",
      headings: [
        { id: "the-ritual", text: "The Ritual", level: 2 },
        { id: "the-excuses", text: "The Excuses", level: 2 },
        { id: "the-morning-after", text: "The Morning After", level: 2 },
      ],
      content: `
<h2 id="the-ritual">The Ritual</h2>
<p>It always starts innocently enough. "I'll just check one thing," I tell myself at 11 PM. The next thing I know, it's 2:30 AM and I'm deep into a Wikipedia rabbit hole about the mating habits of deep-sea anglerfish.</p>
<p>Why do we do this? Why is the night so tempting? I have theories:</p>
<ul>
<li>The world is quiet. No emails, no messages, no expectations.</li>
<li>There's a false sense of "found time" — as if staying up later creates extra hours.</li>
<li>Everything seems more profound at 1 AM. (It's not.)</li>
</ul>

<h2 id="the-excuses">The Excuses</h2>
<p>Here are my top three excuses for staying up late, ranked by absurdity:</p>
<ol>
<li><strong>"I'm in the zone"</strong> — Usually means I've written three lines of code and spent 45 minutes choosing a color scheme.</li>
<li><strong>"Just one more episode"</strong> — The most dangerous phrase in human language.</li>
<li><strong>"I'll wake up early tomorrow"</strong> — A promise I've made approximately 4,000 times. Kept it maybe twice.</li>
</ol>

<h2 id="the-morning-after">The Morning After</h2>
<p>The alarm goes off. Reality hits. I stare at the ceiling wondering if I can get away with calling in sick to my own life.</p>
<p>But here's the thing — I'll probably do it again tonight. Because somehow, in the moment, it always feels worth it.</p>
<p>Stay curious, stay foolish, and maybe sleep a little more.</p>
      `.trim(),
    },
    "monday-blues": {
      slug: "monday-blues",
      title: "Monday Blues",
      categoryId: "random-thoughts",
      headings: [
        { id: "sunday-night", text: "Sunday Night Anxiety", level: 2 },
        { id: "the-monday-feeling", text: "The Monday Feeling", level: 2 },
        { id: "survival-tips", text: "Survival Tips", level: 2 },
      ],
      content: `
<h2 id="sunday-night">Sunday Night Anxiety</h2>
<p>It starts around 6 PM on Sunday. A creeping dread. The weekend is ending, and somewhere out there, Monday is loading like a slow webpage — you know it's coming, but you can't do anything to stop it.</p>
<p>I used to think I was alone in this. Then I discovered that "Sunday Scaries" is an actual phenomenon. Scientists have studied it. Therapists have named it. We're all in this together.</p>

<h2 id="the-monday-feeling">The Monday Feeling</h2>
<p>Monday morning has a very specific texture:</p>
<ul>
<li>The coffee tastes necessary, not enjoyable.</li>
<li>Your inbox looks like a crime scene.</li>
<li>That thing you said you'd "finish on Monday" is staring at you. Judging you.</li>
<li>Time moves approximately 0.3x normal speed until 11 AM.</li>
</ul>
<p>But here's a secret: Tuesday is usually worse. Monday at least has the energy of fresh starts. Tuesday is just... Tuesday.</p>

<h2 id="survival-tips">Survival Tips</h2>
<p>My personal Monday survival kit:</p>
<ol>
<li><strong>Prep on Friday</strong> — Leave yourself a nice note. Future-you will thank past-you.</li>
<li><strong>Start with something easy</strong> — Don't tackle the hardest task first. Warm up.</li>
<li><strong>Plan something fun for Monday evening</strong> — Gives you a reward to look forward to.</li>
<li><strong>Accept that it's Monday</strong> — Sometimes the best strategy is just... existing through it.</li>
</ol>
<p>And remember: Thursday is almost Friday, which is almost the weekend. You got this.</p>
      `.trim(),
    },
    "coffee-and-code": {
      slug: "coffee-and-code",
      title: "Coffee & Code",
      categoryId: "random-thoughts",
      headings: [
        { id: "the-perfect-brew", text: "The Perfect Brew", level: 2 },
        { id: "the-debugging-cup", text: "The Debugging Cup", level: 2 },
        { id: "the-afternoon-slump", text: "The Afternoon Slump", level: 2 },
      ],
      content: `
<h2 id="the-perfect-brew">The Perfect Brew</h2>
<p>There is an optimal coffee-to-code ratio, and I have spent years searching for it. Too little coffee, and the code is boring. Too much coffee, and the code becomes... <em>innovative</em> (read: terrifying).</p>
<p>My current formula:</p>
<ul>
<li><strong>Cup 1 (8:00 AM):</strong> Basic functionality. The "hello world" of the day.</li>
<li><strong>Cup 2 (10:30 AM):</strong> Refactoring. The coffee gives me the courage to delete 300 lines of code.</li>
<li><strong>Cup 3 (2:00 PM):</strong> Creative solutions. Dangerous territory. Once wrote an entire animation library during this cup.</li>
<li><strong>Cup 4+:</strong> Comments become poetry. Variables become existential questions.</li>
</ul>

<h2 id="the-debugging-cup">The Debugging Cup</h2>
<p>The debugging cup is different from all other cups. It's consumed while staring at the same function for 45 minutes, wondering how <code>null</code> became an object, became a string, became your mortal enemy.</p>
<p>Fun fact: I've fixed more bugs by walking away and making a fresh cup than by actually looking at the code. The subconscious is a powerful debugger.</p>

<h2 id="the-afternoon-slump">The Afternoon Slump</h2>
<p>3 PM. The cursor blinks. The coffee has worn off. The code stares back.</p>
<p>This is when I switch to tea. It's a gentler companion. Tea says, "It's okay, take your time." Coffee says, "GO GO GO FIX EVERYTHING." Tea is for the long haul.</p>
<p>My current setup: a pour-over dripper, medium roast beans, and a playlist that sounds like a robot having an existential crisis. Perfect for coding.</p>
      `.trim(),
    },
    // Random Thoughts - Tech Rants
    "css-meditation": {
      slug: "css-meditation",
      title: "CSS Meditation",
      categoryId: "random-thoughts",
      headings: [
        { id: "centering", text: "The Centering Problem", level: 2 },
        { id: "z-index", text: "z-index Wars", level: 2 },
        { id: "flexbox-enlightenment", text: "Flexbox Enlightenment", level: 2 },
      ],
      content: `
<h2 id="centering">The Centering Problem</h2>
<p>There was a time when centering a div was the hardest problem in computer science. We used tables. We used negative margins. We used hacks that would make a cryptographer weep.</p>
<p>Then came Flexbox. And Grid. And suddenly centering was easy. But somehow, I still find myself staring at a misaligned element, wondering if I've angered the CSS gods.</p>

<h2 id="z-index">z-index Wars</h2>
<p>z-index is not a number. It is a declaration of war.</p>
<p>You start with <code>z-index: 10</code>. Then a modal needs <code>z-index: 100</code>. Then a tooltip needs <code>z-index: 999</code>. Then someone adds <code>z-index: 9999</code> because they "wanted to be safe."</p>
<p>Before you know it, your codebase has z-index values that look like IP addresses. And somehow, the one element that actually needs to be on top is still buried under seventeen layers of other things.</p>

<h2 id="flexbox-enlightenment">Flexbox Enlightenment</h2>
<p>I remember the day I truly understood Flexbox. It was a Tuesday. The sun was shining. Birds were singing. And suddenly, <code>justify-content: space-between</code> made sense.</p>
<p>It was like learning to ride a bike, except the bike is made of abstract concepts and the ground is full of browser inconsistencies.</p>
<p>CSS is not a language. It is a mindfulness practice. Every layout bug is an opportunity to grow. Every <code>!important</code> is a moment of weakness we must forgive ourselves for.</p>
<p>Namaste. May your layouts be responsive and your breakpoints sensible.</p>
      `.trim(),
    },
    "if-it-works": {
      slug: "if-it-works",
      title: "If It Works, Don't Touch",
      categoryId: "random-thoughts",
      headings: [
        { id: "the-law", text: "The Fundamental Law", level: 2 },
        { id: "refactoring", text: "The Refactoring Trap", level: 2 },
        { id: "production", text: "Production Wisdom", level: 2 },
      ],
      content: `
<h2 id="the-law">The Fundamental Law</h2>
<p>There is one rule in programming that transcends all languages, frameworks, and paradigms:</p>
<blockquote>If it works, don't touch it.</blockquote>
<p>This sounds simple. It is not. Because programmers are curious creatures. We see a working function and think, "I could make this cleaner." We see a legacy codebase and think, "I could modernize this."</p>
<p>No. You couldn't. Or rather, you could, but at what cost?</p>

<h2 id="refactoring">The Refactoring Trap</h2>
<p>I once refactored a 50-line function into a beautiful, elegant, 10-line masterpiece. It was art. It was poetry. It was broken in three different edge cases that the original handled perfectly.</p>
<p>The original author had long left the company. Their code was messy but battle-tested. My code was clean but naive.</p>
<p>Lesson learned: messy working code is better than clean broken code. Every. Single. Time.</p>

<h2 id="production">Production Wisdom</h2>
<p>Production code is like a Jenga tower. Every block is load-bearing. Every block is somehow essential. And if you pull out the wrong one, everything comes crashing down at 3 AM while you're trying to sleep.</p>
<p>My production deployment checklist:</p>
<ol>
<li>Does it work? (Yes/No)</li>
<li>Are you sure? (Yes/No/Maybe)</li>
<li>Have you tested edge cases? (Yes/No/What's an edge case)</li>
<li>Is Friday approaching? (Run away)</li>
</ol>
<p>Remember: code that works is a miracle. Code that works <em>and</em> is clean is a myth. Code that works, is clean, and is well-documented? That's just someone lying on their resume.</p>
      `.trim(),
    },
  };

  return allDocs[slug] || null;
}

export function getFirstDocSlug(categoryId?: string): string {
  if (categoryId) {
    const cat = getDocCategoryById(categoryId);
    return cat?.sections[0]?.pages[0]?.slug || "";
  }
  return DOCS_CATEGORIES[0]?.sections[0]?.pages[0]?.slug || "";
}

export function getDocTitle(slug: string): string {
  for (const cat of DOCS_CATEGORIES) {
    for (const section of cat.sections) {
      const page = section.pages.find((p) => p.slug === slug);
      if (page) return page.title;
    }
  }
  return "";
}

export function getDocSection(slug: string): DocSection | null {
  for (const cat of DOCS_CATEGORIES) {
    for (const section of cat.sections) {
      const page = section.pages.find((p) => p.slug === slug);
      if (page) return section;
    }
  }
  return null;
}

export function getAdjacentDocs(slug: string): { prev: DocPage | null; next: DocPage | null } {
  const category = getDocCategoryBySlug(slug);
  if (!category) return { prev: null, next: null };

  const allPages = category.sections.flatMap((s) => s.pages);
  const index = allPages.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? allPages[index - 1] : null,
    next: index < allPages.length - 1 ? allPages[index + 1] : null,
  };
}
