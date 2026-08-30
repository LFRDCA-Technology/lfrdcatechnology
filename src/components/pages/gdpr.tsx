"use client";

// ── GDPR — GDPR-grade care for every LFRDCA user, EU or not ─────────────────

import type { ReactNode } from "react";
import { Link } from "@/lib/router";
import { PageHero, SketchCard } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const TOC_ITEMS: { n: string; label: string; target: string }[] = [
  { n: "01", label: "Our GDPR stance", target: "stance" },
  { n: "02", label: "Lawful bases", target: "bases" },
  { n: "03", label: "Your GDPR rights", target: "rights" },
  { n: "04", label: "How to exercise them", target: "exercise" },
  { n: "05", label: "Data transfers", target: "transfers" },
  { n: "06", label: "DPIA & processors", target: "dpia" },
  { n: "07", label: "DPO contact", target: "dpo" },
];

const RIGHTS: { name: string; desc: string }[] = [
  {
    name: "Right of access",
    desc: "You can ask what personal data we hold about you and get a copy of it, in a readable format.",
  },
  {
    name: "Right to rectification",
    desc: "If something we hold is wrong or out of date, we correct it — most things you can fix yourself from your profile page.",
  },
  {
    name: "Right to erasure",
    desc: "Ask us to delete your data and we will, unless we're legally required to keep a record (invoices, mostly).",
  },
  {
    name: "Right to portability",
    desc: "Your data leaves in a structured, machine-readable format if you want to take it elsewhere — no lock-in, no ransom.",
  },
  {
    name: "Right to object",
    desc: "You can object to processing based on legitimate interest, and we'll stop unless we have an overriding reason we can defend.",
  },
];

