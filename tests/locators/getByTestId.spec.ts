import { test, expect } from '@playwright/test';

test.describe('Basic tests for getByTestId()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytestid');
  });

  test('Find page header', async ({ page }) => {
    const header = page.getByTestId('page-header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Практика локатора getByTestId()');
  });

  test('Find all "add to cart" buttons', async ({ page }) => {
    const addButtons = page.getByTestId('add-to-cart-btn');
    await expect(addButtons).toHaveCount(2);
    await expect(addButtons.first()).toHaveText('В корзину');
  });
});

test.describe('Tests for a form and products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytestid');
  });

  test('Check the product card', async ({ page }) => {
    const productCard = page.getByTestId('product-card-1');
    await expect(productCard).toBeVisible();

    const productName = productCard.getByTestId('product-name');
    await expect(productName).toHaveText('Ноутбук Pro');

    const productPrice = productCard.getByTestId('product-price');
    await expect(productPrice).toContainText(/99 999/);
  });

  test('Fill out the order form', async ({ page }) => {
    const form = page.getByTestId('order-form');
    await expect(form).toBeVisible();

    await form.getByTestId('name-input').fill('Tom Brown');
    await form.getByTestId('email-input').fill('test@example.com');

    const submitButton = form.getByTestId('submit-order-btn');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
  });
});

test.describe('Special cases for getByTestId()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytestid');
  });

  test('Check hidden element', async ({ page }) => {
    const hiddenElement = page.getByTestId('hidden-element');
    await expect(hiddenElement).toBeHidden();
    await expect(hiddenElement).toHaveText('Этот элемент скрыт');
  });

  test('Find dynamically added element', async ({ page }) => {
    const dynamicElement = page.getByTestId('dynamic-element');
    await expect(dynamicElement).toBeVisible({ timeout: 2000 });
    await expect(dynamicElement).toHaveText('Динамически добавленный элемент');
  });

  test('Check page footer', async ({ page }) => {
    const footer = page.getByTestId('page-footer');
    const copyright = footer.getByTestId('copyright-text');
    await expect(copyright).toContainText('2023');
  });
});
