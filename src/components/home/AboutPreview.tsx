
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Sparkles,
  Code2,
  GraduationCap,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { milestonesData } from "@/data/milestones";

export function AboutPreview() {
  const featuredMilestones = milestonesData.slice(0, 4);

  return (
    <section
      id="about"
      className="py-20 sm:py-24 border-t border-border/60"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left: Personal Introduction */}
          <div className="lg:col-span-5 space-y-6">

            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-accent bg-accent-subtle border border-accent/20">
              <Compass className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
                Driven by logic,
                <span className="block text-accent">
                  balanced by creativity.
                </span>
              </h2>

              <p className="text-sm font-mono text-secondary-muted">
                Computer Science Student & Developer
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4 text-sm sm:text-base text-secondary leading-relaxed">
              <p>
                Hi, I&apos;m{" "}
                <span className="font-semibold text-primary">
                  Md Sihab Sharar Mazumder
                </span>
                , a Computer Science student at Dhaka International
                University.
              </p>

              <p>
                My development journey began with C and C++ through
                competitive programming, followed by exploring backend
                development with Java and Spring Boot. Currently, I&apos;m
                focused on building modern web applications using React,
                Next.js, and TypeScript while expanding my full-stack
                development skills.
              </p>

              <p>
                Beyond coding, I enjoy creative writing, reading,
                improving my English, and playing cricket and football.
              </p>
            </div>

            {/* Focus Areas */}
            <div className="grid grid-cols-2 gap-3 pt-2">

              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface/60">
                <div className="p-2 rounded-lg bg-accent-subtle text-accent">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-primary">
                    Web Development
                  </p>
                  <p className="text-[11px] text-secondary-muted">
                    React & Next.js
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface/60">
                <div className="p-2 rounded-lg bg-accent-subtle text-accent">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-primary">
                    Problem Solving
                  </p>
                  <p className="text-[11px] text-secondary-muted">
                    C++ & DSA
                  </p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button href="/about" variant="primary" size="md">
                <span>Explore My Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-accent transition-colors"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Learning Milestones */}
          <div className="lg:col-span-7">

            <div className="relative p-6 sm:p-8 rounded-2xl border border-border bg-surface shadow-glow space-y-7">

              {/* Timeline Header */}
              <div className="flex items-start justify-between gap-4">

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-widest">
                      Growth & Progress
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    Learning Milestones
                  </h3>

                  <p className="text-xs sm:text-sm text-secondary">
                    A journey of continuous learning and development.
                  </p>
                </div>

                <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-accent-subtle text-accent border border-accent/20">
                  <Sparkles className="w-5 h-5" />
                </div>

              </div>

              {/* Timeline */}
              <div className="relative space-y-7">

                {/* Timeline Line */}
                <div className="absolute left-[5px] top-2 bottom-3 w-px bg-border" />

                {featuredMilestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="relative pl-8 group"
                  >
                    {/* Timeline Dot */}
                    <span
                      className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 ${
                        index === 0
                          ? "bg-accent border-accent shadow-[0_0_12px_var(--color-accent)]"
                          : "bg-surface border-accent group-hover:bg-accent"
                      }`}
                    />

                    <div className="space-y-2">

                      {/* Phase & Period */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                          {milestone.phase}
                        </span>

                        <span className="text-[11px] font-mono text-secondary-muted">
                          {milestone.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm sm:text-base font-semibold text-primary group-hover:text-accent transition-colors">
                        {milestone.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-2">
                        {milestone.description}
                      </p>

                    </div>
                  </div>
                ))}

                {featuredMilestones.length === 0 && (
                  <p className="text-sm text-secondary">
                    Learning milestones will appear here soon.
                  </p>
                )}

              </div>

              {/* Timeline Footer */}
              <div className="pt-5 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div className="flex items-center gap-2 text-secondary-muted">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-mono">
                    Always learning. Always building.
                  </span>
                </div>

                <Link
                  href="/about#milestones"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:gap-3 transition-all"
                >
                  Explore Full Timeline
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
