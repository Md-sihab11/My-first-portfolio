import {
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import {
  skillCategories,
  type CategoryIconKey,
  type Skill,
  type SkillLevel,
} from "@/data/skills";
import { cn } from "@/lib/utils";

const categoryIcons: Record<CategoryIconKey, LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  graduation: GraduationCap,
};

const levelStyles: Record<SkillLevel, string> = {
  Advanced: "text-sky-600 dark:text-sky-300",
  Intermediate: "text-amber-600 dark:text-amber-300",
  Beginner: "text-rose-600 dark:text-rose-300",
};

function TechBadge({ skill }: { skill: Skill }) {
  return (
    <span
      title={skill.focus}
      className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-surface-elevated/40 px-2.5 py-1.5 text-sm font-medium text-primary/90 transition-colors hover:border-accent/35 hover:bg-surface-elevated/75"
    >
      <TechIcon
        name={skill.name}
        iconUrl={skill.iconUrl}
        icon={skill.icon}
        size="sm"
        variant="bare"
        invertOnDark={skill.invertOnDark}
        decorative
      />
      <span className="whitespace-nowrap">{skill.name}</span>
    </span>
  );
}

export function TechStackExplorer() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {skillCategories.map((category) => {
        const Icon = categoryIcons[category.icon];

        return (
          <article
            key={category.title}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-surface/95 via-surface/75 to-surface-muted/45 p-6 shadow-sm transition-colors duration-300 hover:border-accent/25"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_18%_0%,rgb(var(--accent)/0.07),transparent_62%)]" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-subtle/30 text-accent shadow-glow">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>

              <div className="min-w-0 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                  <h3 className="text-lg font-semibold tracking-tight text-primary">
                    {category.title}
                  </h3>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      levelStyles[category.level]
                    )}
                  >
                    ({category.level})
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <TechBadge key={skill.name} skill={skill} />
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
