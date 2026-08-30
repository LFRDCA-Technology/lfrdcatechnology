// ── GET /api/whitepapers — downloadable whitepapers ─────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeWhitepaper } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.whitepaper.findMany();
  return NextResponse.json(rows.map(serializeWhitepaper));
}
