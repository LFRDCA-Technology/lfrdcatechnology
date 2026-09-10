// ── GET /api — health check ─────────────────────────────────────────────────

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "LFRDCA Technologies API",
    version: "1.0.0",
  });
}
