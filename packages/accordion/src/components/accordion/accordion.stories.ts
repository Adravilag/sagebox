export default {
  title: 'Components/Accordion',
  component: 'sg-accordion',
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    bordered: { control: 'boolean' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    iconPosition: { control: { type: 'select' }, options: ['left', 'right'] },
  },
};

const createStory = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

const faqItems = [
  {
    id: 'q1',
    header: '¿Cómo puedo crear una cuenta?',
    content: 'Puedes crear una cuenta haciendo clic en el botón "Registrarse" en la esquina superior derecha. Completa el formulario con tu email y contraseña.',
  },
  {
    id: 'q2',
    header: '¿Cuáles son los métodos de pago aceptados?',
    content: 'Aceptamos tarjetas de crédito (Visa, MasterCard, American Express), PayPal y transferencia bancaria.',
  },
  {
    id: 'q3',
    header: '¿Puedo cancelar mi suscripción?',
    content: 'Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. No hay penalizaciones por cancelación.',
  },
  { id: 'q4', header: '¿Ofrecen soporte técnico?', content: 'Sí, ofrecemos soporte técnico 24/7 a través de chat en vivo, email y teléfono para usuarios premium.' },
];

export const Default = {
  render: () =>
    createStory(`
    <sg-accordion
      items='${JSON.stringify(faqItems)}'
      expanded="q1"
    ></sg-accordion>
  `),
};

export const Multiple = {
  render: () =>
    createStory(`
    <sg-accordion
      items='${JSON.stringify(faqItems)}'
      multiple
      expanded='["q1", "q2"]'
    ></sg-accordion>
  `),
};

export const NoBorder = {
  render: () =>
    createStory(`
    <sg-accordion
      items='${JSON.stringify(faqItems)}'
      bordered="false"
    ></sg-accordion>
  `),
};

export const IconLeft = {
  render: () =>
    createStory(`
    <sg-accordion
      items='${JSON.stringify(faqItems.slice(0, 3))}'
      icon-position="left"
    ></sg-accordion>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.875rem;">Small</p>
        <sg-accordion items='${JSON.stringify(faqItems.slice(0, 2))}' size="sm"></sg-accordion>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.875rem;">Medium</p>
        <sg-accordion items='${JSON.stringify(faqItems.slice(0, 2))}' size="md"></sg-accordion>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; color: #64748b; font-size: 0.875rem;">Large</p>
        <sg-accordion items='${JSON.stringify(faqItems.slice(0, 2))}' size="lg"></sg-accordion>
      </div>
    </div>
  `),
};

export const WithIcons = {
  render: () => {
    const itemsWithIcons = [
      { id: 'account', header: 'Mi cuenta', content: 'Gestiona tu perfil, preferencias y configuración de seguridad.', icon: '👤' },
      { id: 'billing', header: 'Facturación', content: 'Revisa tus facturas, métodos de pago y historial de transacciones.', icon: '💳' },
      { id: 'notifications', header: 'Notificaciones', content: 'Configura cómo y cuándo quieres recibir alertas.', icon: '🔔' },
    ];
    return createStory(`
      <sg-accordion items='${JSON.stringify(itemsWithIcons)}'></sg-accordion>
    `);
  },
};
