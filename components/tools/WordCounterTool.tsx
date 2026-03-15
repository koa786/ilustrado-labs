"use client";

import { useState, useMemo } from "react";
import { TextArea } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";

export function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const lines = text.trim() ? text.split(/\r\n|\r|\n/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;

    return { words, chars, charsNoSpaces, lines, sentences, paragraphs };
  }, [text]);

  return (
    <div className="space-y-8">
      <TextArea 
        placeholder="Type or paste your text here..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-64"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "Chars (no space)", value: stats.charsNoSpaces },
          { label: "Lines", value: stats.lines },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-muted/10 border border-border rounded-xl text-center">
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-muted font-medium uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
