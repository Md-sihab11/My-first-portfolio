import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { ProjectBanner } from "@/components/projects/detail/ProjectBanner";
import { ProjectSection } from "@/components/projects/detail/ProjectSection";
import { ProjectSnapshot } from "@/components/projects/detail/ProjectSnapshot";
import { ProjectMotivation } from "@/components/projects/detail/ProjectMotivation";
import { ProjectFeatures } from "@/components/projects/detail/ProjectFeatures";
import { ProjectTechStack } from "@/components/projects/detail/ProjectTechStack";
import { ProjectChallenges } from "@/components/projects/detail/ProjectChallenges";
import { ProjectLearnings } from "@/components/projects/detail/ProjectLearnings";
import { ProjectGallery } from "@/components/projects/detail/ProjectGallery";
import { ProjectResources } from "@/components/projects/detail/ProjectResources";
import {
  ProjectSidebar,
  type SectionNavItem,
} from "@/components/projects/detail/ProjectSidebar";
import type { ProjectResource } from "@/types/project";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.description,
    openGraph: {
      title: `${project.title} | Shakib's Projects`,
      description: project.seoDescription ?? project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithub = Boolean(
    project.githubUrl && project.githubUrl.trim().length > 0
  );

  const resources: ProjectResource[] = project.resources?.length
    ? project.resources
    : [
        ...(hasLive
          ? [
              {
                label: "Live Demo",
                href: project.liveUrl as string,
                description: "Open the deployed application.",
                kind: "live" as const,
              },
            ]
          : []),
        ...(hasGithub
          ? [
              {
                label: "GitHub Repository",
                href: project.githubUrl as string,
                description: "Browse the project source code.",
                kind: "repository" as const,
              },
            ]
          : []),
      ];

  const technologyCount = project.techStack?.length
    ? project.techStack.reduce(
        (total, group) => total + group.items.length,
        0
      )
    : project.technologies.length;

  const hasFeatures = Boolean(
    project.features?.length || project.highlights.length
  );
  const hasTechStack = Boolean(
    project.techStack?.length || project.technologies.length
  );
  const hasChallenges = Boolean(project.challenges?.length);
  const hasLearnings = Boolean(project.learnings?.length);
  const hasScreenshots = Boolean(project.screenshots?.length);
  const hasResources = resources.length > 0;

  const rawSections: Array<{
    id: string;
    label: string;
    available: boolean;
  }> = [
    { id: "overview", label: "Project Overview", available: true },
    { id: "why", label: "Why I Built This", available: true },
    { id: "features", label: "Key Features", available: hasFeatures },
    { id: "technologies", label: "Technologies Used", available: hasTechStack },
    { id: "challenges", label: "Challenges & Solutions", available: hasChallenges },
    { id: "learnings", label: "What I Learned", available: hasLearnings },
    { id: "screenshots", label: "Project Screenshots", available: hasScreenshots },
    { id: "links", label: "Links & Resources", available: hasResources },
  ];

  const sections: SectionNavItem[] = rawSections
    .filter((section) => section.available)
    .map((section, index) => ({
      id: section.id,
      label: section.label,
      number: String(index + 1).padStart(2, "0"),
    }));

  const sectionNumber = (id: string) =>
    sections.find((section) => section.id === id)?.number ?? "01";

  return (
    <article className="pb-20 sm:pb-28">
      <Container size="lg">
        {/* Banner, title, and primary actions */}
        <div className="pt-10 sm:pt-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Projects</span>
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{project.category}</Badge>

              {project.developmentStatus && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-subtle/50 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                  {project.developmentStatus === "Live" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                  {project.developmentStatus}
                </span>
              )}

              {project.featured && (
                <Badge variant="outline">Featured Project</Badge>
              )}
            </div>

            <div className="mt-5 max-w-4xl space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-secondary sm:text-xl">
                {project.tagline}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {hasLive && (
                <Button
                  href={project.liveUrl}
                  isExternal
                  variant="primary"
                  size="md"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </Button>
              )}

              {hasGithub && (
                <Button
                  href={project.githubUrl}
                  isExternal
                  variant={hasLive ? "secondary" : "primary"}
                  size="md"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>View Source</span>
                </Button>
              )}
            </div>
          </header>

          <div className="mt-10 sm:mt-12">
            <ProjectBanner src={project.image} alt={project.imageAlt} />
          </div>
        </div>

        {/* Case study body */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 space-y-12 lg:col-span-8">
            <ProjectSection
              id="overview"
              number={sectionNumber("overview")}
              eyebrow="The build"
              title="Project Overview"
              description="What the project is, who it serves, and where it stands today."
              showDivider={false}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/70 via-accent/20 to-transparent"
                />
                <p className="text-base leading-relaxed text-secondary sm:text-lg sm:leading-relaxed">
                  {project.description}
                </p>
              </div>

              <ProjectSnapshot
                category={project.category}
                developmentStatus={project.developmentStatus}
                technologyCount={technologyCount}
                resourceCount={resources.length}
              />
            </ProjectSection>

            <ProjectSection
              id="why"
              number={sectionNumber("why")}
              eyebrow="The motivation"
              title="Why I Built This"
              description="The problem that sparked the build and the approach I took to solve it."
            >
              <ProjectMotivation
                problem={project.problem}
                solution={project.solution}
              />
            </ProjectSection>

            {hasFeatures && (
              <ProjectSection
                id="features"
                number={sectionNumber("features")}
                eyebrow="What it does"
                title="Key Features"
                description="The core capabilities that shape the product experience."
              >
                <ProjectFeatures
                  features={project.features}
                  fallback={project.highlights}
                />
              </ProjectSection>
            )}

            {hasTechStack && (
              <ProjectSection
                id="technologies"
                number={sectionNumber("technologies")}
                eyebrow="The stack"
                title="Technologies Used"
                description="The technologies behind the project, grouped by the layer they serve."
              >
                <ProjectTechStack
                  groups={project.techStack}
                  fallback={project.technologies}
                />
              </ProjectSection>
            )}

            {hasChallenges && (
              <ProjectSection
                id="challenges"
                number={sectionNumber("challenges")}
                eyebrow="The hard parts"
                title="Challenges & Solutions"
                description="Real implementation problems and the decisions that resolved them."
              >
                <ProjectChallenges challenges={project.challenges ?? []} />
              </ProjectSection>
            )}

            {hasLearnings && (
              <ProjectSection
                id="learnings"
                number={sectionNumber("learnings")}
                eyebrow="The takeaways"
                title="What I Learned"
                description="Technical lessons and habits carried forward from this build."
              >
                <ProjectLearnings learnings={project.learnings ?? []} />
              </ProjectSection>
            )}

            {hasScreenshots && (
              <ProjectSection
                id="screenshots"
                number={sectionNumber("screenshots")}
                eyebrow="The interface"
                title="Project Screenshots"
                description="A closer look at the interface across key screens."
              >
                <ProjectGallery images={project.screenshots ?? []} />
              </ProjectSection>
            )}

            {hasResources && (
              <ProjectSection
                id="links"
                number={sectionNumber("links")}
                eyebrow="Explore"
                title="Links & Resources"
                description="The live product, source code, and related resources."
              >
                <ProjectResources resources={resources} />
              </ProjectSection>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-medium text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to all projects
              </Link>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary-muted">
                End of case study
              </span>
            </div>
          </div>

          <div className="lg:col-span-4">
            <ProjectSidebar sections={sections} />
          </div>
        </div>
      </Container>
    </article>
  );
}
