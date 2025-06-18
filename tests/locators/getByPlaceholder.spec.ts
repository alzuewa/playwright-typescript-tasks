import { test, expect } from '@playwright/test';

test.describe('Basic tests for getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  test('Find a field by placeholder and fill it out', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Введите ваше имя');
    await nameInput.fill('Tom Brown');
    await expect(nameInput).toHaveValue('Tom Brown');
  });

  test('Find a field by placeholder partial text', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/example@/);
    await expect(emailInput).toHaveAttribute('type', 'email');
  });
});

test.describe('Other cases for getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  test('Find textarea by multiline placeholder', async ({ page }) => {
    const textarea = page.getByPlaceholder('Введите ваш комментарий здесь...');
    await expect(textarea).toBeVisible();
  });

  test('Find a field with spaces in placeholder', async ({ page }) => {
    const spacedInput = page.getByPlaceholder('  Поле с пробелами в начале  ');
    await expect(spacedInput).toBeVisible();
  });

  test('Work with dynamic fields', async ({ page }) => {
    const dynamicInput = page.getByPlaceholder('dynamic@example.com');
    await expect(dynamicInput).toBeVisible({ timeout: 2000 });
  });
});
