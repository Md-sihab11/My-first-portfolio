"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, BookOpen, Compass, GraduationCap } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const isMoreActive =
    pathname.startsWith("/articles") ||
    pathname.startsWith("/resources") ||
    pathname.startsWith("/study-abroad");

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
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
          {mainNavLinks.slice(0, 3).map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
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

          {/* More Dropdown */}
          <div
            ref={moreDropdownRef}
            className="relative"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsMoreOpen((prev) => !prev)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
              className={cn(
                "relative px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isMoreActive
                  ? "bg-surface-elevated text-accent font-semibold border border-accent/20 shadow-sm"
                  : "text-secondary hover:text-primary hover:bg-surface-muted"
              )}
            >
              <span>More</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  isMoreOpen && "rotate-180 text-accent"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isMoreOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-56 animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <div className="rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-2 shadow-xl space-y-1">
                  <Link
                    href="/articles"
                    role="menuitem"
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                      pathname.startsWith("/articles")
                        ? "bg-surface-elevated text-accent font-semibold"
                        : "text-secondary hover:text-primary hover:bg-surface-muted"
                    )}
                  >
                    <div className="p-2 rounded-lg bg-surface-muted border border-border group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                        Read Articles
                      </span>
                      <span className="text-[10px] text-secondary-muted font-normal">
                        Technical articles & guides
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/resources"
                    role="menuitem"
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                      pathname.startsWith("/resources")
                        ? "bg-surface-elevated text-accent font-semibold"
                        : "text-secondary hover:text-primary hover:bg-surface-muted"
                    )}
                  >
                    <div className="p-2 rounded-lg bg-surface-muted border border-border group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                        Resources
                      </span>
                      <span className="text-[10px] text-secondary-muted font-normal">
                        Cheatsheets & study notes
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/study-abroad"
                    role="menuitem"
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                      pathname.startsWith("/study-abroad")
                        ? "bg-surface-elevated text-accent font-semibold"
                        : "text-secondary hover:text-primary hover:bg-surface-muted"
                    )}
                  >
                    <div className="p-2 rounded-lg bg-surface-muted border border-border group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                        Study Abroad
                      </span>
                      <span className="text-[10px] text-secondary-muted font-normal">
                        Scholarships & visa guides
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact Nav Link */}
          {mainNavLinks.slice(3).map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
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
            className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider font-semibold bg-accent-solid text-accent-text hover:bg-accent-solid-hover transition-colors shadow-glow"
          >
            Let&apos;s Connect
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
