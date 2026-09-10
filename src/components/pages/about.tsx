"use client";

// ── About — "We're the data people." Company intro, values, stats, team teaser ──

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import type { CompanyStats, TeamMember } from "@/lib/types";
import {
  CircularImage,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  StatBlock,
} from "@/components/site/ui";
import { DoodleStar, HandArrow, Squiggle } from "@/components/site/squiggle";

const FALLBACK_STATS: CompanyStats = {
  projects: "13+",
  clients: "80+",
  experts: "45+",
  awards: "12",
  countries: "3",
  satisfaction: "98%",
};

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: "t1",
    name: "Satyam RojhaX",
    role: "Founder & CEO",
    bio: "Founded LFRDCA on the conviction that enterprises deserve AI built with editorial care and engineering rigour.",
    image: "/images/team-1.png",
    order: 1,
  },
  {
    id: "t2",
    name: "Dr. Ananya Deshmukh",
    role: "Chief Data Scientist",
    bio: "PhD in statistical learning. Keeps our models honest and our p-values humble.",
    image: "/images/team-2.png",
    order: 2,
  },
  {
    id: "t3",
    name: "Vikram Malhotra",
    role: "CTO",
    bio: "Architected data platforms for three unicorns and one very stubborn bank. Believes boring infrastructure is exciting.",
    image: "/images/team-3.png",
    order: 3,
  },
  {
    id: "t4",
    name: "Priya Nair",
    role: "Head of AI Engineering",
    bio: "Ships LLM systems that survive production. Her prototypes have a notorious habit of becoming products.",
    image: "/images/team-4.png",
    order: 4,
  },
];

const VALUES = [
  {
    title: "Curiosity first",
    copy: "We ask one more “why?” than is socially comfortable. The best pipelines we've ever built started as an awkward question in a discovery call.",
  },
  {
    title: "Honest numbers",
    copy: "If the model is only 74% accurate, we say 74% — beautifully visualised, painfully clear. Trust compounds faster than hype.",
  },
  {
    title: "Craft over hype",
    copy: "We'd rather ship one clean dashboard than ten flashy demos. The craft is in the detail nobody notices because everything just works.",
  },
  {
    title: "Ship, then iterate",
    copy: "Perfect is a direction, not a deadline. We get real things in front of real users fast, then improve them with honest feedback loops.",
  },
];

export default function AboutPage() {
  const [stats, setStats] = useState<CompanyStats>(FALLBACK_STATS);
  const [team, setTeam] = useState<TeamMember[]>(FALLBACK_TEAM);

  useEffect(() => {
    let alive = true;
    (async () => {
      const results = await Promise.allSettled([
        apiFetch<CompanyStats>("/api/stats"),
        apiFetch<TeamMember[]>("/api/team"),
      ]);
      if (!alive) return;
      const [st, tm] = results;
      if (st.status === "fulfilled") setStats(st.value);
      if (tm.status === "fulfilled" && tm.value.length > 0)
        setTeam(tm.value.slice(0, 4));
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        index="LFRDCA — 00 · About us"
        title={
          <>
            We&apos;re the <em className="font-normal">data people.</em>
          </>
        }
        parenthetical="Engineers, scientists and one very organised operations human — Noida Sector 62, serving 9 countries"
      >
        <DoodleStar className="mt-2 animate-wiggle" size={28} />
      </PageHero>

      {/* ── INTRO + OFFICE IMAGE ─────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative flex flex-col gap-6">
            <SectionHeader
              index="01 — Who we are"
              title={
                <>
                  A technology company that treats data like{" "}
                  <em className="font-normal">literature</em>
                </>
              }
            />
            <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
              LFRDCA Technologies is an AI-powered IT company founded in
              July 2026 by Satyam RojhaX &amp; associates — the formal home
              of a data-and-AI practice that has been shipping since 2019. We
              design data platforms, build AI systems and
              craft analytics that people actually use — for healthcare,
              finance, retail and manufacturing teams across India and beyond.
            </p>
            <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal">
              Our name comes from the way we work:{" "}
              <span className="font-semibold">L</span>isten,{" "}
              <span className="font-semibold">F</span>rame,{" "}
              <span className="font-semibold">R</span>esearch,{" "}
              <span className="font-semibold">D</span>esign,{" "}
              <span className="font-semibold">C</span>reate,{" "}
              <span className="font-semibold">A</span>mplify. Every engagement,
              every time — sketch first, ship second, iterate always.
            </p>
            <DoodleStar className="absolute -top-10 -right-2 hidden md:block animate-wiggle" size={30} />
          </div>
          <div className="relative">
            <img
              src="/images/office-hero.png"
              alt="The LFRDCA Technologies studio in Noida Sector 62 — desks, whiteboards and coffee"
              className="w-full aspect-[16/10] object-cover rounded-[60px] border-[1.5px] border-ink shadow-sketch"
              loading="lazy"
            />
            <span className="absolute -bottom-4 left-10 font-sans text-[12px] tracking-tight text-charcoal bg-paper px-3">
              (the Noida studio, 10:42 a.m. — chai o&apos;clock)
            </span>
          </div>
        </div>
      </Section>

      {/* ── WHAT WE BELIEVE ──────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="02 — What we believe"
          title={
            <>
              Four things we <em className="font-normal">refuse</em> to
              compromise on
            </>
          }
          parenthetical="Written on the studio wall, in permanent marker"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v, i) => (
            <SketchCard key={v.title} className="flex flex-col gap-4 h-full">
              <div className="flex items-start justify-between">
                <span className="font-serif font-light text-4xl text-ink/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <DoodleStar size={24} className="animate-wiggle" />
              </div>
              <h3 className="font-serif font-light text-[24px] leading-tight">
                {v.title}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {v.copy}
              </p>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              The company, <em className="font-normal">measured</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (yes, we count ourselves too)
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

      {/* ── TEAM TEASER ──────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <SectionHeader
              index="03 — The humans"
              title={
                <>
                  Behind every pipeline, a{" "}
                  <em className="font-normal">person</em> who cares
                </>
              }
              parenthetical="45+ experts; here are four of the regulars"
            />
            <p className="font-sans text-[15px] leading-relaxed tracking-tight text-charcoal mt-4 max-w-md">
              Data engineers, ML scientists, cloud architects, designers who
              love a good axis label. We&apos;re the team your stakeholders
              will actually remember by name.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <PillButton to="/leadership" variant="outline">
                Meet the leadership
              </PillButton>
              <HandArrow width={70} height={46} className="hidden sm:block -rotate-6" />
            </div>
            <Squiggle
              variant="spiral"
              className="hidden lg:block absolute -bottom-10 -left-8 opacity-50"
              width={110}
              height={80}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {team.map((member, i) => (
              <div
                key={member.id}
                className="flex flex-col items-center gap-3 w-[calc(50%-16px)] sm:w-auto"
              >
                <CircularImage
                  src={member.image}
                  alt={`${member.name}, ${member.role} at LFRDCA Technologies`}
                  size={130}
                  className={i % 2 === 1 ? "sm:translate-y-6" : ""}
                />
                <p className="font-serif font-light text-lg leading-tight text-center">
                  {member.name}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal text-center -mt-2">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Want the <em className="font-normal">full</em> story?
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (Seven years of practice, one July 2026 founding, nine
              countries — it&apos;s a decent read)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <PillButton to="/story" variant="dusty" size="lg">
                Our origin story
              </PillButton>
              <PillButton to="/contact" variant="dark" size="lg">
                Work with us
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
