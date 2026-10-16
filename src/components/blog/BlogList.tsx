"use client";

import React, { useState } from "react";
import { BlogPost } from "@/types/blog";
import { BlogCard } from "./BlogCard";
import { BlogSearch } from "./BlogSearch";
import { EmptyState } from "@/components/ui/EmptyState";

interface BlogListProps {
  posts: BlogPost[];
  basePath?: string;
}

export function BlogList({ posts, basePath = "/articles" }: BlogListProps) {
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <BlogSearch query={query} onChange={setQuery} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="Try searching with different keywords."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} basePath={basePath} />
          ))}
        </div>
      )}
    </div>
  );
}
