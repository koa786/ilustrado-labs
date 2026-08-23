interface SchemaProps {
  data: any;
}

export function Schema({ data }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Maps each tool to the schema.org applicationCategory that most accurately
// describes it. Falls back to "DeveloperApplication" for any tool not
// explicitly listed here (e.g. a newly added tool), matching prior behavior.
const APPLICATION_CATEGORY_MAP: Record<string, string> = {
  "text-diff": "UtilitiesApplication",
  "json-formatter": "DeveloperApplication",
  "json-validator": "DeveloperApplication",
  "base64": "DeveloperApplication",
  "url-codec": "DeveloperApplication",
  "word-counter": "UtilitiesApplication",
  "case-converter": "UtilitiesApplication",
  "password-gen": "SecurityApplication",
  "uuid-gen": "DeveloperApplication",
  "timestamp": "DeveloperApplication",
  "markdown": "DeveloperApplication",
  "html-minify": "DeveloperApplication",
  "css-minify": "DeveloperApplication",
  "js-minify": "DeveloperApplication",
  "regex-tester": "DeveloperApplication",
  "color-conv": "DesignApplication",
  "slug-gen": "UtilitiesApplication",
  "text-sorter": "UtilitiesApplication",
  "deduplicator": "UtilitiesApplication",
  "lorem-ipsum": "DesignApplication",
};

export function generateSoftwareAppSchema(tool: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "Any",
    "applicationCategory": APPLICATION_CATEGORY_MAP[tool.id] || "DeveloperApplication",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ilustradolabs.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://ilustradolabs.com${item.href}`
      }))
    ]
  };
}

export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": [post.image],
    "author": {
      "@type": "Person",
      "name": post.authorName,
      "url": "https://ilustradolabs.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ilustrado Labs",
      "url": "https://ilustradolabs.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ilustradolabs.com/logo-dark.png"
      }
    },
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    },
    "url": post.url
  };
}
