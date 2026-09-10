// ── LFRDCA Technologies · seed content ───────────────────────────────────────
// Plain, typed seed data for every model. Types come from @/lib/types (import
// types ONLY). Arrays stay real arrays here; seed.ts JSON.stringify's them into
// the SQLite string columns, and serializers parse them back at the API layer.

import type {
  Service,
  Industry,
  Solution,
  TeamMember,
  Post,
  CaseStudy,
  Job,
  Testimonial,
  EventItem,
  Whitepaper,
  Faq,
} from "@/lib/types";

export type ServiceSeed = Omit<Service, "id">;
export type IndustrySeed = Omit<Industry, "id">;
export type SolutionSeed = Omit<Solution, "id">;
export type TeamMemberSeed = Omit<TeamMember, "id">;
export type PostSeed = Omit<Post, "id">;
export type CaseStudySeed = Omit<CaseStudy, "id">;
export type JobSeed = Omit<Job, "id">;
export type TestimonialSeed = Omit<Testimonial, "id">;
export type EventItemSeed = Omit<EventItem, "id">;
export type WhitepaperSeed = Omit<Whitepaper, "id">;
export type FaqSeed = Omit<Faq, "id">;

export interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  phone?: string;
  company?: string;
  avatar?: string;
}

// ── Users ─────────────────────────────────────────────────────────────────────

export const seedUsers: SeedUser[] = [
  {
    name: "Satyam RojhaX",
    email: "admin@lfrdca.tech",
    password: "Admin@123",
    role: "ADMIN",
    phone: "+91 7361864847",
    company: "LFRDCA Technologies",
    avatar: "/images/team-1.png",
  },
  {
    name: "Demo Client",
    email: "demo@lfrdca.tech",
    password: "Demo@123",
    role: "USER",
    phone: "+91 98765 43210",
    company: "Demo Enterprises Pvt Ltd",
    avatar: "/images/team-6.png",
  },
];

// ── Services ──────────────────────────────────────────────────────────────────

export const services: ServiceSeed[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    tagline: "Custom AI that actually ships — not slideware.",
    description:
      "We design and engineer custom AI systems — from LLM copilots to computer vision — that slot into the way your business already works.",
    longDescription: `Every AI engagement at LFRDCA starts with a discovery sprint, not a sales deck. We sit with your team, map the workflows where decisions actually get made, and hunt for the two or three use cases where AI earns its keep — a support assistant that deflects real tickets, a document pipeline that ends copy-paste misery, a forecast your planners actually trust. If a use case survives our feasibility gauntlet, we prototype it in weeks; if it doesn't, we tell you honestly and buy you a coffee instead.

Then we build like engineers, not magicians: retrieval pipelines grounded in your own data, evaluation suites that catch regressions before your users do, guardrails tuned to your compliance team's blood pressure, and model choices justified by benchmarks rather than hype cycles. You watch progress on a live demo every fortnight — no black boxes, no "trust us, it's training."

Finally, we ship. Models land in production behind proper APIs with monitoring, fallbacks, and cost dashboards — and your team learns to operate everything through hands-on enablement sessions. When we leave, the AI is genuinely yours: documented, observable, and quietly compounding value while you sleep.`,
    icon: "brain-circuit",
    image: "/images/blog-1.png",
    features: [
      "Custom LLM applications, copilots & agents",
      "Retrieval-augmented generation (RAG) over private data",
      "Computer vision & document intelligence",
      "Model fine-tuning & evaluation frameworks",
      "AI feasibility audits & opportunity mapping",
      "Guardrails, observability & cost control",
      "Team enablement & AI-literacy workshops",
    ],
    deliverables: [
      "AI opportunity map with ranked use cases",
      "Working prototype in 4–6 weeks",
      "Production-grade AI system with APIs",
      "Evaluation report & guardrail suite",
      "Deployment runbook & monitoring dashboards",
      "Enablement workshops for your team",
    ],
    order: 1,
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    tagline: "Dashboards people actually open on Monday morning.",
    description:
      "We turn scattered data into decision-ready analytics — self-serve dashboards, KPI frameworks, and the pipelines that keep them honest.",
    longDescription: `Most analytics projects die of loneliness: beautiful dashboards nobody opens. We start instead from decisions — the Monday-morning questions your managers argue about — and work backwards to the metrics, definitions, and data they need. Our discovery phase interviews the people who will actually use the thing, so what we build answers real questions instead of decorating an unused browser tab.

Then we build the boring-but-vital foundations: clean pipelines, a semantic layer with agreed metric definitions (so "revenue" means one thing, company-wide), and dashboards designed like editorial pages — the headline number first, the detail available on request. Everything is self-serve where it should be and curated where it must be.

Finally, we ship analytics that behave like products: versioned, documented, and adopted through training sessions your team won't sleep through. Two weeks after launch we review usage patterns and prune what's being ignored — because a dashboard nobody reads is a bug, and we fix those.`,
    icon: "bar-chart-3",
    image: "/images/blog-4.png",
    features: [
      "KPI & metric framework design",
      "Self-serve BI dashboards (Looker, Power BI, Metabase)",
      "ETL/ELT pipelines & data warehousing",
      "Semantic layer & metric governance",
      "Cohort, funnel & retention analysis",
      "Automated reporting & anomaly alerting",
      "Analytics team enablement & documentation",
    ],
    deliverables: [
      "Metrics dictionary & KPI framework",
      "Warehouse-ready data pipelines",
      "Role-based dashboard suite",
      "Automated weekly insight digests",
      "Adoption training & office hours",
      "Analytics health-check after 30 days",
    ],
    order: 2,
  },
  {
    slug: "data-science",
    title: "Data Science",
    tagline: "Experiments with a lab's discipline and a startup's deadlines.",
    description:
      "From demand forecasting to pricing experiments, we run rigorous data science that survives contact with real business decisions.",
    longDescription: `Good data science is seventy percent asking the right question, and we're relentless about that first seventy percent. Our discovery phase frames hypotheses alongside your domain experts — what would change a decision if we knew it? — and designs the analysis around the decision, not the algorithm. We'd rather kill a sexy model than ship one nobody can act on.

Then we experiment like a proper lab: baselines first, honest out-of-sample validation, uncertainty quantified rather than hidden, and experiments (A/B or otherwise) designed with enough statistical power to actually mean something. You get findings written in business English — caveats intact — not a notebook dump with a ribbon on it.

Finally, we hand over both the science and the capability: documented models, reproducible pipelines, and playbooks so your analysts can rerun and extend the work. Where it makes sense, the models graduate into production ML systems with our engineering team — no messy middle left behind.`,
    icon: "flask-conical",
    image: "/images/blog-8.png",
    features: [
      "Demand forecasting & inventory optimisation",
      "Pricing & elasticity analysis",
      "A/B testing & causal inference",
      "Customer segmentation & lifetime-value models",
      "Risk scoring & propensity modelling",
      "Statistical process control",
      "Research-grade documentation & reproducibility",
    ],
    deliverables: [
      "Framed hypothesis & analysis plan",
      "Baseline models & validation report",
      "Production-ready model artefacts",
      "Experiment design & results playbook",
      "Executive findings deck in business English",
      "Reproducible code repository",
    ],
    order: 3,
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    tagline: "Models in production, not in notebooks.",
    description:
      "We engineer end-to-end ML systems — training pipelines, feature stores, and deployment — that stay accurate, monitored, and cheap to run.",
    longDescription: `The gap between a notebook that demos well and a model that earns money in production is where most ML projects are quietly buried. Our discovery phase maps that terrain early: data availability, drift risk, latency budgets, retraining triggers, and who gets paged at 2 a.m. when predictions go weird. We design for day 400, not just day one.

Then we build the machine that builds the model: versioned datasets, reproducible training pipelines, feature stores that keep training and serving consistent, and automated evaluation gates so a regression never reaches customers silently. Every model ships with a model card — its data, its limits, its expected behaviour — because undocumented models are organisational debt with interest.

Finally, we deploy with an operator's discipline: canary rollouts, drift monitoring, champion–challenger testing, and cost dashboards that keep cloud bills polite. When the model's world changes, retraining is a pipeline run — not a three-month archaeology project through a dead intern's folders.`,
    icon: "bot",
    image: "/images/blog-5.png",
    features: [
      "End-to-end MLOps pipelines (training → registry → serving)",
      "Feature stores & data versioning",
      "Batch & real-time model serving",
      "Drift detection & automated retraining",
      "Champion–challenger evaluation",
      "Model cards & lineage documentation",
      "Inference cost optimisation",
    ],
    deliverables: [
      "ML system architecture blueprint",
      "Reproducible training pipelines",
      "Deployed model endpoints (batch + real-time)",
      "Monitoring & alerting dashboards",
      "Model cards & operational runbooks",
      "Handover training for your ML team",
    ],
    order: 4,
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Infrastructure that deploys on Fridays and sleeps at night.",
    description:
      "We build cloud foundations, CI/CD, and observability so your team ships faster — and your on-call engineer actually sleeps.",
    longDescription: `Cloud should be an accelerant, not a tax. Our discovery phase audits what you have — the mystery bills, the snowflake servers, the deploy ritual that requires one specific person to be awake — and designs a target architecture your team can genuinely operate. We're platform-agnostic with strong opinions: AWS, GCP, or Azure, chosen for your workload, not our comfort.

Then we build the boring glory: infrastructure as code, CI/CD pipelines with real quality gates, environments that spin up on demand and tear down automatically, and observability wired in from day one — logs, metrics, traces, and alerts that page only when a human is actually needed. Deploys become a non-event, which is exactly how they should feel.

Finally, we harden and hand over: security baselines, cost budgets with alerts before the invoice shocks you, disaster-recovery drills your auditors will love, and runbooks written for a tired human at 3 a.m. rather than a fresh one at a conference. We leave your team faster than we found it.`,
    icon: "cloud",
    image: "/images/blog-3.png",
    features: [
      "Cloud architecture & migration (AWS · GCP · Azure)",
      "Infrastructure as code (Terraform, Pulumi)",
      "CI/CD pipelines & release automation",
      "Kubernetes & container platforms",
      "Observability: logging, metrics, tracing",
      "Cost optimisation & FinOps",
      "Security baselines & disaster recovery",
    ],
    deliverables: [
      "Cloud architecture review & roadmap",
      "Fully codified infrastructure",
      "One-click (honestly) deploy pipelines",
      "Observability stack with actionable alerts",
      "Cost report with a prioritised savings plan",
      "Runbooks & a DR drill report",
    ],
    order: 5,
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, editorial-grade web products with real craft.",
    description:
      "We design and build web applications — marketing sites, portals, dashboards — with obsessive attention to speed, accessibility, and detail.",
    longDescription: `Your website is your first impression and, too often, your slowest one. Discovery starts with your users and your goals: who's arriving, what they need in the first five seconds, and what journey turns a visit into a conversation. We audit performance and accessibility up front, because a gorgeous site that loads in six seconds is a brochure nobody reads.

Then we build with modern stack discipline — Next.js and TypeScript by default, component systems instead of page-by-page hacks, CMS integrations your marketing team can actually operate, and animation used like seasoning rather than sauce. Every build is responsive, accessible, and Lighthouse-audited before you ever see it.

Finally, we ship and stay for the part that matters: analytics wired in, SEO foundations solid, edge-cached speed, and an iteration cadence that treats launch as the starting line. Your site should get better every month it lives — so we build it so it can.`,
    icon: "globe",
    image: "/images/blog-2.png",
    features: [
      "Next.js / React application development",
      "Design systems & component libraries",
      "Headless CMS integration",
      "Performance & Core Web Vitals optimisation",
      "Accessibility (WCAG 2.2) engineering",
      "SEO architecture & structured data",
      "E-commerce & customer portals",
    ],
    deliverables: [
      "UX flows & content architecture",
      "Component-based production codebase",
      "CMS with editor training",
      "Lighthouse & accessibility audit report",
      "Analytics & event tracking setup",
      "30-day post-launch tuning",
    ],
    order: 6,
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    tagline: "Native-feeling apps your users keep on the home screen.",
    description:
      "We build cross-platform mobile apps — React Native and Flutter — that feel native, work offline, and ship to both stores without drama.",
    longDescription: `A mobile app either earns a home-screen slot or gets deleted — there's no respectable middle ground. Discovery for us means ruthless scoping: the one core job the app must do brilliantly, the flows that prove value in the first session, and an honest verdict on whether you need an app at all (sometimes the answer is a great PWA, and we'll say so to your face).

Then we build with React Native or Flutter — one codebase, two platforms, native-quality motion and gestures. Offline-first data layers, push notifications that respect the user, biometric auth where it genuinely matters, and release pipelines that push to TestFlight and Play internal testing on every commit.

Finally, we ship through store review and keep shipping: crash monitoring, retention analytics, and a feature cadence informed by what users actually do rather than what the roadmap hoped. Apps are products, not projects — we build them to live, learn, and improve.`,
    icon: "smartphone",
    image: "/images/blog-9.png",
    features: [
      "React Native & Flutter development",
      "Offline-first data synchronisation",
      "Push notifications & deep linking",
      "Biometric authentication & secure storage",
      "App Store & Play Store release automation",
      "Crash reporting & product analytics",
      "PWA development & migration",
    ],
    deliverables: [
      "Product scope & interactive prototype",
      "Cross-platform production app",
      "Store listings & release pipelines",
      "Crash & analytics instrumentation",
      "Post-launch iteration plan",
    ],
    order: 7,
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Security as a habit, not a quarterly panic.",
    description:
      "We audit, harden, and monitor your stack — application security, cloud posture, and compliance readiness — with plain-language reporting.",
    longDescription: `Security theatre is easy; security that holds is engineering. Our discovery starts with a threat model: what you have that's worth stealing, who's likely to come for it, and which doors they'd try first. We map crown-jewel data and attack paths before touching a scanner, so findings arrive prioritised by real risk — not by scanner enthusiasm.

Then we harden systematically: application security reviews (code, dependencies, auth flows), cloud posture checks against CIS benchmarks, secrets swept and rotated, and detection wired into your actual logs. We work with your developers as allies, not auditors — fixes land as pull requests with clear explanations, not as 90-page PDFs of shame.

Finally, we make it a habit: continuous monitoring, quarterly re-checks, tabletop exercises for the incidents we hope never happen, and compliance readiness (SOC 2, ISO 27001, GDPR, DPDP) built into operations instead of bolted on in a panic before an audit.`,
    icon: "shield",
    image: "/images/blog-6.png",
    features: [
      "Security audits & penetration testing",
      "Cloud security posture management",
      "Application security (AppSec) reviews",
      "Threat modelling workshops",
      "Compliance readiness (SOC 2 · ISO 27001 · GDPR · DPDP)",
      "Continuous monitoring & incident-response playbooks",
      "Developer security training",
    ],
    deliverables: [
      "Threat model & risk register",
      "Prioritised findings report with fixes",
      "Hardened cloud & application configurations",
      "Detection rules & alert runbooks",
      "Compliance gap assessment",
      "Security training for your team",
    ],
    order: 8,
  },
];

