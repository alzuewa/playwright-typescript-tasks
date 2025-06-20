import { test, expect } from '@playwright/test';

test.describe('Tests with beforeEach/afterEach for viewport', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.afterEach(async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
  });

  test('Check viewport size', async ({ page }) => {
    const viewport = page.viewportSize();
    expect(viewport).toEqual({ width: 1280, height: 720 });
  });
});

test.describe('Tests with hooks beforeEach/afterEach for cookies', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{ name: 'session', value: '12345', url: 'https://example.com' }]);
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('Test cookies', async ({ page }) => {
    await page.goto('https://example.com');
    const cookies = await page.context().cookies();
    expect(cookies).toContainEqual(expect.objectContaining({ name: 'session', value: '12345' }));
  });
});
