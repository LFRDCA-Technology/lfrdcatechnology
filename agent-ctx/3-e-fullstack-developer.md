# Task 3-e · Legal, Auth & Account Portal Pages — LFRDCA Technologies

Task ID: 3-e
Agent: fullstack-developer
Date: 2026-08-30

## Scope

Nine pages for the LFRDCA platform (Dyotanya sketchbook style): the auth pair
(login/register), the account portal (dashboard/profile/admin) and the legal
quad (privacy/terms/cookies/gdpr). Frontend only — all data via live REST
endpoints documented in `worklog.md`; no existing files modified.

## Files created (exactly 9)

All in `src/components/pages/`, each `"use client"` + default export, no props:

1. `login.tsx` — route /login
2. `register.tsx` — route /register
3. `dashboard.tsx` — route /dashboard
4. `profile.tsx` — route /profile
5. `admin.tsx` — route /admin
6. `privacy.tsx` — route /privacy
7. `terms.tsx` — route /terms
8. `cookies.tsx` — route /cookies
9. `gdpr.tsx` — route /gdpr

## Key implementation decisions

- **Auth flows**: `apiFetch` POST/PUT with JSON bodies; every call wrapped in
  try/catch → `toast({title:"Hmm", description: err.message})`; success paths
  toast and then `await refresh()` (useAuth) before `navigateTo("/dashboard")`.
  Buttons disabled while `busy`; real `<form onSubmit>` so Enter submits.
  Demo login card with "Fill demo" / "Fill admin" autofill buttons (size sm,
  type="button" so they never submit the form).
- **Already-signed-in login state**: `user && !loading` branch renders
  "You're already signed in." with name/email and Go-to-dashboard / Sign-out
  (logout + toast).
- **AuthGuard pattern** (dashboard/profile/admin): `loading` → LoadingState;
  `!user` → EmptyState "This sketchbook is members-only" + Sign in → /login.
  admin adds the role gate: `user.role !== "ADMIN"` → EmptyState "Admins only
  beyond this point" + Back to dashboard. All React hooks are called before
  any early return (verified — no conditional hooks).
- **Admin data**: `useCallback load()` fetching `/api/admin/overview`,
  triggered from useEffect only when `user?.role === "ADMIN"`; refresh
  PillButton (sm) in the PageHero children slot; loading skeleton, error card
  with retry, 6 StatBlocks counts grid, three recent-activity SketchCards with
  `max-h-72 overflow-y-auto sketch-scroll` lists (rows `border-b-[1.5px]
  border-ink/10 py-3`, en-IN dates, per-list empty captions).
- **Dashboard** renders purely from the `useAuth()` user object (avatar or
  serif initials-circle fallback, Tag role, member-since date) — zero extra
  API calls. Quick links use lucide icons (strokeWidth 1.5): Compass, BookOpen,
  PenLine, LifeBuoy; shortcuts list: AI assistant hint (points at the global
  chat widget), /docs, /status; sign out = `await logout()` + `navigateTo("/")`.
- **Profile**: two SketchCards in lg:grid-cols-2 — details form prefilled via
  useEffect sync (email input disabled with bg-paper), password change with
  min-8 client validation + cleared fields on success. "Danger zone" is a
  caption-only card (mailto link) — no delete button, per spec.
- **Legal pages**: self-contained shared pattern replicated per file (local
  `LegalSection` primitive + TOC) because shared modules are frozen. Serif h2
  `font-serif font-light text-3xl`, paragraphs `font-sans text-[15px]
  leading-[1.75] text-charcoal`, sections `mt-12 scroll-mt-28`.
  **TOC entries are buttons using `scrollIntoView`, NOT `<a href="#id">`** —
  plain hash anchors would hijack the platform's `#/` hash router and route to
  a 404. This is the one non-obvious trap in the legal layout.
- **Cookies page** renders the inventory as a sketch-styled `<table>` inside a
  `p-0 sm:p-0 overflow-hidden` SketchCard (twMerge lets className override the
  card padding) with horizontal scroll fallback on tiny screens.
- Apostrophes in JSX text use `&apos;`; `&` / `'` inside prop strings passed as
  explicit JS expressions (`title={"Cookies & tokens"}`) to avoid entity
  double-decoding questions.

## Verification

- `./node_modules/.bin/tsc --noEmit` → 0 errors in `src/` (only pre-existing
  errors in unrelated `examples/` and `skills/` folders).
- `<Toaster />` confirmed mounted in `src/app/layout.tsx` → toasts will render.
- dev.log reviewed: only transient integrator errors for other agents'
  not-yet-created page files (registry imports of missing detail pages) —
  unrelated to this task. No dev server / lint / installs run, per instructions.
- No existing files modified; `registry.tsx` untouched (route wiring belongs to
  the integrator — routes listed in the stage summary of `worklog.md`).

## Handoff notes

- Routes to register: `/login`, `/register`, `/dashboard`, `/profile`,
  `/admin`, `/privacy`, `/terms`, `/cookies`, `/gdpr`.
- Demo accounts (backend-seeded): admin@lfrdca.tech / Admin@123 (ADMIN) ·
  demo@lfrdca.tech / Demo@123 (USER).
- Cross-links between legal pages use the shared `<Link to>` (hash router) —
  mailto links are plain `<a href="mailto:…">` with `link-coral`.
