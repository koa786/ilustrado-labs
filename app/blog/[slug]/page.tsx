import { Container } from "@/components/layout/Container";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-12">
            <ArrowLeft size={16} /> Back to blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted mb-6">
              <span className="flex items-center gap-1"><User size={14} /> Ilustrado Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
              <span>•</span>
              <span className="text-primary font-semibold">Development</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Mastering the Art of Developer Productivity</h1>
            <div className="aspect-video bg-muted/20 rounded-2xl overflow-hidden mb-12">
              <img src={`https://picsum.photos/seed/${slug}/1200/675`} alt="Blog post hero" className="object-cover w-full h-full" />
            </div>
          </header>

          <article className="prose prose-invert max-w-none prose-lg">
            <p className="lead text-xl text-muted mb-8">
              In today&apos;s fast-paced development world, productivity isn&apos;t just about typing faster—it&apos;s about working smarter. 
              Using the right tools at the right time can save hours of frustration.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">The Power of Browser-Based Tools</h2>
            <p>
              One of the biggest shifts in recent years is the move towards browser-based utilities. 
              Gone are the days when you needed to install a heavy desktop application just to format a JSON file or check a regex pattern. 
              Modern web technologies allow us to build complex, high-performance tools that run entirely on the client side.
            </p>

            <div className="my-12 p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Try our JSON Formatter</h3>
              <p className="mb-6">Clean up your messy JSON data in seconds with our free tool.</p>
              <Button size="lg">
                <Link href="/tools/json-formatter">Open JSON Formatter</Link>
              </Button>
            </div>

            <p>
              At Ilustrado Labs, we believe that developers should have access to a comprehensive suite of tools that are not only powerful but also respect their privacy. 
              By running everything in the browser, we ensure that your sensitive code and data never leave your machine.
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-4">Security First</h3>
            <p>
              Security is paramount. When you use a third-party tool to generate a password or a UUID, you need to be certain that the generator is truly random and that the result isn&apos;t being logged. 
              Our platform uses standard Web APIs like <code>crypto.getRandomValues()</code> to ensure high-quality entropy for all our generators.
            </p>

            <blockquote className="border-l-4 border-primary pl-6 italic text-xl my-12">
              &quot;The best tool is the one that&apos;s there when you need it, works instantly, and doesn&apos;t get in your way.&quot;
            </blockquote>

            <p>
              We are constantly adding new tools to our platform. Our goal is to become the go-to resource for every developer&apos;s daily tasks. 
              From text manipulation to network utilities, Ilustrado Labs is building the future of developer productivity.
            </p>
          </article>

          <div className="mt-20 pt-12 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted/20" />
              <div>
                <div className="font-bold">Ilustrado Team</div>
                <div className="text-sm text-muted">Building tools for the next generation of developers.</div>
              </div>
            </div>
            <Button variant="secondary" className="flex items-center gap-2">
              <Share2 size={16} /> Share Post
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
