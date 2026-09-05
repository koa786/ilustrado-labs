"use client";

import React, { useState, useMemo } from "react";
import { BlogPost } from "@/lib/mdx";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Calendar, Tag, ArrowRight, Sparkles } from "lucide-react";

interface BlogSearchListProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function BlogSearchList({ initialPosts, categories }: BlogSearchListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPosts = useMemo(() => {
    return initialPosts.filter((p) => p.frontmatter.featured).slice(0, 2);
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.frontmatter.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = post.frontmatter.title.toLowerCase().includes(q);
      const descMatch = post.frontmatter.description.toLowerCase().includes(q);
      const catMatch = post.frontmatter.category.toLowerCase().includes(q);
      const tagMatch = post.frontmatter.tags.some((t) => t.toLowerCase().includes(q));
      const contentMatch = post.content.toLowerCase().includes(q);

      return matchesCategory && (titleMatch || descMatch || catMatch || tagMatch || contentMatch);
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Search Bar & Category Pills */}
      <div className="space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search all MDX articles, topics, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground bg-muted/20 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "All"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-card border border-border/80 text-muted hover:text-foreground hover:border-primary/50"
            }`}
          >
            All Posts ({initialPosts.length})
          </button>
          {categories.map((cat) => {
            const count = initialPosts.filter((p) => p.frontmatter.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-card border border-border/80 text-muted hover:text-foreground hover:border-primary/50"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Section (show only when no active search & 'All' selected) */}
      {!searchQuery && selectedCategory === "All" && featuredPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
            <Sparkles className="w-4 h-4" /> Featured Articles
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:border-primary/60 transition-all group overflow-hidden border-border/80 flex flex-col">
                  <div className="aspect-video bg-muted/20 relative overflow-hidden">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.imageAlt || post.frontmatter.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Featured
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted mb-3">
                        <span className="text-primary font-bold uppercase">{post.frontmatter.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {post.readingTime}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-muted text-sm line-clamp-3 mb-4">{post.frontmatter.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-primary font-semibold group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Blog Grid */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border/80 rounded-2xl">
            <p className="text-xl font-semibold mb-2">No articles found</p>
            <p className="text-muted text-sm mb-6">Try searching for a different keyword or category.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:border-primary/50 transition-all group border-border/80 flex flex-col">
                  <div className="aspect-video bg-muted/20 rounded-t-xl overflow-hidden relative">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.imageAlt || post.frontmatter.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted mb-3">
                        <span className="text-primary font-bold uppercase">{post.frontmatter.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {post.readingTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-muted text-sm line-clamp-3 mb-4">{post.frontmatter.description}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/50">
                      {/* Tags */}
                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 text-[11px] bg-muted/15 border border-border/50 text-muted px-2 py-0.5 rounded-md"
                            >
                              <Tag className="w-2.5 h-2.5" /> {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>
                          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                          Read <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
