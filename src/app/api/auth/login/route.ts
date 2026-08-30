// ── POST /api/auth/login — verify credentials, set JWT cookie ───────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  AUTH_COOKIE,
  authCookieOptions,
  signToken,
  verifyPassword,
} from "@/lib/server-auth";
import { serializeUser } from "@/lib/serializers";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const LoginSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  const parsed = await parseAndValidate(request, LoginSchema);
  if (!parsed.ok) return parsed.response;

  const { email, password } = parsed.data;
  const user = await db.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = await signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ user: serializeUser(user) });
  response.cookies.set(AUTH_COOKIE, token, authCookieOptions());
  return response;
}