// ── Industries ────────────────────────────────────────────────────────────────

export const industries: IndustrySeed[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    description: `Healthcare runs on data that is sensitive, siloed, and stubbornly paper-flavoured. We help hospitals, diagnostics chains, and health-tech startups unify patient, operational, and billing data — with privacy engineering (DPDP/HIPAA-aligned practices, de-identification, audit trails) baked in from the first architecture diagram rather than sprinkled on at the end.

From demand forecasting for OPD staffing to diagnostic-imaging assistants and NLP over clinical notes, our healthcare work shares one obsession: clinician time is the scarcest resource in the system. If a model doesn't give a nurse or a doctor minutes back, it doesn't ship.`,
    image: "/images/case-2.png",
    stats: [
      { label: "Hospitals & health-tech clients", value: "18+" },
      { label: "Average reporting time saved", value: "31%" },
      { label: "Patient-flow prediction accuracy", value: "94%" },
    ],
    useCases: [
      "Patient-flow & bed-occupancy forecasting",
      "Clinical document intelligence (OCR + NLP)",
      "Diagnostic imaging triage assistance",
      "Supply-chain & pharmacy inventory optimisation",
      "Readmission-risk scoring & care outreach",
    ],
    order: 1,
  },
  {
    slug: "finance",
    title: "Finance",
    description: `Banks, NBFCs, and fintechs live with a paradox: move fast on data, but never drop a decimal. We build for both — real-time fraud scoring, credit-risk models with the explainability regulators accept, and data platforms that make audits a formality rather than a fire drill.

Our fintech work leans on rigorous MLOps: champion–challenger model governance, drift monitoring tied to explainability reports, and pipelines where every number can be traced to its source. Compliance teams get transparency; product teams get speed. Both get sleep.`,
    image: "/images/case-3.png",
    stats: [
      { label: "Financial-services engagements", value: "22+" },
      { label: "Fraud caught before settlement", value: "₹120Cr+" },
      { label: "Model-governance audit pass rate", value: "100%" },
    ],
    useCases: [
      "Real-time fraud detection & case triage",
      "Credit scoring with explainable AI",
      "AML transaction monitoring",
      "Customer 360 & next-best-action models",
      "Regulatory reporting automation",
    ],
    order: 2,
  },
  {
    slug: "retail",
    title: "Retail",
    description: `Retail margins are won in the unglamorous middle: forecasts, price tags, and shelf decisions. We build intelligence for that middle — demand forecasting that respects festivals and weather, pricing engines that notice competitor moves, and customer analytics that turn transactions into relationships.

Whether you run eight stores or eight hundred, we meet your stack where it lives — POS, ERP, e-commerce, marketplace feeds — and build a single view of inventory and customer that merchandisers actually use on Monday mornings.`,
    image: "/images/case-1.png",
    stats: [
      { label: "Retail & D2C clients", value: "25+" },
      { label: "Average forecast-accuracy uplift", value: "+19%" },
      { label: "Inventory carrying-cost reduction", value: "24%" },
    ],
    useCases: [
      "Demand forecasting & auto-replenishment",
      "Dynamic pricing & markdown optimisation",
      "Customer segmentation & CLV modelling",
      "Marketplace & omnichannel analytics",
      "Personalised recommendations",
    ],
    order: 3,
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: `A factory generates terabytes and insights in inverse proportion. We connect shop-floor sensors, SCADA historians, and ERP systems into a single operational data layer — then add the models that matter: predictive maintenance, visual quality inspection, and OEE analytics that survive the Gemba walk.

Our teams pair data scientists with process engineers who've stood next to a line at 2 a.m. The result is analytics operators trust — with alerts wired into work orders, not into a forgotten inbox.`,
    image: "/images/case-4.png",
    stats: [
      { label: "Manufacturing & industrial clients", value: "14+" },
      { label: "Unplanned downtime reduction", value: "37%" },
      { label: "Defect-detection accuracy", value: "99.2%" },
    ],
    useCases: [
      "Predictive maintenance & anomaly detection",
      "Visual quality inspection (computer vision)",
      "OEE & downtime analytics",
      "Energy consumption optimisation",
      "Digital twin & what-if simulation",
    ],
    order: 4,
  },
];

// ── Solutions ─────────────────────────────────────────────────────────────────

