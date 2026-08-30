// ── GET /api/auth/me — current authenticated user ───────────────────────────

import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/server-auth";
import { serializeUser } from "@/lib/serializers";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ user: serializeUser(user) });
}
