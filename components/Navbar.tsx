"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "文章" },
  { href: "/about", label: "关于" },
] as const;

function isActiveLink(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight hover:text-accent transition-colors"
        >
          Andrew
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm transition-colors hover:text-accent",
                  active ? "text-foreground" : "text-muted"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-border/50",
          mobileOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm py-2 transition-colors",
                  active ? "text-accent" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
