import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  snippet: string;
}

export function searchPosts(query: string): SearchResult[] {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  return posts
    .map((post) => {
      const content = `${post.title} ${post.description} ${post.tags.join(" ")}`;
      const lowerContent = content.toLowerCase();

      if (!lowerContent.includes(lowerQuery)) {
        return null;
      }

      let snippet = "";
      const index = lowerContent.indexOf(lowerQuery);
      if (index !== -1) {
        const start = Math.max(0, index - 30);
        const end = Math.min(lowerContent.length, index + lowerQuery.length + 30);
        snippet = content.slice(start, end);
        if (start > 0) snippet = "..." + snippet;
        if (end < content.length) snippet = snippet + "...";
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
