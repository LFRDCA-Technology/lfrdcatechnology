"use client";

// ── Privacy — the plain-words privacy policy of LFRDCA Technologies ─────────

import type { ReactNode } from "react";
import { Link } from "@/lib/router";
import { PageHero, SketchCard } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const TOC_ITEMS: { n: string; label: string; target: string }[] = [
  { n: "01", label: "What we collect", target: "collect" },
  { n: "02", label: "Why we collect it", target: "why" },
  { n: "03", label: "Cookies & tokens", target: "cookies" },
  { n: "04", label: "What we never do", target: "never" },
  { n: "05", label: "Data storage & security", target: "security" },
  { n: "06", label: "Your rights", target: "rights" },
  { n: "07", label: "Data retention", target: "retention" },
  { n: "08", label: "Contact", target: "contact" },
];

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Legal — Privacy"
          title={
            <>
              Privacy, in <em className="font-normal">plain</em> words.
            </>
          }
          parenthetical="Last updated: August 2026"
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
        <LegalSection index="01 —" id="collect" title="What we collect">
          <p>
            If you create an account, we store the details you hand us: your
            name, your email address, and — only if you choose to add them —
            your phone number and company. If you write to us through the
            contact form, request a quote, or apply for a job, we keep what you
            sent so we can actually reply like humans.
          </p>
          <p>
            We also keep basic usage numbers in aggregate — which pages get
            visited, and roughly when — because building in the dark is no way
            to build. What we don&apos;t collect is the long, creepy inventory:
            no browsing history from other sites, no device fingerprinting, no
            advertising profiles.
          </p>
        </LegalSection>

        <LegalSection index="02 —" id="why" title="Why we collect it">
          <p>
            Three honest reasons. First, to reply — your message deserves an
            answer, and we can&apos;t answer what we never received. Second, to
            improve — knowing which pages people actually read helps us write
            better ones. Third, to keep things safe — rate limits, spam checks
            and access logs exist to hold the line against the internet&apos;s
            less polite residents.
          </p>
          <p>
            That&apos;s the whole list. Nothing is collected &ldquo;just in
            case someone wants to buy it&rdquo;, because no one ever will —
            your data isn&apos;t for sale.
          </p>
        </LegalSection>

        <LegalSection index="03 —" id="cookies" title={"Cookies & tokens"}>
          <p>
            We use exactly one cookie, and it earns its keep. It&apos;s called{" "}
            <span className="font-medium text-ink">lfrdca_token</span> — a
            signed, httpOnly session token that keeps you signed in for up to 7
            days. &ldquo;httpOnly&rdquo; means scripts on the page (ours or
            anyone else&apos;s) can&apos;t read it, which quietly ruins most
            cookie-stealing attacks.
          </p>
          <p>
            There are no analytics cookies, no advertising cookies and no
            consent banner — because there&apos;s nothing to consent to. The
            full, slightly nerdy inventory lives on our{" "}
            <Link to="/cookies" className="link-coral">
              Cookies page
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection index="04 —" id="never" title="What we never do">
          <p>
            We never sell, rent or trade your personal data — not to
            advertisers, not to data brokers, not to &ldquo;trusted
            partners&rdquo; in air quotes. We don&apos;t run third-party ad
            trackers or cross-site pixels, and we don&apos;t follow you around
            the web after you leave.
          </p>
          <p>
            We also don&apos;t surprise you. If our data practices ever change,
            this page changes first — loudly, with a fresh &ldquo;last
            updated&rdquo; date at the top. A privacy policy shouldn&apos;t
            need a detective to read, and our behaviour shouldn&apos;t need a
            lawyer to explain.
          </p>
        </LegalSection>

        <LegalSection
          index="05 —"
          id="security"
          title={"Data storage & security"}
        >
          <p>
            Your password is hashed with bcrypt before it ever touches the
            database — meaning not even we can read it back. If you forget it,
            the only thing we can do is help you set a new one, which is
            exactly how it should be.
          </p>
          <p>
            The platform and its database are hosted in India, everything
            travels over TLS in transit, and data is encrypted at rest. Access
            to production data is restricted to the tiny number of people who
            genuinely need it, logged, and reviewed. We keep the keys honest.
          </p>
        </LegalSection>

        <LegalSection index="06 —" id="rights" title="Your rights">
          <p>
            You can ask to see the data we hold about you, ask us to correct
            it, ask for an export, or ask us to delete your account and its
            data entirely. Email{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>{" "}
            from the address on your account and we&apos;ll take care of it —
            no forms in triplicate, no four-to-six-week silence.
          </p>
          <p>
            We treat these requests as a to-do, not a legal threat. And if
            you&apos;re in the EU, our{" "}
            <Link to="/gdpr" className="link-coral">
              GDPR page
            </Link>{" "}
            spells out the full set of rights you can lean on.
          </p>
        </LegalSection>

        <LegalSection index="07 —" id="retention" title="Data retention">
          <p>
            Account data stays as long as your account is active. Delete the
            account and we remove or anonymise the personal parts within 30
            days — including from our backups, which roll off on a fixed cycle
            so deleted data doesn&apos;t haunt the margins forever.
          </p>
          <p>
            Messages, quote requests and job applications are kept for up to 24
            months for honest business records — taxes, invoices, &ldquo;wasn&apos;t
            there a client in March?&rdquo; — then pruned the same way. Short
            of a legal requirement to keep something, we&apos;d rather hold
            less than more.
          </p>
        </LegalSection>

        <LegalSection index="08 —" id="contact" title="Contact">
          <p>
            Privacy questions, data requests, or just want to argue about
            cookies? Email{" "}
            <a
              href="mailto:lfrdcatechnologies@outlook.com"
              className="link-coral"
            >
              lfrdcatechnologies@outlook.com
            </a>{" "}
            — a human reads it, usually within a few business days. Or write
            to us at Noida Sector 62, Uttar Pradesh 201309, India.
          </p>
          <p>
            Related reading: our{" "}
            <Link to="/terms" className="link-coral">
              Terms
            </Link>
            ,{" "}
            <Link to="/cookies" className="link-coral">
              Cookies
            </Link>{" "}
            and{" "}
            <Link to="/gdpr" className="link-coral">
              GDPR
            </Link>{" "}
            pages.
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
