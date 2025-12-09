# @sage-box/toast

Toast component

## Installation

```bash
npm install @sage-box/toast
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/toast/loader';
  defineCustomElements();
</script>

<sg-toast>Content</sg-toast>
```

### React

```jsx
import '@sage-box/toast';

function App() {
  return <sg-toast>Content</sg-toast>;
}
```

### Angular

```typescript
import '@sage-box/toast';

@Component({
  template: `<sg-toast>Content</sg-toast>`
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
| `--sg-toast-color` | Main color        |

## License

MIT
