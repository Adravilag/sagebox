import { newSpecPage } from '@stencil/core/testing';
import { Accordion } from './accordion';

describe('sg-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Accordion],
      html: `<sg-accordion></sg-accordion>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-accordion class="sg-accordion sg-accordion--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-accordion>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Accordion],
      html: `<sg-accordion variant="primary"></sg-accordion>`,
    });
    expect(page.root).toHaveClass('sg-accordion--primary');
  });
});
