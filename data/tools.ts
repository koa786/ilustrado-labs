export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  icon: string;
  featured?: boolean;
  howTo?: string;
  steps?: string[];
  examples?: { title: string; code: string }[];
  benefits?: string[];
  faqs?: FAQ[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  longDescription: string;
}

export const categories: Category[] = [
  { 
    id: "text", 
    name: "Text Tools", 
    slug: "text-tools",
    icon: "Type",
    description: "Manipulate, format, and analyze text data with ease.",
    longDescription: "Our Text Tools category provides a comprehensive suite of utilities for developers, writers, and data analysts. From comparing differences between two text blocks with our Text Diff Checker to counting words and characters, these tools are designed to handle all your string manipulation needs. Whether you need to change text case, sort lines, or remove duplicates, our browser-based tools ensure your data stays private and secure while providing instant results."
  },
  { 
    id: "json", 
    name: "JSON Tools", 
    slug: "json-tools",
    icon: "FileJson",
    description: "Format, validate, and optimize JSON data.",
    longDescription: "JSON is the backbone of modern web development. Our JSON Tools help you work with this data format more efficiently. Use our JSON Formatter to make minified code readable, or the JSON Validator to catch syntax errors before they break your application. All processing happens client-side, making it the safest way to handle sensitive configuration files or API responses."
  },
  { 
    id: "coding", 
    name: "Developer Tools", 
    slug: "developer-tools",
    icon: "Code",
    description: "Essential utilities for web developers and engineers.",
    longDescription: "The Developer Tools category at Ilustrado Labs is a curated collection of utilities that every programmer needs. This includes code minifiers for HTML, CSS, and JavaScript to optimize your website's performance, as well as a Regex Tester to debug complex patterns. We also provide a Markdown Previewer to help you document your projects with ease. These tools are built to integrate seamlessly into your daily development workflow."
  },
  { 
    id: "security", 
    name: "Security Tools", 
    slug: "security-tools",
    icon: "Shield",
    description: "Generate secure passwords and unique identifiers.",
    longDescription: "Security is not an afterthought at Ilustrado Labs. Our Security Tools category offers high-entropy generators for passwords and UUIDs. By using standard Web Cryptography APIs, we ensure that the random values generated are cryptographically secure. Since these tools run entirely in your browser, your generated secrets are never transmitted over the network, providing an extra layer of protection for your sensitive credentials."
  },
  { 
    id: "converters", 
    name: "Encoding & Conversion", 
    slug: "encoding-tools",
    icon: "RefreshCw",
    description: "Convert data between different formats and encodings.",
    longDescription: "Data often comes in formats that aren't immediately useful. Our Encoding and Conversion tools bridge that gap. Whether you need to encode/decode Base64 strings, handle URL parameters safely, or convert Unix timestamps to human-readable dates, we've got you covered. We also feature a Color Converter for designers and developers to switch between HEX, RGB, and HSL color spaces instantly."
  },
  { 
    id: "generators", 
    name: "Content Generators", 
    slug: "generators",
    icon: "PlusCircle",
    description: "Generate placeholder text, slugs, and more.",
    longDescription: "Speed up your design and development process with our Content Generators. Need placeholder text for a mockup? Use our Lorem Ipsum Generator. Want to create SEO-friendly URLs? Our Slug Generator is perfect for the job. These utilities are designed to remove the friction from the creative process, allowing you to focus on building great products."
  },
];

