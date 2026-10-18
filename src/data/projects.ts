
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bazar-dor",
    title: "Bazar Dor",
    tagline: "Essential Commodities Price Monitoring Platform for Bangladesh",
    description:
      "A modern web platform designed to make daily market prices of essential commodities in Bangladesh accessible to the public, tracking price fluctuations across local markets.",
    problem:
      "Daily market price volatility and lack of accessible price tracking in local bazaars make it challenging for ordinary citizens to anticipate fair prices and prevent overpaying.",
    solution:
      "Constructed a responsive full-stack platform featuring an animated price ticker, Bengali calendar date integration, detailed product price analytics, and protected user dashboards.",
    image: "/images/projects/bazar-dor.png",
    imageAlt: "Bazar Dor daily market commodity monitoring platform interface",
    technologies: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Better Auth",
      "MongoDB Atlas",
    ],
    githubUrl: "https://github.com/Md-sihab11/bazar-dor",
    liveUrl: "https://bazar-dor-orpin-nine.vercel.app/",
    featured: true,
    category: "Full-Stack",
    highlights: [
      "Real-time infinite scrolling price ticker with upward/downward fluctuation indicators",
      "Automatic Bengali calendar and date engine calculating current Bangla day and year",
      "Comparative market analysis tracking minimum, maximum, and average commodity prices",
      "Secure authentication and protected routes implemented with Better Auth & MongoDB",
    ],
  },
  {
    slug: "devstack",
    title: "DevStack",
    tagline: "Curated Developer Stack & Tooling Repository",
    description:
      "An interactive web platform enabling developers to discover, organize, and evaluate modern web tools, frameworks, and library ecosystems.",
    problem:
      "Developers lose hours navigating scattered documentation to assemble modern, compatible development stacks.",
    solution:
      "Built a streamlined web explorer that categorizes developer tools with responsive filtering, category badges, and instant search.",
    image: "/images/projects/devstack.png",
    imageAlt: "DevStack developer tool catalog interface",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/Md-sihab11/dev-stack-builder",
    liveUrl: "https://devstackb.netlify.app/",
    featured: true,
    category: "Frontend",
    highlights: [
      "Dynamic search and multi-tag filtering across tech categories",
      "Responsive cards with tool details, external links, and tag badges",
      "Optimized client-side state management for snappy interactions",
    ],
  },
  {
    slug: "bpl-dream",
    title: "BPL Dream 11",
    tagline: "Cricket Fantasy Team Builder & Budget Manager",
    description:
      "An interactive fantasy cricket squad selection application for the Bangladesh Premier League with strict coin balance management and roster limits.",
    problem:
      "Balancing player acquisition across bats, bowlers, and all-rounders while respecting coin ceilings requires continuous tracking.",
    solution:
      "Developed a fluid drafting simulator with real-time budget deductions, toast alerts, and squad roster validation.",
    image: "/images/projects/bpl-dream.png",
    imageAlt: "BPL Dream fantasy cricket squad selection interface",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Md-sihab11/bpl-fantasy-squad-builder",
    liveUrl: "https://bplbuilder.netlify.app/",
    featured: false,
    category: "React",
    highlights: [
      "Live coin budget updates upon player addition and removal",
      "Enforced roster limits (maximum 6 players per team)",
      "Instant feedback notifications for invalid draft attempts",
    ],
  },
  {
    slug: "fitlog-workout-library",
    title: "FitLog - Workout Library",
    tagline: "Responsive Workout Library & Personal Fitness Planner",
    description:
      "A simple and responsive workout library built with Next.js that allows users to explore workouts, view detailed workout instructions, save workouts for later, and create a personalized workout plan.",
    problem:
      "Finding suitable workouts and organizing a consistent fitness routine can be challenging without a centralized place to explore exercises and manage workout plans.",
    solution:
      "Developed a responsive workout library with detailed workout pages, saved workouts, and a personal workout planner using reusable React components and Context API for state management.",
    image: "/images/projects/fit.png",
    imageAlt: "FitLog workout library and personal fitness planner interface",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Context API",
    ],
    githubUrl: "https://github.com/Md-sihab11/fitlog-workout-library",
    liveUrl: "https://fitlog-workout-library-pink.vercel.app/",
    featured: true,
    category: "Full-Stack",
    highlights: [
      "Browse workouts with category, difficulty, duration, and equipment information",
      "View detailed workout instructions through dynamic routes",
      "Create and manage a personalized workout plan",
      "Save workouts for quick access later",
      "Responsive interface optimized for desktop, tablet, and mobile devices",
    ],
  },
];
