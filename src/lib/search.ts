import { projects } from "@/data/projects";
import { resources } from "@/data/resources";

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: "Project" | "Resource" | "Blog" | "Page";
}

export function searchAll(query: string, blogPosts: { slug: string; title: string; summary: string }[] = []): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Search Projects
  for (const project of projects) {
    if (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        title: project.title,
        description: project.description,
        url: `/projects/${project.slug}`,
        type: "Project",
      });
    }
  }

  // Search Resources
  for (const res of resources) {
    if (
      res.title.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      res.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        title: res.title,
        description: res.description,
        url: res.fileUrl,
        type: "Resource",
      });
    }
  }

  // Search Blog
  for (const post of blogPosts) {
    if (post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q)) {
      results.push({
        title: post.title,
        description: post.summary,
        url: `/blog/${post.slug}`,
        type: "Blog",
      });
    }
  }

  return results;
}
