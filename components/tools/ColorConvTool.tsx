"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Palette } from "lucide-react";

export function ColorConvTool() {
  const [hex, setHex] = useState("#2563eb");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbVal = hexToRgb(hex);
  const rgb = rgbVal ? `rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})` : "Invalid HEX";
  const hslVal = rgbVal ? rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b) : null;
  const hsl = hslVal ? `hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)` : "Invalid HEX";

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-6">
        <div 
          className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-white/20" 
          style={{ backgroundColor: hex }}
        />
        <input 
          type="color" 
          value={hex} 
          onChange={(e) => setHex(e.target.value)}
          className="w-16 h-16 rounded-full cursor-pointer border-none bg-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "HEX", value: hex, setter: setHex },
          { label: "RGB", value: rgb, readOnly: true },
          { label: "HSL", value: hsl, readOnly: true },
        ].map((item) => (
          <div key={item.label} className="space-y-2">
            <label className="text-sm font-medium text-muted">{item.label}</label>
            <div className="flex gap-2">
              <Input 
                value={item.value} 
                readOnly={item.readOnly}
                onChange={(e) => item.setter?.(e.target.value)}
                className="font-mono"
              />
              <Button variant="secondary" size="sm" onClick={() => handleCopy(item.value, item.label)}>
                {copied === item.label ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
