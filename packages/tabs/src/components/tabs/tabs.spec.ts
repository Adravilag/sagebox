import { newSpecPage } from '@stencil/core/testing';
import { Tabs } from './tabs';

describe('sg-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Tabs],
      html: `<sg-tabs></sg-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-tabs class="sg-tabs sg-tabs--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-tabs>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Tabs],
      html: `<sg-tabs variant="primary"></sg-tabs>`,
    });
    expect(page.root).toHaveClass('sg-tabs--primary');
  });
});
