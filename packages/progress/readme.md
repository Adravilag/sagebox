# @sage-box/progress

Progress component

## Installation

```bash
npm install @sage-box/progress
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/progress/loader';
  defineCustomElements();
</script>

<sg-progress>Content</sg-progress>
```

### React

```jsx
import '@sage-box/progress';

function App() {
  return <sg-progress>Content</sg-progress>;
}
```

### Angular

```typescript
import '@sage-box/progress';

@Component({
  template: `<sg-progress>Content</sg-progress>`
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
| `--sg-progress-color` | Main color        |

## License

MIT
