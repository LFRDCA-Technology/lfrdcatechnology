"use client";

// ── Culture — life at LFRDCA, unfiltered ─────────────────────────────────────

import { BookOpen, PencilLine, Presentation, Users } from "lucide-react";
import {
  Marquee,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, HandArrow, Squiggle } from "@/components/site/squiggle";

const CULTURE_IMAGES = [
  {
    src: "/images/culture-1.png",
    alt: "The LFRDCA studio floor mid-sprint — laptops, notebooks and one standing desk",
    className: "md:col-span-4 aspect-[16/10] rounded-[60px]",
    rotate: "",
  },
  {
    src: "/images/culture-2.png",
    alt: "A whiteboard session in the AI lab, marker caps everywhere",
    className: "md:col-span-2 aspect-[4/5] rounded-[40px]",
    rotate: "rotate-[1.5deg] hover:rotate-0",
  },
  {
    src: "/images/culture-3.png",
    alt: "Demo Friday — a data engineer presenting a new pipeline to the team",
    className: "md:col-span-2 aspect-square rounded-[40px]",
    rotate: "-rotate-[1deg] hover:rotate-0",
  },
  {
    src: "/images/culture-4.png",
    alt: "The reading corner with the company bookshelf and suspicious amount of chai",
    className: "md:col-span-2 aspect-square rounded-[40px]",
    rotate: "rotate-[1deg] hover:rotate-0",
  },
  {
    src: "/images/culture-5.png",
    alt: "The whole team celebrating a launch on the studio terrace",
    className: "md:col-span-4 aspect-[16/10] rounded-[60px]",
    rotate: "",
  },
  {
    src: "/images/culture-6.png",
    alt: "Two engineers pairing on a dashboard, one sketchbook between them",
    className: "md:col-span-2 aspect-[4/5] rounded-[40px]",
    rotate: "-rotate-[1.5deg] hover:rotate-0",
  },
];

const HOW_WE_WORK = [
  {
    icon: PencilLine,
    title: "Write things down",
    copy: "If it happened and nobody wrote it down, it didn't happen. Decisions, schemas, lessons — everything lands in a doc before the chai goes cold.",
  },
  {
    icon: Presentation,
    title: "Demo Fridays",
    copy: "Every Friday afternoon, someone shows something real — a pipeline, a prototype, a spectacular failure. Slides are banned; working software isn't.",
  },
  {
    icon: BookOpen,
    title: "Learning stipend",
    copy: "Every expert gets an annual budget for books, courses and conferences. The only condition: share one thing you learned with the team.",
  },
  {
    icon: Users,
    title: "No-hero culture",
    copy: "We don't keep geniuses who can't collaborate. Knowledge spreads, holidays are actually taken, and nobody's laptop pings at midnight.",
  },
];

const PERKS = [
  "Unlimited books",
  "Conference tickets",
  "Gadget budget",
  "Mental health days",
  "Filter coffee & chai",
  "Flexible hours",
  "Remote-friendly",
  "Annual offsite",
];

export default function CulturePage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 04 · The culture"
        title={
          <>
            Life at LFRDCA, <em className="font-normal">unfiltered.</em>
          </>
        }
        parenthetical="Photos taken by actual employees, imperfect crops included"
      >
        <DoodleStar className="mt-4 animate-wiggle" size={30} />
      </PageHero>

      {/* ── HERO STATEMENT ───────────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <div className="relative max-w-4xl">
          <p className="font-serif font-light text-[clamp(32px,5.5vw,64px)] leading-[1.08] text-balance">
            We take the work <em className="font-normal">seriously</em> — and
            ourselves, <em className="font-normal">almost never.</em>
          </p>
          <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal max-w-xl mt-6">
            Forty-five-plus experts, one studio in Noida Sector 62, and a
            shared belief that the best data work happens where people feel
            safe asking the obvious question twice.
          </p>
          <Squiggle
            variant="underline"
            animated
            className="mt-6 opacity-80"
            width={300}
            height={28}
          />
        </div>
      </Section>

      {/* ── COLLAGE GRID ─────────────────────────────────────────────────── */}
      <Section className="pt-4 sm:pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeader
            index="01 — The studio, in six frames"
            title={
              <>
                Whiteboards, chai, and{" "}
                <em className="font-normal">occasional</em> victories
              </>
            }
            parenthetical="Hover to straighten the crooked ones"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {CULTURE_IMAGES.map((img) => (
            <figure key={img.src} className={`group ${img.className} ${img.rotate} transition-transform duration-300`}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover border-[1.5px] border-ink shadow-sketch bg-white"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
        <HandArrow width={90} height={56} className="hidden md:block rotate-12 mt-6 ml-6" />
      </Section>

      {/* ── PERKS MARQUEE ────────────────────────────────────────────────── */}
      <Marquee items={PERKS} slow />

      {/* ── HOW WE WORK ──────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="02 — How we work"
          title={
            <>
              Four rituals that keep us{" "}
              <em className="font-normal">honest</em>
            </>
          }
          parenthetical="Small habits, stubbornly defended"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_WE_WORK.map((h, i) => {
            const Icon = h.icon;
            return (
              <SketchCard key={h.title} className="flex flex-col gap-5 h-full">
                <div className="flex items-start justify-between">
                  <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-serif font-light text-4xl text-ink/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif font-light text-[24px] leading-tight">
                  {h.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {h.copy}
                </p>
              </SketchCard>
            );
          })}
        </div>
        <Squiggle
          variant="wave"
          className="mt-10 opacity-60"
          width={420}
          height={40}
        />
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
          <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
          <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
            Come <em className="font-normal">build</em> with us
          </h2>
          <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
            (Open roles in data engineering, AI and analytics — plus the
            occasional role we invent for the right person)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <PillButton to="/careers" variant="dusty" size="lg">
              Open roles
            </PillButton>
            <PillButton to="/internships" variant="dark" size="lg">
              Internships
            </PillButton>
          </div>
        </SketchCard>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Tag tone="dusty">Noida Sector 62</Tag>
          <Tag tone="dusty">Hybrid-friendly</Tag>
          <Tag tone="dusty">Demo Fridays · 4:00 p.m.</Tag>
        </div>
      </Section>
    </div>
  );
}
