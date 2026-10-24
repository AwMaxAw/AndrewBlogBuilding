import Hero from "@/components/Hero";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <Hero />
      <PostList posts={posts} title="最新文章" />
    </div>
  );
}
