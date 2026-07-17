'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DOCS_CATEGORIES,
  getDocCategoryBySlug,
} from "@/lib/docs";
import DocsCategorySelector from "./DocsCategorySelector";

export default function DocsSidebar() {
  const pathname = usePathname();
  const slug = pathname.replace("/docs/", "").replace("/", "");

  const currentCategory = getDocCategoryBySlug(slug);
  const sections = currentCategory?.sections || DOCS_CATEGORIES[0].sections;

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <DocsCategorySelector />

        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="text-sm font-semibold mb-3 text-foreground">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.pages.map((page) => {
                const isActive = pathname === page.href;
                return (
                  <li key={page.slug}>
                    <Link
                      href={page.href}
                      className={cn(
                        "block text-sm py-1.5 px-3 rounded-md transition-colors",
                        isActive
                          ? "text-accent bg-accent/10 font-medium"
                          : "text-muted hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      {page.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
