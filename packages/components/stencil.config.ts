import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'saged-ui-components',
  sourceMap: false,
  globalStyle: 'src/styles/tokens.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'styles/tokens.css', dest: 'styles/tokens.css' }],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: 'shell',
    collectCoverageFrom: ['src/components/**/*.{ts,tsx}', '!src/components/**/*.stories.ts', '!src/components/**/*.d.ts'],
    coverageReporters: ['text', 'lcov', 'html'],
    coverageDirectory: 'coverage',
  },
};
