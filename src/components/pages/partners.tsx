"use client";

// ── Partners — the cloud & data ecosystem we build alongside ─────────────────

import {
  Cloud,
  CloudCog,
  Cpu,
  Database,
  Globe,
  Handshake,
  Snowflake,
} from "lucide-react";
import {
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const ECOSYSTEM = [
  {
    icon: Cloud,
    name: "Amazon Web Services",
    note: "Our most-deployed cloud — data lakes, SageMaker pipelines, and cost-optimised analytics stacks.",
    tag: "Cloud",
  },
  {
    icon: CloudCog,
    name: "Microsoft Azure",
    note: "Enterprise AI and Synapse builds for clients already living in the Microsoft universe.",
    tag: "Cloud",
  },
  {
    icon: Globe,
    name: "Google Cloud",
    note: "BigQuery-native warehouses and Vertex AI deployments where scale is the whole point.",
    tag: "Cloud",
  },
  {
    icon: Database,
    name: "Databricks",
    note: "Lakehouse architectures, Delta tables and Spark pipelines for the seriously data-hungry.",
    tag: "Data",
  },
  {
    icon: Snowflake,
    name: "Snowflake",
    note: "Warehouse modernisation and governed data sharing — we've moved petabytes without breaking a sweat.",
    tag: "Data",
  },
  {
    icon: Cpu,
    name: "NVIDIA",
    note: "GPU-accelerated training and inference infrastructure for models that earn their compute.",
    tag: "Compute",
  },
];

const MODELS = [
  {
    title: "Technology",
    copy: "We plug our platforms into yours — joint architectures, validated integrations, and reference builds both teams can sell with a straight face.",
    bullets: [
      "Co-architected solutions with named engineers on both sides",
      "Validated integrations and joint reference architectures",
      "Shared engineering roadmap reviews, quarterly",
    ],
  },
  {
    title: "Delivery",
    copy: "You bring the client, we bring the data and AI muscle — or the reverse. Either way, one team on the invoice and zero finger-pointing.",
    bullets: [
      "White-label or co-branded delivery pods",
      "Transparent margin split agreed before kickoff",
      "Shared project channel from day one",
    ],
  },
  {
    title: "Referral",
    copy: "The polite version of business development: we send work that isn't ours to do, and you do the same. Commission handled like adults.",
    bullets: [
      "Mutual referral agreement with simple terms",
      "Flat referral fee, paid on project start",
      "Warm intros only — no spreadsheet blasts",
    ],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Say hello",
    copy: "One email, one call. Tell us what your product does and where your clients hurt.",
  },
  {
    step: "02",
    title: "Sketch the overlap",
    copy: "We map where our services genuinely complement your platform — and say so honestly when they don't.",
  },
  {
    step: "03",
    title: "Pilot something small",
    copy: "One joint build or one shared client engagement. Proof beats proposals, every time.",
  },
  {
    step: "04",
    title: "Formalise & grow",
    copy: "Paperwork, cadence, and a named human on each side who owns the partnership.",
  },
];

export default function PartnersPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 05 · Partnerships"
        title={
          <>
            Better together <em className="font-normal">(we mean it).</em>
          </>
        }
        parenthetical="The ecosystem we build on, and the partners we build with"
      >
        <Squiggle
          variant="loop"
          animated
          className="mt-4 opacity-70"
          width={200}
          height={80}
        />
      </PageHero>

      {/* ── ECOSYSTEM ────────────────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <SectionHeader
          index="01 — The ecosystem"
          title={
            <>
              Tools we trust, <em className="font-normal">deeply</em>
            </>
          }
          parenthetical="Text cards on purpose — no logo wall theatre"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ECOSYSTEM.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className={i % 3 === 1 ? "lg:translate-y-6" : ""}>
                <SketchCard className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                    <Tag tone="dusty">{p.tag}</Tag>
                  </div>
                  <h3 className="font-serif font-light text-[26px] leading-tight">
                    {p.name}
                  </h3>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    {p.note}
                  </p>
                </SketchCard>
              </div>
            );
          })}
        </div>
        <Squiggle
          variant="swirl"
          className="hidden lg:block ml-auto mt-6 opacity-50"
          width={170}
          height={66}
        />
      </Section>

      {/* ── PARTNERSHIP MODELS ───────────────────────────────────────────── */}
      <Section className="pt-0">
        <SectionHeader
          index="02 — Partnership models"
          title={
            <>
              Three ways to <em className="font-normal">team up</em>
            </>
          }
          parenthetical="Pick one, or invent a fourth — we're flexible"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MODELS.map((m) => (
            <SketchCard key={m.title} className="flex flex-col gap-5 h-full">
              <Handshake size={30} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-serif font-light text-[28px] leading-tight">
                {m.title}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {m.copy}
              </p>
              <ul className="flex flex-col gap-3 mt-auto pt-2">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <DoodleStar size={16} className="mt-1 shrink-0" />
                    <span className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SectionHeader
          index="03 — How it starts"
          title={
            <>
              From first hello to signed{" "}
              <em className="font-normal">sketch</em>
            </>
          }
          parenthetical="Typically four steps over four-to-six weeks"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS.map((s, i) => (
            <SketchCard key={s.step} className="flex flex-col gap-4 h-full">
              <span className="font-serif font-light text-5xl text-ink/15">
                {s.step}
              </span>
              <h3 className="font-serif font-light text-[22px] leading-tight">
                {s.title}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {s.copy}
              </p>
              {i < PROCESS.length - 1 && (
                <span className="font-sans text-[12px] tracking-tight text-charcoal/60 mt-auto">
                  (then ↓)
                </span>
              )}
            </SketchCard>
          ))}
        </div>
        <Squiggle
          variant="dash"
          className="mt-8 opacity-70"
          width={280}
          height={80}
        />
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
          <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
          <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
            Become a <em className="font-normal">partner</em>
          </h2>
          <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-lg mx-auto">
            (partnerships@ conversations start at{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com?subject=Partnership%20enquiry"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>
            )
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <PillButton to="/contact" variant="dusty" size="lg">
              Start the conversation
            </PillButton>
            <PillButton to="/services" variant="dark" size="lg">
              What we build
            </PillButton>
          </div>
        </SketchCard>
      </Section>
    </div>
  );
}
