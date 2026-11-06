import { projects } from "@/data/projects";
import { allSkills, type SkillIconKey } from "@/data/skills";

const aliases: Record<string, string> = {
  "next.js 16": "Next.js",
  "react 19": "React",
  "tailwind css v4": "Tailwind CSS",
  mongodb: "MongoDB Atlas",
};

const fallbackIcons: Record<string, SkillIconKey> = {
  vite: "layers",
  daisyui: "component",
  "context api": "layers",
  "lucide react": "sparkles",
};

const skillsByName = new Map(
  allSkills.map((skill) => [skill.name.toLowerCase(), skill])
);

export interface TechUsage {
  name: string;
  count: number;
  projectSlugs: string[];
  projectTitles: string[];
  iconUrl?: string;
  icon?: SkillIconKey;
}

function normalizeTech(name: string) {
  return aliases[name.toLowerCase()] ?? name;
}

const usage = new Map<
  string,
  { count: number; projectSlugs: string[]; projectTitles: string[] }
>();

for (const project of projects) {
  for (const rawTech of project.technologies) {
    const name = normalizeTech(rawTech);
    const current = usage.get(name) ?? {
      count: 0,
      projectSlugs: [],
      projectTitles: [],
    };

    current.count += 1;
    current.projectSlugs.push(project.slug);
    current.projectTitles.push(project.title);
    usage.set(name, current);
  }
}

export const techUsage: TechUsage[] = Array.from(usage.entries())
  .map(([name, stats]) => {
    const skill = skillsByName.get(name.toLowerCase());

    return {
      name,
      count: stats.count,
      projectSlugs: stats.projectSlugs,
      projectTitles: stats.projectTitles,
      iconUrl: skill?.iconUrl,
      icon: skill?.icon ?? fallbackIcons[name.toLowerCase()] ?? "layers",
    };
  })
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

export const topTechUsage = techUsage.slice(0, 6);
