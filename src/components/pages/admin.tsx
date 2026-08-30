"use client";

// ── Admin — the control room (ADMIN role only) ──────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { apiFetch, useAuth } from "@/lib/auth";
import type { AdminOverview } from "@/lib/types";
import {
  DoodleStar,
  Squiggle,
} from "@/components/site/squiggle";
import {
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  StatBlock,
} from "@/components/site/ui";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<AdminOverview | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const overview = await apiFetch<AdminOverview>("/api/admin/overview");
      setData(overview);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load the overview"
      );
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user?.role === "ADMIN") {
      void load();
    } else {
      setFetching(false);
    }
  }, [loading, user, load]);

  if (loading) return <LoadingState label="Checking your backstage pass…" />;

  if (!user) {
    return (
      <div className="flex-1 px-5 py-32 max-w-md mx-auto w-full flex flex-col items-center text-center">
        <DoodleStar className="mb-6 animate-wiggle" size={38} />
        <EmptyState
          title="This sketchbook is members-only"
          hint="sign in with an admin account to enter"
        />
        <PillButton to="/login" variant="solid" className="mt-6">
          Sign in
        </PillButton>
      </div>
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="flex-1 px-5 py-32 max-w-md mx-auto w-full flex flex-col items-center text-center">
        <DoodleStar className="mb-6 animate-wiggle" size={38} />
        <EmptyState
          title="Admins only beyond this point"
          hint="your account doesn't have the backstage pass"
        />
        <PillButton to="/dashboard" variant="solid" className="mt-6">
          Back to dashboard
        </PillButton>
      </div>
    );
  }

  const counts = data?.counts;

  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Admin — Control room"
          title={
            <>
              The <em className="font-normal">backstage</em> pass.
            </>
          }
          parenthetical="the numbers behind the scenes"
        >
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <PillButton size="sm" variant="outline" onClick={() => void load()} disabled={fetching}>
              {fetching ? "Refreshing…" : "Refresh"}
            </PillButton>
            <span className="font-sans text-[12px] tracking-tight text-charcoal">
              (Data served fresh from the LFRDCA platform database)
            </span>
          </div>
        </PageHero>
        <DoodleStar
          className="absolute top-24 right-[6%] hidden md:block animate-wiggle"
          size={32}
        />
      </div>

      <Section className="flex flex-col gap-12">
        {/* ── Counts ────────────────────────────────────────────────────────── */}
        {fetching && !data ? (
          <LoadingState label="Counting the paperclips…" />
        ) : error ? (
          <SketchCard tone="paper" hover={false} className="p-6 sm:p-8 text-center">
            <EmptyState
              title="The ledger wouldn't open"
              hint={error}
            />
            <div className="flex justify-center mt-4">
              <PillButton size="sm" variant="solid" onClick={() => void load()}>
                Try again
              </PillButton>
            </div>
          </SketchCard>
        ) : counts ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
            <StatBlock value={String(counts.users)} label="Members" />
            <StatBlock value={String(counts.messages)} label="Messages" />
            <StatBlock value={String(counts.subscribers)} label="Subscribers" />
            <StatBlock value={String(counts.quotes)} label="Quote requests" />
            <StatBlock value={String(counts.applications)} label="Job applications" />
            <StatBlock value={String(counts.posts)} label="Posts" />
          </div>
        ) : null}

        {/* ── Recent activity ───────────────────────────────────────────────── */}
        {data && (
          <div>
            <h2 className="font-serif font-light text-[clamp(24px,4vw,34px)] leading-tight mb-2">
              Recent <em className="font-normal">activity</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-charcoal mb-8">
              (the latest arrivals at the front desk)
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Latest messages */}
              <SketchCard hover={false} className="p-6">
                <h3 className="font-serif font-light text-xl mb-2">
                  Latest messages
                </h3>
                <div className="max-h-72 overflow-y-auto sketch-scroll">
                  {data.recent.messages.length === 0 ? (
                    <p className="font-sans text-[13px] tracking-tight text-charcoal py-3">
                      (nothing yet — the quiet before the storm)
                    </p>
                  ) : (
                    data.recent.messages.map((m) => (
                      <div
                        key={m.id}
                        className="border-b-[1.5px] border-ink/10 py-3 last:border-b-0"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-sans text-[13px] font-semibold tracking-tight truncate">
                            {m.name}
                          </span>
                          <span className="font-sans text-[12px] tracking-tight text-charcoal shrink-0">
                            {fmtDate(m.createdAt)}
                          </span>
                        </div>
                        <p className="font-sans text-[12px] tracking-tight text-charcoal truncate mt-0.5">
                          {m.subject}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </SketchCard>

              {/* Quote requests */}
              <SketchCard hover={false} className="p-6">
                <h3 className="font-serif font-light text-xl mb-2">
                  Quote requests
                </h3>
                <div className="max-h-72 overflow-y-auto sketch-scroll">
                  {data.recent.quotes.length === 0 ? (
                    <p className="font-sans text-[13px] tracking-tight text-charcoal py-3">
                      (no quotes yet — share the word)
                    </p>
                  ) : (
                    data.recent.quotes.map((q) => (
                      <div
                        key={q.id}
                        className="border-b-[1.5px] border-ink/10 py-3 last:border-b-0"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-sans text-[13px] font-semibold tracking-tight truncate">
                            {q.name}
                          </span>
                          <span className="font-sans text-[12px] tracking-tight text-charcoal shrink-0">
                            {q.budget}
                          </span>
                        </div>
                        <p className="font-sans text-[12px] tracking-tight text-charcoal truncate mt-0.5">
                          {q.service}
                          {q.company ? ` · ${q.company}` : ""}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </SketchCard>

              {/* Applications */}
              <SketchCard hover={false} className="p-6">
                <h3 className="font-serif font-light text-xl mb-2">
                  Applications
                </h3>
                <div className="max-h-72 overflow-y-auto sketch-scroll">
                  {data.recent.applications.length === 0 ? (
                    <p className="font-sans text-[13px] tracking-tight text-charcoal py-3">
                      (no applicants yet — the roles are waiting)
                    </p>
                  ) : (
                    data.recent.applications.map((a) => (
                      <div
                        key={a.id}
                        className="border-b-[1.5px] border-ink/10 py-3 last:border-b-0"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-sans text-[13px] font-semibold tracking-tight truncate">
                            {a.name}
                          </span>
                          <span className="font-sans text-[12px] tracking-tight text-charcoal shrink-0">
                            {fmtDate(a.createdAt)}
                          </span>
                        </div>
                        <p className="font-sans text-[12px] tracking-tight text-charcoal truncate mt-0.5">
                          {a.jobTitle}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </SketchCard>
            </div>
          </div>
        )}

        <Squiggle
          variant="wave"
          color="#81aed9"
          className="hidden lg:block opacity-70 self-end -mt-4"
          width={420}
          height={40}
        />
      </Section>
    </div>
  );
}
