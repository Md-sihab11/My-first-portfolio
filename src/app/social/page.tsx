import React from "react";
import type { Metadata } from "next";
import { getVerifiedSocialLinks } from "@/data/social-links";
import { SocialCard } from "@/components/social/SocialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Social & Contact Channels",
  description: "Verified developer profiles and communication channels for Shakib.",
};

export default function SocialPage() {
  const verifiedSocials = getVerifiedSocialLinks();

  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <SectionHeading
          eyebrow="Online Presence"
          title="Verified Profiles"
          description="Every link below points to an active, verified account owned by Shakib. Broken, dummy, or unconfirmed profiles are strictly excluded."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {verifiedSocials.map((link) => (
            <SocialCard key={link.platform} link={link} variant="card" />
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-dashed border-border bg-surface-muted text-xs text-secondary-muted font-mono space-y-2">
          <p className="text-primary font-semibold">Verification Policy:</p>
          <p>
            Links are added only after public domain verification or explicit credential confirmation in our centralized config (<code>src/data/social-links.ts</code>).
          </p>
        </div>
      </Container>
    </div>
  );
}
