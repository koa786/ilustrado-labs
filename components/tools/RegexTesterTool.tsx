"use client";

import { useState, useMemo } from "react";
import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, CheckCircle, XCircle } from "lucide-react";

export function RegexTesterTool() {
  const [regex, setRegex] = useState("([a-z]+)");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("hello world 123");

  const { matches, error } = useMemo(() => {
    try {
      const re = new RegExp(regex, flags);
      const results = [];
      let match;
      
      if (flags.includes('g')) {
        while ((match = re.exec(testText)) !== null) {
          results.push(match);
          if (match.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        match = re.exec(testText);
        if (match) results.push(match);
      }
      
      return { matches: results, error: "" };
    } catch (e: any) {
      return { matches: [], error: e.message };
    }
  }, [regex, flags, testText]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-2">
          <label className="text-sm font-medium text-muted">Regex Pattern</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">/</span>
            <Input 
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              className="pl-6 pr-12 font-mono"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">/</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Flags</label>
          <Input 
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="font-mono"
            placeholder="gim"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-mono">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Test Text</label>
        <TextArea 
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          className="h-32"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold flex items-center gap-2">
            <Search size={18} className="text-primary" /> Matches ({matches.length})
          </h4>
        </div>
        
        <div className="space-y-2">
          {matches.map((match, i) => (
            <div key={i} className="p-3 bg-muted/10 border border-border rounded-lg text-sm">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-primary">Match {i + 1}</span>
                <span className="text-xs text-muted">Index: {match.index}</span>
              </div>
              <code className="block bg-background p-2 rounded border border-border/50 break-all">{match[0]}</code>
              {match.length > 1 && (
                <div className="mt-2 space-y-1">
                  <span className="text-xs font-medium text-muted">Groups:</span>
                  {match.slice(1).map((group: string, j: number) => (
                    <code key={j} className="block text-xs text-accent ml-2">Group {j + 1}: {group}</code>
                  ))}
                </div>
              )}
            </div>
          ))}
          {matches.length === 0 && !error && (
            <div className="text-center py-8 text-muted italic">No matches found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
