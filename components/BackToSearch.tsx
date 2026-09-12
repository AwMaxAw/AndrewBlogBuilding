"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BackToSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!query);
  }, [query]);

  if (!query) return null;

  return (
    <div
      className={`inline-flex items-center transition-all duration-300 ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-2 pointer-events-none"
      }`}
    >
      <Link
        href={`/search?q=${encodeURIComponent(query)}`}
        className="glass-btn text-sm text-accent z-10"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          <ArrowLeft size={14} />
          Back to search
        </span>
      </Link>
      <button
        onClick={() => setVisible(false)}
        className="ml-1 inline-flex items-center justify-center w-6 h-6 text-muted hover:text-foreground transition-colors"
        aria-label="Close"
      >
        <X size={14} />
      </button>
    </div>
  );
}
