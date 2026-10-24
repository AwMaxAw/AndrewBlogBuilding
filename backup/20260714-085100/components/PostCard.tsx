import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDateShort } from "@/lib/utils";
import { Clock } from "lucide-react";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-6 border-b border-border/60 last:border-b-0 hover:bg-foreground/[0.02] -mx-6 px-6 transition-colors duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
        <time className="text-sm text-muted font-mono shrink-0 mb-2 md:mb-0 md:w-28">
          {formatDateShort(post.date)}
        </time>
        <div className="flex-1">
          <h2 className="font-serif text-xl md:text-2xl font-medium group-hover:text-accent transition-colors duration-200 leading-snug">
            {post.title}
          </h2>
          <p className="text-muted text-sm mt-2 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Clock size={12} />
              {post.readingTime}
            </span>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
