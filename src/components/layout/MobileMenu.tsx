"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-border bg-surface text-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {isOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-[73px] bottom-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border flex flex-col justify-between p-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-colors border",
                    isActive
                      ? "bg-surface-elevated text-accent border-accent/30 font-semibold"
                      : "text-secondary hover:text-primary hover:bg-surface border-transparent"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-xs font-mono uppercase bg-accent-subtle text-accent px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              href="/search"
              onClick={close}
              className="flex items-center justify-between p-4 rounded-xl text-lg font-medium text-secondary hover:text-primary hover:bg-surface border border-transparent"
            >
              <span>Search Site</span>
            </Link>
          </nav>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <a
              href={siteConfig.links.email}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-accent text-accent-text font-semibold shadow-glow text-sm"
              onClick={close}
            >
              <span>Contact Directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-center text-secondary-muted font-mono">
              {siteConfig.wordmark} • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
