#!/usr/bin/env node
/**
 * 🔥 SageBox Development Watch Script
 * 
 * Este script ejecuta Stencil en modo watch y reconstruye el wrapper de Angular
 * automáticamente cuando hay cambios. Optimizado para desarrollo con MediQ.
 * 
 * Uso:
 *   npm run dev:watch
 *   node scripts/dev-watch.js
 * 
 * Opciones de entorno:
 *   SAGEBOX_WATCH_ANGULAR=false  - Deshabilita rebuild de Angular wrapper
 *   SAGEBOX_NOTIFY_CONSUMERS=true - Notifica a consumidores (experimental)
 */

import { spawn, execSync } from 'child_process';
import { watch } from 'fs';
import { resolve, join } from 'path';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_DIR = join(ROOT, 'dist');
const ANGULAR_WRAPPER = join(ROOT, 'wrappers', 'angular');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  step: (msg) => console.log(`${colors.cyan}→${colors.reset} ${msg}`),
};

// Configuration
const config = {
  watchAngular: process.env.SAGEBOX_WATCH_ANGULAR !== 'false',
  notifyConsumers: process.env.SAGEBOX_NOTIFY_CONSUMERS === 'true',
  debounceMs: 500,
};

let angularRebuildTimer = null;
let lastAngularBuild = 0;

/**
 * Rebuild Angular wrapper with debouncing
 */
function rebuildAngularWrapper() {
  if (!config.watchAngular) return;
  
  const now = Date.now();
  if (now - lastAngularBuild < 2000) {
    // Skip if last build was less than 2 seconds ago
    return;
  }

  if (angularRebuildTimer) {
    clearTimeout(angularRebuildTimer);
  }

  angularRebuildTimer = setTimeout(() => {
    lastAngularBuild = Date.now();
    log.step('Rebuilding Angular wrapper...');
    
    try {
      execSync('npm run build:angular', {
        cwd: ROOT,
        stdio: 'inherit',
      });
      log.success('Angular wrapper rebuilt');
      
      // Touch a marker file to signal consumers
      touchConsumerMarker();
    } catch (error) {
      log.error('Angular wrapper build failed');
    }
  }, config.debounceMs);
}

/**
 * Touch a marker file that consumers can watch
 */
function touchConsumerMarker() {
  if (!config.notifyConsumers) return;
  
  const markerFile = join(DIST_DIR, '.sagebox-updated');
  const timestamp = new Date().toISOString();
  
  try {
    writeFileSync(markerFile, timestamp);
    log.info(`Consumer marker updated: ${timestamp}`);
  } catch (error) {
    // Ignore errors
  }
}

/**
 * Start Stencil in watch mode
 */
function startStencilWatch() {
  log.info('Starting SageBox in watch mode...');
  log.info(`Angular wrapper rebuild: ${config.watchAngular ? 'enabled' : 'disabled'}`);
  
  const stencil = spawn('npx', ['stencil', 'build', '--watch'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
  });

  stencil.on('error', (error) => {
    log.error(`Stencil failed to start: ${error.message}`);
    process.exit(1);
  });

  stencil.on('exit', (code) => {
    if (code !== 0) {
      log.error(`Stencil exited with code ${code}`);
    }
    process.exit(code);
  });

  // Watch for dist changes to trigger Angular rebuild
  if (config.watchAngular && existsSync(DIST_DIR)) {
    const watcher = watch(DIST_DIR, { recursive: true }, (eventType, filename) => {
      if (filename && !filename.includes('angular') && !filename.startsWith('.')) {
        rebuildAngularWrapper();
      }
    });

    process.on('exit', () => watcher.close());
  }

  return stencil;
}

// Print banner
console.log(`
${colors.magenta}╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ${colors.bright}🚀 SAGEBOX DEVELOPMENT MODE${colors.reset}${colors.magenta}                              ║
║                                                              ║
║   ${colors.dim}Watching for changes...${colors.reset}${colors.magenta}                                  ║
║   ${colors.dim}Press Ctrl+C to stop${colors.reset}${colors.magenta}                                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
`);

// Handle graceful shutdown
process.on('SIGINT', () => {
  log.info('\nShutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log.info('\nShutting down...');
  process.exit(0);
});

// Start watching
startStencilWatch();
