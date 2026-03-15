"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2, FileJson } from "lucide-react";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = (indent: number) => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: any) {
      setError(e.message);
      setOutput("");
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
        <label className="text-sm font-medium text-muted">Input JSON</label>
        <TextArea 
          placeholder='{"key": "value"}' 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-48"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => formatJson(2)}>Format (2 Spaces)</Button>
        <Button onClick={() => formatJson(4)}>Format (4 Spaces)</Button>
        <Button variant="secondary" onClick={() => {
          try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError("");
          } catch (e: any) {
            setError(e.message);
          }
        }}>Minify</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); setError(""); }}>
          <Trash2 size={16} className="mr-2" /> Clear
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted">Formatted Output</label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
          <TextArea 
            readOnly 
            value={output}
            className="h-64 bg-muted/5 font-mono"
          />
        </div>
      )}
    </div>
  );
}
