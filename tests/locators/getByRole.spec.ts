import { test, expect } from '@playwright/test';

test.describe('Search elements by role "button"', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  test('Find the main button by role and text', async ({ page }) => {
    const primaryButton = page.getByRole('button', { name: 'Основное действие' });

    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveClass(/primary-btn/);
  });

  test('Find inactive button by role and state', async ({ page }) => {
    const disabledButton = page.getByRole('button', { disabled: true });
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();
  });

  test('Find "div" element with role "button" attribute', async ({ page }) => {
    const divButton = page.getByRole('button', { name: 'Div как кнопка' });
    await expect(divButton).toBeVisible();
    await expect(divButton).toHaveText('Div как кнопка');
  });
});

test.describe('Search form elements by role', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  test('Search form fields by its roles', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: 'Имя пользователя' });
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('Test user');
    await expect(usernameInput).toHaveValue('Test user');
  });

  test('Find checkbox by role "checkbox"', async ({ page }) => {
    const newsletterCheckbox = page.getByRole('checkbox', { name: 'Подписаться на рассылку' });
    await expect(newsletterCheckbox).toBeVisible();
    await expect(newsletterCheckbox).not.toBeChecked();
    await newsletterCheckbox.check();
    await expect(newsletterCheckbox).toBeChecked();
  });

  test('Fill out and submit form', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Имя пользователя' }).fill('Test');
    await page.getByRole('textbox', { name: 'Пароль' }).fill('Pass123');
    await page.getByLabel('Страна').selectOption('de');
    await page.getByRole('button', { name: 'Отправить' }).click();
  });
});

test.describe('Search for tabs and alerts by role', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  test('Switch between tabs', async ({ page }) => {
    const settingsTab = page.getByRole('tab', { name: 'Настройки' });
    await expect(settingsTab).toHaveAttribute('aria-selected', 'false');
    await settingsTab.click();
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    const settingsPanel = page
      .getByRole('tabpanel')
      .filter({ has: page.getByRole('heading', { name: 'Настройки аккаунта' }) });
    await expect(settingsPanel).toBeVisible();
  });

  test('Check alerts on the page', async ({ page }) => {
    const successAlert = page.getByRole('alert').filter({ hasText: 'Успех!' });
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveClass(/alert-success/);
  });
});
