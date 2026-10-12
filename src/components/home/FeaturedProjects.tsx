import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function FeaturedProjects() {
  const primaryFeatured = projects.find((p) => p.slug === "bazar-dor") || projects[0];
  const secondaryProjects = projects.filter((p) => p.slug !== primaryFeatured.slug).slice(0, 2);

  return (
    <section className="py-20 border-t border-border/60">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Selected Works"
            title="Featured Projects"
            description="Real web applications engineered from scratch. Every project tackles actual requirements with verified implementations."
            className="mb-0"
          />
          <Link
            href="/projects"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Primary Case Study */}
        <div className="mb-12">
          <ProjectCard project={primaryFeatured} featuredLayout />
        </div>

        {/* Secondary Featured Row */}
        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
