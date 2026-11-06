import React from "react";
import { Lightbulb, TriangleAlert } from "lucide-react";
import type { ProjectChallenge } from "@/types/project";

interface ProjectChallengesProps {
  challenges: ProjectChallenge[];
}

export function ProjectChallenges({
  challenges,
}: ProjectChallengesProps) {
  return (
    <div className="space-y-4">
      {challenges.map((challenge, index) => (
        <article
          key={challenge.title}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="flex items-start gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
            <span className="mt-0.5 inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-accent/25 bg-accent-subtle px-1.5 font-mono text-[10px] font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold leading-snug text-primary">
              {challenge.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-b border-border/60 p-5 sm:border-b-0 sm:border-r sm:p-6">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-destructive">
                <TriangleAlert className="h-3.5 w-3.5" />
                The challenge
              </p>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {challenge.problem}
              </p>
            </div>

            <div className="bg-accent-subtle/20 p-5 sm:p-6">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                <Lightbulb className="h-3.5 w-3.5" />
                The solution
              </p>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {challenge.solution}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
