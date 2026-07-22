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

export function generateSoftwareAppSchema(tool: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "Any",
    "applicationCategory": "DeveloperApplication",
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
