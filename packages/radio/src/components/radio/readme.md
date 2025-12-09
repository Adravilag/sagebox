# sg-radio



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                          | Type                                             | Default      |
| ------------- | ------------- | ------------------------------------ | ------------------------------------------------ | ------------ |
| `color`       | `color`       | Color variant                        | `"error" \| "primary" \| "success" \| "warning"` | `'primary'`  |
| `disabled`    | `disabled`    | Whether the entire group is disabled | `boolean`                                        | `false`      |
| `name`        | `name`        | Radio group name                     | `string`                                         | `''`         |
| `options`     | `options`     | Options array                        | `RadioOption[] \| string`                        | `[]`         |
| `orientation` | `orientation` | Orientation                          | `"horizontal" \| "vertical"`                     | `'vertical'` |
| `size`        | `size`        | Size variant                         | `"lg" \| "md" \| "sm"`                           | `'md'`       |
| `value`       | `value`       | Currently selected value             | `string`                                         | `undefined`  |


## Events

| Event      | Description                    | Type                              |
| ---------- | ------------------------------ | --------------------------------- |
| `sgChange` | Emitted when selection changes | `CustomEvent<{ value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
