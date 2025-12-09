# sg-switch



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                     | Type                                             | Default     |
| --------------- | ---------------- | ------------------------------- | ------------------------------------------------ | ----------- |
| `checked`       | `checked`        | Whether the switch is on        | `boolean`                                        | `false`     |
| `color`         | `color`          | Color when checked              | `"error" \| "primary" \| "success" \| "warning"` | `'primary'` |
| `disabled`      | `disabled`       | Whether the switch is disabled  | `boolean`                                        | `false`     |
| `label`         | `label`          | Label text                      | `string`                                         | `undefined` |
| `labelPosition` | `label-position` | Label position                  | `"left" \| "right"`                              | `'right'`   |
| `name`          | `name`           | Switch name for form submission | `string`                                         | `undefined` |
| `offText`       | `off-text`       | Text when off                   | `string`                                         | `'OFF'`     |
| `onText`        | `on-text`        | Text when on                    | `string`                                         | `'ON'`      |
| `showText`      | `show-text`      | Show on/off text inside switch  | `boolean`                                        | `false`     |
| `size`          | `size`           | Size variant                    | `"lg" \| "md" \| "sm"`                           | `'md'`      |


## Events

| Event      | Description                       | Type                                 |
| ---------- | --------------------------------- | ------------------------------------ |
| `sgChange` | Emitted when switch state changes | `CustomEvent<{ checked: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
