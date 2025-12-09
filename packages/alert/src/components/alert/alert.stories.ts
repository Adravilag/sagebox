export default {
  title: 'Components/Alert',
  component: 'sg-alert',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    dismissible: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    soft: { control: 'boolean' },
    outlined: { control: 'boolean' },
  },
};

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

export const AllTypes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-alert type="info" title="Información">
        Este es un mensaje informativo para el usuario.
      </sg-alert>

      <sg-alert type="success" title="¡Éxito!">
        La operación se ha completado correctamente.
      </sg-alert>

      <sg-alert type="warning" title="Advertencia">
        Por favor revisa los datos antes de continuar.
      </sg-alert>

      <sg-alert type="error" title="Error">
        Ha ocurrido un error al procesar la solicitud.
      </sg-alert>
    </div>
  `),
};

export const Info = {
  render: () =>
    createStory(`
    <sg-alert type="info" title="Nueva actualización disponible">
      Hay una nueva versión de la aplicación. Actualiza para obtener las últimas mejoras.
    </sg-alert>
  `),
};

export const Success = {
  render: () =>
    createStory(`
    <sg-alert type="success" title="Guardado correctamente">
      Todos los cambios han sido guardados en tu cuenta.
    </sg-alert>
  `),
};

export const Warning = {
  render: () =>
    createStory(`
    <sg-alert type="warning" title="Sesión por expirar">
      Tu sesión expirará en 5 minutos. Guarda tu trabajo para no perder cambios.
    </sg-alert>
  `),
};

export const Error = {
  render: () =>
    createStory(`
    <sg-alert type="error" title="Error de conexión">
      No se pudo conectar con el servidor. Verifica tu conexión a internet.
    </sg-alert>
  `),
};

export const Dismissible = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-alert type="info" dismissible>
        Haz clic en la X para cerrar esta alerta.
      </sg-alert>

      <sg-alert type="success" title="Puedes cerrarme" dismissible>
        Esta alerta tiene título y es dismissible.
      </sg-alert>
    </div>
  `),
};

export const WithoutIcon = {
  render: () =>
    createStory(`
    <sg-alert type="warning" show-icon="false">
      Esta alerta no tiene icono, solo el mensaje.
    </sg-alert>
  `),
};

export const Solid = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-alert type="info" soft="false">
        Alerta info sólida
      </sg-alert>

      <sg-alert type="success" soft="false">
        Alerta success sólida
      </sg-alert>

      <sg-alert type="warning" soft="false">
        Alerta warning sólida
      </sg-alert>

      <sg-alert type="error" soft="false">
        Alerta error sólida
      </sg-alert>
    </div>
  `),
};

export const Outlined = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-alert type="info" outlined>
        Alerta info con borde
      </sg-alert>

      <sg-alert type="success" outlined>
        Alerta success con borde
      </sg-alert>

      <sg-alert type="warning" outlined>
        Alerta warning con borde
      </sg-alert>

      <sg-alert type="error" outlined>
        Alerta error con borde
      </sg-alert>
    </div>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-alert type="info" size="sm" title="Pequeña">
        Alerta en tamaño pequeño (sm)
      </sg-alert>

      <sg-alert type="success" size="md" title="Mediana">
        Alerta en tamaño mediano (md) - por defecto
      </sg-alert>

      <sg-alert type="warning" size="lg" title="Grande">
        Alerta en tamaño grande (lg)
      </sg-alert>
    </div>
  `),
};

export const SimpleMessage = {
  render: () =>
    createStory(`
    <sg-alert type="info">
      Una alerta simple sin título, solo con el mensaje.
    </sg-alert>
  `),
};
