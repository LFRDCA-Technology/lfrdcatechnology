// ── POST /api/auth/logout — clear auth cookie ───────────────────────────────

import { NextResponse } from "next/server";
import { AUTH_COOKIE, authCookieClearOptions } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "", authCookieClearOptions());
  return response;
}
