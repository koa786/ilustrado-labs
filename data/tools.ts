export interface FAQ {
  question: string;
  answer: string;
}

// A flexible, optional deep-dive content section for prose that doesn't fit
// the simpler list-shaped fields below (useCases, benefits, tips, etc.) —
// e.g. "What Is a JSON Formatter?" or "Password Length and Entropy". Each
// tool defines its own set of sections with its own heading text; nothing
// here is templated from the tool name.
export interface ContentSection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  metaDescription?: string;
  longDescription?: string;
  // Optional H1 override — falls back to `name` when absent.
  pageHeading?: string;
  // Optional intro paragraph shown under the H1 — falls back to
  // `description` when absent.
  intro?: string;
  category: string;
  icon: string;
  featured?: boolean;
  howTo?: string;
  steps?: string[];
  examples?: { title: string; code: string }[];
  benefits?: string[];
  faqs?: FAQ[];
  useCases?: string[];
  tips?: string[];
  commonMistakes?: string[];
  relatedToolIds?: string[];
  // Optional flexible deep-dive sections — see ContentSection above.
  contentSections?: ContentSection[];
  // Optional blog post slugs (matching content/blog/*.mdx frontmatter
  // `slug`) to surface as "Related Guides". Invalid/missing slugs are
  // silently skipped by the renderer, not an error.
  relatedGuideSlugs?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  longDescription: string;
  whyUseThis?: string;
  gettingStarted?: string;
}

export const categories: Category[] = [
  { 
    id: "text", 
    name: "Text Tools", 
    slug: "text-tools",
    icon: "Type",
    description: "Manipulate, format, and analyze text data with ease.",
    longDescription: "Our Text Tools category provides a comprehensive suite of utilities for developers, writers, and data analysts. From comparing differences between two text blocks with our Text Diff Checker to counting words and characters, these tools are designed to handle all your string manipulation needs. Whether you need to change text case, sort lines, or remove duplicates, our browser-based tools ensure your data stays private and secure while providing instant results.",
    whyUseThis: "Most of these tasks are one-off: you need a word count for a submission, a quick diff before sending an edit back, or a list cleaned up before pasting it somewhere else. Opening a full editor or writing a script for that is overkill. These tools are built for that in-between moment — paste, get your answer, move on.",
    gettingStarted: "Pick the tool that matches what you're trying to do, paste your text into the input, and the result updates as you type. Nothing is saved or uploaded, so it's safe to paste drafts, logs, or anything else you wouldn't want leaving your machine."
  },
  { 
    id: "json", 
    name: "JSON Tools", 
    slug: "json-tools",
    icon: "FileJson",
    description: "Format, validate, and optimize JSON data.",
    longDescription: "JSON is the backbone of modern web development. Our JSON Tools help you work with this data format more efficiently. Use our JSON Formatter to make minified code readable, or the JSON Validator to catch syntax errors before they break your application. All processing happens client-side, making it the safest way to handle sensitive configuration files or API responses.",
    whyUseThis: "API responses and config files rarely arrive formatted the way you'd want to read them, and a single missing comma or stray quote can break a build in ways that are annoying to track down by eye. These tools exist for that exact moment — you have JSON in front of you and need to either read it or confirm it's actually valid.",
    gettingStarted: "Paste your JSON into the formatter to make it readable, or into the validator if you're chasing a parsing error. Both work on data straight from an API response or a local file, and nothing you paste is sent anywhere."
  },
  { 
    id: "coding", 
    name: "Developer Tools", 
    slug: "developer-tools",
    icon: "Code",
    description: "Essential utilities for web developers and engineers.",
    longDescription: "The Developer Tools category at Ilustrado Labs is a curated collection of utilities that every programmer needs. This includes code minifiers for HTML, CSS, and JavaScript to optimize your website's performance, as well as a Regex Tester to debug complex patterns. We also provide a Markdown Previewer to help you document your projects with ease. These tools are built to integrate seamlessly into your daily development workflow.",
    whyUseThis: "This group covers a mix of everyday development tasks that don't need a full build pipeline: shrinking a file before shipping it, checking a regex pattern actually matches what you think it does, or seeing how a README will render before committing it.",
    gettingStarted: "Each tool is built around a single task — pick the one that matches what's in front of you. The minifiers and regex tester update as you type; the Markdown previewer renders alongside your source so you can compare both at once."
  },
  { 
    id: "security", 
    name: "Security Tools", 
    slug: "security-tools",
    icon: "Shield",
    description: "Generate secure passwords and unique identifiers.",
    longDescription: "Security is not an afterthought at Ilustrado Labs. Our Security Tools category offers generators for passwords and UUIDs that run entirely in your browser, using the Web Crypto API's cryptographically secure random number generator rather than Math.random(). Because generation happens locally, your generated passwords and identifiers are never transmitted over the network before you see and copy them.",
    whyUseThis: "A password or identifier generated on a server you don't control has, by definition, existed somewhere outside your browser before you ever see it. These tools generate everything locally, so the value on your screen is the only place it has ever existed until you use it.",
    gettingStarted: "Set your options — length and character types for passwords, nothing for UUIDs — and generate. Copy the result immediately and treat it as sensitive; the tool doesn't store or remember what it generated."
  },
  { 
    id: "converters", 
    name: "Encoding & Conversion", 
    slug: "encoding-tools",
    icon: "RefreshCw",
    description: "Convert data between different formats and encodings.",
    longDescription: "Data often comes in formats that aren't immediately useful. Our Encoding and Conversion tools bridge that gap. Whether you need to encode/decode Base64 strings, handle URL parameters safely, or convert Unix timestamps to human-readable dates, we've got you covered. We also feature a Color Converter for designers and developers to switch between HEX, RGB, and HSL color spaces instantly.",
    whyUseThis: "Different systems expect data in different shapes — a timestamp as a number, a color as HSL instead of hex, a string safely encoded before it goes in a URL. These tools handle that translation without you needing to remember the exact conversion rules or write a throwaway script for it.",
    gettingStarted: "Pick the conversion you need and paste your input — most of these tools convert in both directions, so you can go from the format you have to the one you need and back again."
  },
  { 
    id: "generators", 
    name: "Content Generators", 
    slug: "generators",
    icon: "PlusCircle",
    description: "Generate placeholder text, slugs, and more.",
    longDescription: "Speed up your design and development process with our Content Generators. Need placeholder text for a mockup? Use our Lorem Ipsum Generator. Want to create SEO-friendly URLs? Our Slug Generator is perfect for the job. These utilities are designed to remove the friction from the creative process, allowing you to focus on building great products.",
    whyUseThis: "Placeholder text, a URL slug, a unique ID — these are small inputs a design or build often needs before the real content exists. Generating them by hand is tedious enough that people either skip it or do it inconsistently.",
    gettingStarted: "Set whatever options apply (paragraph count, casing) and generate. Results are meant to be copied straight into whatever you're building."
  },
];

