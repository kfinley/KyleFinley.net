
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import format from 'xml-formatter';

import router  from '../router/';

export const sitemapPlugin = () =>
({
    name: 'vite-plugin-sitemap',
    enforce: 'pre',
    apply() {
        // const routes = config.flatMap(({ items }: any) => items);
        const sitemapStream = new SitemapStream({ hostname: 'https://kylefinley.net/' });
        router.options.routes?.forEach((r) => {
            sitemapStream.write({ url: r.path });
        });
        streamToPromise(sitemapStream)
            .then((sitemap: any) => {
                return writeFile(resolve(__dirname, '../public/sitemap.xml'), format(sitemap.toString('utf-8')));
            })
            .catch(console.error);
        sitemapStream.end();
        return true;
    },
} as const);
