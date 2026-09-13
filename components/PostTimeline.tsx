'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

interface TimelineGroup {
  id: string;
  label: string;
  count: number;
}

interface PostTimelineProps {
  groups: TimelineGroup[];
  slugs: string[];
}

export default function PostTimeline({ groups, slugs }: PostTimelineProps) {
  const [activeId, setActiveId] = useState("");
  const router = useRouter();

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
        // 监测带靠近视口顶部（10%~30% 高度），与 section 的 scroll-mt 对齐
        rootMargin: "-10% 0% -70% 0%",
        threshold: 0,
      }
    );

    groups.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  const handleRandom = () => {
    if (slugs.length === 0) return;
    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/blog/${randomSlug}`);
  };

  if (groups.length === 0) return null;

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-20 space-y-4">
        <nav className="glass-card p-4 z-10">
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-foreground mb-4 pb-2 border-b border-border/40">
              Timeline
            </h3>
            <ul className="space-y-1">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    onClick={() => setActiveId(group.id)}
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
          </div>
        </nav>

        {/* 随机跳帖 */}
        {slugs.length > 1 && (
          <button
            onClick={handleRandom}
            className="glass-card w-full p-4 z-10 text-left hover:border-accent/40 transition-colors group"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  Random Post
                </p>
                <p className="text-xs text-muted mt-0.5">
                  跳转到一篇随机文章
                </p>
              </div>
              <Shuffle size={18} className="text-accent shrink-0" />
            </div>
          </button>
        )}
      </div>
    </aside>
  );
}
