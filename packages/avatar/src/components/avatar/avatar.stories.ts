export default {
  title: 'Components/Avatar',
  component: 'sg-avatar',
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: { type: 'select' }, options: ['circle', 'square', 'rounded'] },
    status: { control: { type: 'select' }, options: ['online', 'offline', 'busy', 'away'] },
    bordered: { control: 'boolean' },
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
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sg-avatar name="John Doe"></sg-avatar>
      <sg-avatar name="María García"></sg-avatar>
      <sg-avatar name="Carlos"></sg-avatar>
      <sg-avatar></sg-avatar>
    </div>
  `),
};

export const WithImage = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sg-avatar src="https://i.pravatar.cc/150?u=1" alt="User 1"></sg-avatar>
      <sg-avatar src="https://i.pravatar.cc/150?u=2" alt="User 2"></sg-avatar>
      <sg-avatar src="https://i.pravatar.cc/150?u=3" alt="User 3"></sg-avatar>
    </div>
  `),
};

export const Sizes = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sg-avatar name="XS" size="xs"></sg-avatar>
      <sg-avatar name="SM" size="sm"></sg-avatar>
      <sg-avatar name="MD" size="md"></sg-avatar>
      <sg-avatar name="LG" size="lg"></sg-avatar>
      <sg-avatar name="XL" size="xl"></sg-avatar>
    </div>
  `),
};

export const Shapes = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sg-avatar name="Circle" shape="circle"></sg-avatar>
      <sg-avatar name="Rounded" shape="rounded"></sg-avatar>
      <sg-avatar name="Square" shape="square"></sg-avatar>
    </div>
  `),
};

export const WithStatus = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <sg-avatar name="Online" status="online"></sg-avatar>
      <sg-avatar name="Offline" status="offline"></sg-avatar>
      <sg-avatar name="Busy" status="busy"></sg-avatar>
      <sg-avatar name="Away" status="away"></sg-avatar>
    </div>
  `),
};

export const Bordered = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sg-avatar name="John Doe" bordered></sg-avatar>
      <sg-avatar src="https://i.pravatar.cc/150?u=4" bordered></sg-avatar>
      <sg-avatar name="María" bordered status="online"></sg-avatar>
    </div>
  `),
};

export const AvatarGroup = {
  render: () =>
    createStory(`
    <div style="display: flex;">
      <sg-avatar src="https://i.pravatar.cc/150?u=10" bordered style="margin-left: -0.5rem;"></sg-avatar>
      <sg-avatar src="https://i.pravatar.cc/150?u=11" bordered style="margin-left: -0.5rem;"></sg-avatar>
      <sg-avatar src="https://i.pravatar.cc/150?u=12" bordered style="margin-left: -0.5rem;"></sg-avatar>
      <sg-avatar name="+5" bordered style="margin-left: -0.5rem; background: #64748b;"></sg-avatar>
    </div>
  `),
};

export const FallbackColors = {
  render: () =>
    createStory(`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-avatar name="Alice Brown"></sg-avatar>
      <sg-avatar name="Bob Smith"></sg-avatar>
      <sg-avatar name="Carol White"></sg-avatar>
      <sg-avatar name="David Lee"></sg-avatar>
      <sg-avatar name="Emma Wilson"></sg-avatar>
      <sg-avatar name="Frank Miller"></sg-avatar>
      <sg-avatar name="Grace Taylor"></sg-avatar>
      <sg-avatar name="Henry Anderson"></sg-avatar>
    </div>
  `),
};
