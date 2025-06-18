import { test, expect } from '@playwright/test';

test.describe('Basic tests for getByTitle()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytitle');
  });

  test('Find element by exact title', async ({ page }) => {
    const tooltip = page.getByTitle('Это простая подсказка');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveClass('tooltip');
    await expect(tooltip).toHaveText('Наведи на меня');
  });

  test('Find a buton by title', async ({ page }) => {
    const button = page.getByTitle('Кнопка с подсказкой');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Нажми меня');
  });
});

test.describe('Tests for links and special cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytitle');
  });

  test('Find a link by title', async ({ page }) => {
    const homeLink = page.getByTitle('Перейти на главную страницу');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '#');
    await expect(homeLink).toHaveClass('link-with-title');
  });

  test('Find abbreviation by title', async ({ page }) => {
    const htmlAbbr = page.getByTitle('HyperText Markup Language');
    await expect(htmlAbbr).toBeVisible();
    await expect(htmlAbbr).toHaveText('HTML');
  });
});

test.describe('Special cases and dynamic content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytitle');
  });

  test('Find a title with spaces', async ({ page }) => {
    const spacedTitle = page.getByTitle('  Подсказка с пробелами  ');
    await expect(spacedTitle).toBeVisible();
    await expect(spacedTitle).toHaveText(/Элемент с подсказкой/);
  });

  test('Find a dynamically added element', async ({ page }) => {
    const dynamicButton = page.getByTitle('Кнопка добавленная динамически');
    await expect(dynamicButton).toBeVisible({ timeout: 2000 });
    await expect(dynamicButton).toHaveText('Новая кнопка');
  });

  test('Find an image by title', async ({ page }) => {
    const image = page.getByTitle('Изображение с подсказкой');
    await expect(image).toBeVisible();
  });
});
