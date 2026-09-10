"use client";

// ── 404 — page not found, sketchbook style ──────────────────────────────────

import { PillButton } from "@/components/site/ui";
import { Squiggle, DoodleStar } from "@/components/site/squiggle";
import { Link } from "@/lib/router";

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-32 text-center relative">
      <DoodleStar className="absolute top-[18%] left-[12%] animate-wiggle" size={36} />
      <Squiggle
        variant="spiral"
        animated
        className="absolute bottom-[16%] right-[10%] opacity-70 hidden sm:block"
        width={140}
        height={110}
      />
      <p className="font-serif font-light text-[clamp(80px,18vw,180px)] leading-none">
        4<em className="font-normal">0</em>4
      </p>
      <p className="font-serif font-light text-[clamp(22px,4vw,34px)] leading-snug mt-4 max-w-md">
        This page wandered off <em className="font-normal">mid-sketch</em>.
      </p>
      <p className="font-sans text-sm tracking-tight text-charcoal mt-3">
        (The ink smudged, the link broke — let&apos;s get you home)
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-9">
        <PillButton to="/" variant="solid" size="lg">
          Back home
        </PillButton>
        <PillButton to="/sitemap" variant="outline" size="lg">
          View sitemap
        </PillButton>
      </div>
      <p className="font-sans text-[13px] tracking-tight text-charcoal mt-8">
        Or try the{" "}
        <Link to="/blog" className="link-coral">
          journal
        </Link>
        ,{" "}
        <Link to="/services" className="link-coral">
          services
        </Link>{" "}
        or{" "}
        <Link to="/contact" className="link-coral">
          contact
        </Link>
        .
      </p>
    </div>
  );
}
