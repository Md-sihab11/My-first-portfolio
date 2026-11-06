import { Container } from "@/components/ui/Container";
import { TechStackExplorer } from "@/components/home/TechStackExplorer";
import { cn } from "@/lib/utils";

interface SkillsProps {
  id?: string;
  className?: string;
  showHeader?: boolean;
}

export function Skills({
  id = "skills",
  className,
  showHeader = true,
}: SkillsProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 overflow-hidden border-t border-border/60 py-16 sm:py-20",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-accent/5 blur-[100px]"
      />

      <Container size="lg" className="relative">
        {showHeader && (
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Skills & Tech Stack
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-accent" />
            <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
              From frontend frameworks to backend systems, databases, DevOps,
              and the fundamentals behind the work — this is the stack I use
              to ship real projects.
            </p>
          </div>
        )}

        <TechStackExplorer />
      </Container>
    </section>
  );
}
