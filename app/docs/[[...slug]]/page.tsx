import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import DocsSidebar from "@/components/DocsSidebar";
import DocsTOC from "@/components/DocsTOC";
import {
  getDocBySlug,
  getFirstDocSlug,
  getAdjacentDocs,
} from "@/lib/docs";

interface DocPageProps {
  params: { slug?: string[] };
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const slug = params.slug?.[0] || getFirstDocSlug();
  const doc = getDocBySlug(slug);
  return {
    title: doc ? `${doc.title} - Docs` : "Docs",
  };
}

export default function DocPage({ params }: DocPageProps) {
  const slug = params.slug?.[0] || "";

  if (!slug) {
    redirect(`/docs/${getFirstDocSlug()}`);
  }

  const doc = getDocBySlug(slug);

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

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex gap-8 py-8">
        <DocsSidebar />

        <main className="flex-1 min-w-0">
          <article className="prose-custom max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl font-semibold mb-8">
              {doc.title}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: doc.content }}
              className="prose-content"
            />
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
