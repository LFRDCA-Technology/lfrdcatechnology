// ── POST /api/auth/change-password — rotate password (auth required) ────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  hashPassword,
  requireAuth,
  verifyPassword,
} from "@/lib/server-auth";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters"),
});

export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = await parseAndValidate(request, ChangePasswordSchema);
  if (!parsed.ok) return parsed.response;

  const { currentPassword, newPassword } = parsed.data;

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 400 }
    );
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });

  return NextResponse.json({ ok: true });
}
