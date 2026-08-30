# Task 3-c — Work & Journal Pages (portfolio, case study, blog, blog post, insights, whitepapers, news)

Agent: 3-c (Work & journal pages)
Scope: 7 client pages in `src/components/pages/` for the LFRDCA Technologies Dyotanya sketchbook site. No shared files touched, no backend changes, no dev server / lint / installs run.

## Created files

1. **portfolio.tsx** (`#/portfolio`) — PageHero "Proof, not *promises*." + industry filter pills (rounded-[3000px], active bg-ink text-paper, client-side filter over `/api/case-studies`), featured studies as large alternating rows (CircularImage 260 + TrophyBadge + index numeral + serif title + challenge excerpt + 3 metric StatBlocks + coral "Read the story →" Link), non-featured as SketchCard grid, LoadingState / EmptyState / failure fallbacks, inverted CTA band → /quote.

2. **case-study.tsx** (`#/portfolio/:slug`) — slug via `useSegments()[1]`; fetches `/api/case-studies/[slug]`; 404 → EmptyState "This story is still being sketched" + back button. PageHero (index "Case study — {client}", parenthetical "{industry} · {year}"), hero row (CircularImage 240 + TrophyBadge + DoodleStar + 3 StatBlocks + service Tags), "The challenge" / "What we built" sections split on `\n\n` (max-w-2xl sans body), "The results" numbered serif ledger (01–04), Squiggle underlines on section titles, "Next story" small card (fetches list, picks next non-current, wraps around), CTA → /quote.

3. **blog.tsx** (`#/blog`) — PageHero "Notes from the *margins*."; SketchInput search debounced 350ms (`q` param) + category chips (All, AI, Analytics, Data Engineering, Cloud, Security, MLOps; active bg-ink text-paper) that reset to page 1; fetches `/api/posts?page&limit=6&category&q` keeping {posts, page, pages, total, loading, failed}; first post on unfiltered page 1 gets large feature layout (CircularImage 160 + big serif title + excerpt + meta + author); rest as 3-col SketchCards (image, Tag, serif title, excerpt, "{readTime} min · {date}" via en-IN locale); prev/next PillButtons sm + "Page {page} of {pages}"; empty state "Nothing in the margins yet" with filter-aware hint.

4. **blog-post.tsx** (`#/blog/:slug`) — fetches `/api/posts/[slug]` (view increments server-side); 404 → EmptyState + back to /blog. Custom header: Tag category, serif title clamp(36px,6vw,64px), author-initials circle (w-11 h-11, serif), "{author}, {authorRole}" + "{date} · {readTime} min read · {views} views", tags parenthetical. CircularImage 260 with DoodleStar. Body: `react-markdown` inside `max-w-[680px] mx-auto` with inline component overrides (serif h2/h3, sans 15px/1.75 p, list-disc ul, coral-border blockquote, link-coral anchors, mono code chips). Share row: "Copy link" PillButton sm → `navigator.clipboard.writeText(window.location.href)` + toast "Link copied" (useToast). Related: `/api/posts?limit=4&category=…`, filter current, 3 cards. Back link "← All notes".

5. **insights.tsx** (`#/insights`) — PageHero "Research & *insights*."; serif hero statement with inline CircularImage(/images/insight-1.png, 90) + animated Squiggle; "What we're studying now" — 4 hardcoded research-theme SketchCards (insight-1..4.png @110, index numerals, 2-sentence blurbs, Tag "Ongoing"/"Published" coral/dusty); charcoal stats band ("field evidence") hydrating /api/stats with fallback constants (LoadingState while fetching); two-card links row → /whitepapers ("Deep dives →") and /blog ("Field notes →"); inverted newsletter band with SketchInput + POST /api/newsletter → toast "You're on the list" (error toast on failure); closing CTA → /contact.

6. **whitepapers.tsx** (`#/whitepapers`) — PageHero "Deep dives, *properly* researched."; fetches `/api/whitepapers`; category chips derived from data (same pill styling); SketchCard grid (CircularImage 120 + index numeral, category Tag, serif title, description, "({pages} pages)" caption, PillButton sm "Get the PDF" → toast "Email lfrdcatechnologies@outlook.com" with the paper title in the description); LoadingState / failure / per-category EmptyState; CTA band → /insights.

7. **news.tsx** (`#/news`) — PageHero "News & *gatherings*."; fetches `/api/events`, splits by date vs now into Upcoming / Past (past sorted desc). Event rows = SketchCard: CircularImage 130 (+DoodleStar for upcoming), Tag type (coral upcoming / dusty past), MapPin (lucide, strokeWidth 1.5) + location, serif 24px title, description, "RSVP →" coral Link to /contact for upcoming / "(recap soon)" for past, right-hand serif DateBadge (day number large + uppercase month + year). Bottom inverted "For press & speaking" band with mailto lfrdcatechnologies@outlook.com pill + /contact button.

## Verification

- `bunx tsc --noEmit -p tsconfig.json` → 0 errors in any of the 7 files (project-wide errors are only pre-existing ones in `examples/` and `skills/`, unrelated).
- Scanned all 7 files for unused imports → none.
- Confirmed custom utilities used (bg-paper, text-coral, border-dusty, text-charcoal, shadow-sketch-sm, link-coral, animate-wiggle, draw-line, animate-marquee-slow, animate-float) all exist in `src/app/globals.css`.
- Confirmed seeded data shape: industries (6 unique), post categories (AI, Analytics, Data Engineering, Cloud, Security, MLOps all present), events mix of past 2025 + future Sep/Oct 2026 (sandbox clock 2026-08-30), so Upcoming/Past split renders both sections.

## Style contract compliance

- All pages "use client" + default export; bg-paper backgrounds inherited globally; serif font-light headings with `<em className="font-normal">` italics; sans tracking-tight body; parentheticals "(like this)"; index markers "01 — Name"; 1–2 squiggles/doodles per page; coral only for link text/accents; CircularImage for every image (no raw `<img>`, no next/image); en-IN date formatting; LoadingState/EmptyState graceful fallbacks on every fetch; sticky footer handled globally.
