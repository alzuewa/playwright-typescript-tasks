import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavetext');
});

test('Test exact text match', async ({ page }) => {
  const exactText = page.locator('#exact-text');
  await expect(exactText).toHaveText('This text must match exactly, including punctuation! (100%)');

  await expect(exactText).not.toHaveText('this text must match exactly');
  await expect(exactText).not.toHaveText('including punctuation!');
});

test('Test counter', async ({ page }) => {
  const counter = page.locator('#counter');
  await expect(counter).toHaveText('0');

  await page.locator('#increment').click();
  await expect(counter).toHaveText('1');

  await page.locator('#reset').click();
  await expect(counter).toHaveText('0');
});

test('Test user card', async ({ page }) => {
  await expect(page.locator('#username')).toHaveText('user_guest');
  await expect(page.locator('#user-email')).toHaveText('guest@example.com');
  await expect(page.locator('#user-status')).toHaveText('Inactive');

  await page.locator('#activate-user').click();

  await expect(page.locator('#username')).toHaveText('user_active');
  await expect(page.locator('#user-email')).toHaveText('active.user@example.com');
  await expect(page.locator('#user-status')).toHaveText('Active');
});

test('Test formatted text', async ({ page }) => {
  const formattedText = page.locator('#formatted-text');
  await expect(formattedText).toHaveText(
    'Text   with   extra   spaces   and\n        line\n        breaks',
  );
});

test('Test dynamic list', async ({ page }) => {
  // for <ul> all elements texts are joined with \n)

  const itemsList = page.locator('#items-list');
  await expect(itemsList).toHaveText('First item\nSecond item');

  await page.locator('#add-item').click();
  await expect(itemsList).toHaveText('First item\nSecond item\nItem 3');

  await page.locator('#clear-list').click();
  await expect(itemsList).toHaveText('Empty list');
});
