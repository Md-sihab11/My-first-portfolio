import React from "react";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Shakib's full-stack and frontend development projects with verified source code and live demos.",
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="py-16 sm:py-24">
      <Container size="lg">
        <SectionHeading
          eyebrow="Portfolio & Works"
          title="All Projects"
          description="Every project represents a completed application engineered from ground up, featuring genuine codebases, screenshots, and problem-solving architectures."
        />

        <ProjectGrid projects={allProjects} />
      </Container>
    </div>
  );
}
