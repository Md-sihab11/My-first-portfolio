import { getDb } from "./mongodb";
import { siteConfig } from "@/data/site";
import { projects as defaultProjects } from "@/data/projects";
import { resources as defaultResources } from "@/data/resources";
import { socialLinks as defaultSocials } from "@/data/social-links";
import { skillCategories as defaultSkillCategories } from "@/data/skills";
import { getAllBlogPosts as getDefaultBlogPosts } from "./blog";
import { Project } from "@/types/project";
import { Resource } from "@/types/resource";
import { BlogPost } from "@/types/blog";
import { SocialLink } from "@/types/social";
import { SiteSettings } from "@/types/site-settings";
import { ExperienceItem, EducationItem } from "@/types/experience";
import { ContactMessage } from "@/types/message";

// ==========================================
// 1. SITE & PROFILE SETTINGS
// ==========================================

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  if (db) {
    try {
      const doc = await db.collection("siteSettings").findOne({ id: "main" });
      if (doc) {
        return {
          id: doc.id,
          profile: doc.profile,
          hero: doc.hero,
          sectionsVisibility: doc.sectionsVisibility,
          footer: doc.footer,
          updatedAt: doc.updatedAt,
        };
      }
    } catch (err) {
      console.error("[db-content] Error fetching siteSettings:", err);
    }
  }

  // Sensible default initial state
  return {
    id: "main",
    profile: {
      fullName: siteConfig.fullName,
      displayName: siteConfig.name,
      role: siteConfig.role,
      intro: siteConfig.intro,
      aboutStory: siteConfig.about.story,
      aboutPhilosophy: siteConfig.about.philosophy,
      currentFocus: siteConfig.about.currentFocus,
      location: siteConfig.location,
      availability: "Available for junior roles & internships",
      email: siteConfig.email,
      githubUrl: siteConfig.links.github,
      linkedinUrl: "",
      resumeUrl: "/files/resume.pdf",
      profileImage: "/images/profile/profile.png",
      seoTitle: `${siteConfig.name} | ${siteConfig.role}`,
      seoDescription: siteConfig.headline,
    },
    hero: {
      headline: "Building for the web. Growing through every project.",
      subheadline:
        "Hi, I'm Shakib (Sihab Sharar). Full-stack developer focused on creating responsive, performant web applications with modern Next.js and MongoDB.",
      primaryCtaLabel: "Explore Projects",
      primaryCtaLink: "/projects",
      secondaryCtaLabel: "Contact Me",
      secondaryCtaLink: "/contact",
    },
    sectionsVisibility: {
      showExperience: true,
      showEducation: true,
      showBlog: true,
      showResources: true,
      showSocial: true,
      showContact: true,
    },
    footer: {
      wordmark: siteConfig.wordmark,
      note: "Crafted with Next.js App Router, TypeScript & editorial dark aesthetics.",
    },
    updatedAt: new Date().toISOString(),
  };
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    profile: { ...current.profile, ...(settings.profile || {}) },
    hero: { ...current.hero, ...(settings.hero || {}) },
    sectionsVisibility: {
      ...current.sectionsVisibility,
      ...(settings.sectionsVisibility || {}),
    },
    footer: { ...current.footer, ...(settings.footer || {}) },
    updatedAt: new Date().toISOString(),
  };

  const db = await getDb();
  if (db) {
    await db
      .collection("siteSettings")
      .updateOne({ id: "main" }, { $set: updated }, { upsert: true });
  }

  return updated;
}

// ==========================================
// 2. PROJECTS MANAGEMENT
// ==========================================

export async function getProjects(options: { onlyPublished?: boolean } = {}): Promise<Project[]> {
  const db = await getDb();
  if (db) {
    try {
      const query = options.onlyPublished ? { status: { $ne: "draft" } } : {};
      const docs = await db.collection("projects").find(query).sort({ order: 1 }).toArray();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          slug: d.slug,
          title: d.title,
          tagline: d.tagline || "",
          description: d.description || "",
          problem: d.problem || "",
          solution: d.solution || "",
          image: d.image || "/images/projects/bazar-dor.png",
          imageAlt: d.imageAlt || d.title,
          technologies: d.technologies || [],
          liveUrl: d.liveUrl || "",
          githubUrl: d.githubUrl || "",
          featured: Boolean(d.featured),
          category: d.category || "Full-Stack",
          highlights: d.highlights || [],
          status: d.status || "published",
          order: d.order || 0,
          startDate: d.startDate || "",
          completionDate: d.completionDate || "",
          screenshots: d.screenshots || [],
          seoTitle: d.seoTitle || "",
          seoDescription: d.seoDescription || "",
        }));
      }
    } catch (err) {
      console.error("[db-content] Error fetching projects:", err);
    }
  }

  // Fallback to default initial projects
  return defaultProjects.map((p, idx) => ({
    ...p,
    status: "published",
    order: idx,
  }));
}

