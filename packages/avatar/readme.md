# @sage-box/avatar

Avatar component

## Installation

```bash
npm install @sage-box/avatar
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/avatar/loader';
  defineCustomElements();
</script>

<sg-avatar>Content</sg-avatar>
```

### React

```jsx
import '@sage-box/avatar';

function App() {
  return <sg-avatar>Content</sg-avatar>;
}
```

### Angular

```typescript
import '@sage-box/avatar';

@Component({
  template: `<sg-avatar>Content</sg-avatar>`
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
| `--sg-avatar-color` | Main color        |

## License

MIT
