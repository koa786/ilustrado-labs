"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Clock, ArrowRightLeft, Calendar } from "lucide-react";

export function TimestampTool() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setTimeout(() => {
      setTimestamp(now.toString());
      setDateStr(new Date().toISOString());
      setCurrentTimestamp(now);
      setIsMounted(true);
    }, 0);

    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toDate = () => {
    try {
      const d = new Date(parseInt(timestamp) * 1000);
      setDateStr(d.toISOString());
    } catch (e) {
      setDateStr("Invalid Timestamp");
    }
  };

  const toTimestamp = () => {
    try {
      const d = new Date(dateStr);
      setTimestamp(Math.floor(d.getTime() / 1000).toString());
    } catch (e) {
      setTimestamp("Invalid Date");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-10">
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Current Unix Timestamp</div>
        <div className="text-4xl font-mono font-bold text-primary">{currentTimestamp}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Timestamp to Date
          </h3>
          <div className="flex gap-2">
            <Input 
              placeholder="Unix Timestamp (seconds)" 
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
            <Button onClick={toDate}><ArrowRightLeft size={18} /></Button>
          </div>
          <div className="p-4 bg-muted/10 border border-border rounded-lg font-mono text-sm break-all">
            {new Date(parseInt(timestamp) * 1000).toString()}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <Calendar size={18} className="text-primary" /> Date to Timestamp
          </h3>
          <div className="flex gap-2">
            <Input 
              placeholder="ISO Date String" 
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
            <Button onClick={toTimestamp}><ArrowRightLeft size={18} /></Button>
          </div>
          <div className="p-4 bg-muted/10 border border-border rounded-lg font-mono text-sm">
            {Math.floor(new Date(dateStr).getTime() / 1000)}
          </div>
        </div>
      </div>
    </div>
  );
}
