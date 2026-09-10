// ── POST /api/auth/register — create account, set JWT cookie ────────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  AUTH_COOKIE,
  authCookieOptions,
  hashPassword,
  signToken,
} from "@/lib/server-auth";
import { serializeUser } from "@/lib/serializers";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  const parsed = await parseAndValidate(request, RegisterSchema);
  if (!parsed.ok) return parsed.response;

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const user = await db.user.create({
    data: {
      name,
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
      role: "USER",
    },
  });

  const token = await signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ user: serializeUser(user) });
  response.cookies.set(AUTH_COOKIE, token, authCookieOptions());
  return response;
}
