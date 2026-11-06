"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionNavItem {
  id: string;
  label: string;
  number: string;
}

interface ProjectSidebarProps {
  sections: SectionNavItem[];
}

export function ProjectSidebar({ sections }: ProjectSidebarProps) {
  const [active, setActive] = React.useState(sections[0]?.id ?? "");

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      const offset = 160;
      let current = sections[0]?.id ?? "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= offset) {
          current = section.id;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4">
        <nav
          aria-label="On this page"
          className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
        >
          <p className="px-2 pb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-secondary-muted">
            On this page
          </p>
          <div className="space-y-0.5">
            {sections.map((section) => {
              const isActive = active === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActive(section.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-2 py-2 text-xs transition-colors",
                    isActive
                      ? "bg-accent-subtle/70 text-accent"
                      : "text-secondary hover:bg-surface-muted hover:text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[9px] tabular-nums",
                      isActive ? "text-accent" : "text-secondary-muted"
                    )}
                  >
                    {section.number}
                  </span>
                  <span className="font-medium leading-snug">
                    {section.label}
                  </span>
                  <span
                    className={cn(
                      "ml-auto h-1 w-1 rounded-full transition-colors",
                      isActive ? "bg-accent" : "bg-transparent"
                    )}
                  />
                </a>
              );
            })}
          </div>
        </nav>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="px-2 pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-secondary-muted">
            Keep exploring
          </p>
          <Link
            href="/projects"
            className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-xs font-medium text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
          >
            All projects
            <ArrowUpRight className="h-3.5 w-3.5 text-secondary-muted transition-colors group-hover:text-accent" />
          </Link>
          <Link
            href="/contact"
            className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-xs font-medium text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
          >
            Discuss a project
            <ArrowUpRight className="h-3.5 w-3.5 text-secondary-muted transition-colors group-hover:text-accent" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
