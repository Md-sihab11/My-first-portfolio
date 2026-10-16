import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Code2, Layers, Cpu, GitBranch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Skills } from "@/components/home/Skills";

export const metadata: Metadata = {
  title: `Skills & Technical Stack | ${siteConfig.fullName}`,
  description: `Explore the technical skills, frontend & backend frameworks, databases, and development tools mastered by ${siteConfig.fullName}.`,
};

export default function SkillsPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <Container size="lg">
        {/* Page Heading */}
        <SectionHeading
          eyebrow="Technical Stack"
          title="Skills & Technologies"
          description="Technologies actively used across my completed and ongoing projects. Honest capabilities and modern web engineering tools."
        />

        {/* Skills Component */}
        <div className="-mt-8">
          <Skills />
        </div>

        {/* Workflow & Engineering Approach */}
        <div className="mt-16 pt-16 border-t border-border/60 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Engineering Practices
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              How I Build & Deliver
            </h2>
            <p className="text-sm text-secondary leading-relaxed mt-2 max-w-2xl">
              Principles guiding my day-to-day coding, technical decision making, and system architecture:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-surface space-y-3 shadow-glow">
              <div className="p-3 rounded-xl bg-surface-elevated border border-border w-fit text-accent">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary">
                Modern Component Architecture
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Building scalable, reusable React and Next.js components with strict TypeScript types, atomic principles, and accessible Tailwind CSS design tokens.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface space-y-3 shadow-glow">
              <div className="p-3 rounded-xl bg-surface-elevated border border-border w-fit text-accent">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary">
                Full-Stack Data Flow & Auth
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Implementing secure session authentication, RESTful API endpoints, and efficient MongoDB schema design with clean indexing and validation.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface space-y-3 shadow-glow">
              <div className="p-3 rounded-xl bg-surface-elevated border border-border w-fit text-accent">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary">
                Git Flow & Continuous Deployment
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Strict version control workflows with meaningful commit hygiene, feature branching, and automated preview deployments via Vercel.
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-8 rounded-2xl border border-border bg-surface-muted/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-primary">
                See these skills applied in real projects
              </h3>
              <p className="text-xs text-secondary">
                Explore full-stack applications, interactive UI components, and GitHub repositories.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button href="/projects" variant="primary" size="md">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="md">
                <span>Get in Touch</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
