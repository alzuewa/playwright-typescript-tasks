import { test as base, expect, Page } from '@playwright/test';

interface SettingsFixtures {
  configuredSettings: Page;
}

export const test = base.extend<SettingsFixtures>({
  configuredSettings: async ({ page }, use) => {
    await page.goto('https://osstep.github.io/fixture_settings');
    await page.locator('#theme').selectOption('Dark');
    await page.locator('div:nth-child(3) > .switch > .slider').click(); // otherwise push-notifications button isn't visible
    await page.locator('.save-button').click();

    await use(page);
  },
});

test('Settings are persisted', async ({ configuredSettings }) => {
  const settings = await configuredSettings.evaluate(() => {
    const userSettings = localStorage.getItem('userSettings');
    if (typeof userSettings === 'string') return JSON.parse(userSettings);
  });

  expect(settings).toEqual({
    accentColor: 'purple',
    emailNotifications: true,
    pushNotifications: true,
    theme: 'dark',
  });
  await expect(configuredSettings.locator('#save-status')).toBeVisible();
  await expect(configuredSettings.locator('#theme')).toHaveValue('dark');
  await expect(configuredSettings.locator('div:nth-child(3) > .switch > .slider')).toBeChecked();
});
