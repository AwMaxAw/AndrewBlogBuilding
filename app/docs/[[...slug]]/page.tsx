import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import DocsSidebar from "@/components/DocsSidebar";
import DocsTOC from "@/components/DocsTOC";
import DocsMobileMenu from "@/components/DocsMobileMenu";
import { DocAdminControls } from "@/components/DocAdminControls";
import { formatDateTime } from "@/lib/utils";
import {
  getDocBySlug,
  getFirstDocSlug,
  getAdjacentDocs,
  getDocsCategories,
} from "@/lib/docs";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface DocPageProps {
  params: { slug?: string[] };
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const slug = params.slug?.[0] || (await getFirstDocSlug());
  const doc = await getDocBySlug(slug);
  return {
    title: doc ? `${doc.title} - Docs` : "Docs",
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params.slug?.[0] || "";

  if (!slug) {
    const firstSlug = await getFirstDocSlug();
    if (!firstSlug) {
      // 没有任何文档，显示空状态而非无限重定向
      const categories = await getDocsCategories();
      return (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex gap-8 py-8">
            <DocsSidebar categories={categories} />
            <main className="flex-1 min-w-0">
              <div className="prose-custom max-w-2xl mx-auto text-center py-20">
                <h1 className="font-serif text-3xl font-semibold mb-4">No Docs Yet</h1>
                <p className="text-muted">还没有文档内容。</p>
              </div>
            </main>
          </div>
        </div>
      );
    }
    redirect(`/docs/${firstSlug}`);
  }

  const [doc, categories, adjacent] = await Promise.all([
    getDocBySlug(slug),
    getDocsCategories(),
    getAdjacentDocs(slug),
  ]);

  if (!doc) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-4xl font-semibold mb-4">
          Page Not Found
        </h1>
        <p className="text-muted">
          The documentation page you are looking for does not exist.
        </p>
      </div>
    );
  }

  const { prev, next } = adjacent;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex gap-8 py-8">
        <DocsSidebar categories={categories} />

        <main className="flex-1 min-w-0">
          <article className="prose-custom max-w-2xl mx-auto">
            <DocsMobileMenu categories={categories} />
            <div className="mt-6 lg:mt-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="font-serif text-4xl font-semibold">
                  {doc.title}
                </h1>
                <DocAdminControls
                  doc={{
                    id: doc.id,
                    slug: doc.slug,
                    category_slug: doc.categoryId,
                    title: doc.title,
                    description: "",
                    content: doc.rawContent,
                    createdAt: doc.createdAt,
                  }}
                />
              </div>
              {doc.createdAt && (
                <p className="text-xs text-muted font-mono mb-8">
                  {formatDateTime(doc.createdAt)}
                </p>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: doc.content }}
                className="prose-content"
              />
            </div>
          </article>

          <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-border">
            <div className="flex justify-between items-center gap-6">
              {prev && (
                <Link
                  href={prev.href}
                  className="flex items-center gap-3 px-5 py-3 border border-border/60 rounded-md text-sm hover:border-accent/60 hover:text-accent transition-colors"
                >
                  <ArrowLeft size={14} />
                  <div className="text-left">
                    <div className="text-muted text-xs">Previous</div>
                    <div className="font-medium">{prev.title}</div>
                  </div>
                </Link>
              )}

              {next && (
                <Link
                  href={next.href}
                  className="flex items-center gap-3 px-5 py-3 border border-border/60 rounded-md text-sm hover:border-accent/60 hover:text-accent transition-colors ml-auto"
                >
                  <div className="text-right">
                    <div className="text-muted text-xs">Next</div>
                    <div className="font-medium">{next.title}</div>
                  </div>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </main>

        <DocsTOC headings={doc.headings} />
      </div>
    </div>
  );
}
