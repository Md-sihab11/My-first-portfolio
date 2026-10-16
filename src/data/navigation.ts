export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
  { label: "Skills", href: "/skills" },
  // { label: "Resources", href: "/resources" },
  // { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },

];
