import { Suspense } from "react";
import { getAllPostsFull } from "@/lib/posts";
import SearchResults from "@/components/SearchResults";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const posts = await getAllPostsFull();
  return (
    <Suspense fallback={null}>
      <SearchResults posts={posts} />
    </Suspense>
  );
}
