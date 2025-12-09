export default {
  title: 'Components/Tabs',
  component: 'sg-tabs',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'underline', 'bordered'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

const sampleTabs = [
  { id: 'overview', label: 'Vista General', icon: '📊' },
  { id: 'analytics', label: 'Analíticas', icon: '📈', badge: 5 },
  { id: 'reports', label: 'Informes', icon: '📋' },
  { id: 'settings', label: 'Ajustes', icon: '⚙️' },
  { id: 'disabled', label: 'Deshabilitado', disabled: true },
];

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

export const Default = {
  render: () =>
    createStory(`
    <sg-tabs
      tabs='${JSON.stringify(sampleTabs.slice(0, 4))}'
      active-tab="overview"
    >
      <div slot="overview">
        <h3>Vista General</h3>
        <p>Contenido de la pestaña Vista General. Aquí puedes ver un resumen de toda la información.</p>
      </div>
      <div slot="analytics">
        <h3>Analíticas</h3>
        <p>Gráficos y estadísticas detalladas de tu aplicación.</p>
      </div>
      <div slot="reports">
        <h3>Informes</h3>
        <p>Genera y descarga informes personalizados.</p>
      </div>
      <div slot="settings">
        <h3>Ajustes</h3>
        <p>Configura las preferencias de tu cuenta.</p>
      </div>
    </sg-tabs>
  `),
};

export const Pills = {
  render: () =>
    createStory(`
    <sg-tabs
      tabs='${JSON.stringify(sampleTabs.slice(0, 4))}'
      active-tab="analytics"
      variant="pills"
    >
      <div slot="overview"><p>Contenido Vista General</p></div>
      <div slot="analytics"><p>Contenido Analíticas</p></div>
      <div slot="reports"><p>Contenido Informes</p></div>
      <div slot="settings"><p>Contenido Ajustes</p></div>
    </sg-tabs>
  `),
};

export const Bordered = {
  render: () =>
    createStory(`
    <sg-tabs
      tabs='${JSON.stringify(sampleTabs.slice(0, 4))}'
      active-tab="overview"
      variant="bordered"
    >
      <div slot="overview"><p>Contenido con borde tradicional</p></div>
      <div slot="analytics"><p>Contenido Analíticas</p></div>
      <div slot="reports"><p>Contenido Informes</p></div>
      <div slot="settings"><p>Contenido Ajustes</p></div>
    </sg-tabs>
  `),
};

export const Vertical = {
  render: () =>
    createStory(`
    <sg-tabs
      tabs='${JSON.stringify(sampleTabs)}'
      active-tab="overview"
      orientation="vertical"
      style="height: 300px;"
    >
      <div slot="overview"><h3>Vista General</h3><p>Panel lateral con navegación vertical.</p></div>
      <div slot="analytics"><h3>Analíticas</h3><p>Estadísticas y métricas.</p></div>
      <div slot="reports"><h3>Informes</h3><p>Documentos y reportes.</p></div>
      <div slot="settings"><h3>Ajustes</h3><p>Configuración del sistema.</p></div>
      <div slot="disabled"><p>Este contenido está deshabilitado.</p></div>
    </sg-tabs>
  `),
};

export const FullWidth = {
  render: () =>
    createStory(`
    <sg-tabs
      tabs='${JSON.stringify(sampleTabs.slice(0, 3))}'
      active-tab="overview"
      full-width
    >
      <div slot="overview"><p>Tabs ocupando todo el ancho</p></div>
      <div slot="analytics"><p>Contenido Analíticas</p></div>
      <div slot="reports"><p>Contenido Informes</p></div>
    </sg-tabs>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.875rem;">Small</p>
        <sg-tabs
          tabs='${JSON.stringify(sampleTabs.slice(0, 3))}'
          active-tab="overview"
          size="sm"
        >
          <div slot="overview"><p>Tamaño pequeño</p></div>
          <div slot="analytics"><p>Analytics</p></div>
          <div slot="reports"><p>Reports</p></div>
        </sg-tabs>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.875rem;">Medium (default)</p>
        <sg-tabs
          tabs='${JSON.stringify(sampleTabs.slice(0, 3))}'
          active-tab="analytics"
          size="md"
        >
          <div slot="overview"><p>Overview</p></div>
          <div slot="analytics"><p>Tamaño medio</p></div>
          <div slot="reports"><p>Reports</p></div>
        </sg-tabs>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.875rem;">Large</p>
        <sg-tabs
          tabs='${JSON.stringify(sampleTabs.slice(0, 3))}'
          active-tab="reports"
          size="lg"
        >
          <div slot="overview"><p>Overview</p></div>
          <div slot="analytics"><p>Analytics</p></div>
          <div slot="reports"><p>Tamaño grande</p></div>
        </sg-tabs>
      </div>
    </div>
  `),
};

export const WithBadges = {
  render: () => {
    const tabsWithBadges = [
      { id: 'inbox', label: 'Bandeja de entrada', badge: 12 },
      { id: 'sent', label: 'Enviados', badge: 0 },
      { id: 'drafts', label: 'Borradores', badge: 3 },
      { id: 'spam', label: 'Spam', badge: 128 },
    ];
    return createStory(`
      <sg-tabs
        tabs='${JSON.stringify(tabsWithBadges)}'
        active-tab="inbox"
      >
        <div slot="inbox"><p>12 mensajes sin leer</p></div>
        <div slot="sent"><p>Mensajes enviados</p></div>
        <div slot="drafts"><p>3 borradores guardados</p></div>
        <div slot="spam"><p>128 mensajes en spam</p></div>
      </sg-tabs>
    `);
  },
};
