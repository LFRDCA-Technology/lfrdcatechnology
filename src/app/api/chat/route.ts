// ── POST /api/chat — AI assistant (z-ai-web-dev-sdk, server-side only) ──────

import { NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";
import { parseAndValidate } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT =
  "You are the AI assistant of LFRDCA Technologies, an AI-powered IT company in Noida Sector 62, Uttar Pradesh 201309, India. Email lfrdcatechnologies@outlook.com, phone +91 7361864847. Services: AI development, data analytics, data science, machine learning, cloud & DevOps, web development, mobile development, cybersecurity. Solutions: data platforms, AI assistants, analytics cloud. Industries: healthcare, finance, retail, manufacturing. You help visitors understand services, process (discovery → design → build → ship), careers, and encourage contacting the team for quotes. Be warm, concise (under 120 words), a little playful like an editorial sketchbook — occasionally use *italic* emphasis. Never invent pricing specifics; ranges exist on the pricing page.";

const FALLBACK_REPLY =
  "My pen ran out of ink — please try again in a moment.";

const ChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1, "Message content is required"),
      })
    )
    .min(1, "No messages to answer"),
});

/** Minimal shape of the SDK chat-completion response (SDK returns any). */
interface ChatCompletionResult {
  choices?: { message?: { content?: unknown } }[];
}

export async function POST(request: Request) {
  const parsed = await parseAndValidate(request, ChatSchema);
  if (!parsed.ok) return parsed.response;

  // Keep only the last 10 messages of the conversation.
  const recentMessages = parsed.data.messages
    .slice(-10)
    .map((message) => ({ role: message.role, content: message.content }));

  try {
    const zai = await ZAI.create();
    const completion = (await zai.chat.completions.create({
      messages: [{ role: "assistant", content: SYSTEM_PROMPT }, ...recentMessages],
      thinking: { type: "disabled" },
    })) as ChatCompletionResult;

    const raw = completion.choices?.[0]?.message?.content;
    const reply = typeof raw === "string" ? raw.trim() : "";
    if (reply) {
      return NextResponse.json({ reply });
    }
    return NextResponse.json({ reply: FALLBACK_REPLY });
  } catch (error) {
    console.error("[api/chat] SDK error:", error);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
