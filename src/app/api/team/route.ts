// ── GET /api/team — team members, ordered ───────────────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeTeamMember } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows.map(serializeTeamMember));
}
