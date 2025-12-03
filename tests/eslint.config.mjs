// ESLint config for Playwright E2E tests
// These tests run in browser context where `window` is appropriate
export default [
  {
    files: ['**/*.spec.ts'],
    rules: {
      // In browser context (Playwright), window is the correct global
      'unicorn/prefer-global-this': 'off',
      // page.evaluate callbacks need `any` for cross-context communication
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
