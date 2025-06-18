import { test, expect } from '@playwright/test';

test.describe('Basic tests for getByLabel()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  test('Find text field by label', async ({ page }) => {
    const username = page.getByLabel('Имя пользователя');
    await username.fill('testUser');
    await expect(username).toHaveValue('testUser');
  });

  test('Find email field by label', async ({ page }) => {
    const email = page.getByLabel('Электронная почта');
    await expect(email).toHaveAttribute('placeholder', 'example@mail.com');
  });
});

test.describe('Checkboxes and radiobuttons tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  test('Work with checkboxes', async ({ page }) => {
    const musicCheckbox = page.getByLabel('Музыка');
    await expect(musicCheckbox).toBeChecked();
    await musicCheckbox.uncheck();
    await expect(musicCheckbox).not.toBeChecked();
  });

  test('Work with radiobuttons', async ({ page }) => {
    const femaleRadio = page.getByLabel('Женский');
    await expect(femaleRadio).toBeChecked();

    await page.getByLabel('Мужской').check();
    await expect(femaleRadio).not.toBeChecked();
  });
});

test.describe('Other cases with getByLabel()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  test('Find input field by text in its label', async ({ page }) => {
    const phone = page.getByLabel('Телефон');
    await expect(phone).toHaveAttribute('placeholder', '+7 (XXX) XXX-XX-XX');
  });

  test('Find element aria-labelledby', async ({ page }) => {
    const address = page.getByLabel('Адрес доставки');
    await expect(address).toBeVisible();
  });

  test('Find element with hidden label', async ({ page }) => {
    const search = page.getByLabel('Поиск');
    await expect(search).toHaveAttribute('placeholder', 'Поиск...');
  });
});
