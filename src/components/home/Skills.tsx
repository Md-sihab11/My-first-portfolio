import React from "react";
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
    <section className="py-20 border-t border-border/60">
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
              className="p-6 sm:p-7 rounded-2xl border border-border bg-surface flex flex-col justify-between hover:border-accent/40 transition-colors"
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-surface-elevated border border-border mb-5">
                  {getCategoryIcon(idx)}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {category.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed mb-6">
                  {category.description}
                </p>

                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-surface-muted border border-border/60 hover:border-accent/30 transition-colors"
                    >
                      <div className="text-xs font-semibold text-primary">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-secondary-muted font-mono mt-0.5">
                        {skill.focus}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
