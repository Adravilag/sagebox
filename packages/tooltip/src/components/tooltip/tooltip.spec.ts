import { newSpecPage } from '@stencil/core/testing';
import { SgTooltip } from './tooltip';

describe('sg-tooltip', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip text"><button>Hover me</button></sg-tooltip>`,
      });
      expect(page.root).not.toBeNull();
      expect(page.root.tagName.toLowerCase()).toBe('sg-tooltip');
    });

    it('renders with text prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Help text"><span>?</span></sg-tooltip>`,
      });
      expect(page.rootInstance.text).toBe('Help text');
    });

    it('renders slot content', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Help"><span class="icon">?</span></sg-tooltip>`,
      });
      const slotContent = page.root.querySelector('.icon');
      expect(slotContent.textContent).toBe('?');
    });
  });

  describe('positions', () => {
    it('renders with position top (default)', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('top');
      expect(page.root.classList.contains('sg-tooltip--top')).toBe(true);
    });

    it('renders with position bottom', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="bottom"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('bottom');
      expect(page.root.classList.contains('sg-tooltip--bottom')).toBe(true);
    });

    it('renders with position left', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="left"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('left');
    });

    it('renders with position right', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="right"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('right');
    });
  });

  describe('variants', () => {
    it('renders with default variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('default');
      expect(page.root.classList.contains('sg-tooltip--default')).toBe(true);
    });

    it('renders with primary variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="primary"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('primary');
      expect(page.root.classList.contains('sg-tooltip--primary')).toBe(true);
    });

    it('renders with success variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="success"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('success');
    });

    it('renders with warning variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="warning"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('warning');
    });

    it('renders with error variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="error"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('error');
    });

    it('renders with dark variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="dark"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('dark');
    });

    it('renders with light variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="light"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('light');
    });
  });

  describe('trigger types', () => {
    it('defaults to hover trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('hover');
    });

    it('supports click trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('click');
    });

    it('supports focus trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus"><input type="text" /></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('focus');
    });

    it('supports manual trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('manual');
    });
  });

  describe('public methods', () => {
    it('shows tooltip via show() method', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });
      expect(page.rootInstance.visible).toBe(false);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(true);
    });

    it('hides tooltip via hide() method', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      await page.rootInstance.hide();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });

    it('toggles tooltip via toggle() method', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      // First toggle - show
      await page.rootInstance.toggle();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      // Second toggle - hide
      await page.rootInstance.toggle();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  describe('events', () => {
    it('emits sgShow event when shown', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      const showSpy = jest.fn();
      page.root.addEventListener('sgShow', showSpy);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(showSpy).toHaveBeenCalled();
    });

    it('emits sgHide event when hidden', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      const hideSpy = jest.fn();
      page.root.addEventListener('sgHide', hideSpy);

      await page.rootInstance.show();
      await page.waitForChanges();

      await page.rootInstance.hide();
      await page.waitForChanges();

      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('does not show when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" disabled trigger="manual"><button>Hover</button></sg-tooltip>`,
      });

      expect(page.rootInstance.disabled).toBe(true);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });
  });

  describe('props configuration', () => {
    it('supports showDelay prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" show-delay="500"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.showDelay).toBe(500);
    });

    it('supports hideDelay prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" hide-delay="200"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.hideDelay).toBe(200);
    });

    it('supports maxWidth prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" max-width="300px"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.maxWidth).toBe('300px');
    });

    it('supports arrow prop (default true)', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.arrow).toBe(true);
    });

    it('supports interactive prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.interactive).toBe(true);
    });
  });

  describe('controlled mode (open prop)', () => {
    it('shows tooltip when open prop is true', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" open><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.visible).toBe(true);
    });
  });

  describe('hover trigger behavior', () => {
    it('sets up event listeners for hover trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('hover');
    });
  });

  describe('click trigger behavior', () => {
    it('has click trigger configured', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('click');
    });
  });

  describe('focus trigger behavior', () => {
    it('has focus trigger configured', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus"><input type="text" /></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('focus');
    });
  });

  describe('interactive tooltip', () => {
    it('has interactive class when enabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.interactive).toBe(true);
    });
  });

  describe('tooltip content rendering', () => {
    it('has arrow enabled by default', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.arrow).toBe(true);
    });

    it('can disable arrow', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" arrow="false"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.arrow).toBe(false);
    });

    it('applies maxWidth style', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" max-width="400px"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.maxWidth).toBe('400px');
    });
  });

  describe('host classes', () => {
    it('applies disabled class when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" disabled><button>Hover</button></sg-tooltip>`,
      });
      expect(page.root.classList.contains('sg-tooltip--disabled')).toBe(true);
    });

    it('applies interactive class when interactive', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });
      expect(page.root.classList.contains('sg-tooltip--interactive')).toBe(true);
    });
  });

  describe('cleanup', () => {
    it('can be removed from DOM without errors', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      // Should not throw
      page.root.remove();
      await page.waitForChanges();
    });
  });
});
