import { tools, categories } from "@/data/tools";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Schema, generateSoftwareAppSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/components/ui/Schema";
import { ToolPageClient } from "@/components/tools/ToolPageClient";
import { CategoryPage } from "@/components/tools/CategoryPage";
import { constructMetadata } from "@/lib/seo";
import { getPostBySlug } from "@/lib/mdx";
import { Metadata } from "next";

export async function generateStaticParams() {
  const toolParams = tools.map((tool) => ({
    slug: tool.slug,
  }));
  const categoryParams = categories.map((cat) => ({
    slug: cat.slug,
  }));
  return [...toolParams, ...categoryParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  const category = categories.find((c) => c.slug === slug);

  if (tool) {
    return constructMetadata({
      title: tool.name,
      description: tool.metaDescription || tool.description,
      canonical: `/tools/${tool.slug}`,
    });
  }

  if (category) {
    return constructMetadata({
      title: category.name,
      description: category.description,
      canonical: `/tools/${category.slug}`,
    });
  }

  return constructMetadata();
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  const category = categories.find((c) => c.slug === slug);

  if (!tool && !category) {
    notFound();
  }

  if (category) {
    const breadcrumbItems = [
      { label: "Tools", href: "/tools" },
      { label: category.name, href: `/tools/${category.slug}` },
    ];

    return (
      <div className="py-12">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <CategoryPage category={category} />
          <Schema data={generateBreadcrumbSchema(breadcrumbItems)} />
        </Container>
      </div>
    );
  }

  if (tool) {
    const categoryObj = categories.find((c) => c.id === tool.category);
    const breadcrumbItems = [
      { label: "Tools", href: "/tools" },
      ...(categoryObj ? [{ label: categoryObj.name, href: `/tools/${categoryObj.slug}` }] : []),
      { label: tool.name, href: `/tools/${tool.slug}` },
    ];

    // Resolve related guide slugs server-side (getPostBySlug reads the
    // filesystem, which can't happen inside the "use client" ToolPageClient).
    // Missing or invalid slugs are silently skipped, not an error.
    const relatedGuides = (tool.relatedGuideSlugs ?? [])
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post));

    return (
      <div className="py-12">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
            <div className="flex-grow">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{tool.pageHeading || tool.name}</h1>
              <p className="text-xl text-muted max-w-3xl">{tool.intro || tool.description}</p>
            </div>
          </div>
          <ToolPageClient tool={tool} relatedGuides={relatedGuides} />
          
          {/* Structured Data */}
          <Schema data={generateSoftwareAppSchema(tool)} />
          <Schema data={generateBreadcrumbSchema(breadcrumbItems)} />
          {tool.faqs && <Schema data={generateFAQSchema(tool.faqs)} />}
        </Container>
      </div>
    );
  }

  return null;
}
