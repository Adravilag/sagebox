import { newSpecPage } from '@stencil/core/testing';
import { Progress } from './progress';

describe('sg-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Progress],
      html: `<sg-progress></sg-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-progress class="sg-progress sg-progress--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-progress>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Progress],
      html: `<sg-progress variant="primary"></sg-progress>`,
    });
    expect(page.root).toHaveClass('sg-progress--primary');
  });
});
