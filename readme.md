# SageBox

[![npm version](https://img.shields.io/npm/v/@sage-box/core.svg)](https://www.npmjs.com/package/@sage-box/core)
[![CI](https://github.com/adravilag/sagebox/actions/workflows/ci.yml/badge.svg)](https://github.com/adravilag/sagebox/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-88%25-brightgreen)](./coverage/lcov-report/index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@sage-box/core)](https://bundlephobia.com/package/@sage-box/core)

Modern Web Components Library - Reusable UI components built with Stencil.js

🌐 **[Documentation](https://adravilag.github.io/sagebox/)** | 📦 **[npm](https://www.npmjs.com/org/sage-box)** | 🐙 **[GitHub](https://github.com/adravilag/sagebox)** | 📋 **[Changelog](./CHANGELOG.md)**

## ✨ Features

- 🎨 **Themeable** - CSS Custom Properties for easy theming
- 🌙 **Dark Mode Ready** - Built-in support for dark mode
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 🔧 **Framework Agnostic** - Native wrappers for Angular, React, or vanilla JS
- 🪶 **Lightweight** - Tree-shakeable, only load what you need
- 📘 **TypeScript** - Full TypeScript support with type definitions

## 📦 Installation

```bash
npm install sagebox
```

## 🚀 Quick Start

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="20" height="20" alt="React" /> React (v17+)

```tsx
import { SgButton, SgBadge, SgIcon } from 'sagebox/react';

function App() {
  return (
    <div>
      <SgButton variant="primary" onSgClick={() => console.log('clicked!')}>
        Click me
      </SgButton>
      <SgBadge variant="success">Active</SgBadge>
      <SgIcon name="home" size={24} />
    </div>
  );
}
```

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg" width="20" height="20" alt="Angular" /> Angular (v18+)

```typescript
import { SgButton, SgBadge, SgIcon } from 'sagebox/angular';

@Component({
  imports: [SgButton, SgBadge, SgIcon],
  template: `
    <sg-button variant="primary" (sgClick)="onClick()">Click me</sg-button>
    <sg-badge variant="success">Active</sg-badge>
    <sg-icon name="home" [size]="24"></sg-icon>
  `
})
export class AppComponent {
  onClick() {
    console.log('clicked!');
  }
}
```

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="20" height="20" alt="JavaScript" /> Vanilla JS / CDN

```html
<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/sagebox/loader/index.js';
  defineCustomElements();
</script>

<sg-button variant="primary">Click me</sg-button>
<sg-badge variant="success">Active</sg-badge>
<sg-icon name="home" size="24"></sg-icon>
```

## 📦 Packages & Components

SageBox is a monorepo divided into multiple packages. Each component has its own documentation:

| Package | Component | Description |
|---------|-----------|-------------|
| [`@sage-box/article-editor`](./packages/article-editor/README.md) | `sg-article-editor` | Rich text editor with HTML/Markdown support |
| [`@sage-box/badge`](./packages/badge/README.md) | `sg-badge` | Labels and status indicators |
| [`@sage-box/breadcrumb`](./packages/breadcrumb/README.md) | `sg-breadcrumb` | Navigation trail for nested pages |
| [`@sage-box/button`](./packages/button/README.md) | `sg-button` | Versatile button with variants and states |
| [`@sage-box/card`](./packages/card/README.md) | `sg-card` | Container for content and actions |
| [`@sage-box/context-menu`](./packages/context-menu/README.md) | `sg-context-menu` | Right-click custom menu |
| [`@sage-box/core`](./packages/core/README.md) | Core | Shared utilities and base styles |
| [`@sage-box/date-picker`](./packages/date-picker/README.md) | `sg-date-picker` | Date selection input |
| [`@sage-box/dropdown`](./packages/dropdown/README.md) | `sg-dropdown` | Dropdown menus and popovers |
| [`@sage-box/form-section`](./packages/form-section/README.md) | `sg-form-section` | Grouping for form controls |
| [`@sage-box/icons`](./packages/icons/README.md) | `sg-icon` | SVG icon system with 80+ icons |
| [`@sage-box/info-field`](./packages/info-field/README.md) | `sg-info-field` | Read-only data display |
| [`@sage-box/input`](./packages/input/README.md) | `sg-input` | Text inputs and textareas |
| [`@sage-box/modal`](./packages/modal/README.md) | `sg-modal` | Dialogs and modal windows |
| [`@sage-box/search-box`](./packages/search-box/README.md) | `sg-search-box` | Search input with suggestions |
| [`@sage-box/select`](./packages/select/README.md) | `sg-select` | Select menus and multi-select |
| [`@sage-box/skeleton`](./packages/skeleton/README.md) | `sg-skeleton` | Loading placeholders |
| [`@sage-box/stats-card`](./packages/stats-card/README.md) | `sg-stats-card` | Dashboard statistic display |
| [`@sage-box/theme-toggle`](./packages/theme-toggle/README.md) | `sg-theme-toggle` | Dark/Light mode switcher |
| [`@sage-box/tooltip`](./packages/tooltip/README.md) | `sg-tooltip` | Contextual information popups |

### Component Props Quick Reference

```tsx
// sg-button
<sg-button 
  variant="primary|secondary|ghost|outline|success|warning|error|info"
  size="xs|sm|md|lg"
  shape="default|circle|square|pill|block"
  disabled loading
  leading-icon="icon-name"
  trailing-icon="icon-name">
</sg-button>

// sg-icon
<sg-icon 
  name="home"           // Built-in icon
  src="/custom.svg"     // OR custom SVG file
  json-src="/icons.json" // OR load from JSON
  size="24" 
  color="#6366f1"
  spin flip-h flip-v rotate="90">
</sg-icon>

// sg-modal
<sg-modal 
  header="Title"
  size="sm|md|lg|xl|full"
  close-on-backdrop
  close-on-escape>
  <div slot="footer">...</div>
</sg-modal>

// sg-dropdown
<sg-dropdown align="start|center|end" position="bottom|top">
  <button slot="trigger">Menu</button>
  <div slot="header">Header</div>
  <div>Content</div>
  <div slot="footer">Footer</div>
</sg-dropdown>
```

### Events

All components emit custom events prefixed with `sg`:

```javascript
// Button
button.addEventListener('sgClick', (e) => console.log(e.detail));

// Modal  
modal.addEventListener('sgOpen', () => {});
modal.addEventListener('sgClose', (e) => console.log(e.detail)); // returnValue
modal.addEventListener('sgCancel', () => {});

// Dropdown
dropdown.addEventListener('sgOpen', () => {});
dropdown.addEventListener('sgClose', () => {});
dropdown.addEventListener('sgToggle', (e) => console.log(e.detail)); // boolean

// Theme Toggle
toggle.addEventListener('sgThemeChange', (e) => console.log(e.detail)); // 'light'|'dark'|'system'

// Badge (removable)
badge.addEventListener('sgRemove', (e) => e.target.remove());

// Article Editor
editor.addEventListener('sgChange', (e) => console.log(e.detail.value));
editor.addEventListener('sgContentTypeChange', (e) => {}); // html|markdown
```

## 🎨 Theming

### CSS Custom Properties

```css
:root {
  /* Primary colors */
  --sg-primary: #6366f1;
  --sg-secondary: #64748b;
  --sg-success: #22c55e;
  --sg-warning: #f59e0b;
  --sg-error: #ef4444;
  
  /* Backgrounds */
  --ui-bg: #ffffff;
  --ui-bg-secondary: #f9fafb;
  
  /* Text */
  --ui-text: #111827;
  --ui-text-secondary: #4b5563;
  
  /* Borders */
  --ui-border: #e5e7eb;
  --ui-border-focus: var(--ui-color-primary-500);
}

[data-theme="dark"] {
  --ui-bg: #111827;
  --ui-bg-secondary: #1f2937;
  --ui-text: #f9fafb;
  --ui-text-secondary: #9ca3af;
  --ui-border: #374151;
}
```

### Dark Mode

```html
<!-- Auto-sync with system preference -->
<sg-theme-toggle theme="system"></sg-theme-toggle>

<!-- Or set programmatically -->
<script>
  document.documentElement.setAttribute('data-theme', 'dark');
</script>
```

## 🌐 Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 60+    | 63+     | 12+    | 79+  |

## 📖 Icon Reference

### Built-in Icons (81)

**Navigation:** `home`, `search`, `menu`, `settings`, `user`, `close`, `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`, `arrow-left`, `arrow-right`, `external-link`, `link`

**Actions:** `add`, `edit`, `delete`, `save`, `copy`, `download`, `upload`, `refresh`

**Status:** `check`, `warning`, `error`, `info`, `success`, `loading`

**Media:** `play`, `pause`, `stop`, `image`, `video`, `music`

**UI:** `sun`, `moon`, `star`, `heart`, `bookmark`, `share`, `filter`, `sort`, `more-vertical`, `more-horizontal`, `code`, `eye`, `eye-off`, `lock`, `unlock`

**Files:** `folder`, `file`, `file-text`, `calendar`, `clock`

**Misc:** `mail`, `notification`, `github`, `npm`, `palette`, `lightning`, `dashboard`, `verified`, `rocket`, `shield`, `box`, `puzzle`, `layers`, `zap`, `package`, `terminal`, `grid`, `list`, `book`, `help-circle`, `tool`, `cpu`, `database`, `cloud`, `server`, `globe`, `dark-mode`

### Custom Icons

```javascript
// Register custom icons globally
const iconEl = document.querySelector('sg-icon');
await iconEl.registerIcons({
  'my-icon': '<svg viewBox="0 0 24 24"><path d="M12..."/></svg>'
});

// Or load from JSON file
<sg-icon name="my-icon" json-src="/assets/icons.json"></sg-icon>

// Or use direct SVG src
<sg-icon src="/assets/custom-icon.svg"></sg-icon>
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Development Modes:

# 1. Visual Development (Recommended for creating components)
# Starts Storybook at http://localhost:6006
npm run storybook

# 2. Documentation Development
# Starts Stencil build + Website at http://localhost:3000
npm run dev

# 3. Library Integration Mode
# Compiles and watches for changes (no server)
# Use this when linked to another project via 'npm link'
npm run start

# Build components
npm run build

# Build documentation website
npm run website:build

# Run tests
npm test
```

## 📄 License

MIT © [adravilag](https://github.com/adravilag)
