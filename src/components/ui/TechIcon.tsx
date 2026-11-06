import Image from "next/image";
import {
  Binary,
  Boxes,
  Code2,
  Database,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { SkillIconKey } from "@/data/skills";
import { cn } from "@/lib/utils";

const fallbackIcons = {
  code: Code2,
  server: Server,
  database: Database,
  shield: ShieldCheck,
  binary: Binary,
  layers: Layers,
  sparkles: Sparkles,
  wrench: Wrench,
  component: Boxes,
} satisfies Record<SkillIconKey, typeof Code2>;

interface TechIconProps {
  name: string;
  iconUrl?: string;
  icon?: SkillIconKey;
  size?: "sm" | "md";
  variant?: "chip" | "bare";
  /** Invert a dark, monochrome brand mark when the dark theme is active. */
  invertOnDark?: boolean;
  /** Hide the icon from assistive tech when the name is visible next to it. */
  decorative?: boolean;
  className?: string;
}

export function TechIcon({
  name,
  iconUrl,
  icon = "code",
  size = "md",
  variant = "chip",
  invertOnDark = false,
  decorative = false,
  className,
}: TechIconProps) {
  const Icon = fallbackIcons[icon];
  const isBare = variant === "bare";

  return (
    <span
      aria-hidden={decorative || undefined}
      className={cn(
        "flex shrink-0 items-center justify-center",
        isBare
          ? size === "sm"
            ? "h-5 w-5"
            : "h-6 w-6"
          : cn(
              "rounded-md border border-border/70 bg-white shadow-sm",
              size === "sm" ? "h-5 w-5 p-0.5" : "h-7 w-7 p-1"
            ),
        className
      )}
    >
      {iconUrl ? (
        <Image
          src={iconUrl}
          alt=""
          width={18}
          height={18}
          className={cn(
            "h-full w-full object-contain",
            invertOnDark && isBare && "dark:invert"
          )}
          aria-hidden="true"
        />
      ) : (
        <Icon
          className={cn(
            "text-accent",
            isBare
              ? size === "sm"
                ? "h-3.5 w-3.5"
                : "h-4 w-4"
              : size === "sm"
                ? "h-3 w-3"
                : "h-3.5 w-3.5"
          )}
          aria-hidden="true"
        />
      )}
      {!decorative && <span className="sr-only">{name}</span>}
    </span>
  );
}
