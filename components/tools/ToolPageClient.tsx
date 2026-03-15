"use client";

import { Tool, tools } from "@/data/tools";
import { GlassCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import * as Icons from "lucide-react";
import { Share2, Star, Info, HelpCircle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

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

interface ToolPageClientProps {
  tool: Tool;
}

export function ToolPageClient({ tool }: ToolPageClientProps) {
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

  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Main Tool UI */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
            {tool.howTo ? (
              <p className="text-sm text-muted mb-4">{tool.howTo}</p>
            ) : (
              <p className="text-sm text-muted mb-4">Enter your input in the text area provided and adjust any settings if available.</p>
            )}
            <ul className="text-sm text-muted space-y-3 list-disc pl-4">
              {tool.steps ? (
                tool.steps.map((step, i) => <li key={i}>{step}</li>)
              ) : (
                <>
                  <li>Enter your input in the text area provided.</li>
                  <li>Adjust any settings or options if available.</li>
                  <li>The results will be generated automatically or upon clicking the action button.</li>
                  <li>Copy the result to your clipboard using the copy button.</li>
                </>
              )}
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

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto space-y-16">
        <section>
          <h2 className="text-3xl font-bold mb-6">About {tool.name}</h2>
          <div className="prose prose-invert max-w-none text-muted leading-relaxed">
            <p>
              {tool.longDescription || tool.description}
            </p>
            <p className="mt-4">
              Like all tools on Ilustrado Labs, this utility runs entirely in your browser. This means your data is never sent to our servers, 
              ensuring maximum privacy and security for your sensitive information.
            </p>
          </div>
        </section>

        {tool.benefits && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-muted/5 border border-border rounded-xl">
                  <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-muted">{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {tool.examples && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Examples</h2>
            <div className="space-y-6">
              {tool.examples.map((example, i) => (
                <div key={i}>
                  <h3 className="text-xl font-semibold mb-3">{example.title}</h3>
                  <pre className="p-4 bg-black/50 border border-border rounded-xl overflow-x-auto text-sm font-mono">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        )}

        {tool.faqs && (
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <HelpCircle size={32} className="text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {tool.faqs.map((faq, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((t) => {
                const TIcon = (Icons as any)[t.icon] || Icons.Code;
                return (
                  <Link key={t.id} href={`/tools/${t.slug}`}>
                    <GlassCard className="p-6 h-full hover:bg-primary/5 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <TIcon size={24} />
                      </div>
                      <h3 className="font-bold mb-2">{t.name}</h3>
                      <p className="text-sm text-muted line-clamp-2">{t.description}</p>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
