"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  language = "javascript",
  filename,
  code,
  children,
}: {
  language?: string;
  filename?: string;
  code?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const rawCode = code || (typeof children === "string" ? children : "");

  const handleCopy = () => {
    if (!rawCode) return;
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border bg-[#0d1522] shadow-lg">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/10 border-b border-border/50 text-xs font-mono text-muted">
          <span>{filename || language.toUpperCase()}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 text-muted hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto text-sm font-mono text-slate-100 leading-relaxed">
        {rawCode ? (
          <pre><code>{rawCode}</code></pre>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
