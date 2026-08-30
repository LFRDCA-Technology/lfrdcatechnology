"use client";

// ── Solution detail — one packaged build, in depth (#/solutions/:slug) ──────
// Serves: data-platform, ai-assistants, analytics-cloud.
// NOTE: like solutions.tsx, this content is curated and lives in code —
// there is deliberately no /api/solutions endpoint.

import { type ReactNode } from "react";
import { Check } from "lucide-react";
import { useSegments } from "@/lib/router";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  StatBlock,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

interface SolutionDetail {
  slug: string;
  brand: string;
  product: string;
  tagline: string;
  image: string;
  paragraphs: string[];
  capabilities: string[];
  outcomes: { label: string; value: string }[];
  inside: { title: string; text: string }[];
  idealFor: string[];
  qa: { q: string; a: string }[];
}

const SOLUTIONS: SolutionDetail[] = [
  {
    slug: "data-platform",
    brand: "LFRDCA",
    product: "DataPlatform",
    tagline: "Lakehouse foundations that grow with you",
    image: "/images/blog-2.png",
    paragraphs: [
      "Most companies don't have a data problem — they have a data-whereabouts problem. Numbers live in six SaaS tools, three spreadsheets and one person's head. The DataPlatform starts by giving all of it one address: a lakehouse foundation that ingests your databases, SaaS tools, event streams and yes, those spreadsheets, into a single governed home.",
      "Under the hood it's deliberately boring technology, assembled with care: orchestrated ingestion pipelines with retries and alerts, modelled tables behind data contracts, lineage that answers “where did this number come from?” in one click, and quality tests that fail loudly before bad data reaches a dashboard. Everything is version-controlled and documented, so it reads like a library — not an attic.",
      "The point isn't the platform; it's what it unblocks. Within three weeks of kickoff your first datasets are live and queryable, and within a quarter every downstream idea — dashboards, ML, AI assistants — has a reliable socket to plug into. Because the cost guardrails are built in, growth in data doesn't have to mean comedy in the cloud bill.",
    ],
    capabilities: [
      "Ingestion pipelines",
      "Lakehouse storage",
      "Data contracts",
      "Lineage & governance",
      "Streaming & batch",
      "Cost guardrails",
    ],
    outcomes: [
      { label: "Time to first insight", value: "3 weeks" },
      { label: "Pipeline reliability", value: "99.9%" },
      { label: "Storage cost cut", value: "−40%" },
    ],
    inside: [
      {
        title: "Ingestion framework",
        text: "Connectors for databases, APIs, SaaS tools and file drops — with scheduling, retries and alerting from day one.",
      },
      {
        title: "Modelled lakehouse",
        text: "Bronze/silver/gold layers with agreed business definitions, so “revenue” means one thing company-wide.",
      },
      {
        title: "Data contracts & quality gates",
        text: "Schema changes get caught at the door; bad rows get quarantined with a paper trail.",
      },
      {
        title: "Lineage & catalogue",
        text: "Every column traceable to its source, searchable by humans, not just by the person who built it.",
      },
      {
        title: "Cost guardrails",
        text: "Budgets, alerts and auto-pausing warehouse slots — before the invoice surprises anyone.",
      },
    ],
    idealFor: [
      "Teams whose data is scattered across more tools than they can name in one breath",
      "Companies planning AI or advanced analytics but missing a trustworthy foundation",
      "Organisations tired of “whose spreadsheet is right?” arguments",
    ],
    qa: [
      {
        q: "Do we have to migrate off our current warehouse?",
        a: "No. The DataPlatform wraps around what you already run — Snowflake, Postgres, BigQuery or a vanilla data lake — and adds the pipelines, contracts and governance on top. Migration, where it happens at all, is optional and usually partial.",
      },
      {
        q: "Who owns the code and infrastructure?",
        a: "You do, entirely. Everything deploys into your cloud account under your keys, documented and handed over. We're happy to operate it with you — but there are no locks and no hostages.",
      },
    ],
  },
  {
    slug: "ai-assistants",
    brand: "LFRDCA",
    product: "Assist",
    tagline: "Enterprise AI copilots that actually know your business",
    image: "/images/ai-lab.png",
    paragraphs: [
      "Most enterprise chatbots fail a simple test: employees try them twice, shrug, and go back to asking Rajesh from accounts. LFRDCA Assist is built to survive the third try. It's an AI copilot grounded in your actual documents, policies, tickets and data — so its answers carry the texture of your business rather than generic model mush.",
      "Under the hood: retrieval-augmented generation over your knowledge base, deployed to the channels your people already live in — web, Slack, Teams, WhatsApp — with human-in-the-loop review for anything consequential and an evaluation harness that scores every answer against ground truth before your users do. Nothing ships on vibes.",
      "Privacy is the quiet superpower. Models can be hosted privately, your data never trains public models, and every answer is logged with its sources — so compliance can audit it line by line. When someone asks “how do you know that?”, the answer is a citation, not a shrug.",
    ],
    capabilities: [
      "RAG over your docs",
      "Multi-channel deployment",
      "Human-in-the-loop review",
      "Evaluation harness",
      "Private model hosting",
      "Analytics on every answer",
    ],
    outcomes: [
      { label: "Support deflect.", value: "62%" },
      { label: "Answer accuracy", value: "94%" },
      { label: "Rollout time", value: "6 weeks" },
    ],
    inside: [
      {
        title: "RAG pipeline",
        text: "Document ingestion, chunking, embeddings and retrieval tuned to your corpus — not a generic index.",
      },
      {
        title: "Channel adapters",
        text: "Web widget, Slack, Teams and WhatsApp, all served by one brain with one source of truth.",
      },
      {
        title: "Human-in-the-loop review",
        text: "Low-confidence answers route to a person, and the verdict feeds straight back into the system.",
      },
      {
        title: "Evaluation harness",
        text: "Golden-question suites scored on accuracy, tone and refusal behaviour — run on every release.",
      },
      {
        title: "Answer analytics",
        text: "Which questions get asked, which answers helped, and where the knowledge gaps actually are.",
      },
    ],
    idealFor: [
      "Support and operations teams drowning in repeat questions",
      "Organisations whose knowledge lives in a thousand documents nobody can find",
      "Companies that want AI adoption without a privacy asterisk",
    ],
    qa: [
      {
        q: "Will it hallucinate at our customers?",
        a: "Every answer is grounded in retrieved documents and cited; when confidence is low, it says “I'm not sure” and routes to a human. The evaluation harness catches regressions before release — accuracy is measured, not assumed.",
      },
      {
        q: "Can it take actions, not just answer?",
        a: "Yes — with guardrails. Assist can be wired to internal APIs to draft, classify and escalate, with human approval required for anything consequential. Action rights are granted per role, and every action is logged.",
      },
    ],
  },
  {
    slug: "analytics-cloud",
    brand: "LFRDCA",
    product: "Insight Cloud",
    tagline: "Self-serve analytics your whole team will open daily",
    image: "/images/data-viz.png",
    paragraphs: [
      "Insight Cloud exists because of a quiet scandal: companies pay for BI tools that 12% of staff open. We flip the model — analytics designed like a product, with a metric layer everyone agrees on, dashboards your Monday meeting actually argues over, and natural-language queries for the spreadsheet people who never asked to become analysts.",
      "The architecture is opinionated in the right places. One semantic layer defines every metric once, so “active customer” means the same thing in every report. Self-serve dashboards are version-controlled like code, alerts and digests push insights to inboxes instead of waiting to be visited, and embedded analytics puts the numbers inside the tools where decisions actually happen.",
      "The result reads like adoption statistics, not deployment statistics: teams that open analytics daily, report builds that take hours instead of weeks, and — our favourite metric — decisions that cite the dashboard instead of the loudest voice in the room.",
    ],
    capabilities: [
      "Metric layer",
      "Self-serve dashboards",
      "Alerting & digests",
      "Embedded analytics",
      "Natural-language queries",
      "Version-controlled BI",
    ],
    outcomes: [
      { label: "Weekly active users", value: "81%" },
      { label: "Report build time", value: "−70%" },
      { label: "Decisions shipped", value: "2.4×" },
    ],
    inside: [
      {
        title: "Metric layer",
        text: "One governed definition per metric — versioned, documented and owned, so the arguments end.",
      },
      {
        title: "Self-serve dashboards",
        text: "Editorial layouts with the headline number first and drill-down on demand, not fifty equal tiles.",
      },
      {
        title: "Alerting & digests",
        text: "Anomalies and thresholds pushed to email and Slack, instead of waiting to be discovered.",
      },
      {
        title: "Natural-language queries",
        text: "Ask “why did churn spike in March?” and get the query, the chart and the caveats.",
      },
      {
        title: "Version-controlled BI",
        text: "Dashboards live in git, get reviewed like code, and roll back like code.",
      },
    ],
    idealFor: [
      "Teams whose dashboards exist but don't get opened",
      "Leaders tired of three meetings producing four versions of the same number",
      "Companies that want self-serve analytics without metric chaos",
    ],
    qa: [
      {
        q: "Does this replace our current BI tool?",
        a: "Often it wraps it. Insight Cloud sits above Looker, Power BI or Metabase as the semantic and alerting layer — though many clients retire the tools nobody opens once the metric layer exists.",
      },
      {
        q: "How do you keep non-analysts from breaking things?",
        a: "The metric layer is governed; exploration happens on top of it. Self-serve means choosing filters and dimensions from a curated set — power, without the rope.",
      },
    ],
  },
];

