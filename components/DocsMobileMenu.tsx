'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCS_SECTIONS } from "@/lib/docs";

export default function DocsMobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <ChevronRight
          size={16}
          className={cn("transition-transform", open ? "rotate-90" : "")}
        />
        Menu
      </button>

      {open && (
        <nav className="mt-4 pb-6 mb-6 border-b border-border">
          {DOCS_SECTIONS.map((section) => (
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
      )}
    </div>
  );
}
