"use client";

// ── Route registry — maps hash paths to the 57 page components ─────────────
// Dynamic pages (blog-post, case-study, service/industry/solution-detail)
// read their slug via useSegments().

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { LoadingState } from "@/components/site/ui";

const loading = () => <LoadingState />;

export const HomePage = dynamic(() => import("./home"), { loading });
export const NotFoundPage = dynamic(() => import("./not-found"), { loading });

interface RouteDef {
  pattern: string;
  load: () => Promise<{ default: ComponentType }>;
}

const ROUTES: RouteDef[] = [
  // company
  { pattern: "/", load: () => import("./home") },
  { pattern: "/about", load: () => import("./about") },
  { pattern: "/story", load: () => import("./story") },
  { pattern: "/mission", load: () => import("./mission") },
  { pattern: "/leadership", load: () => import("./leadership") },
  { pattern: "/culture", load: () => import("./culture") },
  { pattern: "/partners", load: () => import("./partners") },
  { pattern: "/investors", load: () => import("./investors") },
  { pattern: "/certifications", load: () => import("./certifications") },
  { pattern: "/sitemap", load: () => import("./sitemap") },
  // services
  { pattern: "/services", load: () => import("./services") },
  { pattern: "/services/:slug", load: () => import("./service-detail") },
  // industries
  { pattern: "/industries", load: () => import("./industries") },
  { pattern: "/industries/:slug", load: () => import("./industry-detail") },
  // solutions
  { pattern: "/solutions", load: () => import("./solutions") },
  { pattern: "/solutions/:slug", load: () => import("./solution-detail") },
  // work & journal
  { pattern: "/portfolio", load: () => import("./portfolio") },
  { pattern: "/portfolio/:slug", load: () => import("./case-study") },
  { pattern: "/blog", load: () => import("./blog") },
  { pattern: "/blog/:slug", load: () => import("./blog-post") },
  { pattern: "/insights", load: () => import("./insights") },
  { pattern: "/whitepapers", load: () => import("./whitepapers") },
  { pattern: "/news", load: () => import("./news") },
  // careers & learning
  { pattern: "/careers", load: () => import("./careers") },
  { pattern: "/internships", load: () => import("./internships") },
  { pattern: "/training", load: () => import("./training") },
  // connect
  { pattern: "/contact", load: () => import("./contact") },
  { pattern: "/quote", load: () => import("./quote") },
  { pattern: "/pricing", load: () => import("./pricing") },
  { pattern: "/faq", load: () => import("./faq") },
  { pattern: "/support", load: () => import("./support") },
  { pattern: "/docs", load: () => import("./docs") },
  { pattern: "/status", load: () => import("./status") },
  // account
  { pattern: "/login", load: () => import("./login") },
  { pattern: "/register", load: () => import("./register") },
  { pattern: "/dashboard", load: () => import("./dashboard") },
  { pattern: "/profile", load: () => import("./profile") },
  { pattern: "/admin", load: () => import("./admin") },
  // misc
  { pattern: "/coming-soon", load: () => import("./coming-soon") },
  { pattern: "/thank-you", load: () => import("./thank-you") },
  // legal
  { pattern: "/privacy", load: () => import("./privacy") },
  { pattern: "/terms", load: () => import("./terms") },
  { pattern: "/cookies", load: () => import("./cookies") },
  { pattern: "/gdpr", load: () => import("./gdpr") },
];

const cache = new Map<string, ComponentType>();

function loadComponent(def: RouteDef): ComponentType {
  const hit = cache.get(def.pattern);
  if (hit) return hit;
  const Lazy = dynamic(def.load, { loading });
  cache.set(def.pattern, Lazy);
  return Lazy;
}

/** Match a path against registered patterns (supports :param segments). */
export function matchRoute(
  path: string
): { pattern: string; Component: ComponentType } | null {
  const segments = path.split("/").filter(Boolean);
  for (const r of ROUTES) {
    if (r.pattern === "/") {
      if (segments.length === 0)
        return { pattern: r.pattern, Component: loadComponent(r) };
      continue;
    }
    const pSegs = r.pattern.split("/").filter(Boolean);
    if (pSegs.length !== segments.length) continue;
    if (pSegs.every((s, i) => s.startsWith(":") || s === segments[i])) {
      return { pattern: r.pattern, Component: loadComponent(r) };
    }
  }
  return null;
}
