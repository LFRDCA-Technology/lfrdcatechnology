// ── GET /api/industries — all industries, ordered ───────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeIndustry } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.industry.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows.map(serializeIndustry));
}
