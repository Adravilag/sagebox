/**
 * Script to import icons from a sprites.svg file into the icon system
 *
 * Usage: node scripts/import-sprites.js <path-to-sprites.svg>
 * Example: node scripts/import-sprites.js ../my-project/public/sprites.svg
 */

const fs = require('node:fs');
const path = require('node:path');

// Paths
const ICONS_JSON_PATH = path.join(__dirname, '..', 'src', 'components', 'svg-icon', 'icons', 'icons.json');

/**
 * Extracts the icon name from the symbol id
 * @param {string} iconId - Symbol ID
 * @returns {string} - Normalized icon name
 */
function extractIconName(iconId) {
  // Remove "icon-" prefix if exists, status- is kept
  return iconId.startsWith('icon-') ? iconId.substring(5) : iconId;
}

/**
 * Extracts all paths from SVG content
 * @param {string} content - Symbol content
 * @returns {string[]} - Array of paths
 */
function extractPaths(content) {
  const pathRegex = /<path\s+([^>]*)\/?>/gi;
  const paths = [];
  let pathMatch;

  while ((pathMatch = pathRegex.exec(content)) !== null) {
    const pathAttrs = pathMatch[1];
    const dMatch = pathAttrs.match(/d="([^"]+)"/);
    if (dMatch) {
      paths.push(dMatch[1]);
    }
  }

  return paths;
}

/**
 * Extracts all circles from SVG content
 * @param {string} content - Symbol content
 * @returns {Array<{cx: number, cy: number, r: number}>} - Array of circles
 */
function extractCircles(content) {
  const circleRegex = /<circle\s+([^>]*)\/?>/gi;
  const circles = [];
  let circleMatch;

  while ((circleMatch = circleRegex.exec(content)) !== null) {
    const circleAttrs = circleMatch[1];
    const cxMatch = circleAttrs.match(/cx="([^"]+)"/);
    const cyMatch = circleAttrs.match(/cy="([^"]+)"/);
    const rMatch = circleAttrs.match(/r="([^"]+)"/);

    if (cxMatch && cyMatch && rMatch) {
      circles.push({
        cx: Number.parseFloat(cxMatch[1]),
        cy: Number.parseFloat(cyMatch[1]),
        r: Number.parseFloat(rMatch[1]),
      });
    }
  }

  return circles;
}

/**
 * Builds the icon data object
 * @param {string[]} paths - Array of paths
 * @param {string} viewBox - Icon viewBox
 * @param {Array} circles - Array of circles
 * @returns {Object|null} - Icon data or null if no paths
 */
function buildIconData(paths, viewBox, circles) {
  if (paths.length === 0) {
    return null;
  }

  const iconData = { paths };

  // Add viewBox if not the standard 0 0 24 24
  if (viewBox !== '0 0 24 24') {
    iconData.viewBox = viewBox;
  }

  // Add circles if any
  if (circles.length > 0) {
    iconData.circles = circles;
  }

  return iconData;
}

/**
 * Parses an SVG sprite file and extracts symbols
 * @param {string} svgContent - SVG file content
 * @returns {Object} - Object with extracted icons
 */
function parseSpritesSVG(svgContent) {
  const icons = {};
  const symbolRegex = /<symbol\s+([^>]*)>([\s\S]*?)<\/symbol>/gi;
  let symbolMatch;

  while ((symbolMatch = symbolRegex.exec(svgContent)) !== null) {
    const attributes = symbolMatch[1];
    const content = symbolMatch[2].trim();

    // Extract symbol id
    const idMatch = attributes.match(/id="([^"]+)"/);
    if (!idMatch) continue;

    const iconName = extractIconName(idMatch[1]);

    // Extract viewBox
    const viewBoxMatch = attributes.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // Extract paths and circles
    const paths = extractPaths(content);
    const circles = extractCircles(content);

    // Build icon data
    const iconData = buildIconData(paths, viewBox, circles);
    if (iconData) {
      icons[iconName] = iconData;
    }
  }

  return icons;
}

/**
 * Main function
 */
async function main() {
  // Get sprites.svg file path from arguments
  const spritesPath = process.argv[2];

  if (!spritesPath) {
    console.error('❌ Error: You must provide the path to the sprites.svg file');
    console.log('');
    console.log('Usage: node scripts/import-sprites.js <path-to-sprites.svg>');
    console.log('Example: node scripts/import-sprites.js ../my-project/public/sprites.svg');
    process.exit(1);
  }

  // Resolve absolute path
  const resolvedPath = path.resolve(spritesPath);

  console.log('📂 Looking for sprites at:', resolvedPath);

  // Verify file exists
  if (!fs.existsSync(resolvedPath)) {
    console.error('❌ Error: sprites.svg file not found at:', resolvedPath);
    process.exit(1);
  }

  // Read sprites.svg file
  console.log('📖 Reading sprites.svg file...');
  const svgContent = fs.readFileSync(resolvedPath, 'utf-8');

  // Parse icons
  console.log('🔍 Parsing symbols...');
  const newIcons = parseSpritesSVG(svgContent);
  const newIconCount = Object.keys(newIcons).length;
  console.log(`   Found ${newIconCount} icons in sprite`);

  // Read existing icons.json file
  console.log('📖 Reading existing icons.json...');
  let existingIcons = {};
  if (fs.existsSync(ICONS_JSON_PATH)) {
    existingIcons = JSON.parse(fs.readFileSync(ICONS_JSON_PATH, 'utf-8'));
  }
  const existingCount = Object.keys(existingIcons).length;
  console.log(`   Existing: ${existingCount} icons`);

  // Merge icons (new ones overwrite existing if conflict)
  const mergedIcons = { ...existingIcons, ...newIcons };
  const mergedCount = Object.keys(mergedIcons).length;
  const addedCount = mergedCount - existingCount;
  const replacedCount = newIconCount - addedCount;

  // Sort alphabetically
  const sortedIcons = {};
  for (const key of Object.keys(mergedIcons).sort()) {
    sortedIcons[key] = mergedIcons[key];
  }

  // Save updated file
  console.log('💾 Saving updated icons.json...');
  fs.writeFileSync(ICONS_JSON_PATH, JSON.stringify(sortedIcons, null, 2));

  console.log('');
  console.log('✅ Import completed:');
  console.log(`   📥 Icons imported: ${newIconCount}`);
  console.log(`   ➕ New added: ${addedCount}`);
  console.log(`   🔄 Replaced: ${replacedCount}`);
  console.log(`   📊 Final total: ${mergedCount}`);
  console.log('');

  // Show list of imported icons
  console.log('📋 Icons imported from sprite:');
  for (const name of Object.keys(newIcons).sort()) {
    const isNew = !existingIcons[name];
    const marker = isNew ? '➕' : '🔄';
    console.log(`   ${marker} ${name}`);
  }

  console.log('');
  console.log('🔧 Run "node scripts/generate-icons.js" to regenerate TypeScript');
}

await main();
