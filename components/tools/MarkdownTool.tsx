"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function MarkdownTool() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is a **Markdown** previewer.\n\n- List item 1\n- List item 2\n\n```js\nconsole.log('Hello!');\n```");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted">Markdown Input</label>
        <TextArea 
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-grow font-mono text-sm resize-none"
          placeholder="Enter markdown here..."
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted">Preview</label>
        <div className="flex-grow bg-muted/5 border border-border rounded-lg p-6 overflow-auto prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