export default function GdprPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Legal — GDPR"
          title={
            <>
              GDPR-grade care, <em className="font-normal">no passport</em>{" "}
              required.
            </>
          }
          parenthetical="Last updated: January 2026"
        />
        <DoodleStar
          className="absolute top-24 right-[6%] hidden md:block animate-wiggle"
          size={32}
        />
      </div>

      <div className="px-5 sm:px-8 pb-24 max-w-[720px] mx-auto w-full">
        {/* ── Table of contents ─────────────────────────────────────────────── */}
        <nav aria-label="Sections on this page">
          <SketchCard tone="paper" hover={false} className="p-6 sm:p-8">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal mb-4">
              On this page
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
              {TOC_ITEMS.map((it) => (
                <li key={it.target}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(it.target)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="group flex items-baseline gap-3 text-left w-full"
                  >
                    <span className="font-serif text-sm font-light text-ink/60">
                      {it.n}
                    </span>
                    <span className="font-sans text-[13px] tracking-tight text-charcoal group-hover:text-coral transition-colors">
                      {it.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </SketchCard>
        </nav>

        <Squiggle
          variant="underline"
          color="#81aed9"
          className="mt-10 opacity-90"
          width={300}
          height={26}
        />

        {/* ── Sections ──────────────────────────────────────────────────────── */}
        <LegalSection index="01 —" id="stance" title="Our GDPR stance">
          <p>
            The GDPR is a European regulation, but we don&apos;t treat privacy
            as a citizenship perk. Everyone who uses this platform — Noida,
            Nairobi or Amsterdam — gets the same GDPR-grade care: minimal
            collection, honest purposes, real rights, quick answers.
          </p>
          <p>
            For us this isn&apos;t compliance theatre; it&apos;s just the
            correct way to treat people&apos;s data. We&apos;d rather meet the
            strictest standard once than run two tiers of respect.
          </p>
        </LegalSection>

        <LegalSection index="02 —" id="bases" title="Lawful bases">
          <p>
            GDPR asks a simple question: <em>why</em> are you processing this?
            Our answers, in plain words:
          </p>
          <p>
            <span className="font-medium text-ink">Consent</span> — rarely
            needed here. When we do ask (say, a newsletter), it&apos;s opt-in,
            specific and revocable with one click.{" "}
            <span className="font-medium text-ink">Contract</span> — running
            your account, answering your quote, delivering work you hired us
            for; the processing the service actually requires.{" "}
            <span className="font-medium text-ink">Legitimate interest</span> —
            keeping the platform secure, preventing spam and abuse, and
            understanding in aggregate how the site is used. Interests we&apos;d
            happily defend to your face.
          </p>
        </LegalSection>

        <LegalSection index="03 —" id="rights" title="Your GDPR rights">
          <p>
            The full set, each in a sentence or two:
          </p>
          <ul className="mt-1 flex flex-col gap-4">
            {RIGHTS.map((r) => (
              <li key={r.name} className="pl-5 relative">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[9px] w-[7px] h-[7px] rounded-full border-[1.5px] border-ink"
                />
                <p>
                  <span className="font-semibold text-ink">{r.name}.</span>{" "}
                  {r.desc}
                </p>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection index="04 —" id="exercise" title="How to exercise them">
          <p>
            Email{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>{" "}
            with &ldquo;Data request&rdquo; in the subject line, from the
            address on your account. Tell us what you&apos;d like — access,
            correction, export, deletion — and we&apos;ll verify it&apos;s
            really you before touching anything.
          </p>
          <p>
            We commit to a substantive response within 30 days, and in
            practice it&apos;s usually a matter of days. No fee, no forms, no
            runaround — unless a request is genuinely excessive, in which case
            we&apos;ll talk to you about it like humans.
          </p>
        </LegalSection>

        <LegalSection index="05 —" id="transfers" title="Data transfers">
          <p>
            Your data is stored in India, on infrastructure we control access
            to. India isn&apos;t on the EU&apos;s adequacy list, so for our EU
            users we rely on contractual safeguards — we bind ourselves, in
            writing, to GDPR-grade handling of your data wherever it lives.
          </p>
          <p>
            In practical terms: TLS in transit, encryption at rest,
            role-restricted access and logged entry points. Where we engage a
            sub-processor, it&apos;s under the same obligations, and we&apos;ll
            tell you who they are on request.
          </p>
        </LegalSection>

        <LegalSection index="06 —" id="dpia" title={"DPIA & processors"}>
          <p>
            Before we launch any processing that could be high-risk — new AI
            features, large-scale data work, anything novel — we run a Data
            Protection Impact Assessment and keep it on file. If a DPIA ever
            says &ldquo;don&apos;t&rdquo;, we don&apos;t.
          </p>
          <p>
            Our processor list is deliberately short: hosting, email, and very
            little else. Every processor is vetted for security and data
            handling before they touch anything, bound by contract, and listed
            for you on request.
          </p>
        </LegalSection>

        <LegalSection index="07 —" id="dpo" title="DPO contact">
          <p>
            We&apos;re a lean team, so we don&apos;t keep a separate Data
            Protection Officer on payroll — instead, our privacy inbox is
            monitored daily and treated as the DPO contact for everything:
            requests, questions, concerns, or a good argument about data
            ethics.
          </p>
          <p>
            Write to{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>{" "}
            or call +91 7361864847. Related reading: our{" "}
            <Link to="/privacy" className="link-coral">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/cookies" className="link-coral">
              Cookies page
            </Link>
            .
          </p>
        </LegalSection>
      </div>
    </div>
  );
}

/* ── Local legal-section primitive (shared pattern across legal pages) ─────── */
function LegalSection({
  index,
  id,
  title,
  children,
}: {
  index: string;
  id: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <span className="font-serif text-sm font-light tracking-widest text-ink/60 block mb-3">
        {index}
      </span>
      <h2 className="font-serif font-light text-3xl leading-[1.1] mb-4 text-balance">
        {title}
      </h2>
      <div className="font-sans text-[15px] leading-[1.75] text-charcoal flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
}
