// ── GET /api/testimonials — client testimonials ─────────────────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeTestimonial } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.testimonial.findMany();
  return NextResponse.json(rows.map(serializeTestimonial));
}
