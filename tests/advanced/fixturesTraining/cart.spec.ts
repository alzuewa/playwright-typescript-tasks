import { test as base, expect, Page } from '@playwright/test';

interface CartFixtures {
  preloadedCart: Page;
}

export const test = base.extend<CartFixtures>({
  preloadedCart: async ({ page }, use) => {
    await page.goto('https://osstep.github.io/fixture_cart');
    await page.locator('#add-sample').click();

    await use(page);
  },
});

test('Cart contains sample items', async ({ preloadedCart }) => {
  await expect(preloadedCart.locator('.empty-cart')).not.toBeVisible();
  await expect(preloadedCart.locator('.cart-item')).toHaveCount(2);
  await expect(preloadedCart.locator('text=Wireless Headphones')).toBeVisible();
  await expect(preloadedCart.locator('text=Smart Watch')).toBeVisible();
});
