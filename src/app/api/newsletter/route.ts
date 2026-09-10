// ── POST /api/newsletter — subscribe (idempotent) ───────────────────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const NewsletterSchema = z.object({
  email: z.email("Please provide a valid email address"),
});

export async function POST(request: Request) {
  const parsed = await parseAndValidate(request, NewsletterSchema);
  if (!parsed.ok) return parsed.response;

  const email = parsed.data.email.trim().toLowerCase();

  const existing = await db.newsletterSubscriber.findUnique({
    where: { email },
  });
  if (existing) {
    return NextResponse.json({ ok: true, already: true });
  }

  try {
    await db.newsletterSubscriber.create({ data: { email } });
  } catch {
    // Unique-constraint race — treat as already subscribed.
    return NextResponse.json({ ok: true, already: true });
  }

  return NextResponse.json({ ok: true, already: false });
}
