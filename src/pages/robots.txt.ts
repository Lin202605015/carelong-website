import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.carelong.com.cn/sitemap-index.xml

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