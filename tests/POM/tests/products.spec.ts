import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

test.describe('Products tests', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('admin', 'admin123');
    productsPage = new ProductsPage(page);
  });

  test('Displaying products list', async () => {
    await expect(productsPage.productCards).toHaveCount(3);
  });

  test('Add product to cart', async () => {
    const initialCount = await productsPage.getCartCount();
    await productsPage.addProductToCart('Ноутбук Pro');
    await expect(productsPage.cartCount).toHaveText((initialCount + 1).toString());
  });

  test('Go to cart', async () => {
    await productsPage.addProductToCart('Ноутбук Pro');
    await productsPage.goToCart();
    await expect(productsPage.page).toHaveURL(/cart.html/);
  });
});
