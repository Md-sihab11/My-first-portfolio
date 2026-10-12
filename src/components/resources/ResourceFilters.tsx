"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ResourceFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function ResourceFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: ResourceFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isSelected
                ? "bg-accent text-accent-text border-accent font-semibold"
                : "bg-surface text-secondary hover:text-primary hover:bg-surface-elevated border-border"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
