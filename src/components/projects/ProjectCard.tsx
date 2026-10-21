
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
  project: Project;
  featuredLayout?: boolean;
}

export function ProjectCard({
  project,
  featuredLayout = false,
}: ProjectCardProps) {
  const hasLive = Boolean(
    project.liveUrl && project.liveUrl.trim().length > 0
  );

  const hasGithub = Boolean(
    project.githubUrl && project.githubUrl.trim().length > 0
  );

  if (featuredLayout) {
    return (
      <article className="group relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-glow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Screenshot Container */}
          <div className="lg:col-span-7 relative bg-surface-muted/60 overflow-hidden min-h-[260px] sm:min-h-[340px] border-b lg:border-b-0 lg:border-r border-border flex items-center justify-center p-4 sm:p-5">
            <Link
              href={`/projects/${project.slug}`}
              className="block relative w-full h-full min-h-[220px] sm:min-h-[300px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent lg:hidden" />
            </Link>

            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant="default">Featured Project</Badge>
            </div>
          </div>

          {/* Details Container */}
          <div className="lg:col-span-5 p-6 sm:p-7 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent">
                  Case Study
                </span>

                <h3 className="mt-1 text-2xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-1 text-sm font-medium text-secondary">
                  {project.tagline}
                </p>
              </div>

              <p className="text-sm text-secondary leading-relaxed">
                {project.description}
              </p>

              {/* Problem / Impact */}
              <div className="p-3.5 rounded-xl bg-surface-muted border border-border/80">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
                  Problem & Impact
                </span>

                <p className="text-xs text-secondary-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="pt-2">
                <span className="text-xs font-mono text-secondary-muted block mb-2">
                  Technologies
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-3">
              <Button
                href={`/projects/${project.slug}`}
                variant="primary"
                size="sm"
              >
                Case Study
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              {/* View Code */}
              {hasGithub ? (
                <Button
                  href={project.githubUrl}
                  isExternal
                  variant="secondary"
                  size="sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  View Code
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  View Code
                </Button>
              )}

              {/* Live Demo */}
              {hasLive ? (
                <Button
                  href={project.liveUrl}
                  isExternal
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-glow">
      {/* Screenshot Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted/60 border-b border-border p-3">
        <Link
          href={`/projects/${project.slug}`}
          className="block relative w-full h-full rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-4 left-4 z-10">
          <Badge variant="accent">{project.category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
              <Link href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </h3>

            <p className="mt-0.5 text-xs text-secondary-muted font-medium">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs text-secondary leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[11px] py-0"
              >
                {tech}
              </Badge>
            ))}

            {project.technologies.length > 4 && (
              <Badge variant="muted" className="text-[11px] py-0">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Explore Case Study
            <ArrowRight className="w-3 h-3" />
          </Link>

          <div className="flex items-center gap-1.5">
            {/* View Code */}
            {hasGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                title="View Code"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-border bg-surface-elevated text-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span
                aria-label={`Source code unavailable for ${project.title}`}
                title="Source code not available"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-border bg-surface-muted text-secondary-muted opacity-50 cursor-not-allowed"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </span>
            )}

            {/* Live Demo */}
            {hasLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live demo for ${project.title}`}
                title="Live Demo"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-border bg-surface-elevated text-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span
                aria-label={`Live demo unavailable for ${project.title}`}
                title="Live demo not available yet"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-border bg-surface-muted text-secondary-muted opacity-50 cursor-not-allowed"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
