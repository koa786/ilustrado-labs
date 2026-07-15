import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = constructMetadata({
  title: "Blog - Insights & Tutorials",
  description: "Stay updated with the latest in web development, tool tutorials, and engineering insights from Ilustrado Labs.",
  canonical: "/blog",
});

export default function BlogPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Ilustrado <span className="gradient-text">Blog</span></h1>
          <p className="text-xl text-muted">Insights, tutorials, and updates from the Ilustrado Labs team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-all group">
                <div className="aspect-video bg-muted/20 mb-6 rounded-lg overflow-hidden relative">
                  <Image 
                    src={`https://picsum.photos/seed/${post.slug}/800/450`} 
                    alt={post.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs text-primary font-bold uppercase mb-2">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted text-sm line-clamp-3">{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
