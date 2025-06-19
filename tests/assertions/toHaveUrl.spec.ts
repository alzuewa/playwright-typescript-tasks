import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('Test url changing after navigation', async ({ page }) => {
  await page.getByRole('link', { name: 'О нас' }).click();
  await expect(page).toHaveURL(/.*#about$/);

  await page.getByRole('link', { name: 'Контакты' }).click();
  await expect(page).toHaveURL(/.*#contacts$/);

  await page.getByRole('link', { name: 'Главная' }).click();
  await expect(page).toHaveURL(/.*#home$/);
});

test('Test url after navigating back', async ({ page }) => {
  await page.getByRole('button', { name: 'Перейти в раздел' }).click();
  await expect(page).toHaveURL(/.*#contacts$/);

  await page.getByRole('button', { name: 'Вернуться назад' }).click();
  await expect(page).toHaveURL(/.*#home$/);
});

test('Test navigate to url manually', async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl#about');
  await expect(page.getByRole('heading', { name: 'О нас' })).toBeVisible();
  await expect(page).toHaveURL(/.*#about$/);

  await page.reload();
  await expect(page).toHaveURL(/.*#about$/);
});
