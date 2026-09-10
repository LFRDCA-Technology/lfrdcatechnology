"use client";

// ── Dyotanya sketchbook UI kit — the shared component contract ──────────────

import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/router";

/* ── SketchCard ─────────────────────────────────────────────────────────── */
export function SketchCard({
  children,
  className,
  tone = "white",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "paper" | "inverted" | "dusty";
  hover?: boolean;
}) {
  const tones = {
    white: "bg-white border-dusty text-ink",
    paper: "bg-paper border-ink text-ink",
    inverted: "bg-charcoal border-ink text-paper",
    dusty: "bg-white border-ink text-ink",
  } as const;
  return (
    <div
      className={cn(
        "rounded-[30px] border-[1.5px] p-6 sm:p-8 shadow-sketch",
        tones[tone],
        hover &&
          "transition-transform duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_-7px_0_0_#333333]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── PillButton ─────────────────────────────────────────────────────────── */
type PillVariant = "solid" | "outline" | "dark" | "dusty";

interface PillButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  to?: string;
  variant?: PillVariant;
  size?: "sm" | "md" | "lg";
  full?: boolean;
}

export function PillButton({
  children,
  to,
  variant = "outline",
  size = "md",
  full,
  className,
  ...rest
}: PillButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[3000px] border-[1.5px] font-sans uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusty";
  const variants: Record<PillVariant, string> = {
    solid:
      "bg-ink text-paper border-ink shadow-sketch-btn hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333]",
    outline:
      "bg-white text-ink border-ink shadow-sketch-btn hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333]",
    dark: "bg-charcoal text-paper border-ink shadow-sketch-btn hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#81aed9]",
    dusty:
      "bg-dusty text-ink border-ink shadow-sketch-btn hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333]",
  };
  const sizes = {
    sm: "px-5 py-2.5 text-[12px]",
    md: "px-7 py-3.5 text-[13px]",
    lg: "px-9 py-[18px] text-[14px]",
  } as const;
  const cls = cn(
    base,
    variants[variant],
    sizes[size],
    full && "w-full",
    className
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ── SectionHeader — editorial index marker + serif title + parenthetical ── */
export function SectionHeader({
  index,
  title,
  parenthetical,
  align = "left",
  className,
}: {
  index?: string;
  title: ReactNode;
  parenthetical?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {index && (
        <span className="font-serif text-sm font-light tracking-widest text-ink/60">
          {index}
        </span>
      )}
      <h2
        className={cn(
          "font-serif font-light leading-[1.05] text-balance",
          "text-[clamp(30px,5vw,48px)]",
          align === "center" ? "max-w-3xl" : "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {parenthetical && (
        <p className="font-sans text-sm tracking-tight text-charcoal">
          ({parenthetical})
        </p>
      )}
    </div>
  );
}

/* ── PageHero — standard inner page header ──────────────────────────────── */
export function PageHero({
  index,
  title,
  parenthetical,
  children,
  className,
}: {
  index?: string;
  title: ReactNode;
  parenthetical?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "px-5 sm:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16 max-w-6xl mx-auto",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {index && (
          <span className="font-serif text-sm font-light tracking-widest text-ink/60">
            {index}
          </span>
        )}
        <h1 className="font-serif font-light leading-[1.02] text-balance text-[clamp(38px,7vw,72px)] max-w-4xl">
          {title}
        </h1>
        {parenthetical && (
          <p className="font-sans text-base tracking-tight text-charcoal max-w-xl">
            ({parenthetical})
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/* ── CircularImage — the only photographic crop allowed ─────────────────── */
export function CircularImage({
  src,
  alt,
  size = 240,
  className,
  badge,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  badge?: ReactNode;
}) {
  return (
    <div
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full rounded-full object-cover border-[1.5px] border-ink bg-white"
        loading="lazy"
      />
      {badge && (
        <div className="absolute -bottom-1 -right-1 z-10">{badge}</div>
      )}
    </div>
  );
}

/* ── TrophyBadge ────────────────────────────────────────────────────────── */
export function TrophyBadge({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="award winning project"
      className={cn(
        "inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white border-[1.5px] border-ink text-base shadow-sketch-sm",
        className
      )}
    >
      🏆
    </span>
  );
}

/* ── Marquee — scrolling strip of words ─────────────────────────────────── */
export function Marquee({
  items,
  className,
  slow,
}: {
  items: string[];
  className?: string;
  slow?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y-[1.5px] border-ink py-4 select-none",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max items-center gap-10 whitespace-nowrap",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="font-serif text-2xl sm:text-3xl font-light flex items-center gap-10"
          >
            {item}
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
              <path
                d="M10 2 C 11 7, 12 8, 17 10 C 12 12, 11 13, 10 18 C 9 13, 8 12, 3 10 C 8 8, 9 7, 10 2 Z"
                stroke="#ff8562"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Form controls — 30px radius, dusty borders ─────────────────────────── */
export function SketchInput({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-[30px] border-[1.5px] border-dusty bg-white px-6 py-3.5 font-sans text-[15px] tracking-tight text-ink placeholder:text-[#828282] focus:outline-none focus:border-ink transition-colors",
        className
      )}
      {...rest}
    />
  );
}

export function SketchTextarea({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-[30px] border-[1.5px] border-dusty bg-white px-6 py-4 font-sans text-[15px] tracking-tight text-ink placeholder:text-[#828282] focus:outline-none focus:border-ink transition-colors resize-y min-h-[130px]",
        className
      )}
      {...rest}
    />
  );
}

export function SketchSelect({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-[30px] border-[1.5px] border-dusty bg-white px-6 py-3.5 font-sans text-[15px] tracking-tight text-ink focus:outline-none focus:border-ink transition-colors appearance-none cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal mb-2 block"
    >
      {children}
    </label>
  );
}

/* ── StatBlock — big serif number + caption ─────────────────────────────── */
export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-serif font-light text-[clamp(36px,5vw,58px)] leading-none">
        {value}
      </span>
      <span className="font-sans text-[12px] uppercase tracking-[0.14em] opacity-70">
        {label}
      </span>
    </div>
  );
}

/* ── Tag pill ───────────────────────────────────────────────────────────── */
export function Tag({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "dusty" | "coral" | "charcoal";
}) {
  const tones = {
    ink: "border-ink text-ink bg-white",
    dusty: "border-dusty text-ink bg-white",
    coral: "border-ink text-coral bg-white",
    charcoal: "border-paper/40 text-paper bg-transparent",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3000px] border-[1.5px] px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ── Loading / Empty states ─────────────────────────────────────────────── */
export function LoadingState({ label = "Sketching it in…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <svg viewBox="0 0 60 60" width="52" height="52" fill="none" className="animate-spin-slow">
        <path
          d="M52 8 C 88 6, 100 40, 82 62 C 64 84, 26 80, 16 54 C 6 28, 34 6, 66 14 C 92 21, 96 48, 78 66"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-sans text-sm tracking-tight text-charcoal">
        {label}
      </span>
    </div>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <span className="font-serif font-light italic text-2xl">{title}</span>
      {hint && (
        <span className="font-sans text-sm tracking-tight text-charcoal">
          ({hint})
        </span>
      )}
    </div>
  );
}

/* ── NavLink — coral inline text link ───────────────────────────────────── */
export function InlineLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={cn("link-coral font-sans tracking-tight", className)}>
      {children}
    </Link>
  );
}

/* ── Section wrapper ────────────────────────────────────────────────────── */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("px-5 sm:px-8 py-14 sm:py-20 max-w-6xl mx-auto w-full", className)}
    >
      {children}
    </section>
  );
}
