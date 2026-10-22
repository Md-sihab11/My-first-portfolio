import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Code, Compass, Heart, Sparkles, Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Skills } from "@/components/home/Skills";
import { Education } from "@/components/home/Education";

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
          description="Hi, I’m Md Sihab Sharar Mazumder, a Computer Science and Engineering student currently studying at Dhaka International University."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait & Fast Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface shadow-glow">
              <Image
                src="/images/profile/sh1.jpeg"
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
                My Programming Journey
              </h3>
              <p>
                My path into programming started out of pure curiosity about how software works under the hood. What began as a casual interest slowly turned into a dedicated commitment to mastering both software development and algorithmic problem-solving. I spend a significant amount of time sharpening my logical thinking by solving problems on platforms like LeetCode, Codeforces, and CodeChef. Over time, I’ve transitioned from writing basic scripts to building structured, fully functional web applications and backend systems.
              </p>
              <h3 className="text-2xl font-bold text-primary">
                What I Enjoy Working On
              </h3>
              <p>
                I genuinely enjoy the creative and structural challenge of building for the web. Whether it's crafting smooth, responsive user interfaces or designing solid backend architectures and APIs, I like being involved in the full lifecycle of a project. I love taking an abstract concept or a problem statement and turning it into clean, reliable, and scalable code. For me, the most satisfying part of development is seeing everything come together seamlessly and knowing the system is built to perform.
              </p>
              <h3 className="text-2xl font-bold text-primary">
                Beyond the Code
              </h3>
              <p>
                When I step away from my screen and my IDE, I like to keep things balanced with a mix of creative outlets and active pursuits. I have a strong passion for creative writing and rapping, which gives me a fun way to experiment with rhythm, words, and storytelling. I also love exploring new things, continuously practicing and improving my English, and spending quiet, focused hours reading books in the library. On the physical side, you’ll often find me on the field playing cricket or football to stay energized and refreshed.

                I’ve found that all these experiences—whether it's the rhythm of a rhyme, the peaceful focus of a library, or the teamwork on a sports field—help me think more flexibly when I'm debugging or tackling complex logical problems.

                At my core, I'm someone who loves continuous learning, treats every project as a stepping stone to grow, and brings a grounded, creative energy to everything I do.
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
      <Education />



      <Skills />
      {/* Extra Action Buttons Placed Directly After Skills & Technologies Section */}
      <Container size="lg">
        <div className="pt-6 pb-10 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface/40 p-6 sm:p-8 rounded-2xl border border-border">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-primary">Want to explore more?</h3>
            <p className="text-xs sm:text-sm text-secondary">
              Check out my technical articles and curated development resources.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/articles" variant="outline" size="md">
              <BookOpen className="w-4 h-4" />
              <span>Read Articles</span>
            </Button>
            <Button href="/resources" variant="outline" size="md">
              <Compass className="w-4 h-4" />
              <span>View Resources</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
