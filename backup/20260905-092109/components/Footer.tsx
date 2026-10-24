'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Twitter, Mail, Rss, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "About", href: "/about" },
      { label: "More", href: "/more" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/AwMaxAw" },
      { label: "Twitter", href: "https://twitter.com" },
      { label: "Email", href: "mailto:max.li.ggm@gmail.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

function isActiveLink(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border bg-secondary/20 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-serif font-semibold text-lg">Andrew</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              A personal blog about technology, design, and everyday life.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
                  const isInternal = !isExternal && !link.href.startsWith("#");
                  const active = isInternal && isActiveLink(link.href, pathname);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative text-sm transition-colors inline-flex items-center gap-0.5 group",
                          active ? "text-accent" : "text-muted hover:text-foreground"
                        )}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label}
                        {isExternal && (
                          <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        )}
                        {isInternal && (
                          <span
                            className={cn(
                              "absolute -bottom-0.5 left-0 h-px transition-all duration-300 ease-out",
                              active ? "w-full bg-accent" : "w-0 bg-foreground dark:bg-white group-hover:w-full"
                            )}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted">
              © {new Date().getFullYear()} Andrew&apos;s Blog
            </span>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/AwMaxAw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </Link>
              <Link
                href="mailto:max.li.ggm@gmail.com"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </Link>
              <Link
                href="/rss.xml"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="RSS"
              >
                <Rss size={16} />
              </Link>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
