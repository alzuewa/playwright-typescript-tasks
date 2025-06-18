import { test, expect } from '@playwright/test';

test.describe('Basic tests for getByText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  test('Find element by exact text', async ({ page }) => {
    const paragraph = page.getByText('Это обычный параграф текста для поиска', { exact: true });
    await expect(paragraph).toBeVisible();
  });

  test('Найти span по тексту', async ({ page }) => {
    const spanElement = page.getByText('Текст внутри span');
    await expect(spanElement).toBeVisible();
  });
});

test.describe('Search by partial match', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  test('Find by partial match', async ({ page }) => {
    const partialText = page.getByText(/важную информацию/);
    await expect(partialText).toBeVisible();
    await expect(partialText).toHaveClass('partial-match');
  });

  test('Find element by partial text', async ({ page }) => {
    const listItem = page.getByText(/Специальный/);
    await expect(listItem).toBeVisible();
    await expect(listItem).toHaveRole('listitem');
  });
});

test.describe('Complicated cases of searching by text', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  test('Find nested text', async ({ page }) => {
    const nestedSpan = page.locator('p span');
    await expect(nestedSpan).toBeVisible();
    await expect(nestedSpan).toHaveText('вложенным текстом');
    const parent = await nestedSpan.locator('..');
    await expect(parent).toHaveText(/Параграф с вложенным текстом внутри/);
    await expect(parent).toHaveRole('paragraph');
  });

  test('Work with dynamic content', async ({ page }) => {
    const dynamicText = page.getByText('Этот текст появился после загрузки страницы');
    await expect(dynamicText).toBeVisible({ timeout: 2000 });
  });

  test('Find text with multiple spaces', async ({ page }) => {
    const spacedText = page.getByText(/Текст\s*с\s*множественными\s*пробелами/);
    await expect(spacedText).toBeVisible();
  });
});