export async function getProjectBySlug(slug: string, onlyPublished = true): Promise<Project | null> {
  const all = await getProjects({ onlyPublished });
  return all.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");

  await db.collection("projects").updateOne(
    { slug: project.slug },
    {
      $set: {
        ...project,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );
}

export async function deleteProject(slug: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("projects").deleteOne({ slug });
}

// ==========================================
// 3. RESOURCES MANAGEMENT
// ==========================================

export async function getResources(options: { onlyPublished?: boolean } = {}): Promise<Resource[]> {
  const db = await getDb();
  if (db) {
    try {
      const query = options.onlyPublished ? { published: { $ne: false } } : {};
      const docs = await db.collection("resources").find(query).toArray();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          id: d.id || d.slug,
          slug: d.slug || d.id,
          title: d.title,
          description: d.description,
          category: d.category,
          fileUrl: d.fileUrl,
          storageKey: d.storageKey,
          fileSize: d.fileSize || "1.0 MB",
          format: d.format || "PDF",
          updatedAt: d.updatedAt,
          downloads: d.downloads || 0,
          tags: d.tags || [],
          published: d.published !== false,
          featured: Boolean(d.featured),
          version: d.version || "1.0",
        }));
      }
    } catch (err) {
      console.error("[db-content] Error fetching resources:", err);
    }
  }

  return defaultResources.map((r) => ({
    ...r,
    published: true,
  }));
}

export async function saveResource(res: Resource): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");

  await db.collection("resources").updateOne(
    { id: res.id },
    {
      $set: {
        ...res,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );
}

export async function deleteResource(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("resources").deleteOne({ id });
}

// ==========================================
// 4. BLOG MANAGEMENT
// ==========================================

export async function getBlogPosts(options: { onlyPublished?: boolean } = {}): Promise<BlogPost[]> {
  const db = await getDb();
  if (db) {
    try {
      const query = options.onlyPublished ? { status: { $ne: "draft" } } : {};
      const docs = await db.collection("blogPosts").find(query).sort({ publishedAt: -1 }).toArray();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          slug: d.slug,
          title: d.title,
          summary: d.summary || "",
          publishedAt: d.publishedAt || new Date().toISOString(),
          updatedAt: d.updatedAt,
          readTime: d.readTime || "5 min read",
          tags: d.tags || [],
          categories: d.categories || [],
          featured: Boolean(d.featured),
          content: d.content || "",
          status: d.status || "published",
          coverImage: d.coverImage || "",
          author: d.author || siteConfig.name,
          isDebuggingTemplate: Boolean(d.isDebuggingTemplate),
          debuggingDetails: d.debuggingDetails,
        }));
      }
    } catch (err) {
      console.error("[db-content] Error fetching blog posts:", err);
    }
  }

  // Fallback to local starter MDX posts
  const starter = getDefaultBlogPosts();
  return starter.map((p) => ({
    ...p,
    status: "published",
  }));
}

export async function getBlogPostBySlug(slug: string, onlyPublished = true): Promise<BlogPost | null> {
  const all = await getBlogPosts({ onlyPublished });
  return all.find((p) => p.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");

  await db.collection("blogPosts").updateOne(
    { slug: post.slug },
    {
      $set: {
        ...post,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("blogPosts").deleteOne({ slug });
}

// ==========================================
// 5. SOCIAL PROFILES MANAGEMENT
// ==========================================

export async function getSocialProfiles(options: { onlyVisible?: boolean } = {}): Promise<SocialLink[]> {
  const db = await getDb();
  if (db) {
    try {
      const query = options.onlyVisible ? { visible: { $ne: false } } : {};
      const docs = await db.collection("socialProfiles").find(query).sort({ order: 1 }).toArray();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          id: d.id || d._id.toString(),
          platform: d.platform,
          label: d.label,
          url: d.url,
          username: d.username,
          featured: Boolean(d.featured),
          order: d.order || 0,
          visible: d.visible !== false,
          shortDescription: d.shortDescription || "",
        }));
      }
    } catch (err) {
      console.error("[db-content] Error fetching socialProfiles:", err);
    }
  }

  return defaultSocials.map((s, idx) => ({
    ...s,
    id: `default-${idx}`,
    order: idx,
    visible: true,
  }));
}

