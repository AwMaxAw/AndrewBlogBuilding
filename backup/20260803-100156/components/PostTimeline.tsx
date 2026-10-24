'use client';

import { useEffect, useState } from "react";

interface TimelineGroup {
  id: string;
  label: string;
  count: number;
}

interface PostTimelineProps {
  groups: TimelineGroup[];
}

export default function PostTimeline({ groups }: PostTimelineProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
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

    groups.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  if (groups.length === 0) return null;

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-20">
        <nav className="glass-card p-4">
          <h3 className="text-sm font-medium text-foreground mb-4 pb-2 border-b border-border/40">
            Timeline
          </h3>
          <ul className="space-y-1">
            {groups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors ${
                    activeId === group.id
                      ? "text-accent bg-accent/10"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span>{group.label}</span>
                  <span className="text-muted/60 ml-2">{group.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
