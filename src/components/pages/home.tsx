"use client";

// ── Home — the editorial sketchbook hero page of LFRDCA Technologies ────────
// Reference implementation of the Dyotanya style for all other pages.

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link } from "@/lib/router";
import type { CaseStudy, CompanyStats, Post, Service, Testimonial } from "@/lib/types";
import {
  CircularImage,
  LoadingState,
  Marquee,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  StatBlock,
  Tag,
  TrophyBadge,
} from "@/components/site/ui";
import {
  DoodleStar,
  HandArrow,
  Squiggle,
} from "@/components/site/squiggle";

const FALLBACK_STATS: CompanyStats = {
  projects: "120+",
  clients: "80+",
  experts: "45+",
  awards: "12",
  countries: "9",
  satisfaction: "98%",
};

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<CompanyStats>(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const results = await Promise.allSettled([
        apiFetch<Service[]>("/api/services"),
        apiFetch<CaseStudy[]>("/api/case-studies"),
        apiFetch<Testimonial[]>("/api/testimonials"),
        apiFetch<{ posts: Post[] }>("/api/posts?limit=3"),
        apiFetch<CompanyStats>("/api/stats"),
      ]);
      if (!alive) return;
      const [s, c, t, p, st] = results;
      if (s.status === "fulfilled") setServices(s.value.slice(0, 6));
      if (c.status === "fulfilled") setCases(c.value.filter((x) => x.featured).slice(0, 3));
      if (t.status === "fulfilled") setTestimonials(t.value.slice(0, 3));
      if (p.status === "fulfilled") setPosts(p.value.posts.slice(0, 3));
      if (st.status === "fulfilled") setStats(st.value);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── HERO — oversized serif confession with inline portrait ────────── */}
      <section className="relative px-5 sm:px-8 pt-28 sm:pt-40 pb-16 sm:pb-24 max-w-6xl mx-auto">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal mb-6">
          (An AI-powered IT company — Noida, India)
        </p>
        <h1 className="relative font-serif font-light text-[clamp(42px,8.2vw,84px)] leading-[1.04] text-balance">
          Hey there! We&apos;re <span className="whitespace-nowrap">LFRDCA.</span>{" "}
          And we help brands win with data{" "}
          <CircularImage
            src="/images/founder.png"
            alt="Portrait of the founder of LFRDCA Technologies"
            size={92}
            className="inline-block align-[-14px] mx-1 sm:mx-2 animate-float"
          />{" "}
          <em className="font-normal">as unique</em> as{" "}
          <em className="font-normal">they are.</em>
        </h1>

        <Squiggle
          variant="loop"
          animated
          className="absolute top-[16%] right-[2%] hidden lg:block opacity-70"
          width={220}
          height={90}
        />
        <DoodleStar className="absolute top-[46%] left-[1%] hidden md:block animate-wiggle" size={34} />

        <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-8 justify-between">
          <p className="font-sans text-[15px] sm:text-base leading-relaxed tracking-tight text-charcoal max-w-md">
            Data engineering, artificial intelligence, analytics and cloud —
            sketched, measured and shipped by humans who genuinely love the
            craft.
          </p>
          <div className="flex flex-wrap gap-4">
            <PillButton to="/services" variant="solid" size="lg">
              See what we do
            </PillButton>
            <PillButton to="/contact" variant="outline" size="lg">
              Say hello
            </PillButton>
          </div>
        </div>

        <div className="hidden md:flex items-end gap-2 mt-14">
          <HandArrow width={80} height={54} className="-rotate-6" />
          <span className="font-sans text-[12px] tracking-tight text-charcoal -ml-2 pb-1">
            (scroll for the good stuff)
          </span>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
      <Marquee
        items={[
          "Data Engineering",
          "Artificial Intelligence",
          "Analytics",
          "Data Science",
          "Machine Learning",
          "Cloud & DevOps",
          "MLOps",
        ]}
      />

      {/* ── SERVICES — staggered cards ────────────────────────────────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeader
            index="01 — Services"
            title={
              <>
                Everything <em className="font-normal">data</em>, from first
                pipeline to production AI
              </>
            }
            parenthetical="Eight crafts, one obsessive team"
          />
          <PillButton to="/services" variant="outline">
            All services
          </PillButton>
        </div>

        {loading ? (
          <LoadingState label="Laying out the services…" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={
                  i % 3 === 1 ? "lg:translate-y-10" : i % 3 === 2 ? "lg:translate-y-4" : ""
                }
              >
                <ServiceCard service={service} index={i + 1} />
              </div>
            ))}
          </div>
        )}

        <Squiggle
          variant="swirl"
          className="hidden lg:block -mt-4 ml-auto opacity-60"
          width={180}
          height={70}
        />
      </Section>

      {/* ── STATS — inverted charcoal band ────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              Numbers we&apos;re <em className="font-normal">quietly</em> proud of
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (and honestly earned)
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
            <StatBlock value={stats.projects} label="Projects delivered" />
            <StatBlock value={stats.clients} label="Happy clients" />
            <StatBlock value={stats.experts} label="Data & AI experts" />
            <StatBlock value={stats.awards} label="Awards" />
            <StatBlock value={stats.countries} label="Countries served" />
            <StatBlock value={stats.satisfaction} label="Client satisfaction" />
          </div>
          <Squiggle
            variant="wave"
            color="#81aed9"
            className="mt-12 opacity-70"
            width={520}
            height={44}
          />
        </div>
      </section>

      {/* ── WORK — featured case studies ──────────────────────────────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeader
            index="02 — Proof"
            title={
              <>
                Work that <em className="font-normal">moved</em> the needle
              </>
            }
            parenthetical="A few favourites from the portfolio"
          />
          <PillButton to="/portfolio" variant="outline">
            All case studies
          </PillButton>
        </div>

        {loading ? (
          <LoadingState label="Fetching the trophies…" />
        ) : cases.length === 0 ? null : (
          <div className="flex flex-col gap-16">
            {cases.map((cs, i) => (
              <div
                key={cs.slug}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <CircularImage
                    src={cs.image}
                    alt={`${cs.client} — ${cs.title}`}
                    size={Math.min(300, 260)}
                    badge={<TrophyBadge />}
                  />
                  <span className="absolute -top-6 -left-2 font-serif font-light text-6xl text-ink/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-4 max-w-xl">
                  <div className="flex flex-wrap gap-2">
                    <Tag tone="dusty">{cs.industry}</Tag>
                    <Tag>{cs.year}</Tag>
                  </div>
                  <h3 className="font-serif font-light text-[clamp(26px,4vw,38px)] leading-[1.1]">
                    {cs.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                    {cs.challenge.slice(0, 180)}…
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
                    Read the full story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <Section className="max-w-6xl">
        <SectionHeader
          index="03 — Kind words"
          title={
            <>
              Clients say it <em className="font-normal">better</em> than we can
            </>
          }
          parenthetical="Unedited, we promise"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(testimonials.length ? testimonials : []).map((t, i) => (
            <SketchCard key={t.id} className={i === 1 ? "md:translate-y-6" : ""}>
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-coral text-sm">★</span>
                ))}
              </div>
              <p className="font-serif font-light text-lg leading-relaxed italic">
                “{t.content}”
              </p>
              <div className="flex items-center gap-3 mt-6">
                <CircularImage src={t.avatar} alt={t.name} size={44} />
                <div>
                  <p className="font-sans text-[13px] font-semibold tracking-tight">{t.name}</p>
                  <p className="font-sans text-[12px] tracking-tight text-charcoal">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── JOURNAL TEASER ────────────────────────────────────────────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeader
            index="04 — Journal"
            title={
              <>
                Notes from the <em className="font-normal">margins</em>
              </>
            }
            parenthetical="Field notes on data, AI and craft"
          />
          <PillButton to="/blog" variant="outline">
            Read the journal
          </PillButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
              <SketchCard className="h-full flex flex-col gap-4">
                <CircularImage src={p.image} alt={p.title} size={110} />
                <Tag tone="dusty">{p.category}</Tag>
                <h3 className="font-serif font-light text-xl leading-snug group-hover:italic transition-all">
                  {p.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {p.excerpt.slice(0, 110)}…
                </p>
                <span className="font-sans text-[12px] tracking-tight text-charcoal mt-auto">
                  {p.readTime} min read · {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </SketchCard>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Let&apos;s sketch your <em className="font-normal">data story</em> together
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (First coffee&apos;s on us — Noida Sector 62 or anywhere on Earth)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/quote" variant="dusty" size="lg">
                Request a quote
              </PillButton>
              <PillButton to="/contact" variant="dark" size="lg">
                Contact us
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

/* ── Service showcase card (client card per Dyotanya spec) ───────────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link to={`/services/${service.slug}`} className="group block">
      <SketchCard className="h-full flex flex-col gap-5">
        <div className="relative">
          <CircularImage
            src={service.image}
            alt={service.title}
            size={110}
            badge={
              index <= 2 ? <TrophyBadge /> : undefined
            }
          />
          <span className="absolute -top-3 -left-1 font-serif font-light text-5xl text-ink/15">
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-serif font-light text-[26px] leading-tight group-hover:italic transition-all">
          {service.title}
        </h3>
        <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
          {service.tagline}
        </p>
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral mt-auto group-hover:translate-x-1 transition-transform">
          Explore →
        </span>
      </SketchCard>
    </Link>
  );
}
