import { newSpecPage } from '@stencil/core/testing';
import { Avatar } from './avatar';

describe('sg-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Avatar],
      html: `<sg-avatar></sg-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-avatar class="sg-avatar sg-avatar--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sg-avatar>
    `);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [Avatar],
      html: `<sg-avatar variant="primary"></sg-avatar>`,
    });
    expect(page.root).toHaveClass('sg-avatar--primary');
  });
});
