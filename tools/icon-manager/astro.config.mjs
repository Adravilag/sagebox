// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Puerto dedicado para el Icon Manager (evita conflictos con otros servidores)
const ICON_MANAGER_PORT = 4567;

export default defineConfig({
  base: '/',
  trailingSlash: 'ignore',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: ICON_MANAGER_PORT
  },
  vite: {
    server: {
      fs: {
        // Allow access to parent project files (icons.json)
        allow: ['../..']
      }
    }
  }
});
