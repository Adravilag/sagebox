import { newSpecPage } from '@stencil/core/testing';
import { SgBreadcrumbItem } from './breadcrumb-item';

describe('sg-breadcrumb-item', () => {
  describe('rendering', () => {
    it('renders', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-breadcrumb-item>
          <mock:shadow-root>
            <li class="breadcrumb-item" part="item">
              <span class="item-text" part="text">
                <slot name="icon"></slot>
                <span class="item-label">
                  <slot></slot>
                </span>
              </span>
              <span aria-hidden="true" class="item-separator" part="separator">›</span>
            </li>
          </mock:shadow-root>
          Item
        </sg-breadcrumb-item>
      `);
    });

    it('renders with href', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/home">Home</sg-breadcrumb-item>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-breadcrumb-item href="/home">
          <mock:shadow-root>
            <li class="breadcrumb-item" part="item">
              <a class="item-link" href="/home" part="link" target="_self">
                <slot name="icon"></slot>
                <span class="item-label">
                  <slot></slot>
                </span>
              </a>
              <span aria-hidden="true" class="item-separator" part="separator">›</span>
            </li>
          </mock:shadow-root>
          Home
        </sg-breadcrumb-item>
      `);
    });

    it('renders active state', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item active>Active</sg-breadcrumb-item>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-breadcrumb-item active="" class="sg-breadcrumb-item--active">
          <mock:shadow-root>
            <li class="breadcrumb-item" part="item">
              <span aria-current="page" class="item-text" part="text">
                <slot name="icon"></slot>
                <span class="item-label">
                  <slot></slot>
                </span>
              </span>
              <span aria-hidden="true" class="item-separator" part="separator">›</span>
            </li>
          </mock:shadow-root>
          Active
        </sg-breadcrumb-item>
      `);
    });
  });

  describe('disabled state', () => {
    it('renders disabled state', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item disabled>Disabled</sg-breadcrumb-item>`,
      });
      expect(page.root.classList.contains('sg-breadcrumb-item--disabled')).toBe(true);
    });

    it('renders as text when disabled even with href', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/test" disabled>Disabled Link</sg-breadcrumb-item>`,
      });
      const link = page.root.shadowRoot.querySelector('a');
      const text = page.root.shadowRoot.querySelector('.item-text');
      expect(link).toBeNull();
      expect(text).not.toBeNull();
    });
  });

  describe('icon prop', () => {
    it('renders with icon prop', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item icon="home">Home</sg-breadcrumb-item>`,
      });
      const icon = page.root.shadowRoot.querySelector('.item-icon');
      expect(icon).not.toBeNull();
    });
  });

  describe('target prop', () => {
    it('uses default target _self', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/test">Link</sg-breadcrumb-item>`,
      });
      const link = page.root.shadowRoot.querySelector('a');
      expect(link.getAttribute('target')).toBe('_self');
    });

    it('supports custom target', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/test" target="_blank">External</sg-breadcrumb-item>`,
      });
      const link = page.root.shadowRoot.querySelector('a');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('adds rel="noopener noreferrer" for target="_blank"', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/test" target="_blank">External</sg-breadcrumb-item>`,
      });
      const link = page.root.shadowRoot.querySelector('a');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('does not add rel for default target', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/test">Link</sg-breadcrumb-item>`,
      });
      const link = page.root.shadowRoot.querySelector('a');
      expect(link.getAttribute('rel')).toBeNull();
    });
  });

  describe('active item behavior', () => {
    it('does not render link when active even with href', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item href="/test" active>Active Page</sg-breadcrumb-item>`,
      });
      const link = page.root.shadowRoot.querySelector('a');
      const text = page.root.shadowRoot.querySelector('.item-text');
      expect(link).toBeNull();
      expect(text).not.toBeNull();
    });

    it('adds aria-current="page" for active item', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item active>Active</sg-breadcrumb-item>`,
      });
      const text = page.root.shadowRoot.querySelector('.item-text');
      expect(text.getAttribute('aria-current')).toBe('page');
    });
  });

  describe('separator', () => {
    it('renders default separator', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
      });
      const separator = page.root.shadowRoot.querySelector('.item-separator');
      expect(separator).not.toBeNull();
      expect(separator.textContent).toBe('›');
    });

    it('hides separator when item is last', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
      });

      // Simulate being last item
      page.rootInstance.isLast = true;
      await page.waitForChanges();

      const separator = page.root.shadowRoot.querySelector('.item-separator');
      expect(separator).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('renders as li element', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
      });
      const li = page.root.shadowRoot.querySelector('li');
      expect(li).not.toBeNull();
    });

    it('has aria-hidden on separator', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
      });
      const separator = page.root.shadowRoot.querySelector('.item-separator');
      expect(separator.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('host classes', () => {
    it('applies active class when active', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item active>Item</sg-breadcrumb-item>`,
      });
      expect(page.root.classList.contains('sg-breadcrumb-item--active')).toBe(true);
    });

    it('applies active class when last item', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
      });

      page.rootInstance.isLast = true;
      await page.waitForChanges();

      expect(page.root.classList.contains('sg-breadcrumb-item--active')).toBe(true);
      expect(page.root.classList.contains('sg-breadcrumb-item--last')).toBe(true);
    });

    it('applies disabled class when disabled', async () => {
      const page = await newSpecPage({
        components: [SgBreadcrumbItem],
        html: `<sg-breadcrumb-item disabled>Item</sg-breadcrumb-item>`,
      });
      expect(page.root.classList.contains('sg-breadcrumb-item--disabled')).toBe(true);
    });
  });
});
