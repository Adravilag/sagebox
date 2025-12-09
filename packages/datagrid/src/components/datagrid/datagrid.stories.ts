export default {
  title: 'Components/Datagrid',
  component: 'sg-datagrid',
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Enable multi-row selection',
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    pageSize: {
      control: 'number',
      description: 'Items per page',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    striped: {
      control: 'boolean',
      description: 'Striped rows',
    },
    hoverable: {
      control: 'boolean',
      description: 'Hoverable rows',
    },
    bordered: {
      control: 'boolean',
      description: 'Bordered style',
    },
    compact: {
      control: 'boolean',
      description: 'Compact mode',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Sticky header',
    },
  },
};

// Sample data
const sampleColumns = [
  { key: 'id', header: 'ID', width: '80px', sortable: true, align: 'center' },
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'department', header: 'Departamento', sortable: true },
  { key: 'status', header: 'Estado', align: 'center' },
];

const sampleData = [
  { id: 1, name: 'María García', email: 'maria@example.com', department: 'Ventas', status: '🟢 Activo' },
  { id: 2, name: 'Carlos López', email: 'carlos@example.com', department: 'Desarrollo', status: '🟢 Activo' },
  { id: 3, name: 'Ana Martínez', email: 'ana@example.com', department: 'Marketing', status: '🟡 Pendiente' },
  { id: 4, name: 'Pedro Sánchez', email: 'pedro@example.com', department: 'Desarrollo', status: '🟢 Activo' },
  { id: 5, name: 'Laura Torres', email: 'laura@example.com', department: 'RRHH', status: '🔴 Inactivo' },
  { id: 6, name: 'Juan Rodríguez', email: 'juan@example.com', department: 'Ventas', status: '🟢 Activo' },
  { id: 7, name: 'Sofia Fernández', email: 'sofia@example.com', department: 'Marketing', status: '🟢 Activo' },
  { id: 8, name: 'Diego Ruiz', email: 'diego@example.com', department: 'Desarrollo', status: '🟡 Pendiente' },
  { id: 9, name: 'Carmen Díaz', email: 'carmen@example.com', department: 'RRHH', status: '🟢 Activo' },
  { id: 10, name: 'Andrés Moreno', email: 'andres@example.com', department: 'Ventas', status: '🟢 Activo' },
  { id: 11, name: 'Elena Jiménez', email: 'elena@example.com', department: 'Desarrollo', status: '🔴 Inactivo' },
  { id: 12, name: 'Miguel Álvarez', email: 'miguel@example.com', department: 'Marketing', status: '🟢 Activo' },
];

// Helper to create story HTML with event listeners
const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

export const Default = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='${JSON.stringify(sampleData.slice(0, 5))}'
      hoverable
    ></sg-datagrid>
  `),
};

export const WithSelection = {
  render: () => {
    const container = createStory(`
      <div>
        <p style="margin-bottom: 1rem; color: #64748b;">Haz clic en las filas para seleccionarlas:</p>
        <sg-datagrid
          columns='${JSON.stringify(sampleColumns)}'
          data='${JSON.stringify(sampleData.slice(0, 6))}'
          selectable
          multi-select
          hoverable
        ></sg-datagrid>
        <p id="selection-output" style="margin-top: 1rem; padding: 0.5rem; background: #f1f5f9; border-radius: 0.25rem; font-size: 0.875rem;"></p>
      </div>
    `);

    const grid = container.querySelector('sg-datagrid');
    const output = container.querySelector('#selection-output');

    grid?.addEventListener('sgSelect', (e: CustomEvent) => {
      const { selected } = e.detail;
      output!.textContent = selected.length ? `Seleccionados: ${selected.map(r => r.name).join(', ')}` : 'Ninguna fila seleccionada';
    });

    return container;
  },
};

export const WithPagination = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='${JSON.stringify(sampleData)}'
      paginated
      page-size="5"
      hoverable
    ></sg-datagrid>
  `),
};

export const Striped = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='${JSON.stringify(sampleData.slice(0, 8))}'
      striped
      hoverable
    ></sg-datagrid>
  `),
};

export const Bordered = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='${JSON.stringify(sampleData.slice(0, 5))}'
      bordered
      hoverable
    ></sg-datagrid>
  `),
};

export const Compact = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='${JSON.stringify(sampleData.slice(0, 8))}'
      compact
      striped
      hoverable
    ></sg-datagrid>
  `),
};

export const Loading = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='${JSON.stringify(sampleData.slice(0, 5))}'
      loading
    ></sg-datagrid>
  `),
};

export const Empty = {
  render: () =>
    createStory(`
    <sg-datagrid
      columns='${JSON.stringify(sampleColumns)}'
      data='[]'
      empty-message="No se encontraron registros"
    ></sg-datagrid>
  `),
};

export const FullFeatured = {
  render: () => {
    const container = createStory(`
      <div>
        <h3 style="margin-bottom: 1rem; font-weight: 600;">📊 Gestión de Usuarios</h3>
        <sg-datagrid
          columns='${JSON.stringify(sampleColumns)}'
          data='${JSON.stringify(sampleData)}'
          selectable
          multi-select
          paginated
          page-size="5"
          striped
          hoverable
        ></sg-datagrid>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <button id="btn-clear" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; background: #fff; cursor: pointer;">
            Limpiar selección
          </button>
          <button id="btn-select-all" style="padding: 0.5rem 1rem; border: 1px solid #3b82f6; border-radius: 0.25rem; background: #3b82f6; color: white; cursor: pointer;">
            Seleccionar todo
          </button>
        </div>
        <p id="selection-output" style="margin-top: 1rem; padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.375rem; font-size: 0.875rem; color: #64748b;"></p>
      </div>
    `);

    const grid = container.querySelector('sg-datagrid');
    const output = container.querySelector('#selection-output');
    const btnClear = container.querySelector('#btn-clear');
    const btnSelectAll = container.querySelector('#btn-select-all');

    grid?.addEventListener('sgSelect', (e: CustomEvent) => {
      const { selected } = e.detail;
      output!.textContent = selected.length ? `✓ ${selected.length} fila(s) seleccionada(s): ${selected.map(r => r.name).join(', ')}` : '— Ninguna fila seleccionada';
    });

    btnClear?.addEventListener('click', () => {
      (grid as any)?.clearSelection();
    });

    btnSelectAll?.addEventListener('click', () => {
      (grid as any)?.selectAll();
    });

    return container;
  },
};
