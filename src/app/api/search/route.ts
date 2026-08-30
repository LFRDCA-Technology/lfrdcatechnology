// ── GET /api/search?q — cross-content search ────────────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { SearchResults } from "@/lib/types";
import { excerptOf } from "@/lib/api-helpers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await ensureSeeded();

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (!q) {
    return NextResponse.json({ results: [], query: "" } satisfies SearchResults);
  }

  const results: SearchResults["results"] = [];

  const [postRows, caseRows, serviceRows, jobRows, paperRows] =
    await Promise.all([
      db.post.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            { content: { contains: q } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      db.caseStudy.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { client: { contains: q } },
            { industry: { contains: q } },
            { challenge: { contains: q } },
            { solution: { contains: q } },
          ],
        },
        orderBy: [{ featured: "desc" }, { year: "desc" }],
        take: 4,
      }),
      db.service.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { tagline: { contains: q } },
            { description: { contains: q } },
          ],
        },
        orderBy: { order: "asc" },
        take: 4,
      }),
      db.job.findMany({
        where: {
          active: true,
          OR: [
            { title: { contains: q } },
            { department: { contains: q } },
            { description: { contains: q } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      db.whitepaper.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
            { category: { contains: q } },
          ],
        },
        take: 3,
      }),
    ]);

  for (const post of postRows) {
    results.push({
      type: "Journal",
      title: post.title,
      excerpt: excerptOf(post.excerpt),
      href: `/blog/${post.slug}`,
    });
  }

  for (const study of caseRows) {
    results.push({
      type: "Case study",
      title: study.title,
      excerpt: excerptOf(
        `${study.client} · ${study.industry} — ${study.challenge}`
      ),
      href: `/portfolio/${study.slug}`,
    });
  }

  for (const service of serviceRows) {
    results.push({
      type: "Service",
      title: service.title,
      excerpt: excerptOf(service.tagline || service.description),
      href: `/services/${service.slug}`,
    });
  }

  for (const job of jobRows) {
    results.push({
      type: "Career",
      title: job.title,
      excerpt: `${job.department} · ${job.location} · ${job.type}`,
      href: "/careers",
    });
  }

  for (const paper of paperRows) {
    results.push({
      type: "Whitepaper",
      title: paper.title,
      excerpt: excerptOf(paper.description),
      href: "/whitepapers",
    });
  }

  return NextResponse.json({ results, query: q } satisfies SearchResults);
}
