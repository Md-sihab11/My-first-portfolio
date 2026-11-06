export type SkillIconKey =
  | "code"
  | "server"
  | "database"
  | "shield"
  | "binary"
  | "layers"
  | "sparkles"
  | "wrench"
  | "component";

export type CategoryIconKey =
  | "code"
  | "server"
  | "database"
  | "cloud"
  | "wrench"
  | "graduation";

export type SkillLevel = "Advanced" | "Intermediate" | "Beginner";

export interface Skill {
  name: string;
  focus: string;
  iconUrl?: string;
  icon?: SkillIconKey;
  /** Invert dark, monochrome brand marks (Next.js, Express, GitHub, Vercel). */
  invertOnDark?: boolean;
}

export interface SkillCategory {
  title: string;
  shortTitle: string;
  description: string;
  level: SkillLevel;
  icon: CategoryIconKey;
  skills: Skill[];
}

const devicon = (path: string) =>
  `https://raw.githubusercontent.com/devicons/devicon/master/icons/${path}`;

const simpleIcon = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    shortTitle: "Frontend",
    description: "Composable interfaces, state, and responsive design systems.",
    level: "Advanced",
    icon: "code",
    skills: [
      {
        name: "React",
        focus: "Component architecture, hooks & state",
        iconUrl: devicon("react/react-original.svg"),
      },
      {
        name: "Next.js",
        focus: "App Router, server components & APIs",
        iconUrl: devicon("nextjs/nextjs-original.svg"),
        invertOnDark: true,
      },
      {
        name: "TypeScript",
        focus: "Type safety & maintainable interfaces",
        iconUrl: devicon("typescript/typescript-original.svg"),
      },
      {
        name: "JavaScript",
        focus: "Async patterns & DOM fundamentals",
        iconUrl: devicon("javascript/javascript-original.svg"),
      },
      {
        name: "Tailwind CSS",
        focus: "Design tokens & responsive systems",
        iconUrl: devicon("tailwindcss/tailwindcss-original.svg"),
      },
      {
        name: "HTML5",
        focus: "Semantic structure & accessibility",
        iconUrl: devicon("html5/html5-original.svg"),
      },
      {
        name: "CSS3",
        focus: "Layout, transitions & animation",
        iconUrl: devicon("css3/css3-original.svg"),
      },
      {
        name: "Context API",
        focus: "Shared client state without boilerplate",
        icon: "layers",
      },
    ],
  },
  {
    title: "Backend",
    shortTitle: "Backend",
    description: "Typed server logic, REST contracts, and authentication.",
    level: "Intermediate",
    icon: "server",
    skills: [
      {
        name: "Node.js",
        focus: "Server runtime & package ecosystem",
        iconUrl: devicon("nodejs/nodejs-original.svg"),
      },
      {
        name: "Express.js",
        focus: "Routing, middleware & REST APIs",
        iconUrl: devicon("express/express-original.svg"),
        invertOnDark: true,
      },
      {
        name: "Java",
        focus: "Object-oriented backend engineering",
        iconUrl: devicon("java/java-original.svg"),
      },
      {
        name: "Spring Boot",
        focus: "Layered services & dependency injection",
        iconUrl: devicon("spring/spring-original.svg"),
      },
      {
        name: "REST APIs",
        focus: "Endpoint design, validation & status codes",
        icon: "server",
      },
      {
        name: "Better Auth",
        focus: "Sessions, OAuth & protected routes",
        icon: "shield",
      },
    ],
  },
  {
    title: "Database",
    shortTitle: "Database",
    description: "Document and relational data modeling for real products.",
    level: "Beginner",
    icon: "database",
    skills: [
      {
        name: "MongoDB Atlas",
        focus: "Document modeling & CRUD queries",
        iconUrl: devicon("mongodb/mongodb-original.svg"),
      },
      {
        name: "MySQL",
        focus: "Relational schemas & SQL queries",
        iconUrl: devicon("mysql/mysql-original.svg"),
      },
    ],
  },
  {
    title: "DevOps",
    shortTitle: "DevOps",
    description: "Version control, collaboration, and continuous deployment.",
    level: "Beginner",
    icon: "cloud",
    skills: [
      {
        name: "Git",
        focus: "Branching, history & collaboration",
        iconUrl: devicon("git/git-original.svg"),
      },
      {
        name: "GitHub",
        focus: "Remote repositories & code review",
        iconUrl: devicon("github/github-original.svg"),
        invertOnDark: true,
      },
      {
        name: "Vercel",
        focus: "Continuous deployment & previews",
        iconUrl: devicon("vercel/vercel-original.svg"),
        invertOnDark: true,
      },
    ],
  },
  {
    title: "Tools",
    shortTitle: "Tools",
    description: "UI libraries, build tooling, and the daily developer workflow.",
    level: "Intermediate",
    icon: "wrench",
    skills: [
      {
        name: "shadcn/ui",
        focus: "Accessible, composable UI primitives",
        iconUrl: simpleIcon("shadcnui"),
        invertOnDark: true,
      },
      {
        name: "DaisyUI",
        focus: "Tailwind component patterns",
        iconUrl: simpleIcon("daisyui"),
        invertOnDark: true,
      },
      {
        name: "Lucide React",
        focus: "Consistent, tree-shakeable icon sets",
        iconUrl: simpleIcon("lucide"),
        invertOnDark: true,
      },
      {
        name: "Vite",
        focus: "Fast local builds & HMR",
        iconUrl: devicon("vitejs/vitejs-original.svg"),
      },
      {
        name: "VS Code",
        focus: "Debugging & developer workflow",
        iconUrl: devicon("vscode/vscode-original.svg"),
      },
    ],
  },
  {
    title: "Fundamentals",
    shortTitle: "Fundamentals",
    description: "The CS problem-solving base underneath the stack.",
    level: "Intermediate",
    icon: "graduation",
    skills: [
      {
        name: "C",
        focus: "Memory layout & pointer discipline",
        iconUrl: devicon("c/c-original.svg"),
      },
      {
        name: "C++",
        focus: "STL containers & performance",
        iconUrl: devicon("cplusplus/cplusplus-original.svg"),
      },
      {
        name: "Data Structures",
        focus: "Trees, graphs, heaps & hash maps",
        icon: "binary",
      },
      {
        name: "Algorithms",
        focus: "Complexity, DP, greedy & search",
        icon: "binary",
      },
      {
        name: "Competitive Programming",
        focus: "LeetCode, Codeforces & CodeChef",
        icon: "sparkles",
      },
    ],
  },
];

export const allSkills = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({
    ...skill,
    category: category.title,
    categoryShortTitle: category.shortTitle,
  }))
);

export function getSkillByName(name: string) {
  return allSkills.find((skill) => skill.name === name);
}
