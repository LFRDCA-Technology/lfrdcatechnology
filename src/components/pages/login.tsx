"use client";

// ── Login — the members' entrance to the LFRDCA platform ────────────────────

import { useState, type FormEvent } from "react";
import { apiFetch, useAuth } from "@/lib/auth";
import { Link, navigateTo } from "@/lib/router";
import { useToast } from "@/hooks/use-toast";
import {
  FieldLabel,
  PillButton,
  SketchCard,
  SketchInput,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import type { User } from "@/lib/types";

export default function LoginPage() {
  const { user, loading, refresh, logout } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await apiFetch<{ user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      toast({ title: "Signed in — welcome back" });
      await refresh();
      navigateTo("/dashboard");
    } catch (err) {
      toast({
        title: "Hmm",
        description:
          err instanceof Error ? err.message : "Could not sign you in",
      });
    } finally {
      setBusy(false);
    }
  }

  /* ── Already signed in? Skip the queue. ─────────────────────────────────── */
  if (user && !loading) {
    return (
      <div className="relative flex-1 px-5 py-32 max-w-md mx-auto w-full">
        <DoodleStar className="mx-auto mb-8 animate-wiggle" size={40} />
        <h1 className="font-serif font-light leading-[1.05] text-[clamp(32px,6vw,46px)] text-center">
          You&apos;re already <em className="font-normal">signed in</em>.
        </h1>
        <p className="font-sans text-sm tracking-tight text-charcoal text-center mt-4">
          (signed in as {user.name} — {user.email})
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <PillButton to="/dashboard" variant="solid">
            Go to dashboard
          </PillButton>
          <PillButton
            variant="outline"
            type="button"
            onClick={async () => {
              await logout();
              toast({ title: "Signed out — see you soon" });
            }}
          >
            Sign out
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 px-5 py-32 max-w-md mx-auto w-full">
      <DoodleStar className="mx-auto mb-8 animate-wiggle" size={40} />
      <h1 className="font-serif font-light leading-[1.05] text-[clamp(32px,6vw,46px)] text-balance">
        Welcome <em className="font-normal">back</em>.
      </h1>
      <p className="font-sans text-sm tracking-tight text-charcoal mt-3">
        (the data missed you)
      </p>

      <Squiggle
        variant="underline"
        color="#81aed9"
        className="mt-6 opacity-90"
        width={240}
        height={22}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
        <div>
          <FieldLabel htmlFor="login-email">Email</FieldLabel>
          <SketchInput
            id="login-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="login-password">Password</FieldLabel>
          <SketchInput
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Your secret ink"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <PillButton type="submit" variant="solid" full disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </PillButton>
      </form>

      {/* ── Demo credentials helper ─────────────────────────────────────────── */}
      <SketchCard className="mt-8 p-5 sm:p-6" hover={false}>
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal mb-3">
          Just looking? (demo logins)
        </p>
        <p className="font-sans text-[12px] tracking-tight text-charcoal leading-relaxed">
          Demo: demo@lfrdca.tech / Demo@123 · Admin: admin@lfrdca.tech /
          Admin@123
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <PillButton
            size="sm"
            type="button"
            onClick={() => {
              setEmail("demo@lfrdca.tech");
              setPassword("Demo@123");
            }}
          >
            Fill demo
          </PillButton>
          <PillButton
            size="sm"
            type="button"
            onClick={() => {
              setEmail("admin@lfrdca.tech");
              setPassword("Admin@123");
            }}
          >
            Fill admin
          </PillButton>
        </div>
      </SketchCard>

      <p className="font-sans text-sm tracking-tight text-charcoal text-center mt-8">
        New here?{" "}
        <Link to="/register" className="link-coral">
          Create an account →
        </Link>
      </p>
    </div>
  );
}
