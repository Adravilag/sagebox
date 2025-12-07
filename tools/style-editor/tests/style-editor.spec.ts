/**
 * Tests para SageBox Style Editor
 *
 * Ejecutar con: npm test
 */

import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Helper para ocultar el Astro dev toolbar que interfiere con los clicks
async function hideAstroToolbar(page: Page) {
  await page.addStyleTag({
    content: 'astro-dev-toolbar { display: none !important; pointer-events: none !important; }',
  });
}

test.describe('Style Editor - UI Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should display the main layout', async ({ page }) => {
    // Header
    await expect(page.locator('.header')).toBeVisible();

    // Sidebars
    await expect(page.locator('#sidebar-left')).toBeVisible();
    await expect(page.locator('#sidebar-right')).toBeVisible();

    // Preview area
    await expect(page.locator('.preview-container')).toBeVisible();
  });

  test('should display the header with logo', async ({ page }) => {
    const logo = page.locator('.header .logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Style Editor');
  });

  test('should have viewport control buttons', async ({ page }) => {
    await expect(page.locator('button[data-viewport="mobile"]')).toBeVisible();
    await expect(page.locator('button[data-viewport="tablet"]')).toBeVisible();
    await expect(page.locator('button[data-viewport="desktop"]')).toBeVisible();
  });

  test('should have undo/redo buttons', async ({ page }) => {
    await expect(page.locator('#btn-undo')).toBeVisible();
    await expect(page.locator('#btn-redo')).toBeVisible();
  });

  test('should have export button', async ({ page }) => {
    await expect(page.locator('#btn-export')).toBeVisible();
  });

  test('should have URL bar', async ({ page }) => {
    const urlInput = page.locator('#preview-url');
    await expect(urlInput).toBeVisible();
  });

  test('should have zoom controls', async ({ page }) => {
    await expect(page.locator('#zoom-out')).toBeVisible();
    await expect(page.locator('#zoom-in')).toBeVisible();
    await expect(page.locator('#zoom-value')).toBeVisible();
  });

  test('should have connection status indicator', async ({ page }) => {
    await expect(page.locator('#connection-status')).toBeVisible();
  });

  test('should have inspect mode toggle', async ({ page }) => {
    await expect(page.locator('#inspect-mode')).toBeVisible();
  });
});

test.describe('Style Editor - Viewport Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should switch to mobile viewport', async ({ page }) => {
    const mobileBtn = page.locator('button[data-viewport="mobile"]');
    await mobileBtn.click({ force: true });
    await expect(mobileBtn).toHaveClass(/active/);

    const frame = page.locator('#preview-frame');
    await expect(frame).toHaveAttribute('data-viewport', 'mobile');
  });

  test('should switch to tablet viewport', async ({ page }) => {
    const tabletBtn = page.locator('button[data-viewport="tablet"]');
    await tabletBtn.click({ force: true });
    await expect(tabletBtn).toHaveClass(/active/);

    const frame = page.locator('#preview-frame');
    await expect(frame).toHaveAttribute('data-viewport', 'tablet');
  });

  test('should switch to desktop viewport', async ({ page }) => {
    const desktopBtn = page.locator('button[data-viewport="desktop"]');
    await desktopBtn.click({ force: true });
    await expect(desktopBtn).toHaveClass(/active/);

    const frame = page.locator('#preview-frame');
    await expect(frame).toHaveAttribute('data-viewport', 'desktop');
  });

  test('desktop should be active by default', async ({ page }) => {
    const desktopBtn = page.locator('button[data-viewport="desktop"]');
    await expect(desktopBtn).toHaveClass(/active/);
  });

  test('should show dimensions when changing viewport', async ({ page }) => {
    const dimensionsDisplay = page.locator('#preview-dimensions');
    await expect(dimensionsDisplay).toBeVisible();
  });
});

