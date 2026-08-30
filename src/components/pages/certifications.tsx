"use client";

// ── Certifications — trust, verified. Compliance & security posture ──────────

import {
  BadgeCheck,
  FileBadge,
  Globe,
  KeyRound,
  Lock,
  Radar,
  Scale,
  ShieldCheck,
  Siren,
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

const CERTS = [
  {
    icon: ShieldCheck,
    name: "ISO/IEC 27001:2022",
    scope: "Information security management",
    means:
      "Our entire operation — studio, cloud, laptops and the humans between them — runs under a certified ISMS. Your data is handled to an internationally audited standard, not just good intentions.",
    tag: "Certified",
  },
  {
    icon: FileBadge,
    name: "SOC 2 Type II",
    scope: "Security, availability & confidentiality",
    means:
      "An independent auditor watched our controls for months, not just on demo day. For US and global clients, this is the checkbox that unblocks procurement without a single extra call.",
    tag: "Audited",
  },
  {
    icon: Globe,
    name: "GDPR-ready",
    scope: "EU data protection alignment",
    means:
      "Data minimisation, purpose limitation, right-to-erasure workflows — designed into every pipeline we build, so European user data is treated by default, not by exception.",
    tag: "Aligned",
  },
  {
    icon: Scale,
    name: "DPDP Act (India) aligned",
    scope: "Digital Personal Data Protection, 2023",
    means:
      "Consent management, data-fiduciary obligations and breach-notification readiness for Indian personal data — baked into our engagement templates and platform defaults.",
    tag: "Aligned",
  },
  {
    icon: BadgeCheck,
    name: "ISO 9001:2015",
    scope: "Quality management",
    means:
      "Every project follows a documented delivery lifecycle — discovery, review gates, handover checklists. Quality isn't a hero engineer; it's a system anyone can audit.",
    tag: "Certified",
  },
];

const PRACTICES = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    copy: "AES-256 at rest, TLS 1.3 in transit — for client data and our own. Key rotation on a schedule, not on a whim.",
  },
  {
    icon: Radar,
    title: "Regular VAPT audits",
    copy: "Independent vulnerability assessment and penetration testing at least twice a year, plus after any major architecture change.",
  },
  {
    icon: KeyRound,
    title: "Quarterly access reviews",
    copy: "Least-privilege by default; every credential and dataset grant is re-reviewed each quarter and revoked the day someone doesn't need it.",
  },
  {
    icon: Siren,
    title: "Tested incident response",
    copy: "A written, rehearsed playbook — detection, containment, disclosure. Clients hear about incidents from us, with timestamps, not from the news.",
  },
];

export default function CertificationsPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 07 · Trust & compliance"
        title={
          <>
            Trust, <em className="font-normal">verified.</em>
          </>
        }
        parenthetical="Certificates on the wall, controls in the pipelines"
      >
        <Squiggle
          variant="underline"
          animated
          className="mt-4 opacity-80"
          width={260}
          height={26}
        />
      </PageHero>

      {/* ── CERTIFICATION CARDS ──────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <SectionHeader
          index="01 — The paperwork"
          title={
            <>
              Five frameworks we hold{" "}
              <em className="font-normal">ourselves</em> to
            </>
          }
          parenthetical="Each card says what it actually means for your procurement team"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.name}
                className={
                  i === 1 ? "lg:translate-y-6" : i === 3 ? "lg:translate-y-6" : ""
                }
              >
                <SketchCard className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
                    <Tag tone="dusty">{c.tag}</Tag>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif font-light text-[24px] leading-tight">
                      {c.name}
                    </h3>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal">
                      {c.scope}
                    </p>
                  </div>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    <span className="font-semibold">What it means for you: </span>
                    {c.means}
                  </p>
                </SketchCard>
              </div>
            );
          })}
          {/* filler cell with doodle for the 5-card grid */}
          <div className="hidden lg:flex translate-y-6">
            <div className="flex flex-col items-center justify-center gap-4 w-full rounded-[30px] border-[1.5px] border-dashed border-ink/40 p-8 text-center">
              <DoodleStar size={30} className="animate-wiggle" />
              <p className="font-serif font-light italic text-xl leading-snug">
                HIPAA &amp; PCI-DSS scopes on client engagements, assessed
                per-project
              </p>
              <p className="font-sans text-[12px] tracking-tight text-charcoal">
                (we&apos;ll bring the annexure to the call)
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECURITY PRACTICES ───────────────────────────────────────────── */}
      <Section className="pt-0">
        <SectionHeader
          index="02 — The daily practice"
          title={
            <>
              Security isn&apos;t a badge — it&apos;s a{" "}
              <em className="font-normal">Tuesday</em>
            </>
          }
          parenthetical="What we actually do between audits"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {PRACTICES.map((p) => {
            const Icon = p.icon;
            return (
              <SketchCard key={p.title} className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0 w-[52px] h-[52px] rounded-full bg-white border-[1.5px] border-ink shadow-sketch-sm flex items-center justify-center">
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-light text-[24px] leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    {p.copy}
                  </p>
                </div>
              </SketchCard>
            );
          })}
        </div>
        <Squiggle
          variant="wave"
          className="mt-10 opacity-60"
          width={420}
          height={40}
        />
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
          <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
          <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
            Request our <em className="font-normal">security pack</em>
          </h2>
          <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
            (Certificates, audit summaries, DPA templates and the incident
            response overview — one email, no forms)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <PillButton to="/contact" variant="dusty" size="lg">
              Request the pack
            </PillButton>
            <PillButton to="/faq" variant="dark" size="lg">
              Security FAQs
            </PillButton>
          </div>
        </SketchCard>
      </Section>
    </div>
  );
}
