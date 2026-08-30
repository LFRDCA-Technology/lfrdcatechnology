# Task 3-d — Careers, support & commercial pages

Agent: page-builder (frontend, Dyotanya sketchbook UI)
Task: Create the 12 commercial/support page components in `src/components/pages/` per the master architecture (hash-router SPA, one default-export client component per page).

## Files created (12)
| File | Route | Live API usage | Fallbacks |
|---|---|---|---|
| careers.tsx | #/careers | GET /api/jobs, POST /api/jobs/apply | FALLBACK_JOBS (2 hardcoded jobs incl. data-analyst-intern) |
| internships.tsx | #/internships | — (static programme data) | fully static |
| training.tsx | #/training | — (static course data) | fully static |
| pricing.tsx | #/pricing | — (static engagement models) | fully static |
| faq.tsx | #/faq | GET /api/faqs | FALLBACK_FAQS (6 hardcoded, categories Services/Pricing/Process/Support) |
| support.tsx | #/support | POST /api/contact (subject = `[Support] {category}`) | server errors surfaced via toast |
| docs.tsx | #/docs | — (documents the API; copy-to-clipboard) | clipboard execCommand fallback |
| status.tsx | #/status | GET /api (live gateway probe), POST /api/newsletter | degraded state if /api unreachable |
| contact.tsx | #/contact | POST /api/contact, POST /api/newsletter | server errors surfaced via toast |
| quote.tsx | #/quote | POST /api/quote | validation + toast; success → navigateTo("/thank-you") after 1.2s |
| thank-you.tsx | #/thank-you | — (celebration page) | fully static |
| coming-soon.tsx | #/coming-soon | POST /api/newsletter | toast respects `{ok, already}` |

## Implementation notes for the next agent
- **Registry wiring NOT done** (forbidden to modify existing files): `src/components/pages/registry.tsx` still only registers `/`. Routes to add: `/careers`, `/internships`, `/training`, `/pricing`, `/faq`, `/support`, `/docs`, `/status`, `/contact`, `/quote`, `/thank-you`, `/coming-soon` — each `load: () => import("./<name>")`.
- **API contract nuances discovered** (verified against route handlers):
  - `POST /api/contact` zod schema REQUIRES `subject` (min 2 chars) and message min 10 chars → contact.tsx marks subject required client-side.
  - `POST /api/quote` requires message ≥ 10 chars; server error text is shown in toast if violated (acceptable, descriptive).
  - `POST /api/newsletter` returns `{ok, already}` — all three subscribe forms (status, contact, coming-soon) toast a distinct "already on the list" message.
  - `GET /api` returns `{ok, name, version}` — status.tsx probes it live on mount; `new Date().toLocaleTimeString("en-IN")` is the last-checked stamp.
- **Anchor navigation**: hash router means real `<a href="#auth">` would break routing — docs.tsx uses `scrollIntoView` buttons + `scroll-mt-32` section offsets, with a horizontal chip-nav fallback on mobile.
- **Status dots/uptime bars**: green `#4a7c59` (spec), degraded coral, minor dusty — 90 deterministic bars (useMemo), wrapped in `overflow-x-auto` for mobile.
- Style contract followed: bg-paper, SketchCard/PillButton/Tag/FieldLabel/Sketch* controls, serif-light headlines with `<em className="font-normal">` italics, "01 —" index markers, parentheticals, coral for link/accent text only, lucide icons strokeWidth 1.5, no next/image (CircularImage only), "use client" + default export everywhere.
- Verified: `tsc --noEmit` → 0 errors anywhere in `src/` (only pre-existing `skills/` + `examples/` errors, untouched). dev.log currently shows a module-not-found for `./solution-detail` from another agent's registry WIP — not related to this task.
