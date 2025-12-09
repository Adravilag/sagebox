import { test, expect } from '@playwright/test';

test.describe('Event Editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page', async ({ page }) => {
    await expect(page).toHaveTitle(/Event Editor/);
    await expect(page.locator('.logo-text')).toContainText('Event Editor');
  });

  test('should show component list', async ({ page }) => {
    const componentList = page.locator('.component-list');
    await expect(componentList).toBeVisible();

    const buttonComponent = page.locator('[data-component="sg-button"]');
    await expect(buttonComponent).toBeVisible();
  });

  test('should select a component', async ({ page }) => {
    const buttonComponent = page.locator('[data-component="sg-button"]');
    await buttonComponent.click();

    await expect(buttonComponent).toHaveClass(/active/);

    // Check that event dropdown is populated
    const eventSelect = page.locator('#event-type');
    await expect(eventSelect).not.toBeDisabled();
  });

  test('should add a condition', async ({ page }) => {
    // Select a component first
    await page.locator('[data-component="sg-button"]').click();

    // Add condition
    const addConditionBtn = page.locator('#add-condition');
    await addConditionBtn.click();

    // Check condition was added
    const conditionItem = page.locator('.condition-item');
    await expect(conditionItem).toBeVisible();
  });

  test('should add an action', async ({ page }) => {
    // Select a component first
    await page.locator('[data-component="sg-button"]').click();

    // Add action
    const addActionBtn = page.locator('#add-action');
    await addActionBtn.click();

    // Check action was added
    const actionItem = page.locator('.action-item');
    await expect(actionItem).toBeVisible();
  });

  test('should generate code preview', async ({ page }) => {
    // Select component
    await page.locator('[data-component="sg-button"]').click();

    // Select event
    const eventSelect = page.locator('#event-type');
    await eventSelect.selectOption('sgClick');

    // Check code preview updated
    const codePreview = page.locator('#code-preview');
    await expect(codePreview).toContainText('addEventListener');
    await expect(codePreview).toContainText('sgClick');
  });

  test('should toggle event console', async ({ page }) => {
    const consoleBtn = page.locator('#console-btn');
    const eventConsole = page.locator('#event-console');

    // Initially hidden
    await expect(eventConsole).not.toHaveClass(/open/);

    // Click to open
    await consoleBtn.click();
    await expect(eventConsole).toHaveClass(/open/);

    // Click to close
    await consoleBtn.click();
    await expect(eventConsole).not.toHaveClass(/open/);
  });

  test('should save rule', async ({ page }) => {
    // Select component
    await page.locator('[data-component="sg-button"]').click();

    // Select event
    await page.locator('#event-type').selectOption('sgClick');

    // Enter rule name
    await page.locator('#rule-name').fill('Test Rule');

    // Add action
    await page.locator('#add-action').click();
    await page.locator('.action-type').selectOption('setAttribute');

    // Save rule
    await page.locator('#save-rule').click();

    // Check rule appears in list
    const ruleItem = page.locator('.rule-item');
    await expect(ruleItem).toBeVisible();
    await expect(ruleItem.locator('.rule-name')).toContainText('Test Rule');
  });

  test('should toggle rule enabled state', async ({ page }) => {
    // First create a rule
    await page.locator('[data-component="sg-button"]').click();
    await page.locator('#event-type').selectOption('sgClick');
    await page.locator('#rule-name').fill('Toggle Test');
    await page.locator('#add-action').click();
    await page.locator('#save-rule').click();

    // Toggle the rule
    const toggleBtn = page.locator('.rule-toggle').first();
    const ruleItem = page.locator('.rule-item').first();

    await toggleBtn.click();
    await expect(ruleItem).toHaveClass(/disabled/);

    await toggleBtn.click();
    await expect(ruleItem).not.toHaveClass(/disabled/);
  });
});
