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
    platform: "Email",
    label: "Send an email to Shakib",
    url: "mailto:mdsihabsharar22@gmail.com",
    username: "mdsihabsharar22@gmail.com",
    featured: true,
  },
  // Future verified links can be added here once provided:
  // {
  //   platform: "LinkedIn",
  //   label: "Connect with Shakib on LinkedIn",
  //   url: "https://linkedin.com/in/...",
  //   username: "...",
  //   featured: true,
  // },
];

export const getVerifiedSocialLinks = (): SocialLink[] => {
  return socialLinks.filter((link) => Boolean(link.url && link.url.trim().length > 0));
};
