import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ChangelogMeta } from "@/lib/changelogs";

interface ChangelogCardProps {
  item: ChangelogMeta;
}

export default function ChangelogCard({ item }: ChangelogCardProps) {
  return (
    <Link
      href={`/changelog/${item.slug}`}
      className="group block glass-card my-4 z-10"
    >
      <div className="relative z-10 p-6">
        <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
          <time className="text-sm text-muted font-mono shrink-0 mb-2 md:mb-0 md:w-28">
            {formatDate(item.date, true)}
          </time>
          <div className="flex-1">
            <h2 className="font-serif text-xl md:text-2xl font-medium group-hover:text-accent transition-colors duration-200 leading-snug">
              {item.title}
            </h2>
            <p className="text-muted text-sm mt-2 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
            {item.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="glass-tag text-xs text-accent/80 z-10"
                  >
                    <span className="relative z-10">{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
