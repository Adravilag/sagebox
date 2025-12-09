# sg-toast



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                         | Type                                                                                              | Default       |
| -------------- | ---------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `closable`     | `closable`       | Show close button                   | `boolean`                                                                                         | `true`        |
| `duration`     | `duration`       | Duration in ms (0 = manual dismiss) | `number`                                                                                          | `4000`        |
| `icon`         | `icon`           | Custom icon                         | `string`                                                                                          | `undefined`   |
| `message`      | `message`        | Message to display                  | `string`                                                                                          | `''`          |
| `pauseOnHover` | `pause-on-hover` | Pause on hover                      | `boolean`                                                                                         | `true`        |
| `position`     | `position`       | Position on screen                  | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "top-center" \| "top-left" \| "top-right"` | `'top-right'` |
| `showIcon`     | `show-icon`      | Show icon                           | `boolean`                                                                                         | `true`        |
| `showProgress` | `show-progress`  | Show progress bar                   | `boolean`                                                                                         | `true`        |
| `title`        | `title`          | Optional title                      | `string`                                                                                          | `undefined`   |
| `type`         | `type`           | Toast type/severity                 | `"error" \| "info" \| "success" \| "warning"`                                                     | `'info'`      |


## Events

| Event     | Description                   | Type                |
| --------- | ----------------------------- | ------------------- |
| `sgClick` | Emitted when toast is clicked | `CustomEvent<void>` |
| `sgHide`  | Emitted when toast is hidden  | `CustomEvent<void>` |
| `sgShow`  | Emitted when toast is shown   | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Hide the toast

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the toast

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
