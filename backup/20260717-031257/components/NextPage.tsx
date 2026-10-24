import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface NextPageProps {
  nextPost: PostMeta;
}

export default function NextPage({ nextPost }: NextPageProps) {
  return (
    <div className="mt-16 pt-8 border-t border-border/40">
      <div className="flex justify-center">
        <Link
          href={`/blog/${nextPost.slug}`}
          className="flex items-center gap-3 px-8 py-3 border border-border/60 rounded-full text-sm hover:border-accent/60 hover:text-accent transition-colors"
        >
          <span className="text-muted">Next page</span>
          <span className="font-medium">{nextPost.title}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
