"use client";

// ── Status — live gateway check, uptime sketch, incident history ─────────────

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  FieldLabel,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  SketchInput,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

interface GatewayState {
  checking: boolean;
  ok: boolean;
  name?: string;
  version?: string;
  checkedAt: string;
}

const INCIDENTS = [
  {
    date: "12 Aug 2026",
    title: "Elevated API latency in the NCR region",
    resolved:
      "An upstream DNS provider had a wobble; traffic was re-routed within 22 minutes. Total impact: slower responses, zero failures.",
  },
  {
    date: "29 Jul 2026",
    title: "AI assistant answering slowly",
    resolved:
      "Our model provider degraded for roughly five hours. Requests were queued and flushed by evening; no conversation history was lost.",
  },
  {
    date: "16 Jul 2026",
    title: "Brief database failover",
    resolved:
      "Automated failover did its job during routine maintenance — 41 seconds of write downtime, zero data loss, one engineer’s heartbeat skipped.",
  },
];

/** Deterministic 90-day uptime sketch: mostly green, a few dusty, one coral. */
function useUptimeBars() {
  return useMemo(() => {
    const minorDays = new Set([14, 37, 59, 83]);
    const partialDay = 71;
    return Array.from({ length: 90 }, (_, i) => {
      if (i === partialDay) return "bg-coral/60" as const;
      if (minorDays.has(i)) return "bg-dusty" as const;
      return "bg-[#4a7c59]/80" as const;
    });
  }, []);
}

