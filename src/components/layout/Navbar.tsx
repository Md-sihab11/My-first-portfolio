"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1"
        >
          <span className="font-mono tracking-tighter text-accent group-hover:scale-110 transition-transform">
            &lt;/&gt;
          </span>
          <span className="lowercase font-semibold">
            {siteConfig.wordmark}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/80 p-1.5 rounded-full border border-border">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-surface-elevated text-accent font-semibold border border-accent/20 shadow-sm"
                    : "text-secondary hover:text-primary hover:bg-surface-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            aria-label="Search site resources, projects, and articles"
            className="min-w-[40px] min-h-[40px] hidden sm:flex items-center justify-center rounded-lg border border-border bg-surface text-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Search className="w-4 h-4" />
          </Link>

          <ThemeToggle />

          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider font-semibold bg-accent text-accent-text hover:bg-accent-hover transition-colors shadow-glow"
          >
            Let&apos;s Connect
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
