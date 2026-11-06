import React from "react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

interface ProjectSectionProps {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  showDivider?: boolean;
}

export function ProjectSection({
  id,
  number,
  title,
  eyebrow,
  description,
  children,
  className,
  showDivider = true,
}: ProjectSectionProps) {
  return (
    <SectionReveal>
      <section
        id={id}
        className={cn(
          "scroll-mt-28 pt-10 sm:pt-12",
          showDivider && "border-t border-border/60",
          className
        )}
      >
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-accent/25 bg-accent-subtle px-1.5 font-mono text-[10px] font-semibold tracking-wider text-accent">
              {number}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary-muted">
              {eyebrow}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary sm:text-base">
              {description}
            </p>
          )}
        </header>
        {children}
      </section>
    </SectionReveal>
  );
}
