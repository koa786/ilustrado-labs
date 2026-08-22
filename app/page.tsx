import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, GlassCard, GradientBorder } from "@/components/ui/Card";
import { tools, categories } from "@/data/tools";
import { iconMap } from "@/lib/icons";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import Image from "next/image";
import { SearchTools } from "@/components/ui/SearchTools";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Ilustrado Labs - Free Developer Tools & Utilities",
  description: "High-performance, browser-based developer tools. JSON formatter, Regex tester, Base64 encoder, and more. 100% private and secure.",
  canonical: "/",
});

export default function HomePage() {
  const featuredTools = tools.slice(0, 6);
  
  const blogPosts = [
    { id: 1, title: "10 Essential Developer Tools for 2026", slug: "essential-tools-2026", date: "Mar 15, 2026", excerpt: "Discover the must-have tools that every modern developer should have in their arsenal." },
    { id: 2, title: "Mastering JSON: Tips and Tricks", slug: "mastering-json", date: "Mar 12, 2026", excerpt: "Learn how to handle complex JSON structures and optimize your data processing workflow." },
    { id: 3, title: "The Importance of Client-Side Processing", slug: "client-side-processing", date: "Mar 10, 2026", excerpt: "Why processing data in the browser is better for privacy, speed, and security." },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            The Ultimate <span className="gradient-text">Developer Toolbox</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Free, fast, and secure browser-based tools for modern developers. 
            No data ever leaves your machine.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools">
              <Button size="lg" className="w-full sm:w-auto flex items-center gap-2">
                Explore All Tools <ArrowRight size={18} />
              </Button>
            </Link>
            <SearchTools 
              placeholder="Search 20+ tools..." 
              className="w-full sm:w-80"
              inputClassName="py-3.5 pl-12 pr-4 rounded-xl shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-muted text-sm">All tools run client-side in your browser for instant results without server latency.</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
          <p className="text-muted text-sm">Your data never leaves your computer. We don&apos;t store or see any of your inputs.</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Open Source</h3>
          <p className="text-muted text-sm">Built with modern web technologies and completely free to use for everyone.</p>
        </GlassCard>
      </section>

      {/* Featured Tools */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
            <p className="text-muted">Most popular utilities used by developers daily.</p>
          </div>
          <Link href="/tools" className="text-primary font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => {
            const Icon = iconMap[tool.icon] || iconMap.Code;
            return (
              <Link key={tool.id} href={`/tools/${tool.slug}`}>
                <GradientBorder className="h-full hover:shadow-primary/10 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
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
      </section>

      {/* Category Grid */}
      <section className="bg-muted/5 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || iconMap.Folder;
              return (
                <Link key={cat.id} href={`/tools/${cat.slug}`}>
                  <GlassCard className="flex flex-col items-center justify-center gap-4 p-6 h-full hover:bg-primary/5 hover:border-primary/30 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon size={32} className="text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-bold text-sm text-center">{cat.name}</span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest from Blog</h2>
            <p className="text-muted">Tips, tricks, and tutorials for developers.</p>
          </div>
          <Link href="/blog" className="text-primary font-medium hover:underline flex items-center gap-1">
            Read blog <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="p-0 overflow-hidden group h-full">
                <div className="aspect-video bg-muted/20 relative">
                  <Image 
                    src={`https://picsum.photos/seed/${post.slug}/800/450`} 
                    alt={post.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Development</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <GradientBorder className="text-center py-16">
          <h2 className="text-4xl font-bold mb-6">Ready to speed up your workflow?</h2>
          <p className="text-lg text-muted max-w-xl mx-auto mb-10">
            Join thousands of developers using Ilustrado Labs every day to build better software faster.
          </p>
          <Link href="/tools">
            <Button size="lg">
              Get Started for Free
            </Button>
          </Link>
        </GradientBorder>
      </section>
    </div>
  );
}
