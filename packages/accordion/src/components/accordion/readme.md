# sg-accordion



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                 | Type                        | Default   |
| -------------- | --------------- | --------------------------- | --------------------------- | --------- |
| `bordered`     | `bordered`      | Bordered style              | `boolean`                   | `true`    |
| `expanded`     | `expanded`      | Currently expanded panel(s) | `string \| string[]`        | `[]`      |
| `iconPosition` | `icon-position` | Icon position               | `"left" \| "right"`         | `'right'` |
| `items`        | `items`         | Accordion items             | `AccordionItem[] \| string` | `[]`      |
| `multiple`     | `multiple`      | Allow multiple panels open  | `boolean`                   | `false`   |
| `size`         | `size`          | Size variant                | `"lg" \| "md" \| "sm"`      | `'md'`    |


## Events

| Event      | Description                   | Type                                              |
| ---------- | ----------------------------- | ------------------------------------------------- |
| `sgToggle` | Emitted when panel is toggled | `CustomEvent<{ id: string; expanded: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
