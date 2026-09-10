"use client";

// ── Insights — research & insights editorial landing ────────────────────────

import { useEffect, useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import type { CompanyStats } from "@/lib/types";
import {
  CircularImage,
  InlineLink,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  SketchInput,
  StatBlock,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { useToast } from "@/hooks/use-toast";

const FALLBACK_STATS: CompanyStats = {
  projects: "13+",
  clients: "80+",
  experts: "45+",
  awards: "12",
  countries: "3",
  satisfaction: "98%",
};

const THEMES = [
  {
    title: "Synthetic data readiness",
    image: "/images/insight-1.png",
    blurb:
      "When can a team safely train on generated data? We're stress-testing pipelines, leakage risks and the honest checkpoints before anyone flips the switch.",
    status: "Ongoing",
  },
  {
    title: "Small models, big outcomes",
    image: "/images/insight-2.png",
    blurb:
      "Distilled and domain-tuned models keep beating their oversized cousins on cost and latency. We're mapping where the small-model ceiling actually sits.",
    status: "Ongoing",
  },
  {
    title: "Data contracts in practice",
    image: "/images/insight-3.png",
    blurb:
      "Schema promises between producers and consumers sound lovely in slides. We're documenting what breaks first when contracts meet reality.",
    status: "Published",
  },
  {
    title: "Evaluating LLMs honestly",
    image: "/images/insight-4.png",
    blurb:
      "Benchmarks lie politely. We're building evaluation harnesses that catch the failures demos never show — and publishing the messy results.",
    status: "Ongoing",
  },
];

export default function InsightsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState<CompanyStats>(FALLBACK_STATS);
  const [statsLoading, setStatsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    let alive = true;
    // hydrate field evidence from the stats endpoint
    apiFetch<CompanyStats>("/api/stats")
      .then((s) => {
        if (alive) setStats(s);
      })
      .catch(() => {
        /* keep fallback numbers */
      })
      .finally(() => {
        if (alive) setStatsLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const subscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || subscribing) return;
    setSubscribing(true);
    try {
      await apiFetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });
      toast({ title: "You're on the list" });
      setEmail("");
    } catch {
      toast({ title: "Hmm — that didn't go through", description: "Please try again in a moment" });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="flex flex-col">
      <PageHero
        index="Research & insights"
        title={
          <>
            Research &amp; <em className="font-normal">insights</em>.
          </>
        }
        parenthetical="what we're reading, testing and arguing about"
      />

      {/* ── Hero statement with inline portrait ──────────────────────────── */}
      <Section className="pt-0">
        <div className="relative max-w-3xl">
          <p className="font-serif font-light text-[clamp(24px,3.6vw,36px)] leading-[1.25] text-balance">
            Our research lives where the whiteboard meets the production
            system — a question sketched in the morning, an experiment
            measured by <em className="font-normal">Friday</em>{" "}
            <CircularImage
              src="/images/insight-1.png"
              alt="Research sketches and charts on a desk"
              size={90}
              className="inline-block align-[-18px] mx-1 sm:mx-2"
            />{" "}
            afternoon.
          </p>
          <Squiggle
            variant="loop"
            animated
            className="absolute -top-10 right-[4%] hidden lg:block opacity-70"
            width={180}
            height={70}
          />
        </div>
      </Section>

      {/* ── What we're studying now — research themes ────────────────────── */}
      <Section className="pt-0">
        <div className="mb-12">
          <SectionHeader
            index="01 — Current threads"
            title={
              <>
                What we&apos;re <em className="font-normal">studying</em> now
              </>
            }
            parenthetical="four threads we keep pulling on"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {THEMES.map((t, i) => (
            <SketchCard key={t.title} className="h-full flex flex-col gap-4">
              <div className="relative">
                <CircularImage src={t.image} alt={t.title} size={110} />
                <span className="absolute -top-3 -left-1 font-serif font-light text-5xl text-ink/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag tone={t.status === "Published" ? "coral" : "dusty"}>
                  {t.status}
                </Tag>
              </div>
              <h3 className="font-serif font-light text-[22px] leading-snug">
                {t.title}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {t.blurb}
              </p>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── Stats band — field evidence ──────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              The <em className="font-normal">field evidence</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (research, but with receipts)
            </span>
          </div>
          {statsLoading ? (
            <LoadingState label="Tallying the evidence…" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
              <StatBlock value={stats.projects} label="Projects delivered" />
              <StatBlock value={stats.clients} label="Clients served" />
              <StatBlock value={stats.experts} label="Researchers & engineers" />
              <StatBlock value={stats.satisfaction} label="Client satisfaction" />
            </div>
          )}
          <Squiggle
            variant="wave"
            color="#81aed9"
            className="mt-12 opacity-70"
            width={520}
            height={44}
          />
        </div>
      </section>

      {/* ── Where to read more — links row ───────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SketchCard className="flex flex-col gap-4 py-10">
            <DoodleStar size={30} color="#ff8562" />
            <h3 className="font-serif font-light text-[clamp(24px,3vw,32px)] leading-[1.1]">
              Whitepapers &amp; <em className="font-normal">deep dives</em>
            </h3>
            <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
              Long-form research, properly footnoted — the kind you print and
              annotate in the margins.
            </p>
            <InlineLink to="/whitepapers" className="text-sm mt-1">
              Deep dives →
            </InlineLink>
          </SketchCard>
          <SketchCard className="flex flex-col gap-4 py-10">
            <DoodleStar size={30} color="#81aed9" />
            <h3 className="font-serif font-light text-[clamp(24px,3vw,32px)] leading-[1.1]">
              The <em className="font-normal">field notes</em>
            </h3>
            <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
              Shorter, messier, more honest — what we learn while shipping
              data platforms and AI systems.
            </p>
            <InlineLink to="/blog" className="text-sm mt-1">
              Field notes →
            </InlineLink>
          </SketchCard>
        </div>
      </Section>

      {/* ── Newsletter band ──────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-14 sm:pb-20 max-w-6xl mx-auto w-full">
        <SketchCard tone="inverted" className="py-12 sm:py-16 px-6 sm:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
            <div className="flex flex-col gap-3 max-w-xl">
              <h2 className="font-serif font-light text-[clamp(26px,4vw,40px)] leading-[1.08]">
                One letter, <em className="font-normal">monthly</em>
              </h2>
              <p className="font-sans text-sm tracking-tight text-paper/70">
                (new research, plain-language findings, zero spam — pinky
                promise)
              </p>
            </div>
            <form
              onSubmit={subscribe}
              className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
            >
              <SketchInput
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address for the research letter"
                className="sm:w-72"
              />
              <PillButton
                type="submit"
                variant="dusty"
                disabled={subscribing}
                className="shrink-0"
              >
                {subscribing ? "Sending…" : "Subscribe"}
              </PillButton>
            </form>
          </div>
        </SketchCard>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="text-center flex flex-col items-center gap-6">
          <h2 className="font-serif font-light text-[clamp(28px,5vw,48px)] leading-[1.05] max-w-2xl text-balance">
            Rather <em className="font-normal">talk</em> than read?
          </h2>
          <PillButton to="/contact" variant="solid" size="lg">
            Start a conversation
          </PillButton>
        </div>
      </section>
    </div>
  );
}
