// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Puerto dedicado para el Style Editor
const STYLE_EDITOR_PORT = 4568;

export default defineConfig({
  base: '/',
  trailingSlash: 'ignore',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: STYLE_EDITOR_PORT,
  },
  vite: {
    server: {
      fs: {
        // Allow access to parent project files (tokens, components)
        allow: ['../..']
      },
      proxy: {
        // Proxy para la app Angular en localhost:4200
        '/proxy/4200': {
          target: 'http://localhost:4200',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy\/4200/, ''),
          ws: true
        },
        // Proxy para React en localhost:3000
        '/proxy/3000': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy\/3000/, ''),
          ws: true
        },
        // Proxy para Vite en localhost:5173
        '/proxy/5173': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy\/5173/, ''),
          ws: true
        }
      }
    }
  }
});
