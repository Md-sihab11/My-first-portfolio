"use client";

import React, { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split("\n");
    const extracted: HeadingItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        extracted.push({ id, text, level });
      }
    });

    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="p-5 rounded-xl border border-border bg-surface space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
        <ListOrdered className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-1.5 text-xs">
        {headings.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "pl-3 text-secondary-muted" : "text-secondary"}
          >
            <a
              href={`#${item.id}`}
              className="hover:text-accent transition-colors block py-0.5"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
