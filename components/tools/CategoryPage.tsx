import { Category, tools } from "@/data/tools";
import { Container } from "@/components/layout/Container";
import { GlassCard, GradientBorder } from "@/components/ui/Card";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

interface CategoryPageProps {
  category: Category;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const Icon = (Icons as any)[category.icon] || Icons.Folder;
  const categoryTools = tools.filter((t) => t.category === category.id);

  return (
    <div className="space-y-16">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="p-6 rounded-3xl bg-primary/10 text-primary">
          <Icon size={64} />
        </div>
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-muted max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => {
            const TIcon = (Icons as any)[tool.icon] || Icons.Code;
            return (
              <Link key={tool.id} href={`/tools/${tool.slug}`}>
                <GradientBorder className="h-full hover:shadow-primary/10 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <TIcon size={24} />
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

      {/* SEO Content Hub */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Mastering {category.name}</h2>
          <div className="prose prose-invert max-w-none text-muted leading-relaxed space-y-6">
            <p>{category.longDescription}</p>
            
            <h3 className="text-2xl font-bold text-foreground mt-8">Why use our {category.name}?</h3>
            <p>
              At Ilustrado Labs, we prioritize performance and privacy. Our {category.name.toLowerCase()} are built using modern web technologies that allow all processing to happen directly in your browser. This means your data never leaves your machine, providing a secure environment for even the most sensitive tasks.
            </p>
            
            <h3 className="text-2xl font-bold text-foreground mt-8">Getting Started</h3>
            <p>
              Simply select any tool from the list above to get started. Each tool is designed with a clean, intuitive interface that works seamlessly on both desktop and mobile devices. Whether you&apos;re a professional developer or someone looking to perform a quick task, our tools are here to help you work smarter, not harder.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold mb-6">Need something else?</h2>
        <Link href="/tools">
          <Button variant="secondary" className="flex items-center gap-2 mx-auto">
            Browse all categories <ArrowRight size={18} />
          </Button>
        </Link>
      </section>
    </div>
  );
}

function Button({ children, variant, className }: any) {
  return (
    <div className={`px-6 py-3 rounded-xl font-bold transition-all ${variant === 'secondary' ? 'bg-muted/20 hover:bg-muted/30 border border-border' : 'bg-primary hover:bg-primary/90 text-white'} ${className}`}>
      {children}
    </div>
  );
}
