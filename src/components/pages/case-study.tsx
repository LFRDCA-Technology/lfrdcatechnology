"use client";

// ── Case study detail — the full client story (#/portfolio/:slug) ───────────

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link, useSegments } from "@/lib/router";
import type { CaseStudy } from "@/lib/types";
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

/** Section title with a hand-drawn squiggle underline. */
function SketchTitle({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <span className="font-serif text-sm font-light tracking-widest text-ink/60">
        {index}
      </span>
      <h2 className="font-serif font-light text-[clamp(30px,4.5vw,44px)] leading-[1.05]">
        {title}
      </h2>
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

export default function CaseStudyPage() {
  const segments = useSegments();
  const slug = segments[1] ?? "";

  const [cs, setCs] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [next, setNext] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setLoading(true);
    setNotFound(false);
    setCs(null);
    (async () => {
      try {
        const data = await apiFetch<CaseStudy>(`/api/case-studies/${slug}`);
        if (alive) setCs(data);
      } catch {
        if (alive) setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
      // "Next story" — pick the following case study in the list
      try {
        const list = await apiFetch<CaseStudy[]>("/api/case-studies");
        if (!alive) return;
        const idx = list.findIndex((c) => c.slug === slug);
        if (idx !== -1 && list.length > 1) {
          setNext(list[(idx + 1) % list.length]);
        }
      } catch {
        /* next-story is optional decoration */
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return <LoadingState label="Opening the case file…" />;
  }

  if (notFound || !cs) {
    return (
      <Section className="pt-32">
        <EmptyState
          title="This story is still being sketched"
          hint="the page you're after wandered off"
        />
        <div className="flex justify-center mt-8">
          <PillButton to="/portfolio" variant="outline">
            ← Back to the portfolio
          </PillButton>
        </div>
      </Section>
    );
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index={`Case study — ${cs.client}`}
        title={cs.title}
        parenthetical={`${cs.industry} · ${cs.year}`}
      />

      {/* ── Hero row: image + metrics + services ─────────────────────────── */}
      <Section className="pt-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="relative shrink-0">
            <CircularImage
              src={cs.image}
              alt={`${cs.client} — ${cs.title}`}
              size={240}
              badge={<TrophyBadge />}
            />
            <DoodleStar
              className="absolute -top-4 -right-2 animate-wiggle"
              size={30}
            />
          </div>
          <div className="flex flex-col gap-8 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {cs.metrics.slice(0, 3).map((m) => (
                <StatBlock key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {cs.services.map((s) => (
                <Tag key={s} tone="dusty">
                  {s}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── The challenge ────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle index="01 — The challenge" title="The challenge" />
        <div className="flex flex-col gap-5 max-w-2xl">
          {cs.challenge
            .split(/\n\n+/)
            .filter(Boolean)
            .map((para, i) => (
              <p
                key={i}
                className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal"
              >
                {para}
              </p>
            ))}
        </div>
      </Section>

      {/* ── What we built ────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle index="02 — What we built" title="What we built" />
        <div className="flex flex-col gap-5 max-w-2xl">
          {cs.solution
            .split(/\n\n+/)
            .filter(Boolean)
            .map((para, i) => (
              <p
                key={i}
                className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal"
              >
                {para}
              </p>
            ))}
        </div>
        <Squiggle
          variant="dash"
          className="mt-10 opacity-60"
          width={220}
          height={60}
        />
      </Section>

      {/* ── The results — numbered ledger ────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle index="03 — The results" title="The results" />
        <ol className="flex flex-col max-w-2xl">
          {cs.results.map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-6 py-5 border-b-[1.5px] border-dusty last:border-b-0"
            >
              <span className="font-serif font-light text-3xl text-ink/30 leading-none pt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans text-[15px] leading-[1.7] tracking-tight text-charcoal">
                {r}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Next story ───────────────────────────────────────────────────── */}
      {next && (
        <Section className="pt-0">
          <Link to={`/portfolio/${next.slug}`} className="group block max-w-xl">
            <SketchCard className="flex items-center gap-6 py-6">
              <CircularImage
                src={next.image}
                alt={`${next.client} — ${next.title}`}
                size={90}
              />
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal">
                  Next story
                </span>
                <h3 className="font-serif font-light text-xl leading-snug group-hover:italic transition-all">
                  {next.title}
                </h3>
                <span className="link-coral font-sans text-sm tracking-tight">
                  {next.client} →
                </span>
              </div>
            </SketchCard>
          </Link>
        </Section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-14 sm:py-16 px-6">
            <h2 className="font-serif font-light text-[clamp(28px,5vw,48px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              A challenge like <em className="font-normal">yours?</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-4 max-w-md mx-auto">
              (we've sketched harder ones, honestly)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <PillButton to="/quote" variant="dusty" size="lg">
                Request a quote
              </PillButton>
              <PillButton to="/portfolio" variant="dark" size="lg">
                More stories
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
