"use client";

// ── Profile — edit your details and password on the LFRDCA platform ─────────

import { useEffect, useState, type FormEvent } from "react";
import { apiFetch, useAuth } from "@/lib/auth";
import { Link } from "@/lib/router";
import { useToast } from "@/hooks/use-toast";
import {
  DoodleStar,
  Squiggle,
} from "@/components/site/squiggle";
import {
  EmptyState,
  FieldLabel,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  SketchInput,
} from "@/components/site/ui";
import type { User } from "@/lib/types";

export default function ProfilePage() {
  const { user, loading, refresh } = useAuth();
  const { toast } = useToast();

  /* ── Details form state (prefilled once user loads) ─────────────────────── */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone ?? "");
      setCompany(user.company ?? "");
    }
  }, [user]);

  /* ── Password form state ─────────────────────────────────────────────────── */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  if (loading) return <LoadingState label="Fetching your details…" />;

  if (!user) {
    return (
      <div className="flex-1 px-5 py-32 max-w-md mx-auto w-full flex flex-col items-center text-center">
        <DoodleStar className="mb-6 animate-wiggle" size={38} />
        <EmptyState
          title="This sketchbook is members-only"
          hint="sign in to edit your profile"
        />
        <PillButton to="/login" variant="solid" className="mt-6">
          Sign in
        </PillButton>
      </div>
    );
  }

  async function saveDetails(e: FormEvent) {
    e.preventDefault();
    if (savingDetails) return;
    setSavingDetails(true);
    try {
      await apiFetch<{ user: User }>("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name, phone, company }),
      });
      toast({ title: "Profile updated" });
      await refresh();
    } catch (err) {
      toast({
        title: "Hmm",
        description:
          err instanceof Error ? err.message : "Could not save your details",
      });
    } finally {
      setSavingDetails(false);
    }
  }

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    if (savingPassword) return;
    if (newPassword.length < 8) {
      setPwError(true);
      return;
    }
    setPwError(false);
    setSavingPassword(true);
    try {
      await apiFetch<{ ok: boolean }>("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      toast({ title: "Password changed" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast({
        title: "Hmm",
        description:
          err instanceof Error ? err.message : "Could not change your password",
      });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <PageHero
          index="Account — Profile"
          title={
            <>
              Your <em className="font-normal">details</em>, kept neat.
            </>
          }
          parenthetical="edit what we know about you"
        />
        <DoodleStar
          className="absolute top-24 right-[6%] hidden md:block animate-wiggle"
          size={32}
        />
      </div>

      <Section className="flex flex-col gap-8">
        <Link to="/dashboard" className="link-coral font-sans text-sm tracking-tight w-fit">
          ← Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Your details ─────────────────────────────────────────────────── */}
          <SketchCard hover={false} className="p-6 sm:p-8">
            <h2 className="font-serif font-light text-2xl mb-1">
              Your <em className="font-normal">details</em>
            </h2>
            <p className="font-sans text-[12px] tracking-tight text-charcoal mb-6">
              (name, phone and company — email stays fixed)
            </p>
            <form onSubmit={saveDetails} className="flex flex-col gap-5">
              <div>
                <FieldLabel htmlFor="pf-name">Full name</FieldLabel>
                <SketchInput
                  id="pf-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor="pf-email">Email</FieldLabel>
                <SketchInput
                  id="pf-email"
                  type="email"
                  disabled
                  value={user.email}
                  className="bg-paper opacity-70 cursor-not-allowed"
                />
              </div>
              <div>
                <FieldLabel htmlFor="pf-phone">Phone</FieldLabel>
                <SketchInput
                  id="pf-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 00000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor="pf-company">Company</FieldLabel>
                <SketchInput
                  id="pf-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Where the magic happens"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <PillButton type="submit" variant="solid" disabled={savingDetails}>
                {savingDetails ? "Saving…" : "Save changes"}
              </PillButton>
            </form>
          </SketchCard>

          {/* ── Change password ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <SketchCard hover={false} className="p-6 sm:p-8">
              <h2 className="font-serif font-light text-2xl mb-1">
                Change <em className="font-normal">password</em>
              </h2>
              <p className="font-sans text-[12px] tracking-tight text-charcoal mb-6">
                (a fresh coat of ink on the front door)
              </p>
              <form onSubmit={changePassword} className="flex flex-col gap-5">
                <div>
                  <FieldLabel htmlFor="pf-current">Current password</FieldLabel>
                  <SketchInput
                    id="pf-current"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="The old secret"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="pf-new">New password</FieldLabel>
                  <SketchInput
                    id="pf-new"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (pwError && e.target.value.length >= 8) setPwError(false);
                    }}
                  />
                  <p className="font-sans text-[12px] tracking-tight text-charcoal mt-2 ml-2">
                    (minimum 8 characters)
                  </p>
                  {pwError && (
                    <p className="font-sans text-[12px] font-medium tracking-tight text-coral mt-1 ml-2">
                      New password needs at least 8 characters.
                    </p>
                  )}
                </div>
                <PillButton
                  type="submit"
                  variant="outline"
                  disabled={savingPassword}
                >
                  {savingPassword ? "Changing…" : "Change password"}
                </PillButton>
              </form>
            </SketchCard>

            {/* ── Danger zone (caption only) ─────────────────────────────────── */}
            <SketchCard tone="paper" hover={false} className="p-6">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal mb-2">
                Danger zone
              </p>
              <p className="font-sans text-[13px] tracking-tight text-charcoal leading-relaxed">
                (Accounts are deleted on request via{" "}
                <a
                  href="mailto:lfrdcatechnologies@outlook.com"
                  className="link-coral"
                >
                  lfrdcatechnologies@outlook.com
                </a>{" "}
                — no buttons for accidents here.)
              </p>
            </SketchCard>
          </div>
        </div>

        <Squiggle
          variant="swirl"
          color="#81aed9"
          className="hidden lg:block opacity-60 self-end -mt-2"
          width={170}
          height={66}
        />
      </Section>
    </div>
  );
}
