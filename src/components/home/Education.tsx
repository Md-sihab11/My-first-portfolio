"use client";

import React from "react";
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface EducationProps {
  id?: string;
  className?: string;
  showHeader?: boolean;
}

const courseworkMap: Record<string, string[]> = {
  "diu-cse": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (OOP)",
    "Database Management Systems",
    "Software Engineering",
    "Operating Systems & Networks",
    "Discrete Mathematics",
  ],
  hsc: [
    "Higher Mathematics",
    "Physics",
    "Chemistry",
    "ICT & Computing",
  ],
};

export function Education({
  id = "education",
  className = "",
  showHeader = true,
}: EducationProps) {
  const educationList = siteConfig.education || [];
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});

  const toggleCoursework = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t border-border/60 py-20", className)}
    >
      <Container size="lg">
        {showHeader && (
          <SectionHeading
            eyebrow="Academic Background"
            title="Education & Qualifications"
            description="Formal academic degrees, foundational coursework, and continuous university studies shaping my engineering discipline."
          />
        )}

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-border/0 via-border/80 to-border/0 lg:left-1/2 lg:-translate-x-1/2"
          />

          <div className="space-y-10 lg:space-y-12">
            {educationList.map((item, index) => {
              const key = item.id || String(index);
              const isRight = index % 2 === 0;
              const isOngoing = item.period.toLowerCase().includes("present");
              const coursework = courseworkMap[item.id] || [];
              const isOpen = !collapsed[key];
              const panelId = `education-coursework-${key}`;

              return (
                <div key={key} className="relative lg:grid lg:grid-cols-2">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-accent shadow-[0_0_0_4px_rgb(var(--accent)/0.12)] lg:left-1/2 lg:top-7"
                  />

                  <div className="mb-3 pl-10 lg:hidden">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-wide text-accent">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "hidden lg:row-start-1 lg:flex",
                      isRight
                        ? "lg:col-start-1 lg:justify-end lg:pr-14"
                        : "lg:col-start-2 lg:justify-start lg:pl-14"
                    )}
                  >
                    <span className="pt-5 font-mono text-sm font-medium tracking-wide text-accent">
                      {item.period}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "pl-10 lg:pl-0",
                      isRight
                        ? "lg:col-start-2 lg:row-start-1 lg:pl-14"
                        : "lg:col-start-1 lg:row-start-1 lg:pr-14"
                    )}
                  >
                    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-glow transition-colors hover:border-accent/40">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 blur-3xl transition-colors duration-500 group-hover:bg-accent/10"
                      />

                      <div className="relative p-5 sm:p-6">
                        <div className="flex items-start gap-3.5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent-subtle/40 text-accent shadow-sm">
                            <GraduationCap className="h-5 w-5" />
                          </span>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold leading-snug tracking-tight text-primary transition-colors group-hover:text-accent sm:text-xl">
                              {item.degree}
                            </h3>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm">
                              <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                                <Building2 className="h-3.5 w-3.5 shrink-0" />
                                {item.institution}
                              </span>

                              {item.board && (
                                <span className="inline-flex items-center gap-1.5 text-secondary-muted">
                                  <BookOpen className="h-3.5 w-3.5 shrink-0 text-accent/70" />
                                  {item.board}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {isOngoing ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-subtle px-2.5 py-1 font-mono text-[10px] font-semibold text-accent">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                              Currently Enrolled
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[10px] font-medium text-secondary">
                              <CheckCircle2 className="h-3 w-3 text-accent" />
                              Graduated
                            </span>
                          )}

                          {item.gpa && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[10px] font-semibold text-primary">
                              <Award className="h-3 w-3 text-accent" />
                              {item.gpa}
                            </span>
                          )}
                        </div>

                        {item.description && (
                          <p className="mt-4 text-sm leading-relaxed text-secondary">
                            {item.description}
                          </p>
                        )}

                        {coursework.length > 0 && (
                          <div className="mt-5 border-t border-border/60 pt-4">
                            <button
                              type="button"
                              onClick={() => toggleCoursework(key)}
                              aria-expanded={isOpen}
                              aria-controls={panelId}
                              className="flex w-full items-center justify-between gap-3 rounded-md text-left font-mono text-[11px] uppercase tracking-wider text-secondary-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-accent" />
                                Key Coursework & Competencies
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 shrink-0 text-accent transition-transform duration-200",
                                  isOpen && "rotate-180"
                                )}
                              />
                            </button>

                            {isOpen && (
                              <div
                                id={panelId}
                                className="mt-3 flex flex-wrap gap-1.5"
                              >
                                {coursework.map((course) => (
                                  <span
                                    key={course}
                                    className="rounded-md border border-accent/20 bg-accent-subtle/30 px-2.5 py-1 text-[11px] font-medium text-accent"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {item.group && (
                          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3 font-mono text-[11px] text-secondary-muted">
                            <span>Major / Concentration:</span>
                            <span className="font-semibold text-accent">
                              {item.group}
                            </span>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
