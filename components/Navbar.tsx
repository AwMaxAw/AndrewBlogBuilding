"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Menu, Search, Github, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Posts" },
  { href: "/docs", label: "Docs" },
  { href: "/calendar", label: "Calendar" },
];

const INTERNAL_LINKS: { href: string; label: string }[] = [
  { href: "/archive", label: "Archive" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/about", label: "About" },
  { href: "/more", label: "More" },
];

const CONNECT_LINKS: { href: string; label: string }[] = [
  { href: "https://github.com/AwMaxAw", label: "GitHub" },
  { href: "https://twitter.com", label: "Twitter" },
];

const FRIEND_LINKS: { href: string; label: string }[] = [
  { href: "https://nextjs.org", label: "Next.js" },
  { href: "https://tailwindcss.com", label: "Tailwind CSS" },
  { href: "https://hconzlvra.top", label: "hconzlvra.top" },
];

function isActiveLink(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // 点击外部关闭 More 下拉
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all",
        scrolled ? "px-4 pt-3" : "px-4 pt-4"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDuration: "450ms" }}
    >
      <nav
        className={cn(
          "flex items-center justify-between h-12 rounded-full transition-all",
          scrolled
            ? "max-w-2xl w-full mx-auto px-4 md:px-5 bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 backdrop-blur-xl saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            : "max-w-4xl w-full mx-auto px-3 bg-transparent border border-transparent backdrop-blur-none"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDuration: "450ms" }}
      >
        <Link
          href="/"
          className={cn(
            "font-serif text-xl font-semibold tracking-tight hover:text-accent transition-all duration-500 ease-out shrink-0",
            scrolled ? "ml-0" : "ml-2"
          )}
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
        </div>

        {/* 右侧操作区：搜索 + More 按钮，固定不被挤 */}
        <div className="flex items-center gap-1 shrink-0">
          {/* 搜索 */}
          <div className="relative flex items-center">
            <form
              onSubmit={handleSearch}
              className={cn(
                "relative transition-all duration-300 ease-out overflow-hidden",
                searchOpen ? "w-40 opacity-100" : "w-0 opacity-0"
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
                if (!searchOpen) setMoreOpen(false);
              }}
              className="p-1.5 text-muted hover:text-foreground transition-colors rounded-full hover:bg-background/50 shrink-0"
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>
          </div>

          {/* More 下拉 */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => {
                setMoreOpen(!moreOpen);
                if (!moreOpen) setSearchOpen(false);
              }}
              className="p-1.5 text-muted hover:text-foreground transition-colors rounded-full hover:bg-background/50 shrink-0"
              aria-label="Toggle more menu"
            >
              <Menu size={18} />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 glass-card p-2 z-50">
                <div className="relative z-10 max-h-[70vh] overflow-y-auto">
                  {/* 内部页面 */}
                  <div className="mb-2">
                    <p className="px-3 py-1.5 text-xs font-semibold text-muted uppercase tracking-wide">
                      Pages
                    </p>
                    {INTERNAL_LINKS.map((link) => {
                      const active = isActiveLink(link.href, pathname);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "block px-3 py-1.5 rounded-lg text-sm transition-colors",
                            active ? "text-accent bg-accent/10" : "text-muted hover:text-foreground hover:bg-background/50"
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Connect */}
                  <div className="mb-2 pt-2 border-t border-border/40">
                    <p className="px-3 py-1.5 text-xs font-semibold text-muted uppercase tracking-wide">
                      Connect
                    </p>
                    {CONNECT_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-background/50 transition-colors"
                      >
                        {link.label === "GitHub" ? <Github size={14} /> : <Twitter size={14} />}
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Friend Links */}
                  <div className="pt-2 border-t border-border/40">
                    <p className="px-3 py-1.5 text-xs font-semibold text-muted uppercase tracking-wide">
                      Friend Links
                    </p>
                    {FRIEND_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-background/50 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 移动端 */}
        <div className="md:hidden flex items-center">
          <div
            className={cn(
              "flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide transition-all duration-300 ease-out flex-nowrap",
              mobileOpen ? "w-auto max-w-[65vw] opacity-100 mr-2" : "w-0 opacity-0 mr-0"
            )}
          >
            {PRIMARY_LINKS.filter((link) => link.href !== "/").concat(INTERNAL_LINKS).map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm px-3 py-1.5 rounded-full transition-colors whitespace-nowrap",
                    active ? "text-accent" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-px origin-left transition-transform duration-300 ease-out",
                      active ? "scale-x-100 bg-accent" : "scale-x-0 bg-foreground dark:bg-white group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <button
            className="p-2 -mr-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
