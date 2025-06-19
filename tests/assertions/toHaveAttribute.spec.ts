import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveattribute');
});

test('Test main button attributes', async ({ page }) => {
  const mainBtn = page.getByRole('button', { name: 'Отправить' });
  await expect(mainBtn).toHaveAttribute('data-action', 'submit');
  await expect(mainBtn).toHaveAttribute('title', 'Основная кнопка');

  await page.getByRole('button', { name: 'Переключить атрибуты' }).click();
  await expect(mainBtn).toHaveAttribute('data-action', 'cancel');
  await expect(mainBtn).toHaveAttribute('title', 'Отмена действия');
});

test('Test disable button', async ({ page }) => {
  const mainBtn = page.getByRole('button', { name: 'Отправить' });
  await expect(mainBtn).not.toHaveAttribute('disabled', '');

  await page.getByRole('button', { name: 'Отключить кнопку' }).click();
  await expect(mainBtn).toHaveAttribute('disabled', '');

  await page.getByRole('button', { name: 'Отключить кнопку' }).click();
  await expect(mainBtn).not.toHaveAttribute('disabled', '');
});

test('Test image attributes', async ({ page }) => {
  const image = page.getByAltText('Аватар пользователя');
  await expect(image).toHaveAttribute('src', /user.jpg$/);
  await expect(image).toHaveAttribute('alt', 'Аватар пользователя');
  await expect(image).toHaveAttribute('width', '200');
});

test('Test form attributes', async ({ page }) => {
  const username = page.getByPlaceholder('Имя пользователя');
  await expect(username).toHaveAttribute('required', '');
  await expect(username).toHaveAttribute('minlength', '3');

  const email = page.getByPlaceholder('Email');
  await expect(email).toHaveAttribute('disabled', '');

  await page.getByRole('button', { name: 'Активировать email' }).click();
  await expect(email).not.toHaveAttribute('disabled', '');
  await expect(email).toHaveAttribute('placeholder', 'Введите ваш email');
});

test('Test data-attributes', async ({ page }) => {
  const container = page.getByText('Контейнер с data-атрибутами');
  await expect(container).toHaveAttribute('data-role', 'container');
  await expect(container).toHaveAttribute('data-visible', 'true');
  await expect(container).toHaveAttribute('data-user-id', '12345');

  await page.getByRole('button', { name: 'Обновить data-атрибуты' }).click();
  await expect(container).toHaveAttribute('data-visible', 'false');
  await expect(container).not.toHaveAttribute('data-user-id', '12345');

  await page.getByRole('button', { name: 'Обновить data-атрибуты' }).click();
  await expect(container).toHaveAttribute('data-visible', 'true');
});