export const solutions: SolutionSeed[] = [
  {
    slug: "data-platform",
    title: "LFRDCA Data Platform",
    tagline: "One home for your data — from raw to reliable.",
    description: `The Data Platform is our flagship foundation: a modern lakehouse stack that ingests everything — databases, SaaS tools, event streams, and those spreadsheets that "are totally the source of truth" — and turns it all into governed, queryable, documented datasets your whole company can trust.

Built on proven components (warehouse or lakehouse, orchestrated pipelines, data contracts, lineage, and quality tests), it deploys in weeks and scales for years. Think of it as the plumbing and the library card catalogue for everything else you will ever want to do with data.`,
    image: "/images/blog-2.png",
    capabilities: [
      "Batch & streaming ingestion (CDC, APIs, events)",
      "Warehouse / lakehouse architecture (Snowflake, BigQuery, Databricks)",
      "Data contracts & schema enforcement",
      "Automated data-quality tests & anomaly alerts",
      "Lineage, catalogue & business glossary",
      "Role-based access & PII masking",
    ],
    outcomes: [
      { label: "Time-to-insight for new datasets", value: "Days, not months" },
      { label: "Pipeline reliability", value: "99.9%" },
      { label: "Duplicate & shadow-report reduction", value: "-70%" },
    ],
  },
  {
    slug: "ai-assistants",
    title: "LFRDCA AI Assistants",
    tagline: "Coworkers that read everything and never sleep.",
    description: `Our AI Assistants are custom-built copilots grounded in your own knowledge — policies, products, tickets, codebases — so they answer like your best-informed teammate rather than a generic chatbot. RAG architecture, domain-tuned prompts, and hard guardrails keep answers accurate, cited, and on-brand.

They deploy where your people already work: web, Slack, Teams, WhatsApp, or inside your product. Every assistant ships with an evaluation suite, conversation analytics, and clear escalation to humans — because the goal is trusted autonomy, not novelty theatre.`,
    image: "/images/ai-lab.png",
    capabilities: [
      "RAG over private documents & knowledge bases",
      "Multi-channel deployment (web, Slack, Teams, WhatsApp)",
      "Multilingual support (English + major Indian languages)",
      "Conversation analytics & insight mining",
      "Guardrails, red-teaming & content filters",
      "Human-in-the-loop escalation flows",
    ],
    outcomes: [
      { label: "Average ticket deflection", value: "60%+" },
      { label: "New-hire onboarding speed", value: "3× faster" },
      { label: "Answer accuracy in evaluations", value: "95%" },
    ],
  },
  {
    slug: "analytics-cloud",
    title: "LFRDCA Analytics Cloud",
    tagline: "BI that reads like your best analyst wrote it.",
    description: `Analytics Cloud is our managed BI layer: a curated suite of dashboards, self-serve exploration, and automated insight digests built on top of your Data Platform. Metrics are defined once, centrally, and reused everywhere — ending the "which revenue number is right" debate for good.

The experience is deliberately editorial: headline numbers first, honest context alongside, drill-down available but never required. Scheduled digests deliver the week's movements to inboxes and Slack every Monday, so insight arrives even when nobody opens a dashboard.`,
    image: "/images/data-viz.png",
    capabilities: [
      "Governed metric layer (one definition of 'revenue')",
      "Role-based dashboard suites for every team",
      "Self-serve exploration with guardrails",
      "Automated weekly insight digests",
      "Anomaly alerts on key metrics",
      "Embedded analytics for customer-facing products",
    ],
    outcomes: [
      { label: "Weekly active dashboard users", value: "78% of staff" },
      { label: "Reporting effort reduction", value: "-45%" },
      { label: "Decisions backed by data", value: "2× more" },
    ],
  },
];

// ── Team ──────────────────────────────────────────────────────────────────────

export const teamMembers: TeamMemberSeed[] = [
  {
    name: "Satyam RojhaX",
    role: "Founder & CEO",
    bio: "Satyam founded LFRDCA on the conviction that Indian enterprises deserve AI built with editorial care and engineering rigour. He still reviews every architecture diagram — and, annoyingly, every comma.",
    image: "/images/team-1.png",
    linkedin: "https://www.linkedin.com/in/satyam-rojhax",
    twitter: "https://x.com/satyamrojhax",
    order: 1,
  },
  {
    name: "Dr. Ananya Deshmukh",
    role: "Chief Data Scientist",
    bio: "Ananya holds a PhD in statistical learning and has published extensively on forecasting under uncertainty. She keeps our models honest and our p-values humble.",
    image: "/images/team-2.png",
    linkedin: "https://www.linkedin.com/in/ananya-deshmukh",
    order: 2,
  },
  {
    name: "Vikram Malhotra",
    role: "CTO",
    bio: "Vikram has architected data platforms for three unicorns and one very stubborn bank. He believes boring infrastructure is the most exciting kind there is.",
    image: "/images/team-3.png",
    linkedin: "https://www.linkedin.com/in/vikram-malhotra",
    order: 3,
  },
  {
    name: "Priya Nair",
    role: "Head of AI Engineering",
    bio: "Priya ships LLM systems that survive production — guardrails, evaluations, and all. Her prototypes have a notorious habit of becoming products.",
    image: "/images/team-4.png",
    linkedin: "https://www.linkedin.com/in/priya-nair",
    order: 4,
  },
  {
    name: "Suresh Iyer",
    role: "Head of Analytics",
    bio: "Suresh spent a decade turning retail and finance data into decisions. He designs dashboards like newspaper front pages: headline first, noise nowhere.",
    image: "/images/team-5.png",
    linkedin: "https://www.linkedin.com/in/suresh-iyer",
    order: 5,
  },
  {
    name: "Ritika Sharma",
    role: "Head of People",
    bio: "Ritika built our culture of sketchbooks, honest retros, and unlimited filter coffee. She hires for curiosity and keeps the humans humming.",
    image: "/images/team-6.png",
    linkedin: "https://www.linkedin.com/in/ritika-sharma",
    order: 6,
  },
  {
    name: "Arjun Khanna",
    role: "DevOps Lead",
    bio: "Arjun automates everything twice, then a third time for fun. His pipelines deploy on Fridays because they have earned the right.",
    image: "/images/team-7.png",
    linkedin: "https://www.linkedin.com/in/arjun-khanna",
    order: 7,
  },
  {
    name: "Manoj Verma",
    role: "Delivery Manager",
    bio: "Manoj has delivered 120+ projects across nine countries without missing a milestone. His status updates are so calm they have been mistaken for poetry.",
    image: "/images/team-8.png",
    linkedin: "https://www.linkedin.com/in/manoj-verma",
    order: 8,
  },
];

// ── Blog posts ────────────────────────────────────────────────────────────────

