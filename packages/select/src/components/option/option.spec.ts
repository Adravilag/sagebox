import { newSpecPage } from '@stencil/core/testing';
import { SgOption } from './option';

describe('sg-option', () => {
  describe('rendering', () => {
    it('should render with required value prop', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test">Test Option</sg-option>`,
      });

      expect(page.root).not.toBeNull();
      expect(page.root!.tagName.toLowerCase()).toBe('sg-option');
      expect(page.rootInstance.value).toBe('test');
    });

    it('should be hidden by default (display: none)', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test">Test</sg-option>`,
      });

      expect(page.root!.style.display).toBe('none');
    });

    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test">My Label</sg-option>`,
      });

      expect(page.root!.textContent).toBe('My Label');
    });
  });

  describe('props', () => {
    it('should have disabled false by default', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test">Test</sg-option>`,
      });

      expect(page.rootInstance.disabled).toBe(false);
    });

    it('should support disabled prop', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test" disabled>Test</sg-option>`,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });

    it('should support icon prop', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test" icon="mdi:star">Test</sg-option>`,
      });

      expect(page.rootInstance.icon).toBe('mdi:star');
    });

    it('should have undefined icon by default', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test">Test</sg-option>`,
      });

      expect(page.rootInstance.icon).toBeUndefined();
    });

    it('should support description prop', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test" description="A helpful description">Test</sg-option>`,
      });

      expect(page.rootInstance.description).toBe('A helpful description');
    });

    it('should have undefined description by default', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test">Test</sg-option>`,
      });

      expect(page.rootInstance.description).toBeUndefined();
    });
  });

  describe('different values', () => {
    it('should handle numeric string values', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="123">Number Option</sg-option>`,
      });

      expect(page.rootInstance.value).toBe('123');
    });

    it('should handle empty string value', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="">Empty Value</sg-option>`,
      });

      expect(page.rootInstance.value).toBe('');
    });

    it('should handle special characters in value', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="test-value_123">Special Chars</sg-option>`,
      });

      expect(page.rootInstance.value).toBe('test-value_123');
    });
  });

  describe('combination of props', () => {
    it('should support all props together', async () => {
      const page = await newSpecPage({
        components: [SgOption],
        html: `<sg-option value="full" disabled icon="mdi:check" description="Full option">Full Option</sg-option>`,
      });

      expect(page.rootInstance.value).toBe('full');
      expect(page.rootInstance.disabled).toBe(true);
      expect(page.rootInstance.icon).toBe('mdi:check');
      expect(page.rootInstance.description).toBe('Full option');
    });
  });
});
