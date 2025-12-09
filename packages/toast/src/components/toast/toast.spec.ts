import { newSpecPage } from '@stencil/core/testing';
import { Toast } from './toast';

describe('sg-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Toast],
      html: `<sg-toast></sg-toast>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-toast class="sg-toast sg-toast--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-toast>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Toast],
      html: `<sg-toast variant="primary"></sg-toast>`,
    });
    expect(page.root).toHaveClass('sg-toast--primary');
  });
});
