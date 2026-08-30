// ── LFRDCA Technologies · route-handler helpers ──────────────────────────────
// Shared request-body parsing + zod validation with a uniform error shape.

import { NextResponse } from "next/server";
import type { z } from "zod";

export type BodyResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: NextResponse };

/** Read and validate a JSON request body against a zod schema. */
export async function parseAndValidate<S extends z.ZodType>(
  request: Request,
  schema: S
): Promise<BodyResult<z.output<S>>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      ),
    };
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    const message =
      result.error.issues[0]?.message ?? "Invalid request body";
    return {
      ok: false,
      response: NextResponse.json({ error: message }, { status: 400 }),
    };
  }
  return { ok: true, data: result.data };
}

/** Truncate a string for use as a search-result excerpt. */
export function excerptOf(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + "…";
}
