export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    focus: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Building responsive, accessible interfaces and modern web architectures.",
    skills: [
      { name: "React", focus: "Component architecture, hooks & state" },
      { name: "Next.js", focus: "App Router, SSR & API routes" },
      { name: "TypeScript", focus: "Type safety & interfaces" },
      { name: "JavaScript (ES6+)", focus: "Async patterns & DOM manipulation" },
      { name: "Tailwind CSS", focus: "Utility-first design systems & dark mode" },
      { name: "HTML5 & Semantic Web", focus: "Accessible layouts & SEO fundamentals" },
      { name: "CSS3", focus: "Flexbox, Grid, transitions & animations" },
    ],
  },
  {
    title: "Backend & Database",
    description: "Creating functional server-side logic and database persistence.",
    skills: [
      { name: "MongoDB Atlas", focus: "Document modeling & CRUD queries" },
      { name: "Better Auth", focus: "Session authentication & OAuth integration" },
      { name: "REST APIs", focus: "Endpoint design, status codes & validation" },
      { name: "Node.js Basics", focus: "Server-side runtime & package ecosystem" },
    ],
  },
  {
    title: "Tools & Deployment",
    description: "Version control, collaboration, and modern continuous deployment.",
    skills: [
      { name: "Git", focus: "Branching, committing & history tracking" },
      { name: "GitHub", focus: "Remote repositories & collaboration" },
      { name: "Vercel", focus: "Continuous deployment & preview environments" },
      { name: "VS Code", focus: "Development environment & debugging" },
    ],
  },
];
