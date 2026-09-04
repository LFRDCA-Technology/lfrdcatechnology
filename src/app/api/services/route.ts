// ── GET /api/services — all services, ordered ───────────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeService } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows.map(serializeService));
}
