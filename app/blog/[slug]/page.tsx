import { Container } from "@/components/layout/Container";
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronLeft, ChevronRight, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Schema, generateBlogPostingSchema } from "@/components/ui/Schema";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/blog/TableOfContents";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Card } from "@/components/ui/Card";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return constructMetadata();

  return constructMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    canonical: `/blog/${post.slug}`,
    image: post.frontmatter.image,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const relatedPosts = getRelatedPosts(slug, 3);

  // Custom components map including inline TOC
  const components = {
    ...mdxComponents,
    Toc: () => <TableOfContents items={post.toc} />,
    TOC: () => <TableOfContents items={post.toc} />,
  };

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8 group font-medium"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted mb-4">
              <span className="bg-primary/10 border border-primary/20 text-primary font-bold uppercase px-3 py-1 rounded-full">
                {post.frontmatter.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readingTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User size={14} />
                {post.frontmatter.author}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-foreground">
              {post.frontmatter.title}
            </h1>

            <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
              {post.frontmatter.description}
            </p>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-card border border-border/80 text-muted px-2.5 py-1 rounded-lg"
                  >
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Hero Image */}
            <div className="aspect-video bg-muted/20 rounded-2xl overflow-hidden relative border border-border/80 shadow-md">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </header>

          {/* Main Layout Grid (Article + Floating TOC) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* MDX Article Body */}
            <article className="lg:col-span-8 prose prose-invert max-w-none text-foreground leading-relaxed">
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight],
                  },
                }}
              />
            </article>

            {/* Floating Sidebar Table of Contents */}
            <aside className="lg:col-span-4 hidden lg:block">
              <TableOfContents items={post.toc} />
            </aside>
          </div>

          {/* Author & Share Footer */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 bg-card/40 p-6 rounded-2xl border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-md">
                IL
              </div>
              <div>
                <div className="font-bold text-foreground">{post.frontmatter.author}</div>
                <div className="text-xs text-muted">
                  Building privacy-first, browser-native developer tools at Ilustrado Labs.
                </div>
              </div>
            </div>
          </div>

          {/* Requirement 12: Previous / Next Article Navigation */}
          <nav className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted mb-2 group-hover:text-primary transition-colors">
                  <ChevronLeft size={14} /> Previous Article
                </div>
                <div className="font-bold text-foreground line-clamp-2 text-base group-hover:text-primary transition-colors">
                  {prevPost.frontmatter.title}
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all group flex flex-col justify-between text-right sm:col-start-2"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs text-muted mb-2 group-hover:text-primary transition-colors">
                  Next Article <ChevronRight size={14} />
                </div>
                <div className="font-bold text-foreground line-clamp-2 text-base group-hover:text-primary transition-colors">
                  {nextPost.frontmatter.title}
                </div>
              </Link>
            )}
          </nav>

          {/* Requirement 13: Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-border space-y-8">
              <div className="flex items-center gap-2 text-xl font-bold text-foreground">
                <Sparkles className="w-5 h-5 text-primary" /> Related Articles
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relPost) => (
                  <Link key={relPost.slug} href={`/blog/${relPost.slug}`}>
                    <Card className="h-full hover:border-primary/50 transition-all group border-border/80 flex flex-col p-4">
                      <div className="aspect-video bg-muted/20 rounded-xl overflow-hidden relative mb-4">
                        <Image
                          src={relPost.frontmatter.image}
                          alt={relPost.frontmatter.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-xs text-primary font-bold uppercase mb-1">
                        {relPost.frontmatter.category}
                      </div>
                      <h3 className="font-bold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {relPost.frontmatter.title}
                      </h3>
                      <p className="text-muted text-xs line-clamp-2 mb-4">
                        {relPost.frontmatter.description}
                      </p>
                      <div className="mt-auto text-[11px] text-muted flex items-center justify-between pt-2 border-t border-border/50">
                        <span>{relPost.readingTime}</span>
                        <span className="text-primary font-medium flex items-center">
                          Read <ChevronRight size={12} />
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>

      {/* Requirement 8: JSON-LD BlogPosting Schema */}
      <Schema
        data={generateBlogPostingSchema({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          datePublished: post.frontmatter.date,
          authorName: post.frontmatter.author,
          url: `https://ilustradolabs.com/blog/${post.slug}`,
          image: post.frontmatter.image,
        })}
      />
    </div>
  );
}
