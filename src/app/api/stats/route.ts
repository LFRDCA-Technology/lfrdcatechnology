// ── GET /api/stats — company statistics ─────────────────────────────────────

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    projects: "13+",
    clients: "19",
    experts: "45+",
    awards: "2",
    countries: "3",
    satisfaction: "83%",
  });
}