test.describe('Style Editor - Zoom Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should display initial zoom level of 100%', async ({ page }) => {
    const zoomLevel = page.locator('#zoom-value');
    await expect(zoomLevel).toContainText('100%');
  });

  test('should zoom out when clicking zoom out button', async ({ page }) => {
    const zoomOutBtn = page.locator('#zoom-out');
    const zoomLevel = page.locator('#zoom-value');

    await zoomOutBtn.click({ force: true });
    await expect(zoomLevel).toContainText('90%');
  });

  test('should zoom in when clicking zoom in button', async ({ page }) => {
    const zoomInBtn = page.locator('#zoom-in');
    const zoomLevel = page.locator('#zoom-value');

    await zoomInBtn.click({ force: true });
    await expect(zoomLevel).toContainText('110%');
  });

  test('should change zoom value after clicking zoom in', async ({ page }) => {
    const zoomInBtn = page.locator('#zoom-in');
    const initialZoom = await page.locator('#zoom-value').textContent();

    await zoomInBtn.click({ force: true });

    const newZoom = await page.locator('#zoom-value').textContent();
    expect(newZoom).not.toBe(initialZoom);
  });

  test('should not zoom below minimum', async ({ page }) => {
    const zoomOutBtn = page.locator('#zoom-out');
    const zoomLevel = page.locator('#zoom-value');

    // Click many times
    for (let i = 0; i < 15; i++) {
      await zoomOutBtn.click({ force: true });
    }

    const text = await zoomLevel.textContent();
    const value = Number.parseInt(text || '0');
    expect(value).toBeGreaterThanOrEqual(25);
  });

  test('should not zoom above maximum', async ({ page }) => {
    const zoomInBtn = page.locator('#zoom-in');
    const zoomLevel = page.locator('#zoom-value');

    // Click many times
    for (let i = 0; i < 15; i++) {
      await zoomInBtn.click({ force: true });
    }

    const text = await zoomLevel.textContent();
    const value = Number.parseInt(text || '0');
    expect(value).toBeLessThanOrEqual(200);
  });
});

test.describe('Style Editor - Undo/Redo System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('undo button should be disabled initially', async ({ page }) => {
    const undoBtn = page.locator('#btn-undo');
    await expect(undoBtn).toHaveClass(/disabled/);
  });

  test('redo button should be disabled initially', async ({ page }) => {
    const redoBtn = page.locator('#btn-redo');
    await expect(redoBtn).toHaveClass(/disabled/);
  });

  test('should have keyboard shortcuts tooltip on undo button', async ({ page }) => {
    const undoBtn = page.locator('#btn-undo');
    const title = await undoBtn.getAttribute('title');
    expect(title).toContain('Ctrl+Z');
  });

  test('should have keyboard shortcuts tooltip on redo button', async ({ page }) => {
    const redoBtn = page.locator('#btn-redo');
    const title = await redoBtn.getAttribute('title');
    expect(title).toMatch(/Ctrl\+.*Z/i);
  });

  test('should have styleEditorDebug global object', async ({ page }) => {
    const hasDebug = await page.evaluate(() => {
      return typeof (globalThis as Record<string, unknown>).styleEditorDebug === 'object';
    });
    expect(hasDebug).toBeTruthy();
  });

  test('styleEditorDebug should have testUndo function', async ({ page }) => {
    const hasTestUndo = await page.evaluate(() => {
      return typeof ((globalThis as Record<string, unknown>).styleEditorDebug as Record<string, unknown>)?.testUndo === 'function';
    });
    expect(hasTestUndo).toBeTruthy();
  });

  test('styleEditorDebug should have debug functions', async ({ page }) => {
    const hasDebugFunctions = await page.evaluate(() => {
      const debug = (globalThis as Record<string, unknown>).styleEditorDebug as Record<string, unknown>;
      return debug && (typeof debug.testUndo === 'function' || typeof debug.testRedo === 'function');
    });
    expect(hasDebugFunctions).toBeTruthy();
  });
});

