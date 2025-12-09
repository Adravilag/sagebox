export default {
  title: 'Components/Toast',
  component: 'sg-toast',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    duration: { control: 'number' },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    pauseOnHover: { control: 'boolean' },
  },
};

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

// Note: Toasts are positioned fixed, so in Storybook we show them inline
export const AllTypes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="color: #64748b; font-size: 0.875rem;">Los toasts normalmente aparecen en las esquinas. Aquí se muestran inline para demostración:</p>

      <sg-toast
        type="info"
        title="Información"
        message="Este es un toast informativo."
        position=""
        style="position: relative; display: block;"
      ></sg-toast>

      <sg-toast
        type="success"
        title="¡Éxito!"
        message="La operación se completó correctamente."
        position=""
        style="position: relative; display: block;"
      ></sg-toast>

      <sg-toast
        type="warning"
        title="Advertencia"
        message="Verifica los datos antes de continuar."
        position=""
        style="position: relative; display: block;"
      ></sg-toast>

      <sg-toast
        type="error"
        title="Error"
        message="No se pudo completar la solicitud."
        position=""
        style="position: relative; display: block;"
      ></sg-toast>
    </div>
  `),
};

export const Success = {
  render: () =>
    createStory(`
    <sg-toast
      type="success"
      title="Guardado"
      message="Los cambios se han guardado correctamente."
      position=""
      duration="0"
      style="position: relative; display: block; max-width: 360px;"
    ></sg-toast>
  `),
};

export const Error = {
  render: () =>
    createStory(`
    <sg-toast
      type="error"
      title="Error de red"
      message="No se pudo conectar con el servidor. Intenta de nuevo."
      position=""
      duration="0"
      style="position: relative; display: block; max-width: 360px;"
    ></sg-toast>
  `),
};

export const WithProgress = {
  render: () =>
    createStory(`
    <sg-toast
      type="info"
      title="Procesando..."
      message="Pasa el cursor encima para pausar el temporizador."
      position=""
      duration="10000"
      show-progress
      style="position: relative; display: block; max-width: 360px;"
    ></sg-toast>
  `),
};

export const WithoutTitle = {
  render: () =>
    createStory(`
    <sg-toast
      type="success"
      message="Archivo subido correctamente."
      position=""
      duration="0"
      style="position: relative; display: block; max-width: 360px;"
    ></sg-toast>
  `),
};

export const NotClosable = {
  render: () =>
    createStory(`
    <sg-toast
      type="warning"
      title="Procesando"
      message="Por favor espera mientras se completa la operación..."
      position=""
      duration="0"
      closable="false"
      style="position: relative; display: block; max-width: 360px;"
    ></sg-toast>
  `),
};

export const Interactive = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="color: #64748b; font-size: 0.875rem;">Haz clic en los botones para mostrar toasts:</p>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button id="btn-info" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Info
          </button>
          <button id="btn-success" style="padding: 0.5rem 1rem; background: #22c55e; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Success
          </button>
          <button id="btn-warning" style="padding: 0.5rem 1rem; background: #f59e0b; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Warning
          </button>
          <button id="btn-error" style="padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Error
          </button>
        </div>

        <div id="toast-container"></div>
      </div>
    `;

    const toastContainer = container.querySelector('#toast-container');
    let toastCount = 0;

    const createToast = (type: string, title: string, message: string) => {
      toastCount++;
      const toast = document.createElement('sg-toast');
      toast.setAttribute('type', type);
      toast.setAttribute('title', title);
      toast.setAttribute('message', message);
      toast.setAttribute('position', 'top-right');
      toast.setAttribute('duration', '4000');
      toast.style.cssText = 'margin-top: ' + toastCount * 10 + 'px';

      toast.addEventListener('sgHide', () => {
        toast.remove();
        toastCount--;
      });

      toastContainer?.appendChild(toast);
    };

    container.querySelector('#btn-info')?.addEventListener('click', () => {
      createToast('info', 'Información', 'Este es un mensaje informativo.');
    });

    container.querySelector('#btn-success')?.addEventListener('click', () => {
      createToast('success', '¡Éxito!', 'La operación se completó correctamente.');
    });

    container.querySelector('#btn-warning')?.addEventListener('click', () => {
      createToast('warning', 'Advertencia', 'Revisa los datos antes de continuar.');
    });

    container.querySelector('#btn-error')?.addEventListener('click', () => {
      createToast('error', 'Error', 'Ha ocurrido un error inesperado.');
    });

    return container;
  },
};
