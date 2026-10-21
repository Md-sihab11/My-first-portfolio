import React from "react";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Skills } from "@/components/home/Skills";
import { Education } from "@/components/home/Education";
import { LatestPosts } from "@/components/home/LatestPosts";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getAllBlogPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllBlogPosts();

  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <Education />
      <FeaturedProjects />
      <Skills />
      <LatestPosts posts={posts} />
      <ContactCTA />
    </div>
  );
}
