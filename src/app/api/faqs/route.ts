// ── GET /api/faqs — frequently asked questions, ordered ─────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeFaq } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.faq.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows.map(serializeFaq));
}
