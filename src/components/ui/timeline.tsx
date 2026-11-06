"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  badge?: string;
  meta?: React.ReactNode;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  eyebrow?: string;
  showHeader?: boolean;
  id?: string;
  className?: string;
}

export function Timeline({
  data,
  title = "Learning Milestones",
  description = "A compact walkthrough of the technologies, architectures, and breakthroughs shaping my engineering journey.",
  eyebrow = "Development Journey",
  showHeader = true,
  id = "milestones",
  className,
}: TimelineProps) {
  return (
    <section
      id={id}
      className={cn("w-full border-t border-border/60 py-16 sm:py-20", className)}
    >
      <Container size="lg">
        {showHeader && title && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="mb-8 md:mb-10"
          />
        )}

        <ol className="relative space-y-3 before:absolute before:bottom-4 before:left-[6px] before:top-4 before:w-px before:bg-border/80 sm:before:left-[7px]">
          {data.map((item, index) => (
            <li key={`${item.title}-${index}`} className="relative pl-7 sm:pl-9">
              <span
                className={cn(
                  "absolute left-0 top-4 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-surface shadow-sm",
                  index === 0
                    ? "border-accent/50"
                    : "border-border"
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    index === 0 ? "bg-accent" : "bg-secondary-muted"
                  )}
                />
              </span>

              <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                {item.badge && (
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-accent">
                    {item.badge}
                  </span>
                )}
                <span className="text-[11px] font-mono text-secondary-muted">
                  {item.title}
                </span>
                {item.meta}
              </div>

              {item.content}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
