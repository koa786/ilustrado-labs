import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Info, AlertTriangle, Lightbulb, AlertCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { slugifyHeading } from "@/lib/slug";
import { CodeBlock } from "./CodeBlock";

// Callout component
export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
}) {
  const config = {
    info: {
      bg: "bg-primary/10 border-primary/30 text-primary",
      icon: <Info className="w-5 h-5 shrink-0 text-primary" />,
      defaultTitle: "Note",
    },
    success: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      icon: <Check className="w-5 h-5 shrink-0 text-emerald-400" />,
      defaultTitle: "Success",
    },
    warning: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      icon: <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />,
      defaultTitle: "Warning",
    },
    danger: {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
      icon: <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />,
      defaultTitle: "Important",
    },
  }[type];

  return (
    <div className={cn("my-6 p-4 md:p-5 rounded-xl border flex gap-3 text-sm leading-relaxed", config.bg)}>
      {config.icon}
      <div className="flex-1 text-foreground">
        {title && <div className="font-bold mb-1 text-base">{title || config.defaultTitle}</div>}
        <div className="text-muted/90 [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

// Dedicated Note, Warning, Tip components
export function Note({ title = "Note", children }: { title?: string; children: React.ReactNode }) {
  return <Callout type="info" title={title}>{children}</Callout>;
}

export function Warning({ title = "Warning", children }: { title?: string; children: React.ReactNode }) {
  return <Callout type="warning" title={title}>{children}</Callout>;
}

export function Tip({ title = "Pro Tip", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 md:p-5 rounded-xl border border-accent/30 bg-accent/10 flex gap-3 text-sm leading-relaxed">
      <Lightbulb className="w-5 h-5 shrink-0 text-accent" />
      <div className="flex-1 text-foreground">
        {title && <div className="font-bold mb-1 text-base text-accent">{title}</div>}
        <div className="text-muted/90 [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

// Custom Image component with caption & responsive styling
export function MDXImage({
  src,
  alt = "Blog Image",
  caption,
  width = 1200,
  height = 675,
}: {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted/20">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full hover:scale-[1.01] transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Table component supporting both props and children
export function Table({
  headers,
  rows,
  children,
}: {
  headers?: string[];
  rows?: (string | number)[][];
  children?: React.ReactNode;
}) {
  if (children) {
    return (
      <div className="my-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    );
  }

  const safeHeaders = headers || [];
  const safeRows = rows || [];

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/20 border-b border-border font-semibold text-foreground">
          <tr>
            {safeHeaders.map((h, i) => (
              <th key={i} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50 text-muted">
          {safeRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-muted/5 transition-colors">
              {safeRows[rowIndex]?.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 font-normal">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Heading overrides with auto IDs
export const MDXHeadings = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugifyHeading(text);
    return (
      <h2
        id={id}
        className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground scroll-mt-28 flex items-center group"
        {...props}
      >
        <span>{children}</span>
        <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-100 text-primary text-lg transition-opacity">
          #
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugifyHeading(text);
    return (
      <h3
        id={id}
        className="text-xl md:text-2xl font-bold mt-8 mb-4 text-foreground scroll-mt-28 flex items-center group"
        {...props}
      >
        <span>{children}</span>
        <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-100 text-primary text-base transition-opacity">
          #
        </a>
      </h3>
    );
  },
};

// Export all components dictionary for MDXRemote
export const mdxComponents = {
  Callout,
  Note,
  Warning,
  Tip,
  Toc: () => null,
  CodeBlock,
  Image: MDXImage,
  Table,
  table: Table,
  ...MDXHeadings,
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return (
        <Link href={href} className="text-primary hover:underline font-medium inline-flex items-center gap-0.5" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline font-medium inline-flex items-center gap-1"
        {...props}
      >
        {children}
        <ExternalLink className="w-3 h-3 inline" />
      </a>
    );
  },
};
