export default {
  title: 'Components/Radio',
  component: 'sg-radio',
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    color: { control: { type: 'select' }, options: ['primary', 'success', 'warning', 'error'] },
    disabled: { control: 'boolean' },
  },
};

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

const paymentOptions = [
  { value: 'card', label: 'Tarjeta de crédito' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'transfer', label: 'Transferencia bancaria' },
];

const planOptions = [
  { value: 'free', label: 'Gratuito' },
  { value: 'pro', label: 'Profesional' },
  { value: 'enterprise', label: 'Empresarial', disabled: true },
];

export const Default = {
  render: () =>
    createStory(`
    <sg-radio
      name="payment"
      value="card"
      options='${JSON.stringify(paymentOptions)}'
    ></sg-radio>
  `),
};

export const Horizontal = {
  render: () =>
    createStory(`
    <sg-radio
      name="plan"
      value="pro"
      orientation="horizontal"
      options='${JSON.stringify(planOptions)}'
    ></sg-radio>
  `),
};

export const Colors = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <sg-radio name="c1" value="1" color="primary" options='[{"value":"1","label":"Primary"}]'></sg-radio>
      <sg-radio name="c2" value="1" color="success" options='[{"value":"1","label":"Success"}]'></sg-radio>
      <sg-radio name="c3" value="1" color="warning" options='[{"value":"1","label":"Warning"}]'></sg-radio>
      <sg-radio name="c4" value="1" color="error" options='[{"value":"1","label":"Error"}]'></sg-radio>
    </div>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 2rem;">
      <sg-radio name="s1" value="1" size="sm" options='[{"value":"1","label":"Small"}]'></sg-radio>
      <sg-radio name="s2" value="1" size="md" options='[{"value":"1","label":"Medium"}]'></sg-radio>
      <sg-radio name="s3" value="1" size="lg" options='[{"value":"1","label":"Large"}]'></sg-radio>
    </div>
  `),
};

export const Disabled = {
  render: () =>
    createStory(`
    <sg-radio
      name="disabled"
      disabled
      options='${JSON.stringify(paymentOptions)}'
    ></sg-radio>
  `),
};
