// ── POST /api/quote — request a project quote ───────────────────────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { parseAndValidate } from "@/lib/api-helpers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

const QuoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email address"),
  company: z.string().trim().max(160, "Company name is too long").optional(),
  phone: z.string().trim().max(20, "Phone is too long").optional(),
  service: z.string().trim().min(1, "Please select a service"),
  budget: z.string().trim().min(1, "Please select a budget range"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(5000, "Message is too long"),
});

export async function POST(request: Request) {
  await ensureSeeded();

  const parsed = await parseAndValidate(request, QuoteSchema);
  if (!parsed.ok) return parsed.response;

  const { name, email, company, phone, service, budget, message } =
    parsed.data;

  await db.quoteRequest.create({
    data: {
      name,
      email: email.trim().toLowerCase(),
      company: company && company !== "" ? company : null,
      phone: phone && phone !== "" ? phone : null,
      service,
      budget,
      message,
    },
  });

  return NextResponse.json({ ok: true });
}
