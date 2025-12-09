# @sage-box/accordion

Accordion component

## Installation

```bash
npm install @sage-box/accordion
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/accordion/loader';
  defineCustomElements();
</script>

<sg-accordion>Content</sg-accordion>
```

### React

```jsx
import '@sage-box/accordion';

function App() {
  return <sg-accordion>Content</sg-accordion>;
}
```

### Angular

```typescript
import '@sage-box/accordion';

@Component({
  template: `<sg-accordion>Content</sg-accordion>`
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
| `--sg-accordion-color` | Main color        |

## License

MIT
