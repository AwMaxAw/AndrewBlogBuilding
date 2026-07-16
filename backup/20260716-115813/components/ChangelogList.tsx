import { ChangelogMeta } from "@/lib/changelogs";
import ChangelogCard from "./ChangelogCard";

interface ChangelogListProps {
  items: ChangelogMeta[];
  title?: string;
}

export default function ChangelogList({ items, title }: ChangelogListProps) {
  return (
    <section>
      {title && (
        <h2 className="font-serif text-2xl font-semibold mb-6">{title}</h2>
      )}
      <div className="space-y-0">
        {items.map((item) => (
          <ChangelogCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
