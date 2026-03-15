"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2, ArrowUpDown } from "lucide-react";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      setOutput("Error: Invalid characters for Base64 encoding.");
    }
  };

  const decode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput("Error: Invalid Base64 string.");
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
        <label className="text-sm font-medium text-muted">Input Text</label>
        <TextArea 
          placeholder="Enter text to encode or decode..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-40"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={encode} className="flex-grow">Encode to Base64</Button>
        <Button onClick={decode} className="flex-grow">Decode from Base64</Button>
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
