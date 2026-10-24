"use client";

import { useEffect, useState, useRef } from "react";
import type { HeadingItem } from "@/lib/utils";

interface TOCProps {
  items: HeadingItem[];
}

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = items.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -60% 0%",
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20">
        <nav className="glass-card p-4">
          <h3 className="text-sm font-medium text-foreground mb-4 pb-2 border-b border-border/40">
            Contents
          </h3>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-xs py-1.5 px-2 rounded-lg transition-colors ${
                    activeId === item.id
                      ? "text-accent bg-accent/10"
                      : "text-muted hover:text-foreground"
                  }`}
                  style={{
                    paddingLeft: `${(item.level - 2) * 12 + 8}px`,
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
