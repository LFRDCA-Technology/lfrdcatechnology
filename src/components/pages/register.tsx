"use client";

// ── Register — join the paper side of the LFRDCA platform ───────────────────

import { useState, type FormEvent } from "react";
import { apiFetch, useAuth } from "@/lib/auth";
import { Link, navigateTo } from "@/lib/router";
import { useToast } from "@/hooks/use-toast";
import {
  FieldLabel,
  PillButton,
  SketchInput,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import type { User } from "@/lib/types";

export default function RegisterPage() {
  const { refresh } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (password.length < 8) {
      setPwError(true);
      return;
    }
    setPwError(false);
    setBusy(true);
    try {
      await apiFetch<{ user: User }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      toast({ title: "Account created — welcome to LFRDCA" });
      await refresh();
      navigateTo("/dashboard");
    } catch (err) {
      toast({
        title: "Hmm",
        description:
          err instanceof Error ? err.message : "Could not create your account",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex-1 px-5 py-32 max-w-md mx-auto w-full">
      <DoodleStar className="mx-auto mb-8 animate-wiggle" size={40} />
      <h1 className="font-serif font-light leading-[1.05] text-[clamp(32px,6vw,46px)] text-balance">
        Join the <em className="font-normal">paper</em> side.
      </h1>
      <p className="font-sans text-sm tracking-tight text-charcoal mt-3">
        (one account, the whole platform — no spam, ever)
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
          <FieldLabel htmlFor="reg-name">Full name</FieldLabel>
          <SketchInput
            id="reg-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="reg-email">Email</FieldLabel>
          <SketchInput
            id="reg-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="reg-password">Password</FieldLabel>
          <SketchInput
            id="reg-password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (pwError && e.target.value.length >= 8) setPwError(false);
            }}
          />
          <p className="font-sans text-[12px] tracking-tight text-charcoal mt-2 ml-2">
            (minimum 8 characters — future you says thanks)
          </p>
          {pwError && (
            <p className="font-sans text-[12px] font-medium tracking-tight text-coral mt-1 ml-2">
              Password needs at least 8 characters.
            </p>
          )}
        </div>
        <PillButton type="submit" variant="solid" full disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </PillButton>
      </form>

      <p className="font-sans text-[11px] tracking-tight text-charcoal text-center leading-relaxed mt-8">
        By creating an account you agree to our{" "}
        <Link to="/terms" className="link-coral">
          Terms
        </Link>{" "}
        &amp;{" "}
        <Link to="/privacy" className="link-coral">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="font-sans text-sm tracking-tight text-charcoal text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="link-coral">
          Sign in →
        </Link>
      </p>
    </div>
  );
}
