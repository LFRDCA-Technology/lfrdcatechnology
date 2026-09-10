// ── GET /api/services/[slug] — single service ───────────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeService } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await ensureSeeded();
  const { slug } = await params;
  const row = await db.service.findUnique({ where: { slug } });
  if (!row) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
  return NextResponse.json(serializeService(row));
}
