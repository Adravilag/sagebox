import { newSpecPage } from '@stencil/core/testing';
import { Radio } from './radio';

describe('sg-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Radio],
      html: `<sg-radio></sg-radio>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-radio class="sg-radio sg-radio--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-radio>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Radio],
      html: `<sg-radio variant="primary"></sg-radio>`,
    });
    expect(page.root).toHaveClass('sg-radio--primary');
  });
});
