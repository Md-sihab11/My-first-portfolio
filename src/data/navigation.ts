export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const navItems: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
