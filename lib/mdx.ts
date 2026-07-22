import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugifyHeading } from "@/lib/slug";

export { slugifyHeading };

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  slug: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: string;
  toc: TOCItem[];
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

/**
 * Calculate reading time based on word count (~200 words per minute)
 */
export function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Extract Table of Contents items (h2 and h3 headings) from raw markdown/MDX
 */
export function extractTOC(content: string): TOCItem[] {
  const headingLines = content.split("\n").filter((line) => /^#{2,3}\s+/.test(line));
  return headingLines.map((line) => {
    const level = line.startsWith("###") ? 3 : 2;
    const text = line.replace(/^#{2,3}\s+/, "").replace(/[*_~`]/g, "").trim();
    const id = slugifyHeading(text);
    return { id, text, level };
  });
}

/**
 * Read and parse all MDX blog posts sorted by date descending
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const filenames = fs.readdirSync(BLOG_DIRECTORY).filter((file) => file.endsWith(".mdx"));

  const posts: BlogPost[] = filenames
    .map((filename) => {
      const filePath = path.join(BLOG_DIRECTORY, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      const fallbackSlug = filename.replace(/\.mdx$/, "");
      const frontmatter: BlogPostFrontmatter = {
        title: data.title || "Untitled Post",
        description: data.description || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        author: data.author || "Ilustrado Labs",
        category: data.category || "General",
        tags: Array.isArray(data.tags) ? data.tags : [],
        image: data.image || `https://picsum.photos/seed/${fallbackSlug}/1200/675`,
        featured: Boolean(data.featured),
        slug: data.slug || fallbackSlug,
      };

      return {
        slug: frontmatter.slug,
        frontmatter,
        content,
        readingTime: calculateReadingTime(content),
        toc: extractTOC(content),
      };
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.frontmatter.featured);
  return featured.length > 0 ? featured : posts.slice(0, 2);
}

/**
 * Get list of unique categories
 */
export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.frontmatter.category)));
  return categories.sort();
}

/**
 * Get related articles based on category and shared tags
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const posts = getAllPosts();
  const currentPost = posts.find((p) => p.slug === currentSlug);

  if (!currentPost) {
    return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }

  const otherPosts = posts.filter((p) => p.slug !== currentSlug);

  // Score posts by category match and overlapping tags
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;
    if (post.frontmatter.category === currentPost.frontmatter.category) {
      score += 5;
    }
    const sharedTags = post.frontmatter.tags.filter((t) =>
      currentPost.frontmatter.tags.includes(t)
    );
    score += sharedTags.length * 2;
    return { post, score };
  });

  scoredPosts.sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map((sp) => sp.post);
}

/**
 * Search posts by query across title, description, category, tags, and content
 */
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  if (!query.trim()) return posts;

  const q = query.toLowerCase().trim();
  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(q);
    const descMatch = post.frontmatter.description.toLowerCase().includes(q);
    const categoryMatch = post.frontmatter.category.toLowerCase().includes(q);
    const tagMatch = post.frontmatter.tags.some((t) => t.toLowerCase().includes(q));
    const contentMatch = post.content.toLowerCase().includes(q);

    return titleMatch || descMatch || categoryMatch || tagMatch || contentMatch;
  });
}
