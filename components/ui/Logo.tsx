"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logoDark from "@/src/assets/images/logo-dark.png";

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
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src={logoDark}
        alt="IlustradoLabs"
        width={width}
        height={height}
        priority={priority}
        className={cn("w-auto h-[38px] sm:h-[44px] md:h-[48px] object-contain transition-all duration-200", imageClassName)}
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
