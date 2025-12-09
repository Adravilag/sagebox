import { Component, Prop, State, Event, EventEmitter, h, Host, Watch, Method } from '@stencil/core';

export interface DatagridColumn {
  /** Unique key matching the data field */
  key: string;
  /** Display header text */
  header: string;
  /** Column width (e.g., '150px', '20%', 'auto') */
  width?: string;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom render function (returns HTML string) */
  render?: (value: any, row: any, index: number) => string;
}

export interface DatagridSort {
  key: string;
  direction: 'asc' | 'desc';
}

export interface DatagridPagination {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * @component sg-datagrid
 * @description A powerful datagrid component with sorting, pagination, and row selection.
 *
 * @example
 * ```html
 * <sg-datagrid
 *   columns='[{"key":"name","header":"Name","sortable":true},{"key":"email","header":"Email"}]'
 *   data='[{"name":"John","email":"john@example.com"}]'
 *   selectable
 *   paginated
 *   page-size="10"
 * ></sg-datagrid>
 * ```
 */
@Component({
  tag: 'sg-datagrid',
  styleUrl: 'datagrid.css',
  shadow: true,
})
export class Datagrid {
  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Column definitions */
  @Prop() columns: DatagridColumn[] | string = [];

  /** Data rows */
  @Prop() data: any[] | string = [];

  /** Enable row selection */
  @Prop() selectable: boolean = false;

  /** Enable multi-row selection */
  @Prop() multiSelect: boolean = true;

  /** Enable pagination */
  @Prop() paginated: boolean = false;

  /** Items per page */
  @Prop() pageSize: number = 10;

  /** Available page sizes */
  @Prop() pageSizes: number[] | string = [10, 25, 50, 100];

  /** Show loading state */
  @Prop() loading: boolean = false;

  /** Striped rows */
  @Prop({ reflect: true }) striped: boolean = false;

  /** Hoverable rows */
  @Prop({ reflect: true }) hoverable: boolean = true;

  /** Bordered style */
  @Prop({ reflect: true }) bordered: boolean = false;

  /** Compact mode */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Empty state message */
  @Prop() emptyMessage: string = 'No hay datos disponibles';

  /** Sticky header */
  @Prop({ reflect: true }) stickyHeader: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() parsedColumns: DatagridColumn[] = [];
  @State() parsedData: any[] = [];
  @State() displayData: any[] = [];
  @State() selectedRows: Set<number> = new Set();
  @State() sort: DatagridSort | null = null;
  @State() currentPage: number = 1;
  @State() currentPageSize: number = 10;
  @State() parsedPageSizes: number[] = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Emitted when row selection changes */
  @Event() sgSelect!: EventEmitter<{ selected: any[]; indices: number[] }>;

  /** Emitted when sort changes */
  @Event() sgSort!: EventEmitter<DatagridSort | null>;

  /** Emitted when page changes */
  @Event() sgPageChange!: EventEmitter<DatagridPagination>;

  /** Emitted when a row is clicked */
  @Event() sgRowClick!: EventEmitter<{ row: any; index: number }>;

  // ═══════════════════════════════════════════════════════════════════════════
  // WATCHERS
  // ═══════════════════════════════════════════════════════════════════════════

  @Watch('columns')
  watchColumns() {
    this.parseColumns();
  }

  @Watch('data')
  watchData() {
    this.parseData();
    this.updateDisplayData();
  }

  @Watch('pageSize')
  watchPageSize() {
    this.currentPageSize = this.pageSize;
    this.currentPage = 1;
    this.updateDisplayData();
  }

