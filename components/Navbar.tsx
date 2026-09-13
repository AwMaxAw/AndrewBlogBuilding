"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
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

        {/* 桌面端链接区：PRIMARY + INTERNAL(展开弹出) + More 按钮，紧贴排列 */}
        <div className="hidden md:flex items-center gap-0">
          {PRIMARY_LINKS.map((link) => {
            const active = isActiveLink(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-sm px-2 transition-colors whitespace-nowrap",
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

          {/* INTERNAL_LINKS：展开时从 PRIMARY 和 More 之间向左弹出 */}
          <div
            className={cn(
              "flex items-center transition-all duration-300 ease-out overflow-hidden",
              moreOpen ? "opacity-100 ml-0" : "opacity-0 w-0 ml-0"
            )}
          >
            {INTERNAL_LINKS.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm px-2 transition-colors whitespace-nowrap",
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

          {/* More 按钮：紧贴 PRIMARY，展开时 INTERNAL 从它左边弹出 */}
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
        </div>

        {/* 桌面端搜索按钮，固定不被挤 */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
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
        </div>

        {/* 移动端：logo 在左，中间链接区横向滚动，右侧搜索+汉堡固定 */}
        <div className="md:hidden flex items-center gap-1 min-w-0">
          <div
            className={cn(
              "flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide transition-all duration-300 ease-out flex-nowrap min-w-0",
              mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            style={{ width: mobileOpen ? "auto" : 0, flex: mobileOpen ? "1 1 auto" : "0 0 0" }}
          >
            {INTERNAL_LINKS.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0",
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
            onClick={() => {
              setSearchOpen(!searchOpen);
              if (!searchOpen) setMobileOpen(false);
            }}
            className="p-1.5 text-muted hover:text-foreground transition-colors rounded-full hover:bg-background/50 shrink-0"
            aria-label="Toggle search"
          >
            <Search size={18} />
          </button>

          <button
            className="p-1.5 text-foreground shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* 移动端搜索框（展开时覆盖在导航栏下方） */}
      <div className={cn("md:hidden fixed top-14 left-4 right-4 z-50 transition-all duration-300", searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
        <form
          onSubmit={handleSearch}
          className="relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-white/90 dark:bg-gray-900/90 border border-border/40 dark:border-gray-700/40 rounded-full text-sm text-gray-900 dark:text-gray-100 placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all"
            autoFocus={searchOpen}
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        </form>
      </div>
    </header>
  );
}
