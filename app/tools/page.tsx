"use client";

import { useState } from "react";
import { tools, categories } from "@/data/tools";
import { Container } from "@/components/layout/Container";
import { GlassCard, GradientBorder } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import * as Icons from "lucide-react";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Developer Tools</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Browse our collection of 20+ browser-based utilities designed to make your development life easier.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search tools by name or description..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Icons.Code;
              return (
                <Link key={tool.id} href={`/tools/${tool.slug}`}>
                  <GradientBorder className="h-full hover:shadow-primary/10 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                        <p className="text-sm text-muted line-clamp-2">{tool.description}</p>
                      </div>
                    </div>
                  </GradientBorder>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 text-muted mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted mb-6">We couldn&apos;t find any tools matching your search criteria.</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
              Clear all filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
