'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCS_SECTIONS } from "@/lib/docs";

export default function DocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <nav className={cn(
      "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4",
      mobileOpen ? "block" : "hidden lg:block"
    )}>
      {DOCS_SECTIONS.map((section) => (
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
                    onClick={() => setMobileOpen(false)}
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
  );

  return (
    <aside className="w-64 shrink-0">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center gap-2 text-sm font-medium mb-4 text-foreground"
      >
        <ChevronRight
          size={16}
          className={cn("transition-transform", mobileOpen ? "rotate-90" : "")}
        />
        Menu
      </button>
      {sidebarContent}
    </aside>
  );
}
