export type SocialPlatform =
  | "GitHub"
  | "LinkedIn"
  | "Facebook"
  | "Instagram"
  | "X"
  | "YouTube"
  | "Email"
  | "Codeforces"
  | "LeetCode"
  | "HackerRank"
  | "CodeChef"
  | "AtCoder"
  | "Stack Overflow"
  | "Dev.to"
  | "Medium"
  | string;

export interface SocialLink {
  id?: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  username?: string;
  featured?: boolean;
  order?: number;
  visible?: boolean;
  shortDescription?: string;
}
