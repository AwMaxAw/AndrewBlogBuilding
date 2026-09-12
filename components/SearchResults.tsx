"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import { FileText } from "lucide-react";
import type { Post } from "@/lib/posts";

interface SearchResultsProps {
  posts: Post[];
}

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  snippet: string;
}

function searchPostsLocal(query: string, posts: Post[]): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return posts
    .map((post) => {
      const searchText = `${post.title} ${post.description} ${post.tags.join(" ")} ${post.content}`;
      const lowerContent = searchText.toLowerCase();

      if (!lowerContent.includes(lowerQuery)) {
        return null;
      }

      let snippet = "";
      const index = lowerContent.indexOf(lowerQuery);
      if (index !== -1) {
        const start = Math.max(0, index - 30);
        const end = Math.min(searchText.length, index + lowerQuery.length + 50);
        snippet = searchText.slice(start, end);
        if (start > 0) snippet = "..." + snippet;
        if (end < searchText.length) snippet = snippet + "...";
      }

      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        snippet,
      };
    })
    .filter((result): result is SearchResult => result !== null)
    .slice(0, 10);
}

export default function SearchResults({ posts }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = searchPostsLocal(query, posts);

  return (
    <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Search Results
        </h1>
        <p className="text-muted text-lg">
          {query ? (
            <>
              Results for &quot;{query}&quot;
            </>
          ) : (
            "Enter a search query above"
          )}
        </p>
      </header>

      <div className="mb-12 max-w-md">
        <SearchBar />
      </div>

      {!query ? (
        <div className="text-center py-16">
          <FileText size={48} className="mx-auto text-muted mb-4" />
          <p className="text-muted">Type something to search</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <FileText size={48} className="mx-auto text-muted mb-4" />
          <p className="text-muted">No related articles found</p>
          <p className="text-sm text-muted mt-2">Try other keywords</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/blog/${result.slug}`}
              className="block glass-card p-6 group z-10"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-serif text-xl font-medium group-hover:text-accent transition-colors leading-snug">
                    {result.title}
                  </h2>
                  <time className="text-xs text-muted font-mono shrink-0">
                    {formatDate(result.date, true)}
                  </time>
                </div>
                {result.snippet && (
                  <p className="text-sm text-muted mb-3 line-clamp-2">
                    {result.snippet}
                  </p>
                )}
                {result.description && !result.snippet && (
                  <p className="text-sm text-muted mb-3 line-clamp-2">
                    {result.description}
                  </p>
                )}
                {result.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {result.tags.slice(0, 3).map((tag) => (
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
