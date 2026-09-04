// ── GET /api/events — upcoming & past events, newest first ──────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeEvent } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.eventItem.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(rows.map(serializeEvent));
}
