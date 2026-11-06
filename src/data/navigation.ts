export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/#education" },
  { label: "Articles", href: "/articles" },
  { label: "Resources", href: "/resources" },
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "Contact", href: "/contact" },
];

