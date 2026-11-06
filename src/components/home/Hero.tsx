import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anton, Poppins } from "next/font/google";
import { siteConfig } from "@/data/site";
import { getVerifiedSocialLinks } from "@/data/social-links";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const poppins = Poppins({ weight: ["500", "600", "700"], subsets: ["latin"], display: "swap" });

/* Entrance order: glow → eyebrow lines → headline reveal → portrait rise → buttons → profiles.
   After the intro: slow glow breathing, portrait float, CTA glow pulse. */
const heroStyles = `
@keyframes heroFade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes heroLine{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
@keyframes heroTitle{
  from{opacity:0;transform:translateY(34px);clip-path:inset(0 -10% 100% -10%)}
  to{opacity:1;transform:none;clip-path:inset(-30% -10% -30% -10%)}
}
@keyframes heroPortrait{from{opacity:0;transform:translateY(44px) scale(1.04)}to{opacity:1;transform:none}}
@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes heroGlowIn{from{opacity:0}to{opacity:.8}}
@keyframes heroGlow{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
@keyframes heroPulse{
  0%,100%{box-shadow:0 0 30px -4px rgba(255,110,40,.55),inset 0 1px 0 rgba(255,255,255,.35)}
  50%{box-shadow:0 0 46px -2px rgba(255,110,40,.85),inset 0 1px 0 rgba(255,255,255,.35)}
}
.hero-glow{transform-origin:0% 47%;animation:heroGlowIn 1.6s ease-out both,heroGlow 6s ease-in-out 1.6s infinite}
.hero-eyebrow{animation:heroFade .8s cubic-bezier(.22,.68,.35,1) .05s both}
.hero-line-l{transform-origin:right center;animation:heroLine .9s cubic-bezier(.22,.68,.35,1) .15s both}
.hero-line-r{transform-origin:left center;animation:heroLine .9s cubic-bezier(.22,.68,.35,1) .15s both}
.hero-title{animation:heroTitle 1.1s cubic-bezier(.22,.68,.35,1) .25s both}
.hero-portrait{animation:heroPortrait 1.2s cubic-bezier(.22,.68,.35,1) .5s both,heroFloat 8s ease-in-out 1.9s infinite}
.hero-cta1{animation:heroFade .8s cubic-bezier(.22,.68,.35,1) .95s both,heroPulse 3.6s ease-in-out 2s infinite}
.hero-cta2{animation:heroFade .8s cubic-bezier(.22,.68,.35,1) 1.07s both}
.hero-prof{animation:heroFade .7s cubic-bezier(.22,.68,.35,1) both;animation-delay:calc(1.25s + var(--i) * .08s)}
@media (prefers-reduced-motion:reduce){
  .hero-glow,.hero-eyebrow,.hero-line-l,.hero-line-r,.hero-title,.hero-portrait,.hero-cta1,.hero-cta2,.hero-prof{animation:none}
}
`;

/* Fade the suit into the black background just above the buttons. */
const portraitMask = "linear-gradient(to bottom, #000 0%, #000 74%, transparent 97%)";

const PROFILE_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  codeforces: "Codeforces",
  leetcode: "LeetCode",
  hackerrank: "HackerRank",
};
const PROFILE_ORDER = Object.keys(PROFILE_LABELS);
const rank = (key: string) => {
  const i = PROFILE_ORDER.indexOf(key);
  return i === -1 ? 99 : i;
};

