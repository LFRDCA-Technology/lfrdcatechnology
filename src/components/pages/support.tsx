"use client";

// ── Support — channels, SLAs, and a ticket form that reaches humans ──────────

import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  FieldLabel,
  InlineLink,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  SketchInput,
  SketchSelect,
  SketchTextarea,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { Clock, Mail, Phone, Sparkles } from "lucide-react";

const CHANNELS = [
  {
    icon: Mail,
    title: "Email",
    line1: "lfrdcatechnologies@outlook.com",
    line2: "Replies within 24 hours, Mon–Sat",
    href: "mailto:lfrdcatechnologies@outlook.com",
    action: "Write to us",
  },
  {
    icon: Phone,
    title: "Phone",
    line1: "+91 7361864847",
    line2: "Mon–Sat · 10:00–19:00 IST",
    href: "tel:+917361864847",
    action: "Call us",
  },
  {
    icon: Sparkles,
    title: "Ask AI",
    line1: "The little button, bottom-right",
    line2: "Instant answers, 24×7 — knows this whole site",
    href: null,
    action: "Look down-right",
  },
];

const SLA_ROWS = [
  {
    priority: "Critical",
    response: "Within 4 hours",
    examples: "Production down · data loss risk · full outage of a live model",
    tone: "border-coral text-coral",
  },
  {
    priority: "High",
    response: "Within 12 hours",
    examples: "Broken pipeline · model serving degraded · dashboard dead",
    tone: "border-ink text-ink",
  },
  {
    priority: "Normal",
    response: "Within 2 working days",
    examples: "Data discrepancies · access requests · performance questions",
    tone: "border-ink text-ink",
  },
  {
    priority: "Low",
    response: "Within 5 working days",
    examples: "Feature wishes · documentation gaps · nice-to-haves",
    tone: "border-ink/40 text-charcoal",
  },
];

const SUBJECT_CATEGORIES = [
  "Technical issue",
  "Billing & invoices",
  "Account access",
  "Feature request",
  "Something else",
];