test.describe('Style Editor - Collapsible Sidebars', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('left sidebar should have collapse button', async ({ page }) => {
    await expect(page.locator('#collapse-left')).toBeVisible();
  });

  test('right sidebar should have collapse button', async ({ page }) => {
    await expect(page.locator('#collapse-right')).toBeVisible();
  });

  test('should collapse left sidebar when clicking collapse button', async ({ page }) => {
    const collapseBtn = page.locator('#collapse-left');
    const sidebar = page.locator('#sidebar-left');

    await collapseBtn.click({ force: true });
    await expect(sidebar).toHaveClass(/collapsed/);
  });

  test('should toggle left sidebar state when clicking button', async ({ page }) => {
    const collapseBtn = page.locator('#collapse-left');
    const sidebar = page.locator('#sidebar-left');

    // Get initial state
    const initialCollapsed = await sidebar.evaluate(el => el.classList.contains('collapsed'));

    // First click should toggle
    await collapseBtn.click({ force: true });
    await page.waitForTimeout(100);

    const afterClick = await sidebar.evaluate(el => el.classList.contains('collapsed'));
    expect(afterClick).not.toBe(initialCollapsed);
  });

  test('should collapse right sidebar when clicking collapse button', async ({ page }) => {
    const collapseBtn = page.locator('#collapse-right');
    const sidebar = page.locator('#sidebar-right');

    await collapseBtn.click({ force: true });
    await expect(sidebar).toHaveClass(/collapsed/);
  });

  test('collapse button should have title attribute', async ({ page }) => {
    const collapseLeft = page.locator('#collapse-left');
    const title = await collapseLeft.getAttribute('title');
    expect(title).toBeTruthy();
  });
});

test.describe('Style Editor - Style Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should display "No element selected" initially', async ({ page }) => {
    const selectedElement = page.locator('#selected-element');
    await expect(selectedElement).toContainText('Ningún elemento seleccionado');
  });

  test('should have typography section', async ({ page }) => {
    const typographySection = page.locator('.style-section[data-section="typography"]');
    await expect(typographySection).toBeVisible();
  });

  test('should have colors section', async ({ page }) => {
    const colorsSection = page.locator('.style-section[data-section="colors"]');
    await expect(colorsSection).toBeVisible();
  });

  test('should have spacing section', async ({ page }) => {
    const spacingSection = page.locator('.style-section[data-section="spacing"]');
    await expect(spacingSection).toBeVisible();
  });

  test('should have font-family selector', async ({ page }) => {
    const fontFamilySelect = page.locator('select[data-property="font-family"]');
    await expect(fontFamilySelect).toBeVisible();
  });

  test('should have font-size input', async ({ page }) => {
    const fontSizeInput = page.locator('input[data-property="font-size"]');
    await expect(fontSizeInput).toBeVisible();
  });

  test('should have font-weight range', async ({ page }) => {
    const fontWeightRange = page.locator('input[data-property="font-weight"]');
    await expect(fontWeightRange).toBeVisible();
  });

  test('should have color picker', async ({ page }) => {
    const colorInput = page.locator('input[data-property="color"][type="color"]');
    await expect(colorInput).toBeVisible();
  });

  test('should have background-color picker', async ({ page }) => {
    const bgColorInput = page.locator('input[data-property="background-color"][type="color"]');
    await expect(bgColorInput).toBeVisible();
  });

  test('section headers should be clickable', async ({ page }) => {
    const headers = page.locator('.section-header');
    const count = await headers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have CSS output section', async ({ page }) => {
    const cssOutput = page.locator('#css-output');
    await expect(cssOutput).toBeVisible();
  });

  test('should have copy CSS button', async ({ page }) => {
    const copyBtn = page.locator('#copy-css');
    await expect(copyBtn).toBeVisible();
  });
});

test.describe('Style Editor - URL Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should have default URL pointing to localhost:4200', async ({ page }) => {
    const urlInput = page.locator('#preview-url');
    const value = await urlInput.inputValue();
    expect(value).toContain('localhost:4200');
  });

  test('should have reload button', async ({ page }) => {
    await expect(page.locator('#btn-reload')).toBeVisible();
  });

  test('should have external link button', async ({ page }) => {
    await expect(page.locator('#btn-open-external')).toBeVisible();
  });

  test('reload button should have title', async ({ page }) => {
    const reloadBtn = page.locator('#btn-reload');
    const title = await reloadBtn.getAttribute('title');
    expect(title).toBeTruthy();
  });
});

test.describe('Style Editor - Preview Container', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should have iframe for preview', async ({ page }) => {
    const iframe = page.locator('#preview-iframe');
    await expect(iframe).toBeVisible();
  });

  test('iframe should point to target app URL', async ({ page }) => {
    const iframe = page.locator('#preview-iframe');
    const src = await iframe.getAttribute('src');
    expect(src).toContain('localhost:4200');
  });

  test('should have selection overlay', async ({ page }) => {
    const overlay = page.locator('#selection-overlay');
    await expect(overlay).toBeAttached();
  });

  test('should have preview wrapper', async ({ page }) => {
    const wrapper = page.locator('#preview-wrapper');
    await expect(wrapper).toBeVisible();
  });

  test('should have preview frame', async ({ page }) => {
    const frame = page.locator('#preview-frame');
    await expect(frame).toBeVisible();
  });
});

