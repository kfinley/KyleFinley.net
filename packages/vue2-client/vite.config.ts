import { defineConfig } from 'vite';
import path from 'path';
import { createVuePlugin } from 'vite-plugin-vue2';
import md2Vue2Plugin from 'vite-plugin-md2vue2'
import emoji from 'markdown-it-emoji'

// fails with TypeError: import_meta.glob is not a function
// Possibly investigate this later but for now using a very simple bash script to handle generating a site map at deploy
// import { sitemapPlugin } from './src/vite-plugins/sitemap-plugin';

export default defineConfig(
  {
    build: {
      // target: 'es2020',
      chunkSizeWarningLimit: 600,
      cssCodeSplit: false
    },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     target: 'es2020',
    //   }
    // },
    plugins: [
      md2Vue2Plugin({
        // https://markdown-it.docschina.org/
        markdownItOptions: {
          linkify: true,
          typographer: true
        },
        markdownItPlugins: [emoji],
      }),
      createVuePlugin(),
      // sitemapPlugin(),
    ],
    server: {
      port: 8080
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/_variables.scss";`
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      },
    },
    define: {
      'process.env': process.env
    }
  });
