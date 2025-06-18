import { test, expect } from '@playwright/test';

test.describe('Filling in form fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  test('Filling in text field', async ({ page }) => {
    const usernameField = page.getByLabel('Имя пользователя');
    await usernameField.fill('Tom Brown');
    await expect(usernameField).toHaveValue('Tom Brown');
  });

  test('Filling in email field with validation', async ({ page }) => {
    const emailField = page.getByPlaceholder('example@mail.com');
    const errorFeedback = page.getByText('Введите корректный email');

    await emailField.fill('invalid-email');
    await emailField.blur();
    await expect(errorFeedback).toBeVisible();

    await emailField.fill('valid@example.com');
    await emailField.blur();
    await expect(errorFeedback).toBeHidden();
  });
});

test.describe('Filling in special fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  test('Filling in textarea', async ({ page }) => {
    const bioField = page.getByLabel('Краткая биография');
    const longText = 'Test text.\nTest text.\nTest text.';

    await bioField.fill(longText);
    await expect(bioField).toHaveValue(longText);
  });

  test('Filling number field', async ({ page }) => {
    const ageField = page.getByLabel('Возраст');

    await ageField.fill('30');
    await expect(ageField).toHaveValue('30');
  });
});

test.describe('Validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  test('Validation by phone number', async ({ page }) => {
    const phoneField = page.getByLabel('Телефон');
    const errorFeedback = page.getByText('Требуется 10 цифр');

    await phoneField.fill('123');
    await expect(errorFeedback).toBeVisible();

    await phoneField.fill('1234567890');
    await expect(errorFeedback).toBeHidden();
  });

  test('Partial filling in and clear', async ({ page }) => {
    const cardField = page.getByLabel('Кредитная карта');

    await cardField.fill('1234');
    await expect(cardField).toHaveValue('1234');

    await cardField.clear();
    await expect(cardField).toHaveValue('');

    await cardField.fill('1234 5678 9012 3456');
    await expect(cardField).toHaveValue('1234 5678 9012 3456');
  });
});
