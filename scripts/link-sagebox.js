/**
 * Creates a symlink from node_modules/sagebox to dist/
 * This allows Angular wrapper to import from 'sagebox/components' during build
 */
const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules', 'sagebox');
const distPath = path.join(__dirname, '..', 'dist');

// Check if dist exists
if (!fs.existsSync(distPath)) {
  console.error('Error: dist/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

// Remove existing symlink or directory
try {
  const stats = fs.lstatSync(nodeModulesPath);
  if (stats.isSymbolicLink() || stats.isDirectory()) {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  }
} catch (e) {
  // Doesn't exist, that's fine
}

// Create symlink
try {
  // On Windows, use junction for directories
  const type = process.platform === 'win32' ? 'junction' : 'dir';
  fs.symlinkSync(distPath, nodeModulesPath, type);
  console.log('✓ Created symlink: node_modules/sagebox -> dist/');
} catch (e) {
  console.error('Error creating symlink:', e.message);
  process.exit(1);
}

// Copy types/components.d.ts to components/ folder for Angular wrapper compatibility
const typesComponentsPath = path.join(distPath, 'types', 'components.d.ts');
const componentsIndexDts = path.join(distPath, 'components', 'index.d.ts');

if (fs.existsSync(typesComponentsPath)) {
  // Read the existing components/index.d.ts
  let existingContent = '';
  if (fs.existsSync(componentsIndexDts)) {
    existingContent = fs.readFileSync(componentsIndexDts, 'utf-8');
  }
  
  // Only append if Components is not already exported
  if (!existingContent.includes('export * from')) {
    // Append re-export to include Components namespace
    const reexport = `\n// Re-export Components namespace for Angular wrapper\nexport * from '../types/components';\n`;
    fs.appendFileSync(componentsIndexDts, reexport);
    console.log('✓ Added Components re-export to dist/components/index.d.ts');
  }
}
