"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "文章" },
];

const MORE_LINKS: { href: string; label: string }[] = [
  { href: "/changelog", label: "日志" },
  { href: "/about", label: "关于" },
];

function isActiveLink(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMoreOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        scrolled ? "liquid-glass-nav" : "fixed top-0 left-0 right-0 bg-transparent"
      )}
    >
      <nav className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight hover:text-accent transition-colors"
        >
          Andrew
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {PRIMARY_LINKS.map((link) => {
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

          <form onSubmit={handleSearch} className="relative w-32">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索..."
              className="w-full pl-8 pr-3 py-1.5 bg-background/50 border border-border/40 rounded-full text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <button
              type="submit"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
              aria-label="Search"
            >
              <Search size={14} />
            </button>
          </form>

          <div className="relative flex items-center">
            <div
              className={cn(
                "flex items-center gap-4 overflow-hidden transition-all duration-300 ease-out",
                desktopMoreOpen ? "w-32 opacity-100 mr-0" : "w-0 opacity-0 mr-0"
              )}
            >
              {MORE_LINKS.map((link) => {
                const active = isActiveLink(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-sm transition-colors hover:text-accent whitespace-nowrap",
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

            <button
              onClick={() => setDesktopMoreOpen(!desktopMoreOpen)}
              className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
              aria-label="Toggle more menu"
            >
              更多
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-300",
                  desktopMoreOpen ? "rotate-180" : ""
                )}
              />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <div
            className={cn(
              "flex items-center gap-1 overflow-hidden transition-all duration-300 ease-out",
              mobileOpen ? "w-auto opacity-100 mr-2" : "w-0 opacity-0 mr-0"
            )}
          >
            {PRIMARY_LINKS.filter((link) => link.href !== "/").concat(MORE_LINKS).map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm px-3 py-1.5 rounded-full transition-colors whitespace-nowrap",
                    active
                      ? "text-accent bg-accent/10"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            className="p-2 -mr-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}