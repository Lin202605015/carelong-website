import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# Allow AI search crawlers (ChatGPT / OpenAI)
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

# Sitemap
Sitemap: https://carelong.com.cn/sitemap.xml

# Crawl-delay for polite bots
Crawl-delay: 10

# Disallow admin/internal paths (none currently, but reserved)
Disallow: /api/
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};