import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Shakib's Projects`,
      description: project.description,
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
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  return (
    <article className="py-16 sm:py-24">
      <Container size="lg" className="space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.category}</Badge>
            {project.featured && <Badge variant="default">Featured Project</Badge>}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-secondary font-medium leading-relaxed">
            {project.tagline}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap gap-4 pt-2">
            {hasGithub && (
              <Button href={project.githubUrl} isExternal variant="primary" size="md">
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </Button>
            )}
            {hasLive && (
              <Button href={project.liveUrl} isExternal variant="secondary" size="md">
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Application</span>
              </Button>
            )}
          </div>
        </div>

        {/* Large Screenshot Banner */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border bg-surface-muted shadow-glow">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Project In-Depth Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Overview</h2>
              <p className="text-base text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Motivation */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-3">
              <h3 className="text-lg font-bold text-primary">
                The Problem & Use Case
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Architecture & Solution */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-3">
              <h3 className="text-lg font-bold text-primary">
                Engineering Solution
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Key Features & Highlights */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                Verified Implemented Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-surface-muted flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-primary leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Tech Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-surface space-y-6 sticky top-28">
              <h3 className="text-sm font-mono uppercase tracking-wider text-accent font-semibold">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="pt-6 border-t border-border space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-secondary-muted">Category:</span>
                  <span className="text-primary">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-muted">Repository:</span>
                  <span className="text-primary">
                    {hasGithub ? "Public on GitHub" : "Internal"}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button href="/contact" variant="outline" size="sm" className="w-full">
                  Discuss this Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
