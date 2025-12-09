# sg-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                | Type                                                | Default        |
| ------------- | ------------- | -------------------------- | --------------------------------------------------- | -------------- |
| `activeTab`   | `active-tab`  | Currently active tab ID    | `string`                                            | `undefined`    |
| `fullWidth`   | `full-width`  | Full width tabs            | `boolean`                                           | `false`        |
| `keyboard`    | `keyboard`    | Enable keyboard navigation | `boolean`                                           | `true`         |
| `lazy`        | `lazy`        | Lazy load tab content      | `boolean`                                           | `false`        |
| `orientation` | `orientation` | Tabs orientation           | `"horizontal" \| "vertical"`                        | `'horizontal'` |
| `size`        | `size`        | Size                       | `"lg" \| "md" \| "sm"`                              | `'md'`         |
| `tabs`        | `tabs`        | Tab items configuration    | `TabItem[] \| string`                               | `[]`           |
| `variant`     | `variant`     | Visual variant             | `"bordered" \| "default" \| "pills" \| "underline"` | `'default'`    |


## Events

| Event         | Description                     | Type                                            |
| ------------- | ------------------------------- | ----------------------------------------------- |
| `sgTabChange` | Emitted when active tab changes | `CustomEvent<{ tabId: string; tab: TabItem; }>` |


## Methods

### `getActiveTab() => Promise<TabItem | undefined>`

Get active tab info

#### Returns

Type: `Promise<TabItem>`



### `selectTab(tabId: string) => Promise<void>`

Select a tab by ID

#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `tabId` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
