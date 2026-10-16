import React from "react";
import { GraduationCap, Calendar, Building2, Award, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

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

export function Education({ id = "education", className = "", showHeader = true }: EducationProps) {
  const educationList = siteConfig.education || [];

  return (
    <section id={id} className={`py-20 border-t border-border/60 ${className}`}>
      <Container size="lg">
        {showHeader && (
          <SectionHeading
            eyebrow="Academic Background"
            title="Education & Qualifications"
            description="Formal academic degrees, foundational coursework, and continuous university studies shaping my engineering discipline."
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {educationList.map((item, index) => {
            const isOngoing = item.period.toLowerCase().includes("present");
            const coursework = courseworkMap[item.id] || [];

            return (
              <div
                key={item.id || index}
                className="relative group p-6 sm:p-8 rounded-2xl border border-border bg-surface hover:border-accent/50 transition-all duration-300 shadow-glow flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle decorative gradient flare */}
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/15 transition-all duration-500 pointer-events-none" />

                <div className="space-y-6">
                  {/* Top Row: Degree Icon & Status Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-3 rounded-xl bg-surface-elevated border border-border shadow-sm text-accent group-hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-end">
                      {isOngoing ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-subtle text-accent border border-accent/30 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Currently Enrolled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface-muted text-secondary border border-border">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                          Graduated
                        </span>
                      )}

                      {item.gpa && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-surface-elevated text-primary border border-border shadow-sm">
                          <Award className="w-3 h-3 text-accent" />
                          {item.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Degree Title & Institution */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                      {item.degree}
                    </h3>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-secondary-muted font-medium mt-2">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Building2 className="w-4 h-4 text-accent/80 shrink-0" />
                        <span>{item.institution}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-secondary-muted font-mono">
                        <Calendar className="w-3.5 h-3.5 text-accent/70 shrink-0" />
                        <span>{item.period}</span>
                      </div>

                      {item.board && (
                        <div className="flex items-center gap-1.5 text-secondary-muted font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-accent/70 shrink-0" />
                          <span>{item.board}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Narrative description */}
                  {item.description && (
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}

                  {/* Relevant Coursework / Focus Modules */}
                  {coursework.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-secondary-muted flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span>Key Coursework & Competencies</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface-muted/90 border border-border/80 text-secondary group-hover:border-accent/30 group-hover:text-primary transition-colors"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Meta: Department / Group */}
                {item.group && (
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-secondary-muted font-mono">
                    <span>Major / Concentration:</span>
                    <span className="text-accent font-semibold">{item.group}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
