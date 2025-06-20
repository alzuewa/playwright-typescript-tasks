import { test, expect } from '@playwright/test';

test.describe('Tests with annotations for sections', () => {
  test('Slow loading', async ({ page }) => {
    test.slow();
    await page.goto('https://osstep.github.io/annotations');
    const slowSection = page.locator('#slow-section');
    await slowSection.waitFor({ state: 'visible' });
    await expect(slowSection).toBeVisible();
  });

  test.skip('Test payment form (not implemented yet)', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');
    await expect(page.getByRole('button', { name: 'Оплатить' })).toBeDisabled();
  });

  test.fixme('Unstable behavior', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');
    await page.getByRole('button', { name: 'Активировать' }).click();
    await expect(page.locator('#unstable-result')).toBeVisible();
  });

  test.only('Test new feature in development', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Функция в разработке!');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Попробовать' }).click();
  });

  test.fail('Test with expected failure', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');
    await expect(page.locator('#non-existent-element')).toBeVisible();
  });
});

//Extra features examples
// Conditional tests run
test.describe('Platform-dependent tests', () => {
  // Skip for Firefox
  test('Test for Chromium only', async ({ browserName }) => {
    test.skip(browserName === 'firefox', 'Is not supported in Firefox');
    // test code...
  });

  // Execute only in headless mode
  test('Test for headless mode', async ({ headless }) => {
    test.fixme(!headless, 'Headless mode required!');
    // test code...
  });
});

// Annotations with params
test.describe('Parametrized tests', () => {
  const users = [
    { role: 'admin', expected: true },
    { role: 'user', expected: false },
  ];

  for (const user of users) {
    test(`Check access for ${user.role} @role-${user.role}`, () => {
      // test code with params...
    });
  }
});
