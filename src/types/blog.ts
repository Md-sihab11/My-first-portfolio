export interface DebuggingDetails {
  errorTitle?: string;
  context?: string;
  expected?: string;
  actual?: string;
  errorMessage?: string;
  reproduction?: string;
  rootCause?: string;
  fixCode?: string;
  lessonLearned?: string;
  relatedLinks?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  tags: string[];
  categories?: string[];
  featured?: boolean;
  content: string;
  status?: "published" | "draft" | "archived";
  coverImage?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  isDebuggingTemplate?: boolean;
  debuggingDetails?: DebuggingDetails;
}
