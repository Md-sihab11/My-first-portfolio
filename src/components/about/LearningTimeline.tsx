"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { milestonesData, type Milestone } from "@/data/milestones";
import { projects } from "@/data/projects";

interface LearningTimelineProps {
  id?: string;
  className?: string;
  showHeader?: boolean;
}

const phaseIcons: Record<string, React.ReactNode> = {
  "mern-nextjs": <Layers className="h-4 w-4" />,
  "java-spring": <Cpu className="h-4 w-4" />,
  "cpp-algorithms": <Terminal className="h-4 w-4" />,
  "future-systems": <Code2 className="h-4 w-4" />,
};

function StatusBadge({ status }: { status: Milestone["status"] }) {
  if (status === "active") {
    return (
      <Badge variant="accent" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Active pursuit
      </Badge>
    );
  }

  if (status === "completed") {
    return (
      <Badge variant="secondary">
        <CheckCircle2 className="text-accent" />
        Completed
      </Badge>
    );
  }

  return (
    <Badge variant="muted">
      <Sparkles className="text-accent" />
      Upcoming
    </Badge>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const icon = phaseIcons[milestone.id] ?? <Code2 className="h-4 w-4" />;

  const linkedProjects = milestone.projectSlugs
    ? projects.filter((project) =>
        milestone.projectSlugs?.includes(project.slug)
      )
    : [];

  return (
    <Collapsible
      defaultOpen={milestone.status === "active"}
      className="group"
    >
      <Card className="border-border/80 bg-surface/70 transition-colors hover:border-accent/30">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent shadow-sm sm:flex">
              {icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-snug text-primary sm:text-lg">
                {milestone.title}
              </h3>
              <p className="mt-0.5 text-[11px] font-medium text-accent/90 sm:text-xs">
                {milestone.subtitle}
              </p>

              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-secondary sm:text-sm">
                {milestone.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {milestone.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-2 py-0 text-[10px] leading-5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-secondary-muted">
                  {milestone.metrics?.map((metric) => (
                    <span key={metric.label}>
                      {metric.label}:{" "}
                      <span className="text-primary">{metric.value}</span>
                    </span>
                  ))}
                </div>

                <CollapsibleTrigger className="inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  Highlights
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[open]:rotate-180" />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="mt-3 space-y-3 border-t border-border/60 pt-3">
                  <ul className="space-y-1.5">
                    {milestone.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-[11px] leading-relaxed text-secondary sm:text-xs"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {linkedProjects.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-secondary-muted">
                        Built here
                      </span>
                      {linkedProjects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-medium text-primary transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          {project.title}
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </div>
        </CardContent>
      </Card>
    </Collapsible>
  );
}

export function LearningTimeline({
  id = "milestones",
  className,
  showHeader = true,
}: LearningTimelineProps) {
  const timelineData: TimelineEntry[] = milestonesData.map((item) => ({
    title: item.period,
    badge: item.phase,
    meta: <StatusBadge status={item.status} />,
    content: <MilestoneCard milestone={item} />,
  }));

  return (
    <Timeline
      id={id}
      data={timelineData}
      title="Learning Milestones & Evolution"
      eyebrow="Chronological Roadmap"
      description="From C/C++ algorithms and Java backends to modern MERN & Next.js systems — a compact view of how the stack evolved."
      showHeader={showHeader}
      className={className}
    />
  );
}
