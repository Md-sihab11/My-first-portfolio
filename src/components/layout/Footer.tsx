import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navItems } from "@/data/navigation";
import { getVerifiedSocialLinks } from "@/data/social-links";
import { SocialCard } from "@/components/social/SocialCard";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const verifiedSocials = getVerifiedSocialLinks();

  return (
    <footer className="w-full border-t border-border bg-surface/40 mt-24">
      <Container size="lg" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-primary hover:text-accent transition-colors"
            >
              <span className="font-mono text-accent">&lt;/&gt;</span>
              <span className="lowercase">{siteConfig.wordmark}</span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed max-w-sm">
              {siteConfig.headline} Personal developer portfolio crafted with Next.js,
              TypeScript, and Tailwind CSS.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-secondary-muted">
                <span className="w-2 h-2 rounded-full bg-accent/80" />
                Available for internships & junior developer roles
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/social"
                  className="text-sm text-secondary hover:text-accent transition-colors"
                >
                  Verified Channels
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Channels Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Verified Presence
            </h4>
            <p className="text-xs text-secondary">
              Only authentic, active channels are linked:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {verifiedSocials.map((link) => (
                <SocialCard
                  key={link.platform}
                  link={link}
                  variant="icon-only"
                  className="min-w-[44px] min-h-[44px]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-muted font-mono">
          <p>
            © {currentYear} {siteConfig.wordmark}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed with <span className="text-accent">#8EC5FF</span> editorial aesthetics
          </p>
        </div>
      </Container>
    </footer>
  );
}
