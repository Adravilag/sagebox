export default {
  title: 'Components/Progress',
  component: 'sg-progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    type: { control: { type: 'select' }, options: ['linear', 'circular'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    color: { control: { type: 'select' }, options: ['primary', 'success', 'warning', 'error'] },
    showLabel: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
};

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

export const Linear = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-progress value="25"></sg-progress>
      <sg-progress value="50"></sg-progress>
      <sg-progress value="75"></sg-progress>
      <sg-progress value="100"></sg-progress>
    </div>
  `),
};

export const WithLabel = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-progress value="65" show-label></sg-progress>
      <sg-progress value="40" show-label label="Subiendo..."></sg-progress>
    </div>
  `),
};

export const Colors = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-progress value="60" color="primary" show-label></sg-progress>
      <sg-progress value="80" color="success" show-label></sg-progress>
      <sg-progress value="45" color="warning" show-label></sg-progress>
      <sg-progress value="30" color="error" show-label></sg-progress>
    </div>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.75rem;">Small</p>
        <sg-progress value="60" size="sm"></sg-progress>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.75rem;">Medium</p>
        <sg-progress value="60" size="md"></sg-progress>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.75rem;">Large</p>
        <sg-progress value="60" size="lg"></sg-progress>
      </div>
    </div>
  `),
};

export const Striped = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-progress value="70" striped></sg-progress>
      <sg-progress value="70" striped animated></sg-progress>
    </div>
  `),
};

export const Indeterminate = {
  render: () =>
    createStory(`
    <sg-progress indeterminate></sg-progress>
  `),
};

export const Circular = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <sg-progress type="circular" value="25" show-label size="sm"></sg-progress>
      <sg-progress type="circular" value="50" show-label></sg-progress>
      <sg-progress type="circular" value="75" show-label size="lg"></sg-progress>
    </div>
  `),
};

export const CircularColors = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <sg-progress type="circular" value="60" show-label color="primary"></sg-progress>
      <sg-progress type="circular" value="80" show-label color="success"></sg-progress>
      <sg-progress type="circular" value="45" show-label color="warning"></sg-progress>
      <sg-progress type="circular" value="30" show-label color="error"></sg-progress>
    </div>
  `),
};

export const CircularIndeterminate = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <sg-progress type="circular" indeterminate size="sm"></sg-progress>
      <sg-progress type="circular" indeterminate></sg-progress>
      <sg-progress type="circular" indeterminate size="lg"></sg-progress>
    </div>
  `),
};
