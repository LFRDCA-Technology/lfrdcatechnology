// ── LFRDCA Technologies · server-side auth (JWT + bcrypt) ────────────────────
// Used ONLY inside route handlers / server code. Never import from client code.

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { User as PrismaUser } from "@prisma/client";
import { db } from "@/lib/db";

const JWT_SECRET =
  process.env.JWT_SECRET || "lfrdca-dev-secret-change-me-2024";

const secretKey = new TextEncoder().encode(JWT_SECRET);

export const AUTH_COOKIE = "lfrdca_token";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthUserPayload {
  sub: string;
  email: string;
  role: string;
}

/** Fields accepted by signToken (subset of the User row). */
export interface SignTokenUser {
  id: string;
  email: string;
  role: string;
}

/** Cookie options for `response.cookies.set(...)`. */
export function authCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  };
}

/** Cookie options that clear the auth cookie. */
export function authCookieClearOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  };
}

/** Sign a 7-day HS256 JWT for the given user. */
export async function signToken(user: SignTokenUser): Promise<string> {
  return new SignJWT({ email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/** Verify a JWT. Returns the payload or null when invalid/expired. */
export async function verifyToken(
  token: string
): Promise<AuthUserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (!payload.sub) return null;
    return {
      sub: String(payload.sub),
      email: String(payload.email ?? ""),
      role: String(payload.role ?? "USER"),
    };
  } catch {
    return null;
  }
}

/**
 * Resolve the authenticated user from the `lfrdca_token` cookie.
 * Returns the raw Prisma User row (or null when not signed in).
 */
export async function getAuthUser(): Promise<PrismaUser | null> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;
  const user = await db.user.findUnique({ where: { id: payload.sub } });
  return user;
}

/**
 * Require an authenticated user. Returns the Prisma User row or null —
 * route handlers should answer null with a 401 response.
 */
export async function requireAuth(): Promise<PrismaUser | null> {
  return getAuthUser();
}

/** Hash a plaintext password (bcrypt, 10 rounds). */
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/** Compare a plaintext password against a bcrypt hash. */
export function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
