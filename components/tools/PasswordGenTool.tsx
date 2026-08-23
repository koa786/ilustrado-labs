"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Copy, Check, RefreshCw, Shield } from "lucide-react";

// Returns a cryptographically secure, uniformly-distributed random integer
// in the range [0, maxExclusive) using the Web Crypto API. Plain
// `crypto.getRandomValues() % maxExclusive` would introduce a slight bias
// for most maxExclusive values, since the Uint32 range (2^32 values)
// rarely divides evenly by the character-set size. Rejection sampling
// discards any draw that falls in that uneven remainder, guaranteeing a
// perfectly uniform result. For a character set this small (well under
// 100 characters), the rejection probability per draw is a fraction of a
// percent, so this has no perceptible performance cost.
function secureRandomInt(maxExclusive: number): number {
  const RANGE = 4294967296; // 2^32 — total number of possible Uint32 values
  const limit = RANGE - (RANGE % maxExclusive);
  const arr = new Uint32Array(1);
  let rand: number;
  do {
    crypto.getRandomValues(arr);
    rand = arr[0];
  } while (rand >= limit);
  return rand % maxExclusive;
}

export function PasswordGenTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const charSets = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let chars = "";
    if (options.uppercase) chars += charSets.uppercase;
    if (options.lowercase) chars += charSets.lowercase;
    if (options.numbers) chars += charSets.numbers;
    if (options.symbols) chars += charSets.symbols;

    if (!chars) return setPassword("");

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(secureRandomInt(chars.length));
    }
    setPassword(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <Input 
          readOnly 
          value={password} 
          className="text-2xl font-mono py-8 text-center bg-primary/5 border-primary/20"
          placeholder="Click generate..."
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
          <Button variant="ghost" size="sm" onClick={generate}><RefreshCw size={18} /></Button>
          <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!password}>
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-medium text-muted block">Password Length: {length}</label>
          <input 
            type="range" 
            min="4" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={value} 
                onChange={() => setOptions(prev => ({ ...prev, [key as keyof typeof options]: !value }))}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium capitalize group-hover:text-primary transition-colors">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-4">
        <Shield className="text-primary" size={32} />
        <div>
          <h4 className="font-bold text-sm">Security Tip</h4>
          <p className="text-xs text-muted">A strong password should be at least 12 characters long and include a mix of letters, numbers, and symbols.</p>
        </div>
      </div>

      <Button onClick={generate} size="lg" className="w-full">Generate Secure Password</Button>
    </div>
  );
}
