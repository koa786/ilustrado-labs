"use client";

import { tools } from "@/data/tools";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowLeft, Share2, Star, Info, HelpCircle } from "lucide-react";
import React, { useState, useMemo, use } from "react";

// Tool Implementations
import { TextDiffTool } from "@/components/tools/TextDiffTool";
import { JsonFormatterTool } from "@/components/tools/JsonFormatterTool";
import { JsonValidatorTool } from "@/components/tools/JsonValidatorTool";
import { Base64Tool } from "@/components/tools/Base64Tool";
import { UrlCodecTool } from "@/components/tools/UrlCodecTool";
import { WordCounterTool } from "@/components/tools/WordCounterTool";
import { CaseConverterTool } from "@/components/tools/CaseConverterTool";
import { PasswordGenTool } from "@/components/tools/PasswordGenTool";
import { UuidGenTool } from "@/components/tools/UuidGenTool";
import { TimestampTool } from "@/components/tools/TimestampTool";
import { MarkdownTool } from "@/components/tools/MarkdownTool";
import { HtmlMinifyTool } from "@/components/tools/HtmlMinifyTool";
import { CssMinifyTool } from "@/components/tools/CssMinifyTool";
import { JsMinifyTool } from "@/components/tools/JsMinifyTool";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";
import { ColorConvTool } from "@/components/tools/ColorConvTool";
import { SlugGenTool } from "@/components/tools/SlugGenTool";
import { TextSorterTool } from "@/components/tools/TextSorterTool";
import { DeduplicatorTool } from "@/components/tools/DeduplicatorTool";
import { LoremIpsumTool } from "@/components/tools/LoremIpsumTool";

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const Icon = (Icons as any)[tool.icon] || Icons.Code;

  const renderTool = () => {
    switch (tool.id) {
      case "text-diff": return <TextDiffTool />;
      case "json-formatter": return <JsonFormatterTool />;
      case "json-validator": return <JsonValidatorTool />;
      case "base64": return <Base64Tool />;
      case "url-codec": return <UrlCodecTool />;
      case "word-counter": return <WordCounterTool />;
      case "case-converter": return <CaseConverterTool />;
      case "password-gen": return <PasswordGenTool />;
      case "uuid-gen": return <UuidGenTool />;
      case "timestamp": return <TimestampTool />;
      case "markdown": return <MarkdownTool />;
      case "html-minify": return <HtmlMinifyTool />;
      case "css-minify": return <CssMinifyTool />;
      case "js-minify": return <JsMinifyTool />;
      case "regex-tester": return <RegexTesterTool />;
      case "color-conv": return <ColorConvTool />;
      case "slug-gen": return <SlugGenTool />;
      case "text-sorter": return <TextSorterTool />;
      case "deduplicator": return <DeduplicatorTool />;
      case "lorem-ipsum": return <LoremIpsumTool />;
      default: return <div>Tool not implemented yet.</div>;
    }
  };

  return (
    <div className="py-12">
      <Container>
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link href="/tools" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to all tools
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <Share2 size={14} /> Share
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <Star size={14} /> Favorite
            </Button>
          </div>
        </div>

        {/* Tool Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary">
            <Icon size={48} />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-3">{tool.name}</h1>
            <p className="text-lg text-muted max-w-3xl">{tool.description}</p>
          </div>
        </div>

        {/* Main Tool UI */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-span-3">
            <GlassCard className="min-h-[400px]">
              {renderTool()}
            </GlassCard>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-4">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Info size={18} className="text-primary" /> How to use
              </h3>
              <ul className="text-sm text-muted space-y-3 list-disc pl-4">
                <li>Enter your input in the text area provided.</li>
                <li>Adjust any settings or options if available.</li>
                <li>The results will be generated automatically or upon clicking the action button.</li>
                <li>Copy the result to your clipboard using the copy button.</li>
              </ul>
            </GlassCard>

            <div className="bg-muted/10 border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Advertisement</span>
              <div className="w-full h-64 bg-muted/20 rounded flex items-center justify-center text-muted italic">
                AdSense Placeholder
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content & FAQ */}
        <div className="max-w-4xl mx-auto space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-6">About {tool.name}</h2>
            <div className="prose prose-invert max-w-none text-muted leading-relaxed">
              <p>
                {tool.name} is a powerful browser-based utility designed to help developers and designers streamline their workflow. 
                Whether you&apos;re debugging code, formatting data, or generating assets, our tool provides a fast and secure way to get the job done.
              </p>
              <p className="mt-4">
                Like all tools on Ilustrado Labs, this utility runs entirely in your browser. This means your data is never sent to our servers, 
                ensuring maximum privacy and security for your sensitive information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <HelpCircle size={32} className="text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h3 className="text-xl font-semibold mb-2">Is my data secure?</h3>
                <p className="text-muted">Yes, absolutely. All processing happens locally in your browser using JavaScript. No data is ever uploaded to our servers.</p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="text-xl font-semibold mb-2">Can I use this tool offline?</h3>
                <p className="text-muted">Once the page is loaded, most of our tools will work without an active internet connection as they don&apos;t rely on server-side processing.</p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="text-xl font-semibold mb-2">Is there a limit to the input size?</h3>
                <p className="text-muted">The limit is generally determined by your browser&apos;s memory. For most text-based tasks, you can process several megabytes of data without issues.</p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
