import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import SearchResults from "@/components/SearchResults";

export default function SearchPage() {
  const posts = getAllPosts();
  return (
    <Suspense fallback={null}>
      <SearchResults posts={posts} />
    </Suspense>
  );
}
