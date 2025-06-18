import { test, expect } from '@playwright/test';

test.describe('Advanced CSS-selectors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Combined search conditions', async ({ page }) => {
    const featuredSmartphone = page.locator(
      '.product-card.featured:has-text("Смартфон") .price-value',
    );

    await expect(featuredSmartphone).toHaveText('49 999');

    const submitButton = page.locator('#registration-form > .btn.submit-btn:not([disabled])');
    await expect(submitButton).toBeEnabled();
  });
});

test.describe('Dynamic content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Dynamic elements filtering', async ({ page }) => {
    const dynamicButton = page.locator(
      '#dynamic-content .btn.disabled:has-text("Недоступно"):not([type="submit"])',
    );
    await expect(dynamicButton).toBeVisible({ timeout: 2000 });

    const cheapProduct = page.locator(
      '#dynamic-content .product-card:not(.featured) .price-value:has-text("9")',
    );
    await expect(cheapProduct).toHaveText('9 999');
  });

  test('Combinations with :has and :not', async ({ page }) => {
    const availableProducts = page.locator(
      '.product-card:not(.sold-out):has(.btn:has-text("В корзину"))',
    );
    await expect(availableProducts).toHaveCount(2);

    const activeUserCells = page.locator(
      '#user-table tr:has(.status-active) td:not(:nth-child(3))',
    );
    await expect(activeUserCells).toHaveCount(3); // ID, Name, Status
  });
});
