export interface MilestoneMetric {
  label: string;
  value: string;
}

export interface Milestone {
  id: string;
  phase: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  skills: string[];
  metrics?: MilestoneMetric[];
  projectSlugs?: string[];
  status: "active" | "completed" | "upcoming";
}

export const milestonesData: Milestone[] = [
  {
    id: "mern-nextjs",
    phase: "Current Focus",
    period: "2024 – Present",
    title: "Full-Stack MERN & Next.js Architecture",
    subtitle: "Production Web Applications, Server Components & Resilient Backends",
    description:
      "Architecting end-to-end full-stack web applications using Next.js App Router, React 19, TypeScript, and MongoDB. Deeply focused on server-side rendering, responsive interfaces, secure authentication, and robust database modeling.",
    highlights: [
      "Engineered 'Bazar Dor' — a market commodity price tracker for Bangladesh featuring a real-time price ticker, automated Bengali calendar calculations, and Better Auth authentication.",
      "Developed 'Wanderlust' — an interactive travel destination and booking platform utilizing Next.js 16, React 19, and full CRUD workflows.",
      "Built 'DevStack' and 'FitLog' — emphasizing clean state management, modular component boundaries, and performance optimization.",
    ],
    skills: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Express.js",
      "Node.js",
      "Better Auth",
    ],
    metrics: [
      { label: "Full-Stack Apps", value: "4+" },
      { label: "Core Stack", value: "Next.js / MERN" },
    ],
    projectSlugs: ["bazar-dor", "wanderlust", "fitlog-workout-library"],
    status: "active",
  },
  {
    id: "java-spring",
    phase: "Backend Phase",
    period: "2023 – 2024",
    title: "Java, Spring Boot & Backend Systems",
    subtitle: "Object-Oriented Design, Layered Architecture & RESTful APIs",
    description:
      "Transitioned into object-oriented backend engineering with Java. Mastered enterprise software architecture patterns, dependency injection, and secure RESTful web service development.",
    highlights: [
      "Designed and implemented layered REST APIs (Controller, Service, Repository patterns) with Spring Boot.",
      "Leveraged Spring Data JPA and Hibernate ORM for relational persistence, schema migrations, and optimized queries.",
      "Implemented comprehensive input validation, exception handling middleware, and role-aware backend contracts.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "MySQL",
      "OOP Design Patterns",
    ],
    metrics: [
      { label: "Core Lang", value: "Java" },
      { label: "Architecture", value: "Layered REST" },
    ],
    status: "completed",
  },
  {
    id: "cpp-algorithms",
    phase: "Foundation Phase",
    period: "2022 – 2023",
    title: "C, C++ & STL (Competitive Programming)",
    subtitle: "Algorithmic Thinking, Memory Discipline & Problem-Solving",
    description:
      "Gained low-level computing foundations in C understanding memory layouts and pointer arithmetic, then advanced to C++ and the Standard Template Library (STL) for intensive algorithmic problem-solving.",
    highlights: [
      "Actively solved algorithmic challenges on LeetCode, Codeforces, and CodeChef, focusing on time and space complexity trade-offs.",
      "Mastered STL containers: vectors, sets, maps, queues, stacks, and priority queues for optimal query execution.",
      "Implemented core data structures and paradigms: Two Pointers, Sliding Window, Binary Search, DFS/BFS, and Dynamic Programming.",
    ],
    skills: [
      "C",
      "C++",
      "STL Containers",
      "Data Structures",
      "Algorithms",
      "Competitive Programming",
    ],
    metrics: [
      { label: "Platforms", value: "LeetCode & CF" },
      { label: "Discipline", value: "DSA & STL" },
    ],
    status: "completed",
  },

];
