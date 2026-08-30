"use client";

// ── Internships — three programmes that actually teach ───────────────────────

import {
  CircularImage,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  StatBlock,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const PROGRAMS = [
  {
    title: "Data Engineering Intern",
    duration: "12 weeks",
    focus: "pipelines, dbt, Airflow",
    image: "/images/culture-4.png",
    highlights: [
      "SQL and warehouse modelling on real (messy) datasets",
      "dbt projects — models, tests, documentation you’ll actually keep",
      "Airflow orchestration, backfills and incremental loads",
      "Ship one production pipeline against a live client brief",
    ],
  },
  {
    title: "AI/ML Intern",
    duration: "12 weeks",
    focus: "models, evals, RAG",
    image: "/images/ai-lab.png",
    highlights: [
      "Classical ML foundations through to fine-tuning transformers",
      "Evaluation design — accuracy is the least interesting number",
      "RAG systems: chunking, retrieval, grounding, citations",
      "Build and defend one end-to-end AI product at showcase",
    ],
  },
  {
    title: "Web Platform Intern",
    duration: "8 weeks",
    focus: "Next.js, TypeScript, APIs",
    image: "/images/culture-3.png",
    highlights: [
      "TypeScript that carries its weight — types as documentation",
      "Next.js App Router: server, client and the line between",
      "Design-system thinking with Tailwind, a11y included",
      "Ship a feature real visitors touch before you leave",
    ],
  },
];

const TIMELINE = [
  {
    n: "01",
    title: "Apply",
    blurb: "One honest form — no referrals or fancy college names required.",
  },
  {
    n: "02",
    title: "2-week bootcamp",
    blurb: "Fundamentals at full speed, paired with a mentor from day one.",
  },
  {
    n: "03",
    title: "Project pod",
    blurb: "Real repo, real deadlines, real code reviews — gently brutal.",
  },
  {
    n: "04",
    title: "Showcase",
    blurb: "You present your work to the whole company. We clap loudly.",
  },
];

export default function InternshipsPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="Internships"
        title={
          <>
            Internships that <em className="font-normal">actually</em> teach.
          </>
        }
        parenthetical="paid, mentored, and measured in things you shipped — not certificates"
      >
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag tone="dusty">Two intakes a quarter</Tag>
          <Tag tone="dusty">Noida & remote-friendly</Tag>
          <Tag tone="coral">Stipend provided</Tag>
        </div>
      </PageHero>

      {/* ── PROGRAMMES ─────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — The programmes"
          title={
            <>
              Pick a craft, we’ll hand you the <em className="font-normal">real</em> tools
            </>
          }
          parenthetical="each track ends with work in production, not a PDF"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((p, i) => (
            <div key={p.title} className={i === 1 ? "lg:translate-y-8" : ""}>
              <SketchCard className="h-full flex flex-col gap-5">
                <div className="relative">
                  <CircularImage
                    src={p.image}
                    alt={`${p.title} programme at LFRDCA`}
                    size={110}
                  />
                  <span className="absolute -top-3 -left-1 font-serif font-light text-5xl text-ink/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-light text-[24px] leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[13px] tracking-tight text-charcoal">
                    {p.duration} — {p.focus}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <DoodleStar size={16} className="mt-1 shrink-0" />
                      <span className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Tag tone="coral">Stipend provided</Tag>
                </div>
              </SketchCard>
            </div>
          ))}
        </div>
      </Section>

      {/* ── HOW IT GOES — timeline ─────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="02 — How it goes"
          title={
            <>
              From application to <em className="font-normal">showcase</em>, in one line
            </>
          }
          parenthetical="the squiggle below is roughly to scale (not really)"
          className="mb-12"
        />

        <div className="relative">
          <Squiggle
            variant="dash"
            animated
            className="hidden lg:block absolute top-8 left-0 right-0 w-full opacity-40"
            height={70}
            width={1100}
          />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {TIMELINE.map((t) => (
              <div key={t.n} className="flex flex-col gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-[1.5px] border-ink font-serif font-light text-lg shadow-sketch-sm">
                  {t.n}
                </span>
                <h3 className="font-serif font-light text-[22px] leading-tight">
                  {t.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal max-w-[240px]">
                  {t.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── INTERN-TO-HIRE — charcoal band ─────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05]">
              The quiet <em className="font-normal">fine print</em> that isn’t fine at all
            </h2>
            <p className="font-sans text-[14px] leading-relaxed tracking-tight text-paper/70 mt-5 max-w-lg">
              Internships here are auditions in both directions. Do good work
              and the hiring conversation starts before your showcase slides
              are cold. Most of our senior engineers once sat exactly where
              you’d be sitting.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-10 lg:gap-12 items-start shrink-0">
            <StatBlock
              value="70%"
              label="Interns offered full-time roles"
              className="[&_span]:text-paper"
            />
            <Squiggle variant="wave" color="#81aed9" width={200} height={36} />
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <Section className="max-w-3xl text-center">
        <DoodleStar className="mx-auto mb-6 animate-wiggle" size={34} />
        <h2 className="font-serif font-light text-[clamp(28px,4.5vw,46px)] leading-[1.05]">
          Ready to be <em className="font-normal">properly</em> taught?
        </h2>
        <p className="font-sans text-sm leading-relaxed tracking-tight text-charcoal mt-5 max-w-lg mx-auto">
          Applications run through our careers page — the Data Analyst Intern
          listing is the intern intake in disguise.
        </p>
        <p className="font-sans text-[13px] tracking-tight text-charcoal mt-3">
          (or email{" "}
          <a
            href="mailto:lfrdcatechnologies@outlook.com?subject=Internship"
            className="link-coral"
          >
            lfrdcatechnologies@outlook.com
          </a>{" "}
          with “Internship” in the subject)
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-9">
          <PillButton to="/careers" variant="solid" size="lg">
            Apply for an internship
          </PillButton>
          <PillButton to="/training" variant="outline" size="lg">
            Not a student? See training
          </PillButton>
        </div>
      </Section>
    </div>
  );
}
