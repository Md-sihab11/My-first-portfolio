import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

interface RelatedPostsProps {
  currentSlug: string;
  posts: BlogPost[];
}

export function RelatedPosts({ currentSlug, posts }: RelatedPostsProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <h3 className="text-xl font-bold text-primary mb-6">More Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-5 rounded-xl border border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated transition-all"
          >
            <span className="text-xs font-mono text-secondary-muted">
              {formatDate(post.publishedAt)}
            </span>
            <h4 className="mt-2 text-base font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
              {post.title}
            </h4>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">
              <span>Read article</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
