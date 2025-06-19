import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('Test initial fields values', async ({ page }) => {
  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('Гость');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('');
  await expect(page.getByLabel('Телефон:')).toHaveValue('+7');
  await expect(page.getByLabel('Комментарии:')).toHaveValue('');
  await expect(page.getByLabel('Страна:')).toHaveValue('ru');
});

test('Test field values changes', async ({ page }) => {
  await page.getByLabel('Имя пользователя:').fill('Tom');
  await page.getByLabel('Электронная почта:').fill('tom@example.com');
  await page.getByLabel('Телефон:').fill('+1 (123) 456-78-90');
  await page.getByLabel('Комментарии:').fill('Test comment');
  await page.getByLabel('Страна:').selectOption('kz');

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('Tom');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('tom@example.com');
  await expect(page.getByLabel('Телефон:')).toHaveValue('+1 (123) 456-78-90');
  await expect(page.getByLabel('Комментарии:')).toHaveValue('Test comment');
  await expect(page.getByLabel('Страна:')).toHaveValue('kz');
});

test('Test form values discard', async ({ page }) => {
  await page.getByLabel('Имя пользователя:').fill('Alex');
  await page.getByLabel('Электронная почта:').fill('test@test.ru');
  await page.getByLabel('Страна:').selectOption('by');

  await page.getByRole('button', { name: 'Сбросить' }).click();

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('Гость');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('');
  await expect(page.getByLabel('Телефон:')).toHaveValue('+7');
  await expect(page.getByLabel('Страна:')).toHaveValue('ru');
});

test('Test data update', async ({ page }) => {
  await page.getByLabel('Имя пользователя:').fill('Maria');
  await page.getByLabel('Электронная почта:').fill('maria@mail.ru');
  await page.getByLabel('Комментарии:').fill('Comment');

  await page.getByRole('button', { name: 'Обновить данные' }).click();

  const output = await page.locator('#output').textContent();
  expect(output).toContain('Maria');
  expect(output).toContain('maria@mail.ru');
  expect(output).toContain('Comment');
});

test('Test empty values', async ({ page }) => {
  await page.getByLabel('Имя пользователя:').fill('');
  await page.getByLabel('Телефон:').fill('');
  await page.getByLabel('Страна:').selectOption('');

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('');
  await expect(page.getByLabel('Телефон:')).toHaveValue('');
  await expect(page.getByLabel('Страна:')).toHaveValue('');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('');
});
