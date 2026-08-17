import { Metadata } from "next";

export const siteConfig = {
  name: "Ilustrado Labs",
  description: "Free browser-based developer tools including JSON Formatter, Diff Checker, Base64 Encoder, UUID Generator, text utilities, and more. Fast, secure, privacy-friendly.",
  url: "https://ilustradolabs.com", // Replace with actual domain
  ogImage: "https://ilustradolabs.com/og-image.png",
  links: {
    twitter: "https://twitter.com/ilustradolabs",
    github: "https://github.com/ilustradolabs",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon.ico", sizes: "any" },
  ] as any,
  noIndex = false,
  canonical,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: any;
  noIndex?: boolean;
  canonical?: string;
  type?: string;
} = {}): Metadata {
  const resolvedUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      url: resolvedUrl,
      siteName: siteConfig.name,
      type: type as any,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ilustradolabs",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
