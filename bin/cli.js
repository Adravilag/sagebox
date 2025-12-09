#!/usr/bin/env node

// Thin launcher that delegates to the canonical CLI implementation
// located in `packages/icons/bin/cli.js`. Keeping a lightweight
// launcher in `bin/` allows npm `bin` entries to remain stable.

try {
  // eslint-disable-next-line node/no-unpublished-require
  require('../packages/icons/bin/cli.js');
} catch (e) {
  // If delegating fails, print a helpful error and exit non-zero.
  /* eslint-disable no-console */
  console.error('Failed to launch SageBox CLI from packages/icons/bin/cli.js');
  console.error(e && e.stack ? e.stack : e);
  process.exit(1);
}
