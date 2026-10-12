export interface Resource {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: "DSA" | "JavaScript" | "Web Development" | "React" | "Notes" | string;
  fileUrl: string;
  storageKey?: string;
  fileSize: string;
  format: "PDF" | "MD" | "ZIP" | string;
  updatedAt: string;
  downloads?: number;
  tags: string[];
  published?: boolean;
  featured?: boolean;
  version?: string;
  thumbnail?: string;
}
