// ── PUT /api/auth/profile — update profile (auth required) ──────────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/server-auth";
import { serializeUser } from "@/lib/serializers";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const ProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120)
    .optional(),
  phone: z.string().trim().max(20, "Phone is too long").optional(),
  company: z.string().trim().max(160, "Company name is too long").optional(),
});

export async function PUT(request: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = await parseAndValidate(request, ProfileSchema);
  if (!parsed.ok) return parsed.response;

  const { name, phone, company } = parsed.data;
  const data: { name?: string; phone?: string | null; company?: string | null } =
    {};
  if (name !== undefined) data.name = name;
  if (phone !== undefined) data.phone = phone === "" ? null : phone;
  if (company !== undefined) data.company = company === "" ? null : company;

  const updated = await db.user.update({ where: { id: user.id }, data });
  return NextResponse.json({ user: serializeUser(updated) });
}
