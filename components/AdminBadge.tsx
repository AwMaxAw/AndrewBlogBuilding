"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, LogOut, LayoutDashboard } from "lucide-react";
import { useAdmin } from "./AdminContext";

export function AdminBadge() {
  const { isAdmin, logout } = useAdmin();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.refresh();
  };

  return (
    <div ref={ref} className="relative -ml-1">
      <button
        onClick={() => setOpen(!open)}
        title="Admin mode"
        className="inline-flex items-center justify-center p-1.5 text-accent hover:text-accent/80 transition-colors rounded-full hover:bg-accent/10"
      >
        <Shield size={14} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[160px] glass-card p-2 z-50">
          <div className="relative z-10">
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-muted hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
            >
              <LogOut size={14} />
              Exit admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
