import Hero from "@/components/Hero";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <PostList posts={posts} title="Latest Posts" />
      </div>
    </>
  );
}
