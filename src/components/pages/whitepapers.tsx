"use client";

// ── Whitepapers — "Deep dives, properly researched." ────────────────────────

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/auth";
import type { Whitepaper } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function WhitepapersPage() {
  const { toast } = useToast();
  const [papers, setPapers] = useState<Whitepaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<Whitepaper[]>("/api/whitepapers");
        if (alive) setPapers(data);
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

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(papers.map((p) => p.category)))],
    [papers]
  );

  const filtered = useMemo(
    () => (category === "All" ? papers : papers.filter((p) => p.category === category)),
    [papers, category]
  );

  const requestPaper = (title: string) => {
    toast({
      title: "Email lfrdcatechnologies@outlook.com",
      description: `Ask for "${title}" — we'll send it over.`,
    });
  };

  return (
    <div className="flex flex-col">
      <PageHero
        index="The research shelf"
        title={
          <>
            Deep dives, <em className="font-normal">properly</em> researched.
          </>
        }
        parenthetical="long reads for people who like footnotes"
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
        {/* ── Category chips ──────────────────────────────────────────────── */}
        {!loading && !failed && papers.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-3 mb-12"
            role="group"
            aria-label="Filter whitepapers by category"
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-[3000px] border-[1.5px] border-ink bg-white px-4 py-1.5 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer hover:-translate-y-[1px]",
                  category === c ? "bg-ink text-paper" : "text-ink"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <LoadingState label="Binding the research…" />
        ) : failed ? (
          <EmptyState
            title="The shelf is temporarily out of reach"
            hint="couldn't load the papers — try refreshing"
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No papers on this shelf yet"
            hint={`nothing filed under ${category} for now`}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map((p, i) => (
              <SketchCard key={p.slug} className="h-full flex flex-col gap-4">
                <div className="relative">
                  <CircularImage src={p.image} alt={p.title} size={120} />
                  <span className="absolute -top-3 -left-1 font-serif font-light text-5xl text-ink/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 && (
                    <DoodleStar
                      className="absolute -top-4 -right-3 animate-wiggle"
                      size={26}
                      color="#ff8562"
                    />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone="dusty">{p.category}</Tag>
                </div>
                <h3 className="font-serif font-light text-[22px] leading-snug">
                  {p.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {p.description}
                </p>
                <span className="font-sans text-[12px] tracking-tight text-charcoal">
                  ({p.pages} pages)
                </span>
                <PillButton
                  size="sm"
                  variant="outline"
                  className="mt-auto w-fit"
                  onClick={() => requestPaper(p.title)}
                >
                  Get the PDF
                </PillButton>
              </SketchCard>
            ))}
          </div>
        )}
      </Section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-14 sm:py-16 px-6">
            <h2 className="font-serif font-light text-[clamp(28px,5vw,48px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Curious what we&apos;re <em className="font-normal">testing</em> this quarter?
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-4 max-w-md mx-auto">
              (the honest version, not the brochure version)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <PillButton to="/insights" variant="dusty" size="lg">
                Research &amp; insights
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
