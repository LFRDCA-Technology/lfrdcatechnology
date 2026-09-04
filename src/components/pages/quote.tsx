"use client";

// ── Quote — tell us the dream; we reply with math ────────────────────────────

import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Link, navigateTo } from "@/lib/router";
import {
  FieldLabel,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  SketchInput,
  SketchSelect,
  SketchTextarea,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, HandArrow, Squiggle } from "@/components/site/squiggle";

const SERVICES = [
  "AI Development",
  "Data Analytics",
  "Data Science",
  "Machine Learning",
  "Cloud & DevOps",
  "Web Development",
  "Mobile Development",
  "Cybersecurity",
  "Data Platform",
  "AI Assistants",
  "Analytics Cloud",
  "Something else",
];

const BUDGETS = ["< ₹1L", "₹1–5L", "₹5–15L", "₹15L+", "Not sure yet"];

interface QuoteForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const EMPTY: QuoteForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

const REQUIRED: (keyof QuoteForm)[] = [
  "name",
  "email",
  "service",
  "budget",
  "message",
];

export default function QuotePage() {
  const { toast } = useToast();
  const [form, setForm] = useState<QuoteForm>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function update<K extends keyof QuoteForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function markTouched(key: keyof QuoteForm) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  const missing = (key: keyof QuoteForm) =>
    REQUIRED.includes(key) && !form[key].trim();
  const showHint = (key: keyof QuoteForm) =>
    (touched[key] || sending) && missing(key);
  const valid = REQUIRED.every((key) => !missing(key));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(
      Object.fromEntries(REQUIRED.map((k) => [k, true])) as Record<string, boolean>
    );
    if (!valid) {
      toast({
        title: "A few fields still need ink",
        description: "Name, email, service, budget and the dream itself — that’s all.",
      });
      return;
    }
    setSending(true);
    try {
      await apiFetch("/api/quote", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setSent(true);
      setTimeout(() => navigateTo("/thank-you"), 1200);
    } catch (err) {
      toast({
        title: "Couldn’t send that",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
      });
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index="Request a quote"
        title={
          <>
            Tell us the <em className="font-normal">dream</em>.
          </>
        }
        parenthetical="the more honestly you fill this in, the sharper the number that comes back"
      >
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag tone="dusty">Free discovery call included</Tag>
          <Tag tone="dusty">Reply within one working day</Tag>
          <Tag tone="coral">No sales-call ambush</Tag>
        </div>
      </PageHero>

      <Section className="max-w-3xl">
        {sent ? (
          /* ── SUCCESS STATE ─────────────────────────────────────────────── */
          <SketchCard hover={false} className="text-center py-16 sm:py-20 px-6 relative overflow-hidden">
            <DoodleStar className="mx-auto mb-6 animate-wiggle" size={40} />
            <Squiggle
              variant="underline"
              color="#81aed9"
              className="mx-auto mb-8"
              width={240}
              height={22}
            />
            <h2 className="font-serif font-light text-[clamp(30px,5vw,50px)] leading-[1.05]">
              Got it — you’re in the <em className="font-normal">queue</em>.
            </h2>
            <p className="font-sans text-[14px] tracking-tight text-charcoal mt-5 max-w-md mx-auto">
              We’ll reply within one working day with next steps.
            </p>
            <div className="flex justify-center mt-9">
              <PillButton to="/" variant="solid" size="lg">
                Back home
              </PillButton>
            </div>
            <p className="font-sans text-[12px] tracking-tight text-charcoal mt-6">
              (taking you to a little thank-you page, as we speak…)
            </p>
          </SketchCard>
        ) : (
          /* ── THE FORM ──────────────────────────────────────────────────── */
          <div className="relative">
            <Squiggle
              variant="swirl"
              className="absolute -top-12 -right-8 -z-10 opacity-40 hidden md:block"
              width={170}
              height={70}
            />
            <SketchCard hover={false} className="p-8 sm:p-10">
              <form onSubmit={submit} noValidate className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel htmlFor="quote-name">Name *</FieldLabel>
                    <SketchInput
                      id="quote-name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => markTouched("name")}
                      placeholder="Your name"
                      aria-invalid={showHint("name")}
                    />
                    {showHint("name") && (
                      <p className="font-sans text-[12px] tracking-tight text-coral mt-2 ml-2">
                        (we’d love to know who’s dreaming)
                      </p>
                    )}
                  </div>
                  <div>
                    <FieldLabel htmlFor="quote-email">Email *</FieldLabel>
                    <SketchInput
                      id="quote-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => markTouched("email")}
                      placeholder="you@company.com"
                      aria-invalid={showHint("email")}
                    />
                    {showHint("email") && (
                      <p className="font-sans text-[12px] tracking-tight text-coral mt-2 ml-2">
                        (needed — the reply has to reach someone)
                      </p>
                    )}
                  </div>
                  <div>
                    <FieldLabel htmlFor="quote-company">Company</FieldLabel>
                    <SketchInput
                      id="quote-company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Optional, but helpful"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="quote-phone">Phone</FieldLabel>
                    <SketchInput
                      id="quote-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 … (optional)"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="quote-service">Service *</FieldLabel>
                    <SketchSelect
                      id="quote-service"
                      value={form.service}
                      onChange={(e) => {
                        update("service", e.target.value);
                        markTouched("service");
                      }}
                      onBlur={() => markTouched("service")}
                      aria-invalid={showHint("service")}
                    >
                      <option value="">Choose one…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </SketchSelect>
                    {showHint("service") && (
                      <p className="font-sans text-[12px] tracking-tight text-coral mt-2 ml-2">
                        (pick the closest — “something else” counts)
                      </p>
                    )}
                  </div>
                  <div>
                    <FieldLabel htmlFor="quote-budget">Budget *</FieldLabel>
                    <SketchSelect
                      id="quote-budget"
                      value={form.budget}
                      onChange={(e) => {
                        update("budget", e.target.value);
                        markTouched("budget");
                      }}
                      onBlur={() => markTouched("budget")}
                      aria-invalid={showHint("budget")}
                    >
                      <option value="">Choose a range…</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </SketchSelect>
                    {showHint("budget") && (
                      <p className="font-sans text-[12px] tracking-tight text-coral mt-2 ml-2">
                        (“not sure yet” is a perfectly honest answer)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="quote-message">
                    What are you trying to make happen? *
                  </FieldLabel>
                  <SketchTextarea
                    id="quote-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => markTouched("message")}
                    placeholder="The problem, the deadline, the data you have, the data you wish you had — sketches welcome in words."
                    className="min-h-[160px]"
                    aria-invalid={showHint("message")}
                  />
                  {showHint("message") && (
                    <p className="font-sans text-[12px] tracking-tight text-coral mt-2 ml-2">
                      (this is the field we read first — give it your best ink)
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <PillButton
                    type="submit"
                    variant="solid"
                    size="lg"
                    disabled={sending || !valid}
                  >
                    {sending ? "Sending…" : "Send the dream"}
                  </PillButton>
                  {!valid && !sending && (
                    <span className="hidden sm:flex items-center gap-2">
                      <HandArrow width={54} height={38} flip className="rotate-[8deg]" />
                      <span className="font-sans text-[12px] tracking-tight text-charcoal">
                        (a few required fields are still sketchy)
                      </span>
                    </span>
                  )}
                </div>
              </form>
            </SketchCard>
          </div>
        )}
      </Section>

      {/* ── REASSURANCE STRIP ──────────────────────────────────────────────── */}
      {!sent && (
        <Section className="max-w-3xl pt-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center border-t-[1.5px] border-ink/10 pt-8">
            <p className="font-sans text-[13px] tracking-tight text-charcoal">
              (Your details go nowhere but our inbox — see the{" "}
              <Link to="/privacy" className="link-coral">
                privacy page
              </Link>{" "}
              for the unexciting truth.)
            </p>
          </div>
        </Section>
      )}
    </div>
  );
}
