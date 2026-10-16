import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function AboutPreview() {
  const milestones = [
    {
      period: "Current Phase",
      title: "MERN Stack & Full-Stack Applications",
      desc: "Building modern, full-stack web applications with React, Next.js, Express, Node.js, and MongoDB. Focusing on server components, interactive UI, and robust backend integrations.",
    },
    {
      period: "Mid Phase",
      title: "Java, Spring Boot & Backend API Development",
      desc: "Transitioned into object-oriented backend systems. Built structured RESTful APIs using Java and Spring Boot, mastering server-side architecture, validation, and database operations.",
    },
    {
      period: "Foundation Phase",
      title: "C, C++ & STL (Competitive Programming)",
      desc: "Started programming with C to understand low-level concepts, then mastered C++ and STL for algorithmic problem-solving on LeetCode, Codeforces, and CodeChef.",
    },
  ];

  return (
    <section className="py-20 border-t border-border/60">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-accent bg-accent-subtle border border-accent/20">
              <Compass className="w-3.5 h-3.5" />
              <span>Development Journey</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Driven by logic, balanced by creativity.
            </h2>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Hi, I&apos;m <span className="font-semibold text-primary">Md Sihab Sharar Mazumder</span>, a Computer Science student at Dhaka International University. My foundation started with C and C++ STL for competitive programming, expanded into backend API development with Java and Spring Boot, and is now actively growing in the MERN stack.
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              When I step away from code, I keep my mind sharp through creative writing, rapping, English practice, and quiet hours reading in the library—balanced with the active energy of playing cricket and football on the field.
            </p>

            <div className="pt-2">
              <Button href="/about" variant="outline" size="md">
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Milestone Timeline Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-6 shadow-glow">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span>Learning Milestones</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                {milestones.map((m) => (
                  <div key={m.title} className="relative pl-8 space-y-1">
                    <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-accent" />
                    <span className="text-xs font-mono text-accent uppercase tracking-wider">
                      {m.period}
                    </span>
                    <h4 className="text-base font-semibold text-primary">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}