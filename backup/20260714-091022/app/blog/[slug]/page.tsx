import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/MDXComponents";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="glass-btn text-sm text-foreground mb-10 z-10"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          <ArrowLeft size={14} />
          返回文章列表
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
    </article>
  );
}
