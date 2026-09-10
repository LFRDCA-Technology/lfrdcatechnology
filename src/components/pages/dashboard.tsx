"use client";

// ── Dashboard — the member's corner of the LFRDCA platform ──────────────────

import { Link, navigateTo } from "@/lib/router";
import { useAuth } from "@/lib/auth";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import {
  Activity,
  BookOpen,
  Compass,
  LifeBuoy,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const QUICK_LINKS: { icon: LucideIcon; title: string; desc: string; to: string }[] = [
  {
    icon: Compass,
    title: "Explore services",
    desc: "Eight crafts, from data engineering to production AI.",
    to: "/services",
  },
  {
    icon: BookOpen,
    title: "Read the journal",
    desc: "Field notes on data, AI and the craft of building.",
    to: "/blog",
  },
  {
    icon: PenLine,
    title: "Request a quote",
    desc: "Tell us the problem — we'll sketch the plan.",
    to: "/quote",
  },
  {
    icon: LifeBuoy,
    title: "Get support",
    desc: "Stuck on something? We answer fast.",
    to: "/support",
  },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingState label="Opening your sketchbook…" />;

  if (!user) {
    return (
      <div className="flex-1 px-5 py-32 max-w-md mx-auto w-full flex flex-col items-center text-center">
        <DoodleStar className="mb-6 animate-wiggle" size={38} />
        <EmptyState
          title="This sketchbook is members-only"
          hint="sign in to see your dashboard"
        />
        <PillButton to="/login" variant="solid" className="mt-6">
          Sign in
        </PillButton>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0] || "friend";
  const initials =
    user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "LF";
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Account — Dashboard"
          title={
            <>
              Hey, {firstName} <em className="font-normal">hello</em>.
            </>
          }
          parenthetical="your corner of the platform"
        />
        <DoodleStar
          className="absolute top-24 right-[6%] hidden md:block animate-wiggle"
          size={32}
        />
      </div>

      <Section className="flex flex-col gap-12 sm:gap-16">
        {/* ── Account overview ──────────────────────────────────────────────── */}
        <SketchCard hover={false} className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            {user.avatar ? (
              <CircularImage src={user.avatar} alt={user.name} size={96} />
            ) : (
              <div
                aria-hidden="true"
                className="w-[96px] h-[96px] rounded-full bg-white border-[1.5px] border-ink shadow-sketch-sm flex items-center justify-center font-serif font-light text-3xl shrink-0"
              >
                {initials}
              </div>
            )}
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif font-light text-[clamp(24px,4vw,34px)] leading-tight">
                  {user.name}
                </h2>
                <Tag tone={user.role === "ADMIN" ? "coral" : "dusty"}>
                  {user.role}
                </Tag>
              </div>
              <p className="font-sans text-sm tracking-tight text-charcoal">
                {user.email}
              </p>
              <p className="font-sans text-[13px] tracking-tight text-charcoal">
                {user.company ? user.company : "(no company on file yet)"} ·{" "}
                {user.phone ? user.phone : "(no phone on file yet)"}
              </p>
              <p className="font-sans text-[12px] uppercase tracking-[0.12em] text-charcoal mt-1">
                Member since {memberSince}
              </p>
            </div>
          </div>
        </SketchCard>

        {/* ── Quick links ───────────────────────────────────────────────────── */}
        <div>
          <h3 className="font-serif font-light text-[clamp(24px,4vw,34px)] leading-tight mb-2">
            Where to <em className="font-normal">next</em>?
          </h3>
          <p className="font-sans text-sm tracking-tight text-charcoal mb-8">
            (the four doors members walk through most)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_LINKS.map((q) => (
              <Link key={q.to} to={q.to} className="group">
                <SketchCard className="h-full flex flex-col gap-4">
                  <q.icon
                    strokeWidth={1.5}
                    className="w-8 h-8 text-ink group-hover:-rotate-6 transition-transform"
                    aria-hidden="true"
                  />
                  <h4 className="font-serif font-light text-xl leading-snug group-hover:italic transition-all">
                    {q.title}
                  </h4>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    {q.desc}
                  </p>
                  <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral mt-auto group-hover:translate-x-1 transition-transform">
                    Go →
                  </span>
                </SketchCard>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Shortcuts + sign out ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
          <SketchCard hover={false} className="p-6 sm:p-8">
            <h3 className="font-serif font-light text-2xl mb-1">
              Your <em className="font-normal">shortcuts</em>
            </h3>
            <p className="font-sans text-[12px] tracking-tight text-charcoal mb-4">
              (recent additions to the platform)
            </p>
            <ul>
              <ShortcutRow
                icon={Sparkles}
                title="AI assistant"
                desc="Ask anything about LFRDCA — it lives in the bottom-right corner."
              />
              <ShortcutRow
                icon={BookOpen}
                title="Documentation"
                desc="How the platform, APIs and engagements work."
                to="/docs"
              />
              <ShortcutRow
                icon={Activity}
                title="Platform status"
                desc="Live uptime and incident notes, kept honest."
                to="/status"
                last
              />
            </ul>
          </SketchCard>

          <div className="flex flex-col gap-4 lg:min-w-[220px]">
            <PillButton to="/profile" variant="outline">
              Edit profile
            </PillButton>
            <PillButton
              variant="solid"
              type="button"
              onClick={async () => {
                await logout();
                navigateTo("/");
              }}
            >
              Sign out
            </PillButton>
            <Squiggle
              variant="spiral"
              className="hidden lg:block opacity-60 mx-auto"
              width={110}
              height={86}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ── Shortcut list row ─────────────────────────────────────────────────────── */
function ShortcutRow({
  icon: Icon,
  title,
  desc,
  to,
  last,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  to?: string;
  last?: boolean;
}) {
  const inner = (
    <div
      className={`flex items-start gap-4 py-4 ${
        last ? "" : "border-b-[1.5px] border-ink/10"
      }`}
    >
      <Icon
        strokeWidth={1.5}
        className="w-5 h-5 mt-0.5 shrink-0 text-ink"
        aria-hidden="true"
      />
      <div>
        <p className="font-sans text-[14px] font-semibold tracking-tight">
          {title}
        </p>
        <p className="font-sans text-[13px] tracking-tight text-charcoal leading-relaxed">
          {desc}
        </p>
      </div>
      {to && (
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral ml-auto shrink-0 group-hover:translate-x-1 transition-transform">
          Open →
        </span>
      )}
    </div>
  );
  if (to) {
    return (
      <li>
        <Link to={to} className="group block">
          {inner}
        </Link>
      </li>
    );
  }
  return <li>{inner}</li>;
}
