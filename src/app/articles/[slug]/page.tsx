import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} | Technical Articles`,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const allPosts = getAllBlogPosts();

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-24">
      <Container size="lg">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-3xl space-y-6 pb-12 border-b border-border">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-secondary leading-relaxed">
            {post.summary}
          </p>

          <div className="flex items-center gap-6 text-xs font-mono text-secondary-muted pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          {/* Main Article Body */}
          <div className="lg:col-span-8 prose prose-invert max-w-none text-secondary leading-relaxed space-y-6">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("# ")) {
                return null;
              }
              if (block.startsWith("## ")) {
                const headingText = block.replace("## ", "").trim();
                const id = headingText
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <h2
                    key={i}
                    id={id}
                    className="text-2xl sm:text-3xl font-bold text-primary mt-10 mb-4 pt-4 border-t border-border/50"
                  >
                    {headingText}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                const headingText = block.replace("### ", "").trim();
                const id = headingText
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <h3
                    key={i}
                    id={id}
                    className="text-xl font-bold text-primary mt-6 mb-2"
                  >
                    {headingText}
                  </h3>
                );
              }
              if (block.startsWith("```")) {
                const lines = block.split("\n");
                const lang = lines[0].replace("```", "").trim() || "code";
                const codeBody = lines.slice(1, -1).join("\n");
                return (
                  <div
                    key={i}
                    className="my-6 rounded-xl border border-border bg-surface-muted overflow-hidden font-mono text-xs sm:text-sm text-primary"
                  >
                    <div className="px-4 py-2 border-b border-border bg-surface text-secondary-muted flex justify-between">
                      <span>{lang}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code>{codeBody}</code>
                    </pre>
                  </div>
                );
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc list-inside space-y-1.5 my-4 text-sm sm:text-base">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-secondary">
                        {item.replace(/^- /, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-sm sm:text-base text-secondary leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Sticky Table of Contents */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <RelatedPosts currentSlug={post.slug} posts={allPosts} />
      </Container>
    </article>
  );
}
