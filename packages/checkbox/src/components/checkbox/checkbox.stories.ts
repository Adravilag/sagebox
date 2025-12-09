export default {
  title: 'Components/Checkbox',
  component: 'sg-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    color: { control: { type: 'select' }, options: ['primary', 'success', 'warning', 'error'] },
  },
};

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

export const Default = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-checkbox label="Acepto los términos y condiciones"></sg-checkbox>
      <sg-checkbox label="Suscribirme al newsletter" checked></sg-checkbox>
      <sg-checkbox label="Opción deshabilitada" disabled></sg-checkbox>
    </div>
  `),
};

export const WithHelper = {
  render: () =>
    createStory(`
    <sg-checkbox
      label="Recordar mis datos"
      helper-text="Tu sesión permanecerá activa por 30 días"
    ></sg-checkbox>
  `),
};

export const Indeterminate = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <sg-checkbox label="Seleccionar todos" indeterminate></sg-checkbox>
      <div style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <sg-checkbox label="Opción 1" checked></sg-checkbox>
        <sg-checkbox label="Opción 2"></sg-checkbox>
        <sg-checkbox label="Opción 3" checked></sg-checkbox>
      </div>
    </div>
  `),
};

export const Colors = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 1.5rem;">
      <sg-checkbox label="Primary" checked color="primary"></sg-checkbox>
      <sg-checkbox label="Success" checked color="success"></sg-checkbox>
      <sg-checkbox label="Warning" checked color="warning"></sg-checkbox>
      <sg-checkbox label="Error" checked color="error"></sg-checkbox>
    </div>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; align-items: center; gap: 1.5rem;">
      <sg-checkbox label="Small" checked size="sm"></sg-checkbox>
      <sg-checkbox label="Medium" checked size="md"></sg-checkbox>
      <sg-checkbox label="Large" checked size="lg"></sg-checkbox>
    </div>
  `),
};

export const Error = {
  render: () =>
    createStory(`
    <sg-checkbox
      label="Acepto los términos"
      helper-text="Debes aceptar los términos para continuar"
      error
    ></sg-checkbox>
  `),
};
