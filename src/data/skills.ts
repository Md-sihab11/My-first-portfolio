export interface Skill {
  name: string;
  focus: string;
  iconUrl: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Building responsive, accessible interfaces and modern web architectures.",
    skills: [
      {
        name: "React",
        focus: "Component architecture, hooks & state",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
      },
      {
        name: "Next.js",
        focus: "App Router, SSR & API routes",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg"
      },
      {
        name: "TypeScript",
        focus: "Type safety & interfaces",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
      },
      {
        name: "JavaScript (ES6+)",
        focus: "Async patterns & DOM manipulation",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
      },
      {
        name: "Tailwind CSS",
        focus: "Utility-first design systems & dark mode",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg"
      },
      {
        name: "HTML5 & Semantic Web",
        focus: "Accessible layouts & SEO fundamentals",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
      },
      {
        name: "CSS3",
        focus: "Flexbox, Grid, transitions & animations",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
      },
    ],
  },
  {
    title: "Backend & Database",
    description: "Creating functional server-side logic and database persistence.",
    skills: [
      {
        name: "MongoDB Atlas",
        focus: "Document modeling & CRUD queries",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
      },
      {
        name: "Better Auth",
        focus: "Session authentication & OAuth integration",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
      },
      {
        name: "REST APIs",
        focus: "Endpoint design, status codes & validation",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"
      },
      {
        name: "Node.js Basics",
        focus: "Server-side runtime & package ecosystem",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
      },
    ],
  },
  {
    title: "Tools & Deployment",
    description: "Version control, collaboration, and modern continuous deployment.",
    skills: [
      {
        name: "Git",
        focus: "Branching, committing & history tracking",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
      },
      {
        name: "GitHub",
        focus: "Remote repositories & collaboration",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg"
      },
      {
        name: "Vercel",
        focus: "Continuous deployment & preview environments",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg"
      },
      {
        name: "VS Code",
        focus: "Development environment & debugging",
        iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg"
      },
    ],
  },
];