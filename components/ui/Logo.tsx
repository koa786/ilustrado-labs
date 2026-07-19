"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  showLink?: boolean;
}

export function Logo({
  className,
  width = 172,
  height = 44,
  priority = true,
  showLink = true,
}: LogoProps) {
  const logoContent = (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Light Mode Logo (Dark Text) - Visible in light mode, hidden in dark mode */}
      <Image
        src="/logo-light.png"
        alt="IlustradoLabs"
        width={width}
        height={height}
        priority={priority}
        className="dark:hidden w-auto h-[34px] md:h-[42px] object-contain"
        referrerPolicy="no-referrer"
      />
      {/* Dark Mode Logo (White Text) - Hidden in light mode, visible in dark mode */}
      <Image
        src="/logo-dark.png"
        alt="IlustradoLabs"
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block w-auto h-[34px] md:h-[42px] object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
