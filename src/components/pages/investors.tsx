"use client";

// ── Investors — bootstrapped, profitable, and picky about capital ─────────────

import { Repeat, TrendingUp, Wind } from "lucide-react";
import {
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  StatBlock,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const WHY_CARDS = [
  {
    icon: Wind,
    title: "Category tailwind",
    copy: "Every enterprise budget line is migrating toward data platforms and applied AI. We sit exactly where the spend is heading — with delivery proof, not just a thesis deck.",
  },
  {
    icon: Repeat,
    title: "Recurring IP revenue",
    copy: "Beyond projects, our accelerators and the LFRDCA Intelligence platform convert one-off engagements into multi-year annuity contracts. Services fund the product; the product compounds it.",
  },
  {
    icon: TrendingUp,
    title: "Capital-efficient growth",
    copy: "Bootstrapped since 2019 — the practice was profitable throughout, and the company it became still is. 3.2× revenue growth without a rupee of outside capital. Money we raise buys acceleration, not survival.",
  },
];

const FUNDING_HISTORY: {
  year: string;
  month?: string;
  title: string;
  copy: string;
  tag: string;
}[] = [
  {
    year: "2019",
    title: "Bootstrap",
    copy: "The practice begins — Satyam RojhaX, a laptop, a sketchbook and stubborn margins. No angel cheque, no runway anxiety — just clients who paid on time.",
    tag: "₹0 raised",
  },
  {
    year: "2022",
    title: "Angel round",
    copy: "A small, deliberate round from operators who'd worked with the practice — enough to open the AI lab without touching the culture. Dilution kept politely minimal.",
    tag: "Friends & operators",
  },
  {
    year: "2026",
    month: "July",
    title: "The founding",
    copy: "The practice formally incorporates as LFRDCA Technologies in Noida — every relationship and every rupee of margin carried across. No new capital needed; the name was the round.",
    tag: "LFRDCA is born",
  },
  {
    year: "2026",
    month: "September",
    title: "Series A conversations",
    copy: "With the Intelligence platform in internal beta and 80+ client relationships behind us, we're selectively talking to partners who bring distribution, not just capital.",
    tag: "In progress",
  },
];

const REPORTING = [
  "Quarterly investor letter — numbers first, spin last",
  "Audited annual accounts (FY ending March)",
  "Monthly management dashboard: revenue, pipeline, retention",
  "Annual strategy session with all shareholders",
  "Ad-hoc disclosure on anything material, within 30 days",
];

export default function InvestorsPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 06 · Investor relations"
        title={
          <>
            Investor <em className="font-normal">relations.</em>
          </>
        }
        parenthetical="Founded July 2026 · Bootstrapped & profitable · Noida, India"
      >
        <DoodleStar className="mt-4 animate-wiggle" size={30} />
      </PageHero>

      {/* ── NARRATIVE ────────────────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <SectionHeader
              index="01 — The short version"
              title={
                <>
                  Built slowly, on purpose, with{" "}
                  <em className="font-normal">our own</em> money
                </>
              }
            />
            <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
              LFRDCA was never meant to be a blitzscale story. The practice
              behind it grew one retainer at a time, one referral at a time,
              hiring only when the work demanded it — then, in July 2026, gave
              seven years of momentum a proper name. Two months in as a
              company: profitable, 45+ experts strong, serving clients across
              nine countries.
            </p>
            <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
              Now the data-and-AI category is compounding faster than our
              balance sheet can comfortably fund — which is the honest reason
              this page exists. We&apos;re selective, transparent, and mildly
              allergic to hype. If that&apos;s your kind of portfolio company,
              read on.
            </p>
          </div>
          <SketchCard className="flex flex-col gap-8">
            <span className="font-serif text-sm font-light tracking-widest text-ink/60">
              Company snapshot
            </span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              <StatBlock value="3.2×" label="Revenue growth" />
              <StatBlock value="18%" label="EBITDA margin" />
              <StatBlock value="80+" label="Active clients" />
              <StatBlock value="45+" label="Team size" />
            </div>
            <p className="font-sans text-[12px] tracking-tight text-charcoal">
              (Trailing twelve months to Aug 2026 — the practice&apos;s
              record, carried into the company. Unaudited management figures;
              audited accounts available under NDA)
            </p>
          </SketchCard>
        </div>
      </Section>

      {/* ── WHY LFRDCA ───────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="02 — Why LFRDCA"
          title={
            <>
              Three reasons the maths{" "}
              <em className="font-normal">works</em>
            </>
          }
          parenthetical="The version we'd tell you over coffee, slides optional"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className={i === 1 ? "md:translate-y-6" : ""}>
                <SketchCard className="flex flex-col gap-5 h-full">
                  <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="font-serif font-light text-[28px] leading-tight">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    {c.copy}
                  </p>
                </SketchCard>
              </div>
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

      {/* ── FUNDING HISTORY ──────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SectionHeader
          index="03 — Funding history"
          title={
            <>
              A short cap table, <em className="font-normal">kept</em> that
              way
            </>
          }
          parenthetical="Four chapters, no cliffhangers"
          className="mb-12"
        />
        <div className="relative flex flex-col gap-10">
          {/* hand-drawn vertical connector */}
          <svg
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-[13px] top-8 bottom-8 hidden sm:block"
            width="20"
            height="100%"
          >
            <path
              d="M10 0 C 14 15, 6 30, 10 45 C 14 60, 6 75, 10 88 C 12 94, 10 97, 10 100"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {FUNDING_HISTORY.map((f) => (
            <article
              key={f.title}
              className="grid grid-cols-1 sm:grid-cols-[44px_120px_1fr] gap-4 sm:gap-8 items-start"
            >
              <div className="hidden sm:flex items-center justify-center w-[28px] h-[28px] rounded-full bg-white border-[1.5px] border-ink shadow-sketch-sm">
                <span className="w-[8px] h-[8px] rounded-full bg-coral" />
              </div>
              <div className="flex flex-col gap-1 sm:justify-end sm:text-right">
                <span className="font-serif font-light text-[clamp(36px,5vw,52px)] leading-none">
                  {f.year}
                </span>
                {f.month && (
                  <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-charcoal">
                    {f.month}
                  </span>
                )}
              </div>
              <SketchCard className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif font-light text-[26px] leading-tight">
                    {f.title}
                  </h3>
                  <Tag tone="dusty">{f.tag}</Tag>
                </div>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {f.copy}
                </p>
              </SketchCard>
            </article>
          ))}
        </div>
      </Section>

      {/* ── GOVERNANCE & REPORTING ───────────────────────────────────────── */}
      <Section className="pt-0">
        <div className="border-y-[1.5px] border-ink py-14 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              Governance &amp; reporting,{" "}
              <em className="font-normal">on a calendar</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal">
              (the cadence we hold ourselves to)
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            {REPORTING.map((r) => (
              <li key={r} className="flex items-start gap-4">
                <DoodleStar size={20} className="mt-0.5 shrink-0" />
                <span className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
                  {r}
                </span>
              </li>
            ))}
          </ul>
          <Squiggle
            variant="underline"
            color="#81aed9"
            className="mt-10 opacity-80"
            width={260}
            height={24}
          />
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section className="pt-8">
        <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
          <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
          <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
            Serious about the{" "}
            <em className="font-normal">boring parts</em> of growth?
          </h2>
          <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
            (Data room, product roadmap and founder references available on
            request)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <a
              href="mailto:lfrdcatechnologies@outlook.com?subject=Investor%20Relations"
              className="inline-flex items-center justify-center gap-2 rounded-[3000px] border-[1.5px] border-ink bg-dusty text-ink font-sans uppercase tracking-[0.14em] text-[14px] px-9 py-[18px] shadow-sketch-btn transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333] cursor-pointer"
            >
              Write to us
            </a>
            <PillButton to="/story" variant="dark" size="lg">
              Read the story first
            </PillButton>
          </div>
        </SketchCard>
      </Section>
    </div>
  );
}
