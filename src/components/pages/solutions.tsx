"use client";

// ── Solutions index — productised builds (#/solutions) ──────────────────────
// NOTE: there is no /api/solutions endpoint on purpose — these three packaged
// solutions are curated marketing constructs, so they live here in code.

import { KeyRound, Plug, Sprout } from "lucide-react";
import { Link } from "@/lib/router";
import {
  CircularImage,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  StatBlock,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

interface SolutionCardData {
  slug: string;
  brand: string;
  product: string;
  tagline: string;
  image: string;
  capabilities: string[];
  outcomes: { label: string; value: string }[];
}

const SOLUTIONS: SolutionCardData[] = [
  {
    slug: "data-platform",
    brand: "LFRDCA",
    product: "DataPlatform",
    tagline: "Lakehouse foundations that grow with you",
    image: "/images/blog-2.png",
    capabilities: [
      "Ingestion pipelines",
      "Lakehouse storage",
      "Data contracts",
      "Lineage & governance",
      "Streaming & batch",
      "Cost guardrails",
    ],
    outcomes: [
      { label: "Time to first insight", value: "3 weeks" },
      { label: "Pipeline reliability", value: "99.9%" },
      { label: "Storage cost cut", value: "−40%" },
    ],
  },
  {
    slug: "ai-assistants",
    brand: "LFRDCA",
    product: "Assist",
    tagline: "Enterprise AI copilots that actually know your business",
    image: "/images/ai-lab.png",
    capabilities: [
      "RAG over your docs",
      "Multi-channel deployment",
      "Human-in-the-loop review",
      "Evaluation harness",
      "Private model hosting",
      "Analytics on every answer",
    ],
    outcomes: [
      { label: "Support deflect.", value: "62%" },
      { label: "Answer accuracy", value: "94%" },
      { label: "Rollout time", value: "6 weeks" },
    ],
  },
  {
    slug: "analytics-cloud",
    brand: "LFRDCA",
    product: "Insight Cloud",
    tagline: "Self-serve analytics your whole team will open daily",
    image: "/images/data-viz.png",
    capabilities: [
      "Metric layer",
      "Self-serve dashboards",
      "Alerting & digests",
      "Embedded analytics",
      "Natural-language queries",
      "Version-controlled BI",
    ],
    outcomes: [
      { label: "Weekly active users", value: "81%" },
      { label: "Report build time", value: "−70%" },
      { label: "Decisions shipped", value: "2.4×" },
    ],
  },
];

const COMPOSABLE = [
  {
    icon: Plug,
    title: "Plug into your stack",
    text: "We connect to the systems you already run — warehouses, ERPs, SaaS tools — rather than asking you to migrate anything. If it has an API or an export button, we can probably drink from it.",
  },
  {
    icon: Sprout,
    title: "Start small, scale fast",
    text: "Every solution ships as a thin slice first — one pipeline, one dashboard, one assistant — proving value in weeks. Then we widen the slice along the paths that pay.",
  },
  {
    icon: KeyRound,
    title: "Own your data",
    text: "Everything runs in your cloud account, on your data, with your keys. We build it, we document it, and it stays yours — no locks, no hostages.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function SolutionsPage() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        index="Solutions — the packages"
        title={
          <>
            Solutions, not <em className="font-normal">science projects</em>.
          </>
        }
        parenthetical="productised builds — the proven 80%, tailored to your last 20%"
      >
        <Squiggle
          variant="loop"
          animated
          className="mt-6 opacity-70"
          width={220}
          height={88}
        />
      </PageHero>

      {/* ── SOLUTIONS — alternating large cards ──────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — The three builds"
          title={
            <>
              Products with the <em className="font-normal">sketches</em> still
              showing
            </>
          }
          parenthetical="opinionated starting points, tailored to your data"
          className="mb-14"
        />

        <div className="flex flex-col gap-20 sm:gap-24">
          {SOLUTIONS.map((solution, i) => (
            <div
              key={solution.slug}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative shrink-0">
                <CircularImage
                  src={solution.image}
                  alt={`${solution.brand} ${solution.product}`}
                  size={220}
                />
                <span className="absolute -top-7 -left-2 font-serif font-light text-6xl text-ink/20">
                  {pad(i + 1)}
                </span>
                {i === 1 && (
                  <DoodleStar
                    className="absolute -bottom-2 -right-4 animate-wiggle"
                    size={28}
                  />
                )}
              </div>
              <div className="flex flex-col gap-5 max-w-xl flex-1">
                <h3 className="font-serif font-light text-[clamp(28px,4vw,42px)] leading-[1.08]">
                  {solution.brand}{" "}
                  <em className="font-normal">{solution.product}</em>
                </h3>
                <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
                  {solution.tagline}.
                </p>
                <div className="flex flex-wrap gap-2">
                  {solution.capabilities.map((c) => (
                    <Tag key={c} tone="dusty">
                      {c}
                    </Tag>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-10 gap-y-6 mt-1">
                  {solution.outcomes.map((o) => (
                    <StatBlock key={o.label} value={o.value} label={o.label} />
                  ))}
                </div>
                <div className="mt-2">
                  <PillButton
                    to={`/solutions/${solution.slug}`}
                    variant="outline"
                  >
                    Explore {solution.product} →
                  </PillButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── COMPOSABLE BY DESIGN ─────────────────────────────────────────── */}
      <Section className="pt-0">
        <SectionHeader
          index="02 — Why they click together"
          title={
            <>
              Composable by <em className="font-normal">design</em>
            </>
          }
          parenthetical="three of one, or one of three — the math works either way"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMPOSABLE.map((item, i) => (
            <SketchCard key={item.title} className={i === 1 ? "md:translate-y-6" : ""}>
              <span className="w-11 h-11 rounded-full border-[1.5px] border-dusty bg-white inline-flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <h3 className="font-serif font-light text-2xl leading-tight mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {item.text}
              </p>
            </SketchCard>
          ))}
        </div>
        <Squiggle
          variant="swirl"
          className="hidden lg:block ml-auto mt-8 opacity-50"
          width={180}
          height={70}
        />
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Let&apos;s compose your <em className="font-normal">stack</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (mix one solution, two, or all three — they&apos;re built to
              click together)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/quote" variant="dusty" size="lg">
                Request a quote
              </PillButton>
              <Link
                to="/services"
                className="link-coral font-sans text-sm tracking-tight self-center"
              >
                or browse the eight crafts →
              </Link>
            </div>
          </SketchCard>
          <Squiggle
            variant="underline"
            color="#81aed9"
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-90"
            width={280}
            height={26}
          />
        </div>
      </section>
    </div>
  );
}
