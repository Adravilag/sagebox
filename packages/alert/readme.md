# @sage-box/alert

Alert component

## Installation

```bash
npm install @sage-box/alert
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/alert/loader';
  defineCustomElements();
</script>

<sg-alert>Content</sg-alert>
```

### React

```jsx
import '@sage-box/alert';

function App() {
  return <sg-alert>Content</sg-alert>;
}
```

### Angular

```typescript
import '@sage-box/alert';

@Component({
  template: `<sg-alert>Content</sg-alert>`
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
| `--sg-alert-color` | Main color        |

## License

MIT
