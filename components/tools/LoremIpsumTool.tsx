"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, RefreshCw, FileText } from "lucide-react";

export function LoremIpsumTool() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    const result = Array.from({ length: paragraphs }, () => lorem).join('\n\n');
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex-grow">
          <label className="text-sm font-medium text-muted mb-2 block">Number of Paragraphs</label>
          <input 
            type="number" 
            min="1" 
            max="20" 
            value={paragraphs} 
            onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 bg-muted/10 border border-border rounded-lg"
          />
        </div>
        <Button onClick={generate} size="lg" className="mt-6">
          <RefreshCw size={18} className="mr-2" /> Generate
        </Button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted">Result</label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
          <TextArea 
            readOnly 
            value={output}
            className="h-64 bg-muted/5 leading-relaxed"
          />
        </div>
      )}

      {!output && (
        <div className="text-center py-20 bg-muted/5 border border-dashed border-border rounded-xl">
          <FileText size={48} className="text-muted mx-auto mb-4" />
          <p className="text-muted">Click generate to create placeholder text.</p>
        </div>
      )}
    </div>
  );
}
