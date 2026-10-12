import fs from "fs";
import path from "path";
import { BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  rawYaml.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // remove surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // parse array
      if (value.startsWith("[") && value.endsWith("]")) {
        const items = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^["']|["']$/g, ""));
        data[key] = items;
      } else if (value === "true") {
        data[key] = true;
      } else if (value === "false") {
        data[key] = false;
      } else {
        data[key] = value;
      }
    }
  });

  return { data, content };
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      return [];
    }

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

    const posts: BlogPost[] = files.map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(BLOG_DIR, fileName);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = parseFrontmatter(raw);

      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
        summary: data.summary || "",
        publishedAt: data.publishedAt || "2026-03-01",
        readTime: data.readTime || "5 min read",
        tags: data.tags || [],
        featured: data.featured || false,
        content,
      };
    });

    return posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug);
}