export const posts: PostSeed[] = [
  {
    slug: "your-data-is-a-mess-start-anywhere",
    title: "Your data is a mess — that's okay, start anyway",
    excerpt:
      "Perfect data is a fairy tale told in conference keynotes. Here's how to find real value in the mess you actually have.",
    category: "Analytics",
    tags: ["data culture", "getting started", "analytics"],
    image: "/images/blog-1.png",
    author: "Suresh Iyer",
    authorRole: "Head of Analytics",
    readTime: 5,
    views: 842,
    createdAt: "2026-09-01T10:00:00.000Z",
    content: `Every second consulting engagement starts the same way: an apologetic slide titled "Current State of Our Data" with more red boxes than green ones. The client braces for a lecture. We pour the coffee and say the thing nobody expects: *good — let's start anyway.*

## The perfection myth

There's a persistent story in our industry that analytics and AI must wait for clean data, governed catalogues, and a completed digital transformation. It's a lovely story. It's also a convenient way to postpone ever making a decision. Data is a living thing — it degrades the moment you look away, like a garden or a gym membership. Waiting for perfection means waiting forever.

> "We'll start the analytics programme once the data is clean" is the corporate version of "I'll start running once I'm fit."

## Start where the pain is

Instead of fixing everything, fix one decision. Find the question your team argues about every week — pricing, staffing, inventory, churn — and trace only the data that informs it. You'll discover three things:

- The mess is rarely uniform. The data feeding one painful decision is usually 70% usable.
- Definitions, not rows, are the real problem. Half the argument is that "active customer" means three different things.
- Fixing a metric definition is a meeting. Fixing "all data" is a mythology.

## Three honest starting rules

1. **Pick a decision, not a dataset.** Dashboards built from data "we already have" answer questions nobody asked. Decisions pull you toward the right data.
2. **Write definitions down before writing code.** One page: metric name, formula, owner, known caveats. This single document kills more arguments than any tool you can buy.
3. **Ship the ugly version in two weeks.** A rough number with a known caveat beats a perfect number arriving next fiscal year. Label the caveats loudly and proudly.

## The compounding part

Here's what happens after the first small win: someone else wants one. The metric definitions get reused. The pipeline built for one decision turns out to serve three. Six months later you look up and — quietly, without a transformation programme — you have governance, because governance is just definitions people agreed to use.

Perfect data is a destination you reach by walking, not by waiting. Lace up. Start ugly. We'll bring the coffee.`,
  },
  {
    slug: "the-honest-guide-to-ai-adoption",
    title: "The honest guide to AI adoption (no hype, we promise)",
    excerpt:
      "Three years and forty models later, our private list of enterprise AI failure modes — finally published as penance.",
    category: "AI",
    tags: ["ai strategy", "llm", "adoption"],
    image: "/images/blog-2.png",
    author: "Satyam RojhaX",
    authorRole: "Founder & CEO",
    readTime: 7,
    views: 691,
    createdAt: "2026-08-25T09:30:00.000Z",
    content: `We've spent three years helping Indian enterprises adopt AI, and we've kept a private list of every failure mode we've witnessed. This is that list, published. Consider it penance for all the keynote talks that over-promised.

## Where AI actually pays today

Narrowly, boringly, and reliably, AI pays in four places right now:

- **Document-heavy workflows** — invoices, claims, contracts, support tickets. Anything where humans copy text between systems is a retirement party for someone's Friday.
- **Assisted search over private knowledge** — policies, product docs, past tickets. RAG systems answer in seconds what used to take a Slack archaeology dig.
- **Forecasting and triage** — demand, risk, prioritisation. Models that rank, score, and warn quietly save real money.
- **Code and content acceleration** — draft generation with human review, where the human stays editor-in-chief.

Notice what's absent: fully autonomous agents running your operations. We're as excited as anyone, but we deploy autonomy the way airlines deploy autopilot — with a pilot, checklists, and a very loud horn.

> If your AI initiative can't name the decision it improves or the hours it returns, it's a press release, not a project.

## The five failure modes

1. **Pilot purgatory.** A brilliant demo that never meets production because nobody planned for evaluation, latency, or cost at scale. *Fix:* define production criteria before the prototype exists.
2. **The data surprise.** The model is fine; the data feeding it is three undocumented spreadsheets and a CRM field repurposed as a notepad. *Fix:* a two-week data reality check before any model work.
3. **Governance theatre.** A 60-page AI policy nobody reads. *Fix:* one page of rules the team can recite — what data goes in, what gets reviewed, who owns errors.
4. **Tool-first thinking.** Buying a platform and hunting for a problem to justify it. *Fix:* start from a workflow with a cost or delay you can measure.
5. **No owner.** The pilot's champion gets transferred and the system quietly rots. *Fix:* name a business owner and an engineering owner on day one.

## Our playbook in one paragraph

Run a discovery sprint that ranks use cases by value and feasibility. Prototype the winner in four to six weeks with real data and an evaluation harness. Ship behind guardrails with monitoring from day one, then expand only what earns it. Boring? Deliberately. We'd rather be the least dramatic AI partner you've worked with — and the one still standing in year three.

The organisations winning with AI aren't the ones with the biggest budgets. They're the ones that started with one honest, narrow, measured use case and told themselves the truth about the results. Start there. We're happy to help with the truth-telling part.`,
  },
  {
    slug: "dashboards-nobody-read-field-guide",
    title: "Dashboards nobody reads: a field guide (and how to fix them)",
    excerpt:
      "There's a dashboard in your company right now with two hundred charts and a weekly audience of zero. Here's the taxonomy — and the cure.",
    category: "Analytics",
    tags: ["bi", "dashboards", "design"],
    image: "/images/blog-3.png",
    author: "Suresh Iyer",
    authorRole: "Head of Analytics",
    readTime: 6,
    views: 558,
    createdAt: "2026-08-18T11:15:00.000Z",
    content: `There's a dashboard in your company right now with fourteen tabs, two hundred charts, and a weekly audience of zero. It was built with love, launched with an all-hands demo, and died of loneliness. This is a field guide to the species — and how to stop breeding them.

## The taxonomy of unread dashboards

- **The Museum.** Beautiful, interactive, visited only on tours (exec demos). Every chart is a masterpiece; none is a decision.
- **The Panic Room.** Built after an incident, it tracks everything that moved that week. Nobody remembers which red number matters.
- **The Report Refugee.** An Excel report reborn as a dashboard, inheriting all forty-seven columns and none of the insight.
- **The Kitchen Sink.** Every metric the data team could find, arranged by alphabet instead of importance.

The common ancestor: they were built from *available data* rather than from *decisions*.

> A dashboard's job is not to show data. It's to shorten the distance between a question and an action.

## The redesign that works

We redesigned a retail client's 60-chart suite into eight charts, and weekly active users went from 12% of managers to 84%. The method is embarrassingly simple:

1. **Interview the readers.** Ask each one: "What decision did this dashboard change last month?" Silence is data.
2. **Put the headline first.** Like a newspaper front page: the one number and its direction, above the fold. Detail lives one click down.
3. **Kill the zombie charts.** If nobody can explain a chart's decision, it gets archived. Grieve briefly.
4. **Write the context in.** Target lines, seasonality notes, "why this spiked" annotations. A number without narrative is trivia.
5. **Automate the visit.** The dashboard should come to people — Monday digests, anomaly pings — not wait for pilgrims.

## What good looks like

A useful dashboard is opinionated. It has a point of view: *this is the number, this is what changed, this is who should care.* It answers in one glance what the old version answered in twenty clicks.

Design your analytics the way an editorial desk designs a front page. Lead with the headline. Cut anything that doesn't inform action. Respect the reader's ten seconds, because that's all you'll ever get.

And when someone requests "just one more chart," ask the field-guide question: which decision will it change? If there's an answer — wonderful, add it. If the answer is silence, you've just met the next exhibit for the Museum. Archive it before it breeds.`,
  },
  {
    slug: "shipping-40-ml-models-to-production",
    title: "What we learned shipping 40 ML models to production",
    excerpt:
      "Forty deployments later, the lessons that matter: evaluation is the product, drift is not an edge case, and boring is the trophy.",
    category: "MLOps",
    tags: ["mlops", "production", "lessons"],
    image: "/images/blog-4.png",
    author: "Priya Nair",
    authorRole: "Head of AI Engineering",
    readTime: 8,
    views: 913,
    createdAt: "2026-08-08T08:45:00.000Z",
    content: `Forty models into our MLOps journey, we sat down as a team and asked an uncomfortable question: what do we know now that we wish someone had told us at model number one? This post is the answer, lightly edited for print.

## Lesson 1: The model is 10% of the system

At model one, we budgeted eighty percent of effort for modelling. Reality: data pipelines, evaluation, serving, monitoring, and fallbacks consumed ninety percent of the work. The model is the shiny part; the system is the part that matters.

- A mediocre model with great monitoring beats a great model with none.
- A simple model that retrains in minutes enables an iteration cadence a monster model can't.

## Lesson 2: Evaluation is the product

Nobody thanks you for clever architecture. Everybody thanks you for catching a regression before customers did. Every model we ship now has an evaluation suite built *before* training completes — golden datasets, regression tests, and slice metrics for the segments that matter.

> The question is never "is the model good?" It's "will we know, before users do, when it gets worse?"

## Lesson 3: Drift is not an edge case

Of the forty models, twenty-two experienced meaningful data drift within six months of launch. A festival calendar shifted demand patterns; a supplier change altered sensor baselines; a new sales team entered leads differently. Drift isn't an if — it's a when, and it usually arrives politely disguised as a "weird week."

Our answer: every model ships with a retraining trigger defined by the people who own the business metric, not by an engineer's intuition about accuracy curves.

## Lesson 4: Champion–challenger keeps everyone honest

Every production model now runs against one or two challengers on live shadow traffic. About a third of challengers eventually win. The discipline kills the political question "should we retrain?" and replaces it with data.

## Lesson 5: Cost is a first-class metric

Our most embarrassing production story: a real-time endpoint that worked beautifully and cost more per prediction than the decision it informed. Now every model card includes cost per thousand predictions, and every dashboard has an efficiency panel.

## The checklist we use now

1. Evaluation harness before production deployment
2. Monitoring for data drift, prediction drift, and the business metric
3. An automated retraining trigger with a human-approvable path
4. Champion–challenger (or at minimum, shadow) setup
5. Cost per prediction tracked and budgeted
6. A model card: intended use, data lineage, known failure modes
7. A rollback that takes one command, not one war room

None of this is glamorous. All of it is why our fortieth deployment was a non-event — scheduled, monitored, and followed by... nothing. No alerts, no surprises, no drama. In production ML, boring is the trophy.`,
  },
  {
    slug: "the-quiet-revolution-in-data-engineering",
    title: "The quiet revolution in data engineering",
    excerpt:
      "While AI took the spotlight, pipelines became contracts, quality checks moved into CI, and the data lakehouse merged. A field report.",
    category: "Data Engineering",
    tags: ["data engineering", "pipelines", "architecture"],
    image: "/images/blog-5.png",
    author: "Vikram Malhotra",
    authorRole: "CTO",
    readTime: 5,
    views: 404,
    createdAt: "2026-08-01T14:00:00.000Z",
    content: `While the AI spotlight burns bright, something quieter has been happening underneath it: data engineering has been rewritten. Not with one big bang, but with a dozen small tectonic shifts that together change how every pipeline gets built. If your mental model of data engineering is still "nightly cron jobs into a warehouse," it's time for an update.

## What changed

- **Schemas became contracts.** Data producers now publish contracts — expected columns, types, freshness — and pipelines fail loudly when reality drifts. The wild-west CSV is being domesticated.
- **ELT ate ETL.** Load raw first, transform inside the warehouse where compute is elastic and SQL is testable. dbt-style transformation turned analytics engineering into a software discipline with version control and CI.
- **Streaming stopped being exotic.** CDC connectors made "real-time-ish" the default for operational data. The question is no longer batch versus stream; it's "how fresh does this decision actually need to be?"
- **The lakehouse merger.** Warehouse rigour and lake flexibility converged. One table format, multiple engines, fewer midnight migrations.
- **Quality checks moved left.** Data tests run in CI like unit tests. Broken data is caught at pull-request time, not in Thursday's board report.

> The pipeline is no longer plumbing. It's a product — with users (analysts), uptime expectations, and a roadmap.

## Why this matters more than it sounds

Every one of these shifts compresses the distance between "an event happened" and "a decision can use it." We recently rebuilt a client's retail stack on these patterns: ingestion that once took a nine-person quarter now runs as a maintained pipeline that one engineer oversees. That's not a nice-to-have; that's the difference between a data team that drowns and one that innovates.

## The unglamorous superpowers

The modern data engineer's toolkit rewards patience over wizardry:

1. Declared, versioned infrastructure (Terraform, dbt projects)
2. Tests on data, not just on code
3. Lineage and cataloguing as defaults, not afterthoughts
4. Observability — freshness, volume, distribution — on every critical table

## The quiet conclusion

AI gets the keynotes, but AI is downstream of this revolution: every reliable model is a tenant of reliable pipelines. The companies winning at AI in 2026 mostly won data engineering in 2023.

So here's to the quiet revolution — the schemas enforced, the tests written, the 3 a.m. pager silenced. If your pipelines still whisper secrets in cron logs, come talk to us. We speak fluent unglamorous.`,
  },
  {
    slug: "your-cloud-bill-is-a-design-problem",
    title: "Your cloud bill is a design problem",
    excerpt:
      "The top three line items on your cloud invoice are almost never pricing problems. They're architecture decisions wearing a pricing costume.",
    category: "Cloud",
    tags: ["cloud", "finops", "cost optimisation"],
    image: "/images/blog-6.png",
    author: "Arjun Khanna",
    authorRole: "DevOps Lead",
    readTime: 6,
    views: 617,
    createdAt: "2026-07-27T10:30:00.000Z",
    content: `We've audited dozens of cloud bills, and the pattern is remarkably consistent: the top three line items are almost never pricing problems. They're design problems wearing a pricing costume. Here's how to tell the difference — and what to do about it.

## The usual suspects

- **The idle orchestra.** Dev and staging environments running 24/7 for code that deploys weekly. That's 168 hours of compute serving 4 hours of real use. *Fix:* ephemeral environments that spin up on pull request and die on merge. Typical saving: 60–70% of non-production spend.
- **The chatty services.** Microservices designed without thinking about where data lives, resulting in cross-AZ traffic bills larger than some compute lines. *Fix:* co-locate hot services, cache aggressively, batch the chatter.
- **The forgotten storage.** Snapshots from 2022, logs with no retention policy, five versions of the same dataset. *Fix:* lifecycle rules on day one. Storage is cheap; storage *forever* is not.
- **The oversized instance.** A 32-core machine serving 4% CPU because someone benchmarked for the Diwali traffic peak and never downsized. *Fix:* autoscaling with sane baselines and scheduled scaling for known peaks.

> Nobody ever chose a bigger instance to be wasteful. They chose it to be *safe*. Cost problems are usually courage problems.

## FinOps is engineering, not accounting

The deep insight from our cost work: you cannot optimise a bill you only see monthly. Cost must be a first-class, observable signal — per service, per feature, per team — visible in the same dashboards engineers already watch.

Three practices that pay for themselves immediately:

1. **Tag everything, budget everything.** Every resource carries an owner and a cost centre. Every service has a monthly budget with alerts at 50%, 80%, and 100%.
2. **Make cost visible in code review.** For high-traffic paths, a comment on expected cost per request does to waste what code review does to bugs.
3. **Right-size with real data.** A week of utilisation metrics beats a quarter of guessing. Downsize, watch, downsize again.

## The honest arithmetic

On recent engagements, these measures cut cloud spend by 30–45% with zero performance regression — often with *better* reliability, because the same observability that finds waste also finds fragility.

Your cloud provider's pricing page is not where the money leaks. The architecture diagram is. Treat your bill as a design review in disguise, and suddenly the invoice becomes one of the most informative documents your engineering organisation produces.`,
  },
  {
    slug: "security-isnt-a-checkbox-its-a-habit",
    title: "Security isn't a checkbox, it's a habit",
    excerpt:
      "Audits are snapshots; attackers ship continuously. Five everyday habits that separate the calm teams from the paged teams.",
    category: "Security",
    tags: ["security", "appsec", "culture"],
    image: "/images/blog-7.png",
    author: "Vikram Malhotra",
    authorRole: "CTO",
    readTime: 5,
    views: 349,
    createdAt: "2026-07-21T13:20:00.000Z",
    content: `Every security audit produces two artefacts: a findings report and a feeling. The report lists the twelve vulnerabilities. The feeling — usually unspoken — is that security is something that happens to the team twice a year, like performance reviews and fire drills. The teams that stay out of breach headlines are the ones that replace that feeling with habits.

## Why checklists fail

A penetration test is a snapshot. A compliance certification is a photograph of last quarter. Attackers, meanwhile, ship continuously. The gap between "we passed the audit" and "we are secure" is filled entirely by what happens on ordinary Tuesdays — the dependency update someone skipped, the S3 bucket someone opened "temporarily," the API key pasted into a chat thread.

> Security theatre has great production values. Security habit has great outcomes.

## The habits that matter

From our AppSec work across dozens of codebases, five habits separate the calm teams from the paged teams:

1. **Dependency updates as routine, not project.** Automated dependency PRs, reviewed like any other code. Most exploited vulnerabilities are months old with patches already available.
2. **Secrets never touch code or chat.** A secret manager plus a pre-commit scanner. The one time it saves you pays for the whole programme.
3. **Least privilege by default.** Every new service, bucket, and token starts with minimum permissions. Escalation is a two-line change; over-permission is a quiet catastrophe.
4. **Logging that answers questions.** Not everything logged, but the right things: auth events, permission changes, admin actions. When something odd happens, you want a trail, not a séance.
5. **Blameless security retros.** When a near-miss happens, the postmortem asks "what made this easy to do?" and fixes the system, not the human.

## Culture beats compliance

Here's our favourite measure of a security culture: what happens when a junior developer spots something suspicious? In healthy teams, they mention it in the open channel and get thanked. In unhealthy ones, they stay quiet — and the attacker who finds the same gap next month certainly won't.

Compliance frameworks (SOC 2, ISO 27001, DPDP) are useful scaffolding — they force the boring basics. But they're the floor, not the ceiling. The ceiling is a team for whom "secure" is simply how the work gets done, the way clean commit messages are.

Security isn't a checkbox, because checkboxes get ticked once. Habits get practised daily. Start with one: enable automated dependency updates this week. It's the security equivalent of flossing — unglamorous, daily, and disproportionately effective.`,
  },
  {
    slug: "llms-in-the-enterprise-signal-from-noise",
    title: "LLMs in the enterprise: separating signal from noise",
    excerpt:
      "What's actually working with enterprise LLMs, what quietly isn't, and the three questions that separate real teams from performative ones.",
    category: "AI",
    tags: ["llm", "rag", "enterprise ai"],
    image: "/images/blog-8.png",
    author: "Dr. Ananya Deshmukh",
    authorRole: "Chief Data Scientist",
    readTime: 7,
    views: 786,
    createdAt: "2026-07-14T09:00:00.000Z",
    content: `Every quarter, we brief boards and leadership teams on the state of enterprise AI. The questions are always the same, so consider this the briefing without the boardroom: what's actually working with LLMs in enterprises, what isn't, and how to tell them apart in your own organisation.

## The signal: where LLMs reliably earn their keep

- **Knowledge retrieval over private corpora.** RAG systems over policies, contracts, tickets, and documentation are the workhorse deployment of the era. Grounded in your own text and cited properly, they answer like a well-read colleague.
- **Structured extraction.** Turning messy documents — invoices, claims forms, resumes — into structured data. Accuracy numbers that would have been research papers three years ago are now just Tuesday.
- **Draft-with-review workflows.** First drafts of emails, reports, code, and summaries, with humans as editors. The productivity gain is real but *conditional on the editor staying engaged*.
- **Classification and routing.** Triage of tickets, messages, and leads. Boring, measurable, and quietly excellent.

## The noise: where enthusiasm outruns evidence

- **Fully autonomous multi-step agents** in high-stakes processes. The demos dazzle; the error compounding at step seven of nine does not forgive.
- **"AI strategy" without a use case.** Buying capability and hoping for problems. Hope is not a deployment plan.
- **Fine-tuning as a first resort.** Most teams want better *answers from their data*, which is a retrieval problem, not a parameter problem. Fine-tune for style and format; retrieve for facts.
- **Numbers without denominators.** "Our pilot saved 400 hours" — of whose time, verified how, against what baseline? If the evaluation isn't defined before the pilot, the result is marketing.

> The difference between a demo and a system is what happens on the inputs nobody showed you.

## The evaluation gap

The single biggest predictor of enterprise LLM success is not model choice — it's whether the team built an honest evaluation harness. Golden question sets, adversarial probes, slice analysis by query type, human review loops. In our deployments, evaluations catch the majority of regressions that would otherwise surface as user complaints.

Ask any vendor or internal team three questions:

1. What is your evaluation set, and who maintains it?
2. What does the system do when it doesn't know?
3. Show me the worst outputs from last month, and what changed because of them.

Good teams answer instantly. Performative teams change the subject.

## Our working recommendation

Start with retrieval over your own knowledge. Define evaluations before deployment. Keep humans in the loop on anything customer-facing. Measure everything — accuracy, latency, cost per query, escalation rate. Expand only what survives contact with real users.

The signal is real; it's just quieter than the noise. The organisations benefiting are the ones treating LLMs as *systems to be engineered* rather than magic to be summoned. Be boring. Be measured. Be early enough that the compounding starts now.`,
  },
  {
    slug: "from-notebooks-to-production-messy-middle",
    title: "From notebooks to production: surviving the messy middle",
    excerpt:
      "The journey from 'it works in my notebook' to 'it runs the business' passes through a messy middle nobody photographs. Here's the map.",
    category: "MLOps",
    tags: ["ml engineering", "notebooks", "pipelines"],
    image: "/images/blog-9.png",
    author: "Priya Nair",
    authorRole: "Head of AI Engineering",
    readTime: 6,
    views: 523,
    createdAt: "2026-07-08T15:45:00.000Z",
    content: `Every data scientist knows the notebook. It's where insights are born, hairs are pulled, and — if we're honest — where a little too much of the work goes to die. The journey from "it works in my notebook" to "it runs the business" passes through a messy middle that nobody photographs. Here's the map.

## Why notebooks lie

Notebooks are wonderful for exploration and terrible for operations, for structural reasons:

- **Hidden state.** Cells run in an order history will never reveal. That "works on my machine" is actually "works on my machine, in this order, with these cached variables."
- **The data assumption.** Notebooks assume the data as it existed at the moment of exploration. Production data arrives late, malformed, and occasionally hostile.
- **No contract.** Nothing enforces input schema, output shape, or runtime limits. Production is made entirely of enforced contracts.

> A notebook is a conversation with your data. Production is a marriage. Different commitments entirely.

## The migration path that works

We've walked this road dozens of times, and the reliable route has five steps:

1. **Freeze the logic.** Refactor the notebook into pure functions — inputs in, outputs out, no hidden state. If a function needs cell 23's variable, that's a parameter now.
2. **Write the contracts.** Define input and output schemas explicitly. Validate at every boundary. Malformed data should fail loudly at the door, not corrupt silently in the living room.
3. **Test with real data shapes.** Unit tests on synthetic data catch typos; only tests against real (anonymised) data catch the truth — nulls where angels fear to tread, Unicode surprises, timestamps in three timezones.
4. **Containerise and schedule.** The pipeline gets a runtime with dependencies pinned, resources bounded, and retries with backoff. The notebook's operating system — you — is deprecated.
5. **Observe from day one.** Runtime, data volume, output distribution, business metric. Drift alerts before stakeholders ask why the numbers look odd.

## Keep the notebook, change its job

None of this means notebooks are the enemy. In healthy teams, notebooks remain the laboratory: exploration, ad-hoc analysis, incident forensics. What changes is that anything which proves valuable *graduates* — through the five steps — into a monitored, versioned pipeline.

The messy middle is where most analytical value quietly evaporates. Teams that systematise the crossing — templates, checklists, paved roads — compound their wins. Teams that don't keep rediscovering their own insights every six months, like a kind of data-science amnesia.

Respect the notebook. Then help its best ideas grow up.`,
  },
  {
    slug: "your-warehouse-needs-a-semantic-layer",
    title: "Why your data warehouse needs a semantic layer (before your BI tool does)",
    excerpt:
      "Three teams, three definitions of revenue, one very long meeting. The unglamorous fix is a semantic layer — and you can start in two weeks.",
    category: "Data Engineering",
    tags: ["semantic layer", "metrics", "governance"],
    image: "/images/blog-10.png",
    author: "Dr. Ananya Deshmukh",
    authorRole: "Chief Data Scientist",
    readTime: 4,
    views: 288,
    createdAt: "2026-07-03T10:15:00.000Z",
    content: `Here's a scene replayed in companies everywhere: the CFO asks for revenue. Marketing exports one number from the BI tool, finance pulls another from the warehouse, and the sales dashboard shows a third. All three are correct — by their own definitions. The meeting becomes an archaeology expedition into SQL instead of a decision. The missing piece has an unglamorous name: a semantic layer.

## What it actually is

A semantic layer is a single, governed definition of your business metrics — revenue, active customer, churn, margin — expressed once and reused everywhere: dashboards, ad-hoc queries, ML features, embedded analytics. One definition of revenue. One owner. One place to change it when the business definition evolves.

Think of it as the constitution of your metrics: short, central, and consulted constantly.

> Without a semantic layer, every analyst is a constitutional lawyer arguing from their own private SQL.

## Why it comes before the BI tool

Companies often buy BI licences hoping the tool will impose order. But BI tools are presentation layers — they happily display whatever definition each dashboard author wrote. The disagreement isn't in the charts; it's underneath them. Building the semantic layer first gives every future tool, dashboard, and model the same source of truth.

## What you get

- **One number, everywhere.** The CFO, the marketing dashboard, and the churn model all cite the same revenue. Meetings shorten by magic.
- **Definitions with owners.** Each metric has a name, formula, owner, and documented caveats. When the definition changes, there's a commit — with a reason — not a rumour.
- **Faster analysts.** Instead of re-deriving "active customer" for the seventh time, analysts select it. Onboarding a new analyst drops from months to weeks.
- **Trustworthy ML features.** Models trained on governed metrics inherit the governance. Feature definitions that match reporting definitions prevent a whole genre of production surprises.

## How to start without a project plan

Begin with the five metrics your leadership team argues about most. Define them in a semantic modelling tool (dbt metrics, Cube, or your warehouse's native layer), socialise the definitions, and migrate one dashboard at a time. Total elapsed time for round one: about two weeks.

Governance sounds like bureaucracy and feels like relief. The first time an executive asks "which number is right?" and the whole room answers "that one" — you'll wonder why anyone enjoyed the archaeology.`,
  },
];