export default function SupportPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: SUBJECT_CATEGORIES[0],
    message: "",
  });
  const [sending, setSending] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submitTicket(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "A few fields are still blank",
        description: "Name, email and a description of the issue — that’s all we need.",
      });
      return;
    }
    setSending(true);
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `[Support] ${form.category}`,
          message: form.message,
        }),
      });
      toast({
        title: "Ticket received",
        description:
          "A human will reply within the SLA for your issue’s priority — usually sooner.",
      });
      setForm({ name: "", email: "", category: SUBJECT_CATEGORIES[0], message: "" });
    } catch (err) {
      toast({
        title: "Couldn’t file that ticket",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index="Support"
        title={
          <>
            Support that <em className="font-normal">answers</em>.
          </>
        }
        parenthetical="real SLAs, real humans, and an AI assistant for the 3 a.m. questions"
      >
        <p className="font-sans text-sm tracking-tight text-charcoal mt-2">
          Live system status: <InlineLink to="/status">Live system status →</InlineLink>
        </p>
      </PageHero>

      {/* ── CHANNELS ───────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — Three ways to reach us"
          title={
            <>
              Pick a channel, <em className="font-normal">any</em> channel
            </>
          }
          parenthetical="they all land in the same inbox, tended by the same people"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHANNELS.map((ch, i) => (
            <div key={ch.title} className={i === 1 ? "md:translate-y-6" : ""}>
              <SketchCard className="h-full flex flex-col gap-4">
                <ch.icon strokeWidth={1.5} className="w-8 h-8" aria-hidden="true" />
                <h3 className="font-serif font-light text-2xl leading-tight">
                  {ch.title}
                </h3>
                <div className="flex flex-col gap-1">
                  {ch.href ? (
                    <a
                      href={ch.href}
                      className="font-sans text-[14px] font-semibold tracking-tight text-coral link-coral break-all"
                    >
                      {ch.line1}
                    </a>
                  ) : (
                    <span className="font-sans text-[14px] font-semibold tracking-tight">
                      {ch.line1}
                    </span>
                  )}
                  <span className="font-sans text-[13px] tracking-tight text-charcoal">
                    {ch.line2}
                  </span>
                </div>
                <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-charcoal mt-auto">
                  ({ch.action})
                </span>
              </SketchCard>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SLA TABLE ──────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="02 — Response times"
          title={
            <>
              SLAs we actually <em className="font-normal">put in writing</em>
            </>
          }
          parenthetical="first-response commitments, measured from the moment your ticket lands"
          className="mb-10"
        />

        <div className="rounded-[30px] border-[1.5px] border-dusty overflow-hidden bg-white shadow-sketch">
          {/* header row */}
          <div className="hidden sm:grid grid-cols-[160px_220px_1fr] gap-6 px-8 py-5 bg-paper border-b-[1.5px] border-ink/10">
            {["Priority", "First response", "Typical examples"].map((h) => (
              <span
                key={h}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal"
              >
                {h}
              </span>
            ))}
          </div>
          {SLA_ROWS.map((row) => (
            <div
              key={row.priority}
              className="grid grid-cols-1 sm:grid-cols-[160px_220px_1fr] gap-2 sm:gap-6 px-8 py-5 border-t-[1.5px] border-ink/10 first:border-t-0 items-baseline"
            >
              <span
                className={`inline-flex items-center rounded-[3000px] border-[1.5px] px-4 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] w-fit ${row.tone}`}
              >
                {row.priority}
              </span>
              <span className="font-serif font-light text-lg leading-tight">
                {row.response}
              </span>
              <span className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                {row.examples}
              </span>
            </div>
          ))}
        </div>
        <p className="font-sans text-[12px] tracking-tight text-charcoal mt-4">
          (Retainer clients get priority routing — see{" "}
          <InlineLink to="/pricing">pricing</InlineLink> for what a retainer
          includes.)
        </p>
      </Section>

      {/* ── TICKET FORM ────────────────────────────────────────────────────── */}
      <Section className="max-w-4xl">
        <div className="relative">
          <Squiggle
            variant="loop"
            className="absolute -top-10 -left-8 -z-10 opacity-50 hidden md:block"
            width={170}
            height={80}
          />
          <SketchCard hover={false} className="p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <span className="font-serif text-sm font-light tracking-widest text-ink/60">
                  03 — Open a ticket
                </span>
                <h2 className="font-serif font-light text-[clamp(26px,4vw,38px)] leading-[1.05]">
                  Tell us what <em className="font-normal">broke</em> (or what should exist)
                </h2>
              </div>
              <Clock strokeWidth={1.5} className="w-7 h-7 mt-2" aria-hidden="true" />
            </div>

            <form onSubmit={submitTicket} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <FieldLabel htmlFor="support-name">Name *</FieldLabel>
                  <SketchInput
                    id="support-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="support-email">Email *</FieldLabel>
                  <SketchInput
                    id="support-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="support-category">What is this about?</FieldLabel>
                <SketchSelect
                  id="support-category"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {SUBJECT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </SketchSelect>
              </div>
              <div>
                <FieldLabel htmlFor="support-message">Describe the issue *</FieldLabel>
                <SketchTextarea
                  id="support-message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="What happened, what you expected, and anything you’d already tried — screenshots welcome at lfrdcatechnologies@outlook.com."
                  required
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <PillButton type="submit" variant="solid" disabled={sending}>
                  {sending ? "Filing…" : "Submit ticket"}
                </PillButton>
                <span className="font-sans text-[12px] tracking-tight text-charcoal">
                  (routed by category — no ticket-number purgatory)
                </span>
              </div>
            </form>
          </SketchCard>
        </div>
      </Section>

      {/* ── FOOTNOTE BAND ──────────────────────────────────────────────────── */}
      <Section className="max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t-[1.5px] border-ink/15 pt-10">
          <div className="flex items-center gap-4">
            <DoodleStar size={26} className="shrink-0" />
            <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal max-w-md">
              Checking whether it’s us, not you?{" "}
              <InlineLink to="/status">Live system status →</InlineLink> —
              uptime, incidents and all.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Tag tone="dusty">99.97% uptime</Tag>
            <Tag tone="dusty">Mon–Sat coverage</Tag>
          </div>
        </div>
      </Section>
    </div>
  );
}
