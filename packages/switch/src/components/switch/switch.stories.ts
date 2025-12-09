export default {
  title: 'Components/Switch',
  component: 'sg-switch',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    color: { control: { type: 'select' }, options: ['primary', 'success', 'warning', 'error'] },
    labelPosition: { control: { type: 'select' }, options: ['left', 'right'] },
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
      <sg-switch label="Modo oscuro"></sg-switch>
      <sg-switch label="Notificaciones" checked></sg-switch>
      <sg-switch label="Deshabilitado" disabled></sg-switch>
    </div>
  `),
};

export const Colors = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-switch label="Primary" checked color="primary"></sg-switch>
      <sg-switch label="Success" checked color="success"></sg-switch>
      <sg-switch label="Warning" checked color="warning"></sg-switch>
      <sg-switch label="Error" checked color="error"></sg-switch>
    </div>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-switch label="Small" checked size="sm"></sg-switch>
      <sg-switch label="Medium" checked size="md"></sg-switch>
      <sg-switch label="Large" checked size="lg"></sg-switch>
    </div>
  `),
};

export const LabelLeft = {
  render: () =>
    createStory(`
    <sg-switch label="Activar función" label-position="left" checked></sg-switch>
  `),
};

export const WithText = {
  render: () =>
    createStory(`
    <sg-switch
      label="Estado"
      checked
      show-text
      on-text="SÍ"
      off-text="NO"
      size="lg"
    ></sg-switch>
  `),
};

export const SettingsExample = {
  render: () =>
    createStory(`
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 0.75rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 0.5rem;">
        <span style="font-size: 0.875rem;">🔔 Notificaciones push</span>
        <sg-switch checked></sg-switch>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 0.5rem;">
        <span style="font-size: 0.875rem;">📧 Emails de marketing</span>
        <sg-switch></sg-switch>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 0.5rem;">
        <span style="font-size: 0.875rem;">🌙 Modo oscuro</span>
        <sg-switch checked color="success"></sg-switch>
      </div>
    </div>
  `),
};
