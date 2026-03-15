"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2 } from "lucide-react";

export function TextDiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Original Text</label>
          <TextArea 
            placeholder="Paste original text here..." 
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="h-64"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Modified Text</label>
          <TextArea 
            placeholder="Paste modified text here..." 
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="h-64"
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button variant="secondary" onClick={() => { setText1(""); setText2(""); }}>
          <Trash2 size={16} className="mr-2" /> Clear All
        </Button>
        <p className="text-xs text-muted italic">Differences are highlighted below (Implementation pending library integration)</p>
      </div>

      <div className="p-4 bg-muted/5 border border-border rounded-lg min-h-[200px]">
        <h4 className="text-sm font-bold mb-4">Result</h4>
        <div className="font-mono text-sm whitespace-pre-wrap">
          {/* Simple diff logic or placeholder */}
          {text1 === text2 ? (
            <span className="text-muted">Texts are identical.</span>
          ) : (
            <span className="text-primary">Texts are different. Detailed diff view coming soon.</span>
          )}
        </div>
      </div>
    </div>
  );
}
