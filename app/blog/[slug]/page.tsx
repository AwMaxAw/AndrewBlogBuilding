import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getNextPost, getPreviousPost } from "@/lib/posts";
import { formatDate, extractHeadings, type HeadingItem } from "@/lib/utils";
import { mdxComponents } from "@/components/MDXComponents";
import TOC from "@/components/TOC";
import PageNav from "@/components/PageNav";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  const headings = extractHeadings(post.content);
  const [nextPost, previousPost] = await Promise.all([
    getNextPost(params.slug),
    getPreviousPost(params.slug),
  ]);

  return (
    <article className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          <Link
            href="/blog"
            className="glass-btn text-sm text-foreground mb-10 z-10"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <ArrowLeft size={14} />
              Back to Posts
            </span>
          </Link>

          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted pb-8 border-b border-border/60">
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} />
                {formatDate(post.date)}
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

          <div className="prose-custom first-letter">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          <PageNav previousPost={previousPost} nextPost={nextPost} />
        </div>

        <TOC items={headings} />
      </div>
    </article>
  );
}
