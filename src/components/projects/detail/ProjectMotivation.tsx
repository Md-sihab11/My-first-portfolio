import React from "react";
import { Lightbulb, Target } from "lucide-react";

interface ProjectMotivationProps {
  problem: string;
  solution: string;
}

export function ProjectMotivation({
  problem,
  solution,
}: ProjectMotivationProps) {
  return (
    <div className="space-y-4">
      <article className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-destructive/50"
        />
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10 text-destructive">
            <Target className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary-muted">
              The motivation
            </p>
            <h3 className="text-base font-semibold text-primary">
              The problem I wanted to solve
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
          {problem}
        </p>
      </article>

      <article className="relative overflow-hidden rounded-2xl border border-accent/20 bg-accent-subtle/20 p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-accent"
        />
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/25 bg-accent-subtle text-accent">
            <Lightbulb className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary-muted">
              The approach
            </p>
            <h3 className="text-base font-semibold text-primary">
              How I shaped the solution
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
          {solution}
        </p>
      </article>
    </div>
  );
}
