"use client";

// ── Mission — why LFRDCA exists, the vision, and six working principles ──────

import {
  GraduationCap,
  HeartHandshake,
  Scale,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PageHero, PillButton, Section, SectionHeader, SketchCard } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const PRINCIPLES = [
  {
    icon: HeartHandshake,
    title: "Human first",
    copy: "Every dashboard, model and pipeline is used by a person trying to do their job well. We optimise for that person's Tuesday morning, not for a conference talk slide.",
  },
  {
    icon: Scale,
    title: "Measure honestly",
    copy: "We report the numbers we find, not the numbers we hoped for. Confidence intervals over vibes; caveats written in plain language, not footnotes.",
  },
  {
    icon: GraduationCap,
    title: "Teach what we learn",
    copy: "Knowledge that stays in one head is a liability. We document generously, run enablement sessions, and leave teams stronger than we found them.",
  },
  {
    icon: Target,
    title: "Own the outcome",
    copy: "We don't bill hours and shrug at results. If the pipeline we built doesn't move your metric, that's our problem too — and we act like it.",
  },
  {
    icon: Users,
    title: "Small teams, big leverage",
    copy: "Four focused people outperform fourteen coordinators. We staff engagements lean, senior and accountable, with no telephone-game middle layers.",
  },
  {
    icon: Sparkles,
    title: "Leave it tidy",
    copy: "The end of an engagement is a handover, not an escape. Documented, tested, observable — the next engineer should say thank you, not curse our names.",
  },
];

const COMMITMENTS = [
  "Every client gets the founder's phone number",
  "Every project ships with documentation a human wrote",
  "Every model ships with an evaluation report",
  "Every invoice matches the estimate, or we explain why first",
];

export default function MissionPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 02 · The mission"
        title={
          <>
            Why we get up <em className="font-normal">(besides the coffee).</em>
          </>
        }
        parenthetical="A mission statement we actually use for decisions"
      >
        <DoodleStar className="mt-4 animate-wiggle" size={30} />
      </PageHero>

      {/* ── MISSION STATEMENT — huge serif ───────────────────────────────── */}
      <Section className="pt-4 sm:pt-8">
        <div className="relative max-w-4xl">
          <span className="font-serif text-sm font-light tracking-widest text-ink/60 block mb-6">
            01 — The mission
          </span>
          <p className="font-serif font-light text-[clamp(40px,6.5vw,80px)] leading-[1.05] text-balance">
            We exist to turn messy, overlooked data into{" "}
            <em className="font-normal">decisions people trust</em> — and to
            leave every team we touch{" "}
            <em className="font-normal">a little braver</em> with their
            numbers.
          </p>
          <Squiggle
            variant="underline"
            animated
            className="mt-8 opacity-80"
            width={340}
            height={30}
          />
        </div>
      </Section>

      {/* ── VISION — inverted charcoal ───────────────────────────────────── */}
      <Section className="pt-0">
        <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
          <span className="font-serif text-sm font-light tracking-widest text-paper/60 block mb-6">
            02 — The vision
          </span>
          <p className="font-serif font-light text-[clamp(28px,4.8vw,52px)] leading-[1.08] max-w-3xl mx-auto text-balance">
            “A world where every decision is{" "}
            <em className="font-normal">data-informed</em>, and no dataset
            goes <em className="font-normal">unloved.</em>”
          </p>
          <p className="font-sans text-sm tracking-tight text-paper/70 mt-6 max-w-md mx-auto">
            (Yes, we chose “unloved”. No, we won&apos;t be apologising for it.)
          </p>
          <Squiggle
            variant="wave"
            color="#81aed9"
            className="mx-auto mt-10 opacity-70"
            width={420}
            height={40}
          />
        </SketchCard>
      </Section>

      {/* ── PRINCIPLES ───────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="03 — The principles"
          title={
            <>
              Six rules we run{" "}
              <em className="font-normal">every decision</em> through
            </>
          }
          parenthetical="Printed, laminated, occasionally argued about at lunch"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <SketchCard
                key={p.title}
                className={`flex flex-col gap-5 h-full ${
                  i % 2 === 1 ? "lg:translate-y-6" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-serif font-light text-4xl text-ink/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif font-light text-[26px] leading-tight">
                  {p.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {p.copy}
                </p>
              </SketchCard>
            );
          })}
        </div>
        <Squiggle
          variant="swirl"
          className="hidden lg:block ml-auto mt-6 opacity-50"
          width={170}
          height={66}
        />
      </Section>

      {/* ── COMMITMENTS BAND ─────────────────────────────────────────────── */}
      <Section className="pt-0">
        <div className="border-y-[1.5px] border-ink py-14 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              Four commitments,{" "}
              <em className="font-normal">no asterisks</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal">
              (the whole list — nothing in the fine print)
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            {COMMITMENTS.map((c) => (
              <li key={c} className="flex items-start gap-4">
                <DoodleStar size={20} className="mt-0.5 shrink-0" />
                <span className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
                  {c}
                </span>
              </li>
            ))}
          </ul>
          <div className="relative mt-12 max-w-xs">
            <span className="font-serif font-light italic text-2xl">
              sound fair?
            </span>
            <Squiggle
              variant="underline"
              color="#ff8562"
              className="absolute -bottom-3 left-0"
              width={150}
              height={20}
            />
          </div>
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section className="pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-lg">
            <h3 className="font-serif font-light text-[clamp(26px,4vw,40px)] leading-[1.08]">
              Hold us to <em className="font-normal">all of it</em>
            </h3>
            <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
              The best test of a mission statement is a real project. Bring us
              a messy dataset and a stubborn question — we&apos;ll bring the
              principles.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <PillButton to="/story" variant="outline">
              Read our story
            </PillButton>
            <PillButton to="/contact" variant="solid">
              Start a conversation
            </PillButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
