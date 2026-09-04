// ── GET /api/case-studies/[slug] — single case study ────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeCaseStudy } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await ensureSeeded();
  const { slug } = await params;
  const row = await db.caseStudy.findUnique({ where: { slug } });
  if (!row) {
    return NextResponse.json(
      { error: "Case study not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(serializeCaseStudy(row));
}
