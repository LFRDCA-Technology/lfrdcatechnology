"use client";

// ── Cookies — the (very short) cookie inventory of LFRDCA Technologies ──────

import type { ReactNode } from "react";
import { Link } from "@/lib/router";
import { PageHero, SketchCard } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const TOC_ITEMS: { n: string; label: string; target: string }[] = [
  { n: "01", label: "What's a cookie?", target: "what" },
  { n: "02", label: "The cookie jar (inventory)", target: "jar" },
  { n: "03", label: "Managing cookies", target: "managing" },
  { n: "04", label: "What we don't use", target: "dont" },
  { n: "05", label: "Updates to this page", target: "updates" },
];

const COOKIE_ROWS: {
  name: string;
  type: string;
  purpose: string;
  lifetime: string;
}[] = [
  {
    name: "lfrdca_token",
    type: "Essential",
    purpose: "Keeps you signed in. httpOnly, so scripts can't read it.",
    lifetime: "7 days",
  },
  {
    name: "preferences",
    type: "—",
    purpose: "None today. Nothing to remember about you yet.",
    lifetime: "—",
  },
  {
    name: "analytics",
    type: "—",
    purpose: "None. We practice what we preach: no creepy tracking.",
    lifetime: "—",
  },
];

export default function CookiesPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Legal — Cookies"
          title={
            <>
              Cookies, the <em className="font-normal">short</em> list.
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
        <LegalSection index="01 —" id="what" title={"What's a cookie?"}>
          <p>
            A cookie is a small note a website tucks into your browser&apos;s
            pocket, so it recognises you when you come back — like a name tag
            you keep from a conference. The site can read its own notes; it
            can&apos;t read anyone else&apos;s.
          </p>
          <p>
            Cookies got a bad reputation because some companies started using
            them to follow people across the entire internet. That&apos;s not
            what happens here. Ours has one job — remembering that you&apos;re
            signed in — and it does that job quietly.
          </p>
        </LegalSection>

        <LegalSection index="02 —" id="jar" title="The cookie jar (inventory)">
          <p>
            Here&apos;s every cookie this platform sets, in one honest little
            table. If a cookie isn&apos;t listed, we never set it.
          </p>
          <div className="mt-2">
            <SketchCard hover={false} className="p-0 sm:p-0 overflow-hidden">
              <div className="overflow-x-auto sketch-scroll">
                <table className="w-full min-w-[520px] text-left border-collapse">
                  <thead>
                    <tr className="border-b-[1.5px] border-ink">
                      <th className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal px-5 sm:px-6 py-4">
                        Cookie
                      </th>
                      <th className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal px-5 py-4">
                        Type
                      </th>
                      <th className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal px-5 py-4">
                        What it does
                      </th>
                      <th className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal px-5 sm:px-6 py-4">
                        Lifetime
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIE_ROWS.map((c) => (
                      <tr
                        key={c.name}
                        className="border-b-[1.5px] border-ink/10 last:border-b-0"
                      >
                        <td className="font-sans text-[13px] font-semibold tracking-tight px-5 sm:px-6 py-4 align-top whitespace-nowrap">
                          {c.name}
                        </td>
                        <td className="font-sans text-[13px] tracking-tight text-charcoal px-5 py-4 align-top whitespace-nowrap">
                          {c.type}
                        </td>
                        <td className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal px-5 py-4 align-top">
                          {c.purpose}
                        </td>
                        <td className="font-sans text-[13px] tracking-tight text-charcoal px-5 sm:px-6 py-4 align-top whitespace-nowrap">
                          {c.lifetime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SketchCard>
          </div>
        </LegalSection>

        <LegalSection index="03 —" id="managing" title="Managing cookies">
          <p>
            Every browser lets you view, block or delete cookies — look for
            &ldquo;site data&rdquo; or &ldquo;cookies&rdquo; in your browser
            settings. Deleting our cookie simply signs you out; you&apos;ll
            sign back in on your next visit, and that&apos;s the entire
            consequence.
          </p>
          <p>
            Because our only cookie is essential, there&apos;s no &ldquo;reject
            optional cookies&rdquo; dance to perform — no banner to click, no
            preferences to manage, no dark patterns to dodge. Blocking it just
            means typing your email once per visit.
          </p>
        </LegalSection>

        <LegalSection index="04 —" id="dont" title={"What we don't use"}>
          <p>
            No third-party advertising trackers. No cross-site pixels. No
            fingerprinting, no session recorders watching your cursor, no
            &ldquo;authorised data partners&rdquo; — whatever those are.
          </p>
          <p>
            We build data systems for a living, which means we know exactly
            how much surveillance is possible. We choose to do none of it.
            Practicing what we preach is the whole point of this page.
          </p>
        </LegalSection>

        <LegalSection index="05 —" id="updates" title="Updates to this page">
          <p>
            If this inventory ever grows — say we add a genuine preference
            cookie someday — this page updates first, along with the
            &ldquo;last updated&rdquo; date above. We&apos;ll never quietly
            slide a tracker into the jar.
          </p>
          <p>
            Care about this stuff? Read our{" "}
            <Link to="/gdpr" className="link-coral">
              GDPR page →
            </Link>
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
