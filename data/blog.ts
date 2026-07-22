import { getAllPosts, BlogPost as MDXBlogPost } from "@/lib/mdx";

export interface BlogPost {
  id: number | string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
}

/**
 * Re-exports blogPosts dynamically from MDX files to ensure backwards compatibility
 * while strictly using MDX as the source of truth.
 */
export const blogPosts: BlogPost[] = getAllPosts().map((post, index) => ({
  id: index + 1,
  title: post.frontmatter.title,
  slug: post.slug,
  date: post.frontmatter.date,
  excerpt: post.frontmatter.description,
  author: post.frontmatter.author,
  category: post.frontmatter.category,
  readTime: post.readingTime,
}));
