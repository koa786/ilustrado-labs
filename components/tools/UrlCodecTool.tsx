"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2, ArrowUpDown } from "lucide-react";

export function UrlCodecTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setOutput("Error: Encoding failed.");
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput("Error: Invalid URL encoding.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">URL / Text</label>
        <TextArea 
          placeholder="Enter URL or text to encode/decode..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-40"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={encode} className="flex-grow">Encode URL</Button>
        <Button onClick={decode} className="flex-grow">Decode URL</Button>
        <Button variant="secondary" onClick={() => { setInput(output); setOutput(""); }}>
          <ArrowUpDown size={16} />
        </Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}>
          <Trash2 size={16} />
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
            className="h-40 bg-muted/5 font-mono"
          />
        </div>
      )}
    </div>
  );
}
