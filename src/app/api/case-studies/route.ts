// ── GET /api/case-studies — all case studies, featured first ────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeCaseStudy } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.caseStudy.findMany({
    orderBy: [{ featured: "desc" }, { year: "desc" }],
  });
  return NextResponse.json(rows.map(serializeCaseStudy));
}
