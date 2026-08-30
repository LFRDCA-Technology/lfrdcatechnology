// ── POST /api/contact — store a contact message ─────────────────────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email address"),
  subject: z.string().trim().min(2, "Subject is required").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export async function POST(request: Request) {
  const parsed = await parseAndValidate(request, ContactSchema);
  if (!parsed.ok) return parsed.response;

  const { name, email, subject, message } = parsed.data;

  await db.contactMessage.create({
    data: {
      name,
      email: email.trim().toLowerCase(),
      subject,
      message,
    },
  });

  return NextResponse.json({ ok: true });
}
