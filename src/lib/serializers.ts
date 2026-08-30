// ── LFRDCA Technologies · API serializers ────────────────────────────────────
// Prisma stores arrays as JSON strings (SQLite). These helpers parse them back
// into real arrays and map rows to the API shapes declared in @/lib/types.

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
  User,
  Role,
} from "@/lib/types";
import type {
  Service as ServiceRow,
  Industry as IndustryRow,
  Solution as SolutionRow,
  TeamMember as TeamMemberRow,
  Post as PostRow,
  CaseStudy as CaseStudyRow,
  Job as JobRow,
  Testimonial as TestimonialRow,
  EventItem as EventItemRow,
  Whitepaper as WhitepaperRow,
  Faq as FaqRow,
  User as UserRow,
} from "@prisma/client";

export interface LabelValue {
  label: string;
  value: string;
}

/** Safely parse a JSON-string column into a string[]. */
export function parseStringArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

/** Safely parse a JSON-string column into a {label,value}[]. */
export function parseLabelValueArray(
  raw: string | null | undefined
): LabelValue[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is { label: unknown; value: unknown } =>
          typeof item === "object" &&
          item !== null &&
          "label" in item &&
          "value" in item
      )
      .map((item) => ({ label: String(item.label), value: String(item.value) }));
  } catch {
    return [];
  }
}

export function serializeService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    longDescription: row.longDescription,
    icon: row.icon,
    image: row.image,
    features: parseStringArray(row.features),
    deliverables: parseStringArray(row.deliverables),
    order: row.order,
  };
}

export function serializeIndustry(row: IndustryRow): Industry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.image,
    stats: parseLabelValueArray(row.stats),
    useCases: parseStringArray(row.useCases),
    order: row.order,
  };
}

export function serializeSolution(row: SolutionRow): Solution {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    image: row.image,
    capabilities: parseStringArray(row.capabilities),
    outcomes: parseLabelValueArray(row.outcomes),
  };
}

export function serializeTeamMember(row: TeamMemberRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    image: row.image,
    linkedin: row.linkedin ?? undefined,
    twitter: row.twitter ?? undefined,
    order: row.order,
  };
}

export function serializePost(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: parseStringArray(row.tags),
    image: row.image,
    author: row.author,
    authorRole: row.authorRole,
    readTime: row.readTime,
    views: row.views,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    id: row.id,
    slug: row.slug,
    client: row.client,
    title: row.title,
    industry: row.industry,
    challenge: row.challenge,
    solution: row.solution,
    results: parseStringArray(row.results),
    metrics: parseLabelValueArray(row.metrics),
    image: row.image,
    year: row.year,
    featured: row.featured,
    services: parseStringArray(row.services),
  };
}

export function serializeJob(row: JobRow): Job {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    department: row.department,
    location: row.location,
    type: row.type,
    experience: row.experience,
    description: row.description,
    requirements: parseStringArray(row.requirements),
    active: row.active,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    content: row.content,
    avatar: row.avatar,
    rating: row.rating,
  };
}

export function serializeEvent(row: EventItemRow): EventItem {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location,
    type: row.type,
    description: row.description,
    image: row.image,
  };
}

export function serializeWhitepaper(row: WhitepaperRow): Whitepaper {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    pages: row.pages,
    image: row.image,
    category: row.category,
  };
}

export function serializeFaq(row: FaqRow): Faq {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
    order: row.order,
  };
}

export function serializeUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: (row.role === "ADMIN" ? "ADMIN" : "USER") as Role,
    phone: row.phone,
    company: row.company,
    avatar: row.avatar,
    createdAt: row.createdAt.toISOString(),
  };
}
