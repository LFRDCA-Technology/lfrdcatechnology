"use client";

// ── LFRDCA Technologies — SPA shell ─────────────────────────────────────────
// Single Next.js route ("/") hosting 57 hash-routed pages.

import { useState } from "react";
import { RouterProvider, useRouter } from "@/lib/router";
import { Header } from "@/components/site/header";
import { NavOverlay } from "@/components/site/nav-overlay";
import { Footer } from "@/components/site/footer";
import { ChatWidget } from "@/components/site/chat-widget";
import { NotFoundPage, matchRoute } from "@/components/pages/registry";

function RouteOutlet() {
  const { path } = useRouter();
  const match = matchRoute(path);
  const Page = match?.Component ?? NotFoundPage;
  return (
    <main id="main" className="flex-1 flex flex-col w-full">
      <Page key={path} />
    </main>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col bg-paper paper-grain">
        <Header onOpenNav={() => setNavOpen(true)} />
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
        <RouteOutlet />
        <Footer />
        <ChatWidget />
      </div>
    </RouterProvider>
  );
}