// ── Case studies ──────────────────────────────────────────────────────────────

export const caseStudies: CaseStudySeed[] = [
  {
    slug: "retail-intelligence-revamp",
    client: "Vastra Retail",
    title: "Demand intelligence that restocks itself",
    industry: "Retail",
    challenge: `Vastra Retail's 120 stores ran on gut feel and a spreadsheet named FINAL_v9. Forecasting was a weekly ritual of manual overrides, overstocks of last season's kurtas sat in warehouses, and bestsellers stockouted in the top-performing stores — during festival season, no less. The merchandising team was drowning, and every stockout was a customer walking straight to a competitor.

The core problem was structural: point-of-sale data lived in one system, e-commerce in another, and the warehouse in a third — none of them talking. Decisions needed a week of data archaeology, by which time the season had already moved on.`,
    solution: `We built a unified retail data platform — ingesting POS, e-commerce, inventory, and weather signals — and layered demand-forecasting models on top, tuned for Indian retail's festival calendar. The forecast engine produces store-and-SKU-level predictions refreshed daily, feeding a replenishment recommender that drafts purchase orders for buyer approval.

We deliberately kept buyers in the loop: the system recommends, humans approve with one click, and every override feeds back into the model. Six months in, the models had earned a trust the spreadsheet never could — override rates fell from 40% to under 10%.`,
    results: [
      "Forecast accuracy improved from 68% to 91% at store-SKU level",
      "Stockouts during festival season cut by two-thirds",
      "Carrying cost reduced by ₹4.2 crore annually",
      "Buyer decision cycle compressed from 7 days to same-day",
    ],
    metrics: [
      { label: "Revenue uplift", value: "+38%" },
      { label: "Weeks to launch", value: "6" },
      { label: "Forecast accuracy", value: "91%" },
    ],
    image: "/images/case-1.png",
    year: "2025",
    featured: true,
    services: ["data-analytics", "machine-learning", "data-science"],
  },
  {
    slug: "hospital-forecast-care",
    client: "MediTrust Hospitals",
    title: "Predicting patient flow for a 400-bed hospital",
    industry: "Healthcare",
    challenge: `MediTrust's flagship 400-bed hospital ran at 96% occupancy — great for the business case, brutal for operations. Elective surgeries got bumped, ER wait times crept up, and staffing decisions were made on averages that fit no actual day. The hospital needed to predict demand rather than merely record it.

The data existed — ADT feeds, scheduling systems, historical admission logs — but it sat in silos with no shared time frame. Nursing rosters were planned weeks in advance against demand that varied by 40% week to week.`,
    solution: `We built a patient-flow forecasting platform that predicts admissions, discharges, and bed occupancy fourteen days ahead at department granularity. The models blend seasonal patterns, scheduled procedures, epidemic signals, and local events — and feed a staffing recommendation engine that drafts rosters for nursing supervisors to review.

Deployment was clinician-first by design: dashboards live in the duty manager's office, predictions arrive with confidence ranges, and every recommendation explains itself. Adoption was never mandated — it spread hospital by hospital because the night shift told the day shift about it.`,
    results: [
      "Bed occupancy optimised to 88% with fewer elective bumps",
      "ER wait times down 23% at peak hours",
      "Agency nursing spend reduced by ₹1.1 crore a year",
      "Adopted across 3 hospitals in the group within 8 months",
    ],
    metrics: [
      { label: "Prediction accuracy", value: "94%" },
      { label: "ER wait time", value: "-23%" },
      { label: "Annual savings", value: "₹1.1Cr" },
    ],
    image: "/images/case-2.png",
    year: "2025",
    featured: true,
    services: ["data-science", "ai-development", "data-analytics"],
  },
  {
    slug: "fintech-fraud-shield",
    client: "PayNorth",
    title: "A fraud shield that scores in 40 milliseconds",
    industry: "Fintech",
    challenge: `PayNorth, a fast-growing payments platform processing two million transactions a day, was losing the cat-and-mouse game against fraud rings. Their rules engine caught the obvious stuff, but sophisticated attacks sailed through — chargebacks were climbing 8% month over month, and mounting regulatory heat made every incident a reportable event.

Worse, every new rule took three weeks of committee review, by which time the fraud pattern had already retired. They needed millisecond scoring that learns, wrapped in model governance their auditors and the regulator could love.`,
    solution: `We built a real-time fraud-scoring service: gradient-boosted models enriched with graph features — device rings, beneficiary networks, velocity patterns — scoring every transaction in under 40 milliseconds at peak load. A champion–challenger framework tests new models against live traffic in shadow mode before promotion, and every decline ships with an explainability report for the compliance team.

The system was designed for the audit trail from day one: full decision logging, model cards, drift monitoring, and a quarterly model-risk review pack that their regulator's inspection team described — verbatim — as "unusually thorough."`,
    results: [
      "Fraud losses down 71% within four months",
      "False-positive rate halved, saving 18,000 good transactions monthly",
      "Scoring latency p99: 38ms at 2M transactions per day",
      "Zero regulatory findings across two RBI inspections",
    ],
    metrics: [
      { label: "Fraud loss reduction", value: "-71%" },
      { label: "Scoring latency", value: "38ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    image: "/images/case-3.png",
    year: "2024",
    featured: true,
    services: ["machine-learning", "ai-development", "cloud-devops"],
  },
  {
    slug: "predictive-factory-maintenance",
    client: "IronCast Motors",
    title: "Machines that schedule their own maintenance",
    industry: "Manufacturing",
    challenge: `IronCast Motors' foundry line lost nineteen hours a month to unplanned downtime — each hour costing ₹6 lakh. Maintenance was calendar-based, which meant parts replaced too early (waste) and bearings failing too late (catastrophe). Their maintenance chief had a decade of intuition and a shoebox of paper logs.

The plant's CNC machines and conveyors produced sensor data that flowed straight into a historian nobody queried. The knowledge to predict failures existed in the data and in veterans' heads — it just needed to be united.`,
    solution: `We connected the historian, added IIoT sensors on six legacy machines, and built anomaly-detection models per asset class — thermal, vibration, and current signatures learned from three years of history plus eleven labelled failures. Alerts route directly into their CMMS as prioritised work orders with failure-mode hypotheses attached.

The rollout was deliberately old-school: a maintenance engineer sat with our team for the first six weeks, tagging every alert true or false. That feedback loop took alert precision from 61% to 93% and gave the night shift what they now call "the apprentice who never sleeps."`,
    results: [
      "Unplanned downtime reduced 37% in year one",
      "Zero catastrophic bearing failures in 14 months",
      "Spare-parts inventory rationalised by ₹80 lakh",
      "Maintenance planning effort cut from 3 days to 2 hours weekly",
    ],
    metrics: [
      { label: "Downtime reduction", value: "-37%" },
      { label: "Alert precision", value: "93%" },
      { label: "Payback period", value: "5 months" },
    ],
    image: "/images/case-4.png",
    year: "2024",
    featured: false,
    services: ["machine-learning", "data-analytics", "cloud-devops"],
  },
  {
    slug: "personalised-commerce-engine",
    client: "UrbanKart",
    title: "A recommendation engine that respects the customer",
    industry: "E-commerce",
    challenge: `UrbanKart's marketplace drew four million monthly visitors and served them recommendations from an off-the-shelf module that showed everyone roughly the same bestsellers. Conversion sat at 1.1%, email click-through at 3%, and the merchandising team suspected — correctly — that personalisation done badly is worse than none at all.

Their clickstream data was rich but fragmented across web, app, and push channels, with no unified customer identity. Every vendor proposal they'd seen wanted twelve months and a data-migration apocalypse.`,
    solution: `We built a customer data platform with identity resolution across devices, then a hybrid recommendation engine — collaborative filtering plus content-based models, with merchandising rules (margin, stock, brand exclusions) applied as a final layer. One API serves recommendations to web, app, email, and push.

Crucially, we made personalisation legible: every recommendation slot explains itself in the CMS, so merchandisers can see *why* a product surfaced and tune rules without filing engineering tickets. Fashion-category conversions moved first; the rest followed within a quarter.`,
    results: [
      "Conversion rate lifted from 1.1% to 1.9%",
      "Email revenue up 41% on personalised campaigns",
      "Average order value up 17%",
      "Merchandising rule changes fully self-serve",
    ],
    metrics: [
      { label: "Conversion", value: "+73%" },
      { label: "Email revenue", value: "+41%" },
      { label: "Average order value", value: "+17%" },
    ],
    image: "/images/case-5.png",
    year: "2023",
    featured: false,
    services: ["ai-development", "data-analytics", "web-development"],
  },
  {
    slug: "smart-city-data-mesh",
    client: "NagarNigam City",
    title: "A data mesh for a city of two million",
    industry: "Government",
    challenge: `The municipal corporation of a two-million-person city ran fourteen departments on fourteen systems that had never been introduced to each other. Property tax records didn't match the GIS maps, water-billing data contradicted the census, and every inter-departmental question became a three-month file movement. Citizens paid the waiting cost.

Leadership wanted a "smart city command centre" — but the honest prerequisite was plumbing: shared identifiers, reconciled records, and a platform departments could trust more than their own silos.`,
    solution: `We built a federated data mesh: departmental data stays in departmental systems, with governed data products published to a central catalogue. A property identity service reconciles records across tax, utilities, and GIS layers, and a permissions model ensures each department sees exactly what policy allows — citizen privacy was a design constraint, not a compliance afterthought.

The command centre came last, on top of the mesh: dashboards for property-tax leakage, water-supply zones, and grievance heat maps. The tax department found ₹63 crore of leakage in the first six months — which made political allies of the sceptics.`,
    results: [
      "₹63 crore of property-tax leakage identified and recovered",
      "Inter-departmental data requests: 3 months to same-day",
      "Grievance resolution time halved via zone heat-mapping",
      "14 departments publishing governed data products",
    ],
    metrics: [
      { label: "Tax recovered", value: "₹63Cr" },
      { label: "Data request time", value: "Same-day" },
      { label: "Departments onboarded", value: "14" },
    ],
    image: "/images/case-6.png",
    year: "2023",
    featured: false,
    services: ["data-analytics", "cloud-devops", "ai-development"],
  },
];

// ── Jobs ──────────────────────────────────────────────────────────────────────

export const jobs: JobSeed[] = [
  {
    slug: "senior-data-engineer",
    title: "Senior Data Engineer",
    department: "Engineering",
    location: "Noida (Hybrid)",
    type: "Full-time",
    experience: "5-8 years",
    description: `You'll design and build the pipelines and platforms everything else at LFRDCA stands on — lakehouse architectures, CDC ingestion, data contracts, and quality gates for clients in retail, finance, and healthcare. This is a hands-on senior role: you'll own pipelines end-to-end, from whiteboard sketch to a production that stays quiet at 3 a.m.

You'll work directly with our Chief Data Scientist and CTO, mentor engineers who are hungry to learn, and have genuine influence on stack decisions. We're a craft culture — code review is thoughtful, prototypes are welcome, and "it works" is the beginning of the conversation, not the end.`,
    requirements: [
      "5+ years building production data pipelines (batch and streaming)",
      "Strong SQL and Python; experience with dbt, Airflow, or Dagster",
      "Hands-on with a major warehouse (Snowflake, BigQuery, or Redshift)",
      "Data-modelling chops — dimensional and one-big-table both welcome",
      "CI/CD and infrastructure-as-code experience (Terraform a plus)",
      "Clear written communication — we document like editors",
    ],
    active: true,
    createdAt: "2026-08-12T09:00:00.000Z",
  },
  {
    slug: "ml-engineer",
    title: "ML Engineer",
    department: "AI",
    location: "Noida (Hybrid)",
    type: "Full-time",
    experience: "3-6 years",
    description: `You'll take models from notebook to production across our client portfolio — training pipelines, feature stores, real-time serving, drift monitoring — with an evaluation-first mindset. Our ML systems run fraud scoring at 38ms p99 and hospital forecasting at 94% accuracy; you'll help build the next ones.

Expect deep work on RAG systems, ranking models, and classic ML on tabular data — often in the same week. You'll pair with data scientists who think in baselines first, and with DevOps engineers who treat 3 a.m. pages as personal insults.`,
    requirements: [
      "3+ years shipping ML systems to production (not just notebooks)",
      "Python fluency; strong grasp of scikit-learn, XGBoost, or PyTorch",
      "Experience with model serving (FastAPI, Triton, or Vertex/SageMaker)",
      "Familiarity with MLOps tooling — MLflow, feature stores, pipelines",
      "Comfort with evaluation design: golden sets, slice metrics, drift tests",
      "Bonus: LLM/RAG production experience",
    ],
    active: true,
    createdAt: "2026-08-01T09:00:00.000Z",
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    department: "Data",
    location: "Remote (India)",
    type: "Full-time",
    experience: "2-5 years",
    description: `You'll run the experiments behind our case studies — forecasting, causal inference, segmentation, and the occasional model that becomes a product. We're looking for scientists who ask "what decision does this change?" before "which algorithm should I use?"

You'll present findings to client executives, design A/B tests with real stakes, and work with some of the messiest, most interesting data in Indian industry. Rigour is the brand; humility about uncertainty is the culture.`,
    requirements: [
      "2+ years in applied data science (industry or research)",
      "Statistics you can defend under questioning — hypothesis testing, regression, causal basics",
      "Python data stack (pandas, statsmodels, scikit-learn)",
      "Experiment / A-B test design experience",
      "Ability to write findings in clear business English",
      "Curiosity about domains — retail, health, finance — beyond the dataset",
    ],
    active: true,
    createdAt: "2026-07-20T09:00:00.000Z",
  },
  {
    slug: "ai-solutions-architect",
    title: "AI Solutions Architect",
    department: "AI",
    location: "Noida (Hybrid)",
    type: "Full-time",
    experience: "6-10 years",
    description: `You'll own the architecture of our largest AI engagements — RAG platforms, agent systems, and ML platforms for enterprise clients — from discovery workshops through production hardening. This is a player-coach role: whiteboard in the morning, pull request in the afternoon, steering committee on Friday.

You'll be the technical conscience of the engagement: pushing back on hype, defending evaluation budgets, and designing systems that are still elegant in year three. Our architects carry real authority and real accountability — and present to client CTOs regularly.`,
    requirements: [
      "6+ years in data/AI with 3+ architecting production systems",
      "Deep LLM/RAG system experience: retrieval, guardrails, evals, cost control",
      "Cloud architecture certification or equivalent scars (AWS/GCP/Azure)",
      "Strong client-facing communication — workshops to boardrooms",
      "Strong opinions, loosely held — and documented either way",
      "Experience in data-privacy / compliance-heavy environments a plus",
    ],
    active: true,
    createdAt: "2026-07-05T09:00:00.000Z",
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    experience: "3-6 years",
    description: `You'll build the paved roads our engineers deploy on: Kubernetes platforms, CI/CD with real quality gates, observability that pages only when a human is needed, and cloud cost controls that keep invoices polite. We deploy on Fridays because the pipeline has earned it — you'll keep earning it.

Our infrastructure is Terraform-first, our culture blameless, and our on-call quiet by design. You'll work across client environments (with all their quirks) and our own platform — automation debt is treated as technical debt, not a personality trait.`,
    requirements: [
      "3+ years running production infrastructure on AWS/GCP/Azure",
      "Kubernetes in anger — deployments, autoscaling, ingress, secrets",
      "Terraform or Pulumi discipline; GitOps experience (ArgoCD/Flux)",
      "Observability stack fluency (Prometheus/Grafana/OpenTelemetry)",
      "Incident response and blameless postmortem experience",
      "FinOps instincts — cost dashboards, right-sizing, lifecycle rules",
    ],
    active: true,
    createdAt: "2026-07-04T09:00:00.000Z",
  },
  {
    slug: "fullstack-developer-nextjs",
    title: "Full-Stack Developer (Next.js)",
    department: "Engineering",
    location: "Noida (Hybrid)",
    type: "Full-time",
    experience: "2-5 years",
    description: `You'll build the web products our clients' customers actually touch — dashboards, portals, and marketing sites with editorial polish — in Next.js, TypeScript, and Tailwind. We care about craft: Lighthouse scores, accessibility, and the 2% of detail most teams skip.

You'll ship to production weekly, own features end-to-end (API route to animation timing), and get obsessive code review from people who genuinely enjoy giving it. Our design system is a point of pride — you'll help it evolve.`,
    requirements: [
      "2+ years with React and modern TypeScript",
      "Next.js App Router experience (server components, route handlers)",
      "Comfort across the stack — REST APIs, auth, databases (Prisma a plus)",
      "CSS craft: Tailwind, responsive design, accessibility basics",
      "Testing habits — unit and E2E (Playwright/Vitest welcome)",
      "Design sensibility: you notice misaligned pixels and it bothers you",
    ],
    active: true,
    createdAt: "2026-07-03T09:00:00.000Z",
  },
  {
    slug: "analytics-consultant",
    title: "Analytics Consultant",
    department: "Consulting",
    location: "Noida (Hybrid)",
    type: "Full-time",
    experience: "4-7 years",
    description: `You'll sit between client executives and our engineering teams — translating business pain into analytics roadmaps, and model output into board-ready narrative. Our consultants run discovery workshops, define metric frameworks, and stay through adoption to make sure dashboards get used, not just launched.

This is a craft role for someone who loves both spreadsheets and sentences: you'll write metric definitions sharper than the SQL beneath them and findings clearer than the notebook above them. Expect retail floor visits and hospital duty-manager interviews — context is the job.`,
    requirements: [
      "4+ years in analytics consulting or analytics leadership",
      "Fluent SQL and dashboard literacy (Looker/Power BI/Metabase)",
      "Metric/KPI framework design experience",
      "Executive communication — present to a CFO without a deck full of jargon",
      "Facilitation skills for discovery workshops",
      "Comfort with Indian enterprise realities: messy data, real deadlines",
    ],
    active: true,
    createdAt: "2026-07-02T09:00:00.000Z",
  },
  {
    slug: "data-analyst-intern",
    title: "Data Analyst Intern",
    department: "Data",
    location: "Noida (Hybrid)",
    type: "Internship",
    experience: "0-1 years",
    description: `A six-month paid internship where you'll do real work on real client data — not a shadowing programme. Interns at LFRDCA have built production dashboards in week three and presented to clients in month two. You'll be mentored by our Head of Analytics and treated as a junior colleague, because you will be one.

Expect SQL you didn't know you had in you, dashboards with your name on them, and a hiring conversation at the end if the work is strong (it usually is — we choose carefully). We take two interns a quarter.`,
    requirements: [
      "Final-year student or recent graduate (any discipline with quantitative appetite)",
      "SQL basics — joins, group-bys, and the courage to look up the rest",
      "Excel/Sheets fluency that goes beyond SUM",
      "Any dashboarding exposure (a college project counts)",
      "Writing clarity — you can explain a finding to a non-technical friend",
      "Curiosity, coachability, and questions — lots of them",
    ],
    active: true,
    createdAt: "2026-08-20T09:00:00.000Z",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

export const testimonials: TestimonialSeed[] = [
  {
    name: "Rohan Mehta",
    role: "VP Operations",
    company: "Vastra Retail",
    content:
      "LFRDCA's demand forecasting paid for itself before the second festival season — our buyers now trust the model more than the old spreadsheet, and honestly, so do I. They speak retail, not jargon, and every fortnightly demo felt like watching our own team at work.",
    avatar: "/images/team-2.png",
    rating: 5,
  },
  {
    name: "Dr. Kavitha Menon",
    role: "Chief Medical Officer",
    company: "MediTrust Hospitals",
    content:
      "The patient-flow predictions are eerily good — we plan rosters now instead of improvising them. What impressed me most is how their team listened to our nurses before writing a single line of code.",
    avatar: "/images/team-3.png",
    rating: 5,
  },
  {
    name: "Aditya Raghavan",
    role: "CTO",
    company: "PayNorth",
    content:
      "Forty milliseconds a decision, two clean RBI inspections, and fraud losses down 71% — the numbers speak. But the reason I keep recommending LFRDCA is their model governance: our auditors actually complimented the documentation.",
    avatar: "/images/team-4.png",
    rating: 5,
  },
  {
    name: "Sneha Kulkarni",
    role: "Head of Digital",
    company: "UrbanKart",
    content:
      "They rebuilt our recommendation engine in twelve weeks after another vendor quoted twelve months. Conversion is up 73%, and our merchandising team can finally tune things without filing engineering tickets.",
    avatar: "/images/team-5.png",
    rating: 5,
  },
  {
    name: "Jaspal Singh",
    role: "Plant Director",
    company: "IronCast Motors",
    content:
      "Fourteen months without a single catastrophic bearing failure — the system has become the apprentice who never sleeps. The only reason this isn't five stars is I'm saving it for when they finish the second line.",
    avatar: "/images/team-6.png",
    rating: 4,
  },
  {
    name: "Meera Krishnan",
    role: "Founder",
    company: "Craftly",
    content:
      "As a founder, I'd been burned by 'AI consultants' before. LFRDCA was the first team that told me what NOT to build — that honesty saved me lakhs, and the assistant they did build tripled our support efficiency.",
    avatar: "/images/team-7.png",
    rating: 5,
  },
];

// ── Events ────────────────────────────────────────────────────────────────────

export const events: EventItemSeed[] = [
  {
    title: "Data & Donuts — Noida Meetup",
    date: "2026-09-19T10:30:00.000Z",
    location: "LFRDCA Office, Noida Sector 62",
    type: "Meetup",
    description:
      "Our monthly-ish meetup at the Noida office: two short talks, one live teardown of a real production pipeline, and honestly excellent donuts. The September edition covers 'dbt testing patterns we actually use.' Free, but seats go fast.",
    image: "/images/event-1.png",
  },
  {
    title: "AI in Healthcare Workshop",
    date: "2026-10-10T05:00:00.000Z",
    location: "India Habitat Centre, Delhi",
    type: "Workshop",
    description:
      "A hands-on half-day workshop for hospital IT and clinical operations teams: forecasting patient flow, extracting structure from clinical documents, and what regulators actually expect from AI in care settings. Limited to 40 participants.",
    image: "/images/event-2.png",
  },
  {
    title: "LFRDCA at Big Data Summit 2026",
    date: "2026-08-14T04:30:00.000Z",
    location: "Delhi",
    type: "Conference",
    description:
      "We presented 'The Quiet Revolution in Data Engineering' on the main stage and ran a clinic where 60+ attendees had their cloud bills diagnosed live. Slides and the bill-audit checklist are on our insights page.",
    image: "/images/event-3.png",
  },
  {
    title: "Campus Connect: Data Careers",
    date: "2026-07-31T11:00:00.000Z",
    location: "Virtual",
    type: "Webinar",
    description:
      "An honest hour with our Head of People and two analysts-turned-data-scientists on what a data career actually looks like in year one — salaries, skills, and the questions worth asking in interviews. Recording available on request.",
    image: "/images/office-hero.png",
  },
];

// ── Whitepapers ───────────────────────────────────────────────────────────────

export const whitepapers: WhitepaperSeed[] = [
  {
    slug: "cmos-guide-first-party-data",
    title: "The CMO's Guide to First-Party Data",
    description:
      "A practical playbook for marketing leaders staring down the cookie-pocalypse: auditing the first-party data you already own, building consent-led collection, and turning it into measurable media efficiency. Includes 12 metric templates.",
    pages: 28,
    image: "/images/insight-1.png",
    category: "Marketing Analytics",
  },
  {
    slug: "predictive-maintenance-playbook",
    title: "The Predictive Maintenance Playbook",
    description:
      "Everything we learned connecting shop floors to ML: sensor strategy, failure-mode libraries, alert precision tuning, and the economics of downtime. Written for plant managers as much as data scientists.",
    pages: 36,
    image: "/images/insight-2.png",
    category: "Industrial AI",
  },
  {
    slug: "rag-to-production",
    title: "RAG to Production: An Engineering Field Guide",
    description:
      "The complete anatomy of retrieval-augmented generation systems that survive real users: chunking strategies, hybrid retrieval, evaluation harnesses, guardrails, and cost engineering. Packed with failure stories (ours) and the fixes (also ours).",
    pages: 42,
    image: "/images/insight-3.png",
    category: "AI Engineering",
  },
  {
    slug: "hospital-flow-forecasting",
    title: "Forecasting Hospital Patient Flow",
    description:
      "How 14-day bed-occupancy forecasts are built — and adopted — in Indian hospitals: data requirements, model choices, clinician trust, and the staffing mathematics. Based on our MediTrust deployment.",
    pages: 24,
    image: "/images/insight-4.png",
    category: "Healthcare Analytics",
  },
  {
    slug: "data-platform-blueprint",
    title: "The Modern Data Platform Blueprint",
    description:
      "Our reference architecture for lakehouse platforms: ingestion patterns, data contracts, quality gates, cataloguing, and access control — with build-vs-buy guidance at every layer, annotated with real cost figures.",
    pages: 38,
    image: "/images/blog-2.png",
    category: "Data Engineering",
  },
  {
    slug: "ai-readiness-checklist",
    title: "The Executive AI Readiness Checklist",
    description:
      "A 40-point assessment for leadership teams: the data, governance, talent, and cultural prerequisites that separate AI investments which compound from pilots which evaporate. Takes one board meeting to complete.",
    pages: 18,
    image: "/images/blog-3.png",
    category: "AI Strategy",
  },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────

export const faqs: FaqSeed[] = [
  {
    question: "What exactly does LFRDCA do?",
    answer:
      "We're an AI-powered IT services company: we build AI systems, analytics platforms, data pipelines, and the web and mobile products around them. Think of us as a full-stack data partner — from the warehouse, to the model, to the dashboard your CEO opens each morning.",
    category: "Services",
    order: 1,
  },
  {
    question: "Do you work with small businesses or only enterprises?",
    answer:
      "Both, happily. Our discovery sprint is scoped to fit: a growing D2C brand and a banking group get the same rigour at different scales. Roughly half our clients started with a single dashboard and grew from there.",
    category: "Services",
    order: 2,
  },
  {
    question: "Can you work with our existing systems and team?",
    answer:
      "That's our default mode. We integrate with the stack you already have — ERP, CRM, BI, legacy databases — and collaborate with your in-house team rather than around them. Most engagements include knowledge-transfer sessions so your engineers can run what we build.",
    category: "Services",
    order: 3,
  },
  {
    question: "How much does a typical project cost?",
    answer:
      "Engagements typically start around ₹8–15 lakh for a focused analytics or AI pilot and scale with scope; platform builds range higher. Every proposal is fixed-scope with milestone-based billing, so you always know what you're approving before you approve it. Full ranges live on our pricing page.",
    category: "Pricing",
    order: 4,
  },
  {
    question: "Do you offer fixed-price or time-and-materials contracts?",
    answer:
      "Fixed-price for well-defined phases (discovery, prototype, MVP) and time-and-materials for long-running product evolution. We recommend whichever fits the risk profile — and we're comfortable putting our estimates in writing.",
    category: "Pricing",
    order: 5,
  },
  {
    question: "Is there a free consultation?",
    answer:
      "Yes — the first consultation (an hour, video or at our Noida office) is free and genuinely consultative: we'll tell you if your problem doesn't need AI, or doesn't need us. That honesty has cost us deals and earned us clients.",
    category: "Pricing",
    order: 6,
  },
  {
    question: "What does your process look like from start to finish?",
    answer:
      "Four phases: discovery (workshops, data audit, opportunity map), design (architecture, metric definitions, prototypes), build (two-week demo cadence, evaluation suites), and ship (production deployment, monitoring, enablement). You see working software every fortnight from week two.",
    category: "Process",
    order: 7,
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused analytics engagement runs 6–8 weeks to first production release; AI prototypes come together in 4–6 weeks; data platforms are phased, with usable foundations in 8–10 weeks. The timeline goes in the proposal — and we've delivered 120+ projects on it.",
    category: "Process",
    order: 8,
  },
  {
    question: "How involved do we need to be as a client?",
    answer:
      "More than a vendor relationship, less than a second job: expect a weekly 45-minute review, a named business owner for decisions, and domain experts available during discovery. Clients who show up get dramatically better outcomes — we've measured it.",
    category: "Process",
    order: 9,
  },
  {
    question: "What happens after launch — do you disappear?",
    answer:
      "The opposite: every project includes a 30-day stabilisation period, and most clients continue with a care plan covering monitoring, model retraining, and iteration hours. Ninety percent of our revenue is repeat business, so disappearing would be commercially foolish as well as rude.",
    category: "Support",
    order: 10,
  },
  {
    question: "What if something breaks at 2 a.m.?",
    answer:
      "Care-plan clients have a 24×7 escalation line with SLA-backed response (critical issues: one hour). Better yet, our systems are built to page us before they page you — monitoring and drift alerts are standard on everything we ship.",
    category: "Support",
    order: 11,
  },
  {
    question: "Do you provide training for our team?",
    answer:
      "Always — enablement is in every proposal: hands-on workshops, recorded sessions, and documentation written for humans. We measure success by how little you need us after handover, which occasionally puzzles our accountants.",
    category: "Support",
    order: 12,
  },
];
