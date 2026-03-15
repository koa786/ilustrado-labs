import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { id: 1, title: "10 Essential Developer Tools for 2026", slug: "essential-tools-2026", date: "Mar 15, 2026", excerpt: "Discover the must-have tools that every modern developer should have in their arsenal." },
    { id: 2, title: "Mastering JSON: Tips and Tricks", slug: "mastering-json", date: "Mar 12, 2026", excerpt: "Learn how to handle complex JSON structures and optimize your data processing workflow." },
    { id: 3, title: "The Importance of Client-Side Processing", slug: "client-side-processing", date: "Mar 10, 2026", excerpt: "Why processing data in the browser is better for privacy, speed, and security." },
    { id: 4, title: "Understanding Regular Expressions", slug: "understanding-regex", date: "Mar 08, 2026", excerpt: "A comprehensive guide to mastering regex for everyday development tasks." },
    { id: 5, title: "Secure Password Management", slug: "secure-passwords", date: "Mar 05, 2026", excerpt: "How to generate and manage secure passwords in the age of cyber threats." },
  ];

  return (
    <div className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Ilustrado <span className="gradient-text">Blog</span></h1>
          <p className="text-xl text-muted">Insights, tutorials, and updates from the Ilustrado Labs team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-all group">
                <div className="aspect-video bg-muted/20 mb-6 rounded-lg overflow-hidden">
                  <img src={`https://picsum.photos/seed/${post.slug}/800/450`} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-xs text-primary font-bold uppercase mb-2">{post.date}</div>
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
