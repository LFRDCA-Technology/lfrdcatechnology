"use client";

// ── Leadership — the humans behind the models (fetched from /api/team) ───────

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import type { TeamMember } from "@/lib/types";
import {
  CircularImage,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, HandArrow, Squiggle } from "@/components/site/squiggle";

export default function LeadershipPage() {
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<TeamMember[]>("/api/team");
        if (!alive) return;
        setTeam(data.slice(0, 8));
      } catch {
        if (alive) {
          setTeam(null);
          setFailed(true);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 03 · The leadership"
        title={
          <>
            The humans behind the <em className="font-normal">models.</em>
          </>
        }
        parenthetical="45+ experts — here are the ones who talk the most"
      >
        <div className="flex items-end gap-3 mt-4">
          <HandArrow width={84} height={54} className="-rotate-6" />
          <span className="font-sans text-[12px] tracking-tight text-charcoal pb-1 -ml-2">
            (bios written by colleagues, lightly tolerated by subjects)
          </span>
        </div>
      </PageHero>

      {/* ── TEAM GRID ────────────────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <SectionHeader
          index="01 — The roster"
          title={
            <>
              Eight people, <em className="font-normal">one</em> shared
              whiteboard
            </>
          }
          className="mb-12"
        />

        {team === null && !failed ? (
          <LoadingState label="Fetching the org chart…" />
        ) : failed ? (
          <SketchCard tone="paper" hover={false} className="max-w-xl mx-auto text-center py-14">
            <DoodleStar className="mx-auto mb-5" size={30} />
            <p className="font-serif font-light italic text-2xl">
              The roster is still being sketched in
            </p>
            <p className="font-sans text-sm tracking-tight text-charcoal mt-3">
              (Our team directory hiccuped — but the humans are very much
              real. Ping us and we&apos;ll happily introduce you.)
            </p>
            <div className="mt-8">
              <PillButton to="/contact" variant="outline">
                Reach out instead
              </PillButton>
            </div>
          </SketchCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(team ?? []).map((member, i) => (
              <div
                key={member.id}
                className={i % 2 === 1 ? "sm:translate-y-6" : ""}
              >
                <SketchCard className="flex flex-col items-center text-center gap-4 h-full">
                  <CircularImage
                    src={member.image}
                    alt={`${member.name}, ${member.role} at LFRDCA Technologies`}
                    size={130}
                  />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif font-light text-[24px] leading-tight">
                      {member.name}
                    </h3>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal">
                      {member.role}
                    </p>
                  </div>
                  <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-coral font-sans text-[12px] tracking-tight mt-auto"
                    >
                      LinkedIn →
                    </a>
                  )}
                </SketchCard>
              </div>
            ))}
          </div>
        )}

        <Squiggle
          variant="swirl"
          className="hidden lg:block ml-auto mt-8 opacity-50"
          width={170}
          height={66}
        />
      </Section>

      {/* ── NOTE + CTA ───────────────────────────────────────────────────── */}
      <Section className="pt-0">
        <SketchCard tone="inverted" className="text-center py-16 sm:py-20 px-6">
          <DoodleStar color="#ff8562" className="mx-auto mb-6 animate-wiggle" size={38} />
          <h2 className="font-serif font-light text-[clamp(30px,5.5vw,56px)] leading-[1.05] max-w-2xl mx-auto text-balance">
            There&apos;s room for{" "}
            <em className="font-normal">one more</em> chair
          </h2>
          <p className="font-sans text-sm tracking-tight text-paper/70 mt-5 max-w-md mx-auto">
            (We&apos;re hiring across data engineering, AI and analytics —
            sketchbook optional, curiosity mandatory)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <PillButton to="/careers" variant="dusty" size="lg">
              Join them
            </PillButton>
            <PillButton to="/culture" variant="dark" size="lg">
              See the culture
            </PillButton>
          </div>
        </SketchCard>
        <div className="flex justify-center mt-10">
          <Tag tone="dusty">Noida Sector 62 · +91 7361864847</Tag>
        </div>
      </Section>
    </div>
  );
}
