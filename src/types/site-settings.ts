export interface ProfileSettings {
  fullName: string;
  displayName: string;
  role: string;
  intro: string;
  aboutStory: string;
  aboutPhilosophy: string;
  currentFocus: string;
  location: string;
  availability: string;
  email: string;
  githubUrl: string;
  linkedinUrl?: string;
  resumeUrl: string;
  profileImage: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SectionVisibilitySettings {
  showExperience: boolean;
  showEducation: boolean;
  showBlog: boolean;
  showResources: boolean;
  showSocial: boolean;
  showContact: boolean;
}

export interface SiteSettings {
  id: string;
  profile: ProfileSettings;
  hero: {
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    primaryCtaLink: string;
    secondaryCtaLabel: string;
    secondaryCtaLink: string;
  };
  sectionsVisibility: SectionVisibilitySettings;
  footer: {
    wordmark: string;
    note: string;
  };
  updatedAt: string;
}
