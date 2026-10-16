import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Articles & Engineering Notes",
  description:
    "Technical articles, problem-solving breakdowns, React guides, and software engineering deep-dives authored by Md Sihab Sharar.",
};

export default function ArticlesPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-16 sm:py-24 space-y-12">
      <Container size="lg">
        {/* Banner linking to Resources */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-gradient-to-r from-surface via-surface-muted to-surface mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-accent flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Developer Kit
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-primary">
              Looking for DSA cheatsheets & architecture notes?
            </h2>
            <p className="text-xs sm:text-sm text-secondary">
              Check out my downloadable learning guides and reference sheets.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold uppercase tracking-wider text-primary hover:text-accent hover:border-accent/40 transition-colors shrink-0"
          >
            <Compass className="w-4 h-4 text-accent" />
            <span>Explore Resources</span>
          </Link>
        </div>

        <SectionHeading
          eyebrow="Knowledge & Insights"
          title="Technical Articles"
          description="Reflections on web development, debugging tricky React errors, JavaScript pitfalls, and clean engineering architecture."
        />

        <BlogList posts={posts} basePath="/articles" />
      </Container>
    </div>
  );
}
