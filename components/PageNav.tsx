import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PageNavProps {
  previousPost: PostMeta | null;
  nextPost: PostMeta | null;
}

export default function PageNav({ previousPost, nextPost }: PageNavProps) {
  if (!previousPost && !nextPost) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border/40">
      <div className="flex justify-between items-center gap-6">
        {previousPost && (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="flex items-center gap-3 px-6 py-3 border border-border/60 rounded-full text-sm hover:border-accent/60 hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            <div className="text-left">
              <div className="text-muted">Previous page</div>
              <div className="font-medium">{previousPost.title}</div>
            </div>
          </Link>
        )}

        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-3 px-6 py-3 border border-border/60 rounded-full text-sm hover:border-accent/60 hover:text-accent transition-colors"
          >
            <div className="text-right">
              <div className="text-muted">Next page</div>
              <div className="font-medium">{nextPost.title}</div>
            </div>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
