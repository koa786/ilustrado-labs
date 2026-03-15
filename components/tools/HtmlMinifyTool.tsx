"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2, Zap } from "lucide-react";

export function HtmlMinifyTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const minify = () => {
    const minified = input
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove space between tags
      .trim();
    setOutput(minified);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <TextArea 
        placeholder="Paste your HTML here..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-64"
      />

      <div className="flex gap-2">
        <Button onClick={minify} className="flex-grow">
          <Zap size={16} className="mr-2" /> Minify HTML
        </Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}>
          <Trash2 size={16} />
        </Button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted">Minified HTML</label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
          <TextArea 
            readOnly 
            value={output}
            className="h-40 bg-muted/5 font-mono text-xs"
          />
          <div className="text-xs text-muted">
            Reduction: {Math.round((1 - output.length / input.length) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}
