import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gochat.ar',
  server: { host: true, port: 4321 },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        const isEn = !url.includes('/es/');
        const enUrl = url.replace('/es/', '/');
        const esUrl = isEn
          ? url.replace('https://gochat.ar/', 'https://gochat.ar/es/')
          : url;

        item.links = [
          { url: enUrl, lang: 'en' },
          { url: esUrl, lang: 'es' },
          { url: enUrl, lang: 'x-default' },
        ];

        if (url === 'https://gochat.ar/' || url === 'https://gochat.ar/es/') {
          item.priority = 1.0;
        } else if (url.includes('/alternative-to-')) {
          item.priority = 0.6;
        } else {
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
});
