// ── LFRDCA Technologies · shared domain types ────────────────────────────────

export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  company?: string | null;
  avatar?: string | null;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  deliverables: string[];
  order: number;
}

export interface Industry {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  useCases: string[];
  order: number;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  capabilities: string[];
  outcomes: { label: string; value: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  order: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  authorRole: string;
  readTime: number;
  views: number;
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  image: string;
  year: string;
  featured: boolean;
  services: string[];
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  active: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
  image: string;
}

export interface Whitepaper {
  id: string;
  slug: string;
  title: string;
  description: string;
  pages: number;
  image: string;
  category: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface CompanyStats {
  projects: string;
  clients: string;
  experts: string;
  awards: string;
  countries: string;
  satisfaction: string;
}

export interface SearchResults {
  results: { type: string; title: string; excerpt: string; href: string }[];
  query: string;
}

export interface AdminOverview {
  counts: {
    users: number;
    messages: number;
    subscribers: number;
    quotes: number;
    applications: number;
    posts: number;
  };
  recent: {
    messages: { id: string; name: string; email: string; subject: string; createdAt: string }[];
    quotes: { id: string; name: string; company: string; service: string; budget: string; createdAt: string }[];
    applications: { id: string; name: string; jobTitle: string; createdAt: string }[];
  };
}
