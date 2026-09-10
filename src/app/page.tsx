"use client";

// ── LFRDCA Technologies — SPA shell ─────────────────────────────────────────
// Single Next.js route ("/") hosting 57 hash-routed pages.

import { useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { RouterProvider, useRouter } from "@/lib/router";
import { Header } from "@/components/site/header";
import { NavOverlay } from "@/components/site/nav-overlay";
import { Footer } from "@/components/site/footer";
import { NotFoundPage, matchRoute } from "@/components/pages/registry";

function RouteOutlet() {
  const { path } = useRouter();
  const match = matchRoute(path);
  const Page = match?.Component ?? NotFoundPage;
  return (
    <main id="main" className="flex-1 flex flex-col w-full">
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col"
      >
        <Page />
      </motion.div>
    </main>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <div className="min-h-screen flex flex-col bg-paper paper-grain">
          <Header onOpenNav={() => setNavOpen(true)} />
          <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
          <RouteOutlet />
          <Footer />
        </div>
      </RouterProvider>
    </MotionConfig>
  );
}
