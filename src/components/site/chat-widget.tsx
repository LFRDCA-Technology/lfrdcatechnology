"use client";

// ── AI assistant chat widget — powered by LFRDCA intelligence (backend LLM) ─

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Squiggle } from "@/components/site/squiggle";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "How can AI help my business?",
  "Tell me about careers at LFRDCA",
  "I need a data platform quote",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey there! I'm LFRDCA's AI assistant. Ask me anything about our services, industries, careers — or how data & AI could work for your business.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((m) => m.role !== "assistant" || m.content.length < 2000)
            .slice(-10)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Hmm, my thoughts got tangled — try again in a moment.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The ink ran dry on that one — please try again shortly.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant chat"}
        className={cn(
          "fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-[3000px] border-[1.5px] border-ink bg-white px-5 py-3 shadow-sketch-btn transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_-6px_0_0_#333333] cursor-pointer",
          "mb-[env(safe-area-inset-bottom)]"
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dusty opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-[1.5px] border-ink bg-coral" />
        </span>
        <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em]">
          {open ? "Close" : "Ask AI"}
        </span>
      </button>

      {/* panel */}
      <div
        role="dialog"
        aria-label="AI assistant"
        className={cn(
          "fixed bottom-[86px] right-5 z-40 w-[min(92vw,380px)] rounded-[30px] border-[1.5px] border-ink bg-white shadow-sketch transition-all duration-300 origin-bottom-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b-[1.5px] border-ink/10">
          <div>
            <p className="font-serif text-lg leading-none">Ask <em className="font-normal">LFRDCA</em></p>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal mt-1">
              AI-powered assistant
            </p>
          </div>
          <Squiggle variant="spiral" width={34} height={34} className="animate-wiggle" />
        </div>

        <div
          ref={scrollRef}
          className="max-h-[320px] overflow-y-auto sketch-scroll px-5 py-4 flex flex-col gap-3"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-[20px] border-[1.5px] px-4 py-2.5 font-sans text-[13px] leading-relaxed tracking-tight",
                m.role === "user"
                  ? "self-end bg-ink text-paper border-ink"
                  : "self-start bg-paper border-dusty text-ink"
              )}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <div className="self-start rounded-[20px] border-[1.5px] border-dusty bg-paper px-4 py-2.5 font-sans text-[13px]">
              <span className="inline-flex gap-1">
                <span className="animate-blink">●</span>
                <span className="animate-blink [animation-delay:200ms]">●</span>
                <span className="animate-blink [animation-delay:400ms]">●</span>
              </span>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="px-5 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => void send(s)}
                className="rounded-[3000px] border-[1.5px] border-dusty bg-white px-3 py-1.5 font-sans text-[11px] tracking-tight text-charcoal hover:border-ink hover:-translate-y-[1px] transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2 p-4 border-t-[1.5px] border-ink/10"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Message the AI assistant"
            className="flex-1 rounded-[3000px] border-[1.5px] border-dusty bg-paper px-5 py-2.5 font-sans text-[13px] tracking-tight focus:outline-none focus:border-ink"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="w-[42px] h-[42px] rounded-full border-[1.5px] border-ink bg-ink text-paper flex items-center justify-center shadow-sketch-sm transition-all hover:-translate-y-[2px] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <svg viewBox="0 0 20 20" width="15" height="15" fill="none">
              <path d="M3 10 L 17 3 L 11 17 L 9 11 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
