"use client";

// ── Blog — "Notes from the margins." searchable, paginated journal ──────────

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Link } from "@/lib/router";
import type { Post } from "@/lib/types";
import {
  CircularImage,
  EmptyState,
  LoadingState,
  PageHero,
  PillButton,
  Section,
  SketchCard,
  SketchInput,
  Tag,
} from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "AI",
  "Analytics",
  "Data Engineering",
  "Cloud",
  "Security",
  "MLOps",
];

const PAGE_SIZE = 6;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  // Debounce the search box (~350ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch the journal page
  useEffect(() => {
    let alive = true;
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });
    if (category !== "All") params.set("category", category);
    if (query) params.set("q", query);
    (async () => {
      try {
        const data = await apiFetch<{
          posts: Post[];
          total: number;
          page: number;
          pages: number;
        }>(`/api/posts?${params.toString()}`);
        if (!alive) return;
        setPosts(data.posts);
        setPages(Math.max(1, data.pages));
        setTotal(data.total);
        setFailed(false);
      } catch {
        if (alive) {
          setPosts([]);
          setFailed(true);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [page, category, query]);

  const isFeatureMode = page === 1 && !query && category === "All";
  const feature = isFeatureMode ? posts[0] : undefined;
  const gridPosts = feature ? posts.slice(1) : posts;

  const selectCategory = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  const hasFilters = query !== "" || category !== "All";

  return (
    <div className="flex flex-col">
      <PageHero
        index="The journal"
        title={
          <>
            Notes from the <em className="font-normal">margins</em>.
          </>
        }
        parenthetical="field notes on data, AI and craft"
      >
        <Squiggle
          variant="underline"
          animated
          className="mt-2 opacity-80"
          width={260}
          height={24}
        />
      </PageHero>

      <Section className="pt-0">
        {/* ── Controls: search + category chips ───────────────────────────── */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="max-w-md relative">
            <SketchInput
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search the journal…"
              aria-label="Search the journal"
            />
            <DoodleStar
              className="absolute -top-4 -right-3 hidden sm:block"
              size={24}
              color="#81aed9"
            />
          </div>
          <div
            className="flex flex-wrap items-center gap-3"
            role="group"
            aria-label="Filter notes by category"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => selectCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-[3000px] border-[1.5px] border-ink bg-white px-4 py-1.5 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer hover:-translate-y-[1px]",
                  category === c ? "bg-ink text-paper" : "text-ink"
                )}
              >
                {c}
              </button>
            ))}
            {total > 0 && (
              <span className="font-sans text-[12px] tracking-tight text-charcoal ml-1">
                ({total} notes and counting)
              </span>
            )}
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        {loading ? (
          <LoadingState label="Leafing through the notebook…" />
        ) : failed ? (
          <EmptyState
            title="The notebook wouldn't open"
            hint="couldn't reach the journal — try refreshing"
          />
        ) : posts.length === 0 ? (
          <EmptyState
            title="Nothing in the margins yet"
            hint={
              hasFilters
                ? "no notes match — try a different search or category"
                : "fresh ink is on the way"
            }
          />
        ) : (
          <div className="flex flex-col gap-14">
            {/* ── Featured note (only on unfiltered page 1) ─────────────────── */}
            {feature && (
              <Link to={`/blog/${feature.slug}`} className="group block">
                <article className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="relative shrink-0">
                    <CircularImage
                      src={feature.image}
                      alt={feature.title}
                      size={160}
                    />
                    <span className="absolute -top-5 -left-2 font-serif font-light text-5xl text-ink/20">
                      ★
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 max-w-xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <Tag tone="dusty">{feature.category}</Tag>
                      <span className="font-sans text-[12px] tracking-tight text-charcoal">
                        (latest from the desk)
                      </span>
                    </div>
                    <h2 className="font-serif font-light text-[clamp(28px,4.5vw,44px)] leading-[1.08] group-hover:italic transition-all">
                      {feature.title}
                    </h2>
                    <p className="font-sans text-[14px] leading-relaxed tracking-tight text-charcoal">
                      {feature.excerpt.slice(0, 180)}…
                    </p>
                    <span className="font-sans text-[12px] tracking-tight text-charcoal">
                      {feature.readTime} min read · {fmtDate(feature.createdAt)} ·{" "}
                      {feature.author}
                    </span>
                  </div>
                </article>
              </Link>
            )}

            {/* ── Grid of notes ────────────────────────────────────────────── */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                {gridPosts.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                    <SketchCard className="h-full flex flex-col gap-4">
                      <CircularImage src={p.image} alt={p.title} size={110} />
                      <Tag tone="dusty">{p.category}</Tag>
                      <h3 className="font-serif font-light text-xl leading-snug group-hover:italic transition-all">
                        {p.title}
                      </h3>
                      <p className="font-sans text-[13px] leading-relaxed tracking-tight text-charcoal">
                        {p.excerpt.slice(0, 110)}…
                      </p>
                      <span className="font-sans text-[12px] tracking-tight text-charcoal mt-auto">
                        {p.readTime} min · {fmtDate(p.createdAt)}
                      </span>
                    </SketchCard>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Pagination ──────────────────────────────────────────────────── */}
        {!loading && !failed && pages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-5 mt-16">
            <PillButton
              size="sm"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Newer
            </PillButton>
            <span className="font-sans text-[13px] tracking-tight text-charcoal">
              Page {page} of {pages}
            </span>
            <PillButton
              size="sm"
              variant="outline"
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
            >
              Older →
            </PillButton>
          </div>
        )}
      </Section>
    </div>
  );
}
