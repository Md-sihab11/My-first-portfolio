import React from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getVerifiedSocialLinks } from "@/data/social-links";
import { SocialCard } from "@/components/social/SocialCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shakib for project inquiries, junior developer roles, or technical collaborations.",
};

export default function ContactPage() {
  const verifiedSocials = getVerifiedSocialLinks();

  return (
    <div className="py-16 sm:py-24">
      <Container size="lg">
        <SectionHeading
          eyebrow="Communication"
          title="Let's build something meaningful."
          description="Have a project in mind, an engineering role open, or want to collaborate on open-source web experiments? Send a direct message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-6">
              <h3 className="text-lg font-bold text-primary">
                Direct Channels
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-muted hover:border-accent/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-surface border border-border text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-secondary-muted block">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      {siteConfig.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-muted">
                  <div className="p-2.5 rounded-lg bg-surface border border-border text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-secondary-muted block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-xs font-mono text-secondary-muted block mb-3">
                  Verified Social Channels
                </span>
                <div className="flex flex-col gap-2">
                  {verifiedSocials.map((link) => (
                    <SocialCard key={link.platform} link={link} variant="card" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
