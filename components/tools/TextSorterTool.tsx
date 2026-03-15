"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2, SortAsc, SortDesc } from "lucide-react";

export function TextSorterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const sort = (direction: 'asc' | 'desc') => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    lines.sort((a, b) => {
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    });
    setText(lines.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <TextArea 
        placeholder="Enter lines of text to sort..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-64"
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => sort('asc')} className="flex-grow">
          <SortAsc size={16} className="mr-2" /> Sort A-Z
        </Button>
        <Button onClick={() => sort('desc')} className="flex-grow">
          <SortDesc size={16} className="mr-2" /> Sort Z-A
        </Button>
        <Button variant="secondary" onClick={() => {
          const lines = text.split(/\r?\n/);
          setText(lines.reverse().join('\n'));
        }}>Reverse Lines</Button>
        <Button variant="ghost" onClick={() => setText("")}><Trash2 size={16} /></Button>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleCopy} disabled={!text}>
          {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
          {copied ? "Copied" : "Copy Result"}
        </Button>
      </div>
    </div>
  );
}
