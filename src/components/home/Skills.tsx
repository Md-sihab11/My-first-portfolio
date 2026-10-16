import React from "react";
import Image from "next/image";
import { CheckCircle2, Code2, Database, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function Skills() {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-5 h-5 text-accent" />;
      case 1:
        return <Database className="w-5 h-5 text-accent" />;
      case 2:
        return <Wrench className="w-5 h-5 text-accent" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-border/60">
      <Container size="lg">
        <SectionHeading
          eyebrow="Capabilities & Tools"
          title="Skills & Technologies"
          description="Technologies actively used across my completed and ongoing projects. Honest capabilities without arbitrary progress bars."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="p-6 sm:p-7 rounded-2xl border border-border bg-surface flex flex-col justify-between hover:border-accent/40 transition-all duration-300 shadow-glow"
            >
              <div>
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-surface-elevated border border-border shadow-sm">
                    {getCategoryIcon(idx)}
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-secondary leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Graphical Grid / Badge Layout with Real Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative flex items-center gap-3 p-3 rounded-xl bg-surface-muted/80 border border-border/80 hover:border-accent/50 hover:bg-surface transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Real Tech Icon */}
                      <div className="relative w-6 h-6 shrink-0">
                        <Image
                          src={skill.iconUrl}
                          alt={skill.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Skill Name & Focus */}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-primary truncate">
                          {skill.name}
                        </div>
                        {skill.focus && (
                          <div className="text-[10px] text-secondary-muted font-mono truncate mt-0.5">
                            {skill.focus}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}