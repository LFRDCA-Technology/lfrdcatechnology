"use client";

// ── Services index — the eight crafts of LFRDCA (#/services) ────────────────

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link } from "@/lib/router";
import type { Service } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  Marquee,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  TrophyBadge,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const PROCESS_STEPS = [
  {
    n: "01",
    name: "Discover",
    blurb: "Two weeks of honest questions — we map where decisions get made.",
  },
  {
    n: "02",
    name: "Design",
    blurb: "Architecture and success metrics, agreed before a line of code.",
  },
  {
    n: "03",
    name: "Build",
    blurb: "Weekly demos. No black boxes, no “trust us, it’s training.”",
  },
  {
    n: "04",
    name: "Ship & support",
    blurb: "Launch, monitor, iterate — we stay for the boring bits.",
  },
];

const TECH_STACK = [
  "Python",
  "PyTorch",
  "dbt",
  "Airflow",
  "Spark",
  "Kubernetes",
  "Terraform",
  "Next.js",
  "Snowflake",
  "Postgres",
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<Service[]>("/api/services");
        if (alive) setServices(data);
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
        index="Services — the menu"
        title={
          <>
            Eight crafts. One <em className="font-normal">obsessive</em> team.
          </>
        }
        parenthetical="pick one, or let us compose a team"
      >
        <div className="flex flex-wrap gap-4 mt-4">
          <PillButton to="/quote" variant="solid">
            Request a quote
          </PillButton>
          <PillButton to="/solutions" variant="outline">
            Packaged solutions
          </PillButton>
        </div>
      </PageHero>

      <Squiggle
        variant="swirl"
        animated
        className="hidden lg:block mx-auto -mt-4 mb-6 opacity-60"
        width={200}
        height={78}
      />

      {/* ── THE SERVICES — staggered card grid ───────────────────────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeader
            index="01 — The crafts"
            title={
              <>
                Every <em className="font-normal">craft</em>, itemised
              </>
            }
            parenthetical="click any card for the deep dive"
          />
          <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal">
            ({TECH_STACK.length} tools · 8 crafts · 1 standard)
          </span>
        </div>

        {loading ? (
          <LoadingState label="Laying out the services…" />
        ) : failed || services.length === 0 ? (
          <EmptyState
            title="The services shelf is still being sketched"
            hint="the API wandered off — try again, or just email us"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={
                  i % 3 === 1
                    ? "lg:translate-y-10"
                    : i % 3 === 2
                      ? "lg:translate-y-4"
                      : ""
                }
              >
                <ServiceCard service={service} index={i + 1} />
              </div>
            ))}
          </div>
        )}

        <DoodleStar
          className="hidden lg:block ml-auto mt-8 animate-wiggle"
          size={30}
        />
      </Section>

      {/* ── HOW WE WORK — process band ───────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              How we <em className="font-normal">work</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (the same four beats, every engagement)
            </span>
          </div>

          <Squiggle
            variant="dash"
            color="#81aed9"
            className="w-full max-w-[420px] h-auto opacity-70 -mb-8"
            width={420}
            height={150}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-full bg-white border-[1.5px] border-ink shadow-sketch-sm flex items-center justify-center font-serif font-light text-lg text-ink">
                  {step.n}
                </div>
                <h3 className="font-serif font-light text-2xl leading-tight">
                  {step.name}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-paper/70">
                  {step.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK MARQUEE ───────────────────────────────────────────── */}
      <div className="bg-paper">
        <p className="sr-only">
          The technologies we build with: {TECH_STACK.join(", ")}.
        </p>
        <Marquee items={TECH_STACK} slow />
      </div>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 py-16 sm:py-24 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Not sure what you <em className="font-normal">need</em>?
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (most of our best projects started life as a vague worry — bring
              yours)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/quote" variant="dusty" size="lg">
                Tell us the problem
              </PillButton>
              <PillButton to="/contact" variant="dark" size="lg">
                Just say hello
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

/* ── Service showcase card — mirrors the home page pattern ───────────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link to={`/services/${service.slug}`} className="group block">
      <SketchCard className="h-full flex flex-col gap-5">
        <div className="relative">
          <CircularImage
            src={service.image}
            alt={service.title}
            size={110}
            badge={index <= 2 ? <TrophyBadge /> : undefined}
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
