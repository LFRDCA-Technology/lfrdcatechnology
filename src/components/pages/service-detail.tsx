"use client";

// ── Service detail — one craft, in depth (#/services/:slug) ─────────────────
// Serves all eight services: ai-development, data-analytics, data-science,
// machine-learning, cloud-devops, web-development, mobile-development,
// cybersecurity.

import { useEffect, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { apiFetch } from "@/lib/auth";
import { Link, useSegments } from "@/lib/router";
import type { Service } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  StatBlock,
  TrophyBadge,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const KNOWN_SLUGS = [
  "ai-development",
  "data-analytics",
  "data-science",
  "machine-learning",
  "cloud-devops",
  "web-development",
  "mobile-development",
  "cybersecurity",
];

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

/** Renders a service title with the final word italicised (Dyotanya mix). */
function TitleWithEm({ text }: { text: string }) {
  const words = text.split(" ");
  if (words.length < 2) {
    return <em className="font-normal">{text}</em>;
  }
  const last = words.pop() as string;
  return (
    <>
      {words.join(" ")} <em className="font-normal">{last}</em>
    </>
  );
}

export default function ServiceDetailPage() {
  const segments = useSegments();
  const slug = segments[1] ?? "";
  const valid = KNOWN_SLUGS.includes(slug);

  const [service, setService] = useState<Service | null>(null);
  const [related, setRelated] = useState<Service[]>([]);
  const [loading, setLoading] = useState(() => valid);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!valid) return;
    let alive = true;
    (async () => {
      const [detail, list] = await Promise.allSettled([
        apiFetch<Service>(`/api/services/${slug}`),
        apiFetch<Service[]>("/api/services"),
      ]);
      if (!alive) return;
      if (detail.status === "fulfilled") {
        setService(detail.value);
        if (list.status === "fulfilled") {
          setRelated(
            list.value.filter((s) => s.slug !== slug).slice(0, 3)
          );
        }
      } else {
        setFailed(true);
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [slug, valid]);

  if (loading) {
    return <LoadingState label="Opening the workshop door…" />;
  }

  if (!valid || failed || !service) {
    return (
      <Section className="pt-32">
        <DoodleStar className="mx-auto mb-4" size={30} />
        <EmptyState
          title="This service page is still being sketched"
          hint="try the full menu instead"
        />
        <div className="flex justify-center mt-8">
          <PillButton to="/services" variant="outline">
            All services
          </PillButton>
        </div>
      </Section>
    );
  }

  const order = pad(service.order);

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        index={`Service — ${order}`}
        title={<TitleWithEm text={service.title} />}
        parenthetical={service.tagline}
      />

      {/* ── HERO ROW — portrait + intro ──────────────────────────────────── */}
      <Section className="pt-0">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="relative shrink-0">
            <CircularImage
              src={service.image}
              alt={service.title}
              size={200}
              badge={<TrophyBadge />}
            />
            <span className="absolute -top-8 -left-3 font-serif font-light text-7xl text-ink/15">
              {order}
            </span>
            <DoodleStar
              className="absolute -bottom-3 -right-5 animate-wiggle"
              size={26}
            />
          </div>
          <div className="flex flex-col gap-6 max-w-xl">
            <p className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal">
              {service.description}
            </p>
            <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal">
              ({service.features.length} capabilities ·{" "}
              {service.deliverables.length} deliverables · 1 obsessive team)
            </p>
            <div>
              <PillButton to="/quote" variant="solid">
                Start a project
              </PillButton>
            </div>
          </div>
        </div>
      </Section>

      {/* ── THE WORK — long description ─────────────────────────────────── */}
      <Section>
        <SketchTitle
          index="01 — The work"
          title={
            <>
              What <TitleWithEm text={service.title} /> actually involves
            </>
          }
          parenthetical="the honest version, not the brochure"
        />
        <div className="flex flex-col gap-5 max-w-2xl">
          {service.longDescription.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal"
            >
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* ── FEATURES — 2-col cards ───────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="02 — Capabilities"
          title={
            <>
              The <em className="font-normal">craft</em>, itemised
            </>
          }
          parenthetical="what you can put on a roadmap"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {service.features.map((feature) => (
            <SketchCard key={feature} className="flex items-start gap-4 p-5 sm:p-6">
              <span className="w-9 h-9 shrink-0 rounded-full border-[1.5px] border-dusty bg-white flex items-center justify-center">
                <Check className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                {feature}
              </p>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── DELIVERABLES — numbered checklist ────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="03 — Deliverables"
          title={
            <>
              What lands on <em className="font-normal">your</em> desk
            </>
          }
          parenthetical="the checklist we sign off against"
        />
        <div className="max-w-2xl">
          {service.deliverables.map((item, i) => (
            <div
              key={item}
              className="flex items-baseline gap-6 py-4 border-b-[1.5px] border-ink/10 last:border-b-0"
            >
              <span className="font-serif font-light text-xl text-ink/40 w-9 shrink-0">
                {pad(i + 1)}
              </span>
              <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── ENGAGEMENT SNAPSHOT — stats band ─────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-18">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <h2 className="font-serif font-light text-[clamp(26px,4vw,40px)] leading-[1.05]">
              Engagement <em className="font-normal">snapshot</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (typical shape — every project negotiates its own)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 [&_span]:text-paper">
            <StatBlock value="4–12 wks" label="Timeline" />
            <StatBlock value="3–6 people" label="Team" />
            <StatBlock value="Fixed or T&M" label="Model" />
          </div>
          <Squiggle
            variant="wave"
            color="#81aed9"
            className="mt-10 opacity-70"
            width={420}
            height={36}
          />
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section>
          <SketchTitle
            index="04 — Keep exploring"
            title={
              <>
                Adjacent <em className="font-normal">crafts</em>
              </>
            }
            parenthetical="the other instruments in the band"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="group block">
                <SketchCard className="h-full flex items-center gap-5">
                  <CircularImage src={s.image} alt={s.title} size={80} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-light text-xl leading-tight group-hover:italic transition-all">
                      {s.title}
                    </h3>
                    <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </SketchCard>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Start with{" "}
              <em className="font-normal">{service.title}</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (tell us the shape of the problem — a human replies within one
              working day)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/quote" variant="dusty" size="lg">
                Request a quote
              </PillButton>
              <PillButton to="/contact" variant="dark" size="lg">
                Talk it through
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
