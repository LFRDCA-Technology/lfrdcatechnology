# Task 3-a — Company Pages (full-stack-developer)

Task: Build the 9 "Company" pages for the LFRDCA Technologies SPA (AI/data/analytics IT company, Noida Sector 62, lfrdcatechnologies@outlook.com, +91 7361864847, founder Satyam RojhaX) in the Dyotanya editorial sketchbook style, mirroring `src/components/pages/home.tsx` as the reference implementation.

## Context consumed before coding
- `/home/z/my-project/worklog.md` — master architecture (single `src/app/page.tsx` shell + hash router, 57 client page components, API contract, Dyotanya design contract, image manifest).
- `src/components/site/ui.tsx` — SketchCard / PillButton / SectionHeader / PageHero / CircularImage / Marquee / StatBlock / Tag / LoadingState / EmptyState / Section / InlineLink / SketchInput / FieldLabel APIs.
- `src/components/site/squiggle.tsx` — Squiggle variants (loop, wave, underline, spiral, arc, scribble, swirl, dash), DoodleStar, HandArrow, CircleScribble.
- `src/lib/router.tsx` (Link/useRouter/useSegments/navigateTo), `src/lib/auth.ts` (apiFetch/useAuth), `src/lib/types.ts` (TeamMember, CompanyStats).
- Previous agents' records: `agent-ctx/2-a-full-stack-developer.md` (backend), `agent-ctx/3-c-work-journal-pages.md` (work/journal pages).

## Files created (exactly 9, no existing file modified)
1. `src/components/pages/about.tsx` — #/about. PageHero "We're the data people."; LFRDCA mnemonic intro + office-hero.png landscape; 4 value cards w/ DoodleStar; charcoal stats band (GET /api/stats w/ fallback); team teaser (GET /api/team w/ fallback, 4 circular portraits → /leadership); inverted CTA.
2. `src/components/pages/story.tsx` — #/story. 8-entry vertical timeline 2019→2026, large serif year column, hand-drawn SVG spine (`preserveAspectRatio="none"` + `vectorEffect="non-scaling-stroke"`, stroke 1.5) at `left: calc(160px + 28px)` matching `md:grid-cols-[160px_1fr] md:gap-14`, DoodleStar spine markers; founder.png @2019, culture-2.png @2022, culture-5.png @2024; 2026 card inverted + "(you are here)".
3. `src/components/pages/mission.tsx` — #/mission. clamp(40px,6.5vw,80px) mission statement; inverted vision card ("no dataset goes unloved"); 6 principle cards 3-col w/ lucide strokeWidth 1.5; commitments band + coral squiggle underline.
4. `src/components/pages/leadership.tsx` — #/leadership. GET /api/team → 8 cards (CircularImage 130, serif 24px name, uppercase role, bio, LinkedIn); LoadingState; graceful failure card ("roster is still being sketched in"); "Join them" → /careers.
5. `src/components/pages/culture.tsx` — #/culture. md:grid-cols-6 collage (2× col-span-4 landscape rounded-[60px], 4× rounded-[40px], ±1–1.5° rotations w/ hover:rotate-0); perks Marquee (slow); "How we work" 4 cards; CTA → /careers + /internships.
6. `src/components/pages/partners.tsx` — #/partners. 6 ecosystem text cards (AWS/Azure/GCP/Databricks/Snowflake/NVIDIA, lucide icons, no logos); 3 partnership models w/ 3 bullets each; process 01–04; CTA → /contact + mailto parenthetical.
7. `src/components/pages/investors.tsx` — #/investors. Snapshot StatBlocks (3.2× / 18% / 80+ / 45+); "Why LFRDCA" 3 cards; funding timeline (2019 bootstrap → 2022 angel → 2026 series A conversations) w/ SVG spine; governance cadence list; mailto CTA subject "Investor Relations".
8. `src/components/pages/certifications.tsx` — #/certifications. 5 cert cards (ISO 27001, SOC 2 Type II, GDPR-ready, DPDP aligned, ISO 9001) w/ "what it means for you"; security practices grid (Lock/Radar/KeyRound/Siren); "Request our security pack" → /contact.
9. `src/components/pages/sitemap.tsx` — #/sitemap. 54 static routes in 9 grouped SketchCards (2-col layout), serif "NN — Group" markers, Tag count badges, coral-hover Link lists.

## Style contract compliance
- `"use client"` first line; default export; no props; `flex flex-col` wrapper; PageHero top; Section-based body.
- Serif-light headings with roman/italic `<em className="font-normal">` mix; parenthetical captions; "01 — Name" index markers.
- Coral #ff8562 only as link/link-hover text (`link-coral`, `hover:text-coral`); PillButtons never coral; SketchCards white/paper/inverted per contract.
- No next/image — CircularImage for circular crops, raw `<img>` with `eslint-disable-next-line @next/next/no-img-element` for landscape (rounded-[40–60px], border-[1.5px] border-ink).
- Squiggles/DoodleStars/HandArrows woven 1–2 per section; lucide icons sparingly at strokeWidth 1.5.
- Fetches: `apiFetch` in `useEffect` with `alive` cleanup flag; `Promise.allSettled` where multiple endpoints; hardcoded fallbacks (about) / graceful failure cards (leadership) so pages always render.

## Verification
- `./node_modules/.bin/tsc --noEmit -p tsconfig.json` → 0 errors in src/ (only pre-existing errors in unrelated `examples/` + `skills/` folders).
- dev.log reviewed: transient `module-not-found` errors come from the integrator's registry.tsx referencing other agents' not-yet-created detail pages (service-detail / industry-detail / solution-detail); nothing attributable to this task. No existing files were modified; registry.tsx left untouched for the integrator.
- Per task constraints: no dev server, no lint, no installs, no image generation (image files come from the shared /images manifest).
