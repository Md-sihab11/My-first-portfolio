"use client";

import React from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreenshot } from "@/types/project";

interface LightboxProps {
  images: ProjectScreenshot[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
  label?: string;
}

export function Lightbox({
  images,
  index,
  onClose,
  onChange,
  label,
}: LightboxProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const onCloseRef = React.useRef(onClose);
  const onChangeRef = React.useRef(onChange);
  const countRef = React.useRef(images.length);
  const indexRef = React.useRef(index);

  onCloseRef.current = onClose;
  onChangeRef.current = onChange;
  countRef.current = images.length;
  indexRef.current = index;

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (countRef.current < 2) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const next =
          indexRef.current === 0
            ? countRef.current - 1
            : indexRef.current - 1;
        onChangeRef.current(next);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const next =
          indexRef.current === countRef.current - 1
            ? 0
            : indexRef.current + 1;
        onChangeRef.current(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (typeof document === "undefined") return null;

  const image = images[index];
  if (!image) return null;

  const hasMultiple = images.length > 1;

  const goToPrevious = () => {
    onChange(index === 0 ? images.length - 1 : index - 1);
  };

  const goToNext = () => {
    onChange(index === images.length - 1 ? 0 : index + 1);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ?? "Image preview"}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          {hasMultiple ? `${index + 1} / ${images.length}` : label ?? "Preview"}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close preview"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-14">
        {hasMultiple && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Native img keeps the full, uncropped source visible at any aspect ratio. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          onClick={(event) => event.stopPropagation()}
          className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-2xl"
        />

        {hasMultiple && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
            className="absolute right-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {image.caption && (
        <p className="mx-auto max-w-3xl px-6 pb-5 text-center text-xs leading-relaxed text-white/65">
          {image.caption}
        </p>
      )}
    </div>,
    document.body
  );
}
