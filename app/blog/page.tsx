import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import PostTimeline from "@/components/PostTimeline";
import { getAllPosts } from "@/lib/posts";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Posts",
  description: "All blog posts",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Group posts by year-month
  const groups: { id: string; label: string; count: number }[] = [];
  const groupMap: Record<string, typeof posts> = {};

  for (const post of posts) {
    const d = new Date(post.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = `${d.getFullYear()}年${d.getMonth() + 1}月`;
    if (!groupMap[key]) {
      groupMap[key] = [];
      groups.push({ id: key, label, count: 0 });
    }
    groupMap[key].push(post);
    groups[groups.length - 1].count++;
  }

  return (
    <div className="max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Posts
        </h1>
        <p className="text-muted text-lg">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </header>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="mb-10 scroll-mt-32">
              <h2 className="font-serif text-lg font-medium text-muted mb-4 flex items-center gap-4">
                {group.label}
                <span className="flex-1 h-px bg-border/60" />
                <span className="text-sm text-muted/60">{group.count}</span>
              </h2>
              <div className="flex flex-col">
                {groupMap[group.id].map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
        <PostTimeline groups={groups} />
      </div>
    </div>
  );
}
