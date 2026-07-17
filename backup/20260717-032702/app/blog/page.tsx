import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description: "All blog posts",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Posts
        </h1>
        <p className="text-muted text-lg">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