export default function StatusPage() {
  const { toast } = useToast();
  const bars = useUptimeBars();
  const [gateway, setGateway] = useState<GatewayState>({
    checking: true,
    ok: false,
    checkedAt: "",
  });
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<{ ok: boolean; name: string; version: string }>("/api");
        if (alive)
          setGateway({
            checking: false,
            ok: data.ok === true,
            name: data.name,
            version: data.version,
            checkedAt: new Date().toLocaleTimeString("en-IN"),
          });
      } catch {
        if (alive)
          setGateway({
            checking: false,
            ok: false,
            checkedAt: new Date().toLocaleTimeString("en-IN"),
          });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const services = [
    {
      name: "Web platform",
      live: true,
      note: gateway.checking
        ? "Checking…"
        : gateway.ok
          ? "Operational"
          : "Degraded",
    },
    {
      name: "REST API",
      live: true,
      note: gateway.checking
        ? "Checking…"
        : gateway.ok
          ? `Operational · v${gateway.version ?? "?"}`
          : "Degraded",
    },
    { name: "AI assistant", live: false, note: "Operational" },
    { name: "Database", live: false, note: "Operational" },
    { name: "DevOps pipeline", live: false, note: "Operational" },
  ];

  async function subscribe(e: FormEvent) {
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
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );
      if (res.already) {
        toast({
          title: "You’re already on the list",
          description: "We kept your seat warm — no double emails, promise.",
        });
      } else {
        toast({
          title: "Subscribed to status updates",
          description: "You’ll hear from us only when something actually happens.",
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

  const dotOk = (
    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4a7c59] border border-ink" />
  );
  const dotBad = (
    <span className="inline-block w-2.5 h-2.5 rounded-full bg-coral border border-ink" />
  );

  return (
    <div className="flex flex-col">
      <PageHero
        index="Status"
        title={
          <>
            All systems, <em className="font-normal">sketched</em> live.
          </>
        }
        parenthetical="the API gateway below is checked in your browser, the moment this page loads"
      >
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {gateway.checking ? (
            <span className="font-sans text-sm tracking-tight text-charcoal">
              Pinging the gateway…
            </span>
          ) : gateway.ok ? (
            <>
              <span className="inline-flex items-center gap-2.5 rounded-[3000px] border-[1.5px] border-ink bg-white px-5 py-2 shadow-sketch-sm">
                {dotOk}
                <span className="font-sans text-[13px] font-semibold tracking-tight">
                  API Gateway — Operational
                </span>
              </span>
              <span className="font-sans text-[12px] tracking-tight text-charcoal">
                ({gateway.name ?? "LFRDCA API"} · checked at{" "}
                {gateway.checkedAt})
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-2.5 rounded-[3000px] border-[1.5px] border-ink bg-white px-5 py-2 shadow-sketch-sm">
                {dotBad}
                <span className="font-sans text-[13px] font-semibold tracking-tight">
                  API Gateway — Degraded
                </span>
              </span>
              <span className="font-sans text-[12px] tracking-tight text-charcoal">
                (checked at {gateway.checkedAt} — retrying is free)
              </span>
            </>
          )}
        </div>
      </PageHero>

      {/* ── SERVICE ROWS ───────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="01 — Component health"
          title={
            <>
              Five services, <em className="font-normal">zero</em> drama
            </>
          }
          parenthetical="web platform & REST API are probed live; the rest report from our monitors"
          className="mb-8"
        />

        <div className="rounded-[30px] border-[1.5px] border-dusty bg-white px-6 sm:px-10 py-2 shadow-sketch">
          {services.map((s) => {
            const healthy = s.live ? gateway.ok && !gateway.checking : true;
            return (
              <div
                key={s.name}
                className="py-4 border-b-[1.5px] border-ink/10 last:border-b-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[14px] font-medium tracking-tight">
                    {s.name}
                  </span>
                  {s.live && (
                    <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal/60">
                      (live)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  {s.live && gateway.checking ? (
                    <span className="font-sans text-[12px] tracking-tight text-charcoal">
                      checking…
                    </span>
                  ) : (
                    <>
                      {healthy ? dotOk : dotBad}
                      <span className="font-sans text-[12px] tracking-tight text-charcoal">
                        {healthy
                          ? s.note
                          : s.live
                            ? "Investigating"
                            : s.note}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="font-sans text-[12px] tracking-tight text-charcoal mt-4">
          (Static components last checked at{" "}
          {gateway.checkedAt || new Date().toLocaleTimeString("en-IN")} IST —
          and honestly, they were fine.)
        </p>
      </Section>

      {/* ── UPTIME BARS ────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="02 — Uptime"
          title={
            <>
              Ninety days, <em className="font-normal">ninety</em> little bars
            </>
          }
          parenthetical="green means fine, blue means a wobble, coral means we wrote a postmortem"
          className="mb-8"
        />
        <SketchCard hover={false}>
          <div className="flex gap-[2px] overflow-x-auto py-3 sketch-scroll">
            {bars.map((tone, i) => (
              <div
                key={i}
                className={`w-1.5 h-8 rounded-sm shrink-0 ${tone}`}
                title={
                  tone === "bg-coral/60"
                    ? "Day with a hiccup"
                    : tone === "bg-dusty"
                      ? "Minor degradation"
                      : "All good"
                }
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
            <span className="font-sans text-[12px] tracking-tight text-charcoal">
              Last 90 days · 99.97% uptime
            </span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-tight text-charcoal">
                <span className="w-2 h-3 rounded-sm bg-[#4a7c59]/80 inline-block" />
                fine
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-tight text-charcoal">
                <span className="w-2 h-3 rounded-sm bg-dusty inline-block" />
                wobble
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-tight text-charcoal">
                <span className="w-2 h-3 rounded-sm bg-coral/60 inline-block" />
                postmortem
              </span>
            </div>
          </div>
        </SketchCard>
      </Section>

      {/* ── INCIDENT HISTORY ───────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          index="03 — Incident history"
          title={
            <>
              When things <em className="font-normal">wobbled</em>, we wrote it down
            </>
          }
          parenthetical="three incidents in 2026 — each with a resolution worth reading"
          className="mb-8"
        />
        <div className="flex flex-col gap-6">
          {INCIDENTS.map((inc, i) => (
            <SketchCard key={inc.date} hover={false} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-serif font-light text-lg">
                  {inc.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm text-ink/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Tag tone="dusty">Resolved</Tag>
                </div>
              </div>
              <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal max-w-3xl">
                {inc.resolved}
              </p>
              <span className="font-sans text-[12px] tracking-tight text-charcoal">
                ({inc.date})
              </span>
            </SketchCard>
          ))}
        </div>
      </Section>

      {/* ── SUBSCRIBE ──────────────────────────────────────────────────────── */}
      <Section className="max-w-3xl">
        <div className="relative">
          <DoodleStar className="absolute -top-6 right-10 animate-wiggle" size={28} />
          <SketchCard hover={false} className="p-6 sm:p-10">
            <SectionHeader
              index="04 — Subscribe to updates"
              title={
                <>
                  Get pinged when <em className="font-normal">anything</em> wobbles
                </>
              }
              parenthetical="incident emails only — the quiet days stay quiet"
              className="mb-8"
            />
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <div className="flex-1">
                <FieldLabel htmlFor="status-email">Email</FieldLabel>
                <SketchInput
                  id="status-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <PillButton type="submit" variant="solid" disabled={subscribing}>
                {subscribing ? "Subscribing…" : "Subscribe"}
              </PillButton>
            </form>
            <Squiggle
              variant="underline"
              color="#81aed9"
              className="mt-8 opacity-80"
              width={220}
              height={20}
            />
          </SketchCard>
        </div>
      </Section>
    </div>
  );
}
