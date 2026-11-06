import React from "react";
import { CircleCheck, FolderKanban, Layers, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectSnapshotProps {
  category: string;
  developmentStatus?: string;
  technologyCount: number;
  resourceCount: number;
}

export function ProjectSnapshot({
  category,
  developmentStatus,
  technologyCount,
  resourceCount,
}: ProjectSnapshotProps) {
  const stats = [
    {
      label: "Project type",
      value: category,
      icon: FolderKanban,
      accent: false,
    },
    {
      label: "Status",
      value: developmentStatus ?? "Not specified",
      icon: CircleCheck,
      accent: true,
    },
    {
      label: "Stack",
      value: `${technologyCount} technologies`,
      icon: Layers,
      accent: false,
    },
    {
      label: "Resources",
      value: `${resourceCount} ${resourceCount === 1 ? "link" : "links"}`,
      icon: Link2,
      accent: false,
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={cn(
              "rounded-xl border border-border bg-surface p-4",
              stat.accent && "border-accent/25 bg-accent-subtle/30"
            )}
          >
            <div className="flex items-center gap-2 text-secondary-muted">
              <Icon
                className={cn(
                  "h-3.5 w-3.5",
                  stat.accent ? "text-accent" : "text-secondary-muted"
                )}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                {stat.label}
              </span>
            </div>
            <p
              className={cn(
                "mt-2 text-sm font-semibold leading-snug text-primary",
                stat.accent && "flex items-center gap-1.5 text-accent"
              )}
            >
              {stat.accent && stat.value === "Live" && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse" />
              )}
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
