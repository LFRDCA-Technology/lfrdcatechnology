"use client";

// ── Coming soon — product previews leaking early from the lab ────────────────

import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  CircularImage,
  FieldLabel,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  SketchInput,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, HandArrow, Squiggle } from "@/components/site/squiggle";

const PRODUCTS = [
  {
    name: "LFRDCA Autopilot",
    blurb:
      "Natural-language analytics for everyone — ask your warehouse a question in plain Hindi or English, get a chart, a number and the SQL it came from.",
    image: "/images/blog-4.png",
    progress: 70,
    eta: "internal alpha now · public beta soon-ish",
  },
  {
    name: "Synthetic Data Studio",
    blurb:
      "Privacy-safe data generation for teams who can’t ship real customer data into demos, tests or training pipelines — statistically faithful, legally boring.",
    image: "/images/blog-8.png",
    progress: 45,
    eta: "pilot with two design partners underway",
  },
  {
    name: "Edge AI Toolkit",
    blurb:
      "Tiny models, big outcomes — compress and deploy inference to shop-floor devices, POS terminals and places the cloud simply can’t reach.",
    image: "/images/blog-5.png",
    progress: 30,
    eta: "benchmarks look great; the docs don’t exist yet",
  },
];

/** Hand-drawn dashed progress line with a filled portion. */
function ProgressLine({ pct }: { pct: number }) {
  return (
    <svg
      viewBox="0 0 220 14"
      width="100%"
      height={14}
      fill="none"
      aria-hidden="true"
      className="w-full"
    >
      <path
        d="M6 10 C 55 5, 100 12, 140 7 C 165 4, 190 9, 214 6"
        stroke="#000000"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
        pathLength={100}
      />
      <path
        d="M6 10 C 55 5, 100 12, 140 7 C 165 4, 190 9, 214 6"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${pct} 100`}
      />
    </svg>
  );
}

export default function ComingSoonPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  async function notify(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "An email would help",
        description: "Pop your address in — that’s the whole form.",
      });
      return;
    }
    setSubscribing(true);
    try {
      const res = await apiFetch<{ ok: boolean; already: boolean }>(
        "/api/newsletter",
        { method: "POST", body: JSON.stringify({ email }) }
      );
      if (res.already) {
        toast({
          title: "You’re already on the list",
          description: "Which means you’ll hear about these first. Nice.",
        });
      } else {
        toast({
          title: "You’re on the early list",
          description: "We’ll write the moment something leaves the lab.",
        });
      }
      setEmail("");
    } catch (err) {
      toast({
        title: "Couldn’t subscribe",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index="Coming soon"
        title={
          <>
            The lab <em className="font-normal">leaks</em> early.
          </>
        }
        parenthetical="three products we’re building between client work — shown here before the landing pages exist"
      >
        <Squiggle
          variant="underline"
          color="#81aed9"
          className="mt-2"
          width={280}
          height={24}
        />
      </PageHero>

      {/* ── PRODUCT PREVIEWS ───────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — In the lab"
          title={
            <>
              Sketches on the <em className="font-normal">workbench</em>
            </>
          }
          parenthetical="progress lines are honest — they move only when something actually ships"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p, i) => (
            <div key={p.name} className={i === 1 ? "lg:translate-y-8" : ""}>
              <SketchCard className="h-full flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <CircularImage
                    src={p.image}
                    alt={`${p.name} — a product in the LFRDCA lab`}
                    size={110}
                  />
                  <Tag tone="coral">In the lab</Tag>
                </div>

                <h3 className="font-serif font-light text-[24px] leading-tight">
                  {p.name}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                  {p.blurb}
                </p>

                <div className="mt-auto flex flex-col gap-2 pt-2">
                  <ProgressLine pct={p.progress} />
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[12px] tracking-tight text-charcoal">
                      {p.eta}
                    </span>
                    <span className="font-serif italic text-sm">
                      {p.progress}% sketched
                    </span>
                  </div>
                </div>
              </SketchCard>
            </div>
          ))}
        </div>
      </Section>

      {/* ── GET NOTIFIED ───────────────────────────────────────────────────── */}
      <Section className="max-w-3xl">
        <div className="relative">
          <DoodleStar className="absolute -top-6 left-8 animate-wiggle" size={30} />
          <DoodleStar
            className="absolute -bottom-5 right-12 opacity-50"
            size={22}
            color="#81aed9"
          />
          <SketchCard hover={false} className="text-center py-14 px-6 sm:px-12">
            <div className="hidden sm:flex items-center justify-center gap-1 mb-4">
              <HandArrow width={70} height={46} className="rotate-[160deg]" />
              <span className="font-sans text-[12px] tracking-tight text-charcoal -mr-2">
                (be first, basically)
              </span>
            </div>
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05]">
              Get <em className="font-normal">notified</em> when one ships
            </h2>
            <form
              onSubmit={notify}
              className="flex flex-col sm:flex-row gap-4 sm:items-end max-w-md mx-auto mt-8"
            >
              <div className="flex-1 text-left">
                <FieldLabel htmlFor="coming-soon-email">Email</FieldLabel>
                <SketchInput
                  id="coming-soon-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <PillButton type="submit" variant="solid" disabled={subscribing}>
                {subscribing ? "Subscribing…" : "Notify me"}
              </PillButton>
            </form>
            <p className="font-sans text-[12px] tracking-tight text-charcoal mt-6">
              (No spam — roughly one email per launch, pinky promise)
            </p>
          </SketchCard>
        </div>
      </Section>
    </div>
  );
}
