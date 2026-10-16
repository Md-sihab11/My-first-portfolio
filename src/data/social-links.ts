import { SocialLink } from "@/types/social";

/**
 * Verified social accounts and contact channels.
 * Only platforms with confirmed, verified URLs are enabled to prevent dead links.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    label: "Visit Shakib's GitHub profile",
    url: "https://github.com/Md-sihab11",
    username: "Md-sihab11",
    featured: true,
  },
  {
    platform: "LeetCode",
    label: "Connect with Shakib on LeetCode",
    url: "https://leetcode.com/u/mdshihab1122/",
    username: "mdshihab1122",
    featured: true,
  },
  {
    platform: "Codeforces",
    label: "Connect with Shakib on Codeforces",
    url: "https://codeforces.com/profile/shihab1122",
    username: "shihab1122",
    featured: true,
  },
  {
    platform: "LinkedIn",
    label: "Connect with Shakib on LinkedIn",
    url: "https://linkedin.com/in/md-sihab11",
    username: "md-sihab11",
    featured: true,
  },
  {
    platform: "Email",
    label: "Send an email to Shakib",
    url: "mailto:mdsihabsharar22@gmail.com",
    username: "mdsihabsharar22@gmail.com",
    featured: true,
  },
];

export const getVerifiedSocialLinks = (): SocialLink[] => {
  return socialLinks.filter(
    (link) => Boolean(link.url && link.url.trim().length > 0 && !link.url.includes("..."))
  );
};
