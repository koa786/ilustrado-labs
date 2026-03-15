"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2, CopyMinus } from "lucide-react";

export function DeduplicatorTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, removed: 0 });

  const deduplicate = () => {
    const lines = text.split(/\r?\n/);
    const originalCount = lines.length;
    const uniqueLines = Array.from(new Set(lines.map(l => l.trim()).filter(l => l !== "")));
    setText(uniqueLines.join('\n'));
    setStats({ original: originalCount, removed: originalCount - uniqueLines.length });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <TextArea 
        placeholder="Enter text with duplicate lines..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-64"
      />

      <div className="flex gap-2">
        <Button onClick={deduplicate} className="flex-grow">
          <CopyMinus size={16} className="mr-2" /> Remove Duplicates
        </Button>
        <Button variant="ghost" onClick={() => { setText(""); setStats({ original: 0, removed: 0 }); }}>
          <Trash2 size={16} />
        </Button>
      </div>

      {stats.original > 0 && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex justify-around text-center">
          <div>
            <div className="text-xl font-bold">{stats.original}</div>
            <div className="text-xs text-muted uppercase">Original Lines</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="text-xl font-bold text-green-500">{stats.original - stats.removed}</div>
            <div className="text-xs text-muted uppercase">Unique Lines</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="text-xl font-bold text-primary">{stats.removed}</div>
            <div className="text-xs text-muted uppercase">Duplicates Removed</div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleCopy} disabled={!text}>
          {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
          {copied ? "Copied" : "Copy Result"}
        </Button>
      </div>
    </div>
  );
}
