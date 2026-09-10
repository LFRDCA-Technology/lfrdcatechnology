"use client";

// ── Careers — open roles, honest hiring process, perks marquee ───────────────

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/auth";
import type { Job } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import {
  EmptyState,
  FieldLabel,
  LoadingState,
  Marquee,
  PageHero,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  SketchInput,
  SketchTextarea,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

const FALLBACK_JOBS: Job[] = [
  {
    id: "fallback-1",
    slug: "data-analyst-intern",
    title: "Data Analyst Intern",
    department: "Data",
    location: "Noida (Hybrid)",
    type: "Internship",
    experience: "0-1 years",
    description:
      "A six-month paid internship where you’ll do real work on real client data — not a shadowing programme. Interns at LFRDCA have built production dashboards in week three and presented to clients in month two.\n\nExpect SQL you didn’t know you had in you, dashboards with your name on them, and a hiring conversation at the end if the work is strong.",
    requirements: [
      "Final-year student or recent graduate (any discipline with quantitative appetite)",
      "SQL basics — joins, group-bys, and the courage to look up the rest",
      "Excel/Sheets fluency that goes beyond SUM",
      "Writing clarity — you can explain a finding to a non-technical friend",
      "Curiosity, coachability, and questions — lots of them",
    ],
    active: true,
    createdAt: "2026-08-20T09:00:00.000Z",
  },
  {
    id: "fallback-2",
    slug: "ml-engineer",
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Noida (Hybrid)",
    type: "Full-time",
    experience: "3-6 years",
    description:
      "Own models from notebook to production: training pipelines, evaluation harnesses, monitoring and the occasional 2 a.m. retrain. We ship ML that survives contact with real users — in hospitals, factories and fintech ledgers.\n\nYou’ll work in small pods with data engineers and product-minded analysts, and present your own work to clients fortnightly.",
    requirements: [
      "3+ years shipping production ML (Python, scikit-learn, PyTorch or similar)",
      "Solid grasp of evaluation design and model monitoring",
      "Comfortable with SQL and data wrangling at scale",
      "Experience deploying models as services (FastAPI, Docker)",
      "Clear written communication — findings, trade-offs, failures",
    ],
    active: true,
    createdAt: "2026-07-14T09:00:00.000Z",
  },
];

const HIRING_STEPS = [
  {
    n: "01",
    title: "Intro call",
    blurb: "Thirty honest minutes — your story, our reality, mutual fit.",
  },
  {
    n: "02",
    title: "Craft conversation",
    blurb: "Deep-dive with the people you’d actually work with daily.",
  },
  {
    n: "03",
    title: "Paid mini-project",
    blurb: "A small, real problem — compensated, time-boxed, reviewed together.",
  },
  {
    n: "04",
    title: "Offer",
    blurb: "A clear number, a clear role, and no exploding deadlines.",
  },
];

const PERKS = [
  "Learning stipend",
  "Flexible hours",
  "Health cover",
  "Gadgets of your choice",
  "Conference tickets",
  "Chai on tap",
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch<Job[]>("/api/jobs");
        if (alive) setJobs(data);
      } catch {
        if (alive) setJobs(FALLBACK_JOBS);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs]
  );

  const filtered =
    department === "All" ? jobs : jobs.filter((j) => j.department === department);

  return (
    <div className="flex flex-col">
      <PageHero
        index="Careers"
        title={
          <>
            Come build <em className="font-normal">honest</em> intelligence.
          </>
        }
        parenthetical="we hire for curiosity, train for craft"
      >
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag tone="dusty">Noida Sector 62</Tag>
          <Tag tone="dusty">Hybrid-friendly</Tag>
          <Tag tone="coral">No CV theatrics</Tag>
        </div>
      </PageHero>

      {/* ── OPEN ROLES ─────────────────────────────────────────────────────── */}
      <Section id="open-roles">
        <SectionHeader
          index="01 — Open roles"
          title={
            <>
              Roles we’re <em className="font-normal">actually</em> hiring for
            </>
          }
          parenthetical="every listing is live — we pull them down the day they close"
          className="mb-10"
        />

        {loading ? (
          <LoadingState label="Ink drying on the job board…" />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <EmptyState
              title="No open roles right now — but say hello anyway"
              hint="speculative notes get read by a human, always"
            />
            <PillButton to="/contact" variant="outline">
              Say hello
            </PillButton>
          </div>
        ) : (
          <>
            {/* Department filter chips */}
            <div className="flex flex-wrap gap-3 mb-10" role="tablist" aria-label="Filter jobs by department">
              {departments.map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={department === d}
                  onClick={() => setDepartment(d)}
                  className={`rounded-[3000px] border-[1.5px] px-5 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-all cursor-pointer ${
                    department === d
                      ? "border-ink bg-ink text-paper shadow-sketch-sm"
                      : "border-ink/25 bg-white text-ink hover:border-ink hover:-translate-y-[1px]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-8">
              {filtered.map((job, i) => (
                <JobCard key={job.slug} job={job} index={i + 1} />
              ))}
            </div>
          </>
        )}

      </Section>

      {/* ── HIRING PROCESS — charcoal band ─────────────────────────────────── */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.05] max-w-xl">
              The hiring process, <em className="font-normal">unedited</em>
            </h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-paper/60">
              (usually two to three weeks, start to offer)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {HIRING_STEPS.map((step, i) => (
              <div key={step.n} className="flex flex-col gap-3 relative">
                <span className="font-serif font-light text-5xl text-paper/30">
                  {step.n}
                </span>
                <h3 className="font-serif font-light text-2xl leading-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed tracking-tight text-paper/70">
                  {step.blurb}
                </p>
                {i < HIRING_STEPS.length - 1 && (
                  <Squiggle
                    variant="wave"
                    color="#81aed9"
                    className="hidden lg:block absolute -right-8 top-2 opacity-60"
                    width={64}
                    height={28}
                  />
                )}
              </div>
            ))}
          </div>
          <DoodleStar color="#ff8562" className="mt-10 animate-wiggle" size={30} />
        </div>
      </section>

      {/* ── PERKS MARQUEE ──────────────────────────────────────────────────── */}
      <Marquee items={PERKS} slow />

      {/* ── CLOSING NOTE ───────────────────────────────────────────────────── */}
      <Section className="text-center max-w-3xl">
        <Squiggle
          variant="underline"
          color="#81aed9"
          className="mx-auto mb-8"
          width={260}
          height={24}
        />
        <h2 className="font-serif font-light text-[clamp(26px,4vw,40px)] leading-[1.08]">
          Don’t see your role? <em className="font-normal">Sketch it for us.</em>
        </h2>
        <p className="font-sans text-sm tracking-tight text-charcoal mt-4 max-w-md mx-auto">
          (Tell us what you’d do here that nobody else would — we read every
          note, and we reply to all of them)
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <PillButton to="/contact" variant="solid">
            Send a speculative note
          </PillButton>
          <PillButton to="/internships" variant="outline">
            Internship programmes
          </PillButton>
        </div>
      </Section>
    </div>
  );
}

/* ── Job card — expandable detail + inline apply form ──────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
  });

  const firstParagraph = job.description.split("\n")[0] ?? job.description;
  const excerpt =
    firstParagraph.length > 230
      ? `${firstParagraph.slice(0, 230)}…`
      : firstParagraph;

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function apply(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast({
        title: "One thing missing",
        description: "Name and email are required — that’s how we write back.",
      });
      return;
    }
    setSending(true);
    try {
      await apiFetch("/api/jobs/apply", {
        method: "POST",
        body: JSON.stringify({ jobSlug: job.slug, ...form }),
      });
      toast({
        title: "Application received",
        description: "We’ll write back within 5 working days.",
      });
      setForm({ name: "", email: "", phone: "", resumeLink: "", coverLetter: "" });
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

  return (
    <SketchCard hover={false} className="relative">
      <span className="absolute -top-4 left-6 font-serif font-light text-4xl text-ink/15">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Tag tone="dusty">{job.department}</Tag>
          <Tag>{job.type}</Tag>
          <Tag>{job.location}</Tag>
          <Tag>{job.experience}</Tag>
        </div>

        <h3 className="font-serif font-light text-[24px] leading-tight">
          {job.title}
        </h3>

        <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal max-w-3xl">
          {excerpt}
        </p>

        <div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-coral link-coral cursor-pointer"
          >
            {open ? "Hide role −" : "View role →"}
          </button>
        </div>

        {open && (
          <div className="border-t-[1.5px] border-dusty/50 pt-8 mt-2 flex flex-col gap-8">
            {/* Full description */}
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                The work, in full
              </span>
              {job.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal max-w-3xl"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Requirements checklist */}
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                What we’re hoping you bring
              </span>
              <ul className="flex flex-col gap-3 max-w-3xl">
                {job.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <Check
                      strokeWidth={1.5}
                      className="w-[18px] h-[18px] mt-[2px] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inline apply form */}
            <form
              onSubmit={apply}
              className="rounded-[20px] border-[1.5px] border-dusty/60 bg-paper/60 p-6 sm:p-8 flex flex-col gap-5"
            >
              <div>
                <h4 className="font-serif font-light text-xl">
                  Apply for this role
                </h4>
                <p className="font-sans text-[12px] tracking-tight text-charcoal mt-1">
                  (no portal maze — this goes straight to a human inbox)
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <FieldLabel htmlFor={`apply-name-${job.slug}`}>
                    Name *
                  </FieldLabel>
                  <SketchInput
                    id={`apply-name-${job.slug}`}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <FieldLabel htmlFor={`apply-email-${job.slug}`}>
                    Email *
                  </FieldLabel>
                  <SketchInput
                    id={`apply-email-${job.slug}`}
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <FieldLabel htmlFor={`apply-phone-${job.slug}`}>
                    Phone
                  </FieldLabel>
                  <SketchInput
                    id={`apply-phone-${job.slug}`}
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 …"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor={`apply-resume-${job.slug}`}>
                    Resume link
                  </FieldLabel>
                  <SketchInput
                    id={`apply-resume-${job.slug}`}
                    type="url"
                    value={form.resumeLink}
                    onChange={(e) => update("resumeLink", e.target.value)}
                    placeholder="https://drive.google.com/…"
                  />
                </div>
              </div>
              <div>
                <FieldLabel htmlFor={`apply-cover-${job.slug}`}>
                  Cover letter
                </FieldLabel>
                <SketchTextarea
                  id={`apply-cover-${job.slug}`}
                  value={form.coverLetter}
                  onChange={(e) => update("coverLetter", e.target.value)}
                  placeholder="Why this role? Why you? Two honest paragraphs beat two polished pages."
                  className="min-h-[110px]"
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <PillButton type="submit" variant="solid" disabled={sending}>
                  {sending ? "Sending…" : "Submit application"}
                </PillButton>
                <span className="font-sans text-[12px] tracking-tight text-charcoal">
                  (we reply to every application — yes, every)
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </SketchCard>
  );
}