export const tools: Tool[] = [
  {
    id: "text-diff",
    name: "Text Diff Checker",
    slug: "text-diff-checker",
    description: "Compare two pieces of text and find the differences.",
    metaDescription: "Compare two blocks of text and see exactly which lines were added, removed, or changed — free, instant, and entirely in your browser.",
    longDescription: "Text Diff Checker compares two blocks of text line by line and shows you exactly what changed between them. Added lines and removed lines are marked separately, so instead of re-reading both versions side by side to spot what's different, you can see it at a glance.",
    category: "text",
    icon: "Diff",
    howTo: "Paste the original version into the left field and the edited version into the right field. The comparison updates as you type — no button to click. Lines that were removed from the original are marked in red, lines added in the new version are marked in green, and unchanged lines are shown without any marking.",
    steps: [
      "Paste the original text into the 'Original Text' field.",
      "Paste the changed or updated version into the 'Modified Text' field.",
      "Review the result panel — added and removed lines are marked separately.",
      "Use the added/removed counts above the result to gauge the size of the change at a glance."
    ],
    useCases: [
      "Reviewing an edited draft before accepting the changes.",
      "Comparing two versions of a config file to spot what changed between deployments.",
      "Checking whether a copy-pasted block of text was altered in transit.",
      "Spotting accidental changes when merging text from two sources by hand."
    ],
    tips: [
      "The comparison is line-based, so a single word change on a long line will mark the whole line as changed — for word-level precision, look at where the changed line differs, not just that it changed.",
      "If you're comparing code, formatting-only differences (like indentation) will still register as changes, since the tool compares text, not syntax."
    ],
    faqs: [
      {
        question: "Does this tool send my text anywhere to compare it?",
        answer: "No. The comparison runs in your browser using JavaScript — neither text ever leaves your machine."
      },
      {
        question: "Can it compare code files, not just plain text?",
        answer: "Yes, it works on any plain text, including code — though it compares text content, not code structure, so a functionally identical change written differently will still show as a difference."
      }
    ],
    relatedToolIds: ["word-counter", "deduplicator"]
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Prettify and format your JSON data for better readability.",
    metaDescription: "Paste minified or messy JSON and get instantly readable, properly indented output — free JSON formatter that runs entirely in your browser.",
    longDescription: "JSON Formatter is an essential tool for developers working with web APIs and configuration files. It takes minified or messy JSON strings and transforms them into a beautifully indented, human-readable format. This makes debugging and data analysis significantly easier by providing a clear visual structure of the data hierarchy.",
    pageHeading: "JSON Formatter & Beautifier",
    intro: "Format, beautify, and minify JSON directly in your browser — with clear indentation for easier debugging and readable API responses. Nothing you paste is sent to a server.",
    category: "json",
    icon: "FileJson",
    howTo: "To use the JSON Formatter, simply paste your minified or unformatted JSON into the input area. The tool will automatically detect the data and apply standard indentation (usually 2 spaces) to make it readable. You can then copy the formatted result back to your project.",
    steps: [
      "Copy your minified JSON string from your source code or API response.",
      "Paste the JSON into the input field on this page.",
      "The tool will instantly format the JSON with proper indentation, revealing its full nested structure.",
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
    contentSections: [
      {
        id: "what-is",
        heading: "What Is a JSON Formatter?",
        paragraphs: [
          "JSON (JavaScript Object Notation) is a text-based format for representing structured data — objects with key-value pairs, arrays, strings, numbers, and booleans. It's the standard format for API responses and configuration files, which means most developers encounter it daily.",
          "API responses are often minified to reduce payload size, and hand-edited config files can lose consistent indentation over time. Either way, the result is hard to scan. A JSON formatter (also called a JSON beautifier) parses the JSON and re-outputs it with consistent indentation — each nested level shifted further right, one key-value pair per line — without changing the underlying data."
        ]
      },
      {
        id: "why-format",
        heading: "Why Format JSON?",
        paragraphs: [
          "Formatting isn't just cosmetic. When debugging why an API response doesn't match what your code expects, readable indentation is what lets you spot a missing field or an array where you expected an object. It also makes formatted examples usable in documentation and pull requests, where a minified line isn't."
        ]
      },
      {
        id: "vs-validator",
        heading: "JSON Formatter vs JSON Validator",
        paragraphs: [
          "These tools solve related but different problems. A formatter takes JSON that's already valid and re-indents it for readability — its job is presentation, not correctness checking. A validator takes JSON of unknown correctness and tells you specifically whether it parses, and if not, exactly where the syntax breaks.",
          "This formatter will also surface a parse error if your input isn't valid JSON, but it stops there. If you're specifically diagnosing a syntax problem, the JSON Validator tool on this site is built for that."
        ]
      },
      {
        id: "common-problems",
        heading: "Common JSON Formatting Problems",
        paragraphs: [
          "Invalid JSON can't be formatted until the underlying syntax issue is fixed — a formatter can only re-indent JSON it can successfully parse. The most common issues that cause a parse error:"
        ],
        list: [
          "Missing commas between properties or array items.",
          "Trailing commas after the last item in an object or array — valid in JavaScript object literals, but not in JSON.",
          "Single quotes instead of double quotes — JSON strings and keys must use double quotes.",
          "Unmatched brackets or braces."
        ]
      }
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
    ],
    relatedToolIds: ["json-validator"],
    relatedGuideSlugs: ["json-formatter-guide", "json-validator-guide"]
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    description: "Check if your JSON is valid and find syntax errors.",
    metaDescription: "Check whether your JSON is valid and get the exact parser error and position when it isn't — free, instant, runs entirely in your browser.",
    longDescription: "JSON Validator checks whether a block of JSON is syntactically correct. If it isn't, it shows you the exact error your browser's own JSON parser produces — including where in the string the problem is — rather than leaving you to scan the whole document by eye.",
    category: "json",
    icon: "CheckCircle",
    howTo: "Paste your JSON and click Validate. If it's valid, you'll see a confirmation. If it's not, the tool shows the exact parser error message, which usually names the unexpected character or token and its position in the string.",
    steps: [
      "Paste the JSON you want to check into the input field.",
      "Click 'Validate JSON'.",
      "If invalid, read the error message — it typically points to the exact character position of the problem.",
      "Fix that spot and re-validate."
    ],
    useCases: [
      "Debugging a JSON parsing error thrown by your application, without adding console logs.",
      "Checking a config file (like package.json or a .json settings file) before committing it.",
      "Verifying an API response is well-formed JSON before writing code against it.",
      "Confirming JSON generated by a script or template is syntactically valid before using it."
    ],
    commonMistakes: [
      "Trailing commas after the last item in an object or array — valid in JavaScript object literals, but not in JSON.",
      "Using single quotes instead of double quotes for strings and keys.",
      "Unquoted object keys (JSON requires keys to be double-quoted strings).",
      "A stray comment (// or /* */) left in — JSON has no comment syntax at all."
    ],
    faqs: [
      {
        question: "What's the difference between this and the JSON Formatter?",
        answer: "The Formatter re-indents JSON to make it readable but doesn't check correctness on its own. The Validator specifically checks whether the JSON is syntactically valid and tells you exactly what's wrong if it isn't."
      },
      {
        question: "Does it check my data against a schema, like required fields?",
        answer: "No — it checks JSON syntax only (is it parseable), not whether the data matches a particular structure or schema. If you need to enforce required fields or data types, that's a separate concern (JSON Schema validation), which this tool doesn't perform."
      },
      {
        question: "Why does the error mention a character position?",
        answer: "The error message comes directly from your browser's built-in JSON parser, which reports exactly where in the string it stopped being able to parse — that position is usually the fastest way to locate the actual problem, even in a long document."
      }
    ],
    contentSections: [
      {
        id: "vs-formatter",
        heading: "JSON Validator vs JSON Formatter",
        paragraphs: [
          "Validation and formatting solve different problems, even though they're often needed together. Validation answers one question: is this JSON syntactically correct? Formatting doesn't ask that question at all — it takes JSON that's already valid and re-indents it for readability.",
          "In practice, the JSON Formatter on this site will also fail on invalid input, since it can't format what it can't parse — but its error handling isn't the focus of that tool. If you're specifically trying to pin down a syntax error rather than read a large formatted document, this Validator is built for exactly that."
        ]
      },
      {
        id: "what-makes-invalid",
        heading: "What Makes JSON Invalid",
        paragraphs: [
          "JSON's syntax rules are stricter than they look, and stricter than JavaScript's own object literal syntax — which is a common source of confusion since the two look almost identical. The most common causes of an invalid document are covered below; each one will produce a distinct parser error pointing at roughly where it happened."
        ]
      }
    ],
    relatedToolIds: ["json-formatter"]
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    slug: "base64-encoder-decoder",
    description: "Encode or decode text to and from Base64 format.",
    metaDescription: "Encode text to Base64 or decode a Base64 string back to plain text — instant, free, and processed entirely in your browser.",
    longDescription: "Base64 Encoder/Decoder converts text to and from Base64, a way of representing binary-safe data as plain ASCII text. It's commonly used for embedding data in places that only accept text — email attachments, data URIs, and API authentication headers, among others.",
    category: "converters",
    icon: "Hash",
    howTo: "Paste your text and click 'Encode to Base64' to convert it, or paste a Base64 string and click 'Decode from Base64' to get the original text back. The swap button lets you feed the output back in as input for a quick round-trip check.",
    steps: [
      "Paste plain text into the input to encode it, or paste a Base64 string to decode it.",
      "Click 'Encode to Base64' or 'Decode from Base64' depending on what you're starting with.",
      "Use the swap button to feed the output back in as input for a round-trip check.",
      "Copy the result to your clipboard."
    ],
    useCases: [
      "Decoding a Base64-encoded JWT payload or API auth header to inspect its contents.",
      "Preparing a small data URI for embedding directly in HTML or CSS.",
      "Checking what a Base64 string in a config file or log actually contains.",
      "Verifying that data survived an encode/decode round-trip unchanged."
    ],
    commonMistakes: [
      "Base64 is an encoding, not encryption — anyone can decode it, so it shouldn't be used to hide sensitive data.",
      "This tool uses the browser's built-in encoder, which only handles Latin1 text directly; pasting emoji or non-Latin characters (like Chinese, Arabic, or Cyrillic text) will throw an encoding error rather than producing output."
    ],
    faqs: [
      {
        question: "Is Base64 the same as encryption?",
        answer: "No. Base64 just re-represents data as text — it provides no confidentiality. Anyone can decode a Base64 string back to its original form instantly."
      },
      {
        question: "Why did encoding fail on my text?",
        answer: "This tool uses the browser's built-in Base64 encoder, which works directly only on Latin1 characters. Text containing emoji or non-Latin scripts (Chinese, Arabic, Cyrillic, and similar) will throw an error rather than encode."
      }
    ],
    contentSections: [
      {
        id: "not-encryption",
        heading: "Base64 Isn't Encryption",
        paragraphs: [
          "Base64 is sometimes mistaken for a security measure because the output looks unreadable at a glance. It isn't one — Base64 is a reversible encoding, not encryption. Anyone can decode a Base64 string back to its original form in one step, with no key or password required. Its purpose is representing binary-safe data as plain text, not hiding information."
        ]
      },
      {
        id: "where-used",
        heading: "Where Base64 Is Actually Used",
        paragraphs: [
          "Base64 shows up wherever binary or arbitrary data needs to travel through a system that only reliably handles text — the payload portion of a JWT, a small image or font embedded directly in CSS or HTML as a data URI, or an attachment encoded for inclusion in an email's plain-text body. In each case, the goal is compatibility with a text-only channel, not confidentiality."
        ]
      }
    ],
    relatedToolIds: ["url-codec"]
  },
  {
    id: "url-codec",
    name: "URL Encoder/Decoder",
    slug: "url-encoder-decoder",
    description: "Safely encode or decode URLs for web use.",
    metaDescription: "Encode special characters for safe use in a URL, or decode a percent-encoded string back to readable text — free and browser-based.",
    longDescription: "URL Encoder/Decoder converts text using percent-encoding so it can be safely used inside a URL — for example, as a query parameter value. It encodes and decodes URL components specifically, so it's built for individual values like query parameters or path segments rather than a complete URL.",
    category: "converters",
    icon: "Link",
    howTo: "Paste the text or value you want to encode and click 'Encode URL'. To reverse a percent-encoded string, paste it and click 'Decode URL'.",
    steps: [
      "Paste the value you want to encode, or a percent-encoded string you want to decode.",
      "Click 'Encode URL' or 'Decode URL' depending on which direction you need.",
      "Copy the result to your clipboard."
    ],
    useCases: [
      "Encoding a value (like a search query or email address) before appending it to a URL as a query parameter.",
      "Decoding a URL you copied from a browser address bar to read what a %-encoded parameter actually says.",
      "Debugging why a link with special characters (spaces, &, =, #) isn't behaving as expected."
    ],
    commonMistakes: [
      "This encodes individual URL components, not a full URL — running a complete URL (like https://example.com/page?a=1) through it will also encode the slashes and colons, breaking the URL structure. Encode just the part that needs it, such as a single query parameter value."
    ],
    faqs: [
      {
        question: "Can I encode an entire URL with this tool?",
        answer: "You can, but it will encode every special character including the ones that make it a working URL, like ':' and '/'. This tool is built for encoding individual pieces — like a query parameter's value — not the full address."
      },
      {
        question: "What characters actually get encoded?",
        answer: "This tool uses the browser's encodeURIComponent, which leaves letters, digits, and a small set of characters (- _ . ! ~ * ' ( )) unencoded and percent-encodes everything else, including reserved URL characters like /, :, &, and =."
      }
    ],
    contentSections: [
      {
        id: "component-vs-full-url",
        heading: "Encoding a Component vs a Full URL",
        paragraphs: [
          "This tool encodes URL components — a single value, like a query parameter or path segment — not entire URLs. That's an important distinction: characters like / and : are part of a URL's actual structure and need to stay unencoded for the URL to work, but they're also exactly the kind of characters this tool encodes, since it can't tell the difference between structural characters and ones that happen to appear inside a value.",
          "In practice, that means the right way to use this tool is to encode just the piece that needs it — a search term, an email address, a parameter value — and build the rest of the URL around it yourself."
        ]
      }
    ],
    relatedToolIds: ["base64", "slug-gen"]
  },
  {
    id: "word-counter",
    name: "Word Counter",
    slug: "word-counter",
    description: "Count words, characters, and lines in your text.",
    metaDescription: "Get an instant word count, character count, sentence count, and more as you type — free, no sign-up, works entirely in your browser.",
    longDescription: "Word Counter shows six live stats as you type or paste text: words, total characters, characters excluding spaces, lines, sentences, and paragraphs. All six update together, so you can watch a specific count while editing toward a limit.",
    category: "text",
    icon: "Type",
    useCases: [
      "Checking an essay or article against a word-count requirement.",
      "Staying under a character limit for a tweet, meta description, or form field.",
      "Getting a quick sense of a document's length and structure before editing it."
    ],
    contentSections: [
      {
        id: "limits-by-platform",
        heading: "Word and Character Limits by Platform",
        paragraphs: [
          "Different platforms enforce different limits, and it's easy to lose track of which one applies where. A post on X (formerly Twitter) is capped at 280 characters. A meta description in search results is typically truncated somewhere around 155–160 characters, though Google doesn't enforce a hard limit — it just cuts off what it shows. Academic and professional writing requirements are usually word-based rather than character-based, and vary by assignment or publication rather than following a universal standard.",
          "This tool reports characters both with and without spaces, plus word, sentence, and paragraph counts, so you can check against whichever limit actually applies to what you're writing."
        ]
      }
    ],
    relatedToolIds: ["case-converter", "text-diff"]
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    description: "Convert text between UPPERCASE, lowercase, camelCase, and more.",
    metaDescription: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case — instantly, in your browser.",
    longDescription: "Case Converter switches text between six casing styles: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case. Pick a style and the text updates immediately, ready to copy.",
    category: "text",
    icon: "CaseUpper",
    useCases: [
      "Converting a variable or field name to camelCase or snake_case to match a coding convention.",
      "Fixing text that was accidentally typed in all caps or all lowercase.",
      "Formatting a heading into Title Case for a document or webpage."
    ],
    tips: [
      "Only camelCase and snake_case are available for programming-style casing — kebab-case (hyphen-separated) isn't currently supported, so if that's what you need, snake_case output can be adjusted afterward by swapping underscores for hyphens."
    ],
    contentSections: [
      {
        id: "casing-conventions",
        heading: "Casing Conventions in Code",
        paragraphs: [
          "Different languages and contexts favor different casing conventions, and mixing them up is a common source of style inconsistency. camelCase (firstName) is the standard for variables and function names in JavaScript, Java, and similar languages. snake_case (first_name) is the convention in Python and Ruby, and is also common for database column names and environment variables regardless of language. Title Case and Sentence case are formatting choices for human-readable text — headings, labels, and prose — rather than code identifiers."
        ]
      }
    ],
    relatedToolIds: ["slug-gen", "word-counter"]
  },
  {
    id: "password-gen",
    name: "Password Generator",
    slug: "password-generator",
    description: "Generate secure, random passwords with custom settings.",
    metaDescription: "Generate a random password using your browser's cryptographically secure random number generator — created locally and never transmitted anywhere.",
    longDescription: "Password Generator creates a random password using whichever character sets you enable — uppercase, lowercase, numbers, and symbols — at a length you choose from 4 to 64 characters. Character selection uses the Web Crypto API's cryptographically secure random number generator, rather than Math.random(), which is not designed for security-sensitive values. Generation runs entirely in your browser, so the password is never sent anywhere before you see it.",
    category: "generators",
    icon: "Lock",
    howTo: "Set your desired length with the slider, choose which character types to include, and click Generate. Click the refresh icon to generate a new one with the same settings, or copy the result directly.",
    steps: [
      "Set your desired password length using the slider (4–64 characters).",
      "Toggle which character types to include: uppercase, lowercase, numbers, symbols.",
      "Click Generate to create a password using the Web Crypto API.",
      "Click the refresh icon to generate a new one with the same settings, or copy the result."
    ],
    useCases: [
      "Creating a one-off password for a new account or service.",
      "Generating a password that meets a specific site's length or character requirements by toggling the relevant options."
    ],
    tips: [
      "Length matters more than complexity for resisting brute-force guessing — a longer password with fewer symbol requirements is generally stronger than a short one packed with special characters.",
      "Because generation happens locally, closing or refreshing the page means the password is gone for good if you didn't copy it — there's no history to recover it from."
    ],
    faqs: [
      {
        question: "Is this password generator cryptographically secure?",
        answer: "The randomness used to select each character comes from the Web Crypto API (crypto.getRandomValues()), the same source browsers use for cryptographic operations — not Math.random(), which isn't designed for security-sensitive values. That covers the randomness itself; how you store and use the resulting password is still up to you."
      },
      {
        question: "Are all four character types guaranteed to appear?",
        answer: "Yes — if you enable multiple character types, at least one character from each enabled type is guaranteed to appear in the generated password, not left to chance. Their positions are then shuffled so they don't predictably cluster at the start."
      }
    ],
    contentSections: [
      {
        id: "what-makes-strong",
        heading: "What Makes a Strong Password?",
        paragraphs: [
          "Password strength mostly comes down to how many possible passwords an attacker would have to guess before finding the right one — a property called entropy. Length contributes far more to this than character variety does: adding four more characters to a password increases the guessing space more than adding symbols to a shorter one. That's why a longer password using just letters and numbers can be stronger than a short one packed with symbols.",
          "The other factor that matters is unpredictability. A password generated by a genuine random process, like this tool's, has no pattern an attacker could exploit — unlike a password a person chooses by hand, which tends to follow patterns (real words, predictable substitutions, personal details) that make it easier to guess than its length alone would suggest."
        ]
      },
      {
        id: "how-randomness-works",
        heading: "How This Generator's Randomness Works",
        paragraphs: [
          "Each character is selected using the Web Crypto API's crypto.getRandomValues(), not Math.random(). To avoid a subtle statistical bias that a naive implementation would introduce — where some characters would be selected very slightly more often than others — this tool uses rejection sampling: it draws a random value and discards it if it falls in a range that wouldn't map evenly onto the character set, then draws again.",
          "If you've enabled multiple character types, one character from each enabled type is drawn first to guarantee it appears, and the rest of the password is filled from the full combined set. The whole result is then shuffled using a Fisher-Yates shuffle — also driven by the same secure randomness — so the guaranteed characters don't end up predictably placed at the start."
        ]
      }
    ],
    relatedToolIds: ["uuid-gen"],
    relatedGuideSlugs: ["secure-passwords", "client-side-processing"]
  },
  {
    id: "uuid-gen",
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate unique v4 UUIDs instantly.",
    metaDescription: "Generate one or many random (v4) UUIDs instantly — free, no sign-up, created entirely in your browser.",
    longDescription: "UUID Generator creates version 4 (random) UUIDs — 128-bit identifiers commonly used as unique keys in databases and distributed systems, where collisions between independently generated IDs need to be effectively impossible.",
    category: "generators",
    icon: "Fingerprint",
    howTo: "Set how many UUIDs you want (1–100) and click Generate. Copy an individual UUID or use 'Copy All' to grab the full list at once, one per line.",
    useCases: [
      "Generating a primary key or unique identifier for a new database record.",
      "Creating placeholder IDs for testing or seed data.",
      "Generating a batch of unique tokens or reference codes at once."
    ],
    faqs: [
      {
        question: "What does 'v4' mean?",
        answer: "UUID version 4 means the ID is generated primarily from random numbers, as opposed to other UUID versions that incorporate timestamps or hardware identifiers. It's the most common version for general-purpose unique IDs."
      }
    ],
    contentSections: [
      {
        id: "what-used-for",
        heading: "What UUIDs Are Used For",
        paragraphs: [
          "A UUID's job is to be unique without any central coordination — no database or server needs to hand them out in sequence, since the odds of two independently generated v4 UUIDs colliding are astronomically small. That makes them well suited to a few recurring situations: primary keys in a database where you want to generate the ID client-side or across multiple services without a shared counter, identifiers in a distributed system where different machines are creating records independently, and one-off tokens or reference codes where you just need something unique, not something sequential or predictable."
        ]
      }
    ],
    relatedToolIds: ["password-gen"]
  },
  {
    id: "timestamp",
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    metaDescription: "Convert a Unix timestamp to a readable date, or a date to its Unix timestamp — with a live current-timestamp display, free and browser-based.",
    longDescription: "Timestamp Converter converts between Unix timestamps (seconds since January 1, 1970) and human-readable dates in both directions, and displays the current Unix timestamp updating live.",
    category: "converters",
    icon: "Clock",
    howTo: "Enter a Unix timestamp in seconds and convert it to a readable date, or enter a date and convert it to its Unix timestamp. The live counter at the top shows the current timestamp at all times for quick reference.",
    useCases: [
      "Converting a timestamp from an API response or database record into a readable date while debugging.",
      "Converting a specific date into a Unix timestamp for use in code, a query, or a URL parameter.",
      "Quickly checking the current Unix timestamp without running a script."
    ],
    commonMistakes: [
      "This tool works in seconds, not milliseconds — if you're debugging JavaScript's Date.now() or a value from an API that uses milliseconds, divide by 1000 first or the conversion will be off by a factor of 1000."
    ],
    faqs: [
      {
        question: "Why is my timestamp off by a factor of 1000?",
        answer: "This usually means a mismatch between seconds and milliseconds. This tool works in seconds (the standard Unix timestamp unit), but JavaScript's Date.now() and many APIs return milliseconds. If your numbers look 1000x too large, divide by 1000 before converting."
      }
    ]
  },
  {
    id: "markdown",
    name: "Markdown Previewer",
    slug: "markdown-previewer",
    description: "Write Markdown and see the rendered HTML in real-time.",
    metaDescription: "Write Markdown and see the rendered output update live, side by side — supports tables, code blocks, and GitHub-flavored syntax.",
    longDescription: "Markdown Previewer renders Markdown as you type, including GitHub-flavored extensions like tables, strikethrough, and task lists, with syntax-highlighted code blocks.",
    category: "coding",
    icon: "FileText",
    useCases: [
      "Previewing a README before committing it to a repository.",
      "Drafting documentation or a blog post in Markdown and checking formatting as you go.",
      "Checking how a table or code block will actually render before pasting Markdown somewhere else."
    ],
    tips: [
      "Supports GitHub-flavored Markdown, so tables, strikethrough (~~text~~), and task lists ([ ] / [x]) all render correctly, not just basic headings and lists."
    ],
    faqs: [
      {
        question: "Does this support GitHub-flavored Markdown?",
        answer: "Yes — tables, strikethrough, and task lists all render correctly, along with syntax-highlighted fenced code blocks, in addition to standard Markdown formatting."
      }
    ]
  },
  {
    id: "html-minify",
    name: "HTML Minifier",
    slug: "html-minifier",
    description: "Compress your HTML code by removing unnecessary whitespace.",
    metaDescription: "Strip comments and unnecessary whitespace from HTML to reduce file size — free, instant, and processed entirely in your browser.",
    longDescription: "HTML Minifier removes comments, collapses whitespace between tags, and trims unnecessary line breaks to reduce the size of an HTML file. It's a lightweight cleanup pass, not a full build-tool-grade minifier.",
    category: "coding",
    icon: "Code",
    useCases: [
      "Shrinking a static HTML file before deploying it without setting up a build pipeline.",
      "Cleaning up HTML that was exported from a design tool or CMS with excessive whitespace."
    ],
    tips: [
      "For a production site with a real build process, a dedicated build-tool minifier will typically do more (like minifying inline scripts and styles together) — this tool is best suited for quick, one-off cleanup rather than a full production pipeline."
    ],
    contentSections: [
      {
        id: "basic-vs-buildtool",
        heading: "Basic vs Build-Tool Minification",
        paragraphs: [
          "This tool strips HTML comments and collapses whitespace between tags — a straightforward cleanup pass on the markup itself. It doesn't reach into inline <script> or <style> blocks and minify them separately, and it doesn't restructure the document. A build-tool minifier (the kind bundled into a framework's production build) typically handles all of that together as part of a larger optimization pass. For a quick size reduction on a standalone HTML file, this tool is enough; for a production site, that's what your build pipeline is for."
        ]
      }
    ],
    relatedToolIds: ["css-minify", "js-minify"]
  },
  {
    id: "css-minify",
    name: "CSS Minifier",
    slug: "css-minifier",
    description: "Minify your CSS files for faster load times.",
    metaDescription: "Remove comments and unnecessary whitespace from CSS to reduce file size — free, instant, and processed entirely in your browser.",
    longDescription: "CSS Minifier strips comments and collapses unnecessary whitespace and spacing around selectors and declarations to reduce a stylesheet's file size.",
    category: "coding",
    icon: "Palette",
    useCases: [
      "Shrinking a hand-written stylesheet before deploying a small static site.",
      "Cleaning up CSS pasted from a design export or generator that includes excessive whitespace."
    ],
    contentSections: [
      {
        id: "basic-vs-buildtool",
        heading: "Basic vs Build-Tool Minification",
        paragraphs: [
          "This tool strips comments, collapses whitespace, and removes unnecessary spacing around selectors and declarations — the parts of a stylesheet that exist for human readability rather than for the browser. It doesn't go further than that: a build-tool minifier like cssnano can also merge duplicate rules, shorten color values, and drop redundant units, none of which this tool attempts. For cleaning up a hand-written or exported stylesheet before a quick deploy, that's usually enough; a larger codebase with a real build step will get more out of a dedicated minifier."
        ]
      }
    ],
    relatedToolIds: ["html-minify", "js-minify"]
  },
  {
    id: "js-minify",
    name: "JS Minifier",
    slug: "js-minifier",
    description: "Minify JavaScript code to reduce file size.",
    metaDescription: "Basic JavaScript minifier for quick file-size cleanup — strips comments and whitespace, free and browser-based.",
    longDescription: "JS Minifier strips comments and collapses unnecessary whitespace to reduce file size. It's a basic, lightweight minifier — it doesn't rename variables or eliminate dead code the way a full build-tool minifier (like Terser) does.",
    category: "coding",
    icon: "FileCode",
    useCases: [
      "Quick size reduction for a small script without setting up a bundler.",
      "Cleaning up a snippet before pasting it somewhere space-constrained."
    ],
    commonMistakes: [
      "This is a lightweight, comment-and-whitespace-only minifier — for a production JavaScript bundle, a dedicated tool like Terser or esbuild will produce significantly smaller output through variable renaming and dead-code elimination."
    ],
    contentSections: [
      {
        id: "basic-vs-buildtool",
        heading: "Basic vs Build-Tool Minification",
        paragraphs: [
          "JavaScript minification has more room to be aggressive than HTML or CSS, because a build-tool minifier like Terser or esbuild can actually understand the code — renaming local variables to shorter names, removing code that's provably unreachable, and restructuring expressions to be more compact, all while preserving behavior. This tool doesn't do any of that; it strips comments and collapses whitespace, which is a real size reduction but a much smaller one than a proper build step achieves. Treat this as a quick cleanup for a standalone script, not a substitute for your bundler's minifier in production."
        ]
      }
    ],
    relatedToolIds: ["html-minify", "css-minify"]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test your regular expressions against sample text.",
    metaDescription: "Test a regular expression against sample text and see every match and capture group highlighted live — free and browser-based.",
    longDescription: "Regex Tester runs a regular expression against sample text and shows every match live as you type, including any capture groups within each match.",
    category: "coding",
    icon: "Search",
    howTo: "Enter your pattern, set any flags you need (like 'g' for global or 'i' for case-insensitive), and type or paste your test text. Matches update live, with each match's index and any capture groups listed below it.",
    steps: [
      "Enter your regular expression pattern.",
      "Set any flags you need — for example 'g' for global matching or 'i' for case-insensitive.",
      "Type or paste your test text — matches update live as you type.",
      "Review each match's index and any capture groups listed below it."
    ],
    useCases: [
      "Debugging why a regex isn't matching what you expect before using it in code.",
      "Testing an email, URL, or phone-number pattern against a range of sample inputs.",
      "Understanding what a capture group in an existing regex actually extracts."
    ],
    tips: [
      "The 'g' (global) flag changes whether the tool finds every match or stops at the first one — if you're only seeing one result but expect more, check whether 'g' is included in the flags field."
    ],
    faqs: [
      {
        question: "Why is my regex only matching once?",
        answer: "Without the 'g' (global) flag, a regex stops after its first match. Add 'g' to the flags field to find every match in the text instead of just the first."
      },
      {
        question: "What do capture groups do?",
        answer: "Parentheses in a pattern create a capture group — a sub-part of the match that gets extracted separately. This tool lists each match's capture groups underneath it, so you can see exactly what each group pulled out."
      },
      {
        question: "Is this JavaScript regex or another flavor?",
        answer: "This tool uses JavaScript's native regular expression engine — the same one that runs in browsers and Node.js — so patterns and flags behave exactly as they would in your own JS code, which may differ slightly from other regex flavors like PCRE or POSIX."
      }
    ],
    contentSections: [
      {
        id: "common-patterns",
        heading: "Common Regex Patterns",
        paragraphs: [
          "A few patterns come up often enough to be worth having on hand: an email-like string generally matches ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$, a simple word made only of letters matches [a-zA-Z]+, and digits-only matches \\d+. These are deliberately simple starting points, not production-grade validators — real-world email and URL formats have edge cases that a short pattern won't fully cover, so treat patterns like these as a first pass to test against representative examples, not a final answer."
        ]
      },
      {
        id: "understanding-flags",
        heading: "Understanding Regex Flags",
        paragraphs: [
          "Flags change how a pattern matches without changing the pattern itself. 'g' (global) finds every match in the text instead of stopping at the first one — the most common source of \"why isn't this matching everything\" confusion. 'i' (case-insensitive) makes the match ignore letter case. 'm' (multiline) changes how ^ and $ behave, matching the start and end of each line rather than only the start and end of the whole string. Flags can be combined by typing them together, like 'gi'."
        ]
      }
    ],
    relatedGuideSlugs: ["understanding-regex"]
  },
  {
    id: "color-conv",
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, and HSL formats.",
    metaDescription: "Convert a color between HEX, RGB, and HSL instantly, with a live color preview — free and browser-based.",
    longDescription: "Color Converter shows a HEX color's equivalent RGB and HSL values simultaneously, updating live as you pick a color or type a hex code, with each value ready to copy.",
    category: "converters",
    icon: "Palette",
    useCases: [
      "Converting a HEX value from a design tool into RGB or HSL for use in CSS.",
      "Reading a color's HSL breakdown to understand its lightness and saturation at a glance.",
      "Double-checking a color code matches across design and code."
    ],
    contentSections: [
      {
        id: "hex-vs-rgb-vs-hsl",
        heading: "When to Use HEX vs RGB vs HSL",
        paragraphs: [
          "All three formats describe the same color space, just structured differently. HEX (#3b82f6) is compact and the most common format in design tools and CSS, but the value itself doesn't tell you much at a glance. RGB (rgb(59, 130, 246)) breaks a color into red, green, and blue channels, which is useful when you're compositing or blending colors programmatically. HSL (hsl(217, 91%, 60%)) separates hue from lightness and saturation, which makes it the easiest format to adjust by hand — increasing the lightness value alone gives you a predictable lighter shade of the same color, something that's not straightforward to do by eye in HEX or RGB."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I input RGB or HSL directly instead of HEX?",
        answer: "No — this tool takes a HEX value (typed or picked) as input and computes the equivalent RGB and HSL values from it. RGB and HSL are shown as output, not as separate input fields."
      }
    ]
  },
  {
    id: "slug-gen",
    name: "Slug Generator",
    slug: "slug-generator",
    description: "Convert any string into a URL-friendly slug.",
    metaDescription: "Turn any text into a clean, URL-friendly slug — lowercase, hyphenated, and free of special characters. Free and instant.",
    longDescription: "Slug Generator converts any text into a URL-friendly slug: lowercase, hyphen-separated, with special characters removed and repeated or leading/trailing hyphens cleaned up.",
    category: "generators",
    icon: "Link2",
    useCases: [
      "Turning a blog post or page title into a clean URL path.",
      "Generating a consistent, readable identifier from user-submitted text."
    ],
    tips: [
      "A clean, readable slug is a small but genuine SEO factor — search engines and users can both read /blog/how-to-format-json more easily than a random ID or an unencoded title with spaces and punctuation."
    ],
    commonMistakes: [
      "Accented characters (like é or ñ) are stripped out rather than converted to their unaccented equivalent — 'café' becomes 'caf', not 'cafe'. Review the output if your source text uses accents.",
      "There's no length limit — a long title produces an equally long slug. Trim it yourself if you need a shorter URL."
    ],
    faqs: [
      {
        question: "Does this handle special characters and accents?",
        answer: "Punctuation and special characters are removed. Accented characters are also removed rather than converted to their plain-letter equivalent, so 'café' becomes 'caf' — worth double-checking the output if your text includes accents."
      },
      {
        question: "Is there a length limit for slugs?",
        answer: "No — this tool doesn't truncate the output, so a long title will produce an equally long slug. If you want a shorter URL, trim the input or the result yourself."
      }
    ],
    contentSections: [
      {
        id: "why-slugs-matter",
        heading: "Why Slugs Matter for SEO",
        paragraphs: [
          "A slug is the readable part of a URL that identifies a specific page — the /how-to-format-json in yoursite.com/blog/how-to-format-json. A clean slug isn't a ranking factor on its own, but it supports SEO in more indirect, practical ways: it's more readable in search results and when shared as a link, it gives both users and search engines a clear, descriptive signal of what the page is about, and it's easier to maintain consistently across a site than an unencoded title or an opaque ID.",
          "The opposite — a URL full of spaces, punctuation, or a random identifier — doesn't directly hurt rankings either, but it's a worse experience for anyone reading the URL before clicking, and it's harder to keep consistent as a site grows."
        ]
      }
    ],
    relatedToolIds: ["case-converter", "url-codec"]
  },
  {
    id: "text-sorter",
    name: "Text Sorter",
    slug: "text-sorter",
    description: "Sort lines of text alphabetically or numerically.",
    metaDescription: "Sort lines of text alphabetically, ascending or descending, or reverse their order — free and instant, right in your browser.",
    longDescription: "Text Sorter arranges the lines of a block of text alphabetically (ascending or descending) or simply reverses their current order.",
    category: "text",
    icon: "SortAsc",
    useCases: [
      "Alphabetizing a list of names, tags, or items pasted from another source.",
      "Reversing a chronological log so the most recent entries appear first.",
      "Preparing a list for easier scanning or comparison by putting it in a consistent order."
    ],
    relatedToolIds: ["deduplicator"]
  },
  {
    id: "deduplicator",
    name: "Line Deduplicator",
    slug: "line-deduplicator",
    description: "Remove duplicate lines from your text automatically.",
    metaDescription: "Remove duplicate lines from a list instantly, with a count of how many were removed — free and browser-based.",
    longDescription: "Line Deduplicator removes repeated lines from a block of text, trimming whitespace on each line first so near-identical lines with extra spaces are still caught, and reports how many duplicates were removed.",
    category: "text",
    icon: "CopyMinus",
    useCases: [
      "Cleaning up a mailing list or contact list that has repeated entries.",
      "Deduplicating log lines to see only the unique events.",
      "Merging two lists and removing the overlap."
    ],
    faqs: [
      {
        question: "Is the duplicate check case-sensitive?",
        answer: "Yes — 'Example' and 'example' are treated as different lines and both kept. If you need case-insensitive deduplication, convert the text to a single case first (for example with the Case Converter) before running it through here."
      }
    ],
    relatedToolIds: ["text-sorter", "text-diff"]
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate placeholder text for your designs.",
    metaDescription: "Generate Lorem Ipsum placeholder text by paragraph count — free and instant, ready to paste into any mockup or draft.",
    longDescription: "Lorem Ipsum Generator produces classic Lorem Ipsum placeholder text in however many paragraphs you need, for filling in layouts and mockups before real content is ready.",
    category: "generators",
    icon: "FileText"
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
