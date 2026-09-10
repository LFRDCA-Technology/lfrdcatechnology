"use client";

// ── Docs — the site's own public REST API, documented (meta, we know) ────────

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy } from "lucide-react";
import {
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
} from "@/components/site/ui";
import { Squiggle } from "@/components/site/squiggle";

const NAV_ITEMS = [
  { id: "getting-started", label: "Getting started" },
  { id: "auth", label: "Authentication" },
  { id: "content", label: "Content" },
  { id: "forms", label: "Forms" },
  { id: "ai", label: "AI assistant" },
  { id: "status-codes", label: "Status codes" },
];

const STATUS_CODES = [
  { code: "200", name: "OK", meaning: "Everything worked. The body carries the payload." },
  { code: "400", name: "Bad request", meaning: "Validation failed — the body’s error field says exactly which field and why." },
  { code: "401", name: "Unauthorized", meaning: "Missing or invalid auth — usually the lfrdca_token cookie is absent or expired." },
  { code: "403", name: "Forbidden", meaning: "You’re logged in, but this endpoint belongs to a role you don’t hold (e.g. ADMIN)." },
  { code: "404", name: "Not found", meaning: "No such resource — check the slug in your URL." },
  { code: "409", name: "Conflict", meaning: "The resource already exists (a registered email, for instance)." },
];

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/* ── Code block with a copy button ─────────────────────────────────────────── */
function CodeBlock({ code, label }: { code: string; label?: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyText(code);
    if (ok) {
      setCopied(true);
      toast({ title: "Copied to clipboard", description: label ?? undefined });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: "Copy blocked",
        description: "Your browser refused — select the code manually instead.",
      });
    }
  }

  return (
    <div className="relative group">
      <pre className="rounded-[20px] border-[1.5px] border-dusty bg-white p-5 font-mono text-[13px] leading-relaxed overflow-x-auto shadow-sketch-sm">
        {code}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-[3000px] border-[1.5px] border-ink bg-white px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] shadow-sketch-sm cursor-pointer hover:-translate-y-[1px] transition-all"
      >
        {copied ? (
          <>
            <Check strokeWidth={1.5} className="w-3.5 h-3.5" aria-hidden="true" />
            Copied
          </>
        ) : (
          <>
            <Copy strokeWidth={1.5} className="w-3.5 h-3.5" aria-hidden="true" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}

/* ── Method pill ───────────────────────────────────────────────────────────── */
function Method({ m }: { m: "GET" | "POST" | "PUT" }) {
  const styles: Record<"GET" | "POST" | "PUT", string> = {
    GET: "border-dusty text-ink bg-white",
    POST: "border-ink bg-ink text-paper",
    PUT: "border-ink text-ink bg-white",
  };
  return (
    <span
      className={`inline-flex items-center rounded-[3000px] border-[1.5px] px-3 py-0.5 font-sans text-[11px] font-semibold tracking-[0.1em] w-fit ${styles[m]}`}
    >
      {m}
    </span>
  );
}

/* ── One endpoint row ──────────────────────────────────────────────────────── */
function Endpoint({
  m,
  path,
  desc,
}: {
  m: "GET" | "POST" | "PUT";
  path: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 py-4 border-b-[1.5px] border-ink/10 last:border-b-0">
      <div className="flex items-center gap-3 w-full sm:w-[290px] shrink-0">
        <Method m={m} />
        <code className="font-mono text-[13px] text-ink break-all">{path}</code>
      </div>
      <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
        {desc}
      </p>
    </div>
  );
}

export default function DocsPage() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index="Documentation"
        title={
          <>
            Platform <em className="font-normal">documentation</em>.
          </>
        }
        parenthetical="yes — this site documents its own API. We drank our own chai while writing it"
      >
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="font-sans text-[12px] tracking-tight text-charcoal">
            (REST · JSON · cookie-based auth · no API keys needed for public
            reads)
          </span>
        </div>
      </PageHero>

      <Section className="max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr] gap-12">
          {/* ── Left sticky nav ──────────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Documentation sections"
              className="sticky top-28 flex flex-col gap-1 border-l-[1.5px] border-ink/15 pl-5"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-sans text-[13px] tracking-tight text-charcoal hover:text-coral hover:translate-x-1 transition-all cursor-pointer py-1.5"
                >
                  {item.label}
                </button>
              ))}
              <Squiggle
                variant="wave"
                color="#81aed9"
                className="mt-4 opacity-60"
                width={140}
                height={30}
              />
            </nav>
          </aside>

          {/* ── Mobile nav (horizontal scroll) ───────────────────────────── */}
          <div className="lg:hidden -mt-6 mb-2">
            <div className="flex gap-3 overflow-x-auto pb-3 sketch-scroll">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="shrink-0 rounded-[3000px] border-[1.5px] border-ink/25 bg-white px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Content column ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-16 min-w-0">
            {/* GETTING STARTED */}
            <section id="getting-started" className="scroll-mt-32 flex flex-col gap-6">
              <SectionHeader
                index="01 —"
                title={<>Getting <em className="font-normal">started</em></>}
                parenthetical="three things to know before your first request"
              />
              <div className="flex flex-col gap-4">
                <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal max-w-2xl">
                  Everything lives under <code className="font-mono text-[13px]">/api</code> on
                  the same origin you’re browsing — there’s no separate API
                  host to configure. In these docs we write it as{" "}
                  <code className="font-mono text-[13px]">https://lfrdcatechnology.cooo.in</code>, but
                  a relative path works identically.
                </p>
                <ul className="flex flex-col gap-2.5 max-w-2xl">
                  {[
                    "All responses are JSON, always — including errors, which come as {\"error\": \"message\"} with a matching status code.",
                    "Public reads (services, posts, jobs, FAQs…) need no authentication at all.",
                    "Account-scoped endpoints authenticate via an httpOnly cookie (lfrdca_token) set at login or registration — send credentials along and you’re done.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="font-serif italic text-base leading-[1.7] shrink-0">
                        ✳
                      </span>
                      <span className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* AUTHENTICATION */}
            <section id="auth" className="scroll-mt-32 flex flex-col gap-6">
              <SectionHeader
                index="02 —"
                title={<>Auth<em className="font-normal">entication</em></>}
                parenthetical="register, login, logout, me — JWT in an httpOnly cookie"
              />
              <div className="bg-white rounded-[20px] border-[1.5px] border-dusty px-6 sm:px-8 py-2 shadow-sketch-sm">
                <Endpoint
                  m="POST"
                  path="/api/auth/register"
                  desc="Create an account {name, email, password}. Sets the cookie and returns {user}."
                />
                <Endpoint
                  m="POST"
                  path="/api/auth/login"
                  desc="Sign in {email, password}. Sets the cookie and returns {user}."
                />
                <Endpoint
                  m="POST"
                  path="/api/auth/logout"
                  desc="Clears the cookie. Returns {ok: true} even if you weren’t signed in — graceful by design."
                />
                <Endpoint
                  m="GET"
                  path="/api/auth/me"
                  desc="Returns {user} for the cookie’s bearer, or 401 if nobody’s home."
                />
                <Endpoint
                  m="PUT"
                  path="/api/auth/profile"
                  desc="Update {name, phone, company} for the signed-in user."
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                  Register — bash
                </span>
                <CodeBlock
                  label="Register example"
                  code={`curl -X POST https://lfrdcatechnology.cooo.in/api/auth/register \\
  -H "Content-Type: application/json" \\
  -c cookies.txt \\
  -d '{"name":"Asha Verma","email":"asha@example.com","password":"at-least-8-chars"}'`}
                />
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                  Login from the browser — JavaScript
                </span>
                <CodeBlock
                  label="Login example"
                  code={`const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "demo@lfrdca.tech",
    password: "Demo@123",
  }),
  credentials: "include", // keeps the JWT cookie around
});
const { user } = await res.json();`}
                />
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                  Who am I — bash
                </span>
                <CodeBlock
                  label="Auth check example"
                  code={`curl https://lfrdcatechnology.cooo.in/api/auth/me --cookie "lfrdca_token=<your-jwt>"
# → { "user": { "id": "…", "name": "Asha Verma", "role": "USER", … } }`}
                />
              </div>
            </section>

            {/* CONTENT */}
            <section id="content" className="scroll-mt-32 flex flex-col gap-6">
              <SectionHeader
                index="03 —"
                title={<>Content <em className="font-normal">endpoints</em></>}
                parenthetical="public reads — no auth, no rate limits we’d ever tell you about"
              />
              <div className="bg-white rounded-[20px] border-[1.5px] border-dusty px-6 sm:px-8 py-2 shadow-sketch-sm">
                <Endpoint m="GET" path="/api/services" desc="All eight services, ordered as on the site. Individual: /api/services/[slug]." />
                <Endpoint m="GET" path="/api/posts" desc="Journal posts. Query: ?category=Analytics&q=pipeline&page=1&limit=10 → {posts, total, page, pages}." />
                <Endpoint m="GET" path="/api/case-studies" desc="Case studies, featured first. Individual: /api/case-studies/[slug]." />
                <Endpoint m="GET" path="/api/jobs" desc="Active job listings, newest first." />
                <Endpoint m="GET" path="/api/faqs" desc="Every FAQ, grouped client-side by category." />
                <Endpoint m="GET" path="/api/search?q=rag" desc="Site-wide search → {results: [{type, title, excerpt, href}]}." />
              </div>
              <CodeBlock
                label="Content example"
                code={`curl "https://lfrdcatechnology.cooo.in/api/posts?category=Analytics&q=forecasting&limit=3"

# {
#   "posts": [ { "slug": "…", "title": "…", "excerpt": "…", … } ],
#   "total": 2, "page": 1, "pages": 1
# }`}
              />
            </section>

            {/* FORMS */}
            <section id="forms" className="scroll-mt-32 flex flex-col gap-6">
              <SectionHeader
                index="04 —"
                title={<>Form <em className="font-normal">submissions</em></>}
                parenthetical="three POST endpoints that power every form on this site"
              />
              <div className="bg-white rounded-[20px] border-[1.5px] border-dusty px-6 sm:px-8 py-2 shadow-sketch-sm">
                <Endpoint m="POST" path="/api/contact" desc="Contact & support tickets {name, email, subject, message} → {ok: true}." />
                <Endpoint m="POST" path="/api/newsletter" desc="Subscribe {email} → {ok: true, already: boolean} — duplicates are fine, we just tell you." />
                <Endpoint m="POST" path="/api/quote" desc="Quote requests {name, email, company?, phone?, service, budget, message} → {ok: true}." />
                <Endpoint m="POST" path="/api/jobs/apply" desc="Job applications {jobSlug, name, email, phone?, resumeLink?, coverLetter?} → {ok: true}." />
              </div>
              <div className="flex flex-col gap-4">
                <CodeBlock
                  label="Newsletter example"
                  code={`curl -X POST https://lfrdcatechnology.cooo.in/api/newsletter \\
  -H "Content-Type: application/json" \\
  -d '{"email":"asha@example.com"}'
# → { "ok": true, "already": false }`}
                />
                <CodeBlock
                  label="Quote example"
                  code={`curl -X POST https://lfrdcatechnology.cooo.in/api/quote \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Asha Verma",
    "email": "asha@example.com",
    "company": "Acme Retail",
    "phone": "+91 90000 00000",
    "service": "Data Analytics",
    "budget": "₹5–15L",
    "message": "We need a demand forecast before Diwali."
  }'
# → { "ok": true }`}
                />
              </div>
            </section>

            {/* AI ASSISTANT */}
            <section id="ai" className="scroll-mt-32 flex flex-col gap-6">
              <SectionHeader
                index="05 —"
                title={<>The AI <em className="font-normal">assistant</em></>}
                parenthetical="the same brain behind the button in the corner"
              />
              <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal max-w-2xl">
                POST <code className="font-mono text-[13px]">/api/chat</code> accepts an
                OpenAI-style messages array and replies as our LFRDCA-toned
                assistant. Keep conversations short and it stays quick; send
                the whole history to maintain context.
              </p>
              <CodeBlock
                label="Chat example"
                code={`const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "user", content: "What services does LFRDCA offer?" }
    ],
  }),
});
const { reply } = await res.json();
// reply: "We cover data engineering, analytics, AI development…"`}
              />
            </section>

            {/* STATUS CODES */}
            <section id="status-codes" className="scroll-mt-32 flex flex-col gap-6">
              <SectionHeader
                index="06 —"
                title={<>Status <em className="font-normal">codes</em></>}
                parenthetical="six numbers, one vocabulary"
              />
              <div className="rounded-[30px] border-[1.5px] border-dusty overflow-hidden bg-white shadow-sketch">
                <div className="hidden sm:grid grid-cols-[110px_180px_1fr] gap-6 px-8 py-5 bg-paper border-b-[1.5px] border-ink/10">
                  {["Code", "Name", "What it means"].map((h) => (
                    <span
                      key={h}
                      className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {STATUS_CODES.map((s) => (
                  <div
                    key={s.code}
                    className="grid grid-cols-1 sm:grid-cols-[110px_180px_1fr] gap-1 sm:gap-6 px-8 py-5 border-t-[1.5px] border-ink/10 first:border-t-0 items-baseline"
                  >
                    <span className="font-serif font-light text-2xl leading-none">
                      {s.code}
                    </span>
                    <span className="font-sans text-[13px] font-semibold tracking-tight">
                      {s.name}
                    </span>
                    <span className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                      {s.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* CLOSING */}
            <SketchCard hover={false} className="text-center py-12">
              <h2 className="font-serif font-light text-[clamp(24px,3.5vw,34px)] leading-[1.05]">
                That’s the <em className="font-normal">whole</em> API.
              </h2>
              <p className="font-sans text-[13px] tracking-tight text-charcoal mt-3">
                (build something lovely with it — then tell us, we genuinely
                want to see)
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-7">
                <PillButton to="/status" variant="outline">
                  Check system status
                </PillButton>
                <PillButton to="/contact" variant="solid">
                  Report a docs bug
                </PillButton>
              </div>
            </SketchCard>
          </div>
        </div>
      </Section>
    </div>
  );
}
