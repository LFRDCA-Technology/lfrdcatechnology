// ── GET /api/stats — company statistics ─────────────────────────────────────

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    projects: "120+",
    clients: "80+",
    experts: "45+",
    awards: "12",
    countries: "9",
    satisfaction: "98%",
  });
}
