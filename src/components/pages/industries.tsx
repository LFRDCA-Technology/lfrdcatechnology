"use client";

// ── Industries index — where our data lives (#/industries) ──────────────────

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link } from "@/lib/router";
import type { Industry } from "@/lib/types";
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
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const pad = (n: number) => String(n).padStart(2, "0");

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<Industry[]>("/api/industries");
        if (alive) setIndustries(data);
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

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        index="Industries — the fields"
        title={
          <>
            Where our data <em className="font-normal">lives</em>.
          </>
        }
        parenthetical="four fields we know deeply — and the lessons that travel between them"
      >
        <Squiggle
          variant="loop"
          animated
          className="mt-6 opacity-70"
          width={220}
          height={88}
        />
      </PageHero>

      {/* ── INDUSTRY ROWS — alternating ──────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — The fields"
          title={
            <>
              The <em className="font-normal">fields</em> we work in
            </>
          }
          parenthetical="and what we've learned shipping in each"
          className="mb-14"
        />

        {loading ? (
          <LoadingState label="Unfolding the industry notes…" />
        ) : failed || industries.length === 0 ? (
          <EmptyState
            title="The industry map is still being sketched"
            hint="the API wandered off — but we answer email fast"
          />
        ) : (
          <div className="flex flex-col gap-20 sm:gap-24">
            {industries.map((industry, i) => (
              <div
                key={industry.slug}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <CircularImage
                    src={industry.image}
                    alt={industry.title}
                    size={240}
                  />
                  <span className="absolute -top-7 -left-2 font-serif font-light text-6xl text-ink/20">
                    {pad(i + 1)}
                  </span>
                  {i === 0 && (
                    <DoodleStar
                      className="absolute -bottom-2 -right-4 animate-wiggle"
                      size={28}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-5 max-w-xl">
                  <h3 className="font-serif font-light text-[clamp(28px,4vw,42px)] leading-[1.08]">
                    {industry.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.75] tracking-tight text-charcoal">
                    {industry.description.split("\n\n")[0]}
                  </p>
                  <div className="flex flex-wrap gap-x-10 gap-y-6 mt-1">
                    {industry.stats.map((s) => (
                      <StatBlock key={s.label} value={s.value} label={s.label} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industry.useCases.slice(0, 4).map((u) => (
                      <Tag key={u} tone="dusty">
                        {u}
                      </Tag>
                    ))}
                  </div>
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="link-coral font-sans text-sm tracking-tight w-fit mt-1"
                  >
                    Explore {industry.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <Squiggle
          variant="swirl"
          className="hidden lg:block ml-auto mt-10 opacity-50"
          width={180}
          height={70}
        />
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <SketchCard tone="paper" className="text-center py-14 sm:py-16 px-6">
          <DoodleStar className="mx-auto mb-5 animate-wiggle" size={32} />
          <h2 className="font-serif font-light text-[clamp(26px,4.5vw,44px)] leading-[1.05] max-w-xl mx-auto text-balance">
            Don&apos;t see your <em className="font-normal">industry</em>?
          </h2>
          <p className="font-sans text-sm tracking-tight text-charcoal mt-4 max-w-md mx-auto">
            (that&apos;s fine — data is data)
          </p>
          <div className="flex justify-center mt-8">
            <PillButton to="/contact" variant="solid" size="lg">
              Talk to us anyway
            </PillButton>
          </div>
        </SketchCard>
      </section>
    </div>
  );
}
