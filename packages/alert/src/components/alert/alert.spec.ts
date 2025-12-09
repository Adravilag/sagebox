import { newSpecPage } from '@stencil/core/testing';
import { Alert } from './alert';

describe('sg-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Alert],
      html: `<sg-alert></sg-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-alert class="sg-alert sg-alert--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-alert>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Alert],
      html: `<sg-alert variant="primary"></sg-alert>`,
    });
    expect(page.root).toHaveClass('sg-alert--primary');
  });
});
