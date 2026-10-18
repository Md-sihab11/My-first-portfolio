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
        aria-label={
          isOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isOpen}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-border bg-surface text-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-accent" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[65px] z-[100] flex flex-col justify-between overflow-y-auto bg-background p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2.5 pt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-4 text-base font-medium transition-colors",
                    isActive
                      ? "bg-surface-elevated text-accent border-accent/40 font-semibold"
                      : "bg-surface text-secondary border-border hover:text-primary"
                  )}
                >
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="rounded-full bg-accent-subtle px-2 py-0.5 text-xs font-mono uppercase text-accent">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/search"
              onClick={close}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-surface p-4 text-base font-medium text-secondary transition-colors hover:text-primary"
            >
              <span>Search Site</span>
            </Link>
          </nav>

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 pb-4">
            <a
              href={siteConfig.links.email}
              onClick={close}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-accent-text shadow-glow"
            >
              <span>Contact Directly</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <p className="text-center font-mono text-xs text-secondary-muted pt-2">
              {siteConfig.wordmark} • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}