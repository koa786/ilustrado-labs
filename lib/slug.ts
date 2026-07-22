/**
 * Slugify text for heading IDs (e.g. "What is JSON?" -> "what-is-json")
 * Client and Server safe utility.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "") // strip HTML tags
    .replace(/[^\w\s-]/g, "") // strip special characters
    .trim()
    .replace(/\s+/g, "-");
}
