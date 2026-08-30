"use client";

// ── Portfolio — "Proof, not promises." Featured case studies + full grid ─────

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link } from "@/lib/router";
import type { CaseStudy } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  StatBlock,
  Tag,
  TrophyBadge,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [industry, setIndustry] = useState<string>("All");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<CaseStudy[]>("/api/case-studies");
        if (alive) setCases(data);
      } catch {
        if (alive) setFailed(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(cases.map((c) => c.industry)))],
    [cases]
  );

  const filtered = useMemo(
    () => (industry === "All" ? cases : cases.filter((c) => c.industry === industry)),
    [cases, industry]
  );
  const featured = useMemo(() => filtered.filter((c) => c.featured), [filtered]);
  const rest = useMemo(
    () => filtered.filter((c) => !c.featured),
    [filtered]
  );

  return (
    <div className="flex flex-col">
      <PageHero
        index="The portfolio"
        title={
          <>
            Proof, not <em className="font-normal">promises</em>.
          </>
        }
        parenthetical="six stories we retell at parties"
      >
        <Squiggle
          variant="underline"
          animated
          className="mt-2 opacity-80"
          width={260}
          height={24}
        />
      </PageHero>

      <Section className="pt-0">
        {/* ── Industry filter pills ───────────────────────────────────────── */}
        {!loading && !failed && cases.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-12" role="group" aria-label="Filter case studies by industry">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                aria-pressed={industry === ind}
                className={cn(
                  "rounded-[3000px] border-[1.5px] border-ink bg-white px-4 py-1.5 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer hover:-translate-y-[1px]",
                  industry === ind ? "bg-ink text-paper" : "text-ink"
                )}
              >
                {ind}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <LoadingState label="Polishing the trophies…" />
        ) : failed ? (
          <EmptyState
            title="The portfolio shelf is wobbling"
            hint="couldn't reach the archive — try refreshing"
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No stories here yet"
            hint={`nothing filed under ${industry} for now`}
          />
        ) : (
          <div className="flex flex-col gap-20 sm:gap-24">
            {/* ── Featured — large alternating rows ─────────────────────────── */}
            {featured.map((cs, i) => (
              <article
                key={cs.slug}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <CircularImage
                    src={cs.image}
                    alt={`${cs.client} — ${cs.title}`}
                    size={260}
                    badge={<TrophyBadge />}
                  />
                  <span className="absolute -top-7 -left-2 font-serif font-light text-6xl text-ink/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-4 max-w-xl">
                  <div className="flex flex-wrap gap-2">
                    <Tag tone="dusty">{cs.industry}</Tag>
                    <Tag>{cs.year}</Tag>
                    <span className="font-sans text-[12px] tracking-tight text-charcoal self-center">
                      ({cs.client})
                    </span>
                  </div>
                  <h2 className="font-serif font-light text-[clamp(26px,4vw,38px)] leading-[1.1]">
                    {cs.title}
                  </h2>
                  <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                    {cs.challenge.slice(0, 190)}…
                  </p>
                  <div className="flex flex-wrap gap-8 mt-2">
                    {cs.metrics.slice(0, 3).map((m) => (
                      <StatBlock key={m.label} value={m.value} label={m.label} />
                    ))}
                  </div>
                  <Link
                    to={`/portfolio/${cs.slug}`}
                    className="link-coral font-sans text-sm tracking-tight w-fit"
                  >
                    Read the story →
                  </Link>
                </div>
              </article>
            ))}

            {/* ── The rest — SketchCard grid ───────────────────────────────── */}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <div className="mb-10">
                    <SectionHeader
                      index="More work"
                      title={
                        <>
                          And the <em className="font-normal">rest</em> of the shelf
                        </>
                      }
                      parenthetical="quieter projects, equally dear to us"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {rest.map((cs, i) => (
                    <Link
                      key={cs.slug}
                      to={`/portfolio/${cs.slug}`}
                      className="group block"
                    >
                      <SketchCard className="h-full flex flex-col gap-4">
                        <div className="relative">
                          <CircularImage
                            src={cs.image}
                            alt={`${cs.client} — ${cs.title}`}
                            size={120}
                          />
                          <span className="absolute -top-3 -left-1 font-serif font-light text-5xl text-ink/15">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Tag tone="dusty">{cs.industry}</Tag>
                          <Tag>{cs.year}</Tag>
                        </div>
                        <h3 className="font-serif font-light text-[22px] leading-snug group-hover:italic transition-all">
                          {cs.title}
                        </h3>
                        <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                          {cs.challenge.slice(0, 120)}…
                        </p>
                        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral mt-auto group-hover:translate-x-1 transition-transform">
                          Read the story →
                        </span>
                      </SketchCard>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <DoodleStar
          className="hidden lg:block ml-auto mt-8 animate-wiggle"
          size={30}
        />
      </Section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <Squiggle
              variant="spiral"
              color="#81aed9"
              className="mx-auto mb-6"
              width={80}
              height={60}
            />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Want your story <em className="font-normal">on this page?</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (the next case study could have your name on it)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/quote" variant="dusty" size="lg">
                Request a quote
              </PillButton>
              <PillButton to="/contact" variant="dark" size="lg">
                Say hello
              </PillButton>
            </div>
          </SketchCard>
        </div>
      </section>
    </div>
  );
}
