import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveclass');
});

test('Test elements initial classes', async ({ page }) => {
  const box1 = page.locator('#box1');
  await expect(box1).toHaveClass(/active/);
  await expect(box1).not.toHaveClass(/error/);

  const box2 = page.locator('#box2');
  await expect(box2).toHaveClass(/error/);

  const box3 = page.locator('#box3');
  await expect(box3).toHaveClass(/hidden/);
});

test('Test switch classes', async ({ page }) => {
  const box1 = page.locator('#box1');
  await expect(box1).toHaveClass(/active/);

  await page.getByRole('button', { name: 'Переключить box1' }).click();
  await expect(box1).toHaveClass(/error/);
  await expect(box1).not.toHaveClass(/active/);

  await page.getByRole('button', { name: 'Переключить box1' }).click();
  await expect(box1).toHaveClass(/active/);
  await expect(box1).not.toHaveClass(/error/);
});

test('Test show/hide element', async ({ page }) => {
  const box3 = page.locator('#box3');
  await expect(box3).toHaveClass(/hidden/);

  await page.getByRole('button', { name: 'Показать/скрыть box3' }).click();
  await expect(box3).not.toHaveClass(/hidden/);

  await page.getByRole('button', { name: 'Показать/скрыть box3' }).click();
  await expect(box3).toHaveClass(/hidden/);
});

test('Test user card classes', async ({ page }) => {
  const userCard = page.locator('#user-card');
  await expect(userCard).not.toHaveClass(/premium/);

  await page.getByRole('button', { name: 'Перейти на Премиум' }).click();
  await expect(userCard).toHaveClass(/premium/);

  await page.getByRole('button', { name: 'Отметить как просроченный' }).click();
  await expect(userCard).toHaveClass(/premium/);
  await expect(userCard).toHaveClass(/expired/);
  await expect(userCard).toHaveClass(/premium.*expired|expired.*premium/);
});

test('Test element with multiple classes', async ({ page }) => {
  const multiClass = page.locator('#multi-class');
  await expect(multiClass).toHaveClass(/box/);
  await expect(multiClass).toHaveClass(/warning/);
  await expect(multiClass).toHaveClass(/large/);
  await expect(multiClass).toHaveClass(/rounded/);

  await page.getByRole('button', { name: 'Изменить классы' }).click();
  await expect(multiClass).toHaveClass(/error/);
  await expect(multiClass).not.toHaveClass(/warning/);
  await expect(multiClass).not.toHaveClass(/large/);
  await expect(multiClass).toHaveClass(/rounded/);
  await expect(multiClass).toHaveClass(/box/);
});
