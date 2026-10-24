'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocCategory } from "@/lib/docs";
import DocsCategorySelector from "./DocsCategorySelector";

interface Props {
  categories: DocCategory[];
}

export default function DocsMobileMenu({ categories }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const slug = pathname.replace("/docs/", "").replace("/", "");

  const currentCategory =
    categories.find((cat) =>
      cat.sections.some((s) => s.pages.find((p) => p.slug === slug))
    ) || categories[0];
  const sections = currentCategory?.sections || [];

  const allPages = categories.flatMap((cat) =>
    cat.sections.flatMap((s) => s.pages)
  );
  const title = allPages.find((p) => p.slug === slug)?.title || "";

  return (
    <div className="lg:hidden sticky top-14 z-30 -mx-6 px-6 pb-3 pt-3 glass-nav -mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"
      >
        <ChevronRight
          size={16}
          className={cn("transition-transform", open ? "rotate-90" : "")}
        />
        Menu
      </button>

      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <ChevronRight size={12} />
        {sections[0] && (
          <>
            <span className="truncate">{sections[0].title}</span>
            <ChevronRight size={12} />
          </>
        )}
        <span className="text-foreground font-medium truncate">{title}</span>
      </nav>

      {open && (
        <div className="mt-4 pb-4 max-h-[60vh] overflow-y-auto">
          <DocsCategorySelector categories={categories} />
          <nav>
            {sections.map((section) => (
            <div key={section.title} className="mb-6">
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
                        onClick={() => setOpen(false)}
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
        </div>
      )}
    </div>
  );
}
