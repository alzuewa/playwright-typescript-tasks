const { test, expect } = require('@playwright/test');

test.describe('Test elements visibility with toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Basic element visibility test', async ({ page }) => {
    const visibleElement = page.locator('#always-visible');
    await expect(visibleElement).toBeVisible();
    await expect(visibleElement).toHaveText('Всегда видимый элемент');
  });

  test('Test for elements with different hiding strategies', async ({ page }) => {
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)

    await expect(page.locator('#toggle-display')).not.toBeVisible();
    await expect(page.locator('#toggle-visibility')).not.toBeVisible();
    await expect(page.locator('#toggle-opacity')).toBeVisible();

    await expect(page.locator('#toggle-display')).toHaveCSS('display', 'none');
    await expect(page.locator('#toggle-visibility')).toHaveCSS('visibility', 'hidden');
    await expect(page.locator('#toggle-opacity')).toHaveCSS('opacity', '0');
  });

  test('Test element visibility change', async ({ page }) => {
    await page.locator('#show-display').click();
    await expect(page.locator('#toggle-display')).toBeVisible();
    await expect(page.locator('#toggle-display')).toHaveCSS('display', 'block');

    await page.locator('#show-visibility').click();
    await expect(page.locator('#toggle-visibility')).toBeVisible();
    await expect(page.locator('#toggle-visibility')).toHaveCSS('visibility', 'visible');

    await page.locator('#show-opacity').click();
    await expect(page.locator('#toggle-opacity')).toBeVisible();
    await expect(page.locator('#toggle-opacity')).toHaveCSS('opacity', '1');
  });

  test('Test element load with delay', async ({ page }) => {
    await expect(page.locator('#delayed-element')).not.toBeVisible();
    await page.locator('#show-delayed').click();
    await expect(page.locator('#delayed-element')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('#delayed-element')).toHaveText('Элемент с задержкой появления');
  });
});