export async function saveSocialProfile(link: SocialLink): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");

  const id = link.id || `soc-${Date.now()}`;
  await db.collection("socialProfiles").updateOne(
    { id },
    { $set: { ...link, id } },
    { upsert: true }
  );
}

export async function deleteSocialProfile(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("socialProfiles").deleteOne({ id });
}

// ==========================================
// 6. SKILLS MANAGEMENT
// ==========================================

export async function getSkills() {
  const db = await getDb();
  if (db) {
    try {
      const docs = await db.collection("skills").find().sort({ order: 1 }).toArray();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          id: d.id || d._id.toString(),
          title: d.title,
          description: d.description,
          skills: d.skills || [],
          order: d.order || 0,
        }));
      }
    } catch (err) {
      console.error("[db-content] Error fetching skills:", err);
    }
  }

  return defaultSkillCategories.map((c, idx) => ({
    id: `cat-${idx}`,
    ...c,
    order: idx,
  }));
}

export async function saveSkillCategory(cat: {
  id?: string;
  title: string;
  description: string;
  skills: { name: string; focus: string }[];
  order?: number;
}): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");

  const id = cat.id || `cat-${Date.now()}`;
  await db.collection("skills").updateOne(
    { id },
    { $set: { ...cat, id } },
    { upsert: true }
  );
}

export async function deleteSkillCategory(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("skills").deleteOne({ id });
}

// ==========================================
// 7. EXPERIENCE & EDUCATION
// ==========================================

export async function getExperience(): Promise<ExperienceItem[]> {
  const db = await getDb();
  if (db) {
    try {
      const docs = await db.collection("experience").find({ visible: { $ne: false } }).sort({ order: 1 }).toArray();
      if (docs.length > 0) {
        return docs.map((d: any) => ({
          id: d.id || d._id.toString(),
          role: d.role,
          company: d.company,
          location: d.location,
          period: d.period,
          description: d.description,
          current: Boolean(d.current),
          order: d.order || 0,
          visible: d.visible !== false,
        }));
      }
    } catch (err) {
      console.error("[db-content] Error fetching experience:", err);
    }
  }

  // Default learning milestones
  return [
    {
      id: "exp-1",
      role: "Full-Stack Web Development Journey",
      company: "Self-Directed & Project Driven",
      period: "2026 - Present",
      description:
        "Building production-grade web applications including Bazar Dor with Next.js App Router, Better Auth, and MongoDB.",
      current: true,
      order: 1,
      visible: true,
    },
    {
      id: "exp-2",
      role: "Frontend Specialization",
      company: "Programming Hero Module Tasks",
      period: "2025 - 2026",
      description:
        "Crafted single-page React applications (DevStack, BPL Dream 11) using Tailwind CSS and component-driven state architecture.",
      current: false,
      order: 2,
      visible: true,
    },
  ];
}

export async function saveExperience(item: ExperienceItem): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");

  const id = item.id || `exp-${Date.now()}`;
  await db.collection("experience").updateOne(
    { id },
    { $set: { ...item, id } },
    { upsert: true }
  );
}

export async function deleteExperience(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("experience").deleteOne({ id });
}

// ==========================================
// 8. CONTACT MESSAGES (OWNER ONLY)
// ==========================================

export async function getContactMessages(): Promise<ContactMessage[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const docs = await db.collection("contactMessages").find().sort({ createdAt: -1 }).toArray();
    return docs.map((d: any) => ({
      id: d.id || d._id.toString(),
      name: d.name,
      email: d.email,
      subject: d.subject,
      message: d.message,
      createdAt: d.createdAt,
      read: Boolean(d.read),
      archived: Boolean(d.archived),
    }));
  } catch (err) {
    console.error("[db-content] Error fetching contact messages:", err);
    return [];
  }
}

export async function saveContactMessage(msg: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const db = await getDb();
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: msg.name,
    email: msg.email,
    subject: msg.subject || "Portfolio Contact",
    message: msg.message,
    createdAt: new Date().toISOString(),
    read: false,
    archived: false,
  };

  if (db) {
    await db.collection("contactMessages").insertOne(newMsg);
  }
}

export async function updateMessageStatus(id: string, updates: { read?: boolean; archived?: boolean }): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("contactMessages").updateOne({ id }, { $set: updates });
}

export async function deleteContactMessage(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database connection unavailable.");
  await db.collection("contactMessages").deleteOne({ id });
}
