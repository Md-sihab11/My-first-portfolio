import React from "react";
import {
  BellRing,
  CalendarClock,
  LayoutDashboard,
  Layers,
  MonitorSmartphone,
  Palette,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFeature } from "@/types/project";

const featureIcons: LucideIcon[] = [
  Layers,
  Search,
  LayoutDashboard,
  ShieldCheck,
  CalendarClock,
  MonitorSmartphone,
  Palette,
  BellRing,
];

interface ProjectFeaturesProps {
  features?: ProjectFeature[];
  fallback: string[];
}

export function ProjectFeatures({
  features,
  fallback,
}: ProjectFeaturesProps) {
  const items: ProjectFeature[] = features?.length
    ? features
    : fallback.map((highlight) => ({
        title: highlight,
        description: "",
      }));

  if (!items.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((feature, index) => {
        const Icon = featureIcons[index % featureIcons.length];
        const spansBoth =
          items.length % 2 === 1 && index === items.length - 1;

        return (
          <article
            key={`${feature.title}-${index}`}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-glow sm:p-6",
              spansBoth && "sm:col-span-2"
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/5 blur-2xl transition-colors duration-500 group-hover:bg-accent/10"
            />
            <div className="relative flex items-start justify-between gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent-subtle/60 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-[10px] font-medium tracking-wider text-secondary-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="relative mt-4 text-base font-semibold leading-snug text-primary">
              {feature.title}
            </h3>
            {feature.description && (
              <p className="relative mt-2 text-sm leading-relaxed text-secondary">
                {feature.description}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
