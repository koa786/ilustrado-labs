"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  showLink?: boolean;
}

export function Logo({
  className,
  imageClassName,
  width,
  height,
  priority = true,
  showLink = true,
}: LogoProps) {
  const logoContent = (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Precise Vector Reproduction of the Attached Logo's Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "shrink-0 transition-all duration-300 hover:scale-105",
          imageClassName || "h-[36px] sm:h-[40px] md:h-[44px] w-auto"
        )}
      >
        <g transform="rotate(20 50 50)">
          {/* Left Pill (Taller, lower, cyan to blue gradient) */}
          <rect
            x="24"
            y="22"
            width="17"
            height="60"
            rx="8.5"
            fill="url(#leftPillGrad)"
          />
          {/* Right Pill (Shorter, higher, overlapping on top, deep blue to cyan gradient) */}
          <rect
            x="47"
            y="14"
            width="17"
            height="50"
            rx="8.5"
            fill="url(#rightPillGrad)"
          />
        </g>
        <defs>
          <linearGradient id="leftPillGrad" x1="32.5" y1="82" x2="32.5" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#0088FF" />
            <stop offset="100%" stopColor="#0044FF" />
          </linearGradient>
          <linearGradient id="rightPillGrad" x1="55.5" y1="64" x2="55.5" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0022AA" />
            <stop offset="40%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Sleek, Premium Responsive Typography from Attached Logo */}
      <div className="flex items-center font-sans tracking-tight">
        <span className="text-white font-normal uppercase text-lg sm:text-xl md:text-2xl tracking-[0.06em] opacity-95">
          ILUSTRADO
        </span>
        <span className="bg-gradient-to-r from-[#00D2FF] to-[#0066FF] bg-clip-text text-transparent font-black uppercase text-lg sm:text-xl md:text-2xl ml-2 tracking-normal">
          LABS
        </span>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-flex items-center hover:opacity-95 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

