import { Resource } from "@/types/resource";

export const resources: Resource[] = [
  {
    id: "dsa-notes",
    title: "DSA Fundamentals & Problem Solving Notes",
    description:
      "Core data structures, algorithm complexities (Big-O), search/sort patterns, and mental models for competitive and technical interview challenges.",
    category: "DSA",
    fileUrl: "/resources/dsa-notes.pdf",
    fileSize: "2.4 MB",
    format: "PDF",
    updatedAt: "2026-03-10",
    tags: ["Algorithms", "Data Structures", "Big-O", "Problem Solving"],
  },
  {
    id: "javascript-cheatsheet",
    title: "Modern JavaScript (ES6+) Quick Reference",
    description:
      "Essential ES6+ syntax, array methods (map, filter, reduce), promises, async/await, closures, and modern utility patterns.",
    category: "JavaScript",
    fileUrl: "/resources/javascript-cheatsheet.pdf",
    fileSize: "1.1 MB",
    format: "PDF",
    updatedAt: "2026-03-22",
    tags: ["JavaScript", "ES6+", "Async", "Cheatsheet"],
  },
  {
    id: "web-development-notes",
    title: "Full-Stack Web Development Architecture Notes",
    description:
      "Comprehensive notes on Next.js App Router, React state mechanics, REST APIs, Tailwind CSS utility patterns, and MongoDB modeling.",
    category: "Web Development",
    fileUrl: "/resources/web-development-notes.pdf",
    fileSize: "3.8 MB",
    format: "PDF",
    updatedAt: "2026-04-01",
    tags: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
  },
];
