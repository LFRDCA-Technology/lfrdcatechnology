"use client";

// ── Sitemap — every page, one map ────────────────────────────────────────────

import { Link } from "@/lib/router";
import { PageHero, Section, SketchCard, Tag } from "@/components/site/ui";
import { DoodleStar, Squiggle } from "@/components/site/squiggle";

interface SitemapGroup {
  index: string;
  title: string;
  links: { label: string; to: string }[];
}

const GROUPS: SitemapGroup[] = [
  {
    index: "01",
    title: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About us", to: "/about" },
      { label: "Our story", to: "/story" },
      { label: "Mission & vision", to: "/mission" },
      { label: "Leadership", to: "/leadership" },
      { label: "Culture", to: "/culture" },
      { label: "Partners", to: "/partners" },
      { label: "Investor relations", to: "/investors" },
      { label: "Certifications", to: "/certifications" },
      { label: "Sitemap", to: "/sitemap" },
      { label: "Coming soon", to: "/coming-soon" },
      { label: "Thank you", to: "/thank-you" },
    ],
  },
  {
    index: "02",
    title: "Services",
    links: [
      { label: "All services", to: "/services" },
      { label: "AI development", to: "/services/ai-development" },
      { label: "Data analytics", to: "/services/data-analytics" },
      { label: "Data science", to: "/services/data-science" },
      { label: "Machine learning", to: "/services/machine-learning" },
      { label: "Cloud & DevOps", to: "/services/cloud-devops" },
      { label: "Web development", to: "/services/web-development" },
      { label: "Mobile development", to: "/services/mobile-development" },
      { label: "Cybersecurity", to: "/services/cybersecurity" },
    ],
  },
  {
    index: "03",
    title: "Industries",
    links: [
      { label: "All industries", to: "/industries" },
      { label: "Healthcare", to: "/industries/healthcare" },
      { label: "Finance", to: "/industries/finance" },
      { label: "Retail", to: "/industries/retail" },
      { label: "Manufacturing", to: "/industries/manufacturing" },
    ],
  },
  {
    index: "04",
    title: "Solutions",
    links: [
      { label: "All solutions", to: "/solutions" },
      { label: "Data platform", to: "/solutions/data-platform" },
      { label: "AI assistants", to: "/solutions/ai-assistants" },
      { label: "Analytics cloud", to: "/solutions/analytics-cloud" },
    ],
  },
  {
    index: "05",
    title: "Work & journal",
    links: [
      { label: "Portfolio", to: "/portfolio" },
      { label: "Blog", to: "/blog" },
      { label: "Insights", to: "/insights" },
      { label: "Whitepapers", to: "/whitepapers" },
      { label: "News", to: "/news" },
    ],
  },
  {
    index: "06",
    title: "Careers & learning",
    links: [
      { label: "Careers", to: "/careers" },
      { label: "Internships", to: "/internships" },
      { label: "Training programmes", to: "/training" },
    ],
  },
  {
    index: "07",
    title: "Connect",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Request a quote", to: "/quote" },
      { label: "Pricing", to: "/pricing" },
      { label: "FAQ", to: "/faq" },
      { label: "Support", to: "/support" },
      { label: "Documentation", to: "/docs" },
      { label: "System status", to: "/status" },
    ],
  },
  {
    index: "08",
    title: "Account",
    links: [
      { label: "Log in", to: "/login" },
      { label: "Create account", to: "/register" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Profile", to: "/profile" },
      { label: "Admin", to: "/admin" },
    ],
  },
  {
    index: "09",
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
      { label: "Cookie policy", to: "/cookies" },
      { label: "GDPR", to: "/gdpr" },
    ],
  },
];

const TOTAL_LINKS = GROUPS.reduce((sum, g) => sum + g.links.length, 0);

export default function SitemapPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="LFRDCA — 08 · The map"
        title={
          <>
            Every page, <em className="font-normal">one map.</em>
          </>
        }
        parenthetical="Fifty-seven routes sketched out — nothing hidden in the margins"
      >
        <div className="flex items-center gap-3 mt-4">
          <DoodleStar size={24} className="animate-wiggle" />
          <span className="font-sans text-[12px] tracking-tight text-charcoal">
            ({TOTAL_LINKS} linked pages — plus a few dozen blog posts, case
            studies and one charming 404)
          </span>
        </div>
      </PageHero>

      {/* ── GROUPED COLUMNS ──────────────────────────────────────────────── */}
      <Section className="pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {GROUPS.map((group) => (
            <SketchCard
              key={group.title}
              hover={false}
              className="flex flex-col gap-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-serif text-sm font-light tracking-widest text-ink/60">
                    {group.index} — {group.title}
                  </span>
                  <h2 className="font-serif font-light text-[clamp(26px,3.5vw,36px)] leading-none">
                    {group.title}
                  </h2>
                </div>
                <Tag tone="dusty">{group.links.length} pages</Tag>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-sans text-sm tracking-tight text-charcoal hover:text-coral hover:underline decoration-1 underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SketchCard>
          ))}
        </div>

        <div className="flex flex-col items-center gap-5 mt-14">
          <Squiggle
            variant="dash"
            className="opacity-70"
            width={280}
            height={80}
          />
          <p className="font-sans text-sm tracking-tight text-charcoal text-center max-w-md">
            Lost? The{" "}
            <Link
              to="/"
              className="text-coral underline decoration-1 underline-offset-4 hover:decoration-dusty transition-all"
            >
              front page
            </Link>{" "}
            is a decent place to restart — or{" "}
            <Link
              to="/contact"
              className="text-coral underline decoration-1 underline-offset-4 hover:decoration-dusty transition-all"
            >
              tell a human
            </Link>{" "}
            what you were looking for.
          </p>
        </div>
      </Section>
    </div>
  );
}
