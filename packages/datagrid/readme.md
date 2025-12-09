# @sage-box/datagrid

Datagrid component

## Installation

```bash
npm install @sage-box/datagrid
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/datagrid/loader';
  defineCustomElements();
</script>

<sg-datagrid>Content</sg-datagrid>
```

### React

```jsx
import '@sage-box/datagrid';

function App() {
  return <sg-datagrid>Content</sg-datagrid>;
}
```

### Angular

```typescript
import '@sage-box/datagrid';

@Component({
  template: `<sg-datagrid>Content</sg-datagrid>`
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
| `--sg-datagrid-color` | Main color        |

## License

MIT
