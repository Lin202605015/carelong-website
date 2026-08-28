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
  adapter: vercel(),
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
