"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

export function JsonValidatorTool() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [error, setError] = useState("");

  const validateJson = () => {
    if (!input.trim()) {
      setStatus("idle");
      setError("");
      return;
    }
    try {
      JSON.parse(input);
      setStatus("valid");
      setError("");
    } catch (e: any) {
      setStatus("invalid");
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">JSON to Validate</label>
        <TextArea 
          placeholder='Paste your JSON here...' 
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          className="h-64"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={validateJson} className="flex-grow">Validate JSON</Button>
        <Button variant="secondary" onClick={() => { setInput(""); setStatus("idle"); setError(""); }}>
          <Trash2 size={16} />
        </Button>
      </div>

      {status === "valid" && (
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex flex-col items-center text-center gap-3">
          <CheckCircle size={48} className="text-green-500" />
          <h3 className="text-xl font-bold text-green-500">Valid JSON</h3>
          <p className="text-sm text-muted">Your JSON is perfectly formatted and syntactically correct.</p>
        </div>
      )}

      {status === "invalid" && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col items-center text-center gap-3">
          <XCircle size={48} className="text-red-500" />
          <h3 className="text-xl font-bold text-red-500">Invalid JSON</h3>
          <p className="text-sm font-mono bg-red-500/5 p-2 rounded border border-red-500/10 w-full">{error}</p>
        </div>
      )}
    </div>
  );
}
