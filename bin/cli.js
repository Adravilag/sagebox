#!/usr/bin/env node

/**
 * SagedUI CLI
 * 
 * Command line interface for managing SagedUI features
 * 
 * Usage:
 *   npx saged-ui <command> [options]
 *   saged-ui <command> [options]
 * 
 * Commands:
 *   icons       Manage SVG icons
 *   icon-sets   Import popular icon sets (Lucide, Material, etc.)
 *   init        Initialize configuration
 *   help        Show help
 */

const { program } = require('commander');
const pkg = require('../package.json');

// Import commands
const iconsCommand = require('../cli/commands/icons');
const iconSetsCommand = require('../cli/commands/icon-sets');
const initCommand = require('../cli/commands/init');

program
  .name('saged-ui')
  .description('SagedUI CLI - Manage your component library')
  .version(pkg.version);

// Register commands
iconsCommand(program);
iconSetsCommand(program);
initCommand(program);

// Default help
program.on('command:*', () => {
  console.error('Invalid command: %s\n', program.args.join(' '));
  program.help();
});

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.help();
}
