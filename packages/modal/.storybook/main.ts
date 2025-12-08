import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import type { StorybookConfig } from '@storybook/html-vite';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {},
  },
  staticDirs: ['../dist'],
  async viteFinal(config) {
    return config;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
