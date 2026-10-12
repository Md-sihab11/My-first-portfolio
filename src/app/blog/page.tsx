import React from "react";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog & Technical Articles",
  description: "Articles, technical notes, and debugging deep-dives written by Shakib.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-16 sm:py-24">
      <Container size="lg">
        <SectionHeading
          eyebrow="Articles & Thoughts"
          title="Engineering Blog"
          description="Reflections on web development, debugging tricky React errors, JavaScript pitfalls, and API architecture."
        />

        <BlogList posts={posts} />
      </Container>
    </div>
  );
}
