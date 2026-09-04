// ── LFRDCA Technologies · idempotent database seeding ────────────────────────
// Every content API route awaits ensureSeeded() before querying. A module-level
// promise guard prevents concurrent requests from double-seeding.
//
// content.ts keeps arrays as real TypeScript arrays; the builders below
// JSON.stringify them into the SQLite string columns (serializers.ts parses
// them back at the API layer).

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/server-auth";
import {
  seedUsers,
  services,
  industries,
  solutions,
  teamMembers,
  posts,
  caseStudies,
  jobs,
  testimonials,
  events,
  whitepapers,
  faqs,
} from "@/lib/content";
import type {
  CaseStudySeed,
  IndustrySeed,
  JobSeed,
  PostSeed,
  ServiceSeed,
  SolutionSeed,
} from "@/lib/content";

let seedPromise: Promise<void> | null = null;

export function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((error) => {
      // Allow a later request to retry if seeding failed (e.g. cold DB lock).
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

async function runSeed(): Promise<void> {
  const serviceCount = await db.service.count();
  if (serviceCount > 0) {
    await seedUsersIfEmpty();
    return;
  }

  for (const service of services) {
    await db.service.upsert({
      where: { slug: service.slug },
      create: toServiceCreate(service),
      update: {},
    });
  }

  for (const industry of industries) {
    await db.industry.upsert({
      where: { slug: industry.slug },
      create: toIndustryCreate(industry),
      update: {},
    });
  }

  for (const solution of solutions) {
    await db.solution.upsert({
      where: { slug: solution.slug },
      create: toSolutionCreate(solution),
      update: {},
    });
  }

  if ((await db.teamMember.count()) === 0) {
    await db.teamMember.createMany({ data: teamMembers });
  }

  for (const post of posts) {
    await db.post.upsert({
      where: { slug: post.slug },
      create: toPostCreate(post),
      update: {},
    });
  }

  for (const study of caseStudies) {
    await db.caseStudy.upsert({
      where: { slug: study.slug },
      create: toCaseStudyCreate(study),
      update: {},
    });
  }

  for (const job of jobs) {
    await db.job.upsert({
      where: { slug: job.slug },
      create: toJobCreate(job),
      update: {},
    });
  }

  if ((await db.testimonial.count()) === 0) {
    await db.testimonial.createMany({ data: testimonials });
  }

  if ((await db.eventItem.count()) === 0) {
    await db.eventItem.createMany({ data: events });
  }

  for (const paper of whitepapers) {
    await db.whitepaper.upsert({
      where: { slug: paper.slug },
      create: { ...paper },
      update: {},
    });
  }

  if ((await db.faq.count()) === 0) {
    await db.faq.createMany({ data: faqs });
  }

  await seedUsersIfEmpty();
}

// ── create-data builders (arrays → JSON strings) ─────────────────────────────

function toServiceCreate(service: ServiceSeed) {
  return {
    slug: service.slug,
    title: service.title,
    tagline: service.tagline,
    description: service.description,
    longDescription: service.longDescription,
    icon: service.icon,
    image: service.image,
    features: JSON.stringify(service.features),
    deliverables: JSON.stringify(service.deliverables),
    order: service.order,
  };
}

function toIndustryCreate(industry: IndustrySeed) {
  return {
    slug: industry.slug,
    title: industry.title,
    description: industry.description,
    image: industry.image,
    stats: JSON.stringify(industry.stats),
    useCases: JSON.stringify(industry.useCases),
    order: industry.order,
  };
}

function toSolutionCreate(solution: SolutionSeed) {
  return {
    slug: solution.slug,
    title: solution.title,
    tagline: solution.tagline,
    description: solution.description,
    image: solution.image,
    capabilities: JSON.stringify(solution.capabilities),
    outcomes: JSON.stringify(solution.outcomes),
  };
}

function toPostCreate(post: PostSeed) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: JSON.stringify(post.tags),
    image: post.image,
    author: post.author,
    authorRole: post.authorRole,
    readTime: post.readTime,
    views: post.views,
    createdAt: new Date(post.createdAt),
  };
}

function toCaseStudyCreate(study: CaseStudySeed) {
  return {
    slug: study.slug,
    client: study.client,
    title: study.title,
    industry: study.industry,
    challenge: study.challenge,
    solution: study.solution,
    results: JSON.stringify(study.results),
    metrics: JSON.stringify(study.metrics),
    image: study.image,
    year: study.year,
    featured: study.featured,
    services: JSON.stringify(study.services),
  };
}

function toJobCreate(job: JobSeed) {
  return {
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    experience: job.experience,
    description: job.description,
    requirements: JSON.stringify(job.requirements),
    active: job.active,
    createdAt: new Date(job.createdAt),
  };
}

/** Upsert the demo accounts (idempotent on the unique email). */
async function seedUsersIfEmpty(): Promise<void> {
  for (const user of seedUsers) {
    const existing = await db.user.findUnique({
      where: { email: user.email },
    });
    if (existing) continue;
    await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: await hashPassword(user.password),
        role: user.role,
        phone: user.phone,
        company: user.company,
        avatar: user.avatar,
      },
    });
  }
}
