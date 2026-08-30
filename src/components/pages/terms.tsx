"use client";

// ── Terms — the plain-language terms of LFRDCA Technologies ─────────────────

import type { ReactNode } from "react";
import { Link } from "@/lib/router";
import { PageHero, SketchCard } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const TOC_ITEMS: { n: string; label: string; target: string }[] = [
  { n: "01", label: "About these terms", target: "about" },
  { n: "02", label: "Who we are", target: "who" },
  { n: "03", label: "Using the platform", target: "using" },
  { n: "04", label: "Our services & engagements", target: "services" },
  { n: "05", label: "Intellectual property", target: "ip" },
  { n: "06", label: "Accounts & security", target: "accounts" },
  { n: "07", label: "Disclaimers", target: "disclaimers" },
  { n: "08", label: "Limitation of liability", target: "liability" },
  { n: "09", label: "Governing law", target: "law" },
  { n: "10", label: "Changes to terms", target: "changes" },
  { n: "11", label: "Contact", target: "contact" },
];

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Legal — Terms"
          title={
            <>
              Terms, without the <em className="font-normal">fog</em>.
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
        <LegalSection index="01 —" id="about" title="About these terms">
          <p>
            These terms are the deal between you and LFRDCA Technologies when
            you use this website and platform — written to be read, not to be
            survived. We&apos;ve kept the legal fog to a minimum on purpose.
          </p>
          <p>
            Where the law allows, the plain meaning of these words governs. If
            a court decides a clause can&apos;t stand, the rest of the sketch
            stays on the page.
          </p>
        </LegalSection>

        <LegalSection index="02 —" id="who" title="Who we are">
          <p>
            LFRDCA Technologies is an AI, data and analytics IT company based
            in Noida Sector 62, Uttar Pradesh 201309, India. We design and
            build data platforms, machine learning systems, analytics and the
            cloud plumbing underneath them — for clients who&apos;d rather
            ship than speculate.
          </p>
          <p>
            You can reach us at{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>{" "}
            or +91 7361864847. A human answers both.
          </p>
        </LegalSection>

        <LegalSection index="03 —" id="using" title="Using the platform">
          <p>
            A few fair asks. Keep your account details accurate; one account
            per person; don&apos;t lend your credentials around. Use the
            platform lawfully — no scraping the content at scale, no probing
            our security without written permission, no uploading anything
            illegal or harmful.
          </p>
          <p>
            We&apos;re tolerant of enthusiasm and intolerant of abuse. Accounts
            that misbehave may be limited or suspended, and we&apos;ll tell
            you why unless the law binds our hands.
          </p>
        </LegalSection>

        <LegalSection
          index="04 —"
          id="services"
          title={"Our services & engagements"}
        >
          <p>
            Everything here follows the same arc: discover, design, build,
            ship. The website describes how we work — but it&apos;s
            informational, not a contract. No engagement exists until we both
            sign one.
          </p>
          <p>
            Actual projects are governed by individual quotes, proposals or
            statements of work. When a signed quote and these terms disagree,
            the signed quote wins for that engagement — timelines, scope,
            fees, and all.
          </p>
        </LegalSection>

        <LegalSection index="05 —" id="ip" title="Intellectual property">
          <p>
            Your content stays yours. Anything you submit — briefs, data,
            documents, feedback — remains your property, and you grant us only
            the licence we need to do the work you asked for.
          </p>
          <p>
            Our content stays ours. The site copy, our designs, our pre-built
            tools, frameworks and reusable components remain the property of
            LFRDCA Technologies. While you respect these terms, you get a
            limited, revocable licence to use the platform for its honest
            purpose.
          </p>
        </LegalSection>

        <LegalSection
          index="06 —"
          id="accounts"
          title={"Accounts & security"}
        >
          <p>
            You&apos;re responsible for keeping your password safe and for
            what happens through your account. Tell us promptly if you suspect
            a breach — we&apos;d much rather reset credentials early than
            investigate late.
          </p>
          <p>
            You can close your account any time by emailing us; we can
            terminate accounts that violate these terms, with notice where
            it&apos;s reasonable to give it.
          </p>
        </LegalSection>

        <LegalSection index="07 —" id="disclaimers" title="Disclaimers">
          <p>
            The website is provided &ldquo;as is&rdquo; — we work hard to keep
            it accurate and online, but we&apos;re honest about the limits of
            both.
          </p>
          <p>
            One thing we refuse to do is make wild guarantees about model
            accuracy. Machine learning outputs are probabilistic, data drifts,
            and anyone promising 100% precision is selling something. We
            commit to honest measurement, clear evaluation and telling you
            what the numbers actually mean.
          </p>
        </LegalSection>

        <LegalSection
          index="08 —"
          id="liability"
          title="Limitation of liability"
        >
          <p>
            To the maximum extent the law allows, LFRDCA Technologies isn&apos;t
            liable for indirect or consequential losses — lost profits, lost
            data through your own channels, lost opportunities, or the
            existential dread of a failed demo.
          </p>
          <p>
            Our total liability for claims connected to the platform is capped
            at the fees you actually paid us in the twelve months before the
            claim. Nothing here excludes liability that Indian law says can&apos;t
            be excluded.
          </p>
        </LegalSection>

        <LegalSection index="09 —" id="law" title="Governing law">
          <p>
            These terms are governed by the laws of India. Any dispute that
            can&apos;t be settled over a good conversation falls to the courts
            of Uttar Pradesh, India.
          </p>
          <p>
            We prefer the conversation. In our experience, almost everything
            is solvable before it becomes a dispute.
          </p>
        </LegalSection>

        <LegalSection index="10 —" id="changes" title="Changes to terms">
          <p>
            We may update these terms as the platform grows. Material changes
            get called out on the site, and the &ldquo;last updated&rdquo;
            date at the top will always tell you which version you&apos;re
            reading.
          </p>
          <p>
            Continuing to use the platform after a change means you accept the
            new terms — so if we ever write something you can&apos;t live
            with, close your account before it takes effect and we&apos;ll
            part as friends.
          </p>
        </LegalSection>

        <LegalSection index="11 —" id="contact" title="Contact">
          <p>
            Questions about any of this? Email{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>{" "}
            or call +91 7361864847. Or write to us at Noida Sector 62,
            Uttar Pradesh 201309, India.
          </p>
          <p>
            Related reading: our{" "}
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
