-- 内容迁移：posts + doc_categories + docs
-- 生成时间: 2026-09-05T16:19:26.095Z

BEGIN TRANSACTION;

-- 清空现有数据（如果有）
DELETE FROM posts;
DELETE FROM docs;
DELETE FROM doc_categories;

-- ===== 文章 =====
INSERT INTO posts (slug, title, date, description, tags, content, reading_time) VALUES ('2024-mid-year-review', 'awa', '2026-07-16', 'awa', '["life","review"]', '
## awa
awa
', '1 min read');
INSERT INTO posts (slug, title, date, description, tags, content, reading_time) VALUES ('about-design-and-minimalism', 'design', '2026-07-15', 'thoughts of design', '["design","thoughts"]', '


标题用衬线字体，是为了增加一点人文气息；正文用无衬线，是为了屏幕阅读的清晰度。

> "awa" — Andrew

', '1 min read');
INSERT INTO posts (slug, title, date, description, tags, content, reading_time) VALUES ('hello-world', 'Hello World', '2026-07-14', 'test', '["essay","start"]', '
## Say at first

Hello welcome to my blog. This is the first article for test.

### 技术栈

这个博客使用以下技术构建：

- Next.js
- MDX
- Tailwind CSS

### 代码示例

```typescript
function hello(name: string): string {
  return `Hello, ${name}!`;
}

console.log(hello("World"));
```

', '1 min read');

-- ===== 文档分类 =====
INSERT INTO doc_categories (slug, name, sort_order) VALUES ('site-building', 'Site Building', '1');
INSERT INTO doc_categories (slug, name, sort_order) VALUES ('random-thoughts', 'Random Thoughts', '2');

-- ===== 文档 =====
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('introduction', 'site-building', 'Introduction', '', '<h2 id="overview">Overview</h2>
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
<p>Then open <code>http://localhost:3000</code> in your browser.</p>', '1');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('installation', 'site-building', 'Installation', '', '<h2 id="requirements">System Requirements</h2>
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
<pre><code>NEXT_PUBLIC_SITE_URL=https://your-domain.com</code></pre>', '2');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('architecture', 'site-building', 'Architecture', '', '<h2 id="app-router">App Router</h2>
<p>The project uses Next.js 14 App Router for routing and page rendering. The <code>app/</code> directory contains all routes:</p>
<ul>
<li><code>page.tsx</code> - Home page</li>
<li><code>blog/</code> - Blog posts listing and detail pages</li>
<li><code>docs/</code> - Documentation pages</li>
<li><code>about/</code> - About page</li>
</ul>

<h2 id="data-flow">Data Flow</h2>
<p>Content is stored in MDX files under <code>content/</code> directory. At build time, these files are parsed and rendered as static HTML.</p>', '3');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('routing', 'site-building', 'Routing', '', '<h2 id="dynamic-routes">Dynamic Routes</h2>
<p>The project uses dynamic routes for blog posts and documentation pages:</p>
<ul>
<li><code>/blog/[slug]</code> - Individual blog posts</li>
<li><code>/docs/[...slug]</code> - Documentation pages</li>
</ul>

<h2 id="navigation">Navigation</h2>
<p>The navigation bar is a client component that uses Next.js <code>usePathname</code> hook to highlight the active route.</p>', '4');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('stay-up-late', 'random-thoughts', 'Staying Up Late', '', '<h2 id="the-ritual">The Ritual</h2>
<p>It always starts innocently enough. "I''ll just check one thing," I tell myself at 11 PM. The next thing I know, it''s 2:30 AM and I''m deep into a Wikipedia rabbit hole about the mating habits of deep-sea anglerfish.</p>
<p>Why do we do this? Why is the night so tempting? I have theories:</p>
<ul>
<li>The world is quiet. No emails, no messages, no expectations.</li>
<li>There''s a false sense of "found time" — as if staying up later creates extra hours.</li>
<li>Everything seems more profound at 1 AM. (It''s not.)</li>
</ul>

<h2 id="the-excuses">The Excuses</h2>
<p>Here are my top three excuses for staying up late, ranked by absurdity:</p>
<ol>
<li><strong>"I''m in the zone"</strong> — Usually means I''ve written three lines of code and spent 45 minutes choosing a color scheme.</li>
<li><strong>"Just one more episode"</strong> — The most dangerous phrase in human language.</li>
<li><strong>"I''ll wake up early tomorrow"</strong> — A promise I''ve made approximately 4,000 times. Kept it maybe twice.</li>
</ol>

<h2 id="the-morning-after">The Morning After</h2>
<p>The alarm goes off. Reality hits. I stare at the ceiling wondering if I can get away with calling in sick to my own life.</p>
<p>But here''s the thing — I''ll probably do it again tonight. Because somehow, in the moment, it always feels worth it.</p>
<p>Stay curious, stay foolish, and maybe sleep a little more.</p>', '1');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('monday-blues', 'random-thoughts', 'Monday Blues', '', '<h2 id="sunday-night">Sunday Night Anxiety</h2>
<p>It starts around 6 PM on Sunday. A creeping dread. The weekend is ending, and somewhere out there, Monday is loading like a slow webpage — you know it''s coming, but you can''t do anything to stop it.</p>
<p>I used to think I was alone in this. Then I discovered that "Sunday Scaries" is an actual phenomenon. Scientists have studied it. Therapists have named it. We''re all in this together.</p>

<h2 id="the-monday-feeling">The Monday Feeling</h2>
<p>Monday morning has a very specific texture:</p>
<ul>
<li>The coffee tastes necessary, not enjoyable.</li>
<li>Your inbox looks like a crime scene.</li>
<li>That thing you said you''d "finish on Monday" is staring at you. Judging you.</li>
<li>Time moves approximately 0.3x normal speed until 11 AM.</li>
</ul>
<p>But here''s a secret: Tuesday is usually worse. Monday at least has the energy of fresh starts. Tuesday is just... Tuesday.</p>

<h2 id="survival-tips">Survival Tips</h2>
<p>My personal Monday survival kit:</p>
<ol>
<li><strong>Prep on Friday</strong> — Leave yourself a nice note. Future-you will thank past-you.</li>
<li><strong>Start with something easy</strong> — Don''t tackle the hardest task first. Warm up.</li>
<li><strong>Plan something fun for Monday evening</strong> — Gives you a reward to look forward to.</li>
<li><strong>Accept that it''s Monday</strong> — Sometimes the best strategy is just... existing through it.</li>
</ol>
<p>And remember: Thursday is almost Friday, which is almost the weekend. You got this.</p>', '2');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('coffee-and-code', 'random-thoughts', 'Coffee & Code', '', '<h2 id="the-perfect-brew">The Perfect Brew</h2>
<p>There is an optimal coffee-to-code ratio, and I have spent years searching for it. Too little coffee, and the code is boring. Too much coffee, and the code becomes... <em>innovative</em> (read: terrifying).</p>
<p>My current formula:</p>
<ul>
<li><strong>Cup 1 (8:00 AM):</strong> Basic functionality. The "hello world" of the day.</li>
<li><strong>Cup 2 (10:30 AM):</strong> Refactoring. The coffee gives me the courage to delete 300 lines of code.</li>
<li><strong>Cup 3 (2:00 PM):</strong> Creative solutions. Dangerous territory. Once wrote an entire animation library during this cup.</li>
<li><strong>Cup 4+:</strong> Comments become poetry. Variables become existential questions.</li>
</ul>

<h2 id="the-debugging-cup">The Debugging Cup</h2>
<p>The debugging cup is different from all other cups. It''s consumed while staring at the same function for 45 minutes, wondering how <code>null</code> became an object, became a string, became your mortal enemy.</p>
<p>Fun fact: I''ve fixed more bugs by walking away and making a fresh cup than by actually looking at the code. The subconscious is a powerful debugger.</p>

<h2 id="the-afternoon-slump">The Afternoon Slump</h2>
<p>3 PM. The cursor blinks. The coffee has worn off. The code stares back.</p>
<p>This is when I switch to tea. It''s a gentler companion. Tea says, "It''s okay, take your time." Coffee says, "GO GO GO FIX EVERYTHING." Tea is for the long haul.</p>
<p>My current setup: a pour-over dripper, medium roast beans, and a playlist that sounds like a robot having an existential crisis. Perfect for coding.</p>', '3');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('css-meditation', 'random-thoughts', 'CSS Meditation', '', '<h2 id="centering">The Centering Problem</h2>
<p>There was a time when centering a div was the hardest problem in computer science. We used tables. We used negative margins. We used hacks that would make a cryptographer weep.</p>
<p>Then came Flexbox. And Grid. And suddenly centering was easy. But somehow, I still find myself staring at a misaligned element, wondering if I''ve angered the CSS gods.</p>

<h2 id="z-index">z-index Wars</h2>
<p>z-index is not a number. It is a declaration of war.</p>
<p>You start with <code>z-index: 10</code>. Then a modal needs <code>z-index: 100</code>. Then a tooltip needs <code>z-index: 999</code>. Then someone adds <code>z-index: 9999</code> because they "wanted to be safe."</p>
<p>Before you know it, your codebase has z-index values that look like IP addresses. And somehow, the one element that actually needs to be on top is still buried under seventeen layers of other things.</p>

<h2 id="flexbox-enlightenment">Flexbox Enlightenment</h2>
<p>I remember the day I truly understood Flexbox. It was a Tuesday. The sun was shining. Birds were singing. And suddenly, <code>justify-content: space-between</code> made sense.</p>
<p>It was like learning to ride a bike, except the bike is made of abstract concepts and the ground is full of browser inconsistencies.</p>
<p>CSS is not a language. It is a mindfulness practice. Every layout bug is an opportunity to grow. Every <code>!important</code> is a moment of weakness we must forgive ourselves for.</p>
<p>Namaste. May your layouts be responsive and your breakpoints sensible.</p>', '4');
INSERT INTO docs (slug, category_slug, title, description, content, sort_order) VALUES ('if-it-works', 'random-thoughts', 'If It Works, Don''t Touch', '', '<h2 id="the-law">The Fundamental Law</h2>
<p>There is one rule in programming that transcends all languages, frameworks, and paradigms:</p>
<blockquote>If it works, don''t touch it.</blockquote>
<p>This sounds simple. It is not. Because programmers are curious creatures. We see a working function and think, "I could make this cleaner." We see a legacy codebase and think, "I could modernize this."</p>
<p>No. You couldn''t. Or rather, you could, but at what cost?</p>

<h2 id="refactoring">The Refactoring Trap</h2>
<p>I once refactored a 50-line function into a beautiful, elegant, 10-line masterpiece. It was art. It was poetry. It was broken in three different edge cases that the original handled perfectly.</p>
<p>The original author had long left the company. Their code was messy but battle-tested. My code was clean but naive.</p>
<p>Lesson learned: messy working code is better than clean broken code. Every. Single. Time.</p>

<h2 id="production">Production Wisdom</h2>
<p>Production code is like a Jenga tower. Every block is load-bearing. Every block is somehow essential. And if you pull out the wrong one, everything comes crashing down at 3 AM while you''re trying to sleep.</p>
<p>My production deployment checklist:</p>
<ol>
<li>Does it work? (Yes/No)</li>
<li>Are you sure? (Yes/No/Maybe)</li>
<li>Have you tested edge cases? (Yes/No/What''s an edge case)</li>
<li>Is Friday approaching? (Run away)</li>
</ol>
<p>Remember: code that works is a miracle. Code that works <em>and</em> is clean is a myth. Code that works, is clean, and is well-documented? That''s just someone lying on their resume.</p>', '5');

COMMIT;