export const tools: Tool[] = [
  {
    id: "text-diff",
    name: "Text Diff Checker",
    slug: "text-diff-checker",
    description: "Compare two pieces of text and find the differences.",
    category: "text",
    icon: "Diff",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Prettify and format your JSON data for better readability.",
    longDescription: "JSON Formatter is an essential tool for developers working with web APIs and configuration files. It takes minified or messy JSON strings and transforms them into a beautifully indented, human-readable format. This makes debugging and data analysis significantly easier by providing a clear visual structure of the data hierarchy.",
    category: "json",
    icon: "FileJson",
    howTo: "To use the JSON Formatter, simply paste your minified or unformatted JSON into the input area. The tool will automatically detect the data and apply standard indentation (usually 2 spaces) to make it readable. You can then copy the formatted result back to your project.",
    steps: [
      "Copy your minified JSON string from your source code or API response.",
      "Paste the JSON into the input field on this page.",
      "The tool will instantly format the JSON with proper indentation and syntax highlighting.",
      "Review the formatted data for any structural issues.",
      "Click the 'Copy' button to save the formatted JSON to your clipboard."
    ],
    examples: [
      {
        title: "Minified JSON",
        code: '{"name":"John","age":30,"city":"New York"}'
      },
      {
        title: "Formatted JSON",
        code: '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}'
      }
    ],
    benefits: [
      "Improves code readability for faster debugging.",
      "Identifies structural errors in your JSON data.",
      "Runs entirely in the browser for 100% privacy.",
      "Supports large JSON files without performance lag.",
      "Free to use with no registration required."
    ],
    faqs: [
      {
        question: "Is my JSON data sent to a server?",
        answer: "No. Our JSON Formatter runs entirely client-side using JavaScript. Your data never leaves your machine."
      },
      {
        question: "Does it support nested JSON objects?",
        answer: "Yes, it can handle deeply nested objects and arrays, providing clear indentation for each level."
      },
      {
        question: "Can it fix invalid JSON?",
        answer: "While it can't automatically fix syntax errors, it will highlight where the error is so you can correct it manually."
      }
    ]
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    description: "Check if your JSON is valid and find syntax errors.",
    category: "json",
    icon: "CheckCircle",
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    slug: "base64-encoder-decoder",
    description: "Encode or decode text to and from Base64 format.",
    category: "converters",
    icon: "Hash",
  },
  {
    id: "url-codec",
    name: "URL Encoder/Decoder",
    slug: "url-encoder-decoder",
    description: "Safely encode or decode URLs for web use.",
    category: "converters",
    icon: "Link",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    slug: "word-counter",
    description: "Count words, characters, and lines in your text.",
    category: "text",
    icon: "Type",
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    description: "Convert text between UPPERCASE, lowercase, camelCase, and more.",
    category: "text",
    icon: "CaseUpper",
  },
  {
    id: "password-gen",
    name: "Password Generator",
    slug: "password-generator",
    description: "Generate secure, random passwords with custom settings.",
    category: "generators",
    icon: "Lock",
  },
  {
    id: "uuid-gen",
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate unique v4 UUIDs instantly.",
    category: "generators",
    icon: "Fingerprint",
  },
  {
    id: "timestamp",
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    category: "converters",
    icon: "Clock",
  },
  {
    id: "markdown",
    name: "Markdown Previewer",
    slug: "markdown-previewer",
    description: "Write Markdown and see the rendered HTML in real-time.",
    category: "coding",
    icon: "FileText",
  },
  {
    id: "html-minify",
    name: "HTML Minifier",
    slug: "html-minifier",
    description: "Compress your HTML code by removing unnecessary whitespace.",
    category: "coding",
    icon: "Code",
  },
  {
    id: "css-minify",
    name: "CSS Minifier",
    slug: "css-minifier",
    description: "Minify your CSS files for faster load times.",
    category: "coding",
    icon: "Palette",
  },
  {
    id: "js-minify",
    name: "JS Minifier",
    slug: "js-minifier",
    description: "Minify JavaScript code to reduce file size.",
    category: "coding",
    icon: "FileCode",
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test your regular expressions against sample text.",
    category: "coding",
    icon: "Search",
  },
  {
    id: "color-conv",
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, and HSL formats.",
    category: "converters",
    icon: "Palette",
  },
  {
    id: "slug-gen",
    name: "Slug Generator",
    slug: "slug-generator",
    description: "Convert any string into a URL-friendly slug.",
    category: "generators",
    icon: "Link2",
  },
  {
    id: "text-sorter",
    name: "Text Sorter",
    slug: "text-sorter",
    description: "Sort lines of text alphabetically or numerically.",
    category: "text",
    icon: "SortAsc",
  },
  {
    id: "deduplicator",
    name: "Line Deduplicator",
    slug: "line-deduplicator",
    description: "Remove duplicate lines from your text automatically.",
    category: "text",
    icon: "CopyMinus",
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate placeholder text for your designs.",
    category: "generators",
    icon: "FileText",
  },
];

/**
 * Build-time safeguard: tools and categories are resolved from the same
 * dynamic route (app/tools/[slug]/page.tsx), matched by slug. If a future
 * tool and category ever share a slug, the tool silently wins the match
 * and the category page becomes unreachable at that URL with no build
 * error. This check fails the build loudly instead, the moment it happens.
 */
(function assertNoSlugCollisions() {
  const seen = new Set<string>();
  const allSlugs = [...tools.map((t) => t.slug), ...categories.map((c) => c.slug)];
  for (const slug of allSlugs) {
    if (seen.has(slug)) {
      throw new Error(
        `Slug collision detected: "${slug}" is used by more than one tool/category in data/tools.ts. Tool and category slugs must be unique across both lists.`
      );
    }
    seen.add(slug);
  }
})();
