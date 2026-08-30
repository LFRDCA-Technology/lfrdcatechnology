"use client";

// ── Contact — the form, the address, and a hand-drawn map ────────────────────

import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  CircularImage,
  FieldLabel,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  SketchInput,
  SketchTextarea,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [nlEmail, setNlEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      toast({
        title: "A few blanks remain",
        description:
          "Name, email, subject and message — the four essentials.",
      });
      return;
    }
    setSending(true);
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast({
        title: "Message sent",
        description: "We’ll reply within one working day.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({
        title: "Couldn’t send that",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  }

  async function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!nlEmail.trim()) {
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
        { method: "POST", body: JSON.stringify({ email: nlEmail }) }
      );
      if (res.already) {
        toast({
          title: "You’re already on the list",
          description: "We kept your seat warm — no double emails, promise.",
        });
      } else {
        toast({
          title: "Subscribed",
          description: "One considered email a month, roughly. See you in the inbox.",
        });
      }
      setNlEmail("");
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

  return (
    <div className="flex flex-col">
      <PageHero
        index="Contact"
        title={
          <>
            Say <em className="font-normal">hello</em> (we answer fast).
          </>
        }
        parenthetical="one working day is our ceiling, not our average"
      />

      {/* ── FORM + DETAILS ─────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT — the form, with a squiggle hiding behind it */}
          <div className="relative">
            <Squiggle
              variant="loop"
              className="absolute -top-12 -left-6 -z-10 opacity-50 w-[220px] h-[100px]"
              width={220}
              height={100}
            />
            <Squiggle
              variant="spiral"
              color="#81aed9"
              className="absolute -bottom-14 -right-4 -z-10 opacity-40 hidden md:block"
              width={130}
              height={104}
            />
            <SketchCard hover={false} className="p-6 sm:p-9">
              <h2 className="font-serif font-light text-[clamp(24px,3.5vw,34px)] leading-[1.05] mb-2">
                Write to us, <em className="font-normal">properly</em>
              </h2>
              <p className="font-sans text-[13px] tracking-tight text-charcoal mb-8">
                (every message lands in a real inbox — lfrdcatechnologies@outlook.com,
                if you’d rather use your own mail app)
              </p>
              <form onSubmit={sendMessage} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel htmlFor="contact-name">Name *</FieldLabel>
                    <SketchInput
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="contact-email">Email *</FieldLabel>
                    <SketchInput
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel htmlFor="contact-subject">Subject *</FieldLabel>
                  <SketchInput
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="What’s this about?"
                    required
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="contact-message">Message *</FieldLabel>
                  <SketchTextarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Two honest paragraphs beat two polished pages — what are you trying to make happen?"
                    required
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <PillButton type="submit" variant="solid" disabled={sending}>
                    {sending ? "Sending…" : "Send message"}
                  </PillButton>
                  <span className="font-sans text-[12px] tracking-tight text-charcoal">
                    (reply within one working day — usually hours)
                  </span>
                </div>
              </form>
            </SketchCard>
          </div>

          {/* RIGHT — the address stack + hand-drawn map */}
          <div className="flex flex-col gap-8">
            <SketchCard hover={false} className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <CircularImage
                  src="/images/office-hero.png"
                  alt="The LFRDCA office in Noida Sector 62"
                  size={150}
                />
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <h3 className="font-serif font-light text-2xl leading-tight">
                    The Noida HQ
                  </h3>
                  <p className="font-sans text-[13px] tracking-tight text-charcoal">
                    (visitors get decent coffee and better whiteboarding)
                  </p>
                </div>
              </div>

              <div className="flex flex-col divide-y-[1.5px] divide-ink/10">
                <div className="flex items-start gap-4 py-4 first:pt-0">
                  <MapPin strokeWidth={1.5} className="w-5 h-5 mt-[2px] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-[13px] font-semibold tracking-tight">
                      Address
                    </p>
                    <p className="font-sans text-[13px] tracking-tight text-charcoal">
                      Noida Sector 62, Uttar Pradesh 201309
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-4">
                  <Phone strokeWidth={1.5} className="w-5 h-5 mt-[2px] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-[13px] font-semibold tracking-tight">
                      Phone
                    </p>
                    <a
                      href="tel:+917361864847"
                      className="font-sans text-[13px] tracking-tight text-coral link-coral"
                    >
                      +91 7361864847
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-4">
                  <Mail strokeWidth={1.5} className="w-5 h-5 mt-[2px] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-[13px] font-semibold tracking-tight">
                      Email
                    </p>
                    <a
                      href="mailto:lfrdcatechnologies@outlook.com"
                      className="font-sans text-[13px] tracking-tight text-coral link-coral break-all"
                    >
                      lfrdcatechnologies@outlook.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-4 last:pb-0">
                  <Clock strokeWidth={1.5} className="w-5 h-5 mt-[2px] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-[13px] font-semibold tracking-tight">
                      Office hours
                    </p>
                    <p className="font-sans text-[13px] tracking-tight text-charcoal">
                      Mon–Sat · 10:00–19:00 IST
                    </p>
                  </div>
                </div>
              </div>
            </SketchCard>

            {/* Hand-drawn mini-map — not a real map, on purpose */}
            <SketchCard hover={false} aria-label="Hand-drawn map of Noida Sector 62">
              <svg
                viewBox="0 0 420 260"
                width="100%"
                height="auto"
                role="img"
                aria-label="A hand-drawn sketch map showing LFRDCA’s office in Noida Sector 62"
                className="w-full"
              >
                {/* main roads */}
                <path
                  d="M20 210 C 90 200, 120 150, 155 118 C 195 78, 265 58, 395 38"
                  stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round"
                />
                <path
                  d="M65 18 C 82 88, 92 160, 82 242"
                  stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round"
                />
                <path
                  d="M345 250 C 332 182, 310 118, 268 66"
                  stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round"
                />
                {/* secondary grid roads, lighter */}
                <path
                  d="M150 30 C 158 90, 156 150, 148 205"
                  stroke="#81aed9" strokeWidth="1.2" fill="none"
                  strokeDasharray="6 6" strokeLinecap="round"
                />
                <path
                  d="M240 250 C 234 190, 236 130, 246 80"
                  stroke="#81aed9" strokeWidth="1.2" fill="none"
                  strokeDasharray="6 6" strokeLinecap="round"
                />
                <path
                  d="M100 120 C 160 108, 220 104, 300 92"
                  stroke="#81aed9" strokeWidth="1.2" fill="none"
                  strokeDasharray="6 6" strokeLinecap="round"
                />
                {/* the marker */}
                <circle
                  cx="196" cy="128" r="13"
                  stroke="#000000" strokeWidth="1.5" fill="none"
                />
                <circle cx="196" cy="128" r="3.5" fill="#000000" />
                {/* labels */}
                <text
                  x="216" y="124"
                  className="font-serif"
                  fontSize="15" fontStyle="italic" fill="#000000"
                >
                  Sector 62
                </text>
                <text
                  x="216" y="141"
                  fontSize="10" fill="#333333"
                  className="font-sans"
                >
                  (us — ask for the sketchbook wall)
                </text>
                <text
                  x="24" y="36"
                  className="font-serif"
                  fontSize="22" fontStyle="italic" fill="#000000"
                >
                  Noida
                </text>
                <text x="30" y="52" fontSize="9" fill="#333333" className="font-sans">
                  UTTAR PRADESH · 201309
                </text>
                <text x="300" y="252" fontSize="9" fill="#333333" className="font-sans">
                  toward Delhi →
                </text>
                {/* compass */}
                <path
                  d="M386 202 L 386 226 M 379 209 L 386 202 L 393 209"
                  stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
                <text x="380" y="240" fontSize="10" fill="#000000" className="font-serif" fontStyle="italic">
                  N
                </text>
              </svg>
              <p className="font-sans text-[12px] tracking-tight text-charcoal mt-4 text-center">
                (hand-drawn and only slightly to scale — real directions on
                request)
              </p>
            </SketchCard>
          </div>
        </div>
      </Section>

      {/* ── NEWSLETTER BAND ────────────────────────────────────────────────── */}
      <Section className="max-w-4xl">
        <div className="relative">
          <DoodleStar className="absolute -top-5 left-6 animate-wiggle" size={26} />
          <DoodleStar
            className="absolute -bottom-4 right-10 opacity-50"
            size={20}
            color="#81aed9"
          />
          <SketchCard tone="paper" hover={false} className="py-10 px-6 sm:px-12">
            <SectionHeader
              index="The margin notes"
              title={
                <>
                  One considered email a <em className="font-normal">month</em>, roughly
                </>
              }
              parenthetical="field notes on data & AI — unsubscribe anytime, no hard feelings"
              align="center"
              className="mb-8"
            />
            <form
              onSubmit={subscribe}
              className="flex flex-col sm:flex-row gap-4 sm:items-end max-w-xl mx-auto"
            >
              <div className="flex-1">
                <FieldLabel htmlFor="newsletter-email">Email</FieldLabel>
                <SketchInput
                  id="newsletter-email"
                  type="email"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <PillButton type="submit" variant="solid" disabled={subscribing}>
                {subscribing ? "Subscribing…" : "Subscribe"}
              </PillButton>
            </form>
          </SketchCard>
        </div>
      </Section>
    </div>
  );
}
