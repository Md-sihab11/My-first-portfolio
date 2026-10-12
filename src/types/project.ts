export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "Full-Stack" | "Frontend" | "Next.js" | "React" | string;
  highlights: string[];
  status?: "published" | "draft";
  order?: number;
  startDate?: string;
  completionDate?: string;
  screenshots?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}
