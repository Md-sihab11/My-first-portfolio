import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-mono uppercase tracking-widest text-accent bg-accent-subtle border border-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
