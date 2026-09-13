import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getNextPost, getPreviousPost } from "@/lib/posts";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { renderMarkdownWithHeadings } from "@/lib/markdown";
import PageNav from "@/components/PageNav";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PostComments from "@/components/PostComments";
import BackToSearch from "@/components/BackToSearch";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { html, headings } = renderMarkdownWithHeadings(post.content);
  const [nextPost, previousPost] = await Promise.all([
    getNextPost(params.slug),
    getPreviousPost(params.slug),
  ]);

  return (
    <article className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-10">
            <Link
              href="/blog"
              className="glass-btn text-sm text-foreground z-10"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <ArrowLeft size={14} />
                Back to Posts
              </span>
            </Link>
            <Suspense fallback={null}>
              <BackToSearch />
            </Suspense>
          </div>

          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted pb-8 border-b border-border/60">
              <span className="inline-flex items-center gap-2" title={formatDateTime(post.createdAt)}>
                <Calendar size={14} />
                {formatDate(post.date)}
                {post.createdAt && (
                  <span className="text-muted font-mono text-xs">
                    {formatTime(post.createdAt)}
                  </span>
                )}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={14} />
                {post.readingTime}
              </span>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-tag text-xs text-accent/80 z-10"
                    >
                      <span className="relative z-10">{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose-custom first-letter"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <PageNav previousPost={previousPost} nextPost={nextPost} />

          <PostComments slug={params.slug} />
        </div>
      </div>
    </article>
  );
}
