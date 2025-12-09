import { newSpecPage } from '@stencil/core/testing';
import { Checkbox } from './checkbox';

describe('sg-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Checkbox],
      html: `<sg-checkbox></sg-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-checkbox class="sg-checkbox sg-checkbox--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-checkbox>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Checkbox],
      html: `<sg-checkbox variant="primary"></sg-checkbox>`,
    });
    expect(page.root).toHaveClass('sg-checkbox--primary');
  });
});
