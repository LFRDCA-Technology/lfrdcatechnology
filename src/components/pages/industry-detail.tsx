"use client";

// ── Industry detail — one field, in depth (#/industries/:slug) ──────────────
// Serves: healthcare, finance, retail, manufacturing.

import { useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "@/lib/auth";
import { Link, useSegments } from "@/lib/router";
import type { CaseStudy, Industry } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  StatBlock,
  Tag,
  TrophyBadge,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

/** Loose case-insensitive matchers from industry slug → case-study industry. */
const CASE_MATCHERS: Record<string, RegExp> = {
  healthcare: /healthcare/i,
  finance: /fintech|finance|banking/i,
  retail: /retail|e-commerce/i,
  manufacturing: /manufacturing/i,
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Section title with a hand-drawn squiggle underline. */
function SketchTitle({
  index,
  title,
  parenthetical,
}: {
  index: string;
  title: ReactNode;
  parenthetical?: string;
}) {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <span className="font-serif text-sm font-light tracking-widest text-ink/60">
        {index}
      </span>
      <h2 className="font-serif font-light text-[clamp(30px,4.5vw,44px)] leading-[1.05] max-w-2xl">
        {title}
      </h2>
      {parenthetical && (
        <p className="font-sans text-sm tracking-tight text-charcoal">
          ({parenthetical})
        </p>
      )}
      <Squiggle
        variant="underline"
        animated
        className="opacity-80 -ml-1"
        width={200}
        height={20}
      />
    </div>
  );
}

export default function IndustryDetailPage() {
  const segments = useSegments();
  const slug = segments[1] ?? "";

  const [industry, setIndustry] = useState<Industry | null>(null);
  const [proof, setProof] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setLoading(true);
    setFailed(false);
    setIndustry(null);
    setProof(null);
    (async () => {
      try {
        const list = await apiFetch<Industry[]>("/api/industries");
        if (!alive) return;
        setIndustry(list.find((ind) => ind.slug === slug) ?? null);
      } catch {
        if (alive) setFailed(true);
      } finally {
        if (alive) setLoading(false);
      }
      // Case-study proof — loose match, first case study as fallback.
      try {
        const cases = await apiFetch<CaseStudy[]>("/api/case-studies");
        if (!alive) return;
        const matcher = CASE_MATCHERS[slug];
        const match =
          (matcher ? cases.find((c) => matcher.test(c.industry)) : undefined) ??
          cases[0] ??
          null;
        setProof(match);
      } catch {
        /* proof is optional decoration */
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return <LoadingState label="Walking the field…" />;
  }

  if (failed || !industry) {
    return (
      <Section className="pt-32">
        <DoodleStar className="mx-auto mb-4" size={30} />
        <EmptyState
          title="This field is still being sketched"
          hint="the industry you're after wandered off"
        />
        <div className="flex justify-center mt-8">
          <PillButton to="/industries" variant="outline">
            ← All industries
          </PillButton>
        </div>
      </Section>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        index={`Industries — ${pad(industry.order)}`}
        title={
          <>
            The <em className="font-normal">{industry.title}</em> field guide.
          </>
        }
        parenthetical="what we've learned shipping data & AI here"
      />

      {/* ── HERO SPLIT — portrait + stats ────────────────────────────────── */}
      <Section className="pt-0">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="relative shrink-0">
            <CircularImage
              src={industry.image}
              alt={industry.title}
              size={230}
            />
            <DoodleStar
              className="absolute -top-3 -right-4 animate-wiggle"
              size={28}
            />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {industry.stats.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── THE LANDSCAPE — long description ─────────────────────────────── */}
      <Section>
        <SketchTitle
          index="01 — The landscape"
          title={
            <>
              What {industry.title} data{" "}
              <em className="font-normal">feels</em> like
            </>
          }
          parenthetical="the honest version, from the trenches"
        />
        <div className="flex flex-col gap-5 max-w-2xl">
          {industry.description.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal"
            >
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* ── USE CASES — numbered ledger ──────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="02 — Use cases"
          title={
            <>
              What we <em className="font-normal">build</em> here
            </>
          }
          parenthetical="the requests that keep coming back"
        />
        <ol className="max-w-2xl">
          {industry.useCases.map((useCase, i) => (
            <li
              key={useCase}
              className="flex items-baseline gap-6 py-5 border-b-[1.5px] border-ink/10 last:border-b-0"
            >
              <span className="font-serif font-light text-xl text-ink/40 w-9 shrink-0">
                {pad(i + 1)}
              </span>
              <span className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
                {useCase}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── PROOF — matching case study ──────────────────────────────────── */}
      {proof && (
        <Section className="pt-0">
          <SketchTitle
            index="03 — Proof"
            title={
              <>
                A story from the <em className="font-normal">field</em>
              </>
            }
            parenthetical="because claims are cheap"
          />
          <Link
            to={`/portfolio/${proof.slug}`}
            className="group block max-w-2xl"
          >
            <SketchCard className="flex items-center gap-6">
              <CircularImage
                src={proof.image}
                alt={`${proof.client} — ${proof.title}`}
                size={96}
                badge={<TrophyBadge />}
              />
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Tag tone="dusty">{proof.industry}</Tag>
                  <Tag>{proof.year}</Tag>
                </div>
                <h3 className="font-serif font-light text-2xl leading-tight group-hover:italic transition-all">
                  {proof.title}
                </h3>
                <p className="font-sans text-[13px] tracking-tight text-charcoal">
                  {proof.client}
                </p>
                <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral group-hover:translate-x-1 transition-transform">
                  Read the story →
                </span>
              </div>
            </SketchCard>
          </Link>
        </Section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Let&apos;s talk about your{" "}
              <em className="font-normal">{industry.title}</em> data.
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (we speak clinician, banker, merchandiser and plant manager —
              pick your dialect)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/quote" variant="dusty" size="lg">
                Request a quote
              </PillButton>
              <PillButton to="/services" variant="dark" size="lg">
                See the crafts
              </PillButton>
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
