import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, Terminal, Download } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getVerifiedSocialLinks } from "@/data/social-links";
import { SocialCard } from "@/components/social/SocialCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { techIconsData } from "@/data/tech-icons";

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
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-[1.08]">
                I&apos;m a {" "}
                <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-from-font">
                  MERN Stack
                </span>{" "} <br />
                Developer
              </h1>
              <p className="text-lg sm:text-xl text-secondary max-w-2xl leading-relaxed pt-2">
                Hi, I&apos;m {siteConfig.fullName}. {siteConfig.intro}
              </p>
            </div>

            {/* CTAs and Verified Socials */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="/projects" variant="primary" size="lg">
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                href={siteConfig.resumeUrl}
                variant="secondary"
                size="lg"
                download="Shihab_Sharar_CV.pdf"
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </div>

            {/* Verified Profiles Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3">
              <span className="text-xs font-mono text-secondary mr-1">Profiles:</span>
              {verifiedSocials.map((link) => (
                <SocialCard
                  key={link.platform}
                  link={link}
                  variant="icon-only"
                  className="min-w-[42px] min-h-[42px]"
                />
              ))}
            </div>
          </div>

          {/* Side Editorial Profile Card */}
          <div className="lg:col-span-4">
            <div className="relative w-full max-w-[400px] mx-auto px-2 py-4">
              <div className="relative w-full aspect-square">

                {/* Circular Orbit Ring */}
                <div className="absolute inset-[7%] rounded-full border border-accent/20" />

                {/* Animated Tech Stack with External Image Icons */}
                {techIconsData.map((tech, index, arr) => {
                  const angle = (index * 360) / arr.length;

                  return (
                    <div
                      key={tech.name}
                      title={tech.name}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      <div className="absolute left-1/2 top-[3%] -translate-x-1/2 -translate-y-1/2">
                        <div
                          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-surface shadow-glow animate-tech-float transition-transform duration-300 hover:scale-110"
                          style={{
                            animationDelay: `${index * -0.25}s`,
                            transform: `rotate(${-angle}deg)`,
                          }}
                        >
                          {/* w-full h-full এর বদলে এখানে fix size দিন */}
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                            <Image
                              src={tech.iconUrl}
                              alt={tech.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bigger Center Profile Picture */}
                <div className="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-accent/80 bg-surface-muted shadow-glow">
                  <Image
                    src="/images/profile/sh.png"
                    alt="Picture of Md Sihab Sharar"
                    fill
                    priority
                    sizes="(max-width: 768px) 62vw, 248px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Developer Label */}
              <p className="mt-10 text-center font-mono text-xs font-medium text-accent">
                MERN Stack Developer
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}