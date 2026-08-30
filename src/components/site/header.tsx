"use client";

// ── Minimal header: wordmark left, circular hamburger trigger right ─────────

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/lib/router";

export function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-paper/90 backdrop-blur-sm border-b-[1.5px] border-ink/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        <Link
          to="/"
          aria-label="LFRDCA Technologies — home"
          className="group flex items-baseline gap-2"
        >
          <span className="font-serif font-medium text-xl sm:text-2xl tracking-tight">
            LFRDCA
          </span>
          <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal group-hover:text-coral transition-colors">
            Technologies
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-[3000px] border-[1.5px] border-ink bg-white px-5 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.14em] shadow-sketch-sm transition-all hover:-translate-x-[2px] hover:-translate-y-[2px]"
          >
            Let&apos;s talk
          </Link>
          <button
            onClick={onOpenNav}
            aria-label="Open navigation menu"
            aria-expanded="false"
            className="relative w-[46px] h-[46px] rounded-full border-[1.5px] border-ink bg-white shadow-sketch-btn flex flex-col items-center justify-center gap-[5px] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333] active:translate-x-0 active:translate-y-0 active:shadow-sketch-btn cursor-pointer"
          >
            <span className="block w-[16px] h-[1.5px] bg-ink rounded-full" />
            <span className="block w-[16px] h-[1.5px] bg-ink rounded-full" />
            <span className="block w-[16px] h-[1.5px] bg-ink rounded-full" />
          </button>
        </div>
      </div>
      {/* current page marker */}
      <div className="sr-only" aria-live="polite">
        Current page: {path === "/" ? "home" : path}
      </div>
    </header>
  );
}
