"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">Ilustrado Labs</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search tools..."
              className="pl-10 pr-4 py-1.5 bg-muted/20 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 lg:w-64 transition-all"
            />
          </div>
          <ThemeToggle />
          
          <button 
            className="md:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-border bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <Link href="/tools" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Tools</Link>
          <Link href="/blog" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link href="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-lg text-sm"
            />
          </div>
        </div>
      )}
    </header>
  );
}