  @Watch('pageSizes')
  watchPageSizes() {
    this.parsePageSizes();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentWillLoad() {
    this.parseColumns();
    this.parseData();
    this.parsePageSizes();
    this.currentPageSize = this.pageSize;
    this.updateDisplayData();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Get selected rows */
  @Method()
  async getSelectedRows(): Promise<any[]> {
    return Array.from(this.selectedRows).map(i => this.parsedData[i]);
  }

  /** Clear selection */
  @Method()
  async clearSelection(): Promise<void> {
    this.selectedRows = new Set();
    this.emitSelection();
  }

  /** Select all rows */
  @Method()
  async selectAll(): Promise<void> {
    this.selectedRows = new Set(this.parsedData.map((_, i) => i));
    this.emitSelection();
  }

  /** Go to specific page */
  @Method()
  async goToPage(page: number): Promise<void> {
    const maxPage = Math.ceil(this.parsedData.length / this.currentPageSize);
    this.currentPage = Math.max(1, Math.min(page, maxPage));
    this.updateDisplayData();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private parseColumns() {
    if (typeof this.columns === 'string') {
      try {
        this.parsedColumns = JSON.parse(this.columns);
      } catch {
        this.parsedColumns = [];
      }
    } else {
      this.parsedColumns = this.columns;
    }
  }

  private parseData() {
    if (typeof this.data === 'string') {
      try {
        this.parsedData = JSON.parse(this.data);
      } catch {
        this.parsedData = [];
      }
    } else {
      this.parsedData = this.data;
    }
  }

  private parsePageSizes() {
    if (typeof this.pageSizes === 'string') {
      try {
        this.parsedPageSizes = JSON.parse(this.pageSizes);
      } catch {
        this.parsedPageSizes = [10, 25, 50, 100];
      }
    } else {
      this.parsedPageSizes = this.pageSizes;
    }
  }

  private updateDisplayData() {
    let data = [...this.parsedData];

    // Apply sorting
    if (this.sort) {
      const { key, direction } = this.sort;
      data.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal === bVal) return 0;
        const comparison = aVal > bVal ? 1 : -1;
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    // Apply pagination
    if (this.paginated) {
      const start = (this.currentPage - 1) * this.currentPageSize;
      data = data.slice(start, start + this.currentPageSize);
    }

    this.displayData = data;
  }

  private emitSelection() {
    const indices = Array.from(this.selectedRows);
    const selected = indices.map(i => this.parsedData[i]);
    this.sgSelect.emit({ selected, indices });
  }

  private handleSort(column: DatagridColumn) {
    if (!column.sortable) return;

    if (this.sort?.key === column.key) {
      if (this.sort.direction === 'asc') {
        this.sort = { key: column.key, direction: 'desc' };
      } else {
        this.sort = null;
      }
    } else {
      this.sort = { key: column.key, direction: 'asc' };
    }

    this.sgSort.emit(this.sort);
    this.updateDisplayData();
  }

  private handleRowClick(row: any, index: number) {
    this.sgRowClick.emit({ row, index });

    if (this.selectable) {
      const actualIndex = this.paginated ? (this.currentPage - 1) * this.currentPageSize + index : index;

      if (this.multiSelect) {
        const newSelected = new Set(this.selectedRows);
        if (newSelected.has(actualIndex)) {
          newSelected.delete(actualIndex);
        } else {
          newSelected.add(actualIndex);
        }
        this.selectedRows = newSelected;
      } else {
        this.selectedRows = new Set([actualIndex]);
      }
      this.emitSelection();
    }
  }

  private handleSelectAll() {
    if (this.selectedRows.size === this.parsedData.length) {
      this.selectedRows = new Set();
    } else {
      this.selectedRows = new Set(this.parsedData.map((_, i) => i));
    }
    this.emitSelection();
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayData();
    this.sgPageChange.emit({
      page: this.currentPage,
      pageSize: this.currentPageSize,
      total: this.parsedData.length,
    });
  }

  private handlePageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.currentPageSize = parseInt(select.value, 10);
    this.currentPage = 1;
    this.updateDisplayData();
    this.sgPageChange.emit({
      page: this.currentPage,
      pageSize: this.currentPageSize,
      total: this.parsedData.length,
    });
  }

  private isRowSelected(index: number): boolean {
    const actualIndex = this.paginated ? (this.currentPage - 1) * this.currentPageSize + index : index;
    return this.selectedRows.has(actualIndex);
  }

  private getCellValue(row: any, column: DatagridColumn, rowIndex: number): string {
    const value = row[column.key];
    if (column.render) {
      return column.render(value, row, rowIndex);
    }
    return value ?? '';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  private renderHeader() {
    return (
      <thead class="datagrid-head">
        <tr>
          {this.selectable && this.multiSelect && (
            <th class="datagrid-cell datagrid-cell--checkbox">
              <input
                type="checkbox"
                checked={this.selectedRows.size === this.parsedData.length && this.parsedData.length > 0}
                indeterminate={this.selectedRows.size > 0 && this.selectedRows.size < this.parsedData.length}
                onChange={() => this.handleSelectAll()}
              />
            </th>
          )}
          {this.parsedColumns.map(col => (
            <th
              class={{
                'datagrid-cell': true,
                'datagrid-cell--sortable': !!col.sortable,
                'datagrid-cell--sorted': this.sort?.key === col.key,
                [`datagrid-cell--${col.align || 'left'}`]: true,
              }}
              style={{ width: col.width }}
              onClick={() => this.handleSort(col)}
            >
              <span class="cell-content">
                {col.header}
                {col.sortable && <span class="sort-icon">{this.sort?.key === col.key ? (this.sort.direction === 'asc' ? '↑' : '↓') : '↕'}</span>}
              </span>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  private renderBody() {
    if (this.displayData.length === 0) {
      return (
        <tbody class="datagrid-body">
          <tr class="datagrid-row datagrid-row--empty">
            <td class="datagrid-cell datagrid-cell--empty" colSpan={this.parsedColumns.length + (this.selectable && this.multiSelect ? 1 : 0)}>
              {this.emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody class="datagrid-body">
        {this.displayData.map((row, index) => (
          <tr
            class={{
              'datagrid-row': true,
              'datagrid-row--selected': this.isRowSelected(index),
            }}
            onClick={() => this.handleRowClick(row, index)}
          >
            {this.selectable && this.multiSelect && (
              <td class="datagrid-cell datagrid-cell--checkbox">
                <input type="checkbox" checked={this.isRowSelected(index)} onClick={e => e.stopPropagation()} onChange={() => this.handleRowClick(row, index)} />
              </td>
            )}
            {this.parsedColumns.map(col => (
              <td
                class={{
                  'datagrid-cell': true,
                  [`datagrid-cell--${col.align || 'left'}`]: true,
                }}
                innerHTML={this.getCellValue(row, col, index)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  private renderPagination() {
    if (!this.paginated) return null;

    const totalPages = Math.ceil(this.parsedData.length / this.currentPageSize);
    const start = (this.currentPage - 1) * this.currentPageSize + 1;
    const end = Math.min(this.currentPage * this.currentPageSize, this.parsedData.length);

    return (
      <div class="datagrid-pagination">
        <div class="pagination-info">
          <span>
            {start}-{end} de {this.parsedData.length}
          </span>
        </div>

        <div class="pagination-size">
          <label>
            Mostrar
            <select onChange={e => this.handlePageSizeChange(e)}>
              {this.parsedPageSizes.map(size => (
                <option value={size} selected={size === this.currentPageSize}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div class="pagination-controls">
          <button class="pagination-btn" disabled={this.currentPage === 1} onClick={() => this.handlePageChange(1)} title="Primera página">
            ⟨⟨
          </button>
          <button class="pagination-btn" disabled={this.currentPage === 1} onClick={() => this.handlePageChange(this.currentPage - 1)} title="Página anterior">
            ⟨
          </button>

          <span class="pagination-pages">
            {this.currentPage} / {totalPages}
          </span>

          <button class="pagination-btn" disabled={this.currentPage === totalPages} onClick={() => this.handlePageChange(this.currentPage + 1)} title="Página siguiente">
            ⟩
          </button>
          <button class="pagination-btn" disabled={this.currentPage === totalPages} onClick={() => this.handlePageChange(totalPages)} title="Última página">
            ⟩⟩
          </button>
        </div>
      </div>
    );
  }

  private renderLoading() {
    return (
      <div class="datagrid-loading">
        <div class="loading-spinner"></div>
        <span>Cargando...</span>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  render() {
    return (
      <Host>
        <div class="datagrid-wrapper">
          {this.loading && this.renderLoading()}
          <div class="datagrid-container">
            <table class="datagrid-table">
              {this.renderHeader()}
              {this.renderBody()}
            </table>
          </div>
          {this.renderPagination()}
        </div>
      </Host>
    );
  }
}
