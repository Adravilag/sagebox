import { newSpecPage } from '@stencil/core/testing';
import { SgOptionGroup } from './option-group';

describe('sg-option-group', () => {
  describe('rendering', () => {
    it('should render with required label prop', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Group A"></sg-option-group>`,
      });

      expect(page.root).not.toBeNull();
      expect(page.root!.tagName.toLowerCase()).toBe('sg-option-group');
      expect(page.rootInstance.label).toBe('Group A');
    });

    it('should be hidden by default (display: none)', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Test"></sg-option-group>`,
      });

      expect(page.root!.style.display).toBe('none');
    });

    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Group">
          <div>Child content</div>
        </sg-option-group>`,
      });

      expect(page.root!.innerHTML).toContain('Child content');
    });
  });

  describe('props', () => {
    it('should have disabled false by default', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Test"></sg-option-group>`,
      });

      expect(page.rootInstance.disabled).toBe(false);
    });

    it('should support disabled prop', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Test" disabled></sg-option-group>`,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });

    it('should support label with special characters', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Group A - Options (1-10)"></sg-option-group>`,
      });

      expect(page.rootInstance.label).toBe('Group A - Options (1-10)');
    });

    it('should support empty label', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label=""></sg-option-group>`,
      });

      expect(page.rootInstance.label).toBe('');
    });
  });

  describe('combination of props', () => {
    it('should support all props together', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Disabled Group" disabled></sg-option-group>`,
      });

      expect(page.rootInstance.label).toBe('Disabled Group');
      expect(page.rootInstance.disabled).toBe(true);
    });
  });

  describe('with nested options', () => {
    it('should render with nested option-like content', async () => {
      const page = await newSpecPage({
        components: [SgOptionGroup],
        html: `<sg-option-group label="Countries">
          <span data-value="us">United States</span>
          <span data-value="uk">United Kingdom</span>
        </sg-option-group>`,
      });

      expect(page.root!.innerHTML).toContain('United States');
      expect(page.root!.innerHTML).toContain('United Kingdom');
    });
  });
});
