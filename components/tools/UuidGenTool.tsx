"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Copy, Check, RefreshCw, Fingerprint } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export function UuidGenTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => uuidv4());
    setUuids(newUuids);
  };

  const handleCopy = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex-grow">
          <label className="text-sm font-medium text-muted mb-2 block">Number of UUIDs</label>
          <Input 
            type="number" 
            min="1" 
            max="100" 
            value={count} 
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          />
        </div>
        <Button onClick={generate} size="lg" className="mt-6">
          <RefreshCw size={18} className="mr-2" /> Generate
        </Button>
      </div>

      <div className="space-y-3">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center gap-2 p-3 bg-muted/10 border border-border rounded-lg group hover:border-primary/30 transition-all">
            <Fingerprint size={16} className="text-muted" />
            <code className="flex-grow text-sm font-mono">{uuid}</code>
            <Button variant="ghost" size="sm" onClick={() => handleCopy(uuid, i)}>
              {copied === i ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </Button>
          </div>
        ))}
        
        {uuids.length === 0 && (
          <div className="text-center py-12 text-muted italic">
            Click generate to create unique UUIDs
          </div>
        )}
      </div>

      {uuids.length > 0 && (
        <Button variant="secondary" className="w-full" onClick={() => {
          navigator.clipboard.writeText(uuids.join('\n'));
          setCopied(-1);
          setTimeout(() => setCopied(null), 2000);
        }}>
          {copied === -1 ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
          Copy All UUIDs
        </Button>
      )}
    </div>
  );
}
