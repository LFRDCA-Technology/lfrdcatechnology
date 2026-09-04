"use client";

// ── News — "News & gatherings." Upcoming + past events ──────────────────────

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link } from "@/lib/router";
import type { EventItem } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { MapPin } from "lucide-react";

/** Serif date badge: big day number + uppercase month. */
function DateBadge({ iso }: { iso: string }) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  const day = d.getDate();
  const month = d
    .toLocaleDateString("en-IN", { month: "short" })
    .toUpperCase();
  const year = d.getFullYear();
  return (
    <div className="flex flex-col items-center justify-center w-[74px] h-[84px] rounded-[22px] border-[1.5px] border-ink bg-white shadow-sketch-sm shrink-0">
      <span className="font-serif font-light text-3xl leading-none">{day}</span>
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] mt-2">
        {month}
      </span>
      <span className="font-sans text-[10px] tracking-[0.12em] text-charcoal mt-0.5">
        {year}
      </span>
    </div>
  );
}

function EventRow({ event, upcoming }: { event: EventItem; upcoming: boolean }) {
  return (
    <SketchCard className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
      <div className="relative shrink-0">
        <CircularImage
          src={event.image}
          alt={event.title}
          size={130}
        />
        {upcoming && (
          <DoodleStar
            className="absolute -top-3 -right-3 animate-wiggle"
            size={26}
            color="#ff8562"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <Tag tone={upcoming ? "coral" : "dusty"}>{event.type}</Tag>
          <span className="font-sans text-[12px] inline-flex items-center gap-1.5 tracking-tight text-charcoal">
            <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
            {event.location}
          </span>
        </div>
        <h3 className="font-serif font-light text-2xl leading-snug">
          {event.title}
        </h3>
        <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
          {event.description}
        </p>
        {upcoming ? (
          <Link
            to="/contact"
            className="link-coral font-sans text-sm tracking-tight w-fit"
          >
            RSVP →
          </Link>
        ) : (
          <span className="font-sans text-sm tracking-tight text-charcoal">
            (recap soon)
          </span>
        )}
      </div>
      <DateBadge iso={event.date} />
    </SketchCard>
  );
}

export default function NewsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<EventItem[]>("/api/events");
        if (alive) setEvents(data);
      } catch {
        if (alive) setFailed(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const now = useMemo(() => Date.now(), []);
  const upcoming = useMemo(
    () => events.filter((e) => new Date(e.date).getTime() >= now),
    [events, now]
  );
  const past = useMemo(
    () =>
      events
        .filter((e) => new Date(e.date).getTime() < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [events, now]
  );

  return (
    <div className="flex flex-col">
      <PageHero
        index="News & gatherings"
        title={
          <>
            News &amp; <em className="font-normal">gatherings</em>.
          </>
        }
        parenthetical="where you'll find us next — and where we've been"
      >
        <Squiggle
          variant="underline"
          animated
          className="mt-2 opacity-80"
          width={260}
          height={24}
        />
      </PageHero>

      <Section className="pt-0">
        {loading ? (
          <LoadingState label="Checking the calendar…" />
        ) : failed ? (
          <EmptyState
            title="The calendar is temporarily out of reach"
            hint="couldn't load the events — try refreshing"
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="Nothing on the calendar yet"
            hint="we're probably heads-down on a build"
          />
        ) : (
          <div className="flex flex-col gap-16 sm:gap-20">
            {/* ── Upcoming ─────────────────────────────────────────────────── */}
            <div>
              <div className="mb-8">
                <SectionHeader
                  index="01 — Coming up"
                  title={
                    <>
                      Where we&apos;ll <em className="font-normal">be</em>
                    </>
                  }
                  parenthetical="come say hello, seriously"
                />
              </div>
              {upcoming.length > 0 ? (
                <div className="flex flex-col gap-8">
                  {upcoming.map((e) => (
                    <EventRow key={e.id} event={e} upcoming />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No gatherings on the books"
                  hint="check back soon — or invite us to yours"
                />
              )}
            </div>

            {/* ── Past ─────────────────────────────────────────────────────── */}
            {past.length > 0 && (
              <div>
                <div className="mb-8">
                  <SectionHeader
                    index="02 — Recently"
                    title={
                      <>
                        Where we&apos;ve <em className="font-normal">been</em>
                      </>
                    }
                    parenthetical="the talks, panels and meetups of late"
                  />
                </div>
                <div className="flex flex-col gap-8">
                  {past.map((e) => (
                    <EventRow key={e.id} event={e} upcoming={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Section>

      {/* ── Press & speaking band ────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
        <div className="relative">
          <SketchCard tone="inverted" className="text-center py-14 sm:py-16 px-6">
            <h2 className="font-serif font-light text-[clamp(28px,5vw,48px)] leading-[1.05] max-w-2xl mx-auto text-balance">
              For press &amp; <em className="font-normal">speaking</em>
            </h2>
            <p className="font-sans text-sm tracking-tight text-paper/70 mt-4 max-w-md mx-auto">
              (we&apos;re happy on panels, podcasts and podcasts&apos; panels)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="mailto:lfrdcatechnologies@outlook.com"
                className="inline-flex items-center justify-center gap-2 rounded-[3000px] border-[1.5px] border-ink bg-dusty text-ink font-sans uppercase tracking-[0.14em] text-[14px] px-5 sm:px-9 py-[18px] text-center max-w-full shadow-sketch-btn transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333] cursor-pointer"
              >
                <span className="break-all">
                  lfrdcatechnologies@outlook.com
                </span>
              </a>
              <PillButton to="/contact" variant="dark" size="lg">
                Or use the form
              </PillButton>
            </div>
          </SketchCard>
          <Squiggle
            variant="underline"
            color="#81aed9"
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-90"
            width={280}
            height={26}
          />
        </div>
      </section>
    </div>
  );
}