export function Hero() {
  const profiles = getVerifiedSocialLinks()
    .map((link) => {
      const key = String(link.platform).toLowerCase();
      const l = link as unknown as { url?: string; href?: string };
      return { key, label: PROFILE_LABELS[key] ?? String(link.platform), href: l.url ?? l.href ?? "#" };
    })
    .sort((a, b) => rank(a.key) - rank(b.key));

  return (
    <section
      className={`${poppins.className} relative aspect-[1024/572] min-h-[560px] w-full overflow-hidden bg-[#040302]`}
    >
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />

      {/* ── Backdrop: pure black + hot orange glow on the left edge ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute inset-0 bg-[radial-gradient(ellipse_22%_36%_at_0%_47%,rgba(255,112,10,0.95)_0%,rgba(255,84,0,0.5)_38%,rgba(255,70,0,0.12)_72%,transparent_100%)]" />
      </div>

      {/* ── Eyebrow ─────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-[5.8%] z-10 flex items-center justify-center gap-[1.2vw]">
        <span
          aria-hidden="true"
          className="hero-line-l h-[1.5px] w-[clamp(2rem,20vw,22rem)] bg-gradient-to-r from-transparent to-[#ff7a2e]"
        />
        <span className="hero-eyebrow text-[clamp(0.85rem,1.95vw,1.5rem)] font-bold uppercase tracking-[0.05em] text-white">
          Software Developer
        </span>
        <span
          aria-hidden="true"
          className="hero-line-r h-[1.5px] w-[clamp(2rem,20vw,22rem)] bg-gradient-to-l from-transparent to-[#ff7a2e]"
        />
      </div>

      {/* ── Headline (behind the portrait) ──────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-[49.5%] z-[1] -translate-y-1/2">
        <div className="[transform:scaleY(1.31)]">
          <h1
            className={`${anton.className} hero-title whitespace-nowrap bg-[linear-gradient(180deg,#f58b3f_0%,#ee6a2c_50%,#d6431f_100%)] bg-clip-text text-center text-[15vw] leading-[0.86] text-transparent drop-shadow-[0_0_40px_rgba(255,100,20,0.22)]`}
          >
            <span className="sr-only">Md Sihab Sharar — </span>
            BUILD DIFFERENT
          </h1>
        </div>
      </div>

      {/* ── Portrait (in front of the headline) ─────────────────── */}
      <div className="absolute left-1/2 top-[12%] z-10 aspect-[1195/896] w-[88%] -translate-x-1/2 md:w-[55%]">
        <div className="hero-portrait relative h-full w-full">
          <Image
            src="/images/profile/hero-reference.png"
            alt="Picture of Md Sihab Sharar"
            fill
            priority
            sizes="(max-width: 768px) 88vw, 55vw"
            className="object-contain"
            style={{ maskImage: portraitMask, WebkitMaskImage: portraitMask }}
          />
        </div>
      </div>

      {/* ── Buttons ─────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-[80%] z-20 flex items-center justify-center gap-[1.8vw] sm:gap-[1.6vw]">
        <Link
          href="/projects"
          className="hero-cta1 inline-flex h-[clamp(44px,4.9vw,56px)] items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#ff8f45_0%,#f0601f_100%)] px-[clamp(1.25rem,2.2vw,1.75rem)] text-[clamp(0.9rem,1.7vw,1.15rem)] font-semibold text-[#24100a] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a2e]"
        >
          Explore Projects
        </Link>

        <a
          href={siteConfig.resumeUrl}
          download="Shihab_Sharar_CV.pdf"
          className="hero-cta2 inline-flex h-[clamp(44px,4.9vw,56px)] items-center justify-center rounded-[10px] border border-[#ffb27a]/35 bg-[#0d0a08] px-[clamp(1.25rem,2.2vw,1.75rem)] text-[clamp(0.9rem,1.7vw,1.15rem)] font-semibold text-white transition hover:border-[#ffb27a]/70 hover:bg-[#1a120d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb27a]"
        >
          Download CV
        </a>
      </div>

      {/* ── Profiles row ────────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-[92.2%] z-20 flex flex-wrap items-center justify-center gap-x-[0.5em] px-4 text-[clamp(0.7rem,1.45vw,1rem)] font-medium">
        <span
          className="hero-prof mr-[0.2em] font-bold tracking-[0.02em] text-[#d9773a]"
          style={{ "--i": 0 } as CSSProperties}
        >
          PROFILES:
        </span>
        {profiles.map((p, i) => (
          <Fragment key={p.key}>
            <span
              className="hero-prof inline-flex items-center gap-[0.5em]"
              style={{ "--i": i + 1 } as CSSProperties}
            >
              {i > 0 && (
                <span aria-hidden="true" className="text-white/50">
                  ·
                </span>
              )}
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ece6e0] transition hover:text-[#ff9a52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9a52]"
              >
                {p.label}
              </a>
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}