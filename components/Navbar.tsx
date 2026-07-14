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
        scrolled ? "liquid-glass-nav" : "bg-transparent"
      )}
    >
      {/* Layer 0: Refraction - 折射层 */}
      {scrolled && (
        <div className="liquid-glass-nav__refract" aria-hidden="true" />
      )}

      {/* Layer 1: Tint - 着色层 */}
      {scrolled && (
        <div className="liquid-glass-nav__tint" aria-hidden="true" />
      )}

      {/* Layer 2: Specular - 高光层 */}
      {scrolled && (
        <div className="liquid-glass-nav__specular" aria-hidden="true" />
      )}

      {/* Layer 3: Content - 内容层 */}
      <nav className="relative z-10 max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
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

        {/* Mobile nav */}
        <div className="md:hidden flex items-center">
          {/* Mobile popup menu - slides in from right, same row */}
          <div
            className={cn(
              "flex items-center gap-1 overflow-hidden transition-all duration-300 ease-out",
              mobileOpen ? "w-auto opacity-100 mr-2" : "w-0 opacity-0 mr-0"
            )}
          >
            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => {
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