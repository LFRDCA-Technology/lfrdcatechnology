"use client";

// ── FAQ — fetched from /api/faqs, filtered client-side, accordion ────────────

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/auth";
import type { Faq } from "@/lib/types";
import {
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FALLBACK_FAQS: Faq[] = [
  {
    id: "fb-1",
    question: "What does LFRDCA actually do, in one sentence?",
    answer:
      "We design, build and run data & AI systems — pipelines, dashboards, models and the platforms underneath them — for companies that want analytics their teams actually use.",
    category: "Services",
    order: 1,
  },
  {
    id: "fb-2",
    question: "How much does a typical project cost?",
    answer:
      "Most fixed-scope projects start around ₹2,50,000 and scale with complexity, data condition and speed. Consultations are ₹15,000 a session, dedicated pods from ₹1,80,000 a month. Exact numbers always follow a free discovery call — see the pricing page for the full menu.",
    category: "Pricing",
    order: 2,
  },
  {
    id: "fb-3",
    question: "How long before we see something real?",
    answer:
      "You’ll see a working slice — real data, real screens — inside the first two to three weeks of any project. We demo weekly after that, because progress you can’t click on doesn’t count.",
    category: "Process",
    order: 3,
  },
  {
    id: "fb-4",
    question: "Who owns the code and the models?",
    answer:
      "You do, fully, from the first commit. Everything lives in your repositories or is handed over on exit — code, docs, credentials and model artefacts. No hostage situations.",
    category: "Process",
    order: 4,
  },
  {
    id: "fb-5",
    question: "How fast does support respond?",
    answer:
      "Critical issues get a first response within 4 hours, high-priority within 12, normal within 2 working days, low within 5. Retainer clients get the sharper end of those SLAs — details on the support page.",
    category: "Support",
    order: 5,
  },
  {
    id: "fb-6",
    question: "Do you work with clients outside India?",
    answer:
      "Yes — we’ve delivered in nine countries and run async-first rituals that survive time zones. Overlaps with your working hours are agreed before the engagement starts, not discovered in week three.",
    category: "Process",
    order: 6,
  },
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<Faq[]>("/api/faqs");
        if (alive) setFaqs(data);
      } catch {
        if (alive) setFaqs(FALLBACK_FAQS);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((f) => f.category)))],
    [faqs]
  );

  const filtered =
    category === "All" ? faqs : faqs.filter((f) => f.category === category);

  return (
    <div className="flex flex-col">
      <PageHero
        index="FAQ"
        title={
          <>
            Questions, <em className="font-normal">answered</em>.
          </>
        }
        parenthetical="the ones we get on every discovery call — written down once, honestly"
      >
        <Squiggle
          variant="underline"
          color="#81aed9"
          className="mt-2"
          width={300}
          height={26}
        />
      </PageHero>

      <Section className="max-w-4xl">
        <SectionHeader
          index="01 — The lot"
          title={
            <>
              Everything people ask, <em className="font-normal">minus the fluff</em>
            </>
          }
          parenthetical="filter by what you’re wondering about"
          className="mb-10"
        />

        {loading ? (
          <LoadingState label="Fetching the answers…" />
        ) : (
          <>
            {/* Category chips */}
            <div
              className="flex flex-wrap gap-3 mb-10"
              role="tablist"
              aria-label="Filter FAQs by category"
            >
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c)}
                  className={`rounded-[3000px] border-[1.5px] px-5 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-all cursor-pointer ${
                    category === c
                      ? "border-ink bg-ink text-paper shadow-sketch-sm"
                      : "border-ink/25 bg-white text-ink hover:border-ink hover:-translate-y-[1px]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="Nothing in this drawer yet"
                hint="try another category — or ask us directly"
              />
            ) : (
              <div className="rounded-[30px] border-[1.5px] border-dusty bg-white px-6 sm:px-10 py-2 shadow-sketch">
                <Accordion type="single" collapsible className="w-full">
                  {filtered.map((f, i) => (
                    <AccordionItem
                      key={f.id}
                      value={f.id}
                      className="border-b-[1.5px] border-ink/15 last:border-b-0"
                    >
                      <AccordionTrigger className="font-serif text-lg font-light tracking-tight hover:no-underline [&[data-state=open]]:italic py-6">
                        <span className="flex items-baseline gap-4 text-left">
                          <span className="font-serif text-sm text-ink/40 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {f.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal pl-8 sm:pl-10">
                        {f.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </>
        )}
      </Section>

      {/* ── STILL CURIOUS ──────────────────────────────────────────────────── */}
      <Section className="max-w-4xl">
        <SketchCard hover={false} className="relative overflow-hidden text-center py-14">
          <DoodleStar className="absolute top-6 left-8 animate-wiggle opacity-70" size={26} />
          <DoodleStar
            className="absolute bottom-8 right-10 opacity-50"
            size={20}
            color="#81aed9"
          />
          <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl mx-auto">
            Still <em className="font-normal">curious</em>?
          </h2>
          <p className="font-sans text-sm leading-relaxed tracking-tight text-charcoal mt-4 max-w-md mx-auto">
            (Ask us anything over email — the little button bottom-right is
            our AI assistant, and it knows this whole site by heart)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <PillButton to="/contact" variant="solid">
              Ask a human
            </PillButton>
            <PillButton to="/docs" variant="outline">
              Read the API docs
            </PillButton>
          </div>
        </SketchCard>
      </Section>
    </div>
  );
}
