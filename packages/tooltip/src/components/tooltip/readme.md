# sg-tooltip



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                  | Type                                                                               | Default     |
| ------------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| `arrow`       | `arrow`       | Show arrow                   | `boolean`                                                                          | `true`      |
| `delay`       | `delay`       | Delay before showing (ms)    | `number`                                                                           | `0`         |
| `disabled`    | `disabled`    | Disable tooltip              | `boolean`                                                                          | `false`     |
| `hideDelay`   | `hide-delay`  | Delay before hiding (ms)     | `number`                                                                           | `0`         |
| `interactive` | `interactive` | Allow hovering over tooltip  | `boolean`                                                                          | `false`     |
| `open`        | `open`        | Controlled open state        | `boolean`                                                                          | `false`     |
| `position`    | `position`    | Position relative to trigger | `"bottom" \| "left" \| "right" \| "top"`                                           | `'top'`     |
| `text`        | `text`        | Tooltip text content         | `string`                                                                           | `''`        |
| `trigger`     | `trigger`     | How to trigger the tooltip   | `"click" \| "focus" \| "hover" \| "manual"`                                        | `'hover'`   |
| `variant`     | `variant`     | Visual variant               | `"dark" \| "default" \| "error" \| "light" \| "primary" \| "success" \| "warning"` | `'default'` |


## Events

| Event    | Description                | Type                |
| -------- | -------------------------- | ------------------- |
| `sgHide` | Emitted when tooltip hides | `CustomEvent<void>` |
| `sgShow` | Emitted when tooltip shows | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Hide the tooltip

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the tooltip

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle the tooltip

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
|             | Default slot for the trigger element         |
| `"content"` | Custom tooltip content (overrides text prop) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
