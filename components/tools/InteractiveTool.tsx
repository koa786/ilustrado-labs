"use client";

// This is the only client-side piece of a tool page. It resolves a tool's
// id to its interactive component. Everything else on a tool page (intro,
// content sections, features, examples, FAQ, related tools/guides) is
// server-rendered and imports nothing from here.

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
import dynamic from "next/dynamic";

// MarkdownTool pulls in rehype-highlight (and its highlight.js language
// data) to support the GFM/syntax-highlighting content Phase 2D's fix
// enabled. Because InteractiveTool statically imports every tool into one
// switch, that weight was shipping to all 26 tool/category pages, not just
// this one. Loading it dynamically (ssr: false) isolates it to its own
// chunk, fetched only when someone actually visits the Markdown Previewer.
// The page's SEO content (title, H1, metadata, contentSections, schema)
// lives in ToolPageBody, entirely separate from this component, so it's
// unaffected by this component no longer being server-rendered.
const MarkdownToolDynamic = dynamic(
  () => import("@/components/tools/MarkdownTool").then((m) => m.MarkdownTool),
  { ssr: false }
);
import { HtmlMinifyTool } from "@/components/tools/HtmlMinifyTool";
import { CssMinifyTool } from "@/components/tools/CssMinifyTool";
import { JsMinifyTool } from "@/components/tools/JsMinifyTool";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";
import { ColorConvTool } from "@/components/tools/ColorConvTool";
import { SlugGenTool } from "@/components/tools/SlugGenTool";
import { TextSorterTool } from "@/components/tools/TextSorterTool";
import { DeduplicatorTool } from "@/components/tools/DeduplicatorTool";
import { LoremIpsumTool } from "@/components/tools/LoremIpsumTool";

export function InteractiveTool({ toolId }: { toolId: string }) {
  switch (toolId) {
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
    case "markdown": return <MarkdownToolDynamic />;
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
}
