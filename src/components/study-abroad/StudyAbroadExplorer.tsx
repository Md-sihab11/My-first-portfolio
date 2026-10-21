"use client";

import React, { useState } from "react";
import { BadgeCheck, ExternalLink, Search } from "lucide-react";
import {
  type StudyAbroadCategory,
  type StudyAbroadResource,
} from "@/data/study-abroad";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn, formatDate } from "@/lib/utils";

interface StudyAbroadExplorerProps {
  resources: StudyAbroadResource[];
  lastReviewed: string;
}

export function StudyAbroadExplorer({
  resources,
  lastReviewed,
}: StudyAbroadExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | StudyAbroadCategory>("All");

  const categories: Array<"All" | StudyAbroadCategory> = [
    "All",
    ...Array.from(new Set(resources.map((resource) => resource.category))),
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      category === "All" || resource.category === category;

    const matchesQuery =
      normalizedQuery === "" ||
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.region.toLowerCase().includes(normalizedQuery) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-xl">
          <label htmlFor="study-abroad-search" className="sr-only">
            Search study abroad resources
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-muted" />
            <input
              id="study-abroad-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search scholarships, tests, visas, countries..."
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-primary placeholder:text-secondary-muted focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <p
          className="text-xs font-mono text-secondary-muted"
          aria-live="polite"
        >
          Showing {filteredResources.length} of {resources.length} resources
          <span className="mx-2 text-border-highlight">/</span>
          Reviewed {formatDate(lastReviewed)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((item) => {
          const isSelected = category === item;

          return (
            <button
              key={item}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-lg border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isSelected
                  ? "border-accent-solid bg-accent-solid font-semibold text-accent-text"
                  : "border-border bg-surface text-secondary hover:bg-surface-elevated hover:text-primary"
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {filteredResources.length === 0 ? (
        <EmptyState
          title="No resources match your search"
          description="Try a different keyword or switch to another category."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <article
              key={resource.id}
              className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="accent">{resource.category}</Badge>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
                    <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                    Official
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-primary transition-colors group-hover:text-accent">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {resource.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {resource.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="py-0 text-[11px]"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="text-xs font-mono text-secondary-muted">
                  {resource.region}
                </span>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${resource.title} (opens in a new tab)`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-mono font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Visit
                  <ExternalLink className="h-3.5 w-3.5 text-accent" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
