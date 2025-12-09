# @sage-box/radio

Radio component

## Installation

```bash
npm install @sage-box/radio
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/radio/loader';
  defineCustomElements();
</script>

<sg-radio>Content</sg-radio>
```

### React

```jsx
import '@sage-box/radio';

function App() {
  return <sg-radio>Content</sg-radio>;
}
```

### Angular

```typescript
import '@sage-box/radio';

@Component({
  template: `<sg-radio>Content</sg-radio>`
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
| `--sg-radio-color` | Main color        |

## License

MIT
