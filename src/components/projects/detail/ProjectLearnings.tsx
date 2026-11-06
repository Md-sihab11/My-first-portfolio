import React from "react";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectLearning } from "@/types/project";

interface ProjectLearningsProps {
  learnings: ProjectLearning[];
}

export function ProjectLearnings({ learnings }: ProjectLearningsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {learnings.map((learning, index) => {
        const spansBoth =
          learnings.length % 2 === 1 && index === learnings.length - 1;

        return (
          <article
            key={learning.title}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/40 sm:p-6",
              spansBoth && "sm:col-span-2"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent-subtle/60 text-accent">
                <GraduationCap className="h-4 w-4" />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-secondary-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold leading-snug text-primary">
              {learning.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {learning.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
