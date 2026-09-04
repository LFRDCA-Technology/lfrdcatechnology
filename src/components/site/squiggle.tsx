"use client";

// ── Hand-drawn squiggle decorations — the signature Dyotanya motif ──────────
// 1.5px black ink strokes, cubic-bezier curves with human imperfection.

import { cn } from "@/lib/utils";

export type SquiggleVariant =
  | "loop"
  | "wave"
  | "underline"
  | "spiral"
  | "arc"
  | "scribble"
  | "swirl"
  | "dash";

interface SquiggleProps {
  variant?: SquiggleVariant;
  className?: string;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  width?: number;
  height?: number;
}

const PATHS: Record<SquiggleVariant, string> = {
  // looping connector between elements
  loop:
    "M4 40 C 30 10, 55 8, 70 26 C 84 44, 62 66, 44 52 C 26 38, 58 18, 96 24 C 130 29, 150 12, 176 20",
  // gentle wave
  wave:
    "M4 30 C 30 6, 44 52, 72 30 C 100 8, 114 54, 142 30 C 170 6, 186 50, 216 28",
  // underline flourish for headlines
  underline:
    "M4 16 C 60 4, 120 26, 178 12 C 210 4, 250 18, 296 10",
  // spiral doodle
  spiral:
    "M60 60 C 20 60, 12 24, 48 16 C 84 8, 104 44, 76 62 C 52 78, 40 46, 66 40 C 88 35, 92 55, 74 60",
  // open arc / half-moon
  arc:
    "M12 88 C 6 34, 52 4, 104 14 C 148 22, 168 62, 148 96",
  // loose scribble circle
  scribble:
    "M52 8 C 88 6, 100 40, 82 62 C 64 84, 26 80, 16 54 C 6 28, 34 6, 66 14 C 92 21, 96 48, 78 66",
  // swirl with tail
  swirl:
    "M8 20 C 40 4, 70 30, 56 54 C 44 74, 14 64, 18 40 C 22 18, 56 16, 84 30 C 110 43, 140 30, 168 22",
  // dashed journey line with hills
  dash:
    "M4 56 C 34 56, 40 18, 72 18 C 104 18, 108 60, 140 60 C 166 60, 172 26, 208 22",
};

export function Squiggle({
  variant = "loop",
  className,
  color = "#000000",
  strokeWidth = 1.5,
  animated = false,
  width = 180,
  height = 100,
}: SquiggleProps) {
  const vb: Record<SquiggleVariant, string> = {
    loop: "0 0 180 80",
    wave: "0 0 220 64",
    underline: "0 0 300 32",
    spiral: "0 0 120 90",
    arc: "0 0 170 110",
    scribble: "0 0 110 88",
    swirl: "0 0 180 84",
    dash: "0 0 212 76",
  };
  return (
    <svg
      viewBox={vb[variant]}
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none select-none max-w-full", className)}
    >
      <path
        d={PATHS[variant]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "draw-line" : undefined}
      />
    </svg>
  );
}

/** Small hand-drawn starburst doodle */
export function DoodleStar({
  className,
  color = "#000000",
  size = 28,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M20 3 C 21 12, 22 14, 30 16 C 22 18, 21 20, 20 29 C 19 20, 18 18, 10 16 C 18 14, 19 12, 20 3 Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M31 26 C 32 30, 33 31, 37 32 C 33 33, 32 34, 31 38 C 30 34, 29 33, 25 32 C 29 31, 30 30, 31 26 Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Curved hand-drawn arrow for pointing at things */
export function HandArrow({
  className,
  color = "#000000",
  width = 90,
  height = 60,
  flip = false,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 90 60"
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M6 8 C 24 40, 48 50, 78 44"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M66 36 L 79 44 L 68 53"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Circular scribble that can wrap an element (absolute positioned) */
export function CircleScribble({
  className,
  color = "#81aed9",
  size = 120,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 110 88"
      width={size}
      height={size * 0.8}
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none select-none absolute", className)}
    >
      <path
        d="M52 8 C 88 6, 100 40, 82 62 C 64 84, 26 80, 16 54 C 6 28, 34 6, 66 14 C 92 21, 96 48, 78 66"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