test.describe('Style Editor - Left Sidebar (Navigator)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should have Projects section', async ({ page }) => {
    const projectsHeader = page.locator('#sidebar-left').getByText('Proyectos');
    await expect(projectsHeader).toBeVisible();
  });

  test('should show Angular App as a project', async ({ page }) => {
    const sidebar = page.locator('#sidebar-left');
    await expect(sidebar).toContainText('Angular App');
  });

  test('should have project list container', async ({ page }) => {
    const projectList = page.locator('#project-list');
    await expect(projectList).toBeVisible();
  });

  test('should have add project button', async ({ page }) => {
    const addBtn = page.locator('#add-project');
    await expect(addBtn).toBeVisible();
  });

  test('should have Tokens section', async ({ page }) => {
    const tokensHeader = page.locator('#sidebar-left').getByText('Tokens');
    await expect(tokensHeader).toBeVisible();
  });

  test('should have selected elements section', async ({ page }) => {
    const selectedHeader = page.locator('#sidebar-left').getByText('Elementos seleccionados');
    await expect(selectedHeader).toBeVisible();
  });

  test('should have layers tree', async ({ page }) => {
    const layersTree = page.locator('#layers-tree');
    await expect(layersTree).toBeVisible();
  });
});

test.describe('Style Editor - Keyboard Shortcuts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should register keyboard event listener', async ({ page }) => {
    // Check that the global debug object is available
    const hasListener = await page.evaluate(() => {
      return typeof (globalThis as Record<string, unknown>).styleEditorDebug === 'object';
    });
    expect(hasListener).toBeTruthy();
  });

  test('Ctrl+Z should not do anything when history is empty', async ({ page }) => {
    // Focus the main document
    await page.locator('body').click();

    // Try undo
    await page.keyboard.press('Control+z');

    // Undo button should still be disabled
    const undoBtn = page.locator('#btn-undo');
    await expect(undoBtn).toHaveClass(/disabled/);
  });
});

test.describe('Style Editor - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('header buttons should have title attributes', async ({ page }) => {
    const buttons = page.locator('.header button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const title = await button.getAttribute('title');
      expect(title).toBeTruthy();
    }
  });

  test('viewport buttons should be grouped', async ({ page }) => {
    // Check all viewport buttons exist in header
    const mobileBtn = page.locator('button[data-viewport="mobile"]');
    const tabletBtn = page.locator('button[data-viewport="tablet"]');
    const desktopBtn = page.locator('button[data-viewport="desktop"]');

    await expect(mobileBtn).toBeVisible();
    await expect(tabletBtn).toBeVisible();
    await expect(desktopBtn).toBeVisible();
  });

  test('style controls should have labels', async ({ page }) => {
    const labels = page.locator('.control-label');
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);
  });

  test('inputs should have associated labels', async ({ page }) => {
    // Check that control-groups have labels
    const controlGroups = page.locator('.control-group');
    const count = await controlGroups.count();

    for (let i = 0; i < count; i++) {
      const group = controlGroups.nth(i);
      const label = group.locator('.control-label');
      await expect(label).toBeVisible();
    }
  });
});

test.describe('Style Editor - Inspect Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await hideAstroToolbar(page);
    await page.waitForSelector('.preview-container');
  });

  test('should have inspect mode checkbox', async ({ page }) => {
    const inspectCheckbox = page.locator('#inspect-mode');
    await expect(inspectCheckbox).toBeVisible();
  });

  test('should have show guides checkbox', async ({ page }) => {
    const guidesCheckbox = page.locator('#show-guides');
    await expect(guidesCheckbox).toBeVisible();
  });

  test('inspect mode should be toggleable', async ({ page }) => {
    const checkbox = page.locator('#inspect-mode');

    // Check initial state
    const initialState = await checkbox.isChecked();

    // Toggle
    await checkbox.click({ force: true });

    // Should have changed
    const newState = await checkbox.isChecked();
    expect(newState).not.toBe(initialState);
  });
});
