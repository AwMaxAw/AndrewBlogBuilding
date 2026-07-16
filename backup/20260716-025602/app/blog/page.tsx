import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All blog posts",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          All Posts
        </h1>
        <p className="text-muted text-lg">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
