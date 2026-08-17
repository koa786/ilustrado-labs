import { Container } from "@/components/layout/Container";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/mdx";
import { BlogSearchList } from "@/components/blog/BlogSearchList";

export const metadata: Metadata = constructMetadata({
  title: "Blog - Insights & Tutorials",
  description: "Explore in-depth technical guides, developer tools, JSON tutorials, and engineering best practices from Ilustrado Labs.",
  canonical: "/blog",
  rssFeed: "https://ilustradolabs.com/rss.xml",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Ilustrado <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            Scalable MDX tutorials, developer workflows, and privacy-first web tool insights.
          </p>
        </div>

        <BlogSearchList initialPosts={posts} categories={categories} />
      </Container>
    </div>
  );
}
