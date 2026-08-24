"use client";

import { useState, useMemo } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Minus } from "lucide-react";
import { diffLines, type Change } from "diff";

export function TextDiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const changes = useMemo<Change[]>(() => {
    if (!text1 && !text2) return [];
    return diffLines(text1, text2);
  }, [text1, text2]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    for (const part of changes) {
      const lineCount = part.value.split("\n").filter((_, i, arr) => !(i === arr.length - 1 && arr[arr.length - 1] === "")).length;
      if (part.added) added += lineCount;
      if (part.removed) removed += lineCount;
    }
    return { added, removed };
  }, [changes]);

  const hasInput = text1.length > 0 || text2.length > 0;
  const isIdentical = hasInput && stats.added === 0 && stats.removed === 0;

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
        {hasInput && !isIdentical && (
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-green-500 font-medium">
              <Plus size={14} /> {stats.added} added
            </span>
            <span className="flex items-center gap-1 text-red-500 font-medium">
              <Minus size={14} /> {stats.removed} removed
            </span>
          </div>
        )}
      </div>

      <div className="p-4 bg-muted/5 border border-border rounded-lg min-h-[200px]">
        <h4 className="text-sm font-bold mb-4">Result</h4>
        <div className="font-mono text-sm">
          {!hasInput && (
            <span className="text-muted italic">Enter text in both fields to see the differences.</span>
          )}
          {isIdentical && (
            <span className="text-muted">Texts are identical.</span>
          )}
          {hasInput && !isIdentical && (
            <div className="whitespace-pre-wrap leading-relaxed">
              {changes.map((part, i) => {
                const lines = part.value.split("\n");
                const displayLines = lines[lines.length - 1] === "" ? lines.slice(0, -1) : lines;
                return displayLines.map((line, j) => {
                  if (part.added) {
                    return (
                      <div key={`${i}-${j}`} className="bg-green-500/10 border-l-2 border-green-500 text-green-500 pl-2 -ml-2">
                        <span aria-hidden="true">+ </span>{line || "\u00A0"}
                      </div>
                    );
                  }
                  if (part.removed) {
                    return (
                      <div key={`${i}-${j}`} className="bg-red-500/10 border-l-2 border-red-500 text-red-500 pl-2 -ml-2">
                        <span aria-hidden="true">- </span>{line || "\u00A0"}
                      </div>
                    );
                  }
                  return (
                    <div key={`${i}-${j}`} className="text-foreground/80 pl-2 -ml-2">
                      <span aria-hidden="true">&nbsp;&nbsp;</span>{line || "\u00A0"}
                    </div>
                  );
                });
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
