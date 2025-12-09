# @sage-box/switch

Switch component

## Installation

```bash
npm install @sage-box/switch
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/switch/loader';
  defineCustomElements();
</script>

<sg-switch>Content</sg-switch>
```

### React

```jsx
import '@sage-box/switch';

function App() {
  return <sg-switch>Content</sg-switch>;
}
```

### Angular

```typescript
import '@sage-box/switch';

@Component({
  template: `<sg-switch>Content</sg-switch>`
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
| `--sg-switch-color` | Main color        |

## License

MIT