const SHIP_STEPS = [
  {
    week: "Week 0",
    name: "Discovery",
    blurb: "We sit with your team, map the data and pick the first slice.",
  },
  {
    week: "Week 2",
    name: "Skeleton live",
    blurb: "First pipelines, assistant or dashboards running on real data.",
  },
  {
    week: "Week 6",
    name: "v1 shipped",
    blurb: "Production release, with docs, monitoring and training done.",
  },
  {
    week: "Ongoing",
    name: "Iterate",
    blurb: "Monthly tune-ups — usage tells us what to build next.",
  },
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

export default function SolutionDetailPage() {
  const segments = useSegments();
  const slug = segments[1] ?? "";

  const index = SOLUTIONS.findIndex((s) => s.slug === slug);
  const solution = index !== -1 ? SOLUTIONS[index] : null;

  if (!slug) {
    return <LoadingState label="Sketching it in…" />;
  }

  if (!solution) {
    return (
      <Section className="pt-32">
        <DoodleStar className="mx-auto mb-4" size={30} />
        <EmptyState
          title="This solution is still being sketched"
          hint="try the full set instead"
        />
        <div className="flex justify-center mt-8">
          <PillButton to="/solutions" variant="outline">
            ← All solutions
          </PillButton>
        </div>
      </Section>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        index={`Solutions — ${pad(index + 1)}`}
        title={
          <>
            {solution.brand}{" "}
            <em className="font-normal">{solution.product}</em>
          </>
        }
        parenthetical={solution.tagline}
      />

      {/* ── HERO SPLIT — portrait + outcomes ─────────────────────────────── */}
      <Section className="pt-0">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="relative shrink-0">
            <CircularImage
              src={solution.image}
              alt={`${solution.brand} ${solution.product}`}
              size={220}
            />
            <span className="absolute -top-7 -left-2 font-serif font-light text-6xl text-ink/20">
              {pad(index + 1)}
            </span>
            <DoodleStar
              className="absolute -bottom-2 -right-4 animate-wiggle"
              size={26}
            />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {solution.outcomes.map((o) => (
              <StatBlock key={o.label} value={o.value} label={o.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── THE PITCH — description paragraphs ───────────────────────────── */}
      <Section>
        <SketchTitle
          index="01 — The pitch"
          title={
            <>
              What it <em className="font-normal">is</em>, plainly
            </>
          }
          parenthetical="no brochure voice, we promise"
        />
        <div className="flex flex-col gap-5 max-w-2xl">
          {solution.paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal"
            >
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* ── CAPABILITIES — 2-col cards ───────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="02 — Capabilities"
          title={
            <>
              What it <em className="font-normal">covers</em>
            </>
          }
          parenthetical="the checklist version"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {solution.capabilities.map((capability) => (
            <SketchCard
              key={capability}
              className="flex items-start gap-4 p-5 sm:p-6"
            >
              <span className="w-9 h-9 shrink-0 rounded-full border-[1.5px] border-dusty bg-white flex items-center justify-center">
                <Check className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                {capability}
              </p>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── WHAT'S INSIDE — feature bullets ──────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="03 — What's inside"
          title={
            <>
              Under the <em className="font-normal">hood</em>
            </>
          }
          parenthetical="the parts that make the whole"
        />
        <div className="max-w-2xl">
          {solution.inside.map((item, i) => (
            <div
              key={item.title}
              className="flex items-start gap-5 py-5 border-b-[1.5px] border-ink/10 last:border-b-0"
            >
              <span className="font-serif font-light text-xl text-ink/40 w-9 shrink-0 pt-0.5">
                {pad(i + 1)}
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="font-sans text-[14px] font-semibold tracking-tight">
                  {item.title}
                </p>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── IDEAL FOR ────────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="04 — Ideal for"
          title={
            <>
              You&apos;ll know it&apos;s you <em className="font-normal">if…</em>
            </>
          }
          parenthetical="three honest criteria"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {solution.idealFor.map((criterion) => (
            <SketchCard key={criterion} className="flex items-start gap-4">
              <span className="w-9 h-9 shrink-0 rounded-full border-[1.5px] border-dusty bg-white flex items-center justify-center">
                <Check className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {criterion}
              </p>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── HOW IT SHIPS — 4 steps ───────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="05 — How it ships"
          title={
            <>
              From kickoff to <em className="font-normal">compounding</em>
            </>
          }
          parenthetical="the same rhythm every time"
        />
        <Squiggle
          variant="dash"
          className="w-full max-w-[420px] h-auto opacity-60 -mb-8"
          width={420}
          height={150}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {SHIP_STEPS.map((step, i) => (
            <div key={step.week} className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-full bg-white border-[1.5px] border-ink shadow-sketch-sm flex items-center justify-center font-serif font-light text-lg">
                {pad(i + 1)}
              </div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                {step.week}
              </p>
              <h3 className="font-serif font-light text-2xl leading-tight">
                {step.name}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {step.blurb}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAIR QUESTIONS — Q&As ────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchTitle
          index="06 — Fair questions"
          title={
            <>
              The things <em className="font-normal">everyone</em> asks
            </>
          }
          parenthetical="asked with eyebrows, answered without flinching"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {solution.qa.map((item) => (
            <SketchCard key={item.q} hover={false} className="flex flex-col gap-4">
              <p className="font-serif font-light italic text-xl leading-snug">
                “{item.q}”
              </p>
              <p className="font-sans text-[14px] leading-[1.75] tracking-tight text-charcoal">
                {item.a}
              </p>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
            <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
            <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              Start with <em className="font-normal">{solution.product}</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
              (six weeks to v1 — bring the messiest data you have)
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
