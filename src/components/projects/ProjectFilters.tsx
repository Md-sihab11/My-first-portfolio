"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ProjectFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isSelected
                ? "bg-accent-solid text-accent-text border-accent-solid font-semibold shadow-glow"
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
