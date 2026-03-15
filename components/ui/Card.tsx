import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass rounded-xl p-6 shadow-xl transition-all hover:scale-[1.01]", className)}>
      {children}
    </div>
  );
}

export function GradientBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("gradient-border-wrapper", className)}>
      <div className="gradient-border-content p-6 h-full">
        {children}
      </div>
    </div>
  );
}
