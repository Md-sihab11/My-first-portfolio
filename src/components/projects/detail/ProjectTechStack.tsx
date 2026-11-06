import React from "react";
import {
  Boxes,
  Braces,
  Database,
  Layers,
  Monitor,
  Server,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectTechGroup } from "@/types/project";

const groupIcons: Record<string, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  authentication: ShieldCheck,
  "state management": Layers,
  "ui & tooling": Wrench,
  data: Braces,
  platform: Boxes,
};

interface ProjectTechStackProps {
  groups?: ProjectTechGroup[];
  fallback: string[];
}

export function ProjectTechStack({
  groups,
  fallback,
}: ProjectTechStackProps) {
  const items: ProjectTechGroup[] = groups?.length
    ? groups
    : [{ label: "Technologies", items: fallback }];

  if (!items.length) return null;

  const total = items.reduce((count, group) => count + group.items.length, 0);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-muted">
        <Boxes className="h-3.5 w-3.5 text-accent" />
        <span>
          {items.length} {items.length === 1 ? "group" : "groups"} · {total}{" "}
          {total === 1 ? "technology" : "technologies"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((group, index) => {
          const Icon = groupIcons[group.label.toLowerCase()] ?? Layers;
          const spansBoth =
            items.length % 2 === 1 && index === items.length - 1;

          return (
            <article
              key={group.label}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl border border-border bg-surface",
                spansBoth && "sm:col-span-2"
              )}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent-subtle/60 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-primary">
                    {group.label}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-secondary-muted">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 p-5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:border-accent/30 hover:text-accent"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent/70" />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
