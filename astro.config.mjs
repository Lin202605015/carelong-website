import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@layouts': pathResolve(__dirname, 'src/layouts'),
        '@components': pathResolve(__dirname, 'src/components'),
        '@data': pathResolve(__dirname, 'src/data'),
      },
    },
  },
  site: 'https://carelong.com.cn',
  output: 'server',
  redirects: {
    '/products/display-rack/newspaper-display-racks': '/products/display-rack/newspaper-magazine-racks',
    '/products/display-rack/wall-mounted-display-racks': '/products/display-rack/wall-mounted-storage-racks',
    '/es/products/display-rack/newspaper-display-racks': '/es/products/display-rack/newspaper-magazine-racks',
    '/es/products/display-rack/wall-mounted-display-racks': '/es/products/display-rack/wall-mounted-storage-racks',
  },
  adapter: vercel({
    isr: {
      // Cache all SSR pages at Vercel Edge for 10 minutes (600s).
      // First visit: SSR → cache. Subsequent visits: served from edge cache (no cold start).
      // After 600s: background revalidation. Contact form / API routes are excluded.
      expiration: 600,
      exclude: ['/contact', '/api/'],
    },
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.includes('/thank-you/') && !page.includes('/banking/'),
      customPages: [],
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
    }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
