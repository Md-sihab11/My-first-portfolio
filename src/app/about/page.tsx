import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Code, Heart, Sparkles, Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Skills } from "@/components/home/Skills";

export const metadata: Metadata = {
  title: "About Me",
  description: `Learn about ${siteConfig.fullName}'s full-stack development journey, learning milestones, and coding philosophy.`,
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 space-y-20">
      <Container size="lg">
        <SectionHeading
          eyebrow="Background & Story"
          title="About Md Shihab Sharar"
          description="A candid view into my path as an evolving full-stack developer, what drives my work, and the principles I follow."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait & Fast Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface shadow-glow">
              <Image
                src="/images/profile/sh.png"
                alt={`Photo of ${siteConfig.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-accent font-semibold">
                Quick Facts
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex justify-between pb-2 border-b border-border">
                  <span className="text-secondary-muted font-mono">Location:</span>
                  <span className="text-primary font-medium">{siteConfig.location}</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-border">
                  <span className="text-secondary-muted font-mono">Current Focus:</span>
                  <span className="text-primary font-medium">Next.js & Full-stack</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-border">
                  <span className="text-secondary-muted font-mono">Status:</span>
                  <span className="text-accent font-medium">Junior / Intern ready</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary-muted font-mono">Email:</span>
                  <span className="text-primary font-medium">{siteConfig.email}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="lg:col-span-7 space-y-8 text-secondary leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                How It All Began
              </h3>
              <p>
                My journey into programming started with curiosity about how complex web applications function under the hood. What began as simple HTML and CSS experiments soon evolved into a passionate focus on modern JavaScript, component architectures with React, and full-stack systems using Next.js.
              </p>
              <p>
                Rather than collecting certificates or reading endless documentation in isolation, I learn best by engineering functional, tangible products. Every project I undertake—from the commodity monitoring architecture in <strong>Bazar Dor</strong> to community tool discovery platforms—is treated as a production application.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                Core Development Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-border bg-surface">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Authentic Problem Solving
                  </h4>
                  <p className="text-xs text-secondary-muted leading-relaxed">
                    Building tools that answer real needs, such as tracking daily vegetable & commodity prices across local markets.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Clean, Typed Code
                  </h4>
                  <p className="text-xs text-secondary-muted leading-relaxed">
                    Treating TypeScript interfaces and clean project modularity as prerequisites, not afterthoughts.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Continuous Iteration
                  </h4>
                  <p className="text-xs text-secondary-muted leading-relaxed">
                    Embracing debugging sessions as deep learning opportunities and constantly upgrading coding standards.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Accessible Design
                  </h4>
                  <p className="text-xs text-secondary-muted leading-relaxed">
                    Ensuring high contrast, semantic HTML, mobile responsiveness, and clean touch ergonomics.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-2xl font-bold text-primary">
                Looking Ahead
              </h3>
              <p>
                I am actively seeking junior full-stack developer roles and internship opportunities where I can contribute to mission-driven engineering teams, review code with experienced mentors, and build robust software at scale.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="md">
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/files/resume.pdf" variant="secondary" size="md" isExternal>
                  <span>Download Resume</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Skills />
    </div>
  );
}
