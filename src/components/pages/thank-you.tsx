"use client";

// ── Thank you — a small celebration, sketchbook style ────────────────────────

import { Link } from "@/lib/router";
import { PillButton, Section, SketchCard, Tag } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const NEXT_STEPS = [
  {
    title: "Explore services",
    blurb: "Wander the eight crafts while you wait — one of them is probably why you wrote in.",
    to: "/services",
    tag: "The menu",
  },
  {
    title: "Read the journal",
    blurb: "Field notes on data, AI and craft. Genuinely readable, occasionally funny.",
    to: "/blog",
    tag: "The margins",
  },
  {
    title: "Meet the team",
    blurb: "The humans who’ll be replying to you — faces before inboxes.",
    to: "/leadership",
    tag: "The people",
  },
];

export default function ThankYouPage() {
  return (
    <div className="flex flex-col">
      <Section className="max-w-5xl">
        {/* ── CELEBRATION ─────────────────────────────────────────────────── */}
        <div className="relative py-16 sm:py-24 text-center">
          {/* confetti doodles */}
          <DoodleStar
            className="absolute top-[6%] left-[8%] animate-wiggle"
            size={34}
          />
          <DoodleStar
            className="absolute top-[16%] right-[10%] rotate-12"
            size={24}
            color="#81aed9"
          />
          <DoodleStar
            className="absolute bottom-[24%] left-[14%] -rotate-12 opacity-70"
            size={22}
          />
          <DoodleStar
            className="absolute bottom-[12%] right-[16%] animate-wiggle"
            size={30}
            color="#ff8562"
          />
          <Squiggle
            variant="spiral"
            className="absolute top-[38%] left-[2%] rotate-[18deg] opacity-50 hidden sm:block"
            width={110}
            height={90}
          />
          <Squiggle
            variant="swirl"
            color="#81aed9"
            className="absolute bottom-[30%] right-[3%] -rotate-6 opacity-50 hidden sm:block"
            width={150}
            height={62}
          />

          <span className="font-serif text-sm font-light tracking-widest text-ink/60 block mb-6">
            Thank you — 01
          </span>
          <h1 className="font-serif font-light text-[clamp(52px,11vw,120px)] leading-[1.0] text-balance">
            Thank <em className="font-normal">you</em>.
          </h1>
          <Squiggle
            variant="underline"
            color="#81aed9"
            animated
            className="mx-auto mt-6"
            width={300}
            height={28}
          />
          <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal max-w-md mx-auto mt-8">
            Your message is in our inbox and a human (yes, a real one) will
            reply within one working day.
          </p>
          <p className="font-sans text-[13px] tracking-tight text-charcoal mt-3">
            (usually much faster — we like answering things)
          </p>

          <div className="flex justify-center mt-10">
            <PillButton to="/" variant="solid" size="lg">
              Back to home
            </PillButton>
          </div>
        </div>

        {/* ── NEXT STEPS ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t-[1.5px] border-ink/10 pt-14">
          {NEXT_STEPS.map((s, i) => (
            <Link
              key={s.title}
              to={s.to}
              className="group focus-visible:outline-2 focus-visible:outline-dusty rounded-[30px]"
            >
              <SketchCard className="h-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Tag tone="dusty">{s.tag}</Tag>
                  <span className="font-serif font-light text-3xl text-ink/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif font-light text-[22px] leading-tight group-hover:italic transition-all">
                  {s.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {s.blurb}
                </p>
                <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral mt-auto group-hover:translate-x-1 transition-transform">
                  Go on then →
                </span>
              </SketchCard>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
