"use client";

import React, { useEffect, useState } from "react";
import { TOCItem } from "@/lib/mdx";
import { List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm sticky top-24 shadow-sm">
      <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-primary mb-4 pb-2 border-b border-border/50">
        <List size={16} /> Table of Contents
      </div>
      <nav className="space-y-1.5 text-sm max-h-[70vh] overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(item.id);
                }
              }}
              className={cn(
                "group flex items-start gap-1.5 py-1 text-xs md:text-sm transition-all rounded-md px-2",
                item.level === 3 && "pl-5 text-xs",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted hover:text-foreground hover:bg-muted/10"
              )}
            >
              <ChevronRight
                size={14}
                className={cn(
                  "mt-0.5 shrink-0 transition-transform",
                  isActive ? "text-primary translate-x-0.5" : "opacity-0 group-hover:opacity-100 text-muted"
                )}
              />
              <span className="line-clamp-2">{item.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
