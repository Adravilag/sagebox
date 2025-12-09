# @sage-box/tabs

Tabs component

## Installation

```bash
npm install @sage-box/tabs
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/tabs/loader';
  defineCustomElements();
</script>

<sg-tabs>Content</sg-tabs>
```

### React

```jsx
import '@sage-box/tabs';

function App() {
  return <sg-tabs>Content</sg-tabs>;
}
```

### Angular

```typescript
import '@sage-box/tabs';

@Component({
  template: `<sg-tabs>Content</sg-tabs>`
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
| `--sg-tabs-color` | Main color        |

## License

MIT
