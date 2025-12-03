# SagedUI

[![npm version](https://img.shields.io/npm/v/saged-ui.svg)](https://www.npmjs.com/package/saged-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/saged-ui)](https://bundlephobia.com/package/saged-ui)

Modern Web Components Library - Reusable UI components built with Stencil.js

🌐 **[Documentation](https://adravilag.github.io/saged-ui/)** | 📦 **[npm](https://www.npmjs.com/package/saged-ui)** | 🐙 **[GitHub](https://github.com/adravilag/saged-ui)**

## ✨ Features

- 🎨 **Themeable** - CSS Custom Properties for easy theming
- 🌙 **Dark Mode Ready** - Built-in support for dark mode with smooth transitions
- ♿ **Accessible** - WCAG 2.1 compliant with ARIA attributes and keyboard navigation
- 🔧 **Framework Agnostic** - Native wrappers for Angular, React, Vue, or vanilla JS
- 🪶 **Lightweight** - Zero dependencies, tree-shakeable, only load what you need
- 📘 **TypeScript** - 100% TypeScript with full type definitions
- 🎯 **Design Tokens** - Consistent design system with CSS variables

## 📦 Installation

```bash
npm install saged-ui
```

## 🚀 Quick Start

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="20" height="20" alt="React" /> React (v17+)

```tsx
import { SgButton, SgBadge, SgIcon } from 'saged-ui/react';

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
import { SgButton, SgBadge, SgIcon } from 'saged-ui/angular';

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

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" width="20" height="20" alt="Vue" /> Vue (v3+)

```vue
<script setup>
import { defineCustomElements } from 'saged-ui/loader';
defineCustomElements();
</script>

<template>
  <sg-button variant="primary" @sgClick="onClick">Click me</sg-button>
  <sg-badge variant="success">Active</sg-badge>
  <sg-icon name="home" :size="24"></sg-icon>
</template>
```

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="20" height="20" alt="JavaScript" /> Vanilla JS / CDN

```html
<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/saged-ui/loader/index.js';
  defineCustomElements();
</script>

<sg-button variant="primary">Click me</sg-button>
<sg-badge variant="success">Active</sg-badge>
<sg-icon name="home" size="24"></sg-icon>
```

## 🧩 Components

Explore all components in the [documentation](https://adravilag.github.io/saged-ui/).

| Component | Description |
|-----------|-------------|
| `sg-button` | Customizable button with variants and sizes |
| `sg-badge` | Labels and status indicators |
| `sg-icon` | SVG icon system (190+ icons) |
| `sg-dropdown` | Accessible dropdown menu |
| `sg-skeleton` | Loading placeholder animations |
| `sg-article-editor` | Rich text editor with markdown support |
| `sg-theme-toggle` | Dark/light mode toggle switch |

## 🎨 Design Tokens

Import design tokens for consistent styling:

```css
/* CSS Import */
@import 'saged-ui/dist/saged-ui/styles/tokens.css';
```

```js
// JavaScript/Bundler
import 'saged-ui/dist/saged-ui/styles/tokens.css';
```

```html
<!-- CDN -->
<link rel="stylesheet" href="https://unpkg.com/saged-ui/dist/saged-ui/styles/tokens.css">
```

Available tokens include colors, spacing, typography, shadows, and transitions. See the [Design Tokens documentation](https://adravilag.github.io/saged-ui/tokens/) for the complete list.

## 🎨 Theming

Customize components using CSS Custom Properties:

```css
:root {
  --sg-primary: #6366f1;
  --sg-secondary: #64748b;
  --sg-success: #22c55e;
  --sg-warning: #f59e0b;
  --sg-error: #ef4444;
}

[data-theme="dark"] {
  --sg-primary: #818cf8;
}
```

## 🌐 Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 60+    | 63+     | 12+    | 79+  |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm start

# Build components
npm run build

# Build documentation
npm run docs:build

# Run tests
npm test

# Run Storybook
npm run storybook
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Adrián Dávila Guerra](https://github.com/adravilag)
