# @saged-ui/components

Modern Web Components Library - Reusable UI components for any project.

## Installation

```bash
npm install @saged-ui/components
```

## Components

| Component | Description |
|-----------|-------------|
| `sg-button` | Versatile button component with variants |
| `sg-badge` | Badge/tag component for labels and status |
| `sg-dropdown` | Accessible dropdown menu |
| `sg-skeleton` | Loading skeleton placeholder |
| `sg-theme-toggle` | Dark/light theme switcher |
| `sg-article-editor` | Rich text/markdown editor |

## Usage

### Vanilla JS / HTML

```javascript
import { defineCustomElements } from '@saged-ui/components/loader';
defineCustomElements();
```

```html
<sg-button variant="primary">Click me</sg-button>
<sg-badge variant="success">Active</sg-badge>
```

### With Icons (optional)

```bash
npm install @saged-ui/icons
```

```javascript
import { defineCustomElements as defineIcons } from '@saged-ui/icons/loader';
import { defineCustomElements as defineComponents } from '@saged-ui/components/loader';

defineIcons();
defineComponents();
```

```html
<sg-button>
  <sg-icon name="home" slot="prefix"></sg-icon>
  Home
</sg-button>
```

## License

MIT © [adravilag](https://github.com/adravilag)
