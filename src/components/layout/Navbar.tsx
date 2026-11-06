"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const [brandLead, ...brandRest] = siteConfig.wordmark.split(" ");

function isActivePath(pathname: string, href: string, hash: string) {
  const [path, fragment] = href.split("#");
  const targetPath = path || "/";
  const matchesPath =
    targetPath === "/"
      ? pathname === "/"
      : pathname === targetPath || pathname.startsWith(`${targetPath}/`);

  if (!matchesPath) return false;
  if (fragment) return hash === `#${fragment}`;
  return targetPath !== "/" || !hash;
}

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const fragment = href.split("#")[1];
    setHash(fragment ? `#${fragment}` : "");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.wordmark} — home`}
          onClick={() => setHash("")}
          className="group flex shrink-0 items-center rounded-sm text-xl font-semibold tracking-[-0.03em] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-accent transition-colors group-hover:text-accent-hover">
            {brandLead}
          </span>
          {brandRest.length > 0 && (
            <span className="ml-1.5 text-secondary transition-colors group-hover:text-primary">
              {brandRest.join(" ")}
            </span>
          )}
        </Link>

        <div className="flex min-w-0 items-center gap-5 xl:gap-8">
          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href, hash);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 rounded-full bg-accent-subtle px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                      {item.badge}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px rounded-full bg-accent transition-opacity",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/search"
              aria-label="Search site resources, projects, and articles"
              className="hidden h-10 min-h-[40px] w-10 min-w-[40px] items-center justify-center rounded-full border border-border bg-surface text-secondary transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex"
            >
              <Search className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="hidden h-10 items-center justify-center rounded-full bg-accent-solid px-5 text-[13px] font-semibold text-accent-text shadow-glow transition-colors hover:bg-accent-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:inline-flex"
            >
              Let&apos;s Connect
            </Link>

            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
