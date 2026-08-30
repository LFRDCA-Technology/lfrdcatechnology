// ── POST /api/jobs/apply — submit a job application ─────────────────────────

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { parseAndValidate } from "@/lib/api-helpers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

const ApplySchema = z.object({
  jobSlug: z.string().trim().min(1, "Please choose a role"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email address"),
  phone: z.string().trim().max(20, "Phone is too long").optional(),
  resumeLink: z.string().trim().max(500, "Resume link is too long").optional(),
  coverLetter: z
    .string()
    .trim()
    .max(5000, "Cover letter is too long")
    .optional(),
});

export async function POST(request: Request) {
  await ensureSeeded();

  const parsed = await parseAndValidate(request, ApplySchema);
  if (!parsed.ok) return parsed.response;

  const { jobSlug, name, email, phone, resumeLink, coverLetter } = parsed.data;

  const job = await db.job.findUnique({ where: { slug: jobSlug } });
  if (!job || !job.active) {
    return NextResponse.json(
      { error: "Job not found or no longer accepting applications" },
      { status: 404 }
    );
  }

  await db.application.create({
    data: {
      jobSlug: job.slug,
      jobTitle: job.title,
      name,
      email: email.trim().toLowerCase(),
      phone: phone && phone !== "" ? phone : null,
      resumeLink: resumeLink && resumeLink !== "" ? resumeLink : null,
      coverLetter: coverLetter && coverLetter !== "" ? coverLetter : null,
    },
  });

  return NextResponse.json({ ok: true });
}
