"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, FolderGit2, FileText, BookOpen, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { resources } from "@/data/resources";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const blogItems = [
    {
      title: "Debugging Common React Errors: Hydration, Loops, and Closures",
      description: "A practical guide to identifying and resolving frequent React runtime issues.",
      url: "/blog/debugging-react-error",
      type: "Blog",
    },
    {
      title: "5 JavaScript Mistakes Every Beginner Makes (And How to Avoid Them)",
      description: "Foundational JavaScript patterns, coercion pitfalls, and immutability rules.",
      url: "/blog/javascript-mistakes",
      type: "Blog",
    },
    {
      title: "A Systematic Approach to Solving Coding Problems",
      description: "How to deconstruct complex algorithmic challenges into approachable steps.",
      url: "/blog/solving-coding-problems",
      type: "Blog",
    },
    {
      title: "Understanding API Errors: HTTP Status Codes and Resilient Responses",
      description: "Deep dive into REST API error architectures and Next.js route handlers.",
      url: "/blog/understanding-api-errors",
      type: "Blog",
    },
  ];

  const q = query.trim().toLowerCase();

  const results = q
    ? [
        ...projects
          .filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.technologies.some((t) => t.toLowerCase().includes(q))
          )
          .map((p) => ({
            title: p.title,
            description: p.description,
            url: `/projects/${p.slug}`,
            type: "Project",
            tag: p.category,
          })),
        ...resources
          .filter(
            (r) =>
              r.title.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q) ||
              r.tags.some((t) => t.toLowerCase().includes(q))
          )
          .map((r) => ({
            title: r.title,
            description: r.description,
            url: r.fileUrl,
            type: "Resource",
            tag: r.category,
          })),
        ...blogItems
          .filter(
            (b) =>
              b.title.toLowerCase().includes(q) ||
              b.description.toLowerCase().includes(q)
          )
          .map((b) => ({
            title: b.title,
            description: b.description,
            url: b.url,
            type: "Blog",
            tag: "Article",
          })),
      ]
    : [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Project":
        return <FolderGit2 className="w-4 h-4 text-accent" />;
      case "Resource":
        return <FileText className="w-4 h-4 text-accent" />;
      case "Blog":
        return <BookOpen className="w-4 h-4 text-accent" />;
      default:
        return <Search className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <SectionHeading
          eyebrow="Quick Finder"
          title="Search Portfolio"
          description="Instant search across projects, technical study notes, cheatsheets, and engineering blog articles."
        />

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-muted" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search (e.g. Next.js, Bazar Dor, DSA, React, API)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-surface text-base text-primary placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50 shadow-glow"
          />
        </div>

        {query.trim() === "" ? (
          <div className="p-8 rounded-2xl border border-dashed border-border bg-surface/30 text-center space-y-3">
            <p className="text-sm text-secondary">
              Try searching for popular keywords:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Bazar Dor", "Next.js", "React", "MongoDB", "DSA", "JavaScript"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-border bg-surface text-secondary hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title="No matching records found"
            description={`We couldn't find anything matching "${query}". Try alternative terms.`}
          />
        ) : (
          <div className="space-y-3">
            <span className="text-xs font-mono text-secondary-muted block mb-2">
              Found {results.length} matching {results.length === 1 ? "item" : "items"}:
            </span>
            {results.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                className="group flex items-start justify-between p-5 rounded-xl border border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated transition-all"
              >
                <div className="space-y-1.5 pr-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="text-xs font-mono uppercase text-secondary-muted">
                      {item.type}
                    </span>
                    <Badge variant="outline" className="text-[11px] py-0">
                      {item.tag}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-secondary group-hover:text-accent group-hover:translate-x-1 transition-transform flex-shrink-0 mt-2" />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
