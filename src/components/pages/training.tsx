"use client";

// ── Training & certification — courses, corporate programmes, TTT ────────────

import {
  InlineLink,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { GraduationCap, Users } from "lucide-react";

const COURSES = [
  {
    title: "Applied Data Analytics",
    weeks: "6 weeks",
    price: "₹24,000",
    format: "Live online",
    learn: [
      "SQL from first principles to window functions",
      "Dashboard craft in Power BI & Metabase",
      "Statistics that survive a stakeholder review",
      "A graded capstone on real, messy business data",
    ],
  },
  {
    title: "AI Engineering with LLMs",
    weeks: "8 weeks",
    price: "₹32,000",
    format: "Live online",
    learn: [
      "Prompting, function-calling and agent patterns",
      "Retrieval-augmented generation, end to end",
      "Evals — measure your system before users do",
      "Guardrails, privacy and cost control in production",
    ],
  },
  {
    title: "Data Engineering Bootcamp",
    weeks: "10 weeks",
    price: "₹40,000",
    format: "Hybrid — Noida & online",
    learn: [
      "Warehouse modelling, Kimball through dbt",
      "Orchestration with Airflow and CI for data",
      "Streaming foundations with Kafka",
      "A deployed, documented pipeline portfolio piece",
    ],
  },
  {
    title: "Analytics for Leaders",
    weeks: "2 days",
    price: "₹18,000/team",
    format: "On-site or virtual",
    learn: [
      "Reading a dashboard critically in 90 seconds",
      "Asking questions data can actually answer",
      "AI opportunities and risks for your organisation",
      "Building a data culture without the theatre",
    ],
  },
];

export default function TrainingPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="Training"
        title={
          <>
            Training & <em className="font-normal">certification</em>.
          </>
        }
        parenthetical="taught by practitioners who ship this work on Mondays — not career slide-readers"
      >
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag tone="dusty">Small cohorts (max 20)</Tag>
          <Tag tone="dusty">New batch monthly</Tag>
          <Tag tone="coral">Certificate on completion</Tag>
        </div>
      </PageHero>

      {/* ── COURSES ────────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — The courses"
          title={
            <>
              Four programmes, one <em className="font-normal">promise</em>: you’ll be dangerous
            </>
          }
          parenthetical="dangerous in the good way — able to build, question and ship"
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {COURSES.map((c, i) => (
            <div key={c.title} className={i % 2 === 1 ? "sm:translate-y-6" : ""}>
              <SketchCard className="h-full flex flex-col gap-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif font-light text-4xl text-ink/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif font-light text-[24px] leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-serif font-light text-2xl">
                      {c.price}
                    </span>
                    <span className="font-sans text-[12px] tracking-tight text-charcoal">
                      {c.weeks}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                    What you’ll learn
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {c.learn.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <DoodleStar size={14} className="mt-[5px] shrink-0" />
                        <span className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-2">
                  <div className="flex flex-col gap-1.5">
                    <Tag tone="dusty">{c.format}</Tag>
                    <span className="font-sans text-[12px] tracking-tight text-charcoal">
                      (new batch monthly)
                    </span>
                  </div>
                  <PillButton to="/contact" variant="outline" size="sm">
                    Reserve a seat
                  </PillButton>
                </div>
              </SketchCard>
            </div>
          ))}
        </div>

        <p className="font-sans text-[13px] tracking-tight text-charcoal mt-10 max-w-2xl">
          (Seats are reserved through the{" "}
          <InlineLink to="/contact">contact form</InlineLink> — mention the
          course in your subject line and we’ll reply with the next batch
          dates, syllabus PDF and payment details.)
        </p>
      </Section>

      {/* ── CORPORATE TRAINING — inverted band ─────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <SketchCard tone="inverted" hover={false} className="border-paper/40">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="flex-1 flex flex-col gap-5">
                <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
                  02 — Corporate training
                </span>
                <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05]">
                  Your team, <em className="font-normal">your</em> data, our instructors
                </h2>
                <p className="font-sans text-[14px] leading-relaxed tracking-tight text-paper/70 max-w-xl">
                  Custom programmes built around your stack and your actual
                  business problems — not a generic curriculum with your logo
                  pasted on. Delivered on-site in Noida, at your office
                  anywhere in India, or virtually for distributed teams.
                </p>
                <ul className="flex flex-col gap-2.5 mt-1">
                  {[
                    "Curriculum audited against your real workflows",
                    "Hands-on labs run on your (sanitised) data",
                    "Pre/post skill assessment, shared with L&D",
                    "Half-day executive briefings available as add-ons",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <DoodleStar size={14} color="#81aed9" className="mt-[5px] shrink-0" />
                      <span className="font-sans text-[13px] leading-relaxed tracking-tight text-paper/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-4">
                  <PillButton to="/quote" variant="dusty">
                    Design a programme
                  </PillButton>
                  <PillButton to="/contact" variant="dark">
                    Ask a question
                  </PillButton>
                </div>
              </div>
              <Squiggle
                variant="spiral"
                color="#81aed9"
                className="hidden lg:block shrink-0 opacity-70"
                width={150}
                height={120}
              />
            </div>
          </SketchCard>
        </div>
      </section>

      {/* ── TRAIN-THE-TRAINER ──────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="03 — Train-the-trainer"
          title={
            <>
              Certify your <em className="font-normal">own</em> instructors
            </>
          }
          parenthetical="because the best internal academy is the one that outlives us"
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <SketchCard hover={false} className="flex flex-col gap-4">
            <Users strokeWidth={1.5} className="w-7 h-7" aria-hidden="true" />
            <h3 className="font-serif font-light text-2xl leading-tight">
              We teach the teachers, then step back
            </h3>
            <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
              Over six weeks, two of your senior people co-deliver a full
              LFRDCA curriculum with our instructors — then deliver it solo,
              with us observing — then own it entirely. You get the syllabus,
              the labs, the assessments and the answer keys. We get to stop
              billing you monthly (we manage).
            </p>
            <span className="font-sans text-[12px] tracking-tight text-charcoal mt-auto">
              (six-week engagement · from ₹1,50,000 · max 2 trainers per cohort)
            </span>
          </SketchCard>
          <SketchCard hover={false} className="flex flex-col gap-4">
            <GraduationCap strokeWidth={1.5} className="w-7 h-7" aria-hidden="true" />
            <h3 className="font-serif font-light text-2xl leading-tight">
              Certification that means something
            </h3>
            <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
              Every LFRDCA certificate — individual or corporate — is earned
              through a reviewed project, not attendance. Employers can verify
              each certificate ID with us directly, and we’re honest when
              asked: pass rates hover around 82%, because we’d rather defend a
              strict certificate than dilute one.
            </p>
            <span className="font-sans text-[12px] tracking-tight text-charcoal mt-auto">
              (verification requests: lfrdcatechnologies@outlook.com)
            </span>
          </SketchCard>
        </div>
      </Section>

      {/* ── CLOSING ────────────────────────────────────────────────────────── */}
      <Section className="max-w-3xl text-center">
        <Squiggle
          variant="underline"
          color="#81aed9"
          className="mx-auto mb-8"
          width={240}
          height={22}
        />
        <h2 className="font-serif font-light text-[clamp(26px,4vw,40px)] leading-[1.08]">
          Still deciding? The <em className="font-normal">FAQs</em> are honest.
        </h2>
        <p className="font-sans text-sm tracking-tight text-charcoal mt-4 max-w-md mx-auto">
          (batch timings, refunds, EMI options and the questions people are
          too shy to ask on a sales call)
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <PillButton to="/faq" variant="solid">
            Read the FAQs
          </PillButton>
          <PillButton to="/contact" variant="outline">
            Talk to a human first
          </PillButton>
        </div>
      </Section>
    </div>
  );
}
