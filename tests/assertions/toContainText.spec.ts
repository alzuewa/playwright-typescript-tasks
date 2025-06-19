import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tocontaintext');
});

test('Test static text', async ({ page }) => {
  const staticText = page.locator('#static-text');
  await expect(staticText).toContainText('static text block');
  await expect(staticText).toContainText('important information');
  await expect(staticText).not.toContainText('dynamic content');
});

test('Test dynamically changing text', async ({ page }) => {
  const dynamicText = page.locator('#dynamic-text');
  await expect(dynamicText).toContainText('Initial dynamic text');

  await page.locator('#change-text').click();
  await expect(dynamicText).toContainText('Text was changed at');

  await page.locator('#add-part').click();
  await expect(dynamicText).toContainText('(additional part)');
});

test('Test elements list', async ({ page }) => {
  const itemList = page.locator('#item-list');
  await expect(itemList).toContainText('Item 1: Basic');
  await expect(itemList).toContainText('Intermediate');

  await page.locator('#add-item').click();
  await expect(itemList).toContainText('New added item');
});

test('Test hidden/displayed text', async ({ page }) => {
  const hiddenContent = page.locator('#hidden-content');
  await expect(hiddenContent).not.toBeVisible();

  await page.locator('#toggle-text').click();
  await expect(hiddenContent).toBeVisible();
  await expect(hiddenContent).toContainText('special content');
  await expect(hiddenContent).toContainText('hidden but now is visible');
});

test('Test partial match in long text', async ({ page }) => {
  const partialText = page.locator('#partial-text');
  await expect(partialText).toContainText('quick brown fox');
  await expect(partialText).toContainText('lazy dog');
  await expect(partialText).toContainText('all letters of the English alphabet');
  await expect(partialText).not.toContainText('all letters of the Russian alphabet');
});
