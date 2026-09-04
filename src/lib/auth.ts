"use client";

// ── API fetch helper + client auth hook ─────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import type { User } from "@/lib/types";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  });
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* no json body */
  }
  if (!res.ok) {
    const message =
      (body as { error?: string } | null)?.error ??
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }
  return body as T;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch<{ user: User }>("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  return { user, loading, refresh, logout, setUser };
}
