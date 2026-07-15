export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  { 
    id: 1, 
    title: "10 Essential Developer Tools for 2026", 
    slug: "essential-tools-2026", 
    date: "2026-03-15T00:00:00Z", 
    excerpt: "Discover the must-have tools that every modern developer should have in their arsenal.",
    author: "Ilustrado Team",
    category: "Development",
    readTime: "8 min read"
  },
  { 
    id: 2, 
    title: "Mastering JSON: Tips and Tricks", 
    slug: "mastering-json", 
    date: "2026-03-12T00:00:00Z", 
    excerpt: "Learn how to handle complex JSON structures and optimize your data processing workflow.",
    author: "Ilustrado Team",
    category: "Tutorials",
    readTime: "10 min read"
  },
  { 
    id: 3, 
    title: "The Importance of Client-Side Processing", 
    slug: "client-side-processing", 
    date: "2026-03-10T00:00:00Z", 
    excerpt: "Why processing data in the browser is better for privacy, speed, and security.",
    author: "Ilustrado Team",
    category: "Security",
    readTime: "6 min read"
  },
  { 
    id: 4, 
    title: "Understanding Regular Expressions", 
    slug: "understanding-regex", 
    date: "2026-03-08T00:00:00Z", 
    excerpt: "A comprehensive guide to mastering regex for everyday development tasks.",
    author: "Ilustrado Team",
    category: "Tutorials",
    readTime: "12 min read"
  },
  { 
    id: 5, 
    title: "Secure Password Management", 
    slug: "secure-passwords", 
    date: "2026-03-05T00:00:00Z", 
    excerpt: "How to generate and manage secure passwords in the age of cyber threats.",
    author: "Ilustrado Team",
    category: "Security",
    readTime: "7 min read"
  },
];
