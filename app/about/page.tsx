import { Container } from "@/components/layout/Container";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "About Us",
  description: "Learn about Ilustrado Labs' mission to build fast, privacy-first, browser-based developer tools.",
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">About <span className="gradient-text">Ilustrado Labs</span></h1>
          <div className="prose prose-invert prose-lg max-w-none text-muted space-y-6">
            <p>
              Ilustrado Labs was founded with a simple mission: to build the best, most comprehensive suite of developer tools on the web.
            </p>
            <p>
              We know that developers spend a significant portion of their day performing repetitive tasks like formatting data, converting units, or generating placeholder content. 
              Our goal is to make these tasks as seamless and fast as possible.
            </p>
            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Our Philosophy</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Privacy First:</strong> Your data belongs to you. All our tools run entirely in your browser.</li>
              <li><strong>Performance:</strong> We use modern web technologies to ensure our tools are lightning fast.</li>
              <li><strong>Simplicity:</strong> Great tools should be intuitive and easy to use. No complex configurations required.</li>
              <li><strong>Community:</strong> We build for developers, by developers. Your feedback drives our roadmap.</li>
            </ul>
            <p className="mt-12">
              Thank you for using Ilustrado Labs. We&apos;re excited to be a part of your development journey.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
