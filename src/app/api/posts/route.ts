// ── GET /api/posts — paginated journal with category & search filters ───────

import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { serializePost } from "@/lib/serializers";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

function toPositiveInt(value: string | null, fallback: number): number {
  if (value === null) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return parsed;
}

export async function GET(request: Request) {
  await ensureSeeded();

  const { searchParams } = new URL(request.url);
  const page = toPositiveInt(searchParams.get("page"), 1);
  const limit = Math.min(50, toPositiveInt(searchParams.get("limit"), 9));
  const category = searchParams.get("category")?.trim();
  const q = searchParams.get("q")?.trim();

  const where: Prisma.PostWhereInput = {};
  if (category) where.category = category;
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { excerpt: { contains: q } },
      { content: { contains: q } },
    ];
  }

  const total = await db.post.count({ where });
  const pages = Math.max(1, Math.ceil(total / limit));
  const rows = await db.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({
    posts: rows.map(serializePost),
    total,
    page,
    pages,
  });
}
