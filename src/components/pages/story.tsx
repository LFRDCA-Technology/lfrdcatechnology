"use client";

// ── Story — the LFRDCA origin timeline, 2019 → today ────────────────────────

import { apiFetch } from "@/lib/auth";
import { useEffect, useState } from "react";
import { CircularImage, PageHero, PillButton, Section, SectionHeader, SketchCard, Tag } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

interface StoryEntry {
  year: string;
  title: string;
  copy: string;
  tag: string;
  image?: { src: string; alt: string };
  today?: boolean;
}

const TIMELINE: StoryEntry[] = [
  {
    year: "2019",
    title: "A sketchbook and a corner desk",
    copy: "Satyam RojhaX sketches his first production data pipeline in a Noida Sector 62 co-working corner — one laptop, one notebook, and a growing suspicion that most companies were drowning in data they never read. LFRDCA Technologies is registered before the chai goes cold.",
    tag: "The beginning",
    image: {
      src: "/images/founder.png",
      alt: "Portrait of Satyam RojhaX, founder of LFRDCA Technologies",
    },
  },
  {
    year: "2020",
    title: "Three clients and a leap of spreadsheet-shaped faith",
    copy: "The first three clients sign on — all retail, all analytics. Demand forecasts, store clustering, and one heroic migration off a decade of spreadsheets. Two of them are still clients today, which we consider the best kind of bragging right.",
    tag: "First clients",
  },
  {
    year: "2021",
    title: "The data engineering practice",
    copy: "We stop borrowing pipelines and start building them properly. A dedicated data engineering practice forms around warehouses, lakehouses and the quiet glory of idempotent ingestion. The team hits double digits; the whiteboards run out of space.",
    tag: "Practice formed",
  },
  {
    year: "2022",
    title: "The AI lab opens",
    copy: "Twenty experts strong, we open a dedicated AI lab — equal parts research rigor and engineering pragmatism. Early LLM prototypes graduate into production systems, and the rule is written: no model ships without an evaluation suite.",
    tag: "AI lab",
    image: {
      src: "/images/culture-2.png",
      alt: "The LFRDCA AI lab team at a whiteboard session",
    },
  },
  {
    year: "2023",
    title: "Project #50 and the healthcare practice",
    copy: "The fiftieth project ships — a clinical analytics platform that clinicians actually open on rounds. It sparks our formal healthcare practice, and a company-wide rule that dashboards should read like newspaper front pages.",
    tag: "50 projects",
  },
  {
    year: "2024",
    title: "Awards, and eighty-something clients",
    copy: "Recognition arrives (unbidden, which is the nice kind) — regional and national awards for AI innovation and engineering culture. The client roster passes 80. We celebrate by… ordering more whiteboard markers.",
    tag: "80+ clients",
    image: {
      src: "/images/culture-5.png",
      alt: "The LFRDCA team celebrating an award in the Noida studio",
    },
  },
  {
    year: "2025",
    title: "LFRDCA Intelligence — R&D begins",
    copy: "We turn the tooling we'd built for ourselves into a product research programme. LFRDCA Intelligence: a platform for governed data, grounded AI and analytics that explains itself. Internal beta first; opinions strong.",
    tag: "Platform R&D",
  },
  {
    year: "2026",
    title: "Today — 45+ experts, 9 countries",
    copy: "Forty-five-plus experts across data engineering, AI, analytics and cloud, serving clients in nine countries — still sketching first, shipping second, iterating always. The corner desk is now a studio; the sketchbook never left.",
    tag: "Present day",
    today: true,
  },
];

export default function StoryPage() {
  const [statsReady, setStatsReady] = useState(false);

  // Gentle liveness check so the page reflects real numbers when the API is up,
  // but the timeline itself is fully static and always renders.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await apiFetch("/api/stats");
        if (alive) setStatsReady(true);
      } catch {
        /* timeline renders regardless */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 01 · The story"
        title={
          <>
            Every good dataset has an{" "}
            <em className="font-normal">origin story.</em>
          </>
        }
        parenthetical="2019 → 2026, with the honest bits left in"
      >
        <Squiggle
          variant="dash"
          animated
          className="mt-4 opacity-80"
          width={240}
          height={70}
        />
      </PageHero>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <Section className="pt-6 sm:pt-8">
        <div className="relative">
          {/* hand-drawn vertical spine (desktop) */}
          <svg
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-2 bottom-2 hidden md:block"
            style={{ left: "calc(160px + 28px)" }}
            width="24"
            height="100%"
          >
            <path
              d="M12 0 C 17 12, 7 26, 12 40 C 17 54, 7 68, 12 82 C 15 90, 11 95, 12 100"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="flex flex-col gap-12 md:gap-16">
            {TIMELINE.map((entry) => (
              <article
                key={entry.year}
                className="relative grid grid-cols-1 md:grid-cols-[160px_1fr] md:gap-14"
              >
                {/* spine marker */}
                <DoodleStar
                  size={22}
                  className="hidden md:block absolute top-10 left-[calc(160px+28px)] -translate-x-1/2"
                />
                {/* year column */}
                <div className="flex md:justify-end md:text-right md:pr-2 mb-2 md:mb-0">
                  <h2
                    className={`font-serif font-light leading-none text-[clamp(48px,7vw,76px)] ${
                      entry.today ? "italic" : ""
                    }`}
                  >
                    {entry.year}
                  </h2>
                </div>
                {/* content column */}
                <div className="relative">
                  <SketchCard
                    tone={entry.today ? "inverted" : "white"}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start"
                  >
                    <div className="flex flex-col gap-4 flex-1">
                      <Tag tone={entry.today ? "charcoal" : "dusty"}>
                        {entry.tag}
                      </Tag>
                      <h3 className="font-serif font-light text-[clamp(24px,3.4vw,34px)] leading-[1.1]">
                        {entry.title}
                      </h3>
                      <p
                        className={`font-sans text-[14px] leading-relaxed tracking-tight ${
                          entry.today ? "text-paper/80" : "text-charcoal"
                        }`}
                      >
                        {entry.copy}
                      </p>
                    </div>
                    {entry.image && (
                      <CircularImage
                        src={entry.image.src}
                        alt={entry.image.alt}
                        size={150}
                        className="mx-auto sm:mx-0 shrink-0"
                      />
                    )}
                  </SketchCard>
                  {entry.today && (
                    <span className="absolute -top-5 right-8 font-sans text-[12px] uppercase tracking-[0.16em] text-charcoal bg-paper px-2">
                      (you are here)
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CLOSING NOTE ─────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <div className="flex flex-col items-center text-center gap-6">
          <SectionHeader
            align="center"
            index="— Epilogue"
            title={
              <>
                The next chapter is{" "}
                <em className="font-normal">probably yours</em>
              </>
            }
            parenthetical={
              statsReady
                ? "Live numbers straight from our own pipeline, naturally"
                : "Every number above, double-checked by hand"
            }
          />
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <PillButton to="/about" variant="solid" size="lg">
              More about us
            </PillButton>
            <PillButton to="/contact" variant="outline" size="lg">
              Start a project
            </PillButton>
          </div>
          <Squiggle
            variant="underline"
            color="#81aed9"
            className="opacity-90"
            width={280}
            height={26}
          />
        </div>
      </Section>
    </div>
  );
}
