import { test, expect } from '@playwright/test';

test.describe('Basic tests for getByAltText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyalttext');
  });

  test('Find image by exact alt-text', async ({ page }) => {
    const landscapeImage = page.getByAltText('Красивый пейзаж с горами и озером');
    await expect(landscapeImage).toBeVisible();
  });

  test('Find company logo', async ({ page }) => {
    const logo = page.getByAltText(/логотип компании/i);
    await expect(logo).toBeVisible();
    await expect(logo).toHaveJSProperty('width', 150);
  });
});

test.describe('Dynamic images tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyalttext');
  });

  test('Find dynamically loaded image', async ({ page }) => {
    const dynamicImage = page.getByAltText('Динамически загруженное изображение');
    await expect(dynamicImage).toBeVisible({ timeout: 2000 });
    await expect(dynamicImage).toHaveJSProperty('width', 250);
  });

  test('Find all the icons by partial alt-text', async ({ page }) => {
    const icons = page.getByAltText(/иконка/i);
    await expect(icons).toHaveCount(2);
    await expect(icons.first()).toBeVisible();
  });
});
