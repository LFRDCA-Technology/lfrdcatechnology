"use client";

// ── Blog post — a single journal entry (#/blog/:slug), markdown body ────────

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { apiFetch } from "@/lib/auth";
import { Link, useSegments } from "@/lib/router";
import type { Post } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PillButton,
  Section,
  SectionHeader,
  SketchCard,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { useToast } from "@/hooks/use-toast";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function BlogPostPage() {
  const segments = useSegments();
  const slug = segments[1] ?? "";
  const { toast } = useToast();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setLoading(true);
    setNotFound(false);
    setPost(null);
    setRelated([]);
    (async () => {
      try {
        const data = await apiFetch<Post>(`/api/posts/${slug}`);
        if (!alive) return;
        setPost(data);
        // Related notes from the same shelf
        try {
          const res = await apiFetch<{ posts: Post[] }>(
            `/api/posts?limit=4&category=${encodeURIComponent(data.category)}`
          );
          if (alive)
            setRelated(
              res.posts.filter((p) => p.slug !== slug).slice(0, 3)
            );
        } catch {
          /* related posts are a nice-to-have */
        }
      } catch {
        if (alive) setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied" });
    } catch {
      toast({ title: "Couldn't copy — grab it from the address bar" });
    }
  };

  if (loading) {
    return <LoadingState label="Finding the right page…" />;
  }

  if (notFound || !post) {
    return (
      <Section className="pt-32">
        <EmptyState
          title="This note is still being sketched"
          hint="the page you're after wandered off"
        />
        <div className="flex justify-center mt-8">
          <PillButton to="/blog" variant="outline">
            ← Back to the journal
          </PillButton>
        </div>
      </Section>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ── Custom article header ────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pt-28 sm:pt-32 pb-10 sm:pb-14 max-w-3xl mx-auto w-full">
        <Link
          to="/blog"
          className="link-coral font-sans text-sm tracking-tight mb-8 inline-block"
        >
          ← All notes
        </Link>
        <div className="flex flex-col gap-6">
          <Tag tone="dusty" className="w-fit">
            {post.category}
          </Tag>
          <h1 className="font-serif font-light leading-[1.05] text-balance text-[clamp(36px,6vw,64px)]">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span
              aria-hidden="true"
              className="w-11 h-11 rounded-full border-[1.5px] border-ink bg-white flex items-center justify-center font-serif text-lg"
            >
              {initials(post.author)}
            </span>
            <div className="flex flex-col">
              <span className="font-sans text-[14px] font-semibold tracking-tight">
                {post.author}, {post.authorRole}
              </span>
              <span className="font-sans text-[12px] tracking-tight text-charcoal">
                {fmtDate(post.createdAt)} · {post.readTime} min read ·{" "}
                {post.views} views
              </span>
            </div>
          </div>
          {post.tags.length > 0 && (
            <p className="font-sans text-[12px] tracking-tight text-charcoal">
              (filed under: {post.tags.join(", ")})
            </p>
          )}
        </div>
      </section>

      {/* ── Post image + body ────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 pb-14 max-w-3xl mx-auto w-full">
        <div className="relative w-fit mx-auto mb-12">
          <CircularImage
            src={post.image}
            alt={post.title}
            size={260}
          />
          <DoodleStar
            className="absolute -top-3 -right-4 animate-wiggle"
            size={32}
          />
        </div>

        <article className="prose-sketchbook max-w-[680px] mx-auto">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="font-serif font-light text-3xl mt-10 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-serif font-light text-2xl mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal mb-5">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 font-sans text-[15px] leading-[1.75] tracking-tight text-charcoal mb-5 flex flex-col gap-2">
                  {children}
                </ul>
              ),
              li: ({ children }) => <li className="text-charcoal">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-[1.5px] border-coral pl-5 font-serif italic text-xl leading-relaxed my-6">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a href={href} className="link-coral font-sans tracking-tight">
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="font-mono text-[13px] bg-white border border-dusty rounded-lg px-1.5 py-0.5">
                  {children}
                </code>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* ── Share row ──────────────────────────────────────────────────── */}
        <div className="max-w-[680px] mx-auto mt-12 flex flex-wrap items-center gap-5 border-t-[1.5px] border-dusty pt-8">
          <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
            Pass it on —
          </span>
          <PillButton size="sm" variant="outline" onClick={copyLink}>
            Copy link
          </PillButton>
          <Squiggle
            variant="swirl"
            className="ml-auto hidden sm:block opacity-60"
            width={140}
            height={54}
          />
        </div>
      </section>

      {/* ── Related notes ────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section className="pt-0">
          <SectionHeader
            index="Keep reading"
            title={
              <>
                More from the <em className="font-normal">same shelf</em>
              </>
            }
            parenthetical="notes that live next to this one"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                <SketchCard className="h-full flex flex-col gap-4">
                  <CircularImage src={p.image} alt={p.title} size={110} />
                  <Tag tone="dusty">{p.category}</Tag>
                  <h3 className="font-serif font-light text-xl leading-snug group-hover:italic transition-all">
                    {p.title}
                  </h3>
                  <span className="font-sans text-[12px] tracking-tight text-charcoal mt-auto">
                    {p.readTime} min · {fmtDate(p.createdAt)}
                  </span>
                </SketchCard>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
