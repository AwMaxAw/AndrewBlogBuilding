import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "More",
  description: "Friend links and more resources",
};

interface FriendLink {
  name: string;
  url: string;
  description: string;
}

const FRIEND_LINKS: FriendLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/AwMaxAw",
    description: "My open source projects and code",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    description: "Follow me for updates and thoughts",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org",
    description: "The React framework for the web",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
  },
];

export default function MorePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
          More
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Friend links and useful resources.
        </p>
      </header>

      <section>
        <h2 className="font-serif text-2xl font-semibold mb-8">Friend Links</h2>
        <div className="grid gap-4">
          {FRIEND_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card z-10 group"
            >
              <div className="relative z-10 p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-medium mb-1 group-hover:text-accent transition-colors flex items-center gap-1">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted">{link.description}</p>
                </div>
                <ExternalLink
                  size={18}
                  className="text-muted group-hover:text-accent transition-colors shrink-0 ml-4"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
