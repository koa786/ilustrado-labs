"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Trash2 } from "lucide-react";

export function CaseConverterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = (type: string) => {
    let result = text;
    switch (type) {
      case "upper": result = text.toUpperCase(); break;
      case "lower": result = text.toLowerCase(); break;
      case "title": 
        result = text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case "camel":
        result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('_') || "";
        break;
    }
    setText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <TextArea 
        placeholder="Enter text to convert case..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-64"
      />

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => convert("upper")}>UPPERCASE</Button>
        <Button variant="secondary" onClick={() => convert("lower")}>lowercase</Button>
        <Button variant="secondary" onClick={() => convert("title")}>Title Case</Button>
        <Button variant="secondary" onClick={() => convert("sentence")}>Sentence case</Button>
        <Button variant="secondary" onClick={() => convert("camel")}>camelCase</Button>
        <Button variant="secondary" onClick={() => convert("snake")}>snake_case</Button>
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
