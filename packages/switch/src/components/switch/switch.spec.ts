import { newSpecPage } from '@stencil/core/testing';
import { Switch } from './switch';

describe('sg-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Switch],
      html: `<sg-switch></sg-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-switch class="sg-switch sg-switch--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-switch>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Switch],
      html: `<sg-switch variant="primary"></sg-switch>`,
    });
    expect(page.root).toHaveClass('sg-switch--primary');
  });
});
