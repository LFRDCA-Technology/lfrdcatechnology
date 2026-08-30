// ── GET /api/posts/[slug] — single post (increments views) ──────────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializePost } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await ensureSeeded();
  const { slug } = await params;
  const row = await db.post.findUnique({ where: { slug } });
  if (!row) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const updated = await db.post.update({
    where: { id: row.id },
    data: { views: { increment: 1 } },
  });
  return NextResponse.json(serializePost(updated));
}
