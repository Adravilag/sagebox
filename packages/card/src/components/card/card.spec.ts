import { newSpecPage } from '@stencil/core/testing';
import { SgCard } from './card';

describe('sg-card', () => {
  describe('rendering', () => {
    it('renders', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card></sg-card>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-card class="sg-card--default sg-card--md" role="article" size="md" variant="default">
          <mock:shadow-root>
            <div class="card" part="card">
              <div class="card-media" part="media">
                <slot name="media"></slot>
              </div>
              <slot name="icon"></slot>
              <div class="card-body" part="body">
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sg-card>
      `);
    });

    it('renders with title and subtitle', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card card-title="Title" subtitle="Subtitle"></sg-card>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-card card-title="Title" class="sg-card--default sg-card--md" role="article" size="md" subtitle="Subtitle" variant="default">
          <mock:shadow-root>
            <div class="card" part="card">
              <div class="card-media" part="media">
                <slot name="media"></slot>
              </div>
              <slot name="icon"></slot>
              <div class="card-header" part="header">
                <slot name="header">
                  <h3 class="card-title" part="title">Title</h3>
                  <p class="card-subtitle" part="subtitle">Subtitle</p>
                </slot>
              </div>
              <div class="card-body" part="body">
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sg-card>
      `);
    });

    it('renders with variant', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card variant="primary"></sg-card>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-card class="sg-card--md sg-card--primary" role="article" size="md" variant="primary">
          <mock:shadow-root>
            <div class="card" part="card">
              <div class="card-media" part="media">
                <slot name="media"></slot>
              </div>
              <slot name="icon"></slot>
              <div class="card-body" part="body">
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sg-card>
      `);
    });

    it('renders with header badge', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card header="Featured" card-title="Title"></sg-card>`,
      });
      const headerBadge = page.root.shadowRoot.querySelector('.card-header-badge');
      expect(headerBadge).not.toBeNull();
      expect(headerBadge.textContent).toBe('Featured');
    });

    it('renders with only title (no subtitle)', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card card-title="Only Title"></sg-card>`,
      });
      const title = page.root.shadowRoot.querySelector('.card-title');
      const subtitle = page.root.shadowRoot.querySelector('.card-subtitle');
      expect(title).not.toBeNull();
      expect(subtitle).toBeNull();
    });
  });

  describe('variants', () => {
    it.each(['default', 'primary', 'success', 'warning', 'error', 'info', 'gradient', 'outlined'] as const)('renders with %s variant', async variant => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card variant="${variant}"></sg-card>`,
      });
      expect(page.root.classList.contains(`sg-card--${variant}`)).toBe(true);
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders with %s size', async size => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card size="${size}"></sg-card>`,
      });
      expect(page.root.classList.contains(`sg-card--${size}`)).toBe(true);
    });
  });

  describe('appearance props', () => {
    it('renders with flat style', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card flat></sg-card>`,
      });
      expect(page.root.classList.contains('sg-card--flat')).toBe(true);
    });

    it('renders with hoverable style', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card hoverable></sg-card>`,
      });
      expect(page.root.classList.contains('sg-card--hoverable')).toBe(true);
    });

    it('renders with clickable style', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable></sg-card>`,
      });
      expect(page.root.classList.contains('sg-card--clickable')).toBe(true);
      expect(page.root.getAttribute('role')).toBe('region');
      expect(page.root.getAttribute('tabindex')).toBe('0');
    });

    it('renders with disabled state', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card disabled></sg-card>`,
      });
      expect(page.root.classList.contains('sg-card--disabled')).toBe(true);
      expect(page.root.getAttribute('aria-disabled')).toBe('true');
    });

    it('renders with loading state', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card loading></sg-card>`,
      });
      expect(page.root.classList.contains('sg-card--loading')).toBe(true);
      const skeleton = page.root.shadowRoot.querySelector('.card-loading');
      expect(skeleton).not.toBeNull();
    });
  });

  describe('icon props', () => {
    it('renders with icon', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card icon="user"></sg-card>`,
      });
      const iconWrapper = page.root.shadowRoot.querySelector('.card-icon');
      expect(iconWrapper).not.toBeNull();
    });

    it('applies custom icon size', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card icon="user" icon-size="64"></sg-card>`,
      });
      // HTML attributes are strings, so iconSize is "64" not 64
      expect(page.rootInstance.iconSize).toBe('64');
    });

    it('applies custom icon color', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card icon="user" icon-color="#ff0000"></sg-card>`,
      });
      expect(page.rootInstance.iconColor).toBe('#ff0000');
    });
  });

  describe('action props', () => {
    it('renders with action button', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card action-label="Click me"></sg-card>`,
      });
      const footer = page.root.shadowRoot.querySelector('.card-footer');
      const button = page.root.shadowRoot.querySelector('.card-action');
      expect(footer).not.toBeNull();
      expect(button).not.toBeNull();
      expect(button.textContent).toBe('Click me');
    });

    it('renders action button with custom variant', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card action-label="Click" action-variant="secondary"></sg-card>`,
      });
      const button = page.root.shadowRoot.querySelector('.card-action');
      expect(button.classList.contains('card-action--secondary')).toBe(true);
    });

    it('renders action button with ghost variant', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card action-label="Click" action-variant="ghost"></sg-card>`,
      });
      const button = page.root.shadowRoot.querySelector('.card-action');
      expect(button.classList.contains('card-action--ghost')).toBe(true);
    });
  });

  describe('events', () => {
    it('emits sgClick event when clicked and clickable', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable></sg-card>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      page.root.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not emit sgClick when disabled', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable disabled></sg-card>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      page.root.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('does not emit sgClick when loading', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable loading></sg-card>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      page.root.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('emits sgAction event when action button is clicked', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card action-label="Action"></sg-card>`,
      });
      const actionSpy = jest.fn();
      page.root.addEventListener('sgAction', actionSpy);

      const button = page.root.shadowRoot.querySelector('.card-action') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      expect(actionSpy).toHaveBeenCalled();
    });

    it('does not emit sgAction when disabled', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card action-label="Action" disabled></sg-card>`,
      });
      const actionSpy = jest.fn();
      page.root.addEventListener('sgAction', actionSpy);

      const button = page.root.shadowRoot.querySelector('.card-action') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      expect(actionSpy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('handles Enter key when clickable', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable></sg-card>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('handles Space key when clickable', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable></sg-card>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const event = new KeyboardEvent('keydown', { key: ' ' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not respond to keyboard when disabled', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable disabled></sg-card>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('href navigation', () => {
    it('renders as clickable when href is provided', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card href="https://example.com"></sg-card>`,
      });
      expect(page.root.classList.contains('sg-card--clickable')).toBe(true);
      expect(page.root.getAttribute('role')).toBe('region');
    });

    it('supports target prop', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card href="https://example.com" target="_blank"></sg-card>`,
      });
      expect(page.rootInstance.target).toBe('_blank');
    });

    it('navigates to href on click', async () => {
      const mockOpen = jest.fn();
      const originalOpen = globalThis.open;
      globalThis.open = mockOpen;

      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card href="https://example.com" target="_blank"></sg-card>`,
      });

      page.root.click();
      await page.waitForChanges();

      expect(mockOpen).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');

      globalThis.open = originalOpen;
    });

    it('navigates to href with default target', async () => {
      const originalLocation = globalThis.location;
      delete (globalThis as any).location;
      globalThis.location = { href: '' } as any;

      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card href="https://example.com"></sg-card>`,
      });

      page.root.click();
      await page.waitForChanges();

      expect(globalThis.location.href).toBe('https://example.com');

      globalThis.location = originalLocation;
    });
  });

  describe('accessibility', () => {
    it('has role="article" by default', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card></sg-card>`,
      });
      expect(page.root.getAttribute('role')).toBe('article');
    });

    it('has role="region" when interactive', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable></sg-card>`,
      });
      expect(page.root.getAttribute('role')).toBe('region');
    });

    it('has no tabindex when not interactive', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card></sg-card>`,
      });
      expect(page.root.getAttribute('tabindex')).toBeNull();
    });

    it('has tabindex="0" when clickable', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable></sg-card>`,
      });
      expect(page.root.getAttribute('tabindex')).toBe('0');
    });

    it('has no tabindex when disabled but clickable', async () => {
      const page = await newSpecPage({
        components: [SgCard],
        html: `<sg-card clickable disabled></sg-card>`,
      });
      expect(page.root.getAttribute('tabindex')).toBeNull();
    });
  });
});
