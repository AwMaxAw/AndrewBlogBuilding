import { getAllPosts } from "@/lib/posts";
import SearchResults from "@/components/SearchResults";

export default function SearchPage() {
  const posts = getAllPosts();
  return <SearchResults posts={posts} />;
}
