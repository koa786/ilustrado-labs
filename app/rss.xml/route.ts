import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = "https://ilustradolabs.com";

  const itemsXml = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.frontmatter.category}]]></category>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
  <channel>
    <title>Ilustrado Labs Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights, tutorials, and engineering best practices for developer tools.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
