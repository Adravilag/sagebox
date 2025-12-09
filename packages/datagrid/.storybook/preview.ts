import type { Preview } from '@storybook/html';
import { defineCustomElements } from '../loader';

// Register Stencil web components
defineCustomElements();

// Inject CSS tokens for Storybook (auto-generated from @sage-box/core)
const style = document.createElement('style');
style.textContent = `
  :root {
    --sg-color-neutral-0: var(--ui-color-neutral-0);
    --sg-color-neutral-50: var(--ui-color-neutral-50);
    --sg-color-neutral-100: var(--ui-color-neutral-100);
    --sg-color-neutral-200: var(--ui-color-neutral-200);
    --sg-color-neutral-300: var(--ui-color-neutral-300);
    --sg-color-neutral-400: var(--ui-color-neutral-400);
    --sg-color-neutral-500: var(--ui-color-neutral-500);
    --sg-color-neutral-600: var(--ui-color-neutral-600);
    --sg-color-neutral-700: var(--ui-color-neutral-700);
    --sg-color-neutral-800: var(--ui-color-neutral-800);
    --sg-color-neutral-900: var(--ui-color-neutral-900);
    --sg-color-neutral-950: var(--ui-color-neutral-950);
    --sg-color-primary-50: var(--ui-color-primary-50);
    --sg-color-primary-100: var(--ui-color-primary-100);
    --sg-color-primary-200: var(--ui-color-primary-200);
    --sg-color-primary-300: var(--ui-color-primary-300);
    --sg-color-primary-400: var(--ui-color-primary-400);
    --sg-color-primary-500: var(--ui-color-primary-500);
    --sg-color-primary-600: var(--ui-color-primary-600);
    --sg-color-primary-700: var(--ui-color-primary-700);
    --sg-color-primary-800: var(--ui-color-primary-800);
    --sg-color-primary-900: var(--ui-color-primary-900);
    --sg-color-success-50: var(--ui-color-success-50);
    --sg-color-success-100: var(--ui-color-success-100);
    --sg-color-success-500: var(--ui-color-success-500);
    --sg-color-success-600: var(--ui-color-success-600);
    --sg-color-success-700: var(--ui-color-success-700);
    --sg-color-warning-50: var(--ui-color-warning-50);
    --sg-color-warning-100: var(--ui-color-warning-100);
    --sg-color-warning-500: var(--ui-color-warning-500);
    --sg-color-warning-600: var(--ui-color-warning-600);
    --sg-color-warning-700: var(--ui-color-warning-700);
    --sg-color-error-50: var(--ui-color-error-50);
    --sg-color-error-100: var(--ui-color-error-100);
    --sg-color-error-500: var(--ui-color-error-500);
    --sg-color-error-600: var(--ui-color-error-600);
    --sg-color-error-700: var(--ui-color-error-700);
    --sg-color-surface: var(--ui-bg);
    --sg-color-surface-secondary: var(--ui-bg-secondary);
    --sg-color-surface-tertiary: var(--ui-bg-tertiary);
    --sg-color-surface-elevated: var(--ui-bg-elevated);
    --sg-color-surface-subtle: var(--ui-bg-secondary);
    --sg-color-surface-hover: var(--ui-bg-tertiary);
    --sg-color-overlay: var(--ui-bg-overlay);
    --sg-color-text: var(--ui-text);
    --sg-color-text-secondary: var(--ui-text-secondary);
    --sg-color-text-muted: var(--ui-text-muted);
    --sg-color-text-inverse: var(--ui-text-inverse);
    --sg-color-border: var(--ui-border);
    --sg-color-border-strong: var(--ui-border-strong);
    --sg-color-border-focus: var(--ui-border-focus);
    --sg-color-primary: var(--ui-accent);
    --sg-color-primary-hover: var(--ui-accent-hover);
    --sg-color-primary-active: var(--ui-accent-active);
    --sg-color-primary-subtle: var(--ui-accent-subtle);
    --sg-color-success: var(--ui-success);
    --sg-color-success-bg: var(--ui-success-bg);
    --sg-color-warning: var(--ui-warning);
    --sg-color-warning-bg: var(--ui-warning-bg);
    --sg-color-error: var(--ui-error);
    --sg-color-error-bg: var(--ui-error-bg);
    --sg-font-family: var(--ui-font-sans);
    --sg-font-family-mono: var(--ui-font-mono);
    --sg-font-family-serif: var(--ui-font-serif);
    --sg-font-size-xs: var(--ui-font-size-xs);
    --sg-font-size-sm: var(--ui-font-size-sm);
    --sg-font-size-md: var(--ui-font-size-base);
    --sg-font-size-lg: var(--ui-font-size-lg);
    --sg-font-size-xl: var(--ui-font-size-xl);
    --sg-font-size-2xl: var(--ui-font-size-2xl);
    --sg-font-size-3xl: var(--ui-font-size-3xl);
    --sg-font-size-4xl: var(--ui-font-size-4xl);
    --sg-font-weight-normal: var(--ui-font-weight-normal);
    --sg-font-weight-medium: var(--ui-font-weight-medium);
    --sg-font-weight-semibold: var(--ui-font-weight-semibold);
    --sg-font-weight-bold: var(--ui-font-weight-bold);
    --sg-line-height-tight: var(--ui-line-height-tight);
    --sg-line-height-normal: var(--ui-line-height-normal);
    --sg-line-height-relaxed: var(--ui-line-height-relaxed);
    --sg-space-0: var(--ui-space-0);
    --sg-space-1: var(--ui-space-1);
    --sg-space-2: var(--ui-space-2);
    --sg-space-3: var(--ui-space-3);
    --sg-space-4: var(--ui-space-4);
    --sg-space-5: var(--ui-space-5);
    --sg-space-6: var(--ui-space-6);
    --sg-space-8: var(--ui-space-8);
    --sg-space-10: var(--ui-space-10);
    --sg-space-12: var(--ui-space-12);
    --sg-space-16: var(--ui-space-16);
    --sg-space-xs: var(--ui-space-1);
    --sg-space-sm: var(--ui-space-2);
    --sg-space-md: var(--ui-space-4);
    --sg-space-lg: var(--ui-space-6);
    --sg-space-xl: var(--ui-space-8);
    --sg-radius-none: var(--ui-radius-none);
    --sg-radius-sm: var(--ui-radius-sm);
    --sg-radius-md: var(--ui-radius-md);
    --sg-radius-lg: var(--ui-radius-lg);
    --sg-radius-xl: var(--ui-radius-xl);
    --sg-radius-2xl: var(--ui-radius-2xl);
    --sg-radius-full: var(--ui-radius-full);
    --sg-shadow-xs: var(--ui-shadow-xs);
    --sg-shadow-sm: var(--ui-shadow-sm);
    --sg-shadow-md: var(--ui-shadow-md);
    --sg-shadow-lg: var(--ui-shadow-lg);
    --sg-shadow-xl: var(--ui-shadow-xl);
    --sg-shadow-inner: var(--ui-shadow-inner);
    --sg-ring-width: var(--ui-ring-width);
    --sg-ring-offset: var(--ui-ring-offset);
    --sg-ring-color: var(--ui-ring-color);
    --sg-focus-ring: var(--ui-border-focus);
    --sg-transition-fast: var(--ui-transition-fast);
    --sg-transition-normal: var(--ui-transition-normal);
    --sg-transition-slow: var(--ui-transition-slow);
    --sg-z-dropdown: var(--ui-z-dropdown);
    --sg-z-sticky: var(--ui-z-sticky);
    --sg-z-fixed: var(--ui-z-fixed);
    --sg-z-modal-backdrop: var(--ui-z-modal-backdrop);
    --sg-z-modal: var(--ui-z-modal);
    --sg-z-popover: var(--ui-z-popover);
    --sg-z-tooltip: var(--ui-z-tooltip);
    --sg-button-radius: var(--sg-radius-md);
    --sg-button-font-weight: var(--sg-font-weight-medium);
    --sg-button-transition: var(--sg-transition-fast);
    --sg-modal-radius: var(--sg-radius-lg);
    --sg-modal-shadow: var(--sg-shadow-xl);
    --sg-modal-backdrop: rgba(0, 0, 0, 0.5);
    --sg-modal-padding: var(--sg-space-6);
    --sg-input-radius: var(--sg-radius-md);
    --sg-input-border: var(--sg-color-border);
    --sg-input-focus-ring: var(--sg-focus-ring);
    --sg-card-radius: var(--sg-radius-lg);
    --sg-card-shadow: var(--sg-shadow-sm);
    --sg-card-padding: var(--sg-space-4);
    --sg-dropdown-radius: var(--sg-radius-md);
    --sg-dropdown-shadow: var(--sg-shadow-lg);
  }
  body {
    font-family: var(--sg-font-family, system-ui, sans-serif);
    margin: 0;
    padding: 1rem;
    background: var(--sg-color-surface, #ffffff);
    color: var(--sg-color-text, #1f2937);
  }
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};

export default preview;
