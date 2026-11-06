"use client";

import React from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";
import type { ProjectScreenshot } from "@/types/project";

interface ProjectGalleryProps {
  images: ProjectScreenshot[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => {
          const spansBoth =
            images.length === 1 ||
            (images.length % 2 === 1 && index === images.length - 1);

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open screenshot ${index + 1}${
                image.caption ? `: ${image.caption}` : ""
              }`}
              className={cn(
                "group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                spansBoth && "sm:col-span-2"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  spansBoth
                    ? "(min-width: 1024px) 900px, 100vw"
                    : "(min-width: 1024px) 450px, (min-width: 640px) 50vw, 100vw"
                }
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

              {image.caption && (
                <span className="absolute inset-x-0 bottom-0 p-4 text-left text-xs font-medium leading-relaxed text-white sm:p-5">
                  {image.caption}
                </span>
              )}

              <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white opacity-100 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <Expand className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
          label="Project screenshots"
        />
      )}
    </>
  );
}
