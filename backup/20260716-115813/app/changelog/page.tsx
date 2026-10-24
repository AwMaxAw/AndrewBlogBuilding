import type { Metadata } from "next";
import ChangelogList from "@/components/ChangelogList";
import { getAllChangelogs } from "@/lib/changelogs";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Website update changelog",
};

export default function ChangelogPage() {
  const items = getAllChangelogs();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Changelog
        </h1>
        <p className="text-muted text-lg">
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </p>
      </header>
      <ChangelogList items={items} />
    </div>
  );
}
