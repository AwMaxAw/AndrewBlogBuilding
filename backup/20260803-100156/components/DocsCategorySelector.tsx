'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DOCS_CATEGORIES,
  getDocCategoryBySlug,
  getFirstDocSlug,
} from "@/lib/docs";
import { Hammer, Sparkles, ChevronDown } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer size={16} />,
  Sparkles: <Sparkles size={16} />,
};

export default function DocsCategorySelector() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentSlug = pathname.replace("/docs/", "");
  const currentCategory = getDocCategoryBySlug(currentSlug);
  const activeCategoryId = currentCategory?.id || DOCS_CATEGORIES[0].id;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative mb-6">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all",
          "border-border/60 bg-secondary/30 hover:bg-secondary/50",
          "text-left"
        )}
      >
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {iconMap[currentCategory?.icon || DOCS_CATEGORIES[0].icon]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">
            {currentCategory?.label || DOCS_CATEGORIES[0].label}
          </div>
          <div className="text-xs text-muted truncate">
            {currentCategory?.description || DOCS_CATEGORIES[0].description}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-muted transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "rounded-lg border border-border/60 bg-background/95 backdrop-blur-md",
            "shadow-lg overflow-hidden"
          )}
        >
          {DOCS_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            const firstSlug = getFirstDocSlug(cat.id);
            return (
              <Link
                key={cat.id}
                href={`/docs/${firstSlug}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "hover:bg-secondary/50 text-foreground"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                    isActive ? "bg-accent/20" : "bg-primary/10 text-primary"
                  )}
                >
                  {iconMap[cat.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{cat.label}</div>
                  <div className="text-xs text-muted truncate">
                    {cat.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
