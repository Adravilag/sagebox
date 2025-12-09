import { newSpecPage } from '@stencil/core/testing';
import { Datagrid } from './datagrid';

describe('sg-datagrid', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Datagrid],
      html: `<sg-datagrid></sg-datagrid>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-datagrid class="sg-datagrid sg-datagrid--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-datagrid>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Datagrid],
      html: `<sg-datagrid variant="primary"></sg-datagrid>`,
    });
    expect(page.root).toHaveClass('sg-datagrid--primary');
  });
});
