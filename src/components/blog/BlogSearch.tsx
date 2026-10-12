"use client";

import React from "react";
import { Search } from "lucide-react";

interface BlogSearchProps {
  query: string;
  onChange: (val: string) => void;
}

export function BlogSearch({ query, onChange }: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-muted" />
      <input
        type="text"
        placeholder="Search articles by title, topic, or tag..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-sm text-primary placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50"
      />
    </div>
  );
}
