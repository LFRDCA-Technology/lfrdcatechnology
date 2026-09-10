// ── GET /api/admin/overview — admin dashboard data (ADMIN only) ─────────────

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/server-auth";
import type { AdminOverview } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [users, messages, subscribers, quotes, applications, posts] =
    await Promise.all([
      db.user.count(),
      db.contactMessage.count(),
      db.newsletterSubscriber.count(),
      db.quoteRequest.count(),
      db.application.count(),
      db.post.count(),
    ]);

  const [recentMessages, recentQuotes, recentApplications] = await Promise.all([
    db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const overview: AdminOverview = {
    counts: {
      users,
      messages,
      subscribers,
      quotes,
      applications,
      posts,
    },
    recent: {
      messages: recentMessages.map((message) => ({
        id: message.id,
        name: message.name,
        email: message.email,
        subject: message.subject,
        createdAt: message.createdAt.toISOString(),
      })),
      quotes: recentQuotes.map((quote) => ({
        id: quote.id,
        name: quote.name,
        company: quote.company ?? "",
        service: quote.service,
        budget: quote.budget,
        createdAt: quote.createdAt.toISOString(),
      })),
      applications: recentApplications.map((application) => ({
        id: application.id,
        name: application.name,
        jobTitle: application.jobTitle,
        createdAt: application.createdAt.toISOString(),
      })),
    },
  };

  return NextResponse.json(overview);
}
