"use client";

import React from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { Lightbox } from "./Lightbox";
import type { ProjectScreenshot } from "@/types/project";

interface ProjectBannerProps {
  src: string;
  alt: string;
}

export function ProjectBanner({ src, alt }: ProjectBannerProps) {
  const [open, setOpen] = React.useState(false);
  const images: ProjectScreenshot[] = [{ src, alt }];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View the full project screenshot"
        className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 sm:p-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
            <Expand className="h-3.5 w-3.5" />
            View full screenshot
          </span>
        </span>
      </button>

      {open && (
        <Lightbox
          images={images}
          index={0}
          onClose={() => setOpen(false)}
          onChange={() => undefined}
          label="Project screenshot"
        />
      )}
    </>
  );
}
