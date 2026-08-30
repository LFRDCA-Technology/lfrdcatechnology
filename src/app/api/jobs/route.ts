// ── GET /api/jobs — active openings, newest first ───────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeJob } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.job.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(rows.map(serializeJob));
}
