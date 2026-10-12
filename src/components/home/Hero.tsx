import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getVerifiedSocialLinks } from "@/data/social-links";
import { SocialCard } from "@/components/social/SocialCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const verifiedSocials = getVerifiedSocialLinks();

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-accent/25 bg-surface text-xs font-mono text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-secondary">{siteConfig.role}</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary leading-[1.08]">
                Building for the web. <br />
                <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-from-font">
                  Growing through
                </span>{" "}
                every project.
              </h1>
              <p className="text-lg sm:text-xl text-secondary max-w-2xl leading-relaxed pt-2">
                Hi, I&apos;m <strong className="text-primary font-semibold">{siteConfig.name}</strong> ({siteConfig.fullName}). {siteConfig.intro}
              </p>
            </div>

            {/* CTAs and Verified Socials */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="/projects" variant="primary" size="lg">
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>

              <div className="hidden sm:flex items-center gap-2 pl-2">
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

            {/* Mobile Socials Row */}
            <div className="flex sm:hidden items-center gap-2 pt-2">
              <span className="text-xs font-mono text-secondary-muted mr-1">Connect:</span>
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

          {/* Side Editorial Profile Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-glow transition-all hover:border-accent/40">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface-muted mb-5 border border-border">
                <Image
                  src="/images/profile/profile.png"
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-secondary-muted">Location:</span>
                  <span className="text-primary font-medium">{siteConfig.location}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-secondary-muted">Stack:</span>
                  <span className="text-accent font-medium">Next.js • React • TS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-muted">Featured:</span>
                  <Link
                    href="/projects/bazar-dor"
                    className="text-primary hover:text-accent font-medium underline underline-offset-4"
                  >
                    Bazar Dor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
