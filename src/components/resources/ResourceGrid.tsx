"use client";

import React, { useState } from "react";
import { Resource } from "@/types/resource";
import { ResourceCard } from "./ResourceCard";
import { ResourceSearch } from "./ResourceSearch";
import { ResourceFilters } from "./ResourceFilters";
import { EmptyState } from "@/components/ui/EmptyState";

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(resources.map((r) => r.category))),
  ];

  const filtered = resources.filter((r) => {
    const matchesCat = category === "All" || r.category === category;
    const matchesQuery =
      query.trim() === "" ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <ResourceSearch value={query} onChange={setQuery} />
        <ResourceFilters
          categories={categories}
          selectedCategory={category}
          onSelectCategory={setCategory}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No resources found"
          description="Try adjusting your search keywords or filter category."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      )}
    </div>
  );
}
