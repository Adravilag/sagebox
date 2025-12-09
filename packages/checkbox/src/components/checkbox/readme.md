# sg-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                             | Type                                             | Default     |
| --------------- | --------------- | --------------------------------------- | ------------------------------------------------ | ----------- |
| `checked`       | `checked`       | Whether the checkbox is checked         | `boolean`                                        | `false`     |
| `color`         | `color`         | Color variant                           | `"error" \| "primary" \| "success" \| "warning"` | `'primary'` |
| `disabled`      | `disabled`      | Whether the checkbox is disabled        | `boolean`                                        | `false`     |
| `error`         | `error`         | Error state                             | `boolean`                                        | `false`     |
| `helperText`    | `helper-text`   | Helper/error text                       | `string`                                         | `undefined` |
| `indeterminate` | `indeterminate` | Indeterminate state (partially checked) | `boolean`                                        | `false`     |
| `label`         | `label`         | Label text                              | `string`                                         | `undefined` |
| `name`          | `name`          | Checkbox name for form submission       | `string`                                         | `undefined` |
| `size`          | `size`          | Size variant                            | `"lg" \| "md" \| "sm"`                           | `'md'`      |
| `value`         | `value`         | Checkbox value                          | `string`                                         | `undefined` |


## Events

| Event      | Description                        | Type                                                 |
| ---------- | ---------------------------------- | ---------------------------------------------------- |
| `sgChange` | Emitted when checked state changes | `CustomEvent<{ checked: boolean; value?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
