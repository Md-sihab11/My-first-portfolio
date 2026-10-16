export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
  { label: "Skills", href: "/skills" },
  { label: "Articles", href: "/articles" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

