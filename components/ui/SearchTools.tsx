"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, Command } from "lucide-react";
import { tools } from "@/data/tools";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchToolsProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function SearchTools({ placeholder = "Search tools...", className, inputClassName }: SearchToolsProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(tools.slice(0, 5));
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") {
      setResults(tools.slice(0, 5));
      return;
    }

    const filtered = tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "Enter" && results.length > 0) {
      router.push(`/tools/${results[0].slug}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all",
            inputClassName
          )}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-bold text-muted uppercase tracking-wider">
                  {query ? "Search Results" : "Popular Tools"}
                </div>
                {results.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <SearchIcon size={14} />
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm font-bold">{tool.name}</div>
                      <div className="text-xs text-muted line-clamp-1">{tool.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-muted mb-2">No tools found for &quot;{query}&quot;</div>
                <div className="text-xs text-muted">Try searching for something else</div>
              </div>
            )}
          </div>
          <div className="bg-muted/30 px-4 py-2 border-t border-border flex items-center justify-between text-[10px] text-muted">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-background border border-border rounded">ENTER</span>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-background border border-border rounded">ESC</span>
              <span>to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
