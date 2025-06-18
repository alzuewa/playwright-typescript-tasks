import { test, expect } from '@playwright/test';

test.describe('Basic actions with click', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  test('Simple click by button increases counter', async ({ page }) => {
    const button = page.getByText('Кликни меня', { exact: true });
    await button.click();
    const result_text = page.locator('#click-result');
    await expect(result_text).toBeVisible();

    const result = await result_text
      .textContent()
      .then((res) => (res ? parseInt(res.split(' ')[1]) : null));
    expect(result).toEqual(1);

    await button.click();
    await button.click();
    const newResult = await result_text
      .textContent()
      .then((res) => (res ? parseInt(res.split(' ')[1]) : null));
    expect(newResult).toEqual(3);
  });

  test('Double click increases special counter', async ({ page }) => {
    const dblClickArea = page.locator('#dblclick-area');
    await dblClickArea.dblclick();
    const result = await dblClickArea.textContent().then((res) => (res ? parseInt(res) : null));
    expect(result).toEqual(1);
  });
});

test.describe('Actions with mouse right cliks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  test('Right click opens a context menu', async ({ page }) => {
    const rightClickArea = page.getByText('Кликни правой кнопкой');
    await rightClickArea.click({ button: 'right' });

    const contextMenu = page.getByText('Копировать').first();
    await expect(contextMenu).toBeVisible();

    await contextMenu.click();
    await expect(page.getByText('Выбрано: Копировать')).toBeVisible();
  });

  test('Context menu appears at the click point', async ({ page }) => {
    const rightClickArea = page.getByText('Кликни правой кнопкой');
    const box = await rightClickArea.boundingBox();
    if (box) {
      await rightClickArea.click({
        button: 'right',
        position: {
          x: box.width / 2,
          y: box.height / 2,
        },
      });
    }
    await expect(page.getByText('Копировать').first()).toBeVisible();
  });
});

test.describe('Other clicks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  test('Click at specific coordinates registers its position', async ({ page }) => {
    const clickArea = page.getByText('Кликни в любом месте');
    await clickArea.click({
      position: {
        x: 50,
        y: 100,
      },
    });

    await expect(page.getByText(/Позиция?/)).toHaveText(/^Позиция: \(\d+, \d+\)$/);
  });

  test('Holding button changes status displayed', async ({ page }) => {
    const holdButton = page.getByText('Удерживай меня');

    await holdButton.dispatchEvent('mousedown');
    await expect(page.getByText('Статус: нажата')).toBeVisible();

    await page.waitForTimeout(1000);
    await holdButton.dispatchEvent('mouseup');
    await expect(page.getByText('Статус: отпущена')).toBeVisible();
  });
});
