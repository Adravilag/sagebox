# @sage-box/checkbox

cd d:\Profesional\2025\SageBox; node scripts/generate-component.js checkbox

## Installation

```bash
npm install @sage-box/checkbox
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/checkbox/loader';
  defineCustomElements();
</script>

<sg-checkbox>Content</sg-checkbox>
```

### React

```jsx
import '@sage-box/checkbox';

function App() {
  return <sg-checkbox>Content</sg-checkbox>;
}
```

### Angular

```typescript
import '@sage-box/checkbox';

@Component({
  template: `<sg-checkbox>Content</sg-checkbox>`
})
export class AppComponent {}
```

## Properties

| Property  | Type                                    | Default     | Description       |
|-----------|-----------------------------------------|-------------|-------------------|
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Component variant |

## Slots

| Slot      | Description            |
|-----------|------------------------|
| (default) | Main content           |

## CSS Custom Properties

| Property              | Description        |
|-----------------------|--------------------|
| `--sg-checkbox-color` | Main color        |

## License

MIT
