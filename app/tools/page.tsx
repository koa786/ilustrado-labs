import { Container } from "@/components/layout/Container";
import { ToolsDirectoryClient } from "@/components/tools/ToolsDirectoryClient";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GlassCard } from "@/components/ui/Card";

export const metadata: Metadata = constructMetadata({
  title: "Developer Tools Directory",
  description: "Explore our comprehensive collection of free, browser-based developer tools. From JSON formatting to security utilities, find everything you need in one place.",
  canonical: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="py-12">
      <Container>
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }]} />
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Developer Tools Directory</h1>
          <div className="prose prose-invert max-w-none text-muted leading-relaxed">
            <p className="text-xl">
              Welcome to the Ilustrado Labs tools directory. We provide a growing collection of high-performance, browser-based utilities designed specifically for modern developers and engineers. 
              Our mission is to provide essential tools that are not only fast and easy to use but also prioritize your privacy and security.
            </p>
            <p className="mt-4">
              Every tool on our platform runs entirely on the client side. This means that when you format a JSON file, test a regular expression, or generate a secure password, 
              your data never leaves your computer. We use the latest Web APIs to ensure that all processing is handled locally, providing you with instant results without the need for server-side roundtrips.
            </p>
            <p className="mt-4">
              Browse through our categories below to find the tools you need. From text manipulation and encoding to security and code optimization, 
              Ilustrado Labs is your one-stop shop for daily development tasks. We are constantly adding new tools based on community feedback, 
              so check back often for new additions to our toolbox.
            </p>
          </div>
        </div>

        <ToolsDirectoryClient />

        {/* SEO Content Hub Section */}
        <div className="mt-32 space-y-16">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Ilustrado Labs?</h2>
              <div className="space-y-4 text-muted">
                <p>
                  In a world where data privacy is increasingly under threat, we believe that developer tools should be safe by design. Many online utilities send your input to their servers for processing, which can expose sensitive API keys, passwords, or proprietary code.
                </p>
                <p>
                  Ilustrado Labs takes a different approach. By leveraging the power of modern browsers, we move the computation to your machine. This not only makes our tools faster but also fundamentally more secure.
                </p>
              </div>
            </div>
            <GlassCard className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">✓</div>
                  <div>
                    <span className="font-bold block">100% Client-Side</span>
                    <span className="text-sm text-muted">No data is ever sent to our servers. Your privacy is guaranteed.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">✓</div>
                  <div>
                    <span className="font-bold block">Lightning Fast</span>
                    <span className="text-sm text-muted">Instant results with zero latency, even for large datasets.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">✓</div>
                  <div>
                    <span className="font-bold block">Completely Free</span>
                    <span className="text-sm text-muted">All our tools are free to use, forever. No hidden costs or limits.</span>
                  </div>
                </li>
              </ul>
            </GlassCard>
          </section>
        </div>
      </Container>
    </div>
  );
}
