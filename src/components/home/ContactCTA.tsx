import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getVerifiedSocialLinks } from "@/data/social-links";
import { SocialCard } from "@/components/social/SocialCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactCTA() {
  const verifiedSocials = getVerifiedSocialLinks();

  return (
    <section className="py-20 border-t border-border/60">
      <Container size="lg">
        <div className="relative rounded-3xl border border-border bg-gradient-to-b from-surface to-surface-muted p-8 sm:p-14 overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-accent bg-accent-subtle border border-accent/20">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary leading-tight">
              Let&apos;s build something meaningful.
            </h2>

            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Whether you have an upcoming project, an internship opportunity, or just want to discuss modern web technologies—my inbox is open.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button href={`mailto:${siteConfig.email}`} variant="primary" size="lg">
                <Mail className="w-4 h-4" />
                <span>Email Shakib Directly</span>
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                <span>Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="pt-6 border-t border-border/80 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-secondary-muted mr-1">
                Verified:
              </span>
              {verifiedSocials.map((link) => (
                <SocialCard
                  key={link.platform}
                  link={link}
                  variant="pill"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
