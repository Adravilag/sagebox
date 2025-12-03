# SagedUI CLI

Command line interface for managing SVG icons in SagedUI projects.

## Installation

The CLI is included with `saged-ui`:

```bash
npm install saged-ui
```

## Quick Start

```bash
# Initialize configuration in your project
npx saged-ui init

# Add an icon from SVG file
npx saged-ui icons add my-icon --file ./icon.svg

# Import from popular icon sets
npx saged-ui icon-sets import lucide -i check x arrow-up

# Start visual icon manager
npx saged-ui icons server

# Generate TypeScript
npx saged-ui icons build
```

## Commands

### `saged-ui icons`

Manage SVG icons in your project.

| Command | Description |
|---------|-------------|
| `icons add <name>` | Add an icon from SVG file or string |
| `icons import <file>` | Import from SVG sprite sheet |
| `icons remove <name>` | Remove an icon |
| `icons list` | List all icons |
| `icons build` | Generate TypeScript file |
| `icons server` | Start visual management UI |
| `icons optimize` | Optimize path data |
| `icons preview` | Generate HTML preview |

#### Examples

```bash
# Add icon from file
npx saged-ui icons add logo --file ./logo.svg

# Add icon from SVG string
npx saged-ui icons add arrow --svg '<svg viewBox="0 0 24 24"><path d="M12 4l8 8-8 8"/></svg>'

# Import sprite sheet
npx saged-ui icons import ./sprites/icons.svg

# Replace all icons (instead of merge)
npx saged-ui icons import ./sprites/icons.svg --replace

# List icons as JSON
npx saged-ui icons list --json

# Build to custom path
npx saged-ui icons build --output ./src/icons/index.ts

# Start server on custom port
npx saged-ui icons server --port 4000

# Analyze icons for issues
npx saged-ui icons optimize --analyze
```

### `saged-ui icon-sets`

Import icons from popular icon libraries via [Iconify](https://iconify.design).

| Command | Description |
|---------|-------------|
| `icon-sets list` | List available icon sets |
| `icon-sets import <set>` | Import icons from a set |
| `icon-sets search <set> <query>` | Search for icons |
| `icon-sets preview <set>` | Open Iconify preview in browser |

#### Available Icon Sets

| Set | Name | Description |
|-----|------|-------------|
| `material` | Material Symbols | Google Material Symbols |
| `lucide` | Lucide | Fork of Feather icons |
| `heroicons` | Heroicons | By Tailwind CSS |
| `phosphor` | Phosphor | Flexible icon family |
| `tabler` | Tabler Icons | Open source icons |
| `feather` | Feather | Simply beautiful icons |
| `bootstrap` | Bootstrap Icons | Official Bootstrap icons |
| `carbon` | Carbon | IBM Design System |
| `mdi` | Material Design Icons | Community icons |
| `ionicons` | Ionicons | Ionic framework |

#### Examples

```bash
# List available sets
npx saged-ui icon-sets list

# Search for icons
npx saged-ui icon-sets search lucide arrow
npx saged-ui icon-sets search heroicons home

# Import specific icons
npx saged-ui icon-sets import lucide -i check x arrow-up arrow-down
npx saged-ui icon-sets import heroicons -i home user settings

# Import first 100 icons (default)
npx saged-ui icon-sets import tabler

# Import all icons from a set
npx saged-ui icon-sets import feather --all

# Import with custom limit
npx saged-ui icon-sets import mdi --limit 50

# Import without set prefix
npx saged-ui icon-sets import lucide -i check --no-prefix

# Preview in browser
npx saged-ui icon-sets preview material
```

### `saged-ui init`

Initialize SagedUI configuration in your project.

```bash
npx saged-ui init
npx saged-ui init --output ./src/icons/custom-icons.ts
```

Creates:
- `saged-ui.config.json` - Configuration file
- `icons/` directory with empty `icons.json`
- Adds npm scripts to `package.json`

## Vite Plugin

For hot-reload during development:

```javascript
// vite.config.js
import { sagedUIIcons } from 'saged-ui/cli/plugins/vite';

export default {
  plugins: [
    sagedUIIcons({
      watch: true,
      iconsDir: './src/icons',
      output: './src/icons/index.ts'
    })
  ]
}
```

### Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `watch` | boolean | `true` | Enable file watching |
| `iconsDir` | string | `./src/icons` | Icons directory |
| `jsonFile` | string | `icons.json` | JSON file name |
| `output` | string | `./src/icons/index.ts` | Output TypeScript file |
| `prefix` | string | `''` | Prefix for icon names |
| `optimize` | boolean | `true` | Optimize paths |

### Virtual Module

Import icons directly without a physical file:

```javascript
import icons from 'virtual:saged-ui-icons';
```

## Configuration

`saged-ui.config.json`:

```json
{
  "icons": {
    "input": "./icons/icons.json",
    "output": "./src/icons/custom-icons.ts"
  }
}
```

## Icon Format

Icons are stored in `icons.json`:

```json
{
  "arrow-right": {
    "paths": ["M12 4l8 8-8 8"],
    "viewBox": "0 0 24 24"
  },
  "check": {
    "paths": ["M5 12l5 5L20 7"],
    "fillRule": "evenodd"
  }
}
```

### Icon Definition

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `paths` | string[] | ✅ | - | SVG path data |
| `viewBox` | string | ❌ | `0 0 24 24` | SVG viewBox |
| `fillRule` | string | ❌ | `nonzero` | Fill rule |

## Visual Icon Manager

Start the web UI:

```bash
npx saged-ui icons server
```

Open http://localhost:4567

Features:
- 📋 View all icons
- 🔍 Search and filter
- 📤 Drag & drop SVG upload
- 🗑️ Delete icons
- 📁 Import sprite sheets
- 🎨 Live preview

## Workflow Example

```bash
# 1. Initialize project
npx saged-ui init

# 2. Import base icons
npx saged-ui icon-sets import lucide -i check x plus minus
npx saged-ui icon-sets import heroicons -i home settings user

# 3. Add custom icons
npx saged-ui icons add logo --file ./assets/logo.svg
npx saged-ui icons add custom-icon --file ./assets/custom.svg

# 4. Optimize
npx saged-ui icons optimize

# 5. Generate TypeScript
npx saged-ui icons build

# 6. Use in code
```

```typescript
import { customIcons } from './icons/custom-icons';

// Use with sg-icon component
<sg-icon name="lucide-check"></sg-icon>
<sg-icon name="heroicons-home"></sg-icon>
<sg-icon name="logo"></sg-icon>
```

## License

MIT
