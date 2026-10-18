// -----------------------------------------------------------------------------
// blogPosts.ts — single source of truth for blog post data.
//
// A tiny "static CMS" — a typed array of post objects. Both the /blog list
// page and the /blog/:slug detail page import from here. In a real site
// you'd fetch this from a headless CMS or generate it from Markdown files
// at build time, but the React shape stays the same either way.
// -----------------------------------------------------------------------------

export type BlogPost = {
  slug: string;
  title: string;
  publishedOn: string; // ISO-8601 (YYYY-MM-DD). Parseable by new Date(...).
  readingTimeMinutes: number;
  excerpt: string;
  tags: string[];
  // Each string in `paragraphs` becomes one <p> in the rendered post.
  // Keeping the body as an array of paragraphs (instead of a single string
  // with `\n\n`) means the JSX loop stays simple: paragraphs.map(...).
  paragraphs: string[];
};

export const BLOG_POSTS: BlogPost[] = [];
