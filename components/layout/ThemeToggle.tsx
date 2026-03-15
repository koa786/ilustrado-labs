"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/20 rounded-full border border-border/50">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "p-1.5 rounded-full transition-all",
          theme === "light" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
        )}
        title="Light Mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "p-1.5 rounded-full transition-all",
          theme === "dark" ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"
        )}
        title="Dark Mode"
      >
        <Moon size={16} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "p-1.5 rounded-full transition-all",
          theme === "system" ? "bg-muted text-foreground shadow-sm" : "text-muted hover:text-foreground"
        )}
        title="System Mode"
      >
        <Monitor size={16} />
      </button>
    </div>
  );
}
