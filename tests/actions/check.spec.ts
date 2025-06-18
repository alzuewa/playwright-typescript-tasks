import { test, expect } from '@playwright/test';

test.describe('Basic checkbox tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  test('Checkbox state change', async ({ page }) => {
    const newsletterCheckbox = page.getByLabel('Подписаться на рассылку');
    const status = page.locator('#newsletter-status');

    await expect(newsletterCheckbox).not.toBeChecked();
    await newsletterCheckbox.check();
    await expect(newsletterCheckbox).toBeChecked();
    await expect(status).toHaveText('Подписаны');
    await expect(status).toHaveClass(/checked/);

    await newsletterCheckbox.uncheck();
    await expect(newsletterCheckbox).not.toBeChecked();
    await expect(status).toHaveText('Не подписаны');
  });

  test('Mandatory checkbox', async ({ page }) => {
    const termsCheckbox = page.getByLabel('Я принимаю условия соглашения');

    await expect(termsCheckbox).toHaveAttribute('required', '');
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();
  });
});

test.describe('Other scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  test('Work with custom checkbox after scrolling', async ({ page }) => {
    const agreeCheckbox = page.getByLabel('Я прочитал и согласен с условиями');
    const tosContainer = page.locator('.tos-container');

    await tosContainer.scrollIntoViewIfNeeded();
    await agreeCheckbox.check();
    await expect(agreeCheckbox).toBeChecked();
  });

  test('Work with dynamically added checkboxes', async ({ page }) => {
    const dynamicCheckbox1 = page.getByLabel('Динамический чекбокс 1');
    const dynamicCheckbox2 = page.getByLabel('Динамический чекбокс 2');

    await expect(dynamicCheckbox1).toBeVisible({ timeout: 2000 });
    await expect(dynamicCheckbox2).toBeChecked();

    await dynamicCheckbox1.check();
    await expect(dynamicCheckbox1).toBeChecked();
    await expect(dynamicCheckbox2).toBeChecked();
  });
});

test.describe('Complex form tests with checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  test('Fill the whole form and check states', async ({ page }) => {
    await page.getByLabel('Подписаться на рассылку').check();
    await page.getByLabel('Я принимаю условия соглашения').check();

    await page.getByLabel('Спорт').check();
    await page.getByLabel('Кино').check();
    await page.getByLabel('Музыка').uncheck();

    await page.getByLabel('Почта России').check();

    await page.locator('.tos-container').scrollIntoViewIfNeeded();
    await page.getByLabel('Я прочитал и согласен с условиями').check();

    await expect(page.getByLabel('Подписаться на рассылку')).toBeChecked();
    await expect(page.getByLabel('Почта России')).toBeChecked();
    await expect(page.getByLabel('Спорт')).toBeChecked();
    await expect(page.getByLabel('Музыка')).not.toBeChecked();
  });
});
