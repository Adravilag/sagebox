# sg-alert



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                     | Type                                          | Default     |
| ------------- | ------------- | ------------------------------- | --------------------------------------------- | ----------- |
| `animated`    | `animated`    | Closable with animation         | `boolean`                                     | `true`      |
| `dismissible` | `dismissible` | Show dismiss button             | `boolean`                                     | `false`     |
| `icon`        | `icon`        | Custom icon (overrides default) | `string`                                      | `undefined` |
| `outlined`    | `outlined`    | Outlined style                  | `boolean`                                     | `false`     |
| `showIcon`    | `show-icon`   | Show icon                       | `boolean`                                     | `true`      |
| `size`        | `size`        | Size variant                    | `"lg" \| "md" \| "sm"`                        | `'md'`      |
| `soft`        | `soft`        | Soft/muted colors               | `boolean`                                     | `true`      |
| `title`       | `title`       | Optional title                  | `string`                                      | `undefined` |
| `type`        | `type`        | Alert type/severity             | `"error" \| "info" \| "success" \| "warning"` | `'info'`    |


## Events

| Event       | Description                             | Type                |
| ----------- | --------------------------------------- | ------------------- |
| `sgClosed`  | Emitted after close animation completes | `CustomEvent<void>` |
| `sgDismiss` | Emitted when alert is dismissed         | `CustomEvent<void>` |


## Methods

### `dismiss() => Promise<void>`

Dismiss the alert

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the alert

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
