import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

interface LatestPostsProps {
  posts: BlogPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const displayPosts = posts.slice(0, 2);

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-20 border-t border-border/60">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Writing & Insights"
            title="Latest Articles"
            description="Documenting real debugging encounters, frontend mental models, and software design insights."
            className="mb-0"
          />
          <Link
            href="/blog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline group"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
