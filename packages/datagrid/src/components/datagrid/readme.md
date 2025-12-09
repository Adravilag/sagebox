# sg-datagrid



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                | Type                         | Default                      |
| -------------- | --------------- | -------------------------- | ---------------------------- | ---------------------------- |
| `bordered`     | `bordered`      | Bordered style             | `boolean`                    | `false`                      |
| `columns`      | `columns`       | Column definitions         | `DatagridColumn[] \| string` | `[]`                         |
| `compact`      | `compact`       | Compact mode               | `boolean`                    | `false`                      |
| `data`         | `data`          | Data rows                  | `any[] \| string`            | `[]`                         |
| `emptyMessage` | `empty-message` | Empty state message        | `string`                     | `'No hay datos disponibles'` |
| `hoverable`    | `hoverable`     | Hoverable rows             | `boolean`                    | `true`                       |
| `loading`      | `loading`       | Show loading state         | `boolean`                    | `false`                      |
| `multiSelect`  | `multi-select`  | Enable multi-row selection | `boolean`                    | `true`                       |
| `pageSize`     | `page-size`     | Items per page             | `number`                     | `10`                         |
| `pageSizes`    | `page-sizes`    | Available page sizes       | `number[] \| string`         | `[10, 25, 50, 100]`          |
| `paginated`    | `paginated`     | Enable pagination          | `boolean`                    | `false`                      |
| `selectable`   | `selectable`    | Enable row selection       | `boolean`                    | `false`                      |
| `stickyHeader` | `sticky-header` | Sticky header              | `boolean`                    | `false`                      |
| `striped`      | `striped`       | Striped rows               | `boolean`                    | `false`                      |


## Events

| Event          | Description                        | Type                                                   |
| -------------- | ---------------------------------- | ------------------------------------------------------ |
| `sgPageChange` | Emitted when page changes          | `CustomEvent<DatagridPagination>`                      |
| `sgRowClick`   | Emitted when a row is clicked      | `CustomEvent<{ row: any; index: number; }>`            |
| `sgSelect`     | Emitted when row selection changes | `CustomEvent<{ selected: any[]; indices: number[]; }>` |
| `sgSort`       | Emitted when sort changes          | `CustomEvent<DatagridSort>`                            |


## Methods

### `clearSelection() => Promise<void>`

Clear selection

#### Returns

Type: `Promise<void>`



### `getSelectedRows() => Promise<any[]>`

Get selected rows

#### Returns

Type: `Promise<any[]>`



### `goToPage(page: number) => Promise<void>`

Go to specific page

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `page` | `number` |             |

#### Returns

Type: `Promise<void>`



### `selectAll() => Promise<void>`

Select all rows

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
