"use client";

// ── Footer — inverted charcoal section, sticks to bottom via layout flex ────

import { Link } from "@/lib/router";
import { Squiggle } from "@/components/site/squiggle";
import { PillButton } from "@/components/site/ui";

const COLUMNS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Services",
    links: [
      { to: "/services/ai-development", label: "AI Development" },
      { to: "/services/data-analytics", label: "Data Analytics" },
      { to: "/services/data-science", label: "Data Science" },
      { to: "/services/machine-learning", label: "Machine Learning" },
      { to: "/services/cloud-devops", label: "Cloud & DevOps" },
      { to: "/services", label: "View all" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/story", label: "Our story" },
      { to: "/leadership", label: "Leadership" },
      { to: "/careers", label: "Careers" },
      { to: "/culture", label: "Culture" },
      { to: "/news", label: "News & events" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/blog", label: "Journal" },
      { to: "/whitepapers", label: "Whitepapers" },
      { to: "/docs", label: "Documentation" },
      { to: "/support", label: "Support" },
      { to: "/faq", label: "FAQ" },
      { to: "/status", label: "System status" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-charcoal text-paper">
      {/* CTA band */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="relative flex flex-col items-start gap-6">
          <p className="font-serif font-light text-[clamp(30px,5vw,54px)] leading-[1.05] max-w-3xl">
            Have data? Let&apos;s make it <em className="font-normal">sing</em>.
          </p>
          <Squiggle
            variant="underline"
            color="#81aed9"
            className="absolute -bottom-3 left-0 opacity-90 hidden sm:block"
            width={260}
            height={24}
          />
          <PillButton to="/contact" variant="dark" size="lg" className="mt-4">
            Start a project
          </PillButton>
        </div>
      </div>

      {/* link columns */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 border-t-[1.5px] border-paper/15">
        <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
          <img src="/images/logo-lfrdca.png.png" alt="LFRDCA Technologies" className="h-10 w-auto object-contain self-start" />
          <p className="font-sans text-[13px] leading-relaxed tracking-tight text-paper/70 max-w-[240px]">
            An AI-powered information technology company crafting data,
            intelligence and analytics for brave teams.
          </p>
          <div className="flex flex-col gap-1 font-sans text-[13px] tracking-tight text-paper/80 mt-2">
            <a href="mailto:lfrdcatechnologies@outlook.com" className="hover:text-coral transition-colors">
              lfrdcatechnologies@outlook.com
            </a>
            <a href="tel:+917361864847" className="hover:text-coral transition-colors">
              +91 7361864847
            </a>
            <span>Noida Sector 62, Uttar Pradesh 201309</span>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="font-serif text-sm font-light tracking-widest text-paper/50 uppercase">
              {col.title}
            </span>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="font-sans text-[13px] tracking-tight text-paper/85 hover:text-coral transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div className="border-t-[1.5px] border-paper/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <p className="font-sans text-[12px] tracking-tight text-paper/60 text-center sm:text-left">
            © {new Date().getFullYear()} LFRDCA Technologies · All rights reserved
          </p>
          <p className="font-sans text-[12px] tracking-tight text-paper/60 text-center sm:text-right">
            Designed &amp; developed by{" "}
            <span className="text-coral">LFRDCA Technologies</span> &amp; It's Associates.
          </p>
        </div>
      </div>
    </footer>
  );
}
