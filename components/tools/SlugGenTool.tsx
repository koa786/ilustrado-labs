"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Link2 } from "lucide-react";

export function SlugGenTool() {
  const [input, setInput] = useState("Hello World! This is a test.");
  const [copied, setCopied] = useState(false);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const slug = slugify(input);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Input Text</label>
        <Input 
          placeholder="Enter text to slugify..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-lg py-6"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Generated Slug</label>
        <div className="relative">
          <div className="w-full px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl font-mono text-primary break-all pr-12">
            {slug || "..."}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleCopy}
            disabled={!slug}
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted/10 border border-border rounded-xl flex items-center gap-4">
        <Link2 className="text-primary" size={24} />
        <p className="text-xs text-muted">Slugs are URL-friendly strings used in permalinks. They are lowercase, contain only alphanumeric characters and hyphens.</p>
      </div>
    </div>
  );
}
