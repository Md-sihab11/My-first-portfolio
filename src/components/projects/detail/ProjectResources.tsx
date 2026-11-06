import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  Link2,
  PenTool,
  Server,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type {
  ProjectResource,
  ProjectResourceKind,
} from "@/types/project";

const resourceIcons: Record<ProjectResourceKind, LucideIcon | typeof GithubIcon> = {
  live: ExternalLink,
  repository: GithubIcon,
  api: Server,
  documentation: BookOpen,
  design: PenTool,
  other: Link2,
};

interface ProjectResourcesProps {
  resources: ProjectResource[];
}

export function ProjectResources({ resources }: ProjectResourcesProps) {
  if (!resources.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {resources.map((resource, index) => {
        const kind = resource.kind ?? "other";
        const Icon = resourceIcons[kind];
        const isLive = kind === "live";
        const spansBoth =
          resources.length % 2 === 1 && index === resources.length - 1;

        return (
          <a
            key={`${resource.label}-${resource.href}`}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex flex-col rounded-2xl border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow sm:p-6",
              isLive ? "border-accent/30" : "border-border",
              spansBoth && "sm:col-span-2"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border",
                  isLive
                    ? "border-accent/25 bg-accent-subtle text-accent"
                    : "border-border bg-surface-muted text-secondary"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-secondary-muted transition-colors group-hover:text-accent" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-primary">
              {resource.label}
            </h3>
            {resource.description && (
              <p className="mt-1.5 text-xs leading-relaxed text-secondary">
                {resource.description}
              </p>
            )}
            <span className="mt-3 truncate font-mono text-[10px] text-secondary-muted">
              {resource.href.replace(/^https?:\/\//, "")}
            </span>
          </a>
        );
      })}
    </div>
  );
}
