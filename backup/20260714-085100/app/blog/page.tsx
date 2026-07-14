import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "所有文章列表",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          所有文章
        </h1>
        <p className="text-muted text-lg">
          共 {posts.length} 篇文章
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
