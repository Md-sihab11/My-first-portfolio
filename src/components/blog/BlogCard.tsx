import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 text-xs font-mono text-secondary-muted">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="mt-3 text-sm text-secondary leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-semibold text-accent group-hover:underline inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
