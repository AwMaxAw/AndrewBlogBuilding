import { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostMeta[];
  title?: string;
}

export default function PostList({ posts, title }: PostListProps) {
  return (
    <section id="posts">
      {title && (
        <h2 className="font-serif text-2xl font-semibold mb-10 flex items-center gap-4">
          {title}
          <span className="flex-1 h-px bg-border/80" />
        </h2>
      )}
      <div className="flex flex-col">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
