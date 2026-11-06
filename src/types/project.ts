export type ProjectResourceKind =
  | "live"
  | "repository"
  | "api"
  | "documentation"
  | "design"
  | "other";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectTechGroup {
  label: string;
  items: string[];
}

export interface ProjectChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectLearning {
  title: string;
  description: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectResource {
  label: string;
  href: string;
  description?: string;
  kind?: ProjectResourceKind;
}

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
  /** Human-readable delivery state shown in the project snapshot. */
  developmentStatus?: "Live" | "Completed" | "In Progress" | string;
  /** Structured feature cards. Falls back to `highlights` when omitted. */
  features?: ProjectFeature[];
  /** Grouped technology stack shown on the case-study page. */
  techStack?: ProjectTechGroup[];
  challenges?: ProjectChallenge[];
  learnings?: ProjectLearning[];
  screenshots?: ProjectScreenshot[];
  resources?: ProjectResource[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}
