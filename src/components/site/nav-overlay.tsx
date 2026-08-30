"use client";

// ── Full-screen editorial navigation overlay ────────────────────────────────

import { useEffect } from "react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Squiggle, DoodleStar } from "@/components/site/squiggle";

interface NavGroup {
  label: string;
  links: { to: string; label: string; italic?: boolean }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/story", label: "Our story" },
      { to: "/mission", label: "Mission & vision" },
      { to: "/leadership", label: "Leadership" },
      { to: "/culture", label: "Life at LFRDCA" },
      { to: "/partners", label: "Partners" },
      { to: "/investors", label: "Investors" },
      { to: "/certifications", label: "Certifications" },
    ],
  },
  {
    label: "What we do",
    links: [
      { to: "/services", label: "All services" },
      { to: "/services/ai-development", label: "AI development" },
      { to: "/services/data-analytics", label: "Data analytics" },
      { to: "/services/data-science", label: "Data science" },
      { to: "/services/machine-learning", label: "Machine learning" },
      { to: "/services/cloud-devops", label: "Cloud & DevOps" },
      { to: "/solutions", label: "Solutions" },
      { to: "/industries", label: "Industries" },
    ],
  },
  {
    label: "Proof",
    links: [
      { to: "/portfolio", label: "Case studies" },
      { to: "/blog", label: "Journal" },
      { to: "/insights", label: "Insights" },
      { to: "/whitepapers", label: "Whitepapers" },
      { to: "/news", label: "News & events" },
      { to: "/pricing", label: "Pricing" },
      { to: "/training", label: "Training" },
      { to: "/coming-soon", label: "Lab previews" },
    ],
  },
  {
    label: "Connect",
    links: [
      { to: "/contact", label: "Contact", italic: true },
      { to: "/quote", label: "Request a quote" },
      { to: "/careers", label: "Careers", italic: true },
      { to: "/internships", label: "Internships" },
      { to: "/support", label: "Support" },
      { to: "/docs", label: "Documentation" },
      { to: "/faq", label: "FAQ" },
      { to: "/status", label: "System status" },
    ],
  },
];

const ACCOUNT_LINKS = [
  { to: "/login", label: "Sign in" },
  { to: "/register", label: "Create account" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookies" },
  { to: "/gdpr", label: "GDPR" },
  { to: "/sitemap", label: "Sitemap" },
];

export function NavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={cn(
        "fixed inset-0 z-50 bg-paper paper-grain transition-all duration-300 overflow-y-auto sketch-scroll",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 min-h-full flex flex-col">
        {/* top row */}
        <div className="flex items-center justify-between">
          <span className="font-serif font-medium text-xl sm:text-2xl">
            LFRDCA <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal">Technologies</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-[46px] h-[46px] rounded-full border-[1.5px] border-ink bg-white shadow-sketch-btn flex items-center justify-center transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer"
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
              <path d="M4 4 L 16 16 M16 4 L 4 16" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* giant statement */}
        <div className="relative mt-8 sm:mt-12">
          <p className="font-serif font-light text-[clamp(30px,5.5vw,58px)] leading-[1.05] max-w-3xl">
            Where should we <em className="font-normal">wander</em> today?
          </p>
          <Squiggle
            variant="underline"
            animated={open}
            className="absolute -bottom-6 left-0 opacity-80"
            width={220}
            height={26}
          />
          <DoodleStar className="absolute -top-4 right-6 animate-wiggle hidden sm:block" size={30} />
        </div>

        {/* link groups */}
        <nav className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pb-12 flex-1">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label} className="flex flex-col gap-4">
              <span className="font-serif text-sm font-light tracking-widest text-ink/50">
                {String(gi + 1).padStart(2, "0")} — {group.label}
              </span>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="group inline-flex items-baseline gap-2 font-serif font-light text-[clamp(18px,2.2vw,24px)] leading-tight hover:translate-x-1 transition-transform"
                    >
                      <span className="w-0 overflow-hidden text-coral transition-all duration-200 group-hover:w-4">
                        →
                      </span>
                      <span className={cn(link.italic && "italic font-normal")}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* bottom row */}
        <div className="border-t-[1.5px] border-ink/15 pt-6 pb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {ACCOUNT_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={onClose}
                className="rounded-[3000px] border-[1.5px] border-ink bg-white px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] shadow-sketch-sm hover:-translate-y-[2px] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[12px] tracking-tight text-charcoal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={onClose} className="hover:text-coral transition-colors">
                {l.label}
              </Link>
            ))}
            <a href="mailto:lfrdcatechnologies@outlook.com" className="hover:text-coral transition-colors">
              lfrdcatechnologies@outlook.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
