"use client";

// ── Pricing — four engagement models, honest math ────────────────────────────

import {
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { Check } from "lucide-react";

const MODELS = [
  {
    name: "Consultation",
    price: "₹15,000",
    unit: "/session",
    pitch: "A half-day data & AI strategy session — roadmap included.",
    inclusions: [
      "Half-day intensive with two senior practitioners",
      "Current-state review of your data & AI estate",
      "Prioritised opportunity map (impact vs effort)",
      "A written, jargon-free 90-day roadmap",
      "Zero obligation to build with us afterwards",
    ],
    popular: false,
  },
  {
    name: "Project",
    price: "from ₹2,50,000",
    unit: "fixed",
    pitch: "Fixed scope & timeline, dedicated pod, weekly demos.",
    inclusions: [
      "Fixed scope, fixed timeline, fixed price — in writing",
      "Dedicated pod: engineer + analyst + PM",
      "Weekly live demos, never status-deck theatre",
      "All code, docs and credentials handed over",
      "30 days of post-launch support included",
    ],
    popular: true,
  },
  {
    name: "Dedicated team",
    price: "from ₹1,80,000",
    unit: "/month",
    pitch: "An embedded data/AI pod working to your priorities.",
    inclusions: [
      "Embedded pod of 2+ data/AI specialists",
      "Works inside your tools, rituals and priorities",
      "Monthly rolling — no yearly lock-in",
      "Your processes, our craft and code reviews",
      "Scale up or down with 30 days’ notice",
    ],
    popular: false,
  },
  {
    name: "Retainer",
    price: "from ₹60,000",
    unit: "/month",
    pitch: "Analytics ops, model monitoring and support SLAs.",
    inclusions: [
      "Analytics operations — pipelines kept alive",
      "Model monitoring, drift alerts and retraining",
      "Support with real SLAs (see the support page)",
      "Quarterly performance reviews with receipts",
      "A named human who knows your stack",
    ],
    popular: false,
  },
];

const PRICE_FACTORS = [
  {
    title: "Complexity",
    blurb:
      "One well-behaved data source is a sketch; nine fragmented systems with decade-old schemas is an excavation. Both are doable — one simply takes more ink.",
  },
  {
    title: "Data condition",
    blurb:
      "If your data arrives clean and documented, we start building on day one. If it needs archaeology first, we’ll say so upfront and scope it honestly.",
  },
  {
    title: "Speed",
    blurb:
      "Normal pace costs normal money. A war-room timeline with weekend rotations costs more — and we’ll tell you when the rush isn’t worth it.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="Pricing"
        title={
          <>
            Simple pricing, <em className="font-normal">honest</em> math.
          </>
        }
        parenthetical="no discovery-call ambush, no quote-you-didn’t-ask-for — the numbers are right here"
      >
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag tone="dusty">Prices in INR</Tag>
          <Tag tone="dusty">GST extra</Tag>
          <Tag tone="coral">Discovery calls are free</Tag>
        </div>
      </PageHero>

      {/* ── ENGAGEMENT MODELS ──────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — Ways to work together"
          title={
            <>
              Four ways in, depending on <em className="font-normal">where you are</em>
            </>
          }
          parenthetical="from one sharp conversation to a pod that feels like your own team"
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
          {MODELS.map((m) => (
            <div key={m.name} className={m.popular ? "sm:translate-y-6" : ""}>
              <SketchCard
                hover={false}
                className={`h-full flex flex-col gap-5 relative ${
                  m.popular
                    ? "border-ink shadow-sketch-dusty"
                    : ""
                }`}
              >
                {m.popular && (
                  <div className="absolute -top-4 right-6">
                    <Tag tone="coral">Most popular</Tag>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className="font-serif font-light text-sm text-ink/50">
                    {m.name}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-serif font-light text-[clamp(28px,4vw,40px)] leading-none">
                      {m.price}
                    </span>
                    <span className="font-sans text-[13px] tracking-tight text-charcoal">
                      {m.unit}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    {m.pitch}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {m.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <Check
                        strokeWidth={1.5}
                        className="w-[18px] h-[18px] mt-[2px] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <PillButton
                    to="/quote"
                    variant={m.popular ? "solid" : "outline"}
                    full
                  >
                    Start here
                  </PillButton>
                </div>
              </SketchCard>
            </div>
          ))}
        </div>

        <p className="font-sans text-[13px] tracking-tight text-charcoal mt-12 text-center">
          (All prices in INR, exclusive of GST — exact quotes after a free
          discovery call)
        </p>
      </Section>

      {/* ── WHAT MOVES THE PRICE ───────────────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              What moves the <em className="font-normal">price</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (the three dials we turn, honestly)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRICE_FACTORS.map((f, i) => (
              <div key={f.title} className="flex flex-col gap-3">
                <span className="font-serif font-light text-5xl text-paper/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif font-light text-2xl leading-tight">
                  {f.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-paper/70">
                  {f.blurb}
                </p>
              </div>
            ))}
          </div>
          <Squiggle variant="wave" color="#81aed9" className="mt-12 opacity-70" width={520} height={44} />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <Section className="max-w-3xl text-center">
        <div className="relative">
          <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={36} />
          <h2 className="font-serif font-light text-[clamp(28px,4.5vw,46px)] leading-[1.05]">
            The discovery call is free — <em className="font-normal">the honesty</em> is included
          </h2>
          <p className="font-sans text-sm leading-relaxed tracking-tight text-charcoal mt-5 max-w-md mx-auto">
            (thirty minutes, a real engineer on the call, and a straight
            answer on whether you even need us — sometimes you don’t)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <PillButton to="/quote" variant="solid" size="lg">
              Request a quote
            </PillButton>
            <PillButton to="/faq" variant="outline" size="lg">
              Pricing FAQs
            </PillButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
