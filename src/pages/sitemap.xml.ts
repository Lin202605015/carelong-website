import type { APIRoute } from 'astro';

const BASE_URL = 'https://carelong.com.cn';

// All pages with their approximate last modified dates
const pages = [
  // Main pages
  { url: '/', lastmod: '2026-07-03', priority: '1.0', changefreq: 'weekly' },
  { url: '/about/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'monthly' },
  { url: '/capabilities/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'monthly' },
  { url: '/contact/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'monthly' },
  { url: '/factory/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/quality/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/news/', lastmod: '2026-07-03', priority: '0.7', changefreq: 'weekly' },
  { url: '/faq/', lastmod: '2026-07-03', priority: '0.7', changefreq: 'monthly' },
  // Product category pages
  { url: '/products/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/bolts-and-nuts/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/bolts-and-nuts/hub-bolts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/plow-bolts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/track-bolts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/segment-bolts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/hex-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/flange-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/nylon-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/wheel-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bolts-and-nuts/slotted-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/stamping-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/die-casting-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/forging-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/machining-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/welding-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/plastic-rubber-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/heavy-equipment-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/auto-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/other-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/tooling-and-moulds/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  // Spanish pages
  { url: '/es/', lastmod: '2026-07-03', priority: '1.0', changefreq: 'weekly' },
  { url: '/es/about/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'monthly' },
  { url: '/es/capabilities/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'monthly' },
  { url: '/es/contact/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'monthly' },
  { url: '/es/factory/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/quality/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/news/', lastmod: '2026-07-03', priority: '0.7', changefreq: 'weekly' },
  { url: '/es/faq/', lastmod: '2026-07-03', priority: '0.7', changefreq: 'monthly' },
  { url: '/es/products/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'weekly' },
  { url: '/es/products/bolts-and-nuts/', lastmod: '2026-07-03', priority: '0.9', changefreq: 'weekly' },
  { url: '/es/products/bolts-and-nuts/hub-bolts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/plow-bolts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/track-bolts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/segment-bolts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/hex-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/flange-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/nylon-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/wheel-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/bolts-and-nuts/slotted-nuts/', lastmod: '2026-08-27', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/stamping-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/die-casting-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/forging-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/machining-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/welding-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/plastic-rubber-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/heavy-equipment-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/auto-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/other-parts/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
  { url: '/es/products/tooling-and-moulds/', lastmod: '2026-07-03', priority: '0.8', changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const urlSet = pages
    .map(
      (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${page.url.replace('/es/', '/')}" />
    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}/es${page.url.replace('/es/', '/')}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${page.url.replace('/es/', '/')}" />
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlSet}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
};