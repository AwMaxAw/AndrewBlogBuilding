"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Posts" },
  { href: "/docs", label: "Docs" },
];

const MORE_LINKS: { href: string; label: string }[] = [
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
  { href: "/more", label: "More" },
];

function isActiveLink(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
        "fixed z-50 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "top-3 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:max-w-5xl rounded-full bg-white/15 dark:bg-[#0f0f0f]/15 backdrop-blur-[2px] border border-white/20 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/40"
          : "top-0 left-0 right-0 bg-transparent"
      )}
    >
      <nav className={cn(
        "w-full flex items-center justify-between transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "h-14 px-10 md:px-16 lg:px-20"
          : "h-16 px-16 md:px-28 lg:px-36"
      )}>
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight hover:text-accent transition-colors"
        >
          Andrew
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {PRIMARY_LINKS.map((link) => {
                const active = isActiveLink(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group relative text-sm transition-colors",
                      active ? "text-accent" : "text-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px transition-all duration-300 ease-out",
                        active ? "w-full bg-accent" : "w-0 bg-foreground dark:bg-white group-hover:w-full"
                      )}
                    />
                  </Link>
                );
              })}

              <div className="relative flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-4 overflow-hidden transition-all duration-300 ease-out",
                    desktopMoreOpen ? "w-44 opacity-100 mr-0" : "w-0 opacity-0 mr-0"
                  )}
                >
                  {MORE_LINKS.map((link) => {
                    const active = isActiveLink(link.href, pathname);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "group relative text-sm transition-colors whitespace-nowrap",
                          active ? "text-accent" : "text-muted hover:text-foreground"
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 h-px transition-all duration-300 ease-out",
                            active ? "w-full bg-accent" : "w-0 bg-foreground dark:bg-white group-hover:w-full"
                          )}
                        />
                      </Link>
                    );
                  })}
            </div>

            <button
              onClick={() => {
                setDesktopMoreOpen(!desktopMoreOpen);
                setSearchOpen(false);
              }}
              className="p-1.5 text-muted hover:text-foreground transition-colors rounded-full hover:bg-background/50"
              aria-label="Toggle more menu"
            >
              {desktopMoreOpen ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>

            <div className="relative flex items-center">
              <form
                onSubmit={handleSearch}
                className={cn(
                  "relative transition-all duration-300 ease-out",
                  searchOpen ? "w-40" : "w-0 overflow-hidden"
                )}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full pl-8 pr-3 py-1.5 bg-white/90 dark:bg-gray-900/90 border border-border/40 dark:border-gray-700/40 rounded-full text-xs text-gray-900 dark:text-gray-100 placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
                  autoFocus={searchOpen}
                />
                <button
                  type="submit"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
                  aria-label="Search"
                >
                  <Search size={14} />
                </button>
              </form>

              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen) {
                    setDesktopMoreOpen(false);
                  }
                }}
                className="p-1.5 -mr-1.5 text-muted hover:text-foreground transition-colors rounded-full hover:bg-background/50"
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <div
            className={cn(
              "flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide transition-all duration-300 ease-out flex-nowrap",
              mobileOpen ? "w-auto max-w-[65vw] opacity-100 mr-2" : "w-0 opacity-0 mr-0"
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
