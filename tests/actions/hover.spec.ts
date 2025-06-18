import { test, expect } from '@playwright/test';

test.describe('Basic hover-effects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_hover');
  });

  test('Hover events are logged', async ({ page }) => {
    const hoverBox = page.getByText('Наведи на меня');

    await hoverBox.hover();
    await expect(page.locator('#hover-log')).toContainText('Наведение на простой блок');

    await page.mouse.move(0, 0);
    await expect(page.locator('#hover-log')).toContainText('Уход с простого блока');
  });
});

test.describe('Pop-up tips', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_hover');
  });

  test('A tip appears on hover', async ({ page }) => {
    const tooltipTrigger = page.getByText('Наведи чтобы увидеть подсказку');
    const tooltip = page.getByText('Это текст подсказки');

    await expect(tooltip).toBeHidden();
    await tooltipTrigger.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('Это текст подсказки');
  });

  test('A tooltip is positioned correctly', async ({ page }) => {
    const tooltipTrigger = page.getByText('Наведи чтобы увидеть подсказку');
    const tooltip = page.getByText('Это текст подсказки');

    const box = await tooltipTrigger.boundingBox();
    await tooltipTrigger.hover();

    const tooltipBox = await tooltip.boundingBox();
    if (tooltipBox && box) {
      expect(tooltipBox.y).toBeLessThan(box.y);

      expect(Math.abs(tooltipBox.x + tooltipBox.width / 2 - (box.x + box.width / 2))).toBeLessThan(
        2,
      );
    }
  });
});

test.describe('Dropdown menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_hover');
  });

  test('Hover opens submenu', async ({ page }) => {
    const menuItem = page.getByText('Меню 1 Подменю 1.1 Подменю');
    const submenu = page.getByText('Подменю 1.1');

    await expect(submenu).toBeHidden();
    await menuItem.hover();
    await expect(submenu).toBeVisible();
    await expect(page.getByText('Подменю 1.2')).toBeVisible();
  });

  test('Switching between menu items', async ({ page }) => {
    const menuItem1 = page.getByText('Меню 1 Подменю 1.1 Подменю');
    const menuItem2 = page.getByText('Меню 2 Подменю');
    const submenu1 = page.getByText('Подменю 1.1');
    const submenu2 = page.getByText('Подменю 2.1');

    await menuItem1.hover();
    await expect(submenu1).toBeVisible();

    await menuItem2.hover();
    await expect(submenu1).toBeHidden();
    await expect(submenu2).toBeVisible();
  });
});
