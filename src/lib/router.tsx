"use client";

// ── Hash router for the LFRDCA single-page platform ─────────────────────────
// Routes look like #/about, #/services/ai-development, #/blog/my-post-slug

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

interface RouterState {
  path: string; // e.g. "/services/ai-development"
  params: Record<string, string>; // dynamic segment values for current route
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterState>({
  path: "/",
  params: {},
  navigate: () => {},
});

function getPathFromHash(): string {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || hash === "/") return "/";
  return hash.startsWith("/") ? hash : `/${hash}`;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    const onHashChange = () => setPath(getPathFromHash());
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const clean = to.startsWith("/") ? to : `/${to}`;
    if (getPathFromHash() === clean) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = clean;
    window.scrollTo({ top: 0 });
  }, []);

  const value = useMemo(
    () => ({ path, params: {}, navigate }),
    [path, navigate]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouter(): RouterState {
  return useContext(RouterContext);
}

/** Current path segments: "/blog/my-post" → ["blog","my-post"] */
export function useSegments(): string[] {
  const { path } = useRouter();
  return useMemo(
    () => path.split("/").filter(Boolean),
    [path]
  );
}

/** Navigate imperatively from anywhere */
export function navigateTo(to: string) {
  const clean = to.startsWith("/") ? to : `/${to}`;
  window.location.hash = clean;
  window.scrollTo({ top: 0 });
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  return (
    <a
      href={`#${to.startsWith("/") ? to : `/${to}`}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
